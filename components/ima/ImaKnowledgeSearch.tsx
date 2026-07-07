"use client"

import { FormEvent, useMemo, useState } from "react"
import { ArrowRight, ExternalLink, Loader2, Search } from "lucide-react"

import type { ImaSource } from "@/lib/ima-sources"

type ImaResult = {
  title: string
  sourceName: string
  sourceSlug: string
  mediaType: string
  excerpt: string
  sourceUrl?: string
}

type ImaAnswer = {
  title: string
  summary: string
  steps: string[]
  checklist: string[]
  note: string
  evidence: string[]
}

type ImaKnowledgeSearchProps = {
  sources: ImaSource[]
  initialSource?: string
  suggestedQuestions?: string[]
  showIntro?: boolean
}

export function ImaKnowledgeSearch({
  sources,
  initialSource,
  suggestedQuestions = [],
  showIntro = true
}: ImaKnowledgeSearchProps) {
  const [query, setQuery] = useState("")
  const [source, setSource] = useState(initialSource || sources[0]?.slug || "")
  const [results, setResults] = useState<ImaResult[]>([])
  const [answer, setAnswer] = useState<ImaAnswer | null>(null)
  const [matchedQuery, setMatchedQuery] = useState("")
  const [sourceName, setSourceName] = useState("")
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
        setAnswer(null)
        setMatchedQuery("")
        setSourceName("")
        setError(data.error || "查询失败，请稍后再试。")
        return
      }

      setResults(data.results || [])
      setAnswer(data.answer || null)
      setMatchedQuery(data.matchedQuery || finalQuery)
      setSourceName(data.sourceName || "")
    } catch {
      setResults([])
      setAnswer(null)
      setMatchedQuery("")
      setSourceName("")
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
    <div id="ima-search" className="scroll-mt-24">
      {showIntro ? (
        <div>
          <p className="text-sm font-semibold text-wechat">查官方资料库</p>
          <h2 className="mt-2 text-2xl font-semibold text-ink">用 ima 查询公告、规则和案例原文</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-ink/60">
            这里查的是宏在腾讯 ima 中整理的官方资料库。适合先核对规则、公告、违规案例，再回到站内文章看解释和落地路径。
          </p>
        </div>
      ) : null}

      <form
        onSubmit={handleSubmit}
        className={`${showIntro ? "mt-5" : ""} grid border-2 border-wechat bg-paper lg:grid-cols-[230px_1fr_190px]`}
      >
        <select
          value={source}
          onChange={(event) => {
            setSource(event.target.value)
            setResults([])
            setAnswer(null)
            setSearched(false)
            setError("")
          }}
          aria-label="选择资料库"
          className="h-16 border-b border-wechat/35 bg-paper px-4 text-sm text-ink lg:border-b-0 lg:border-r"
        >
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
          aria-label="输入查询问题"
          className="h-16 bg-paper px-5 text-base text-ink placeholder:text-ink/35"
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-16 items-center justify-center gap-4 bg-wechat px-5 text-sm font-semibold text-white transition hover:bg-[#05aa54] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
          开始查询
        </button>
      </form>

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
        {questions.map((question) => (
          <button
            key={question}
            type="button"
            onClick={() => handleQuestion(question)}
            className="border-b border-line py-1.5 text-xs text-ink/52 transition hover:border-wechat hover:text-wechat"
          >
            {question}
          </button>
        ))}
      </div>

      {error ? <div className="mt-5 border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div> : null}

      {searched && !loading && !error ? (
        <div className="mt-6">
          {results.length ? (
            <div>
              <p className="border-b border-line pb-4 text-sm text-ink/55">
                已在「{sourceName}」中按
                <span className="mx-1 font-semibold text-ink">“{matchedQuery}”</span>
                找到 {results.length} 条相关资料
              </p>
              {answer ? (
                <section className="border-b-2 border-ink bg-white py-7">
                  <div className="flex items-start gap-4">
                    <span className="mt-1 font-mono text-3xl font-semibold text-wechat">答</span>
                    <div>
                      <h3 className="text-2xl font-semibold leading-9 text-ink">{answer.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-ink/62">{answer.summary}</p>
                    </div>
                  </div>

                  <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
                    <div>
                      <p className="border-l-2 border-wechat pl-3 text-sm font-semibold text-ink">建议操作步骤</p>
                      <ol className="mt-4 grid gap-3">
                        {answer.steps.map((step, index) => (
                          <li key={step} className="grid grid-cols-[34px_1fr] gap-3 text-sm leading-7 text-ink/70">
                            <span className="font-mono text-wechat">{String(index + 1).padStart(2, "0")}</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <aside className="border-l border-line pl-5">
                      <p className="text-sm font-semibold text-ink">准备/核对清单</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {answer.checklist.map((item) => (
                          <span key={item} className="border border-line bg-paper px-2.5 py-1.5 text-xs text-ink/62">
                            {item}
                          </span>
                        ))}
                      </div>
                    </aside>
                  </div>

                  {answer.evidence.length ? (
                    <div className="mt-7 border-t border-line pt-5">
                      <p className="text-sm font-semibold text-ink">命中依据</p>
                      <div className="mt-3 grid gap-2">
                        {answer.evidence.map((item) => (
                          <p key={item} className="text-xs leading-6 text-ink/52">
                            {item}
                          </p>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  <p className="mt-6 text-xs leading-6 text-ink/45">{answer.note}</p>
                </section>
              ) : null}
              <div className="grid gap-3">
                {results.map((item, index) => (
                  <article key={`${item.sourceSlug}-${item.title}-${index}`} className="border-b border-line bg-paper py-5">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className="border border-wechat/30 px-2 py-1 text-wechat">{item.sourceName}</span>
                      <span>{item.mediaType}</span>
                    </div>
                    <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <h3 className="text-base font-semibold leading-7 text-ink">{item.title}</h3>
                      {item.sourceUrl ? (
                        <a
                          href={item.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex shrink-0 items-center gap-2 text-xs font-semibold text-cobalt hover:text-wechat"
                        >
                          查看来源
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      ) : (
                        <span className="inline-flex shrink-0 items-center gap-2 text-xs text-ink/36">
                          来源需在 ima 客户端查看
                          <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      )}
                    </div>
                    {item.excerpt ? <p className="mt-2 text-sm leading-7 text-ink/58">{item.excerpt}</p> : null}
                  </article>
                ))}
              </div>
            </div>
          ) : (
            <div className="border border-dashed border-line bg-paper p-6 text-center text-sm text-ink/50">
              没有查到匹配资料。可以换一个更具体的关键词，比如“佣金”“保证金”“违规”“投放目标”。
            </div>
          )}
        </div>
      ) : null}
    </div>
  )
}
