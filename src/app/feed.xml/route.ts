import { getAllBlogPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/data/site";

export const dynamic = "force-static";

function xml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");
}

export function GET() {
  const items = getAllBlogPosts().flatMap((post) => (["fa", "en"] as const).map((locale) => `
    <item>
      <title>${xml(post.title[locale])}</title>
      <link>${siteConfig.url}/${locale}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteConfig.url}/${locale}/blog/${post.slug}</guid>
      <description>${xml(post.excerpt[locale])}</description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <category>${xml(post.category[locale])}</category>
      <dc:language>${locale === "fa" ? "fa-IR" : "en"}</dc:language>
    </item>`)).join("");
  const body = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Beyondex Journal</title>
    <link>${siteConfig.url}/en/blog</link>
    <description>Practical, bilingual guides for choosing and using AI agents.</description>
    <language>en</language>${items}
  </channel>
</rss>`;
  return new Response(body, { headers: { "content-type": "application/rss+xml; charset=utf-8", "cache-control": "public, max-age=3600, s-maxage=86400" } });
}
