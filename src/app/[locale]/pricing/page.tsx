import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PricingTable } from "@/components/home/PricingTable";
import { FaqList } from "@/components/home/Faq";
import { PaymentRails } from "@/components/home/PaymentRails";
import { CtaBand } from "@/components/home/CtaBand";
import { Icons } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { getDictionary } from "@/lib/i18n";
import { isLocale, t, type Locale } from "@/lib/i18n/config";
import { securityPoints } from "@/lib/data/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.nav.pricing,
    description: dict.pricing.subtitle,
    alternates: { canonical: `/${locale}/pricing` },
  };
}

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  return (
    <>
      <section className="relative overflow-hidden pb-4 pt-16 md:pt-20">
        <div className="wash" />
        <div className="dots" />
        <div className="container-page relative">
          <SectionHeading
            eyebrow={dict.pricing.eyebrow}
            title={dict.pricing.title}
            subtitle={dict.pricing.subtitle}
            className="mx-auto"
          />
        </div>
      </section>

      <section className="section pt-12">
        <div className="container-page">
          <PricingTable locale={locale} dict={dict} />
        </div>
      </section>

      <p className="container-page text-center text-sm text-ink-muted">{locale==='fa'?'خرید و پرداخت فعلاً فعال نیست؛ تعرفه‌ها برای بررسی پیش از راه‌اندازی نمایش داده می‌شوند.':'Purchases and payments are not active yet. Prices are displayed for review before launch.'}</p>

      <section className="section pt-0">
        <div className="container-page">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {securityPoints.map((point, i) => (
              <Reveal key={point.title.en} delay={i * 70}>
                <div className="card h-full p-6">
                  <Icons.lock size={18} className="text-primary" />
                  <h3 className="mt-4 text-[0.9375rem] font-bold tracking-tight">
                    {t(point.title, locale)}
                  </h3>
                  <p className="pretty mt-2 text-[0.8125rem] leading-[1.9] text-ink-muted">
                    {t(point.body, locale)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="section pt-0">
        <div className="container-page">
          <SectionHeading eyebrow={dict.faq.eyebrow} title={dict.pricing.faqTitle} className="mx-auto" />
          <FaqList locale={locale} />
        </div>
      </section>

      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
