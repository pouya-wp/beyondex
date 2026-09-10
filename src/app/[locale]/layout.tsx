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
import "../blog.css";
import { SiteChrome } from "@/components/site/SiteChrome";
import { getDictionary } from "@/lib/i18n";
import { isLocale, locales, localeMeta, type Locale } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/data/site";
import { agents } from "@/lib/data/agents";
import { localizedMetadata, safeJsonLd } from "@/lib/seo";

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
    ...localizedMetadata({ locale, title: dict.meta.title, description: dict.meta.description }),
    metadataBase: new URL(siteConfig.url),
    title: {
      default: dict.meta.title,
      template: `%s · ${siteConfig.name}`,
    },
    description: dict.meta.description,
    keywords: dict.meta.keywords.split(",").map((k) => k.trim()),
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category: "Artificial intelligence software",
    manifest: "/manifest.webmanifest",
    icons: {
      icon: [{ url: "/brand/beyondex-mark.svg", type: "image/svg+xml" }],
      apple: [{ url: "/brand/logo-check.png" }],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
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
      <head>{locale === "fa" && <link rel="preload" href="/MorabbaVF.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />}</head>
      <body>
        <SiteChrome locale={locale} dict={dict}>{children}</SiteChrome>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: safeJsonLd({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${siteConfig.url}/#organization`,
                  name: siteConfig.name,
                  alternateName: siteConfig.nameFa,
                  url: siteConfig.url,
                  email: siteConfig.email,
                  logo: `${siteConfig.url}/brand/beyondex-logo.svg`,
                  description: dict.meta.description,
                },
                {
                  "@type": "WebSite",
                  "@id": `${siteConfig.url}/#website`,
                  url: siteConfig.url,
                  name: siteConfig.name,
                  publisher: { "@id": `${siteConfig.url}/#organization` },
                  inLanguage: ["fa-IR", "en"],
                  hasPart: agents.map((agent) => ({
                    "@type": "SoftwareApplication",
                    "@id": `${siteConfig.url}/${locale}/agents/${agent.slug}#software`,
                    name: agent.name[locale],
                    alternateName: agent.name[locale === "fa" ? "en" : "fa"],
                    description: agent.tagline[locale],
                    url: `${siteConfig.url}/${locale}/agents/${agent.slug}`,
                    applicationCategory: "BusinessApplication",
                    operatingSystem: "Web",
                    inLanguage: htmlLang,
                  })),
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}



