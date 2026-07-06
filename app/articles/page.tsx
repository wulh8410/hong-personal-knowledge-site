import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { ArticleTopicBrowser } from "@/components/article/ArticleTopicBrowser"
import { CoordinateMark, RedNote, SectionLabel } from "@/components/ip/ArchiveUI"
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
  微信小店: "从平台规则、商品运营、数据工具到交易与售后，建立完整经营判断。",
  视频号: "围绕账号定位、直播运营、内容分发与复盘，沉淀长期直播能力。",
  广告投放: "覆盖微信豆、小店广告、ADQ、素材测试和投放复盘，让预算服务业务目标。",
  微信推客: "拆解推客机制、优选联盟、机构平台与私域分销，理解协作链路。",
  违规规则及解析: "收拢直播、小店、短视频和申诉治理规则，形成运营前的风险清单。",
  微信公私域联运: "连接视频号、小店、公众号、小程序、企微和社群，解决流量承接与复购。",
  "AI 工具": "记录 AI 工具进入内容、开发、资料整理和自动化流程的真实方法。",
  GEO: "探索专题内容和结构化资产如何被搜索引擎与 AI 搜索准确理解。"
}

export default function ArticlesPage() {
  const articles = getAllArticles()
  const latestArticles = articles.slice(0, 6)
  const leadArticle = latestArticles[0]
  const articleCategories = Array.from(new Set(articles.map((article) => article.category)))
  const categories = [
    ...categoryOrder.filter((category) => articleCategories.includes(category)),
    ...articleCategories.filter((category) => !categoryOrder.includes(category)).sort()
  ]
  const groupedArticles = categories.map((category) => ({
    category,
    description: categoryDescriptions[category] || "围绕这个专题持续整理可检索、可复用的实战文章。",
    articles: articles
      .filter((article) => article.category === category)
      .map((article) => ({ slug: article.slug, title: article.title }))
  }))

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "首页", url: "/" },
          { name: "文章", url: "/articles" }
        ])}
      />

      <section className="paper-texture border-b border-line py-14 lg:py-20">
        <Container>
          <div className="flex items-start justify-between gap-8">
            <SectionLabel title="文章" english="FIELD NOTES" />
            <Link href="#topic-browser" className="hidden items-center gap-4 text-sm font-semibold text-cobalt sm:inline-flex">
              全部文章
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
            <div>
              <h1 className="max-w-4xl text-[35px] font-semibold leading-[1.16] sm:text-[58px] sm:leading-[1.14]">
                把规则、案例和方法，
                <br />
                写成可以反复查的文章
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-ink/58">
                先看最近更新，也可以按微信小店、视频号、广告投放、微信推客和违规规则进入专题。
              </p>

              {leadArticle ? (
                <Link
                  href={`/articles/${leadArticle.slug}`}
                  className="group relative mt-9 block min-h-[330px] overflow-hidden border border-line bg-paper px-7 py-9 shadow-soft sm:px-10"
                >
                  <div className="relative z-10 max-w-full sm:max-w-[60%]">
                    <p className="text-sm font-semibold text-wechat">最近更新 · {leadArticle.category}</p>
                    <h2 className="mt-7 text-[30px] font-semibold leading-tight sm:text-[44px]">{leadArticle.title}</h2>
                    <p className="mt-5 line-clamp-2 text-sm leading-7 text-ink/58">{leadArticle.description}</p>
                    <span className="mt-8 inline-flex items-center gap-4 border-b border-wechat pb-2 text-sm font-semibold text-wechat">
                      阅读文章
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                  <div className="absolute -bottom-16 -right-8 hidden h-[310px] w-[42%] rotate-[-10deg] border border-line bg-[#f3f3ef] shadow-soft sm:block">
                    <div className="absolute inset-6 border-l border-t border-cobalt/65" />
                    <div className="absolute left-10 top-12">
                      <CoordinateMark />
                    </div>
                    <div className="absolute bottom-9 right-8">
                      <span className="font-mono text-[10px] text-cobalt">FIELD DOSSIER<br />06 / 12</span>
                    </div>
                  </div>
                </Link>
              ) : null}
            </div>

            <div className="border-t border-line">
              {latestArticles.slice(1).map((article, index) => (
                <Link
                  key={article.slug}
                  href={`/articles/${article.slug}`}
                  className="group grid min-h-24 grid-cols-[55px_1fr_auto] items-center gap-4 border-b border-line py-3"
                >
                  <span className="border-r border-line py-5 font-mono text-sm text-ink/62">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-lg font-semibold leading-7">{article.title}</span>
                  <span className="hidden text-xs text-ink/48 sm:block">{article.category}</span>
                  <ArrowRight className="h-4 w-4 text-cobalt transition-transform group-hover:translate-x-1 sm:hidden" />
                </Link>
              ))}
              <div className="mt-10 flex justify-end">
                <RedNote>重复三遍的事，值得被 AI 化。</RedNote>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <div id="topic-browser" className="scroll-mt-20">
        <ArticleTopicBrowser groups={groupedArticles} />
      </div>
    </>
  )
}
