"use client"

import { FormEvent, useMemo, useState } from "react"
import { Loader2, Search } from "lucide-react"

import type { ImaSource } from "@/lib/ima-sources"

type ImaResult = {
  title: string
  sourceName: string
  sourceSlug: string
  mediaType: string
  excerpt: string
}

type ImaKnowledgeSearchProps = {
  sources: ImaSource[]
  initialSource?: string
  suggestedQuestions?: string[]
}

export function ImaKnowledgeSearch({ sources, initialSource = "all", suggestedQuestions = [] }: ImaKnowledgeSearchProps) {
  const [query, setQuery] = useState("")
  const [source, setSource] = useState(initialSource)
  const [results, setResults] = useState<ImaResult[]>([])
  const [error, setError] = useState("")
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)

  const questions = useMemo(() => {
    if (suggestedQuestions.length) return suggestedQuestions
    return sources.flatMap((item) => item.suggestedQuestions).slice(0, 6)
  }, [sources, suggestedQuestions])

  async function runSearch(nextQuery = query) {
    const finalQuery = nextQuery.trim()
    if (!finalQuery) return

    setLoading(true)
    setError("")
    setSearched(true)

    try {
      const response = await fetch("/api/ima/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: finalQuery, source })
      })
      const data = await response.json()

      if (!response.ok) {
        setResults([])
        setError(data.error || "查询失败，请稍后再试。")
        return
      }

      setResults(data.results || [])
    } catch {
      setResults([])
      setError("查询失败，请稍后再试。")
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    void runSearch()
  }

  function handleQuestion(question: string) {
    setQuery(question)
    void runSearch(question)
  }

  return (
    <div id="ima-search" className="border border-line bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-wechat">查官方资料库</p>
          <h2 className="mt-2 text-2xl font-semibold text-ink">用 ima 查询公告、规则和案例原文</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            这里查的是宏在腾讯 ima 中整理的官方资料库。适合先核对规则、公告、违规案例，再回到站内文章看解释和落地路径。
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 grid gap-3 lg:grid-cols-[220px_1fr_120px]">
        <select
          value={source}
          onChange={(event) => setSource(event.target.value)}
          className="h-11 border border-line bg-white px-3 text-sm text-ink outline-none focus:border-wechat"
        >
          <option value="all">全部官方资料库</option>
          {sources.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.shortName}
            </option>
          ))}
        </select>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="输入你要查的问题，例如：推客佣金、违规、微信豆投放"
          className="h-11 border border-line px-3 text-sm text-ink outline-none focus:border-wechat"
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-11 items-center justify-center gap-2 bg-ink px-4 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          查询
        </button>
      </form>

      <div className="mt-4 flex flex-wrap gap-2">
        {questions.map((question) => (
          <button
            key={question}
            type="button"
            onClick={() => handleQuestion(question)}
            className="border border-line bg-slate-50 px-3 py-1.5 text-xs text-slate-600 transition hover:border-wechat hover:text-wechat"
          >
            {question}
          </button>
        ))}
      </div>

      {error ? <div className="mt-5 border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div> : null}

      {searched && !loading && !error ? (
        <div className="mt-6">
          {results.length ? (
            <div className="grid gap-3">
              {results.map((item, index) => (
                <article key={`${item.sourceSlug}-${item.title}-${index}`} className="border border-line bg-slate-50 p-4">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="bg-white px-2 py-1 text-wechat">{item.sourceName}</span>
                    <span>{item.mediaType}</span>
                  </div>
                  <h3 className="mt-3 text-base font-semibold leading-7 text-ink">{item.title}</h3>
                  {item.excerpt ? <p className="mt-2 text-sm leading-7 text-slate-600">{item.excerpt}</p> : null}
                </article>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-line bg-slate-50 p-6 text-center text-sm text-slate-500">
              没有查到匹配资料。可以换一个更具体的关键词，比如“佣金”“保证金”“违规”“投放目标”。
            </div>
          )}
        </div>
      ) : null}
    </div>
  )
}

