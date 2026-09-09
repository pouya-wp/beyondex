import type { Locale } from "@/lib/i18n/config";
import type { Currency, OrderLine } from "./types";

export const VAT_RATE = 0.09;

export interface Coupon {
  code: string;
  /** Percentage off, 0–100. */
  percent: number;
  label: { fa: string; en: string };
}

export const coupons: Coupon[] = [
  { code: "BEYOND20", percent: 20, label: { en: "Launch offer — 20% off", fa: "پیشنهاد افتتاحیه — ۲۰٪ تخفیف" } },
  { code: "NOWRUZ", percent: 15, label: { en: "Nowruz — 15% off", fa: "نوروز — ۱۵٪ تخفیف" } },
  { code: "AGENT10", percent: 10, label: { en: "10% off", fa: "۱۰٪ تخفیف" } },
];

export function findCoupon(code: string): Coupon | undefined {
  const normalized = code.trim().toUpperCase();
  return coupons.find((c) => c.code === normalized);
}

export interface Totals {
  subtotal: number;
  discount: number;
  taxable: number;
  tax: number;
  total: number;
}

export function computeTotals(lines: OrderLine[], couponCode?: string): Totals {
  const subtotal = lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0);
  const coupon = couponCode ? findCoupon(couponCode) : undefined;
  const discount = coupon ? Math.round((subtotal * coupon.percent) / 100) : 0;
  const taxable = subtotal - discount;
  const tax = Math.round(taxable * VAT_RATE);
  return { subtotal, discount, taxable, tax, total: taxable + tax };
}

/** Persian visitors are billed in Toman, everyone else in USD. */
export function currencyForLocale(locale: Locale): Currency {
  return locale === "fa" ? "IRT" : "USD";
}

/**
 * Indicative rate used only to show a crypto-equivalent figure next to a Toman
 * total. Real settlement always uses the provider's own quote at invoice time.
 */
export const INDICATIVE_USD_TO_IRT = Number(process.env.NEXT_PUBLIC_USD_IRT_RATE ?? 91_500);

export function toUsd(amount: number, currency: Currency) {
  if (currency === "USD") return amount;
  const toman = currency === "IRR" ? amount / 10 : amount;
  return Math.max(1, Math.round((toman / INDICATIVE_USD_TO_IRT) * 100) / 100);
}
