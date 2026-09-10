import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import { localeMeta } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/data/site";

const ogLocale: Record<Locale, string> = { fa: "fa_IR", en: "en_US" };

export function localizedUrls(locale: Locale, path = "") {
  const cleanPath = path && path !== "/" ? (path.startsWith("/") ? path : `/${path}`) : "";
  return {
    canonical: `/${locale}${cleanPath}`,
    languages: {
      fa: `/fa${cleanPath}`,
      en: `/en${cleanPath}`,
      "x-default": `/fa${cleanPath}`,
    },
  };
}

export function localizedMetadata({
  locale,
  path = "",
  title,
  description,
}: {
  locale: Locale;
  path?: string;
  title: string;
  description: string;
}): Metadata {
  const alternates = localizedUrls(locale, path);
  const canonical = new URL(alternates.canonical, siteConfig.url).toString();

  return {
    title,
    description,
    alternates,
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title,
      description,
      url: canonical,
      locale: ogLocale[locale],
      alternateLocale: locale === "fa" ? [ogLocale.en] : [ogLocale.fa],
      images: [{ url: `/${locale}/opengraph-image`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/${locale}/opengraph-image`],
    },
  };
}

export function safeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function breadcrumbJsonLd(locale: Locale, items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    inLanguage: localeMeta[locale].htmlLang,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, siteConfig.url).toString(),
    })),
  };
}
