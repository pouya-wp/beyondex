"use client";
import {accessReadiness} from "@/lib/access/contract";

import { useMemo, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/ui/Icon";
import type { CatalogItem } from "@/lib/data/catalog";
import type { Dictionary } from "@/lib/i18n";
import { t, type Locale } from "@/lib/i18n/config";
import { computeTotals, findCoupon } from "@/lib/payments/pricing";
import type { CryptoNetwork, PaymentMethod } from "@/lib/payments/types";
import { cn, formatNumber, isValidEmail } from "@/lib/utils";

const fieldClass =
  "h-12 w-full rounded-2xl border border-line bg-bg px-4 text-sm text-ink outline-none transition-colors placeholder:text-ink-subtle focus:border-brand-400";

const networks: { id: CryptoNetwork; label: string; chain: string }[] = [
  { id: "USDT_TRC20", label: "USDT", chain: "TRC20" },
  { id: "USDT_ERC20", label: "USDT", chain: "ERC20" },
  { id: "BTC", label: "BTC", chain: "Bitcoin" },
  { id: "ETH", label: "ETH", chain: "Ethereum" },
];

export function CheckoutClient({
  item,
  locale,
  dict,
  methods,
}: {
  item: CatalogItem;
  locale: Locale;
  dict: Dictionary;
  methods: PaymentMethod[];
}) {
  const [method, setMethod] = useState<PaymentMethod>(methods[0] ?? "rial");
  const [network, setNetwork] = useState<CryptoNetwork>("USDT_TRC20");
  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState<string | undefined>();
  const [couponError, setCouponError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Toman for the Iranian gateway, dollars for crypto and cards.
  const currency = method === "rial" ? "IRT" : "USD";
  const unitPrice = currency === "IRT" ? item.price.irt : item.price.usd;

  const totals = useMemo(
    () =>
      computeTotals(
        [{ sku: item.sku, title: t(item.name, locale), quantity: 1, unitPrice }],
        coupon,
      ),
    [item, locale, unitPrice, coupon],
  );

  function money(value: number) {
    return currency === "IRT"
      ? `${formatNumber(value, locale)} ${dict.common.currencyIRT}`
      : `$${formatNumber(value, locale)}`;
  }

  function applyCoupon() {
    const found = findCoupon(couponInput);
    if (!found) {
      setCouponError(true);
      setCoupon(undefined);
      return;
    }
    setCouponError(false);
    setCoupon(found.code);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "");
    if (!isValidEmail(email)) {
      setError(dict.newsletter.error);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/payments/create", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          sku: item.sku,
          method,
          network: method === "crypto" ? network : undefined,
          couponCode: coupon,
          locale,
          customer: {
            email,
            fullName: String(form.get("fullName") ?? ""),
            phone: String(form.get("phone") ?? ""),
            company: String(form.get("company") ?? ""),
          },
        }),
      });

      const data = (await res.json()) as
        | { ok: true; redirectUrl: string }
        | { ok: false; error: string };

      if (!res.ok || !data.ok) {
        setError("error" in data ? data.error : "Payment could not be started.");
        setSubmitting(false);
        return;
      }

      window.location.href = data.redirectUrl;
    } catch {
      setError(locale === "fa" ? "ارتباط با درگاه برقرار نشد." : "Could not reach the gateway.");
      setSubmitting(false);
    }
  }

  const methodCards: Record<PaymentMethod, { title: string; desc: string; icon: typeof Icons.wallet }> = {
    rial: { title: dict.checkout.rial, desc: dict.checkout.rialDesc, icon: Icons.wallet },
    crypto: { title: dict.checkout.crypto, desc: dict.checkout.cryptoDesc, icon: Icons.bitcoin },
    card: { title: dict.checkout.cardIntl, desc: dict.checkout.cardIntlDesc, icon: Icons.creditCard },
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
      {/* ── Payment form ───────────────────────────────────── */}
      <form onSubmit={onSubmit} noValidate><p className="ax-hub-notice" role="status">{locale==="fa"?"خرید واقعی تا اتصال سرویس حساب و اشتراک فعال نیست. این صفحه پیش‌نمایش است.":"Live purchases are unavailable until account and subscription services are connected. This is a preview."}</p>
        <div className="card p-7">
          <h2 className="text-[0.9375rem] font-bold tracking-tight">{dict.checkout.methodTitle}</h2>

          <div className="mt-5 grid gap-3">
            {methods.map((m) => {
              const card = methodCards[m];
              const Icon = card.icon;
              const active = method === m;
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMethod(m)}
                  aria-pressed={active}
                  className={cn(
                    "flex items-start gap-4 rounded-2xl border p-4 text-start transition-all",
                    active
                      ? "border-brand-400 bg-primary-soft"
                      : "border-line hover:border-brand-400",
                  )}
                >
                  <span
                    className={cn(
                      "grid size-10 shrink-0 place-items-center rounded-xl transition-colors",
                      active ? "bg-primary-soft text-brand-700" : "bg-bg text-ink-subtle",
                    )}
                  >
                    <Icon size={19} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.875rem] font-semibold">{card.title}</span>
                    <span className="mt-1 block text-[0.75rem] leading-[1.75] text-ink-muted">
                      {card.desc}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "mt-1 grid size-5 shrink-0 place-items-center rounded-full border transition-colors",
                      active ? "border-brand-400 bg-brand-500 text-white" : "border-line-strong",
                    )}
                  >
                    {active ? <Icons.check size={12} /> : null}
                  </span>
                </button>
              );
            })}
          </div>

          {method === "crypto" ? (
            <div className="mt-5">
              <span className="mb-2.5 block text-[0.75rem] font-semibold text-ink-muted">
                {dict.checkout.selectNetwork}
              </span>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {networks.map((n) => {
                  const active = network === n.id;
                  return (
                    <button
                      key={n.id}
                      type="button"
                      onClick={() => setNetwork(n.id)}
                      aria-pressed={active}
                      className={cn(
                        "rounded-xl border px-3 py-2.5 text-center transition-all",
                        active
                          ? "border-c-blue/60 bg-c-blue/10 text-ink"
                          : "border-line text-ink-muted hover:border-c-blue/35",
                      )}
                      dir="ltr"
                    >
                      <span className="block text-[0.8125rem] font-bold">{n.label}</span>
                      <span className="mt-0.5 block text-[0.625rem] text-ink-subtle">{n.chain}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>

        <div className="card mt-4 p-7">
          <h2 className="text-[0.9375rem] font-bold tracking-tight">
            {locale === "fa" ? "اطلاعات خریدار" : "Your details"}
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="fullName" className="mb-2 block text-[0.75rem] font-semibold text-ink-muted">
                {dict.checkout.fullName}
              </label>
              <input id="fullName" name="fullName" required className={fieldClass} />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-[0.75rem] font-semibold text-ink-muted">
                {dict.checkout.email}
              </label>
              <input id="email" name="email" type="email" dir="ltr" required className={fieldClass} />
            </div>
            <div>
              <label htmlFor="phone" className="mb-2 block text-[0.75rem] font-semibold text-ink-muted">
                {dict.checkout.phone}
              </label>
              <input id="phone" name="phone" type="tel" dir="ltr" className={fieldClass} />
            </div>
            <div>
              <label htmlFor="company" className="mb-2 block text-[0.75rem] font-semibold text-ink-muted">
                {dict.checkout.company}
              </label>
              <input id="company" name="company" className={fieldClass} />
            </div>
          </div>

          {error ? (
            <p className="mt-5 rounded-2xl border border-c-rose/30 bg-c-rose/8 px-4 py-3 text-[0.8125rem] text-c-rose" role="alert">
              {error}
            </p>
          ) : null}

          <Button type="submit" size="lg" className="mt-6 w-full" disabled={submitting || !accessReadiness.ready}>
            {submitting ? dict.checkout.processing : `${dict.checkout.payNow} · ${money(totals.total)}`}
            {!submitting ? <Icons.arrowRight size={17} className="flip-rtl" /> : null}
          </Button>

          <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[0.6875rem] text-ink-subtle">
            <Icons.lock size={12} />
            {dict.checkout.secureNote}
          </p>
          <p className="mt-2 text-center text-[0.6875rem] leading-[1.8] text-ink-subtle">
            {dict.checkout.terms}
          </p>
        </div>
      </form>

      {/* ── Order summary ──────────────────────────────────── */}
      <aside className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
        <div className="card p-7">
          <h2 className="text-[0.9375rem] font-bold tracking-tight">{dict.checkout.orderSummary}</h2>

          <div className="mt-5 flex items-start justify-between gap-4 border-b border-line pb-5">
            <div className="min-w-0">
              <div className="text-[0.875rem] font-semibold">{t(item.name, locale)}</div>
              <p className="pretty mt-1 text-[0.6875rem] leading-[1.75] text-ink-muted">
                {t(item.subtitle, locale)}
              </p>
            </div>
            <div className="shrink-0 text-end">
              <div className="tabular text-[0.875rem] font-bold">{money(unitPrice)}</div>
              {item.recurring ? (
                <div className="text-[0.625rem] text-ink-subtle">{item.sku.endsWith(":yearly") ? (locale === "fa" ? "برای یک سال" : "per year") : dict.common.perMonth}</div>
              ) : (
                <div className="text-[0.625rem] text-ink-subtle">{dict.common.oneTime}</div>
              )}
            </div>
          </div>

          {/* Coupon */}
          <div className="mt-5">
            <label htmlFor="coupon" className="mb-2 block text-[0.75rem] font-semibold text-ink-muted">
              {dict.checkout.coupon}
            </label>
            <div className="flex gap-2">
              <input
                id="coupon"
                value={couponInput}
                onChange={(e) => {
                  setCouponInput(e.target.value);
                  setCouponError(false);
                }}
                dir="ltr"
                placeholder="BEYOND20"
                className="h-11 flex-1 rounded-2xl border border-line bg-bg px-4 text-sm uppercase text-ink outline-none transition-colors placeholder:text-ink-subtle focus:border-brand-400"
              />
              <button
                type="button"
                onClick={applyCoupon}
                className="h-11 shrink-0 rounded-2xl border border-line-strong px-5 text-[0.8125rem] font-semibold transition-colors hover:border-brand-400 hover:text-brand-700"
              >
                {dict.checkout.apply}
              </button>
            </div>
            {couponError ? (
              <p className="mt-2 text-[0.6875rem] text-c-rose">{dict.checkout.couponInvalid}</p>
            ) : coupon ? (
              <p className="mt-2 inline-flex items-center gap-1.5 text-[0.6875rem] text-c-green">
                <Icons.check size={12} />
                {dict.checkout.couponApplied} · {coupon}
              </p>
            ) : null}
          </div>

          <dl className="mt-6 space-y-2.5 border-t border-line pt-5 text-[0.8125rem]">
            <div className="flex justify-between">
              <dt className="text-ink-muted">{dict.checkout.subtotal}</dt>
              <dd className="tabular">{money(totals.subtotal)}</dd>
            </div>
            {totals.discount > 0 ? (
              <div className="flex justify-between text-c-green">
                <dt>{dict.checkout.discount}</dt>
                <dd className="tabular">−{money(totals.discount)}</dd>
              </div>
            ) : null}
            <div className="flex justify-between">
              <dt className="text-ink-muted">{dict.checkout.tax}</dt>
              <dd className="tabular">{money(totals.tax)}</dd>
            </div>
            <div className="flex items-end justify-between border-t border-line pt-4">
              <dt className="text-[0.875rem] font-bold">{dict.checkout.total}</dt>
              <dd className="tabular text-[1.25rem] font-extrabold">{money(totals.total)}</dd>
            </div>
          </dl>

          <div className="mt-6 space-y-2.5 rounded-2xl border border-line bg-bg p-4">
            {[
              locale === "fa" ? "فعال‌سازی آنی پس از پرداخت" : "Instant activation after payment",
              locale === "fa" ? "فاکتور رسمی خودکار" : "Invoice issued automatically",
              locale === "fa" ? "شرایط اشتراک مطابق محصول" : "Subscription terms depend on the product",
            ].map((line) => (
              <p key={line} className="flex items-center gap-2 text-[0.75rem] text-ink-muted">
                <Icons.check size={13} className="text-c-green" />
                {line}
              </p>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
