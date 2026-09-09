import {
  PaymentError,
  type CreatePaymentInput,
  type CreatePaymentResult,
  type PaymentProvider,
  type VerifyPaymentInput,
  type VerifyPaymentResult,
} from "./types";

/**
 * Zarinpal (v4 REST API). Amounts are submitted in Rial; our orders are stored
 * in Toman, so everything is multiplied by 10 on the way out.
 *
 * Sandbox mode is used automatically when no merchant id is configured, which
 * keeps the checkout flow clickable in development without real credentials.
 */

const LIVE_BASE = "https://payment.zarinpal.com/pg";
const SANDBOX_BASE = "https://sandbox.zarinpal.com/pg";

interface ZarinpalRequestResponse {
  data?: { code: number; authority: string; message?: string; fee?: number };
  errors?: { code: number; message: string } | unknown[];
}

interface ZarinpalVerifyResponse {
  data?: { code: number; ref_id: number; card_pan?: string; message?: string };
  errors?: { code: number; message: string } | unknown[];
}

function config() {
  const merchantId = process.env.ZARINPAL_MERCHANT_ID ?? "";
  const sandbox = !merchantId || process.env.ZARINPAL_SANDBOX === "true";
  return {
    merchantId: merchantId || "00000000-0000-0000-0000-000000000000",
    sandbox,
    base: sandbox ? SANDBOX_BASE : LIVE_BASE,
  };
}

function firstError(errors: ZarinpalRequestResponse["errors"]): string | undefined {
  if (!errors) return undefined;
  if (Array.isArray(errors)) return errors.length ? JSON.stringify(errors[0]) : undefined;
  return (errors as { message?: string }).message;
}

export const zarinpal: PaymentProvider = {
  id: "zarinpal",
  method: "rial",
  supports: ["IRT", "IRR"],

  async createPayment({ order, callbackUrl, description }: CreatePaymentInput): Promise<CreatePaymentResult> {
    const { merchantId, base } = config();
    const amountInRial = Math.round(order.amount * 10);

    const res = await fetch(`${base}/v4/payment/request.json`, {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({
        merchant_id: merchantId,
        amount: amountInRial,
        currency: "IRR",
        description,
        callback_url: callbackUrl,
        metadata: {
          email: order.customer.email,
          mobile: order.customer.phone,
          order_id: order.id,
        },
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      throw new PaymentError(`Zarinpal request failed with HTTP ${res.status}`, "gateway_http_error", 502);
    }

    const json = (await res.json()) as ZarinpalRequestResponse;

    if (!json.data || json.data.code !== 100 || !json.data.authority) {
      throw new PaymentError(
        firstError(json.errors) ?? "Zarinpal declined the payment request",
        "gateway_rejected",
        502,
      );
    }

    return {
      kind: "redirect",
      url: `${base}/StartPay/${json.data.authority}`,
      providerRef: json.data.authority,
    };
  },

  async verifyPayment({ order, params }: VerifyPaymentInput): Promise<VerifyPaymentResult> {
    const { merchantId, base } = config();
    const authority = params.Authority ?? params.authority ?? order.providerRef;
    const status = params.Status ?? params.status;

    if (!authority) {
      return { ok: false, code: "missing_authority", message: "No authority returned by the gateway." };
    }
    if (status && status.toUpperCase() !== "OK") {
      return { ok: false, code: "cancelled", message: "The payment was cancelled at the gateway." };
    }

    const res = await fetch(`${base}/v4/payment/verify.json`, {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({
        merchant_id: merchantId,
        amount: Math.round(order.amount * 10),
        authority,
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      return { ok: false, code: res.status, message: "Verification call failed." };
    }

    const json = (await res.json()) as ZarinpalVerifyResponse;

    // 100 = verified now, 101 = already verified previously. Both are a paid order.
    if (json.data && (json.data.code === 100 || json.data.code === 101)) {
      return { ok: true, settlementRef: String(json.data.ref_id), code: json.data.code };
    }

    return {
      ok: false,
      code: json.data?.code ?? "unknown",
      message: firstError(json.errors) ?? "Zarinpal could not verify this transaction.",
    };
  },
};
