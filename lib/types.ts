export type FAQItem = {
  question: string
  answer: string
}

export type Article = {
  slug: string
  title: string
  description: string
  date: string
  updated?: string
  category: string
  tags: string[]
  author: string
  cover?: string
  featured?: boolean
  readingTime: string
  knowledgeBase?: string
  summary?: string
  faq?: FAQItem[]
  content: string
}

export type KnowledgeBase = {
  slug: string
  title: string
  description: string
  shortDescription: string
  icon: string
  topics: string[]
  keywords: string[]
  learningPath: {
    title: string
    description?: string
    href: string
  }[]
  faq: FAQItem[]
  updated: string
  articleCount?: number
}

export type CaseItem = {
  slug: string
  title: string
  type: string
  problem: string
  solution: string
  deliverables: string[]
  tags: string[]
  public: boolean
  content: string
}

export type TocItem = {
  id: string
  text: string
  level: 2 | 3
}
