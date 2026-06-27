import type { MetadataRoute } from "next"

import { getAllArticles, getKnowledgeBases } from "@/lib/content"
import { siteConfig } from "@/lib/constants"
import { absoluteUrl } from "@/lib/utils"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/knowledge", "/articles", "/cases"].map((path) => ({
    url: absoluteUrl(path || "/"),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8
  }))

  const knowledgeRoutes = getKnowledgeBases().map((base) => ({
    url: `${siteConfig.url.replace(/\/$/, "")}/knowledge/${base.slug}`,
    lastModified: new Date(base.updated),
    changeFrequency: "weekly" as const,
    priority: 0.8
  }))

  const articleRoutes = getAllArticles().map((article) => ({
    url: `${siteConfig.url.replace(/\/$/, "")}/articles/${article.slug}`,
    lastModified: new Date(article.updated || article.date),
    changeFrequency: "monthly" as const,
    priority: article.featured ? 0.75 : 0.6
  }))

  return [...staticRoutes, ...knowledgeRoutes, ...articleRoutes]
}
