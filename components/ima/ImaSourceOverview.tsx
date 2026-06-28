import Link from "next/link"
import { ArrowRight, DatabaseZap } from "lucide-react"

import { getImaSourcesForKnowledge, imaSources } from "@/lib/ima-sources"

type ImaSourceOverviewProps = {
  knowledgeSlug?: string
  compact?: boolean
}

export function ImaSourceOverview({ knowledgeSlug, compact = false }: ImaSourceOverviewProps) {
  const sources = knowledgeSlug ? getImaSourcesForKnowledge(knowledgeSlug) : imaSources

  if (!sources.length) return null

  return (
    <div className={compact ? "grid gap-3" : "grid gap-4 md:grid-cols-2 xl:grid-cols-4"}>
      {sources.map((source) => (
        <article key={source.slug} className="border border-line bg-white p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center bg-emerald-50 text-wechat">
              <DatabaseZap className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold leading-7 text-ink">{source.shortName}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{source.description}</p>
            </div>
          </div>
          <div className="mt-4 grid gap-2">
            {source.suggestedQuestions.slice(0, compact ? 2 : 3).map((question) => (
              <div key={question} className="border-l-2 border-emerald-200 pl-3 text-sm leading-6 text-slate-600">
                {question}
              </div>
            ))}
          </div>
          {!compact ? (
            <Link href="/knowledge#ima-search" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-wechat">
              去查询官方资料
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : null}
        </article>
      ))}
    </div>
  )
}

