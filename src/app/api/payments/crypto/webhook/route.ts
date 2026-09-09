import {accessReadiness} from "@/lib/access/contract";
import { NextResponse, type NextRequest } from "next/server";
import { isSettledCryptoStatus, verifyCryptoWebhookSignature } from "@/lib/payments/crypto";
import { findOrder, markOrderStatus } from "@/lib/payments/orders";

export const runtime = "nodejs";

interface Ipn {
  payment_id?: string | number;
  order_id?: string;
  payment_status?: string;
  actually_paid?: number;
  price_amount?: number;
  pay_currency?: string;
}

/**
 * NOWPayments IPN. This is the authoritative settlement signal for crypto —
 * the customer's browser may never return from the wallet app, so the order is
 * marked paid here rather than on the redirect.
 */
export async function POST(request: NextRequest) {
  if(!accessReadiness.ready) return NextResponse.json({ok:false,code:accessReadiness.code,error:"Live purchases are not available until account and subscription services are connected."},{status:503});
  const raw = await request.text();
  const signature = request.headers.get("x-nowpayments-sig");

  if (!verifyCryptoWebhookSignature(raw, signature)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  let payload: Ipn;
  try {
    payload = JSON.parse(raw) as Ipn;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const orderId = payload.order_id;
  const status = payload.payment_status ?? "";
  if (!orderId) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const order = await findOrder(orderId);
  if (!order) {
    // Acknowledge unknown orders so the provider stops retrying.
    return NextResponse.json({ ok: true, ignored: true });
  }

  if (isSettledCryptoStatus(status)) {
    // Guard against an underpaid invoice being treated as settled.
    const paid = payload.actually_paid ?? payload.price_amount ?? 0;
    const expected = payload.price_amount ?? order.amount;
    const underpaid = paid > 0 && expected > 0 && paid < expected * 0.98;

    if (underpaid) {
      await markOrderStatus(orderId, "awaiting_payment");
      return NextResponse.json({ ok: true, underpaid: true });
    }

    await markOrderStatus(orderId, "paid", {
      settlementRef: String(payload.payment_id ?? order.providerRef ?? ""),
    });
    return NextResponse.json({ ok: true });
  }

  if (status === "failed" || status === "refunded" || status === "expired") {
    await markOrderStatus(orderId, status === "expired" ? "expired" : "failed");
  }

  return NextResponse.json({ ok: true });
}
