import { agents } from "@/lib/data/agents";
import { faqs, siteConfig } from "@/lib/data/site";

export const dynamic = "force-static";

export function GET() {
  return Response.json(
    {
      name: siteConfig.name,
      canonicalUrl: siteConfig.url,
      languages: [
        { code: "fa", tag: "fa-IR", direction: "rtl", url: `${siteConfig.url}/fa` },
        { code: "en", tag: "en", direction: "ltr", url: `${siteConfig.url}/en` },
      ],
      status: {
        en: "Public preview; purchase and live panel activation are not available yet.",
        fa: "نسخهٔ پیش‌نمایش عمومی؛ خرید و فعال‌سازی پنل زنده هنوز در دسترس نیست.",
      },
      agents: agents.map(({ slug, name, tagline, description, category, price, capabilities, integrations, guardrails }) => ({
        slug,
        urls: { fa: `${siteConfig.url}/fa/agents/${slug}`, en: `${siteConfig.url}/en/agents/${slug}` },
        name,
        tagline,
        description,
        category,
        monthlyPrice: { usd: price.usd, toman: price.irt },
        capabilities,
        integrations,
        guardrails,
      })),
      faqs,
    },
    { headers: { "cache-control": "public, max-age=3600, s-maxage=86400" } },
  );
}
