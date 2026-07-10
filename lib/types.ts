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
  originalUrl?: string
  sourcePath?: string
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
  order?: number
  public: boolean
  content: string
}

export type TocItem = {
  id: string
  text: string
  level: 2 | 3
}

export type CourseLessonStatus = "complete" | "text" | "video"

export type CourseLesson = {
  slug: string
  title: string
  description: string
  track: string
  order: number
  sourceIssue: string
  sourceDate: string
  sourceUrl?: string
  replayUrl?: string
  infographic?: string
  status: CourseLessonStatus
  duration: string
  content: string
}

export type CourseTrack = {
  slug: string
  title: string
  shortTitle: string
  description: string
  promise: string
  audience: string
  index: string
  color: "green" | "blue" | "red" | "amber" | "violet"
  planned?: boolean
  lessons: CourseLesson[]
}
