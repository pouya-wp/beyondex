import type { Locale } from "@/lib/i18n/config";

export function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

export function toPersianDigits(input: string | number) {
  return String(input).replace(/[0-9]/g, (d) => PERSIAN_DIGITS[Number(d)]);
}

/** Locale-aware number formatting: Persian digits + Persian grouping for fa. */
export function formatNumber(value: number, locale: Locale) {
  const formatted = new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US", {
    maximumFractionDigits: 0,
  }).format(value);
  return formatted;
}

/**
 * Price display. Persian visitors see Toman, English visitors see USD —
 * the two are separate list prices, not a live conversion.
 */
export function formatPrice(
  price: { usd: number; irt: number },
  locale: Locale,
  opts: { withCurrency?: boolean } = {},
) {
  const { withCurrency = true } = opts;
  if (locale === "fa") {
    const n = formatNumber(price.irt, "fa");
    return withCurrency ? `${n} تومان` : n;
  }
  const n = formatNumber(price.usd, "en");
  return withCurrency ? `$${n}` : n;
}

export function formatCompact(value: number, locale: Locale) {
  return new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

/** Stable pseudo-random from a string — for deterministic decorative layout. */
export function seededRandom(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
