import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { BlogPost } from "@/lib/blog-types";
import type { Locale } from "@/lib/i18n/config";

const blogDirectory = path.join(process.cwd(), "content", "blog");

export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(blogDirectory)) return [];
  return fs
    .readdirSync(blogDirectory)
    .filter((file) => file.endsWith(".json"))
    .map((file) => JSON.parse(fs.readFileSync(path.join(blogDirectory, file), "utf8")) as BlogPost)
    .filter((post) => post.status === "published" && new Date(post.publishedAt).getTime() <= Date.now())
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getBlogPost(slug: string) {
  return getAllBlogPosts().find((post) => post.slug === slug);
}

export function readingMinutes(post: BlogPost, locale: Locale) {
  const text = post.sections.map((section) => `${section.heading[locale]} ${section.body[locale]} ${(section.bullets?.[locale] ?? []).join(" ")}`).join(" ");
  return Math.max(1, Math.ceil(text.split(/\s+/).filter(Boolean).length / (locale === "fa" ? 180 : 210)));
}

export function articlePlainText(post: BlogPost, locale: Locale) {
  return [post.title[locale], post.excerpt[locale], ...post.sections.flatMap((section) => [section.heading[locale], section.body[locale], ...(section.bullets?.[locale] ?? [])])].join("\n");
}
