import { agents } from "@/lib/data/agents";
import { faqs, siteConfig } from "@/lib/data/site";

export const dynamic = "force-static";

export function GET() {
  const agentContent = agents.map((agent) => `## ${agent.name.en} / ${agent.name.fa}
URL: ${siteConfig.url}/en/agents/${agent.slug}
Persian URL: ${siteConfig.url}/fa/agents/${agent.slug}
Category: ${agent.category}
English summary: ${agent.description.en}
خلاصهٔ فارسی: ${agent.description.fa}
Capabilities:
${agent.capabilities.map((item) => `- ${item.title.en}: ${item.body.en}\n- ${item.title.fa}: ${item.body.fa}`).join("\n")}
Boundaries:
${agent.guardrails.map((item) => `- ${item.en}\n- ${item.fa}`).join("\n")}
Integrations: ${agent.integrations.join(", ")}
`).join("\n");

  const faqContent = faqs.map((item) => `### ${item.q.en}\n${item.a.en}\n\n### ${item.q.fa}\n${item.a.fa}`).join("\n\n");
  const body = `# Beyondex — complete public content

Canonical site: ${siteConfig.url}
Languages: Persian (fa-IR, RTL) and English (en, LTR)
Status: Public preview. Purchases, subscriptions, and live agent-panel activation are not available until the related services are connected.

# Agent catalog
${agentContent}

# Frequently asked questions
${faqContent}
`;
  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600, s-maxage=86400" },
  });
}
