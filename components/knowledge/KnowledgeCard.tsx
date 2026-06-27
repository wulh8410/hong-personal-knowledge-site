import Link from "next/link"
import { ArrowRight } from "lucide-react"

import type { KnowledgeBase } from "@/lib/types"

export function KnowledgeCard({ base }: { base: KnowledgeBase }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-wechat">{base.articleCount || 0} 篇文章</p>
          <h2 className="mt-2 text-xl font-semibold text-ink">{base.title}</h2>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs text-wechat">更新 {base.updated}</span>
      </div>
      <p className="mt-4 flex-1 text-sm leading-7 text-slate-600">{base.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {base.topics.slice(0, 6).map((topic) => (
          <span key={topic} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
            {topic}
          </span>
        ))}
      </div>
      <Link
        href={`/knowledge/${base.slug}`}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-wechat"
      >
        进入知识库
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  )
}
