"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useState } from "react"

type ArticlePreview = {
  slug: string
  title: string
}

type TopicGroup = {
  category: string
  description: string
  articles: ArticlePreview[]
}

export function ArticleTopicBrowser({ groups }: { groups: TopicGroup[] }) {
  const [activeCategory, setActiveCategory] = useState(groups[0]?.category || "")
  const activeGroup = groups.find((group) => group.category === activeCategory) || groups[0]

  if (!activeGroup) return null

  return (
    <section className="grid min-w-0 min-h-[760px] lg:grid-cols-[minmax(330px,0.7fr)_minmax(0,1.3fr)]">
      <div className="min-w-0 bg-cobalt px-5 py-12 text-white sm:px-8 lg:px-14 lg:py-16">
        <div className="flex items-center gap-3 text-sm font-semibold">
          <span className="font-mono text-xl font-bold text-wechat">{"//"}</span>
          <span>按主题阅读</span>
          <span className="font-mono text-[10px] text-white/58">BROWSE BY TOPIC</span>
        </div>
        <div className="mt-10 flex gap-2 overflow-x-auto pb-3 lg:grid lg:gap-0 lg:overflow-visible">
          {groups.map((group) => {
            const active = group.category === activeGroup.category
            return (
              <button
                key={group.category}
                type="button"
                onClick={() => setActiveCategory(group.category)}
                className={`min-w-max border-b px-4 py-5 text-left text-xl font-semibold transition sm:text-2xl lg:w-full lg:px-0 lg:py-6 lg:text-3xl ${
                  active
                    ? "border-wechat border-l-4 pl-5 text-white"
                    : "border-white/20 text-white/78 hover:text-white"
                }`}
              >
                {group.category}
              </button>
            )
          })}
        </div>
        <p className="mt-12 hidden items-center gap-3 text-xs text-white/72 lg:flex">
          <span className="grid h-8 w-8 place-items-center rounded-full border border-wechat text-wechat">
            <ArrowRight className="h-4 w-4" />
          </span>
          切换主题，保留当前阅读位置
        </p>
      </div>

      <div className="min-w-0 paper-texture px-5 py-12 sm:px-8 lg:px-16 lg:py-20">
        <h2 className="max-w-4xl text-[36px] font-semibold leading-tight sm:text-[48px]">按问题进入，而不是在长列表里找</h2>
        <div className="mt-7 h-1 w-12 bg-wechat" />
        <p className="mt-6 max-w-3xl text-base leading-8 text-ink/60">{activeGroup.description}</p>

        <div className="mt-10 border-t border-line">
          {activeGroup.articles.slice(0, 6).map((article, index) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="group grid min-h-24 grid-cols-[48px_1fr_auto] items-center gap-4 border-b border-line px-2 transition hover:bg-white/70 sm:grid-cols-[68px_1fr_130px]"
            >
              <span className="border-r border-line py-5 font-mono text-sm text-ink/65">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="py-5 text-base font-semibold leading-7 sm:text-xl">{article.title}</span>
              <span className="hidden items-center justify-end gap-3 text-sm font-semibold text-cobalt transition group-hover:text-wechat sm:flex">
                阅读全文
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <ArrowRight className="h-4 w-4 text-cobalt sm:hidden" />
            </Link>
          ))}
        </div>

        <Link
          href={`/knowledge/${categoryToKnowledgeSlug[activeGroup.category] || "wechat-store"}`}
          className="mt-9 inline-flex items-center gap-5 border-b border-wechat pb-2 text-sm font-semibold text-wechat"
        >
          进入{activeGroup.category}专题
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}

const categoryToKnowledgeSlug: Record<string, string> = {
  微信小店: "wechat-store",
  视频号: "video-account",
  广告投放: "ad-traffic",
  微信推客: "wechat-tuike",
  违规规则及解析: "store-live-violations",
  微信公私域联运: "public-private-domain",
  "AI 工具": "ai-tools",
  GEO: "geo"
}
