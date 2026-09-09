import {
  PaymentError,
  type CreatePaymentInput,
  type CreatePaymentResult,
  type PaymentProvider,
  type VerifyPaymentInput,
  type VerifyPaymentResult,
} from "./types";

/**
 * Stripe Checkout for international cards. Uses the REST API directly with
 * form encoding, so the SDK is not a dependency of the build.
 */

const API = "https://api.stripe.com/v1";

function secretKey() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new PaymentError(
      "Card checkout is not configured. Set STRIPE_SECRET_KEY.",
      "provider_not_configured",
      503,
    );
  }
  return key;
}

async function stripeFetch(path: string, init: { method: string; body?: URLSearchParams }) {
  const res = await fetch(`${API}${path}`, {
    method: init.method,
    headers: {
      authorization: `Bearer ${secretKey()}`,
      "content-type": "application/x-www-form-urlencoded",
    },
    body: init.body,
    cache: "no-store",
  });
  const json = (await res.json()) as Record<string, unknown> & {
    error?: { message?: string };
  };
  if (!res.ok) {
    throw new PaymentError(json.error?.message ?? "Stripe rejected the request.", "gateway_rejected", 502);
  }
  return json;
}

export const stripe: PaymentProvider = {
  id: "stripe",
  method: "card",
  supports: ["USD"],

  async createPayment({ order, callbackUrl, description }: CreatePaymentInput): Promise<CreatePaymentResult> {
    const body = new URLSearchParams();
    body.set("mode", "payment");
    body.set("success_url", `${callbackUrl}&session_id={CHECKOUT_SESSION_ID}`);
    body.set("cancel_url", `${callbackUrl}&cancelled=1`);
    body.set("customer_email", order.customer.email);
    body.set("client_reference_id", order.id);
    body.set("line_items[0][quantity]", "1");
    body.set("line_items[0][price_data][currency]", "usd");
    body.set("line_items[0][price_data][unit_amount]", String(Math.round(order.amount * 100)));
    body.set("line_items[0][price_data][product_data][name]", description);

    const session = await stripeFetch("/checkout/sessions", { method: "POST", body });

    return {
      kind: "redirect",
      url: String(session.url),
      providerRef: String(session.id),
    };
  },

  async verifyPayment({ order, params }: VerifyPaymentInput): Promise<VerifyPaymentResult> {
    const sessionId = params.session_id ?? order.providerRef;
    if (!sessionId) return { ok: false, code: "missing_session" };

    const session = await stripeFetch(`/checkout/sessions/${sessionId}`, { method: "GET" });
    const paid = session.payment_status === "paid";

    return paid
      ? { ok: true, settlementRef: String(session.payment_intent ?? sessionId), code: "paid" }
      : { ok: false, code: String(session.payment_status ?? "unpaid") };
  },
};
