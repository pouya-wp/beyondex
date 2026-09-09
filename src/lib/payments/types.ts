export type PaymentMethod = "rial" | "crypto" | "card";

export type RialProvider = "zarinpal" | "zibal" | "idpay";
export type CryptoProvider = "nowpayments" | "coinbase";
export type CardProvider = "stripe";

export type ProviderId = RialProvider | CryptoProvider | CardProvider;

export type Currency = "IRT" | "IRR" | "USD";

export type CryptoNetwork = "USDT_TRC20" | "USDT_ERC20" | "BTC" | "ETH";

export interface CustomerDetails {
  email: string;
  fullName: string;
  phone?: string;
  company?: string;
}

export interface OrderLine {
  sku: string;
  /** Human label captured at checkout time, so invoices survive catalog edits. */
  title: string;
  quantity: number;
  /** Unit price in the order currency's minor-free unit (Toman or USD). */
  unitPrice: number;
}

export type OrderStatus = "pending" | "awaiting_payment" | "paid" | "failed" | "expired" | "refunded";

export interface Order {
  id: string;
  createdAt: string;
  status: OrderStatus;
  currency: Currency;
  /** Total charged, in Toman for IRT or dollars for USD. */
  amount: number;
  subtotal: number;
  discount: number;
  tax: number;
  lines: OrderLine[];
  customer: CustomerDetails;
  method: PaymentMethod;
  provider?: ProviderId;
  locale: "fa" | "en";
  couponCode?: string;
  /** Provider-side identifier: Zarinpal authority, NOWPayments payment_id, Stripe session id. */
  providerRef?: string;
  /** Bank/chain reference returned after a successful verification. */
  settlementRef?: string;
  network?: CryptoNetwork;
  paidAt?: string;
}

export interface CreatePaymentInput {
  order: Order;
  /** Absolute URL the gateway should return the customer to. */
  callbackUrl: string;
  description: string;
  network?: CryptoNetwork;
}

export type CreatePaymentResult =
  | {
      kind: "redirect";
      /** Where to send the browser. */
      url: string;
      providerRef: string;
    }
  | {
      kind: "crypto_invoice";
      providerRef: string;
      address: string;
      network: CryptoNetwork;
      /** Amount in the crypto asset, as a display string. */
      cryptoAmount: string;
      asset: string;
      expiresAt: string;
      /** Hosted invoice page, when the provider offers one. */
      url?: string;
    };

export interface VerifyPaymentInput {
  order: Order;
  /** Raw query params handed back by the gateway. */
  params: Record<string, string>;
}

export interface VerifyPaymentResult {
  ok: boolean;
  settlementRef?: string;
  /** Provider's raw status code, kept for support tickets. */
  code?: string | number;
  message?: string;
}

export interface PaymentProvider {
  id: ProviderId;
  method: PaymentMethod;
  supports: Currency[];
  createPayment(input: CreatePaymentInput): Promise<CreatePaymentResult>;
  verifyPayment(input: VerifyPaymentInput): Promise<VerifyPaymentResult>;
}

export class PaymentError extends Error {
  constructor(
    message: string,
    readonly code: string,
    readonly status = 400,
  ) {
    super(message);
    this.name = "PaymentError";
  }
}
