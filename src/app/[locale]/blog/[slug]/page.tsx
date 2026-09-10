import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articlePlainText, getAllBlogPosts, getBlogPost, readingMinutes } from "@/lib/blog";
import { isLocale, locales, localePath, type Locale } from "@/lib/i18n/config";
import { breadcrumbJsonLd, localizedMetadata, safeJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/data/site";
import { Icons } from "@/components/ui/Icon";

export function generateStaticParams() {
  return locales.flatMap((locale) => getAllBlogPosts().map((post) => ({ locale, slug: post.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPost(slug);
  if (!isLocale(locale) || !post) return {};
  return {
    ...localizedMetadata({ locale, path: `/blog/${slug}`, title: post.seoTitle[locale], description: post.seoDescription[locale] }),
    keywords: post.keywords[locale],
    authors: [{ name: post.author[locale], url: `${siteConfig.url}/${locale}/about` }],
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: raw, slug } = await params;
  const post = getBlogPost(slug);
  if (!isLocale(raw) || !post) notFound();
  const locale = raw as Locale;
  const fa = locale === "fa";
  const articleUrl = `${siteConfig.url}/${locale}/blog/${post.slug}`;
  const graph = [
    breadcrumbJsonLd(locale, [
      { name: fa ? "خانه" : "Home", path: `/${locale}` },
      { name: fa ? "مقاله‌ها" : "Articles", path: `/${locale}/blog` },
      { name: post.title[locale], path: `/${locale}/blog/${post.slug}` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${articleUrl}#article`,
      mainEntityOfPage: articleUrl,
      headline: post.title[locale],
      description: post.excerpt[locale],
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      inLanguage: fa ? "fa-IR" : "en",
      articleSection: post.category[locale],
      keywords: post.keywords[locale].join(", "),
      wordCount: articlePlainText(post, locale).split(/\s+/).length,
      author: { "@type": "Organization", name: post.author[locale], url: `${siteConfig.url}/${locale}/about` },
      publisher: { "@id": `${siteConfig.url}/#organization` },
      image: `${siteConfig.url}/${locale}/opengraph-image`,
      citation: post.sources.map((source) => source.url),
    },
    ...(post.faq.length ? [{
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faq.map((item) => ({ "@type": "Question", name: item.question[locale], acceptedAnswer: { "@type": "Answer", text: item.answer[locale] } })),
    }] : []),
  ];

  return (
    <div className="article-page container-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(graph) }} />
      <nav className="article-breadcrumb" aria-label={fa ? "مسیر صفحه" : "Breadcrumb"}>
        <Link href={localePath(locale)}>{fa ? "خانه" : "Home"}</Link><span>/</span>
        <Link href={localePath(locale, "/blog")}>{fa ? "مقاله‌ها" : "Articles"}</Link><span>/</span>
        <span aria-current="page">{post.category[locale]}</span>
      </nav>
      <article>
        <header className="article-hero">
          <span className="article-category">{post.category[locale]}</span>
          <h1>{post.title[locale]}</h1>
          <p>{post.excerpt[locale]}</p>
          <div className="article-byline">
            <span>BX</span>
            <div><strong>{post.author[locale]}</strong><small><time dateTime={post.publishedAt}>{new Intl.DateTimeFormat(fa ? "fa-IR" : "en", { dateStyle: "long" }).format(new Date(post.publishedAt))}</time> · {readingMinutes(post, locale)} {fa ? "دقیقه مطالعه" : "min read"}</small></div>
          </div>
        </header>

        <div className="article-layout">
          <aside className="article-toc">
            <strong>{fa ? "در این مقاله" : "In this article"}</strong>
            <nav>{post.sections.map((section, index) => <a href={`#${section.id}`} key={section.id}><span>0{index + 1}</span>{section.heading[locale]}</a>)}</nav>
          </aside>
          <div className="article-body">
            {post.sections.map((section) => (
              <section id={section.id} key={section.id}>
                <h2>{section.heading[locale]}</h2>
                <p>{section.body[locale]}</p>
                {section.bullets?.[locale]?.length ? <ul>{section.bullets[locale].map((item) => <li key={item}>{item}</li>)}</ul> : null}
              </section>
            ))}

            {post.faq.length ? <section className="article-faq"><h2>{fa ? "پرسش‌های رایج" : "Common questions"}</h2>{post.faq.map((item) => <details key={item.question.en}><summary>{item.question[locale]}</summary><p>{item.answer[locale]}</p></details>)}</section> : null}

            <section className="article-sources">
              <h2>{fa ? "منابع و مطالعهٔ بیشتر" : "Sources and further reading"}</h2>
              <ol>{post.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.title}<Icons.arrowUpRight size={14} /></a></li>)}</ol>
            </section>
            <p className="article-disclosure"><Icons.sparkles size={15} />{post.disclosure[locale]}</p>
          </div>
        </div>
      </article>
      <aside className="article-next"><div><span>BEYONDEX / JOURNAL</span><h2>{fa ? "موضوع بعدی را کشف کنید." : "Keep exploring useful ideas."}</h2></div><Link href={localePath(locale, "/blog")}>{fa ? "همهٔ مقاله‌ها" : "All articles"}<Icons.arrowUpRight size={18} /></Link></aside>
    </div>
  );
}
