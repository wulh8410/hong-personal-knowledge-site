import type { Metadata } from "next"

import { KnowledgeCard } from "@/components/knowledge/KnowledgeCard"
import { Container } from "@/components/layout/Container"
import { JsonLd } from "@/components/seo/JsonLd"
import { getAllArticles, getKnowledgeBases } from "@/lib/content"
import { breadcrumbJsonLd } from "@/lib/seo"
import { absoluteUrl, formatDate } from "@/lib/utils"

export const metadata: Metadata = {
  title: "系统化知识库",
  description: "围绕微信生态电商、AI 工具和 GEO 内容资产，持续更新可检索、可复用、可沉淀的专题内容。",
  alternates: {
    canonical: absoluteUrl("/knowledge")
  },
  openGraph: {
    title: "系统化知识库",
    description: "微信小店、微信推客、微信豆投放、小程序与私域、AI 工具、SEO/GEO 专题入口。",
    url: absoluteUrl("/knowledge")
  }
}

export default function KnowledgePage() {
  const bases = getKnowledgeBases()
  const latestArticles = getAllArticles().slice(0, 5)

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "首页", url: "/" },
          { name: "知识库", url: "/knowledge" }
        ])}
      />
      <section className="bg-white py-14">
        <Container>
          <p className="text-sm font-semibold text-wechat">Knowledge Base</p>
          <h1 className="mt-4 text-4xl font-bold text-ink">系统化知识库</h1>
          <p className="mt-5 max-w-3xl text-lg leading-9 text-slate-600">
            围绕微信生态电商、AI 工具和 GEO 内容资产，持续更新可检索、可复用、可沉淀的专题内容。
          </p>
        </Container>
      </section>
      <section className="border-y border-line bg-surface py-14">
        <Container className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {bases.map((base) => (
            <KnowledgeCard key={base.slug} base={base} />
          ))}
        </Container>
      </section>
      <section className="bg-white py-14">
        <Container className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-2xl border border-line p-6">
            <h2 className="text-2xl font-bold text-ink">最新更新</h2>
            <div className="mt-5 grid gap-4">
              {latestArticles.map((article) => (
                <a key={article.slug} href={`/articles/${article.slug}`} className="block rounded-xl bg-slate-100 p-4">
                  <span className="text-xs text-slate-500">{formatDate(article.updated || article.date)}</span>
                  <span className="mt-1 block font-medium text-ink">{article.title}</span>
                </a>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-line p-6">
            <h2 className="text-2xl font-bold text-ink">推荐阅读路径</h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              新访问者建议先从微信推客、微信小店和 GEO 内容资产三个专题开始。先理解平台交易和分发规则，再看 AI 工具如何把内容与工作流沉淀成长期资产。
            </p>
          </div>
        </Container>
      </section>
    </>
  )
}
