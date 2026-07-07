import fs from "node:fs"
import path from "node:path"

import matter from "gray-matter"

import { knowledgeBases } from "./constants"
import type { Article, CaseItem, KnowledgeBase } from "./types"

const contentDir = path.join(process.cwd(), "content")

function readMarkdownFiles(folder: string) {
  const dir = path.join(contentDir, folder)
  if (!fs.existsSync(dir)) {
    return []
  }

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .map((file) => {
      const fullPath = path.join(dir, file)
      const raw = fs.readFileSync(fullPath, "utf8")
      const { data, content } = matter(raw)
      return {
        slug: file.replace(/\.mdx?$/, ""),
        data,
        content
      }
    })
}

function estimateReadingTime(content: string) {
  const chineseChars = (content.match(/[\u4e00-\u9fa5]/g) || []).length
  const englishWords = (content.replace(/[\u4e00-\u9fa5]/g, " ").match(/\b\w+\b/g) || []).length
  const minutes = Math.max(1, Math.ceil((chineseChars + englishWords) / 500))
  return `${minutes} 分钟`
}

export function getAllArticles(): Article[] {
  return readMarkdownFiles("articles")
    .map(({ slug, data, content }) => ({
      slug,
      title: String(data.title || slug),
      description: String(data.description || data.summary || ""),
      date: String(data.date || "2026-06-27"),
      updated: data.updated ? String(data.updated) : undefined,
      category: String(data.category || "未分类"),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      author: String(data.author || "宏"),
      cover: data.cover ? String(data.cover) : undefined,
      featured: Boolean(data.featured),
      readingTime: data.readingTime ? String(data.readingTime) : estimateReadingTime(content),
      knowledgeBase: data.knowledgeBase ? String(data.knowledgeBase) : undefined,
      summary: data.summary ? String(data.summary) : undefined,
      originalUrl: data.originalUrl ? String(data.originalUrl) : undefined,
      sourcePath: data.sourcePath ? String(data.sourcePath) : undefined,
      faq: Array.isArray(data.faq) ? data.faq : undefined,
      content
    }))
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
}

export function getFeaturedArticles(limit = 6) {
  return getAllArticles()
    .filter((article) => article.featured)
    .slice(0, limit)
}

export function getArticleBySlug(slug: string) {
  return getAllArticles().find((article) => article.slug === slug)
}

export function getRelatedArticles(article: Article, limit = 3) {
  return getAllArticles()
    .filter((item) => item.slug !== article.slug)
    .map((item) => ({
      article: item,
      score:
        (item.knowledgeBase && item.knowledgeBase === article.knowledgeBase ? 4 : 0) +
        (item.category === article.category ? 3 : 0) +
        item.tags.filter((tag) => article.tags.includes(tag)).length
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.article)
}

export function getKnowledgeBases(): KnowledgeBase[] {
  const articles = getAllArticles()
  return knowledgeBases.map((base) => ({
    ...base,
    articleCount: articles.filter((article) => article.knowledgeBase === base.slug).length
  }))
}

export function getKnowledgeBaseBySlug(slug: string) {
  return getKnowledgeBases().find((base) => base.slug === slug)
}

export function getArticlesByKnowledgeBase(slug: string) {
  return getAllArticles().filter((article) => article.knowledgeBase === slug)
}

export function getAllCases(): CaseItem[] {
  return readMarkdownFiles("cases")
    .map(({ slug, data, content }) => ({
      slug,
      title: String(data.title || slug),
      type: String(data.type || "实践经验"),
      problem: String(data.problem || ""),
      solution: String(data.solution || ""),
      deliverables: Array.isArray(data.deliverables) ? data.deliverables.map(String) : [],
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      order: typeof data.order === "number" ? data.order : undefined,
      public: data.public !== false,
      content
    }))
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
}
