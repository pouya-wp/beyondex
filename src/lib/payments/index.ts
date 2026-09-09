import { nowpayments } from "./crypto";
import { stripe } from "./stripe";
import { zarinpal } from "./zarinpal";
import { PaymentError, type PaymentMethod, type PaymentProvider, type ProviderId } from "./types";

const providers: Record<ProviderId, PaymentProvider> = {
  zarinpal,
  // Zibal and IDPay speak an almost identical request/verify shape; they are
  // registered against the Zarinpal adapter until their own keys are supplied.
  zibal: zarinpal,
  idpay: zarinpal,
  nowpayments,
  coinbase: nowpayments,
  stripe,
};

/** The provider each method resolves to, overridable per deployment. */
const defaults: Record<PaymentMethod, ProviderId> = {
  rial: (process.env.RIAL_PROVIDER as ProviderId) ?? "zarinpal",
  crypto: (process.env.CRYPTO_PROVIDER as ProviderId) ?? "nowpayments",
  card: "stripe",
};

export function getProvider(method: PaymentMethod, explicit?: ProviderId): PaymentProvider {
  const id = explicit ?? defaults[method];
  const provider = providers[id];
  if (!provider) {
    throw new PaymentError(`Unknown payment provider "${id}"`, "unknown_provider", 400);
  }
  if (provider.method !== method) {
    throw new PaymentError(`Provider "${id}" does not handle ${method} payments`, "provider_mismatch", 400);
  }
  return provider;
}

/** Which methods a deployment can actually serve, for rendering the checkout. */
export function availableMethods(): PaymentMethod[] {
  const methods: PaymentMethod[] = ["rial"];
  if (process.env.NOWPAYMENTS_API_KEY) methods.push("crypto");
  if (process.env.STRIPE_SECRET_KEY) methods.push("card");
  return methods;
}

export * from "./types";
export { cryptoAssets } from "./crypto";
