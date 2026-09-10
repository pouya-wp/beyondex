import { agents } from "@/lib/data/agents";
import { siteConfig } from "@/lib/data/site";
import { getAllBlogPosts } from "@/lib/blog";

export const dynamic = "force-static";

export function GET() {
  const articleLinks = getAllBlogPosts()
    .map((post) => `- [${post.title.en}](${siteConfig.url}/en/blog/${post.slug}): ${post.excerpt.en}\n  - [نسخهٔ فارسی](${siteConfig.url}/fa/blog/${post.slug})`)
    .join("\n");
  const agentLinks = agents
    .map((agent) => `- [${agent.name.en}](${siteConfig.url}/en/agents/${agent.slug}): ${agent.tagline.en}`)
    .join("\n");
  const body = `# Beyondex

> Beyondex is a bilingual Persian and English catalog and access hub for specialist AI agents. Each agent has an independent workspace; Beyondex presents capabilities, boundaries, pricing, and manages access. Purchasing and live panel activation are not available yet.

## Languages
- [فارسی](${siteConfig.url}/fa)
- [English](${siteConfig.url}/en)

## Core pages
- [Agent catalog](${siteConfig.url}/en/agents)
- [Plans and pricing](${siteConfig.url}/en/pricing)
- [About Beyondex](${siteConfig.url}/en/about)
- [Contact](${siteConfig.url}/en/contact)

## Agents
${agentLinks}

## Articles and practical guides
- [English journal](${siteConfig.url}/en/blog)
- [مجلهٔ فارسی](${siteConfig.url}/fa/blog)
${articleLinks}

## Machine-readable resources
- [Complete bilingual content](${siteConfig.url}/llms-full.txt)
- [Structured content JSON](${siteConfig.url}/content.json)
- [Bilingual RSS feed](${siteConfig.url}/feed.xml)
- [XML sitemap](${siteConfig.url}/sitemap.xml)
`;

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600, s-maxage=86400" },
  });
}
