import { timingSafeEqual } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { validateAndNormalizePost } from "@/lib/blog-types";
import { siteConfig } from "@/lib/data/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const attempts = new Map<string, { count: number; resetAt: number }>();

export function GET() {
  return NextResponse.json({
    name: "Beyondex bilingual article publisher",
    method: "POST",
    authentication: "Authorization: Bearer <BLOG_PUBLISH_SECRET>",
    contentType: "application/json",
    limits: { payloadBytes: 200000, sections: "4-12", sources: "2-12 HTTPS URLs", languages: ["fa", "en"] },
    requiredFields: ["slug", "title", "excerpt", "seoTitle", "seoDescription", "category", "keywords", "sections", "sources"],
    documentation: `${siteConfig.url}/blog-publishing-guide.txt`,
  }, { headers: { "cache-control": "public, max-age=3600, s-maxage=86400" } });
}

function secureEqual(received: string, expected: string) {
  const left = Buffer.from(received);
  const right = Buffer.from(expected);
  return left.length === right.length && timingSafeEqual(left, right);
}

function requestSecret(request: NextRequest) {
  const authorization = request.headers.get("authorization") ?? "";
  return authorization.startsWith("Bearer ") ? authorization.slice(7).trim() : request.headers.get("x-blog-secret")?.trim() ?? "";
}

function rateLimited(request: NextRequest) {
  const key = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const current = attempts.get(key);
  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + 10 * 60 * 1000 });
    return false;
  }
  current.count += 1;
  return current.count > 12;
}

export async function POST(request: NextRequest) {
  if (rateLimited(request)) return NextResponse.json({ ok: false, error: "Too many requests." }, { status: 429 });
  const publishSecret = process.env.BLOG_PUBLISH_SECRET;
  const githubToken = process.env.GITHUB_CONTENT_TOKEN;
  if (!publishSecret || !githubToken) {
    return NextResponse.json({ ok: false, error: "Publishing service is not configured." }, { status: 503 });
  }
  if (!secureEqual(requestSecret(request), publishSecret)) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401, headers: { "www-authenticate": "Bearer" } });
  }
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 200_000) return NextResponse.json({ ok: false, error: "Payload is too large." }, { status: 413 });

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Request body must be valid JSON." }, { status: 400 });
  }
  const { post, errors } = validateAndNormalizePost(payload);
  if (!post) return NextResponse.json({ ok: false, error: "Article failed editorial validation.", details: errors }, { status: 422 });

  const owner = process.env.GITHUB_REPOSITORY_OWNER || "pouya-wp";
  const repository = process.env.GITHUB_REPOSITORY_NAME || "beyondex";
  const branch = process.env.GITHUB_PUBLISH_BRANCH || "main";
  const filePath = `content/blog/${post.slug}.json`;
  const endpoint = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}/contents/${filePath}`;
  const githubHeaders = {
    accept: "application/vnd.github+json",
    authorization: `Bearer ${githubToken}`,
    "x-github-api-version": "2022-11-28",
    "user-agent": "Beyondex-Publisher/1.0",
  };

  let existing: Response;
  try {
    existing = await fetch(`${endpoint}?ref=${encodeURIComponent(branch)}`, { headers: githubHeaders, cache: "no-store" });
  } catch (error) {
    console.error("[blog-publish] GitHub lookup failed", error);
    return NextResponse.json({ ok: false, error: "Could not reach GitHub." }, { status: 502 });
  }
  if (existing.ok) return NextResponse.json({ ok: false, error: "An article with this slug already exists." }, { status: 409 });
  if (existing.status !== 404) {
    return NextResponse.json({ ok: false, error: "Could not verify the destination in GitHub." }, { status: 502 });
  }

  let githubResponse: Response;
  try {
    githubResponse = await fetch(endpoint, {
      method: "PUT",
      headers: { ...githubHeaders, "content-type": "application/json" },
      body: JSON.stringify({
        message: `Publish article: ${post.title.en}`,
        content: Buffer.from(`${JSON.stringify(post, null, 2)}\n`, "utf8").toString("base64"),
        branch,
      }),
    });
  } catch (error) {
    console.error("[blog-publish] GitHub publication failed", error);
    return NextResponse.json({ ok: false, error: "Could not reach GitHub." }, { status: 502 });
  }
  const result = (await githubResponse.json().catch(() => ({}))) as { commit?: { sha?: string }; message?: string };
  if (!githubResponse.ok) {
    console.error("[blog-publish] GitHub rejected publication", githubResponse.status, result.message);
    return NextResponse.json({ ok: false, error: "GitHub rejected the publication request." }, { status: 502 });
  }

  return NextResponse.json(
    {
      ok: true,
      slug: post.slug,
      urls: { fa: `${siteConfig.url}/fa/blog/${post.slug}`, en: `${siteConfig.url}/en/blog/${post.slug}` },
      commitSha: result.commit?.sha,
      deployment: "A repository commit was created; Vercel deployment should start automatically.",
    },
    { status: 201, headers: { "cache-control": "no-store" } },
  );
}
