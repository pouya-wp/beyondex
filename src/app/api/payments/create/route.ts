import {accessReadiness} from "@/lib/access/contract";
import { NextResponse, type NextRequest } from "next/server";
import { getProvider } from "@/lib/payments";
import { PaymentError, type CryptoNetwork, type Order, type PaymentMethod } from "@/lib/payments/types";
import { createOrderId, saveOrder, updateOrder } from "@/lib/payments/orders";
import { computeTotals } from "@/lib/payments/pricing";
import { resolveItem } from "@/lib/data/catalog";
import { isLocale, t, type Locale } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/data/site";
import { isValidEmail } from "@/lib/utils";

export const runtime = "nodejs";

interface CreateBody {
  sku?: string;
  method?: PaymentMethod;
  network?: CryptoNetwork;
  couponCode?: string;
  locale?: string;
  customer?: { email?: string; fullName?: string; phone?: string; company?: string };
}

/** Turns `agent:email-marketing` back into the query shape resolveItem expects. */
function paramsFromSku(sku: string) {
  const [kind, slug, cycle] = sku.split(":");
  if (kind === "agent") return { agent: slug };
  if (kind === "template") return { template: slug };
  if (kind === "plan") return { plan: slug, cycle };
  return {};
}

function baseUrl(request: NextRequest) {
  return process.env.NEXT_PUBLIC_SITE_URL ?? request.nextUrl.origin ?? siteConfig.url;
}

export async function POST(request: NextRequest) {
  if(!accessReadiness.ready) return NextResponse.json({ok:false,code:accessReadiness.code,error:"Live purchases are not available until account and subscription services are connected."},{status:503});
  let body: CreateBody;
  try {
    body = (await request.json()) as CreateBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request body." }, { status: 400 });
  }

  const method: PaymentMethod = body.method ?? "rial";
  const locale: Locale = isLocale(body.locale ?? "") ? (body.locale as Locale) : "fa";

  const email = body.customer?.email?.trim() ?? "";
  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "A valid email address is required." }, { status: 400 });
  }

  const item = body.sku ? resolveItem(paramsFromSku(body.sku)) : undefined;
  if (!item) {
    return NextResponse.json({ ok: false, error: "That product is not available." }, { status: 404 });
  }

  // Price is recomputed server-side; the client's numbers are never trusted.
  const currency = method === "rial" ? "IRT" : "USD";
  const unitPrice = currency === "IRT" ? item.price.irt : item.price.usd;

  if (unitPrice <= 0) {
    return NextResponse.json(
      { ok: false, error: "This plan is free — no payment is required." },
      { status: 400 },
    );
  }

  const lines = [
    { sku: item.sku, title: t(item.name, locale), quantity: 1, unitPrice },
  ];
  const totals = computeTotals(lines, body.couponCode);

  const order: Order = {
    id: createOrderId(),
    createdAt: new Date().toISOString(),
    status: "pending",
    currency,
    amount: totals.total,
    subtotal: totals.subtotal,
    discount: totals.discount,
    tax: totals.tax,
    lines,
    customer: {
      email,
      fullName: body.customer?.fullName?.trim() || email.split("@")[0],
      phone: body.customer?.phone?.trim(),
      company: body.customer?.company?.trim(),
    },
    method,
    locale,
    couponCode: body.couponCode,
    network: method === "crypto" ? (body.network ?? "USDT_TRC20") : undefined,
  };

  await saveOrder(order);

  try {
    const provider = getProvider(method);
    const callbackUrl = `${baseUrl(request)}/api/payments/verify?orderId=${order.id}`;

    const result = await provider.createPayment({
      order,
      callbackUrl,
      description: `${siteConfig.name} · ${lines[0].title}`,
      network: order.network,
    });

    await updateOrder(order.id, {
      status: "awaiting_payment",
      provider: provider.id,
      providerRef: result.providerRef,
    });

    if (result.kind === "redirect") {
      return NextResponse.json({ ok: true, orderId: order.id, redirectUrl: result.url });
    }

    // Crypto: send the buyer to a hosted invoice when there is one, otherwise
    // to our own result page carrying the address to pay.
    const fallback = new URL(`${baseUrl(request)}/${locale}/checkout/result`);
    fallback.searchParams.set("status", "awaiting");
    fallback.searchParams.set("order", order.id);
    fallback.searchParams.set("address", result.address);
    fallback.searchParams.set("amount", result.cryptoAmount);
    fallback.searchParams.set("asset", result.asset);
    fallback.searchParams.set("network", result.network);

    return NextResponse.json({
      ok: true,
      orderId: order.id,
      redirectUrl: result.url ?? fallback.toString(),
    });
  } catch (error) {
    await updateOrder(order.id, { status: "failed" });

    if (error instanceof PaymentError) {
      return NextResponse.json({ ok: false, error: error.message, code: error.code }, { status: error.status });
    }

    console.error("[payments/create]", error);
    return NextResponse.json(
      { ok: false, error: "The payment gateway is unreachable right now." },
      { status: 502 },
    );
  }
}
