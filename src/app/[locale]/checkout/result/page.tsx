import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/Button";
import { Icons } from "@/components/ui/Icon";
import { CopyField } from "@/components/checkout/CopyField";
import { getDictionary } from "@/lib/i18n";
import { isLocale, localePath, type Locale } from "@/lib/i18n/config";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function CheckoutResultPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  const query = await searchParams;
  const pick = (key: string) => {
    const value = query[key];
    return Array.isArray(value) ? value[0] : value;
  };

  const status = pick("status") ?? "failed";
  const orderId = pick("order");
  const ref = pick("ref");

  const awaiting = status === "awaiting";
  const success = status === "success";

  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden py-20">
      <div className="wash" />
      <div className="dots" />

      <div className="container-page relative">
        <div className="card mx-auto max-w-xl p-9 text-center md:p-12">
          <span
            className="mx-auto grid size-16 place-items-center rounded-full border"
            style={{
              color: success ? "var(--teal)" : awaiting ? "var(--amber)" : "var(--rose)",
              borderColor: success
                ? "rgb(45 212 191 / 0.35)"
                : awaiting
                  ? "rgb(245 158 11 / 0.35)"
                  : "rgb(251 113 133 / 0.35)",
              background: success
                ? "rgb(45 212 191 / 0.1)"
                : awaiting
                  ? "rgb(245 158 11 / 0.1)"
                  : "rgb(251 113 133 / 0.1)",
            }}
          >
            {success ? (
              <Icons.check size={30} />
            ) : awaiting ? (
              <Icons.clock size={30} />
            ) : (
              <Icons.close size={30} />
            )}
          </span>

          <h1 className="balance mt-7 text-[clamp(1.5rem,3.5vw,2.25rem)] font-extrabold tracking-[-0.02em]">
            {success
              ? dict.checkout.successTitle
              : awaiting
                ? locale === "fa"
                  ? "در انتظار تأیید تراکنش"
                  : "Waiting for confirmation"
                : dict.checkout.failedTitle}
          </h1>

          <p className="pretty mx-auto mt-4 max-w-sm text-[0.9375rem] leading-[1.95] text-ink-muted">
            {success
              ? dict.checkout.successBody
              : awaiting
                ? locale === "fa"
                  ? "مبلغ را به آدرس زیر واریز کنید. به‌محض تأیید روی زنجیره، فضای کاری شما باز می‌شود."
                  : "Send the amount to the address below. Your workspace unlocks the moment the transaction confirms on-chain."
                : dict.checkout.failedBody}
          </p>

          {awaiting ? (
            <div className="mt-8 space-y-3 text-start">
              <CopyField
                label={dict.checkout.amountDue}
                value={`${pick("amount") ?? ""} ${pick("asset") ?? ""}`.trim()}
              />
              <CopyField label={locale === "fa" ? "آدرس واریز" : "Deposit address"} value={pick("address") ?? ""} />
              <CopyField label={dict.checkout.network} value={pick("network") ?? ""} />
            </div>
          ) : null}

          {(orderId || ref) && !awaiting ? (
            <dl className="mt-8 space-y-2 rounded-2xl border border-line bg-bg p-5 text-start text-[0.8125rem]">
              {orderId ? (
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-ink-subtle">{locale === "fa" ? "شمارهٔ سفارش" : "Order"}</dt>
                  <dd className="tabular font-semibold" dir="ltr">
                    {orderId}
                  </dd>
                </div>
              ) : null}
              {ref ? (
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-ink-subtle">{dict.checkout.refId}</dt>
                  <dd className="tabular font-semibold" dir="ltr">
                    {ref}
                  </dd>
                </div>
              ) : null}
            </dl>
          ) : null}

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            {success ? (
              <ButtonLink href={localePath(locale, "/agents")} size="lg">
                {dict.checkout.successCta}
                <Icons.arrowRight size={17} className="flip-rtl" />
              </ButtonLink>
            ) : (
              <ButtonLink href={localePath(locale, "/pricing")} size="lg">
                {dict.checkout.failedCta}
              </ButtonLink>
            )}
            <ButtonLink href={localePath(locale, "/contact")} variant="outline" size="lg">
              {dict.footer.support}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
