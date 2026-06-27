import Link from "next/link"
import { ArrowUpRight, CalendarDays } from "lucide-react"

import type { Article } from "@/lib/types"
import { formatDate } from "@/lib/utils"

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-wechat">
          {article.category}
        </span>
        {article.featured ? <span className="text-xs font-medium text-slate-500">精选</span> : null}
      </div>
      <h2 className="mt-4 text-lg font-semibold leading-7 text-ink">
        <Link href={`/articles/${article.slug}`} className="hover:text-wechat">
          {article.title}
        </Link>
      </h2>
      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-7 text-slate-600">{article.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {article.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-xs text-slate-500">
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="h-3.5 w-3.5" />
          {formatDate(article.updated || article.date)}
        </span>
        <Link
          href={`/articles/${article.slug}`}
          className="inline-flex items-center gap-1 font-medium text-wechat"
        >
          阅读
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  )
}
