import { agents } from "@/lib/data/agents";
import { siteConfig } from "@/lib/data/site";

export const dynamic = "force-static";

export function GET() {
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

## Machine-readable resources
- [Complete bilingual content](${siteConfig.url}/llms-full.txt)
- [Structured content JSON](${siteConfig.url}/content.json)
- [XML sitemap](${siteConfig.url}/sitemap.xml)
`;

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600, s-maxage=86400" },
  });
}
