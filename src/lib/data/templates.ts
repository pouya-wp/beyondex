import type { L10n } from "@/lib/i18n/config";

export type TemplateCategory = "saas" | "ecommerce" | "agency" | "event" | "app" | "fintech";

export interface LandingTemplate {
  slug: string;
  name: L10n;
  description: L10n;
  category: TemplateCategory;
  price: { usd: number; irt: number };
  sections: number;
  lift: string;
  gradient: [string, string];
  tags: L10n[];
  rtlReady: boolean;
}

export const templateCategories: { id: TemplateCategory | "all"; label: L10n }[] = [
  { id: "all", label: { en: "All templates", fa: "همهٔ قالب‌ها" } },
  { id: "saas", label: { en: "SaaS", fa: "نرم‌افزار سرویس‌محور" } },
  { id: "ecommerce", label: { en: "E-commerce", fa: "فروشگاهی" } },
  { id: "agency", label: { en: "Agency", fa: "آژانس" } },
  { id: "app", label: { en: "Mobile app", fa: "اپلیکیشن" } },
  { id: "event", label: { en: "Event", fa: "رویداد" } },
  { id: "fintech", label: { en: "Fintech", fa: "فین‌تک" } },
];

export const templates: LandingTemplate[] = [
  {
    slug: "orbit-saas",
    name: { en: "Orbit", fa: "اوربیت" },
    description: {
      en: "A dark, high-contrast SaaS launch page with an interactive pricing calculator and a demo request flow.",
      fa: "صفحهٔ معرفی محصول نرم‌افزاری با تم تیره و کنتراست بالا، ماشین‌حساب تعرفهٔ تعاملی و فرم درخواست دمو.",
    },
    category: "saas",
    price: { usd: 49, irt: 890_000 },
    sections: 14,
    lift: "+38%",
    gradient: ["#7C3AED", "#22D3EE"],
    tags: [
      { en: "Pricing calculator", fa: "ماشین‌حساب تعرفه" },
      { en: "Dark mode", fa: "حالت تیره" },
    ],
    rtlReady: true,
  },
  {
    slug: "bazaar-commerce",
    name: { en: "Bazaar", fa: "بازار" },
    description: {
      en: "A product-first commerce page with size guides, bundle upsells and a one-page Rial checkout.",
      fa: "صفحهٔ فروش محصول‌محور با راهنمای سایز، پیشنهاد باندل و پرداخت ریالی تک‌صفحه‌ای.",
    },
    category: "ecommerce",
    price: { usd: 59, irt: 1_090_000 },
    sections: 17,
    lift: "+44%",
    gradient: ["#F97316", "#EC4899"],
    tags: [
      { en: "Rial checkout", fa: "پرداخت ریالی" },
      { en: "Upsells", fa: "فروش مکمل" },
    ],
    rtlReady: true,
  },
  {
    slug: "atlas-agency",
    name: { en: "Atlas", fa: "اطلس" },
    description: {
      en: "A portfolio and services page for studios, with case-study layouts and a qualified enquiry form.",
      fa: "صفحهٔ نمونه‌کار و خدمات برای استودیوها، با چیدمان مطالعهٔ موردی و فرم درخواست هوشمند.",
    },
    category: "agency",
    price: { usd: 45, irt: 820_000 },
    sections: 12,
    lift: "+27%",
    gradient: ["#0EA5E9", "#8B5CF6"],
    tags: [
      { en: "Case studies", fa: "مطالعهٔ موردی" },
      { en: "Lead scoring", fa: "امتیازدهی سرنخ" },
    ],
    rtlReady: true,
  },
  {
    slug: "pulse-app",
    name: { en: "Pulse", fa: "پالس" },
    description: {
      en: "A mobile app landing page with device mockups, store badges and an animated feature walkthrough.",
      fa: "لندینگ اپلیکیشن موبایل با ماکاپ دستگاه، نشان فروشگاه‌ها و تور انیمیشنی امکانات.",
    },
    category: "app",
    price: { usd: 39, irt: 690_000 },
    sections: 11,
    lift: "+31%",
    gradient: ["#22C55E", "#14B8A6"],
    tags: [
      { en: "App store ready", fa: "آمادهٔ استور" },
      { en: "Motion", fa: "انیمیشن" },
    ],
    rtlReady: true,
  },
  {
    slug: "summit-event",
    name: { en: "Summit", fa: "ساميت" },
    description: {
      en: "A conference page with a live agenda, speaker grid, ticket tiers and countdown urgency.",
      fa: "صفحهٔ رویداد با برنامهٔ زنده، شبکهٔ سخنرانان، سطوح بلیت و شمارش معکوس.",
    },
    category: "event",
    price: { usd: 42, irt: 760_000 },
    sections: 13,
    lift: "+52%",
    gradient: ["#F43F5E", "#F59E0B"],
    tags: [
      { en: "Ticketing", fa: "بلیت‌فروشی" },
      { en: "Countdown", fa: "شمارش معکوس" },
    ],
    rtlReady: true,
  },
  {
    slug: "vault-fintech",
    name: { en: "Vault", fa: "والت" },
    description: {
      en: "A trust-forward fintech page with security proof points, licence badges and a crypto-ready payment block.",
      fa: "صفحهٔ فین‌تک با تأکید بر اعتماد: شواهد امنیتی، نشان مجوزها و بلوک پرداخت آمادهٔ کریپتو.",
    },
    category: "fintech",
    price: { usd: 65, irt: 1_190_000 },
    sections: 16,
    lift: "+35%",
    gradient: ["#6366F1", "#0EA5E9"],
    tags: [
      { en: "Crypto payments", fa: "پرداخت کریپتو" },
      { en: "Compliance", fa: "انطباق" },
    ],
    rtlReady: true,
  },
];

export function getTemplate(slug: string) {
  return templates.find((t) => t.slug === slug);
}
