"use client"

import { Search } from "lucide-react"
import { useMemo, useState } from "react"

import type { Article } from "@/lib/types"
import { ArticleCard } from "./ArticleCard"
import { cn } from "@/lib/utils"

export function ArticleListClient({ articles }: { articles: Article[] }) {
  const categories = ["全部", ...Array.from(new Set(articles.map((article) => article.category)))]
  const [category, setCategory] = useState("全部")
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return articles.filter((article) => {
      const categoryMatched = category === "全部" || article.category === category
      const text = [article.title, article.description, article.category, ...article.tags].join(" ").toLowerCase()
      return categoryMatched && (!normalized || text.includes(normalized))
    })
  }, [articles, category, query])

  return (
    <div>
      <div className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition",
                category === item ? "bg-ink text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              {item}
            </button>
          ))}
        </div>
        <label className="relative block md:w-80">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索标题、标签、分类"
            className="h-11 w-full rounded-full border border-line bg-white pl-10 pr-4 text-sm outline-none transition focus:border-wechat focus:ring-2 focus:ring-emerald-100"
          />
        </label>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>

      {!filtered.length ? (
        <div className="mt-8 rounded-2xl border border-dashed border-line bg-white p-10 text-center text-sm text-slate-500">
          没有匹配的文章。
        </div>
      ) : null}
    </div>
  )
}
