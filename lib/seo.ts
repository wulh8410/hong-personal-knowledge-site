import type { Article, FAQItem, KnowledgeBase } from "./types"
import { absoluteUrl } from "./utils"
import { siteConfig } from "./constants"

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": absoluteUrl("/#person"),
    name: siteConfig.author,
    description:
      "微信生态电商与 AI 工具实战观察者，长期关注微信小店、微信推客、小程序商城、微信豆投放和 GEO 内容资产建设。",
    url: siteConfig.url,
    image: absoluteUrl("/images/ip-redesign/hero-business-portrait.png"),
    jobTitle: "微信生态与 AI 实战顾问",
    knowsAbout: ["微信小店", "视频号直播", "微信豆投放", "微信推客", "AI 工具", "GEO"],
    sameAs: [siteConfig.githubUrl]
  }
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "zh-CN",
    author: {
      "@type": "Person",
      "@id": absoluteUrl("/#person"),
      name: siteConfig.author,
      url: siteConfig.authorUrl
    }
  }
}

export function profilePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    dateModified: siteConfig.lastModified,
    inLanguage: "zh-CN",
    mainEntity: {
      "@id": absoluteUrl("/#person")
    }
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
      "@id": absoluteUrl("/#person"),
      name: article.author,
      url: siteConfig.authorUrl
    },
    publisher: {
      "@type": "Person",
      "@id": absoluteUrl("/#person"),
      name: siteConfig.author,
      url: siteConfig.authorUrl
    },
    mainEntityOfPage: absoluteUrl(`/articles/${article.slug}`),
    url: absoluteUrl(`/articles/${article.slug}`),
    inLanguage: "zh-CN",
    isAccessibleForFree: true,
    articleSection: article.category,
    image: article.cover ? absoluteUrl(article.cover) : absoluteUrl("/images/ip-redesign/hero-business-portrait.png"),
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

export function collectionPageJsonLd({
  name,
  description,
  path,
  items
}: {
  name: string
  description: string
  path: string
  items: { name: string; path: string }[]
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: absoluteUrl(path),
    inLanguage: "zh-CN",
    author: {
      "@type": "Person",
      "@id": absoluteUrl("/#person"),
      name: siteConfig.author,
      url: siteConfig.authorUrl
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: absoluteUrl(item.path)
      }))
    }
  }
}
