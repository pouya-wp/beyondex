import type { L10n } from "@/lib/i18n/config";

const DEFAULT_SITE_URL = "https://beyondex.one";

/**
 * Turn a configured site URL into an absolute one that `new URL()` accepts.
 * A value without a scheme ("beyondex.ai") or an outright malformed one would
 * otherwise throw where it is used as `metadataBase`, which fails the whole
 * prerender instead of just degrading the canonical links.
 */
export function normalizeSiteUrl(raw: string | undefined | null, fallback = DEFAULT_SITE_URL) {
  const candidate = raw?.trim();
  if (!candidate) return fallback;
  const withScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(candidate) ? candidate : `https://${candidate}`;
  try {
    return new URL(withScheme).toString().replace(/\/$/, "");
  } catch {
    return fallback;
  }
}

export const siteConfig = {
  name: "Beyondex",
  nameFa: "بیاندکس",
  domain: "beyondex.one",
  url:
    process.env.NODE_ENV === "production"
      ? DEFAULT_SITE_URL
      : normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  email: "hello@beyondex.ai",
  salesEmail: "sales@beyondex.ai",
  supportEmail: "support@beyondex.ai",
  phone: "+98 21 9107 4400",
  socials: {
    x: "https://x.com/beyondex",
    linkedin: "https://linkedin.com/company/beyondex",
    github: "https://github.com/beyondex",
    telegram: "https://t.me/beyondex",
    instagram: "https://instagram.com/beyondex",
  },
};

export const integrationLogos = [
  "Slack",
  "HubSpot",
  "Gmail",
  "Shopify",
  "Salesforce",
  "Notion",
  "Zendesk",
  "Stripe",
  "WooCommerce",
  "Telegram",
  "Snowflake",
  "GitHub",
  "WhatsApp",
  "Zarinpal",
  "Sepidar",
  "Digikala",
];

export interface Testimonial {
  quote: L10n;
  name: L10n;
  role: L10n;
  company: string;
  metric: L10n;
}

export const testimonials: Testimonial[] = [
  {
    quote: {
      en: "We stopped hiring a third marketer. The email agent runs the entire lifecycle programme and last quarter it drove more revenue than our paid channel did.",
      fa: "قید استخدام نفر سوم بازاریابی را زدیم. ایجنت ایمیل کل برنامهٔ چرخهٔ عمر را می‌چرخاند و فصل گذشته درآمد بیشتری از کانال تبلیغات پولی ما ساخت.",
    },
    name: { en: "Nazanin Fardad", fa: "نازنین فرداد" },
    role: { en: "Head of Growth", fa: "مدیر رشد" },
    company: "Karnameh",
    metric: { en: "2.7× campaign revenue", fa: "۲٫۷ برابر درآمد کمپین" },
  },
  {
    quote: {
      en: "Month-end close went from nine days to two. The accounting agent reconciles everything overnight and only brings me the genuine exceptions.",
      fa: "بستن ماه از ۹ روز به ۲ روز رسید. ایجنت حسابداری همه‌چیز را شبانه مغایرت‌گیری می‌کند و فقط مغایرت‌های واقعی را می‌آورد.",
    },
    name: { en: "Arman Tabatabaei", fa: "آرمان طباطبایی" },
    role: { en: "Finance Director", fa: "مدیر مالی" },
    company: "Radin Group",
    metric: { en: "9 days → 2 days", fa: "۹ روز ← ۲ روز" },
  },
  {
    quote: {
      en: "Support handles three times the volume with the same four people. What surprised me was the quality — customers stopped noticing which replies were automated.",
      fa: "تیم پشتیبانی با همان چهار نفر، سه برابر حجم قبلی را جواب می‌دهد. چیزی که غافلگیرم کرد کیفیتش بود — مشتری‌ها دیگر تشخیص نمی‌دهند کدام پاسخ خودکار بوده.",
    },
    name: { en: "Sara Mokhtari", fa: "سارا مختاری" },
    role: { en: "VP Customer Experience", fa: "معاون تجربهٔ مشتری" },
    company: "Snapp Market",
    metric: { en: "71% auto-resolved", fa: "٪۷۱ حل خودکار" },
  },
  {
    quote: {
      en: "Being able to pay in Toman through a normal gateway was the reason we chose Beyondex over the American platforms. The crypto option covers our overseas entity.",
      fa: "امکان پرداخت تومانی از طریق یک درگاه معمولی دلیل انتخاب بیاندکس به‌جای پلتفرم‌های آمریکایی بود. گزینهٔ کریپتو هم شرکت خارج از کشورمان را پوشش می‌دهد.",
    },
    name: { en: "Pedram Kiani", fa: "پدرام کیانی" },
    role: { en: "Co-founder", fa: "هم‌بنیان‌گذار" },
    company: "Vitrin",
    metric: { en: "Live in 11 minutes", fa: "راه‌اندازی در ۱۱ دقیقه" },
  },
];

export interface Faq {
  q: L10n;
  a: L10n;
}

export const faqs: Faq[] = [
  {
    "q": {
      "fa": "بیاندکس چه چیزی می‌فروشد؟",
      "en": "What does Beyondex sell?"
    },
    "a": {
      "fa": "دسترسی اشتراکی به ایجنت‌هایی با پنل مدیریت مستقل. اشتراک، تمدید و دسترسی پنل‌ها در بیاندکس مدیریت می‌شود؛ اجرای کارها داخل پنل خود هر ایجنت است.",
      "en": "Subscriptions to agents with independent management panels. Beyondex manages subscriptions, renewals and panel access; work happens in each agent’s own panel."
    }
  },
  {
    "q": {
      "fa": "تست رایگان دقیقاً چیست؟",
      "en": "What does the free trial include?"
    },
    "a": {
      "fa": "فقط دو اجرای محدود برای هر ایجنت، پیش از تهیهٔ اشتراک. پلن رایگان دائمی یا سهمیهٔ ماهانهٔ رایگان نداریم. فعال‌سازی تست پس از اتصال سرویس اشتراک فراهم می‌شود.",
      "en": "Just two limited runs per agent before subscribing. There is no permanent free plan or recurring free allowance. Trial activation awaits the subscription integration."
    }
  },
  {
    "q": {
      "fa": "قیمت اشتراک از چقدر شروع می‌شود؟",
      "en": "Where does subscription pricing start?"
    },
    "a": {
      "fa": "اشتراک ماهانه از ۱۰ میلیون تومان شروع می‌شود. سطوح حرفه‌ای و ویژه از ۳۵ و ۱۲۰ میلیون تومان هستند؛ قیمت قطعی هر ایجنت در صفحهٔ خودش نمایش داده می‌شود.",
      "en": "Monthly subscriptions start at 10 million Toman. Professional and premium levels start at 35 and 120 million Toman; each agent’s final price is shown on its product page."
    }
  },
  {
    "q": {
      "fa": "کارها در کدام پنل انجام می‌شوند؟",
      "en": "Where does the agent work?"
    },
    "a": {
      "fa": "هر ایجنت محیط و رابط کاربری مستقل خودش را دارد. بیاندکس مرکز مدیریت اشتراک و دسترسی است؛ گزارش‌ها و عملیات تخصصی داخل پنل همان ایجنت قرار دارند.",
      "en": "Every agent has an independent interface and environment. Beyondex is the subscription and access hub; specialist operations and reports belong in the agent’s own panel."
    }
  },
  {
    "q": {
      "fa": "آیا خرید و فعال‌سازی الان ممکن است؟",
      "en": "Can I purchase and activate access now?"
    },
    "a": {
      "fa": "فعلاً نسخهٔ پیش‌نمایش است. خرید و فعال‌سازی واقعی تا اتصال سرویس اشتراک در دسترس نیست؛ پرداختی دریافت نمی‌شود.",
      "en": "This is currently a preview. Purchases and activation remain unavailable until subscription services are connected; no payments are collected."
    }
  },
  {
    "q": {
      "fa": "محدودیت‌ها و شرایط استفاده کجا مشخص می‌شوند؟",
      "en": "Where are limits and terms defined?"
    },
    "a": {
      "fa": "قابلیت‌ها و حدود عملکرد را در صفحهٔ هر ایجنت بررسی کنید. شرایط نهایی دسترسی، پشتیبانی و تمدید باید پیش از فعال‌سازی همان محصول مشخص شوند.",
      "en": "Review each agent’s capabilities and boundaries on its product page. Final access, support and renewal terms must be defined before activating that product."
    }
  }
];

export interface SecurityPoint {
  title: L10n;
  body: L10n;
}

export const securityPoints: SecurityPoint[] = [
  {
    "title": {
      "fa": "پنل‌های مستقل",
      "en": "Independent panels"
    },
    "body": {
      "fa": "هر ایجنت رابط کاربری و محیط مدیریت خودش را دارد.",
      "en": "Each agent has its own interface and management environment."
    }
  },
  {
    "title": {
      "fa": "اشتراک‌های مشخص",
      "en": "Clear subscriptions"
    },
    "body": {
      "fa": "دسترسی هر محصول را جداگانه بررسی و انتخاب کنید.",
      "en": "Review and select access for each product individually."
    }
  },
  {
    "title": {
      "fa": "تست محدود، پیش از خرید",
      "en": "A limited trial before purchase"
    },
    "body": {
      "fa": "دو اجرای محدود رایگان برای بررسی هر ایجنت؛ بدون پلن رایگان ماهانه.",
      "en": "Two limited free runs to evaluate each agent, without a free monthly plan."
    }
  },
  {
    "title": {
      "fa": "حدود استفادهٔ روشن",
      "en": "Defined usage boundaries"
    },
    "body": {
      "fa": "شرایط استفاده و مدیریت داده باید برای محصول انتخابی مشخص شوند.",
      "en": "Usage and data handling terms must be defined for the selected product."
    }
  }
];
