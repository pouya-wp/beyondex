import {accessReadiness} from "@/lib/access/contract";
import { NextResponse, type NextRequest } from "next/server";
import { getProvider } from "@/lib/payments";
import { findOrder, markOrderStatus } from "@/lib/payments/orders";
import { siteConfig, normalizeSiteUrl } from "@/lib/data/site";

export const runtime = "nodejs";

/**
 * Where every gateway sends the customer back to. Verifies the transaction
 * server-side, records the outcome, then redirects to the localized result
 * page. The browser never carries the verification result itself.
 */
export async function GET(request: NextRequest) {
  if(!accessReadiness.ready) return NextResponse.json({ok:false,code:accessReadiness.code,error:"Live purchases are not available until account and subscription services are connected."},{status:503});
  const base = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL ?? request.nextUrl.origin, siteConfig.url);
  const orderId = request.nextUrl.searchParams.get("orderId");

  const resultUrl = (locale: string, status: string, extra: Record<string, string> = {}) => {
    const url = new URL(`${base}/${locale}/checkout/result`);
    url.searchParams.set("status", status);
    if (orderId) url.searchParams.set("order", orderId);
    for (const [k, v] of Object.entries(extra)) url.searchParams.set(k, v);
    return url.toString();
  };

  if (!orderId) {
    return NextResponse.redirect(resultUrl("fa", "failed", { reason: "missing_order" }));
  }

  const order = await findOrder(orderId);
  if (!order) {
    return NextResponse.redirect(resultUrl("fa", "failed", { reason: "unknown_order" }));
  }

  // A webhook may have already settled this order; do not verify twice.
  if (order.status === "paid") {
    return NextResponse.redirect(
      resultUrl(order.locale, "success", { ref: order.settlementRef ?? "" }),
    );
  }

  const params: Record<string, string> = {};
  request.nextUrl.searchParams.forEach((value, key) => {
    params[key] = value;
  });

  if (params.cancelled === "1") {
    await markOrderStatus(orderId, "failed");
    return NextResponse.redirect(resultUrl(order.locale, "failed", { reason: "cancelled" }));
  }

  try {
    const provider = getProvider(order.method, order.provider);
    const verification = await provider.verifyPayment({ order, params });

    if (verification.ok) {
      await markOrderStatus(orderId, "paid", { settlementRef: verification.settlementRef });
      return NextResponse.redirect(
        resultUrl(order.locale, "success", { ref: verification.settlementRef ?? "" }),
      );
    }

    await markOrderStatus(orderId, "failed");
    return NextResponse.redirect(
      resultUrl(order.locale, "failed", { reason: String(verification.code ?? "declined") }),
    );
  } catch (error) {
    console.error("[payments/verify]", error);
    return NextResponse.redirect(resultUrl(order.locale, "failed", { reason: "verification_error" }));
  }
}
