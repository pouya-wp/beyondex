import type { L10n, Locale } from "@/lib/i18n/config";

export interface BlogSource {
  title: string;
  url: string;
}

export interface BlogSection {
  id: string;
  heading: L10n;
  body: L10n;
  bullets?: Record<Locale, string[]>;
}

export interface BlogFaq {
  question: L10n;
  answer: L10n;
}

export interface BlogPost {
  schemaVersion: 1;
  slug: string;
  status: "published";
  publishedAt: string;
  updatedAt: string;
  author: L10n;
  category: L10n;
  title: L10n;
  excerpt: L10n;
  seoTitle: L10n;
  seoDescription: L10n;
  keywords: Record<Locale, string[]>;
  sections: BlogSection[];
  faq: BlogFaq[];
  sources: BlogSource[];
  disclosure: L10n;
}

function localizedString(value: unknown, key: string, errors: string[], min: number, max: number): L10n {
  const record = value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  const result = { fa: String(record.fa ?? "").trim(), en: String(record.en ?? "").trim() };
  for (const locale of ["fa", "en"] as const) {
    if (result[locale].length < min || result[locale].length > max) errors.push(`${key}.${locale} must be ${min}-${max} characters.`);
  }
  return result;
}

function localizedStringArray(value: unknown, key: string, errors: string[], minItems = 0) {
  const record = value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  const result = { fa: [] as string[], en: [] as string[] };
  for (const locale of ["fa", "en"] as const) {
    result[locale] = Array.isArray(record[locale])
      ? record[locale].map((item) => String(item).trim()).filter(Boolean).slice(0, 12)
      : [];
    if (result[locale].length < minItems) errors.push(`${key}.${locale} needs at least ${minItems} items.`);
  }
  return result;
}

export function validateAndNormalizePost(input: unknown): { post?: BlogPost; errors: string[] } {
  const errors: string[] = [];
  const raw = input && typeof input === "object" ? (input as Record<string, unknown>) : {};
  const slug = String(raw.slug ?? "").trim().toLowerCase();
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length < 6 || slug.length > 80) {
    errors.push("slug must be a 6-80 character lowercase, hyphenated ASCII slug.");
  }

  const title = localizedString(raw.title, "title", errors, 20, 110);
  const excerpt = localizedString(raw.excerpt, "excerpt", errors, 80, 260);
  const seoTitle = localizedString(raw.seoTitle, "seoTitle", errors, 20, 65);
  const seoDescription = localizedString(raw.seoDescription, "seoDescription", errors, 100, 165);
  const category = localizedString(raw.category, "category", errors, 2, 50);
  const author = localizedString(raw.author ?? { fa: "تیم محتوای بیاندکس", en: "Beyondex Editorial Team" }, "author", errors, 2, 80);
  const keywords = localizedStringArray(raw.keywords, "keywords", errors, 3);

  const rawSections = Array.isArray(raw.sections) ? raw.sections : [];
  if (rawSections.length < 4 || rawSections.length > 12) errors.push("sections must contain 4-12 substantial sections.");
  const sections: BlogSection[] = rawSections.slice(0, 12).map((value, index) => {
    const section = value && typeof value === "object" ? (value as Record<string, unknown>) : {};
    const id = String(section.id ?? "").trim().toLowerCase();
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) errors.push(`sections[${index}].id is invalid.`);
    return {
      id,
      heading: localizedString(section.heading, `sections[${index}].heading`, errors, 5, 120),
      body: localizedString(section.body, `sections[${index}].body`, errors, 180, 2200),
      bullets: section.bullets ? localizedStringArray(section.bullets, `sections[${index}].bullets`, errors) : undefined,
    };
  });
  if (new Set(sections.map((section) => section.id)).size !== sections.length) errors.push("section ids must be unique.");

  const rawFaq = Array.isArray(raw.faq) ? raw.faq : [];
  const faq: BlogFaq[] = rawFaq.slice(0, 8).map((value, index) => {
    const item = value && typeof value === "object" ? (value as Record<string, unknown>) : {};
    return {
      question: localizedString(item.question, `faq[${index}].question`, errors, 8, 180),
      answer: localizedString(item.answer, `faq[${index}].answer`, errors, 40, 700),
    };
  });

  const rawSources = Array.isArray(raw.sources) ? raw.sources : [];
  if (rawSources.length < 2 || rawSources.length > 12) errors.push("sources must contain 2-12 authoritative sources.");
  const sources: BlogSource[] = rawSources.slice(0, 12).map((value, index) => {
    const source = value && typeof value === "object" ? (value as Record<string, unknown>) : {};
    const title = String(source.title ?? "").trim();
    const url = String(source.url ?? "").trim();
    try {
      if (new URL(url).protocol !== "https:") errors.push(`sources[${index}].url must use HTTPS.`);
    } catch {
      errors.push(`sources[${index}].url is invalid.`);
    }
    if (title.length < 4 || title.length > 180) errors.push(`sources[${index}].title is invalid.`);
    return { title, url };
  });

  for (const locale of ["fa", "en"] as const) {
    const articleLength = sections.reduce((sum, section) => sum + section.body[locale].length + (section.bullets?.[locale].join(" ").length ?? 0), 0);
    if (articleLength < 1400) errors.push(`The ${locale} article needs at least 1,400 characters of substantive content.`);
  }

  const now = new Date().toISOString();
  const publishedAt = typeof raw.publishedAt === "string" && !Number.isNaN(Date.parse(raw.publishedAt)) ? new Date(raw.publishedAt).toISOString() : now;
  const disclosure = localizedString(
    raw.disclosure ?? {
      fa: "این مقاله با کمک هوش مصنوعی و بر اساس منابع ذکرشده تهیه و با معیارهای تحریریهٔ بیاندکس بررسی شده است.",
      en: "This article was prepared with AI assistance, grounded in the cited sources, and checked against Beyondex editorial standards.",
    },
    "disclosure",
    errors,
    40,
    300,
  );

  if (errors.length) return { errors };
  return {
    errors,
    post: {
      schemaVersion: 1,
      slug,
      status: "published",
      publishedAt,
      updatedAt: now,
      author,
      category,
      title,
      excerpt,
      seoTitle,
      seoDescription,
      keywords,
      sections,
      faq,
      sources,
      disclosure,
    },
  };
}
