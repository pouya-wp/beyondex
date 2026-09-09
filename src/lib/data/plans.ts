import type { L10n } from "@/lib/i18n/config";

export interface Plan {
  id: "starter" | "growth" | "scale" | "enterprise";
  name: L10n;
  blurb: L10n;
  /** Monthly price. `null` means "talk to sales". 0 means free. */
  monthly: { usd: number; irt: number } | null;
  /** Yearly price per month (already discounted). */
  yearly: { usd: number; irt: number } | null;
  featured?: boolean;
  features: L10n[];
  limits: { runs: L10n; seats: L10n; agents: L10n };
}

export const plans: Plan[] = [
  {
    "id": "starter",
    "name": {
      "fa": "شروع",
      "en": "Essential"
    },
    "blurb": {
      "fa": "دسترسی پایه به پنل مستقل ایجنت؛ قیمت نهایی در صفحهٔ محصول.",
      "en": "Entry-level access to an independent agent panel. Final pricing is on the product page."
    },
    "monthly": {
      "usd": 99,
      "irt": 10000000
    },
    "yearly": {
      "usd": 99,
      "irt": 10000000
    },
    "featured": false,
    "features": [
      {
        "fa": "پنل مدیریت مستقل برای ایجنت",
        "en": "An independent management panel for the agent"
      },
      {
        "fa": "مدیریت اشتراک و دسترسی در بیاندکس",
        "en": "Subscription and access management in Beyondex"
      },
      {
        "fa": "قابلیت‌ها و محدودیت‌ها مطابق محصول انتخابی",
        "en": "Capabilities and limits depend on the selected product"
      },
      {
        "fa": "۲ اجرای محدود برای تست هر ایجنت، پیش از اشتراک",
        "en": "Two limited trial runs per agent before subscribing"
      }
    ],
    "limits": {
      "agents": {
        "fa": "ایجنت انتخابی",
        "en": "Selected agent"
      },
      "runs": {
        "fa": "مطابق محصول",
        "en": "Per product"
      },
      "seats": {
        "fa": "مطابق محصول",
        "en": "Per product"
      }
    }
  },
  {
    "id": "growth",
    "name": {
      "fa": "حرفه‌ای",
      "en": "Professional"
    },
    "blurb": {
      "fa": "برای ایجنت‌های تخصصی‌تر؛ قیمت نهایی متناسب با محصول انتخابی.",
      "en": "For specialist agents. Final pricing depends on the selected product."
    },
    "monthly": {
      "usd": 149,
      "irt": 35000000
    },
    "yearly": {
      "usd": 124,
      "irt": 30000000
    },
    "featured": true,
    "features": [
      {
        "fa": "پنل مدیریت مستقل برای ایجنت",
        "en": "An independent management panel for the agent"
      },
      {
        "fa": "مدیریت اشتراک و دسترسی در بیاندکس",
        "en": "Subscription and access management in Beyondex"
      },
      {
        "fa": "قابلیت‌ها و محدودیت‌ها مطابق محصول انتخابی",
        "en": "Capabilities and limits depend on the selected product"
      },
      {
        "fa": "۲ اجرای محدود برای تست هر ایجنت، پیش از اشتراک",
        "en": "Two limited trial runs per agent before subscribing"
      }
    ],
    "limits": {
      "agents": {
        "fa": "ایجنت انتخابی",
        "en": "Selected agent"
      },
      "runs": {
        "fa": "مطابق محصول",
        "en": "Per product"
      },
      "seats": {
        "fa": "مطابق محصول",
        "en": "Per product"
      }
    }
  },
  {
    "id": "scale",
    "name": {
      "fa": "ویژه",
      "en": "Premium"
    },
    "blurb": {
      "fa": "سطح ویژه برای ایجنت‌های پیشرفته و نیازهای پیچیده‌تر.",
      "en": "Premium access for advanced agents and more complex needs."
    },
    "monthly": {
      "usd": 449,
      "irt": 120000000
    },
    "yearly": {
      "usd": 374,
      "irt": 100000000
    },
    "featured": false,
    "features": [
      {
        "fa": "پنل مدیریت مستقل برای ایجنت",
        "en": "An independent management panel for the agent"
      },
      {
        "fa": "مدیریت اشتراک و دسترسی در بیاندکس",
        "en": "Subscription and access management in Beyondex"
      },
      {
        "fa": "قابلیت‌ها و محدودیت‌ها مطابق محصول انتخابی",
        "en": "Capabilities and limits depend on the selected product"
      },
      {
        "fa": "۲ اجرای محدود برای تست هر ایجنت، پیش از اشتراک",
        "en": "Two limited trial runs per agent before subscribing"
      }
    ],
    "limits": {
      "agents": {
        "fa": "ایجنت انتخابی",
        "en": "Selected agent"
      },
      "runs": {
        "fa": "مطابق محصول",
        "en": "Per product"
      },
      "seats": {
        "fa": "مطابق محصول",
        "en": "Per product"
      }
    }
  },
  {
    "id": "enterprise",
    "name": {
      "fa": "سازمانی",
      "en": "Enterprise"
    },
    "blurb": {
      "fa": "دامنهٔ دسترسی و هزینه پس از بررسی نیاز سازمان مشخص می‌شود.",
      "en": "Access scope and price are agreed after reviewing your requirements."
    },
    "monthly": null,
    "yearly": null,
    "featured": false,
    "features": [
      {
        "fa": "پنل مدیریت مستقل برای ایجنت",
        "en": "An independent management panel for the agent"
      },
      {
        "fa": "مدیریت اشتراک و دسترسی در بیاندکس",
        "en": "Subscription and access management in Beyondex"
      },
      {
        "fa": "قابلیت‌ها و محدودیت‌ها مطابق محصول انتخابی",
        "en": "Capabilities and limits depend on the selected product"
      },
      {
        "fa": "۲ اجرای محدود برای تست هر ایجنت، پیش از اشتراک",
        "en": "Two limited trial runs per agent before subscribing"
      }
    ],
    "limits": {
      "agents": {
        "fa": "ایجنت انتخابی",
        "en": "Selected agent"
      },
      "runs": {
        "fa": "مطابق محصول",
        "en": "Per product"
      },
      "seats": {
        "fa": "مطابق محصول",
        "en": "Per product"
      }
    }
  }
];
export function getPlan(id:string){return plans.find(p=>p.id===id);}
