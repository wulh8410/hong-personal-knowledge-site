import type { Article, FAQItem, KnowledgeBase } from "./types"
import { absoluteUrl } from "./utils"
import { siteConfig } from "./constants"

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author,
    description:
      "微信生态电商与 AI 工具实战观察者，长期关注微信小店、微信推客、小程序商城、微信豆投放和 GEO 内容资产建设。",
    url: siteConfig.url,
    sameAs: []
  }
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description
  }
}

export function articleJsonLd(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.updated || article.date,
    author: {
      "@type": "Person",
      name: article.author
    },
    mainEntityOfPage: absoluteUrl(`/articles/${article.slug}`),
    keywords: article.tags.join(",")
  }
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url)
    }))
  }
}

export function faqJsonLd(faq?: FAQItem[]) {
  if (!faq?.length) return null
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  }
}

export function knowledgeJsonLd(base: KnowledgeBase) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: base.title,
    description: base.description,
    url: absoluteUrl(`/knowledge/${base.slug}`),
    keywords: base.keywords.join(",")
  }
}
