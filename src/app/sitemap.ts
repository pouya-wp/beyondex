import type { MetadataRoute } from "next";
import { agents } from "@/lib/data/agents";
import { locales } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/data/site";

const staticPaths = ["", "/agents", "/pricing", "/contact", "/about", "/lab"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages = locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${siteConfig.url}/${locale}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
  );

  const agentPages = locales.flatMap((locale) =>
    agents.map((agent) => ({
      url: `${siteConfig.url}/${locale}/agents/${agent.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  );

  return [...pages, ...agentPages];
}

