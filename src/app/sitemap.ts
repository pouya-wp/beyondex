import type { MetadataRoute } from "next";
import { agents } from "@/lib/data/agents";
import { locales } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/data/site";

const staticPaths = ["", "/agents", "/pricing", "/contact", "/about", "/lab"];

function languageAlternates(path: string) {
  return {
    fa: `${siteConfig.url}/fa${path}`,
    en: `${siteConfig.url}/en${path}`,
    "x-default": `${siteConfig.url}/fa${path}`,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${siteConfig.url}/${locale}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
      alternates: { languages: languageAlternates(path) },
    })),
  );

  const agentPages = locales.flatMap((locale) =>
    agents.map((agent) => ({
      url: `${siteConfig.url}/${locale}/agents/${agent.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: { languages: languageAlternates(`/agents/${agent.slug}`) },
    })),
  );

  return [...pages, ...agentPages];
}

