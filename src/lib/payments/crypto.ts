import { createHmac, timingSafeEqual } from "node:crypto";
import {
  PaymentError,
  type CreatePaymentInput,
  type CreatePaymentResult,
  type CryptoNetwork,
  type PaymentProvider,
  type VerifyPaymentInput,
  type VerifyPaymentResult,
} from "./types";

/**
 * NOWPayments adapter. Creates an on-chain invoice, then relies on the IPN
 * webhook (see /api/payments/crypto/webhook) for settlement — polling the
 * status endpoint is only a fallback for the return page.
 */

const API_BASE = "https://api.nowpayments.io/v1";

/** Provider asset codes keyed by the networks we expose at checkout. */
export const cryptoAssets: Record<CryptoNetwork, { code: string; label: string; chain: string }> = {
  USDT_TRC20: { code: "usdttrc20", label: "USDT", chain: "TRON (TRC20)" },
  USDT_ERC20: { code: "usdterc20", label: "USDT", chain: "Ethereum (ERC20)" },
  BTC: { code: "btc", label: "BTC", chain: "Bitcoin" },
  ETH: { code: "eth", label: "ETH", chain: "Ethereum" },
};

interface NowPaymentResponse {
  payment_id?: string | number;
  pay_address?: string;
  pay_amount?: number;
  pay_currency?: string;
  payment_status?: string;
  invoice_url?: string;
  expiration_estimate_date?: string;
  message?: string;
}

function apiKey() {
  const key = process.env.NOWPAYMENTS_API_KEY;
  if (!key) {
    throw new PaymentError(
      "Crypto checkout is not configured. Set NOWPAYMENTS_API_KEY.",
      "provider_not_configured",
      503,
    );
  }
  return key;
}

/** Statuses NOWPayments treats as money received. */
const SETTLED = new Set(["confirmed", "finished", "sending", "partially_paid"]);

export const nowpayments: PaymentProvider = {
  id: "nowpayments",
  method: "crypto",
  supports: ["USD"],

  async createPayment({ order, callbackUrl, description, network }: CreatePaymentInput): Promise<CreatePaymentResult> {
    const chosen: CryptoNetwork = network ?? "USDT_TRC20";
    const asset = cryptoAssets[chosen];

    const res = await fetch(`${API_BASE}/payment`, {
      method: "POST",
      headers: { "x-api-key": apiKey(), "content-type": "application/json" },
      body: JSON.stringify({
        price_amount: order.amount,
        price_currency: "usd",
        pay_currency: asset.code,
        order_id: order.id,
        order_description: description,
        ipn_callback_url: `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/api/payments/crypto/webhook`,
        success_url: callbackUrl,
        cancel_url: `${callbackUrl}&cancelled=1`,
      }),
      cache: "no-store",
    });

    const json = (await res.json()) as NowPaymentResponse;

    if (!res.ok || !json.payment_id || !json.pay_address) {
      throw new PaymentError(json.message ?? "The crypto provider rejected the invoice.", "gateway_rejected", 502);
    }

    return {
      kind: "crypto_invoice",
      providerRef: String(json.payment_id),
      address: json.pay_address,
      network: chosen,
      cryptoAmount: String(json.pay_amount ?? order.amount),
      asset: asset.label,
      expiresAt:
        json.expiration_estimate_date ?? new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      url: json.invoice_url,
    };
  },

  async verifyPayment({ order, params }: VerifyPaymentInput): Promise<VerifyPaymentResult> {
    const paymentId = params.payment_id ?? params.NP_id ?? order.providerRef;
    if (!paymentId) {
      return { ok: false, code: "missing_payment_id" };
    }

    const res = await fetch(`${API_BASE}/payment/${paymentId}`, {
      headers: { "x-api-key": apiKey() },
      cache: "no-store",
    });

    if (!res.ok) {
      return { ok: false, code: res.status, message: "Could not read the payment status." };
    }

    const json = (await res.json()) as NowPaymentResponse;
    const status = json.payment_status ?? "unknown";

    return SETTLED.has(status)
      ? { ok: true, settlementRef: String(json.payment_id ?? paymentId), code: status }
      : { ok: false, code: status, message: `Payment is ${status}.` };
  },
};

/**
 * Validates a NOWPayments IPN signature: HMAC-SHA512 over the JSON body with
 * keys sorted alphabetically. Returns false rather than throwing so the route
 * can answer 401 without leaking detail.
 */
export function verifyCryptoWebhookSignature(rawBody: string, signature: string | null): boolean {
  const secret = process.env.NOWPAYMENTS_IPN_SECRET;
  if (!secret || !signature) return false;

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawBody);
  } catch {
    return false;
  }

  const sorted = JSON.stringify(sortDeep(parsed));
  const expected = createHmac("sha512", secret).update(sorted).digest("hex");

  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(signature, "utf8");
  return a.length === b.length && timingSafeEqual(a, b);
}

function sortDeep(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortDeep);
  if (value && typeof value === "object") {
    return Object.keys(value as Record<string, unknown>)
      .sort()
      .reduce<Record<string, unknown>>((acc, key) => {
        acc[key] = sortDeep((value as Record<string, unknown>)[key]);
        return acc;
      }, {});
  }
  return value;
}

export function isSettledCryptoStatus(status: string) {
  return SETTLED.has(status);
}
