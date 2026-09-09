import type { L10n } from "@/lib/i18n/config";

export type AgentCategory =
  | "marketing"
  | "finance"
  | "sales"
  | "support"
  | "operations"
  | "content"
  | "people";

export type AgentBadge = "popular" | "new" | "beta" | "bestSeller";

export interface AgentMetric {
  value: L10n;
  label: L10n;
}

export interface AgentCapability {
  title: L10n;
  body: L10n;
}

export interface Agent {
  slug: string;
  name: L10n;
  tagline: L10n;
  description: L10n;
  category: AgentCategory;
  badge?: AgentBadge;
  /** Monthly price. `usd` in dollars, `irt` in Toman. */
  price: { usd: number; irt: number };
  rating: number;
  installs: number;
  setupMinutes: number;
  model: string;
  accent: string;
  icon: AgentIconName;
  capabilities: AgentCapability[];
  integrations: string[];
  metrics: AgentMetric[];
  dayInLife: { time: string; body: L10n }[];
  guardrails: L10n[];
}

export type AgentIconName =
  | "mail"
  | "ledger"
  | "target"
  | "headset"
  | "chart"
  | "pen"
  | "users"
  | "megaphone"
  | "scale"
  | "boxes"
  | "search"
  | "globe";

export const agentCategories: { id: AgentCategory | "all"; label: L10n }[] = [
  { id: "all", label: { en: "All agents", fa: "همهٔ ایجنت‌ها" } },
  { id: "marketing", label: { en: "Marketing", fa: "بازاریابی" } },
  { id: "finance", label: { en: "Finance", fa: "مالی" } },
  { id: "sales", label: { en: "Sales", fa: "فروش" } },
  { id: "support", label: { en: "Support", fa: "پشتیبانی" } },
  { id: "operations", label: { en: "Operations", fa: "عملیات" } },
  { id: "content", label: { en: "Content", fa: "محتوا" } },
  { id: "people", label: { en: "People", fa: "منابع انسانی" } },
];

export const agents: Agent[] = [
  {
    slug: "email-marketing",
    name: { en: "Email Marketing Agent", fa: "ایجنت ایمیل مارکتینگ" },
    tagline: {
      en: "Writes, segments, sends and keeps optimizing every campaign.",
      fa: "کمپین را می‌نویسد، مخاطب را دسته‌بندی می‌کند، می‌فرستد و مدام بهینه‌اش می‌کند.",
    },
    description: {
      en: "Give it your product, your list and your tone. It builds the segments, drafts the sequence, runs subject-line A/B tests, sends at each contact's best hour, and rewrites what underperforms — reporting revenue per send, not just open rates.",
      fa: "محصول، لیست مخاطبان و لحن برندتان را بدهید. سگمنت‌ها را می‌سازد، دنبالهٔ ایمیل‌ها را می‌نویسد، روی موضوع ایمیل تست A/B می‌گیرد، در بهترین ساعت هر مخاطب ارسال می‌کند و هر چیزی را که ضعیف عمل کند بازنویسی می‌کند — و درآمد هر ارسال را گزارش می‌دهد، نه فقط نرخ باز شدن.",
    },
    category: "marketing",
    badge: "bestSeller",
    price: { usd: 79, irt: 15000000 },
    rating: 4.9,
    installs: 3120,
    setupMinutes: 12,
    model: "Claude Opus 4.6 · GPT-5",
    accent: "#6428d2",
    icon: "mail",
    capabilities: [
      {
        title: { en: "Behavioural segmentation", fa: "دسته‌بندی رفتاری" },
        body: {
          en: "Builds live segments from purchase history, session behaviour and engagement decay — no SQL, no static lists.",
          fa: "بر پایهٔ سابقهٔ خرید، رفتار در سایت و افت تعامل، سگمنت‌های زنده می‌سازد — بدون SQL و بدون لیست ثابت.",
        },
      },
      {
        title: { en: "Copy that matches your voice", fa: "متنی با لحن خودتان" },
        body: {
          en: "Trained on your best-performing past sends, so the drafts read like your brand on its good days.",
          fa: "روی موفق‌ترین ارسال‌های گذشتهٔ شما تنظیم می‌شود؛ پس پیش‌نویس‌ها مثل روزهای خوب برندتان خوانده می‌شوند.",
        },
      },
      {
        title: { en: "Continuous A/B testing", fa: "تست A/B پیوسته" },
        body: {
          en: "Subject lines, previews, CTAs and send times tested on every campaign, with the winner promoted automatically.",
          fa: "موضوع، پیش‌نمایش، دکمهٔ اقدام و زمان ارسال در هر کمپین تست می‌شود و برنده به‌صورت خودکار جایگزین می‌شود.",
        },
      },
      {
        title: { en: "Deliverability watchdog", fa: "نگهبان تحویل‌پذیری" },
        body: {
          en: "Monitors SPF, DKIM, DMARC, bounce and spam rates, and throttles sending before your domain gets burned.",
          fa: "وضعیت SPF، DKIM، DMARC و نرخ بازگشت و اسپم را رصد می‌کند و پیش از سوختن دامنه، سرعت ارسال را کم می‌کند.",
        },
      },
      {
        title: { en: "Lifecycle automation", fa: "اتوماسیون چرخهٔ عمر" },
        body: {
          en: "Welcome, onboarding, cart abandonment, win-back and renewal flows — built, launched and pruned without a marketer babysitting them.",
          fa: "جریان خوش‌آمد، آن‌بوردینگ، سبد رها‌شده، بازگرداندن مشتری و تمدید — ساخته، اجرا و هرس می‌شوند بدون آنکه کسی بالای سرشان بایستد.",
        },
      },
      {
        title: { en: "Revenue attribution", fa: "انتساب درآمد" },
        body: {
          en: "Ties every send to orders in your store or CRM, so you see Toman earned per campaign, not vanity metrics.",
          fa: "هر ارسال را به سفارش‌های فروشگاه یا CRM شما وصل می‌کند تا درآمد واقعی هر کمپین را ببینید، نه آمار تزئینی.",
        },
      },
    ],
    integrations: ["Mailchimp", "SendGrid", "Klaviyo", "HubSpot", "Shopify", "WooCommerce", "Gmail", "Slack"],
    metrics: [
      { value: { en: "+34%", fa: "٪۳۴+" }, label: { en: "Open rate", fa: "نرخ باز شدن" } },
      { value: { en: "+2.7×", fa: "۲٫۷ برابر" }, label: { en: "Campaign revenue", fa: "درآمد کمپین" } },
      { value: { en: "9 hrs", fa: "۹ ساعت" }, label: { en: "Saved per week", fa: "صرفه‌جویی هفتگی" } },
    ],
    dayInLife: [
      {
        time: "07:00",
        body: {
          en: "Pulls overnight signups, scores them, and slots each into the right welcome track.",
          fa: "ثبت‌نام‌های شبانه را می‌گیرد، امتیازدهی می‌کند و هرکدام را در مسیر خوش‌آمد مناسب می‌گذارد.",
        },
      },
      {
        time: "09:30",
        body: {
          en: "Drafts tomorrow's campaign, generates three subject-line variants, and pushes it to Slack for approval.",
          fa: "کمپین فردا را پیش‌نویس می‌کند، سه نسخهٔ موضوع می‌سازد و برای تأیید به اسلک می‌فرستد.",
        },
      },
      {
        time: "13:00",
        body: {
          en: "Detects a 12% bounce spike on a purchased list segment and pauses it before the domain reputation drops.",
          fa: "جهش ۱۲ درصدی نرخ بازگشت را در یک سگمنت تشخیص می‌دهد و پیش از افت اعتبار دامنه متوقفش می‌کند.",
        },
      },
      {
        time: "18:00",
        body: {
          en: "Sends the win-back flow to 1,400 lapsed buyers at each one's historically best open hour.",
          fa: "جریان بازگرداندن را برای ۱٬۴۰۰ مشتری غیرفعال، در بهترین ساعت باز شدن هر نفر ارسال می‌کند.",
        },
      },
      {
        time: "23:00",
        body: {
          en: "Posts the daily digest: sends, revenue, winning variants, and what it plans to change tomorrow.",
          fa: "گزارش روزانه را منتشر می‌کند: ارسال‌ها، درآمد، نسخه‌های برنده و آنچه فردا قصد دارد تغییر دهد.",
        },
      },
    ],
    guardrails: [
      { en: "Never sends to a segment above your configured size without approval.", fa: "بدون تأیید شما به سگمنتی بزرگ‌تر از حد تعیین‌شده ارسال نمی‌کند." },
      { en: "Hard daily send ceiling per domain.", fa: "سقف ارسال روزانه برای هر دامنه اعمال می‌شود." },
      { en: "Unsubscribes and suppression lists honoured across every channel.", fa: "لغو عضویت و لیست‌های مسدود در همهٔ کانال‌ها رعایت می‌شود." },
    ],
  },
  {
    slug: "accounting",
    name: { en: "Accounting Agent", fa: "ایجنت حسابداری" },
    tagline: {
      en: "Closes the books, chases invoices and never loses a receipt.",
      fa: "دفترها را می‌بندد، فاکتورها را پیگیری می‌کند و هیچ رسیدی را گم نمی‌کند.",
    },
    description: {
      en: "Reads invoices and receipts in Persian and English, matches them to bank lines, codes them to the right account, flags anything that looks off, and produces a closing pack your accountant can sign. It also chases late payers politely, and relentlessly.",
      fa: "فاکتورها و رسیدها را به فارسی و انگلیسی می‌خواند، با تراکنش‌های بانکی تطبیق می‌دهد، به حساب درست کدگذاری می‌کند، هر چیز مشکوکی را علامت می‌زند و بستهٔ اختتامیه‌ای می‌سازد که حسابدارتان بتواند امضا کند. بدهکاران را هم مؤدبانه اما بی‌وقفه پیگیری می‌کند.",
    },
    category: "finance",
    badge: "popular",
    price: { usd: 129, irt: 25000000 },
    rating: 4.8,
    installs: 2140,
    setupMinutes: 25,
    model: "Claude Opus 4.6",
    accent: "#0d9488",
    icon: "ledger",
    capabilities: [
      {
        title: { en: "Bilingual document capture", fa: "خواندن اسناد دوزبانه" },
        body: {
          en: "OCR and structured extraction from Persian and English invoices, official factors, and photographed receipts.",
          fa: "استخراج ساختاریافته از فاکتورهای رسمی، صورتحساب‌ها و رسیدهای عکس‌گرفته‌شدهٔ فارسی و انگلیسی.",
        },
      },
      {
        title: { en: "Bank reconciliation", fa: "مغایرت‌گیری بانکی" },
        body: {
          en: "Matches statement lines to documents automatically and queues only the genuine exceptions for you.",
          fa: "سطرهای صورتحساب بانکی را خودکار با اسناد تطبیق می‌دهد و فقط مغایرت‌های واقعی را برای شما می‌گذارد.",
        },
      },
      {
        title: { en: "VAT and tax prep", fa: "آماده‌سازی مالیات و ارزش افزوده" },
        body: {
          en: "Tracks input and output VAT continuously and assembles the quarterly filing pack with supporting documents attached.",
          fa: "مالیات ارزش افزودهٔ خرید و فروش را پیوسته دنبال می‌کند و بستهٔ اظهار فصلی را با اسناد پشتیبان آماده می‌کند.",
        },
      },
      {
        title: { en: "Receivables chasing", fa: "پیگیری مطالبات" },
        body: {
          en: "Sends escalating, on-brand reminders on a schedule you approve, and stops the moment payment lands.",
          fa: "یادآوری‌های تدریجی و هماهنگ با لحن برند را طبق زمان‌بندی مورد تأیید شما می‌فرستد و به‌محض وصول، متوقف می‌شود.",
        },
      },
      {
        title: { en: "Anomaly detection", fa: "تشخیص ناهنجاری" },
        body: {
          en: "Flags duplicate payments, out-of-pattern vendor charges and expense-policy breaches before they close.",
          fa: "پرداخت‌های تکراری، هزینه‌های خارج از الگوی تأمین‌کننده و تخلف از سیاست هزینه‌کرد را پیش از بسته شدن دوره علامت می‌زند.",
        },
      },
      {
        title: { en: "Month-end close pack", fa: "بستهٔ بستن ماه" },
        body: {
          en: "P&L, balance sheet, cash flow and a plain-language summary of what changed and why.",
          fa: "صورت سود و زیان، ترازنامه، جریان نقدی و خلاصه‌ای به زبان ساده از اینکه چه چیزی و چرا تغییر کرده است.",
        },
      },
    ],
    integrations: ["Hesabfa", "Sepidar", "Holoo", "QuickBooks", "Xero", "Excel", "Bank statements", "Google Drive"],
    metrics: [
      { value: { en: "-71%", fa: "٪۷۱−" }, label: { en: "Time to close", fa: "زمان بستن دوره" } },
      { value: { en: "99.4%", fa: "٪۹۹٫۴" }, label: { en: "Match accuracy", fa: "دقت تطبیق" } },
      { value: { en: "-18 days", fa: "۱۸ روز −" }, label: { en: "Average DSO", fa: "میانگین وصول مطالبات" } },
    ],
    dayInLife: [
      {
        time: "08:00",
        body: {
          en: "Imports last night's bank lines and reconciles 86% of them without asking anyone.",
          fa: "تراکنش‌های شب گذشتهٔ بانک را وارد می‌کند و ۸۶ درصدشان را بدون پرسیدن از کسی تطبیق می‌دهد.",
        },
      },
      {
        time: "10:15",
        body: {
          en: "Spots a supplier invoice billed twice in one month and holds the payment for review.",
          fa: "فاکتور یک تأمین‌کننده را که در یک ماه دو بار صادر شده پیدا می‌کند و پرداخت را برای بررسی نگه می‌دارد.",
        },
      },
      {
        time: "14:00",
        body: {
          en: "Sends third-notice reminders to nine overdue accounts, each in the customer's own language.",
          fa: "یادآوری مرحلهٔ سوم را برای ۹ حساب معوق می‌فرستد، هرکدام به زبان خود مشتری.",
        },
      },
      {
        time: "17:30",
        body: {
          en: "Updates the live cash-runway forecast and warns finance that payroll week is tighter than usual.",
          fa: "پیش‌بینی زندهٔ نقدینگی را به‌روز می‌کند و به تیم مالی هشدار می‌دهد که هفتهٔ حقوق تنگ‌تر از معمول است.",
        },
      },
    ],
    guardrails: [
      { en: "Read-only on banking connections. It never moves money.", fa: "دسترسی بانکی فقط خواندنی است. هرگز پولی جابه‌جا نمی‌کند." },
      { en: "Every journal entry above your threshold waits for a human signature.", fa: "هر سند حسابداری بالاتر از آستانهٔ شما منتظر امضای انسانی می‌ماند." },
      { en: "Full audit trail with the source document attached to every entry.", fa: "رد حسابرسی کامل، با پیوست سند مبدأ برای هر ثبت." },
    ],
  },
  {
    slug: "sales-sdr",
    name: { en: "Sales Development Agent", fa: "ایجنت توسعهٔ فروش" },
    tagline: {
      en: "Finds the right accounts, writes the first line, books the meeting.",
      fa: "شرکت‌های درست را پیدا می‌کند، جملهٔ اول را می‌نویسد و جلسه را رزرو می‌کند.",
    },
    description: {
      en: "Researches every prospect properly — funding, hiring, tech stack, recent posts — then writes an opener that could only have been written for them. Handles the follow-up cadence, the objection replies, and drops a briefed meeting straight into your calendar.",
      fa: "دربارهٔ هر سرنخ درست تحقیق می‌کند — سرمایه‌گذاری، استخدام، ابزارها، پست‌های اخیر — و بعد جملهٔ آغازینی می‌نویسد که فقط برای همان شخص معنا دارد. دنبالهٔ پیگیری، پاسخ به اعتراض‌ها و ثبت جلسهٔ بریف‌شده در تقویم شما را هم خودش انجام می‌دهد.",
    },
    category: "sales",
    badge: "popular",
    price: { usd: 149, irt: 35000000 },
    rating: 4.7,
    installs: 1880,
    setupMinutes: 20,
    model: "Claude Opus 4.6 · GPT-5",
    accent: "#ea8a00",
    icon: "target",
    capabilities: [
      {
        title: { en: "Account research", fa: "تحقیق دربارهٔ حساب" },
        body: {
          en: "Builds a one-page dossier per prospect from public signals before a single word is written.",
          fa: "پیش از نوشتن حتی یک کلمه، از سیگنال‌های عمومی یک پروندهٔ یک‌صفحه‌ای برای هر سرنخ می‌سازد.",
        },
      },
      {
        title: { en: "Personalised sequences", fa: "دنباله‌های شخصی‌سازی‌شده" },
        body: {
          en: "Multi-channel cadences across email, LinkedIn and WhatsApp, each step rewritten per account.",
          fa: "دنبالهٔ چندکاناله در ایمیل، لینکدین و واتساپ، که هر گام برای هر حساب دوباره نوشته می‌شود.",
        },
      },
      {
        title: { en: "Objection handling", fa: "پاسخ به اعتراض‌ها" },
        body: {
          en: "Replies to pricing, timing and competitor pushback using your approved battle cards.",
          fa: "به اعتراض دربارهٔ قیمت، زمان‌بندی و رقبا با کارت‌های پاسخ تأییدشدهٔ شما جواب می‌دهد.",
        },
      },
      {
        title: { en: "Meeting booking", fa: "رزرو جلسه" },
        body: {
          en: "Negotiates a slot, sends the invite, and briefs the rep with context five minutes before the call.",
          fa: "زمان را هماهنگ می‌کند، دعوت‌نامه می‌فرستد و پنج دقیقه پیش از تماس، کارشناس فروش را بریف می‌کند.",
        },
      },
      {
        title: { en: "CRM hygiene", fa: "نظم CRM" },
        body: {
          en: "Every touch, reply and outcome logged correctly — no rep ever updates a field again.",
          fa: "هر تماس، پاسخ و نتیجه درست ثبت می‌شود — دیگر هیچ کارشناسی مجبور نیست فیلدی را دستی پر کند.",
        },
      },
    ],
    integrations: ["HubSpot", "Salesforce", "Pipedrive", "LinkedIn", "Apollo", "Gmail", "Calendly", "WhatsApp"],
    metrics: [
      { value: { en: "+3.1×", fa: "۳٫۱ برابر" }, label: { en: "Reply rate", fa: "نرخ پاسخ" } },
      { value: { en: "42", fa: "۴۲" }, label: { en: "Meetings / month", fa: "جلسه در ماه" } },
      { value: { en: "-64%", fa: "٪۶۴−" }, label: { en: "Cost per meeting", fa: "هزینهٔ هر جلسه" } },
    ],
    dayInLife: [
      {
        time: "06:30",
        body: {
          en: "Scans overnight funding and hiring signals, adds 60 new accounts that just became a fit.",
          fa: "سیگنال‌های شبانهٔ سرمایه‌گذاری و استخدام را می‌خواند و ۶۰ حساب تازه‌واجدشرایط اضافه می‌کند.",
        },
      },
      {
        time: "09:00",
        body: {
          en: "Sends 120 first-touch emails, each opener referencing something specific and true.",
          fa: "۱۲۰ ایمیل تماس اول می‌فرستد که جملهٔ آغازین هرکدام به نکته‌ای مشخص و واقعی اشاره می‌کند.",
        },
      },
      {
        time: "12:00",
        body: {
          en: "Answers eleven replies, disqualifies four, and books three demos.",
          fa: "به یازده پاسخ جواب می‌دهد، چهار مورد را رد صلاحیت می‌کند و سه دموی جدید رزرو می‌کند.",
        },
      },
      {
        time: "16:00",
        body: {
          en: "Reports which message angle is winning this week and rewrites the two that are not.",
          fa: "گزارش می‌دهد کدام زاویهٔ پیام این هفته برنده است و دو پیام ناموفق را بازنویسی می‌کند.",
        },
      },
    ],
    guardrails: [
      { en: "Daily send caps and domain warm-up built in.", fa: "سقف ارسال روزانه و گرم‌کردن تدریجی دامنه به‌صورت پیش‌فرض." },
      { en: "Only claims your battle cards allow. No invented case studies.", fa: "فقط ادعاهایی که کارت‌های تأییدشده اجازه می‌دهند. هیچ نمونه‌کار ساختگی." },
      { en: "Do-not-contact list enforced before every send.", fa: "فهرست عدم تماس پیش از هر ارسال بررسی می‌شود." },
    ],
  },
  {
    slug: "customer-support",
    name: { en: "Customer Support Agent", fa: "ایجنت پشتیبانی مشتری" },
    tagline: {
      en: "Resolves the routine 70% and hands the rest over warm.",
      fa: "۷۰ درصد تیکت‌های تکراری را حل می‌کند و بقیه را با زمینهٔ کامل تحویل می‌دهد.",
    },
    description: {
      en: "Answers in Persian and English across chat, email and WhatsApp, grounded strictly in your help centre and order data. It escalates the moment a customer is upset or the answer isn't in the docs — with the whole conversation already summarised for your agent.",
      fa: "در چت، ایمیل و واتساپ به فارسی و انگلیسی پاسخ می‌دهد و فقط به مرکز راهنما و دادهٔ سفارش‌های شما تکیه می‌کند. به‌محض ناراحتی مشتری یا نبود پاسخ در مستندات، مکالمه را با خلاصهٔ کامل به کارشناس شما می‌سپارد.",
    },
    category: "support",
    price: { usd: 99, irt: 18000000 },
    rating: 4.8,
    installs: 2760,
    setupMinutes: 15,
    model: "Claude Sonnet 4.6",
    accent: "#10a37f",
    icon: "headset",
    capabilities: [
      {
        title: { en: "Grounded answers only", fa: "فقط پاسخ‌های مستند" },
        body: {
          en: "Every reply cites the help-centre article or order record it came from. If there is no source, it escalates.",
          fa: "هر پاسخ به مقالهٔ راهنما یا رکورد سفارشی که از آن آمده ارجاع می‌دهد. اگر منبعی نباشد، ارجاع به انسان می‌دهد.",
        },
      },
      {
        title: { en: "Order-aware", fa: "آگاه از سفارش" },
        body: {
          en: "Looks up shipments, refunds and subscription status live, so it answers 'where is my order' correctly.",
          fa: "وضعیت ارسال، بازپرداخت و اشتراک را زنده بررسی می‌کند تا به «سفارش من کجاست» درست پاسخ دهد.",
        },
      },
      {
        title: { en: "Sentiment escalation", fa: "ارجاع بر پایهٔ احساس" },
        body: {
          en: "Detects frustration early and routes to a human before a ticket becomes a review.",
          fa: "نارضایتی را زود تشخیص می‌دهد و پیش از آنکه تیکت به نقد منفی تبدیل شود، به انسان ارجاع می‌دهد.",
        },
      },
      {
        title: { en: "Macro and article authoring", fa: "نوشتن ماکرو و مقاله" },
        body: {
          en: "Notices repeated questions with no article and drafts the missing documentation for approval.",
          fa: "سؤال‌های تکراری بدون مقاله را تشخیص می‌دهد و مستندات نبوده را برای تأیید پیش‌نویس می‌کند.",
        },
      },
    ],
    integrations: ["Zendesk", "Intercom", "Crisp", "Raychat", "WhatsApp", "Telegram", "Shopify", "Slack"],
    metrics: [
      { value: { en: "71%", fa: "٪۷۱" }, label: { en: "Auto-resolved", fa: "حل‌شده خودکار" } },
      { value: { en: "24s", fa: "۲۴ ثانیه" }, label: { en: "First response", fa: "اولین پاسخ" } },
      { value: { en: "4.7/5", fa: "۴٫۷ از ۵" }, label: { en: "CSAT", fa: "رضایت مشتری" } },
    ],
    dayInLife: [
      {
        time: "00:00",
        body: {
          en: "Handles the overnight queue alone — 180 tickets, 129 closed before anyone wakes up.",
          fa: "صف شبانه را تنها مدیریت می‌کند — ۱۸۰ تیکت، ۱۲۹ مورد پیش از بیدار شدن تیم بسته می‌شود.",
        },
      },
      {
        time: "10:00",
        body: {
          en: "Flags a spike of identical complaints and alerts engineering that a payment step is broken.",
          fa: "جهش شکایت‌های یکسان را علامت می‌زند و به تیم فنی هشدار می‌دهد که یک مرحلهٔ پرداخت خراب است.",
        },
      },
      {
        time: "15:00",
        body: {
          en: "Drafts two new help-centre articles for the questions it kept escalating this week.",
          fa: "برای سؤال‌هایی که این هفته مدام ارجاع داده، دو مقالهٔ تازهٔ راهنما پیش‌نویس می‌کند.",
        },
      },
    ],
    guardrails: [
      { en: "Never issues a refund or credit above your set limit on its own.", fa: "بازپرداخت یا اعتبار بالاتر از سقف تعیین‌شده را خودسرانه صادر نمی‌کند." },
      { en: "No answer without a cited source. Uncertainty escalates.", fa: "بدون منبع، پاسخی نمی‌دهد. تردید یعنی ارجاع به انسان." },
      { en: "PII redacted from logs and never leaves your region.", fa: "اطلاعات هویتی از لاگ‌ها حذف می‌شود و هرگز از منطقهٔ شما خارج نمی‌شود." },
    ],
  },
  {
    slug: "data-analyst",
    name: { en: "Data Analyst Agent", fa: "ایجنت تحلیل داده" },
    tagline: {
      en: "Ask in plain language, get the query, the chart and the caveat.",
      fa: "به زبان ساده بپرسید؛ کوئری، نمودار و هشدارهایش را تحویل بگیرید.",
    },
    description: {
      en: "Connects to your warehouse, learns your schema and your metric definitions, then answers questions with real SQL you can inspect. It flags when the data is too thin to conclude anything — which is the part most dashboards skip.",
      fa: "به انبار دادهٔ شما وصل می‌شود، اسکیمای شما و تعریف متریک‌هایتان را یاد می‌گیرد و بعد با SQL واقعی و قابل بازبینی پاسخ می‌دهد. اگر داده برای نتیجه‌گیری کافی نباشد هشدار می‌دهد — همان چیزی که بیشتر داشبوردها از قلم می‌اندازند.",
    },
    category: "operations",
    badge: "new",
    price: { usd: 119, irt: 45000000 },
    rating: 4.6,
    installs: 1240,
    setupMinutes: 35,
    model: "Claude Opus 4.6",
    accent: "#2563eb",
    icon: "chart",
    capabilities: [
      {
        title: { en: "Natural-language SQL", fa: "SQL از زبان طبیعی" },
        body: {
          en: "Generates, runs and explains the query — and shows it, so an analyst can check the logic.",
          fa: "کوئری را می‌سازد، اجرا می‌کند و توضیح می‌دهد — و نشانش می‌دهد تا تحلیلگر بتواند منطقش را بررسی کند.",
        },
      },
      {
        title: { en: "Metric governance", fa: "حاکمیت متریک" },
        body: {
          en: "One definition of revenue, churn and active user across the company. No more duelling dashboards.",
          fa: "یک تعریف واحد از درآمد، ریزش و کاربر فعال در کل شرکت. دیگر خبری از داشبوردهای متناقض نیست.",
        },
      },
      {
        title: { en: "Anomaly alerts", fa: "هشدار ناهنجاری" },
        body: {
          en: "Watches your key metrics hourly and tells you what moved, by how much, and its best guess at why.",
          fa: "متریک‌های کلیدی را ساعتی رصد می‌کند و می‌گوید چه چیزی، چقدر تغییر کرده و بهترین حدسش دربارهٔ علت چیست.",
        },
      },
      {
        title: { en: "Scheduled narratives", fa: "روایت‌های زمان‌بندی‌شده" },
        body: {
          en: "A Monday morning written summary of the business, not another PDF of charts nobody opens.",
          fa: "خلاصهٔ نوشتاری کسب‌وکار در صبح شنبه، نه یک PDF دیگر از نمودارهایی که کسی باز نمی‌کند.",
        },
      },
    ],
    integrations: ["PostgreSQL", "BigQuery", "Snowflake", "Metabase", "Google Sheets", "Slack", "Notion"],
    metrics: [
      { value: { en: "-83%", fa: "٪۸۳−" }, label: { en: "Time to answer", fa: "زمان تا پاسخ" } },
      { value: { en: "96%", fa: "٪۹۶" }, label: { en: "Query accuracy", fa: "دقت کوئری" } },
      { value: { en: "5×", fa: "۵ برابر" }, label: { en: "Questions answered", fa: "پرسش پاسخ‌داده‌شده" } },
    ],
    dayInLife: [
      {
        time: "08:00",
        body: {
          en: "Posts the daily metrics narrative to Slack, leading with the two numbers that actually changed.",
          fa: "روایت روزانهٔ متریک‌ها را در اسلک منتشر می‌کند و با دو عددی شروع می‌کند که واقعاً تغییر کرده‌اند.",
        },
      },
      {
        time: "11:20",
        body: {
          en: "Answers a founder's question about cohort retention in 40 seconds, with the SQL attached.",
          fa: "به پرسش مؤسس دربارهٔ ماندگاری کوهورت در ۴۰ ثانیه پاسخ می‌دهد و SQL را هم پیوست می‌کند.",
        },
      },
      {
        time: "19:00",
        body: {
          en: "Catches a 30% drop in checkout conversion and traces it to one browser version.",
          fa: "افت ۳۰ درصدی نرخ تبدیل پرداخت را می‌گیرد و ردش را تا یک نسخهٔ خاص مرورگر دنبال می‌کند.",
        },
      },
    ],
    guardrails: [
      { en: "Read-only warehouse credentials. It cannot write or drop.", fa: "دسترسی انبار داده فقط خواندنی است. نه می‌نویسد و نه حذف می‌کند." },
      { en: "Row-level security respected per user.", fa: "امنیت سطح ردیف برای هر کاربر رعایت می‌شود." },
      { en: "Refuses to conclude from statistically thin samples.", fa: "از نمونه‌های آماری ناکافی نتیجه‌گیری نمی‌کند." },
    ],
  },
  {
    slug: "content-seo",
    name: { en: "Content & SEO Agent", fa: "ایجنت محتوا و سئو" },
    tagline: {
      en: "Plans the calendar, writes the piece, and keeps it ranking.",
      fa: "تقویم محتوا را می‌چیند، مقاله را می‌نویسد و رتبه‌اش را نگه می‌دارد.",
    },
    description: {
      en: "Finds the gaps between what people search and what you've published, then writes in your voice with real sources cited. It refreshes decaying posts, fixes internal linking, and tracks position changes weekly — in Persian and English.",
      fa: "فاصلهٔ بین آنچه مردم جست‌وجو می‌کنند و آنچه شما منتشر کرده‌اید را پیدا می‌کند و بعد با لحن خودتان و منابع واقعی می‌نویسد. مطالب رو‌به‌افول را به‌روز می‌کند، لینک‌سازی داخلی را اصلاح می‌کند و تغییر رتبه‌ها را هفتگی دنبال می‌کند — به فارسی و انگلیسی.",
    },
    category: "content",
    price: { usd: 89, irt: 12000000 },
    rating: 4.7,
    installs: 1990,
    setupMinutes: 18,
    model: "Claude Opus 4.6",
    accent: "#ec4899",
    icon: "pen",
    capabilities: [
      {
        title: { en: "Gap analysis", fa: "تحلیل شکاف" },
        body: {
          en: "Compares your coverage against competitors and live search demand, then ranks what to write next.",
          fa: "پوشش محتوایی شما را با رقبا و تقاضای واقعی جست‌وجو مقایسه می‌کند و اولویت نوشتن بعدی را می‌چیند.",
        },
      },
      {
        title: { en: "Bilingual drafting", fa: "نگارش دوزبانه" },
        body: {
          en: "Writes natively in Persian and English — not translation, but a piece written for each audience.",
          fa: "به‌صورت بومی فارسی و انگلیسی می‌نویسد — نه ترجمه، بلکه متنی که برای هر مخاطب نوشته شده است.",
        },
      },
      {
        title: { en: "Content refresh", fa: "به‌روزرسانی محتوا" },
        body: {
          en: "Detects decaying articles, updates the facts, and re-optimises without changing the URL.",
          fa: "مقالات رو‌به‌افول را تشخیص می‌دهد، اطلاعاتش را به‌روز می‌کند و بدون تغییر آدرس دوباره بهینه می‌سازد.",
        },
      },
      {
        title: { en: "Technical SEO fixes", fa: "اصلاح سئوی فنی" },
        body: {
          en: "Schema, internal links, meta and hreflang — opened as a pull request against your repo.",
          fa: "اسکیما، لینک داخلی، متا و hreflang — به‌شکل یک پول‌ریکوئست روی مخزن شما.",
        },
      },
    ],
    integrations: ["WordPress", "Webflow", "Ghost", "Contentful", "Search Console", "Ahrefs", "GitHub"],
    metrics: [
      { value: { en: "+186%", fa: "٪۱۸۶+" }, label: { en: "Organic traffic", fa: "ترافیک ارگانیک" } },
      { value: { en: "24", fa: "۲۴" }, label: { en: "Articles / month", fa: "مقاله در ماه" } },
      { value: { en: "-92%", fa: "٪۹۲−" }, label: { en: "Cost per article", fa: "هزینهٔ هر مقاله" } },
    ],
    dayInLife: [
      {
        time: "09:00",
        body: {
          en: "Publishes two drafts to the CMS as pending review, each with sources and images attached.",
          fa: "دو پیش‌نویس را با منابع و تصاویر پیوست، در وضعیت انتظار بازبینی روی CMS منتشر می‌کند.",
        },
      },
      {
        time: "13:00",
        body: {
          en: "Spots three articles that slipped off page one and queues them for a refresh.",
          fa: "سه مقاله را که از صفحهٔ اول بیرون افتاده‌اند پیدا می‌کند و برای به‌روزرسانی در صف می‌گذارد.",
        },
      },
    ],
    guardrails: [
      { en: "Nothing publishes without editorial approval by default.", fa: "به‌صورت پیش‌فرض هیچ چیز بدون تأیید سردبیر منتشر نمی‌شود." },
      { en: "Every factual claim carries a source link.", fa: "هر ادعای واقعی با لینک منبع همراه است." },
    ],
  },
  {
    slug: "social-media",
    name: { en: "Social Media Agent", fa: "ایجنت شبکه‌های اجتماعی" },
    tagline: {
      en: "A full content calendar, produced and scheduled, every week.",
      fa: "یک تقویم محتوای کامل، تولیدشده و زمان‌بندی‌شده، هر هفته.",
    },
    description: {
      en: "Turns one idea into a week of posts shaped for each platform, writes the captions, picks the hooks, schedules at peak hours, and replies to comments in your tone. Reports which format is actually earning attention.",
      fa: "یک ایده را به یک هفته پست تبدیل می‌کند که برای هر پلتفرم جداگانه شکل گرفته، کپشن می‌نویسد، قلاب‌ها را انتخاب می‌کند، در ساعت اوج زمان‌بندی می‌کند و با لحن شما به کامنت‌ها پاسخ می‌دهد. و گزارش می‌دهد کدام قالب واقعاً توجه می‌گیرد.",
    },
    category: "marketing",
    price: { usd: 69, irt: 15000000 },
    rating: 4.5,
    installs: 2410,
    setupMinutes: 10,
    model: "Claude Sonnet 4.6",
    accent: "#e11d48",
    icon: "megaphone",
    capabilities: [
      {
        title: { en: "Platform-native repurposing", fa: "بازتولید بومی هر پلتفرم" },
        body: {
          en: "One source idea, reshaped properly for Instagram, LinkedIn, X and Telegram — not copy-pasted.",
          fa: "یک ایدهٔ مبدأ، درست بازطراحی‌شده برای اینستاگرام، لینکدین، ایکس و تلگرام — نه کپی‌پیست.",
        },
      },
      {
        title: { en: "Comment triage", fa: "مدیریت کامنت" },
        body: {
          en: "Answers the easy ones, hides the abusive ones, and escalates real leads to sales.",
          fa: "به کامنت‌های ساده پاسخ می‌دهد، موارد توهین‌آمیز را پنهان می‌کند و سرنخ‌های واقعی را به فروش می‌سپارد.",
        },
      },
      {
        title: { en: "Trend watch", fa: "رصد ترند" },
        body: {
          en: "Suggests timely angles from what is moving in your niche this week, with a relevance score.",
          fa: "بر پایهٔ آنچه این هفته در حوزهٔ شما داغ است زاویه‌های به‌موقع پیشنهاد می‌دهد، همراه با امتیاز ارتباط.",
        },
      },
    ],
    integrations: ["Instagram", "LinkedIn", "X", "Telegram", "Buffer", "Canva", "YouTube"],
    metrics: [
      { value: { en: "+58%", fa: "٪۵۸+" }, label: { en: "Engagement", fa: "تعامل" } },
      { value: { en: "30+", fa: "+۳۰" }, label: { en: "Posts / month", fa: "پست در ماه" } },
      { value: { en: "6 hrs", fa: "۶ ساعت" }, label: { en: "Saved per week", fa: "صرفه‌جویی هفتگی" } },
    ],
    dayInLife: [
      {
        time: "08:30",
        body: {
          en: "Publishes the scheduled post and starts monitoring the first-hour engagement window.",
          fa: "پست زمان‌بندی‌شده را منتشر می‌کند و پایش تعامل ساعت اول را شروع می‌کند.",
        },
      },
      {
        time: "20:00",
        body: {
          en: "Clears the comment queue and forwards four purchase-intent DMs to sales.",
          fa: "صف کامنت‌ها را خالی می‌کند و چهار دایرکت با قصد خرید را به فروش می‌فرستد.",
        },
      },
    ],
    guardrails: [
      { en: "Publishing requires approval until you turn autopilot on.", fa: "تا وقتی خلبان خودکار را روشن نکنید، انتشار نیاز به تأیید دارد." },
      { en: "Brand-safety filter on every generated asset.", fa: "فیلتر ایمنی برند روی هر خروجی تولیدشده." },
    ],
  },
  {
    slug: "recruiting",
    name: { en: "Recruiting Agent", fa: "ایجنت جذب و استخدام" },
    tagline: {
      en: "Screens every applicant fairly, in hours instead of weeks.",
      fa: "همهٔ متقاضیان را منصفانه غربال می‌کند، در چند ساعت به‌جای چند هفته.",
    },
    description: {
      en: "Reads every CV against the scorecard you defined, runs a structured first-round screen, and writes an evidence-backed summary for each candidate. It is deliberately blind to name, age, gender and photo.",
      fa: "هر رزومه را بر اساس کارت امتیازی که تعریف کرده‌اید می‌خواند، غربال ساختاریافتهٔ مرحلهٔ اول را انجام می‌دهد و برای هر داوطلب خلاصه‌ای مستند می‌نویسد. عمداً نسبت به نام، سن، جنسیت و عکس نابیناست.",
    },
    category: "people",
    price: { usd: 109, irt: 30000000 },
    rating: 4.6,
    installs: 940,
    setupMinutes: 22,
    model: "Claude Opus 4.6",
    accent: "#4f46e5",
    icon: "users",
    capabilities: [
      {
        title: { en: "Structured scorecards", fa: "کارت امتیاز ساختاریافته" },
        body: {
          en: "Scores against the competencies you defined, citing the exact line of the CV for each rating.",
          fa: "بر اساس شایستگی‌های تعریف‌شدهٔ شما امتیاز می‌دهد و برای هر امتیاز به سطر دقیق رزومه ارجاع می‌دهد.",
        },
      },
      {
        title: { en: "Bias reduction", fa: "کاهش سوگیری" },
        body: {
          en: "Demographic signals stripped before evaluation, and every decision is auditable afterwards.",
          fa: "نشانه‌های جمعیت‌شناختی پیش از ارزیابی حذف می‌شوند و هر تصمیم بعداً قابل حسابرسی است.",
        },
      },
      {
        title: { en: "Candidate experience", fa: "تجربهٔ داوطلب" },
        body: {
          en: "Everyone gets a reply within 24 hours, including the ones you pass on.",
          fa: "همه ظرف ۲۴ ساعت پاسخ می‌گیرند، حتی کسانی که رد می‌شوند.",
        },
      },
    ],
    integrations: ["Greenhouse", "Lever", "Workable", "Jobinja", "LinkedIn", "Gmail", "Calendly"],
    metrics: [
      { value: { en: "-76%", fa: "٪۷۶−" }, label: { en: "Time to shortlist", fa: "زمان تا فهرست کوتاه" } },
      { value: { en: "100%", fa: "٪۱۰۰" }, label: { en: "Applicants reviewed", fa: "متقاضی بررسی‌شده" } },
      { value: { en: "+29%", fa: "٪۲۹+" }, label: { en: "Offer acceptance", fa: "پذیرش پیشنهاد" } },
    ],
    dayInLife: [
      {
        time: "10:00",
        body: {
          en: "Screens 212 overnight applications and shortlists 14 with written justification each.",
          fa: "۲۱۲ درخواست شبانه را غربال می‌کند و ۱۴ نفر را با توجیه نوشتاری در فهرست کوتاه می‌گذارد.",
        },
      },
      {
        time: "15:00",
        body: {
          en: "Books first-round interviews and sends every rejected applicant a specific, kind reply.",
          fa: "مصاحبه‌های مرحلهٔ اول را رزرو می‌کند و برای هر رد‌شده پاسخی مشخص و محترمانه می‌فرستد.",
        },
      },
    ],
    guardrails: [
      { en: "Never makes the final hiring decision. It ranks and explains.", fa: "هرگز تصمیم نهایی استخدام را نمی‌گیرد. فقط رتبه‌بندی و توضیح می‌دهد." },
      { en: "Full decision log retained for compliance review.", fa: "گزارش کامل تصمیم‌ها برای بازبینی انطباق نگهداری می‌شود." },
    ],
  },
  {
    slug: "legal-contracts",
    name: { en: "Contract Review Agent", fa: "ایجنت بررسی قرارداد" },
    tagline: {
      en: "Reads the whole contract and tells you where the teeth are.",
      fa: "کل قرارداد را می‌خواند و می‌گوید دندان‌های تیزش کجاست.",
    },
    description: {
      en: "Compares incoming contracts against your playbook, marks every clause that deviates, drafts the redline, and explains the commercial risk in language a founder can act on. Persian and English, NDA to master services agreement.",
      fa: "قراردادهای ورودی را با پلی‌بوک شما مقایسه می‌کند، هر بند منحرف را علامت می‌زند، نسخهٔ اصلاحی را پیش‌نویس می‌کند و ریسک تجاری را به زبانی توضیح می‌دهد که یک مؤسس بتواند بر اساسش تصمیم بگیرد. فارسی و انگلیسی، از NDA تا قرارداد اصلی خدمات.",
    },
    category: "operations",
    badge: "beta",
    price: { usd: 159, irt: 120000000 },
    rating: 4.5,
    installs: 610,
    setupMinutes: 30,
    model: "Claude Opus 4.6",
    accent: "#c2410c",
    icon: "scale",
    capabilities: [
      {
        title: { en: "Playbook deviation", fa: "انحراف از پلی‌بوک" },
        body: {
          en: "Every clause checked against your positions, colour-coded by how far it strays.",
          fa: "هر بند در برابر مواضع شما بررسی و بر اساس میزان انحراف رنگ‌بندی می‌شود.",
        },
      },
      {
        title: { en: "Redline drafting", fa: "پیش‌نویس اصلاحیه" },
        body: {
          en: "Produces tracked-changes markup with a one-line rationale for each edit.",
          fa: "نسخهٔ اصلاحی با تغییرات ردیابی‌شده و یک خط توضیح برای هر ویرایش تولید می‌کند.",
        },
      },
      {
        title: { en: "Obligation calendar", fa: "تقویم تعهدات" },
        body: {
          en: "Extracts renewal dates, notice periods and deliverables into your calendar automatically.",
          fa: "تاریخ تمدید، مهلت اعلام و تعهدات تحویل را خودکار به تقویم شما اضافه می‌کند.",
        },
      },
    ],
    integrations: ["Google Drive", "Dropbox", "DocuSign", "Notion", "Slack"],
    metrics: [
      { value: { en: "-68%", fa: "٪۶۸−" }, label: { en: "Review turnaround", fa: "زمان بررسی" } },
      { value: { en: "100%", fa: "٪۱۰۰" }, label: { en: "Clauses checked", fa: "بند بررسی‌شده" } },
    ],
    dayInLife: [
      {
        time: "11:00",
        body: {
          en: "Reviews a 42-page vendor MSA in six minutes and flags an uncapped liability clause.",
          fa: "یک قرارداد ۴۲ صفحه‌ای تأمین‌کننده را در شش دقیقه بررسی می‌کند و بند مسئولیت بدون سقف را علامت می‌زند.",
        },
      },
    ],
    guardrails: [
      { en: "Assists counsel — it does not give legal advice or sign anything.", fa: "به مشاور حقوقی کمک می‌کند — نه مشاورهٔ حقوقی می‌دهد و نه چیزی امضا می‌کند." },
      { en: "Documents processed in an isolated workspace and never retained for training.", fa: "اسناد در فضای کاری ایزوله پردازش می‌شوند و هرگز برای آموزش نگه داشته نمی‌شوند." },
    ],
  },
  {
    slug: "inventory-ops",
    name: { en: "Inventory & Ops Agent", fa: "ایجنت انبار و عملیات" },
    tagline: {
      en: "Reorders before you sell out, not after.",
      fa: "پیش از تمام شدن موجودی سفارش می‌دهد، نه بعد از آن.",
    },
    description: {
      en: "Forecasts demand per SKU from your real sales history and seasonality, watches supplier lead times, and drafts purchase orders at the right moment. It also spots the stock that is quietly dying on your shelves.",
      fa: "تقاضای هر کالا را از سابقهٔ فروش واقعی و فصلی‌بودن پیش‌بینی می‌کند، زمان تحویل تأمین‌کننده‌ها را می‌پاید و سفارش خرید را در لحظهٔ درست پیش‌نویس می‌کند. کالاهایی را هم که بی‌سر‌و‌صدا روی قفسه می‌میرند پیدا می‌کند.",
    },
    category: "operations",
    price: { usd: 99, irt: 40000000 },
    rating: 4.4,
    installs: 780,
    setupMinutes: 40,
    model: "Claude Sonnet 4.6",
    accent: "#0891b2",
    icon: "boxes",
    capabilities: [
      {
        title: { en: "Demand forecasting", fa: "پیش‌بینی تقاضا" },
        body: {
          en: "Per-SKU forecasts that account for seasonality, promotions and the Nowruz spike.",
          fa: "پیش‌بینی برای هر کالا با در نظر گرفتن فصل، کمپین‌ها و جهش نوروز.",
        },
      },
      {
        title: { en: "Reorder automation", fa: "سفارش خودکار" },
        body: {
          en: "Drafts POs at the reorder point, priced against your current supplier terms.",
          fa: "در نقطهٔ سفارش مجدد، سفارش خرید را با شرایط فعلی تأمین‌کننده پیش‌نویس می‌کند.",
        },
      },
      {
        title: { en: "Dead stock detection", fa: "شناسایی موجودی راکد" },
        body: {
          en: "Identifies capital sitting still and suggests bundles or discounts to release it.",
          fa: "سرمایهٔ خوابیده را پیدا می‌کند و برای آزاد کردنش باندل یا تخفیف پیشنهاد می‌دهد.",
        },
      },
    ],
    integrations: ["Shopify", "WooCommerce", "SAP", "Excel", "Google Sheets", "Digikala Seller"],
    metrics: [
      { value: { en: "-41%", fa: "٪۴۱−" }, label: { en: "Stockouts", fa: "ناموجودی" } },
      { value: { en: "-23%", fa: "٪۲۳−" }, label: { en: "Holding cost", fa: "هزینهٔ نگهداری" } },
    ],
    dayInLife: [
      {
        time: "07:30",
        body: {
          en: "Flags eleven SKUs that will run out inside the supplier lead time and drafts the POs.",
          fa: "یازده کالا را که داخل بازهٔ تحویل تأمین‌کننده تمام می‌شوند علامت می‌زند و سفارش‌ها را پیش‌نویس می‌کند.",
        },
      },
    ],
    guardrails: [
      { en: "Purchase orders always require human approval before sending.", fa: "سفارش‌های خرید همیشه پیش از ارسال به تأیید انسانی نیاز دارند." },
    ],
  },
  {
    slug: "market-research",
    name: { en: "Market Research Agent", fa: "ایجنت تحقیقات بازار" },
    tagline: {
      en: "A briefed analyst who reads everything so you don't have to.",
      fa: "تحلیلگری آماده که همه‌چیز را می‌خواند تا شما مجبور نباشید.",
    },
    description: {
      en: "Tracks competitors' pricing, releases, hiring and positioning; reads the forums where your customers complain; and delivers a weekly brief with sources, not vibes.",
      fa: "قیمت‌گذاری، انتشار محصول، استخدام و جایگاه‌یابی رقبا را دنبال می‌کند، انجمن‌هایی را که مشتریانتان در آن شکایت می‌کنند می‌خواند و هفتگی یک بریف با منبع تحویل می‌دهد، نه با حدس و گمان.",
    },
    category: "marketing",
    price: { usd: 79, irt: 20000000 },
    rating: 4.6,
    installs: 1130,
    setupMinutes: 15,
    model: "Claude Opus 4.6",
    accent: "#7c3aed",
    icon: "search",
    capabilities: [
      {
        title: { en: "Competitor monitoring", fa: "رصد رقبا" },
        body: {
          en: "Diffs their pricing pages, changelogs and job posts, and tells you what it implies.",
          fa: "تفاوت صفحات قیمت، تغییرات و آگهی‌های شغلی‌شان را می‌گیرد و می‌گوید چه معنایی دارد.",
        },
      },
      {
        title: { en: "Voice of customer", fa: "صدای مشتری" },
        body: {
          en: "Mines reviews, forums and support tickets for the complaints that keep repeating.",
          fa: "نظرات، انجمن‌ها و تیکت‌های پشتیبانی را برای شکایت‌های تکرارشونده می‌کاود.",
        },
      },
    ],
    integrations: ["Web", "Reddit", "G2", "Telegram", "Notion", "Slack"],
    metrics: [
      { value: { en: "12 hrs", fa: "۱۲ ساعت" }, label: { en: "Saved per week", fa: "صرفه‌جویی هفتگی" } },
      { value: { en: "Weekly", fa: "هفتگی" }, label: { en: "Briefing cadence", fa: "دورهٔ گزارش" } },
    ],
    dayInLife: [
      {
        time: "09:00",
        body: {
          en: "Notices a competitor quietly raised prices 18% and drafts your response options.",
          fa: "متوجه می‌شود رقیبی بی‌سروصدا قیمت را ۱۸ درصد بالا برده و گزینه‌های واکنش شما را پیش‌نویس می‌کند.",
        },
      },
    ],
    guardrails: [
      { en: "Public sources only. No scraping behind logins.", fa: "فقط منابع عمومی. هیچ استخراجی از پشت صفحهٔ ورود." },
    ],
  },
  {
    slug: "localization",
    name: { en: "Localization Agent", fa: "ایجنت بومی‌سازی" },
    tagline: {
      en: "Ships your product in a new language without the awkward translation smell.",
      fa: "محصولتان را به زبان تازه می‌برد، بدون آن بوی ترجمهٔ ناشیانه.",
    },
    description: {
      en: "Translates product strings, docs and marketing with your glossary enforced, handles RTL layout notes, and flags anything that will not survive the culture change. Opens a pull request when strings drift.",
      fa: "رشته‌های محصول، مستندات و محتوای بازاریابی را با رعایت واژه‌نامهٔ شما ترجمه می‌کند، نکات چیدمان راست‌به‌چپ را می‌دهد و هر چیزی را که از تغییر فرهنگ جان سالم به‌در نمی‌برد علامت می‌زند. وقتی رشته‌ها از هم فاصله بگیرند، پول‌ریکوئست باز می‌کند.",
    },
    category: "content",
    badge: "new",
    price: { usd: 59, irt: 10000000 },
    rating: 4.7,
    installs: 1420,
    setupMinutes: 12,
    model: "Claude Sonnet 4.6",
    accent: "#059669",
    icon: "globe",
    capabilities: [
      {
        title: { en: "Glossary enforcement", fa: "رعایت واژه‌نامه" },
        body: {
          en: "Your product terms stay consistent everywhere, in every language, forever.",
          fa: "اصطلاحات محصول شما همه‌جا، در هر زبان و برای همیشه یکدست می‌مانند.",
        },
      },
      {
        title: { en: "RTL awareness", fa: "آگاهی از راست‌به‌چپ" },
        body: {
          en: "Flags strings that will break in RTL layouts and suggests the fix, not just the translation.",
          fa: "رشته‌هایی را که در چیدمان راست‌به‌چپ می‌شکنند علامت می‌زند و به‌جای ترجمهٔ صرف، راه‌حل پیشنهاد می‌دهد.",
        },
      },
    ],
    integrations: ["GitHub", "Crowdin", "Figma", "Contentful", "i18next"],
    metrics: [
      { value: { en: "-89%", fa: "٪۸۹−" }, label: { en: "Localization cost", fa: "هزینهٔ بومی‌سازی" } },
      { value: { en: "3 days", fa: "۳ روز" }, label: { en: "New locale launch", fa: "راه‌اندازی زبان جدید" } },
    ],
    dayInLife: [
      {
        time: "12:00",
        body: {
          en: "Opens a PR with 340 updated strings after this morning's product release.",
          fa: "پس از انتشار امروز صبح محصول، یک پول‌ریکوئست با ۳۴۰ رشتهٔ به‌روزشده باز می‌کند.",
        },
      },
    ],
    guardrails: [
      { en: "Legal and medical copy always routed to a human reviewer.", fa: "متون حقوقی و پزشکی همیشه به بازبین انسانی ارجاع می‌شوند." },
    ],
  },
];

export function getAgent(slug: string): Agent | undefined {
  return agents.find((a) => a.slug === slug);
}

export function relatedAgents(slug: string, limit = 3): Agent[] {
  const current = getAgent(slug);
  if (!current) return agents.slice(0, limit);
  const sameCategory = agents.filter((a) => a.slug !== slug && a.category === current.category);
  const rest = agents.filter((a) => a.slug !== slug && a.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

export const featuredAgentSlugs = [
  "email-marketing",
  "accounting",
  "sales-sdr",
  "customer-support",
  "data-analyst",
  "content-seo",
];
