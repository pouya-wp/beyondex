export const locales = ["fa", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fa";

export const localeMeta: Record<
  Locale,
  { label: string; nativeLabel: string; dir: "rtl" | "ltr"; htmlLang: string; currency: "IRT" | "USD" }
> = {
  fa: { label: "Persian", nativeLabel: "فارسی", dir: "rtl", htmlLang: "fa-IR", currency: "IRT" },
  en: { label: "English", nativeLabel: "English", dir: "ltr", htmlLang: "en", currency: "USD" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function dirOf(locale: Locale) {
  return localeMeta[locale].dir;
}

/** Localized value helper — every content record stores both languages. */
export type L10n = Record<Locale, string>;

export function t(value: L10n, locale: Locale): string {
  return value[locale] ?? value[defaultLocale];
}

/** Build an href that always carries the active locale. */
export function localePath(locale: Locale, path = "/") {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean}`;
}
