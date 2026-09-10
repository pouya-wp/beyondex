import { siteConfig } from "@/lib/data/site";

export const dynamic = "force-static";

export function GET() {
  const guide = `# Beyondex article publishing API

Endpoint: ${siteConfig.url}/api/blog/publish
Method: POST
Authentication: Authorization: Bearer <secret>
Content-Type: application/json

Send one original article per request. Every article must contain complete Persian and English versions.

Required JSON shape:
{
  "slug": "lowercase-english-slug",
  "publishedAt": "ISO-8601 timestamp (optional)",
  "author": { "fa": "تیم محتوای بیاندکس", "en": "Beyondex Editorial Team" },
  "category": { "fa": "...", "en": "..." },
  "title": { "fa": "20-110 chars", "en": "20-110 chars" },
  "excerpt": { "fa": "80-260 chars", "en": "80-260 chars" },
  "seoTitle": { "fa": "20-65 chars", "en": "20-65 chars" },
  "seoDescription": { "fa": "100-165 chars", "en": "100-165 chars" },
  "keywords": { "fa": ["at least 3"], "en": ["at least 3"] },
  "sections": [{
    "id": "english-anchor",
    "heading": { "fa": "5-120 chars", "en": "5-120 chars" },
    "body": { "fa": "180-2200 chars", "en": "180-2200 chars" },
    "bullets": { "fa": ["optional"], "en": ["optional"] }
  }],
  "faq": [{
    "question": { "fa": "...", "en": "..." },
    "answer": { "fa": "...", "en": "..." }
  }],
  "sources": [{ "title": "Official source title", "url": "https://..." }]
}

Validation:
- slug: unique, 6-80 characters, lowercase ASCII words separated by hyphens
- sections: 4-12; at least 1,400 substantive characters in each language
- sources: 2-12 authoritative HTTPS sources
- request limit: 200 KB

Responses:
- 201: committed successfully; response includes Persian and English URLs
- 401: bad or missing secret; do not retry
- 409: slug already exists; choose a genuinely different topic and slug
- 422: editorial validation failed; correct the returned details and retry once
- 429: too many attempts; wait before retrying
- 502/503: publishing infrastructure is unavailable; retry later

Publishing creates a commit in the Beyondex repository. The connected Vercel project then deploys that commit. Never claim a URL is live until the API returns 201.
`;
  return new Response(guide, { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600, s-maxage=86400" } });
}
