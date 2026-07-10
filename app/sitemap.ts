import type { MetadataRoute } from "next"

import { getAllArticles, getAllCourseLessons, getCourseTracks, getKnowledgeBases } from "@/lib/content"
import { siteConfig } from "@/lib/constants"
import { absoluteUrl } from "@/lib/utils"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/knowledge", "/articles", "/courses", "/cases"].map((path) => ({
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

  const courseRoutes = getCourseTracks().map((track) => ({
    url: `${siteConfig.url.replace(/\/$/, "")}/courses/${track.slug}`,
    lastModified: new Date("2026-07-10"),
    changeFrequency: "weekly" as const,
    priority: 0.8
  }))

  const lessonRoutes = getAllCourseLessons().map((lesson) => ({
    url: `${siteConfig.url.replace(/\/$/, "")}/courses/${lesson.track}/${lesson.slug}`,
    lastModified: new Date(lesson.sourceDate),
    changeFrequency: "monthly" as const,
    priority: 0.72
  }))

  return [...staticRoutes, ...knowledgeRoutes, ...articleRoutes, ...courseRoutes, ...lessonRoutes]
}
