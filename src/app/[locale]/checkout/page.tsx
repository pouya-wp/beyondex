import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckoutClient } from "@/components/checkout/CheckoutClient";
import { SectionHeading } from "@/components/ui/Primitives";
import { getDictionary } from "@/lib/i18n";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { resolveItem } from "@/lib/data/catalog";
import { availableMethods } from "@/lib/payments";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return { title: dict.checkout.title, robots: { index: false, follow: false } };
}

export default async function CheckoutPage({
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

  const item = resolveItem({
    agent: pick("agent"),
    template: pick("template"),
    plan: pick("plan"),
    cycle: pick("cycle"),
  });

  if (!item) notFound();

  return (
    <section className="relative overflow-hidden py-16 md:py-20">
      <div className="wash" />
      <div className="dots" />

      <div className="container-page relative">
        <SectionHeading align="start" title={dict.checkout.title} subtitle={dict.checkout.subtitle} />

        <div className="mt-12">
          <CheckoutClient item={item} locale={locale} dict={dict} methods={availableMethods()} />
        </div>
      </div>
    </section>
  );
}
