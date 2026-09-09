import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import "../atmosphere.css";
import "../night.css";
import "../interlude.css";
import "../fluid.css";
import "../access.css";
import "../signature.css";
import "../experiments.css";
import "../lab.css";
import "../selections.css";
import "../product.css";
import { SiteChrome } from "@/components/site/SiteChrome";
import { getDictionary } from "@/lib/i18n";
import { isLocale, locales, localeMeta, type Locale } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/data/site";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#050711",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: dict.meta.title,
      template: `%s · ${siteConfig.name}`,
    },
    description: dict.meta.description,
    keywords: dict.meta.keywords.split(",").map((k) => k.trim()),
    applicationName: siteConfig.name,
    alternates: {
      canonical: `/${locale}`,
      languages: { fa: "/fa", en: "/en", "x-default": "/fa" },
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: dict.meta.title,
      description: dict.meta.description,
      locale: localeMeta[locale].htmlLang,
      url: `/${locale}`,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const { dir, htmlLang } = localeMeta[locale];

  return (
    <html lang={htmlLang} dir={dir} data-theme="dark">
      <head>
        {locale === "fa" && <link rel="preload" href="/MorabbaVF.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>
        <SiteChrome locale={locale} dict={dict}>{children}</SiteChrome>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: siteConfig.name,
              url: siteConfig.url,
              email: siteConfig.email,
              description: dict.meta.description,
              sameAs: Object.values(siteConfig.socials),
            }),
          }}
        />
      </body>
    </html>
  );
}



