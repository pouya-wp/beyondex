import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllBlogPosts, readingMinutes } from "@/lib/blog";
import { isLocale, localePath, type Locale } from "@/lib/i18n/config";
import { localizedMetadata, safeJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/data/site";
import { Icons } from "@/components/ui/Icon";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const fa = locale === "fa";
  return {
    ...localizedMetadata({
      locale,
      path: "/blog",
      title: fa ? "مقاله‌ها و راهنماهای هوش مصنوعی" : "AI articles and practical guides",
      description: fa
        ? "راهنماهای عمیق و کاربردی بیاندکس برای انتخاب، ارزیابی و استفادهٔ مسئولانه از ایجنت‌های هوش مصنوعی در کسب‌وکار."
        : "In-depth, practical Beyondex guides for choosing, evaluating, and responsibly using AI agents in real business workflows.",
    }),
    alternates: {
      canonical: `/${locale}/blog`,
      languages: { fa: "/fa/blog", en: "/en/blog", "x-default": "/fa/blog" },
      types: { "application/rss+xml": "/feed.xml" },
    },
  };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const fa = locale === "fa";
  const posts = getAllBlogPosts();
  const itemList = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: fa ? "مجلهٔ بیاندکس" : "Beyondex Journal",
    url: `${siteConfig.url}/${locale}/blog`,
    inLanguage: fa ? "fa-IR" : "en",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: post.title[locale],
        url: `${siteConfig.url}/${locale}/blog/${post.slug}`,
      })),
    },
  };

  return (
    <div className="blog-index container-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(itemList) }} />
      <header className="blog-index-hero">
        <span className="fl-overline">BEYONDEX / JOURNAL</span>
        <h1>{fa ? <>فهم عمیق‌تر.<br /><em>تصمیم بهتر.</em></> : <>Deeper understanding.<br /><em>Better decisions.</em></>}</h1>
        <p>{fa ? "راهنماهای روشن، کاربردی و منبع‌دار برای استفاده از ایجنت‌های هوش مصنوعی در کار واقعی." : "Clear, practical, source-backed guides for using AI agents in real work."}</p>
        <a className="blog-rss" href="/feed.xml" type="application/rss+xml"><Icons.sparkles size={16} /> RSS</a>
      </header>

      <section className="blog-grid" aria-label={fa ? "فهرست مقاله‌ها" : "Article directory"}>
        {posts.map((post, index) => (
          <article className="blog-card" key={post.slug}>
            <Link href={localePath(locale, `/blog/${post.slug}`)} className="blog-card-art" aria-label={post.title[locale]}>
              <span>0{index + 1}</span><i /><b>BX</b><small>{post.category[locale]}</small>
            </Link>
            <div className="blog-card-copy">
              <div className="blog-card-meta">
                <time dateTime={post.publishedAt}>{new Intl.DateTimeFormat(fa ? "fa-IR" : "en", { dateStyle: "medium" }).format(new Date(post.publishedAt))}</time>
                <span>{readingMinutes(post, locale)} {fa ? "دقیقه مطالعه" : "min read"}</span>
              </div>
              <h2><Link href={localePath(locale, `/blog/${post.slug}`)}>{post.title[locale]}</Link></h2>
              <p>{post.excerpt[locale]}</p>
              <Link className="blog-read" href={localePath(locale, `/blog/${post.slug}`)}>{fa ? "خواندن مقاله" : "Read article"}<Icons.arrowUpRight size={17} /></Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
