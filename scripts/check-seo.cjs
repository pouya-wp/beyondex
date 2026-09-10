const assert = require("node:assert/strict");

const base = process.env.SITE_TEST_URL || "http://localhost:3001";
const canonicalOrigin = "https://beyondex.one";

function unescapeHtml(value) {
  return value.replaceAll("&amp;", "&").replaceAll("&quot;", '"');
}

(async () => {
  const sitemapResponse = await fetch(`${base}/sitemap.xml`);
  assert.equal(sitemapResponse.status, 200);
  const sitemap = await sitemapResponse.text();
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  assert.equal(urls.length, 36, "Expected six bilingual core pages and twelve bilingual agent pages");
  assert.ok(!sitemap.includes("beyondex.ai"));

  for (const canonicalUrl of urls) {
    const url = new URL(canonicalUrl);
    const response = await fetch(`${base}${url.pathname}`);
    assert.equal(response.status, 200, url.pathname);
    const html = unescapeHtml(await response.text());
    const locale = url.pathname.startsWith("/en") ? "en" : "fa";
    const counterpart = url.pathname.replace(/^\/(fa|en)/, locale === "fa" ? "/en" : "/fa");
    assert.ok(html.includes(`<html lang="${locale === "fa" ? "fa-IR" : "en"}" dir="${locale === "fa" ? "rtl" : "ltr"}`), `${url.pathname}: lang/dir`);
    assert.ok(html.includes(`rel="canonical" href="${canonicalUrl}"`), `${url.pathname}: canonical`);
    assert.ok(html.includes(`hrefLang="${locale}" href="${canonicalUrl}"`), `${url.pathname}: self hreflang`);
    assert.ok(html.includes(`hrefLang="${locale === "fa" ? "en" : "fa"}" href="${canonicalOrigin}${counterpart}"`), `${url.pathname}: reciprocal hreflang`);
    assert.ok(html.includes(`hrefLang="x-default"`), `${url.pathname}: x-default`);
    assert.ok(html.includes('name="description"'), `${url.pathname}: description`);
    assert.ok(html.includes('property="og:image"'), `${url.pathname}: social image`);
  }

  const robots = await (await fetch(`${base}/robots.txt`)).text();
  for (const marker of ["Sitemap: https://beyondex.one/sitemap.xml", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "PerplexityBot", "/fa/dashboard"]) {
    assert.ok(robots.includes(marker), `robots.txt: ${marker}`);
  }

  for (const resource of ["/llms.txt", "/llms-full.txt", "/content.json", "/manifest.webmanifest"]) {
    const response = await fetch(`${base}${resource}`);
    assert.equal(response.status, 200, resource);
    assert.ok(Number(response.headers.get("content-length") || 1) > 0, resource);
  }

  const content = await (await fetch(`${base}/content.json`)).json();
  assert.equal(content.canonicalUrl, canonicalOrigin);
  assert.equal(content.agents.length, 12);
  assert.deepEqual(content.languages.map((language) => language.code), ["fa", "en"]);

  for (const privatePath of ["/fa/dashboard", "/en/dashboard", "/fa/checkout/result", "/en/checkout/result"]) {
    const html = await (await fetch(`${base}${privatePath}`)).text();
    assert.ok(html.includes('name="robots" content="noindex, nofollow"'), `${privatePath}: noindex`);
  }

  console.log(`SEO checks passed: ${urls.length} crawlable bilingual URLs, reciprocal hreflang, AI resources, social metadata, and private-route exclusions.`);
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
