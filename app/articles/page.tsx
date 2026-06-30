import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { ArticleCard } from "@/components/article/ArticleCard"
import { Container } from "@/components/layout/Container"
import { JsonLd } from "@/components/seo/JsonLd"
import { getAllArticles } from "@/lib/content"
import { breadcrumbJsonLd } from "@/lib/seo"
import { absoluteUrl } from "@/lib/utils"

export const metadata: Metadata = {
  title: "文章",
  description: "阅读关于微信小店、视频号、广告投放、微信推客、违规规则、公私域联运、AI 工具和 GEO 的系统性文章。",
  alternates: {
    canonical: absoluteUrl("/articles")
  },
  openGraph: {
    title: "文章",
    description: "微信生态、AI 工具与 GEO 实战文章列表。",
    url: absoluteUrl("/articles")
  }
}

const categoryOrder = [
  "微信小店",
  "视频号",
  "广告投放",
  "微信推客",
  "违规规则及解析",
  "微信公私域联运",
  "AI 工具",
  "GEO"
]

const categoryDescriptions: Record<string, string> = {
  微信小店: "围绕开店、商品、交易、履约、体验分和经营规则，先建立微信小店的完整业务底盘。",
  视频号: "整理视频号直播、起号、内容、案例和账号经营方法，帮助判断直播间怎么持续迭代。",
  广告投放: "覆盖微信豆、小店广告、ADQ、直播投流、赔付规则和投放复盘，适合做预算与增长判断。",
  微信推客: "拆解推客机制、优选联盟、染色期、机构平台和私域分销，理解微信生态协作链路。",
  违规规则及解析: "收拢直播、小店、短视频、申诉和治理规则，适合做运营前的风险检查清单。",
  微信公私域联运: "关注视频号、小店、公众号、小程序、企微和社群之间的承接关系，解决流量沉淀问题。",
  "AI 工具": "记录 AI 工具进入内容、开发、资料整理和自动化流程的实战方法。",
  GEO: "探索个人品牌、专题内容和结构化资产如何被搜索引擎与 AI 搜索更准确理解。"
}

function categoryId(category: string) {
  return `category-${category
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\p{Letter}\p{Number}-]/gu, "")}`
}

export default function ArticlesPage() {
  const articles = getAllArticles()
  const latestArticles = articles.slice(0, 6)
  const articleCategories = Array.from(new Set(articles.map((article) => article.category)))
  const categories = [
    ...categoryOrder.filter((category) => articleCategories.includes(category)),
    ...articleCategories.filter((category) => !categoryOrder.includes(category)).sort()
  ]
  const groupedArticles = categories.map((category) => ({
    category,
    articles: articles.filter((article) => article.category === category)
  }))

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "首页", url: "/" },
          { name: "文章", url: "/articles" }
        ])}
      />
      <section id="top" className="bg-white py-14">
        <Container>
          <p className="text-sm font-semibold text-wechat">实战文章</p>
          <h1 className="mt-4 text-4xl font-bold text-ink">微信生态实战文章</h1>
          <p className="mt-5 max-w-3xl text-lg leading-9 text-slate-600">
            如果你正在研究微信小店、视频号直播、投放、推客或公私域联运，可以先看最近更新，也可以按下面的主题直接进入对应内容。
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {groupedArticles.map((group) => (
              <Link
                key={group.category}
                href={`#${categoryId(group.category)}`}
                className="border border-line bg-white px-3 py-1.5 text-sm text-slate-700 transition hover:border-wechat hover:text-wechat"
              >
                {group.category}
                <span className="ml-1 text-xs text-slate-400">{group.articles.length}</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-surface py-14">
        <Container>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="inline-flex border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-wechat">
                最新文章
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-ink">最新更新的 6 篇</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-600">
              这里放最近整理和更新的内容，适合快速了解最近补充了哪些资料。
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {latestArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-14">
        <Container className="grid gap-12">
          {groupedArticles.map((group) => (
            <section key={group.category} id={categoryId(group.category)} className="scroll-mt-24">
              <div className="flex flex-col gap-4 border-b border-line pb-5 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-3xl font-semibold text-ink">{group.category}</h2>
                    <span className="border border-line bg-slate-50 px-2.5 py-1 text-xs text-slate-500">
                      {group.articles.length} 篇
                    </span>
                  </div>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                    {categoryDescriptions[group.category] || "围绕这个专题持续整理可检索、可复用的实战文章。"}
                  </p>
                </div>
                <Link href="#top" className="inline-flex items-center gap-1 text-sm font-semibold text-wechat">
                  回到顶部
                  <ArrowRight className="h-4 w-4 rotate-[-90deg]" />
                </Link>
              </div>
              <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {group.articles.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            </section>
          ))}
        </Container>
      </section>
    </>
  )
}
