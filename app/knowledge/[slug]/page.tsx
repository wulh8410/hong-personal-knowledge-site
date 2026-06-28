import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ArticleCard } from "@/components/article/ArticleCard"
import { ImaKnowledgeSearch } from "@/components/ima/ImaKnowledgeSearch"
import { ImaSourceOverview } from "@/components/ima/ImaSourceOverview"
import { LearningPath } from "@/components/knowledge/LearningPath"
import { Container } from "@/components/layout/Container"
import { JsonLd } from "@/components/seo/JsonLd"
import { getArticlesByKnowledgeBase, getKnowledgeBaseBySlug, getKnowledgeBases } from "@/lib/content"
import { getImaSourcesForKnowledge } from "@/lib/ima-sources"
import { breadcrumbJsonLd, faqJsonLd, knowledgeJsonLd } from "@/lib/seo"
import { absoluteUrl } from "@/lib/utils"

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getKnowledgeBases().map((base) => ({ slug: base.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const base = getKnowledgeBaseBySlug(slug)
  if (!base) return {}

  return {
    title: base.title,
    description: base.description,
    keywords: base.keywords,
    alternates: {
      canonical: absoluteUrl(`/knowledge/${base.slug}`)
    },
    openGraph: {
      title: base.title,
      description: base.description,
      url: absoluteUrl(`/knowledge/${base.slug}`)
    }
  }
}

export default async function KnowledgeDetailPage({ params }: PageProps) {
  const { slug } = await params
  const base = getKnowledgeBaseBySlug(slug)
  if (!base) notFound()

  const articles = getArticlesByKnowledgeBase(slug)
  const officialSources = getImaSourcesForKnowledge(slug)
  const suggestedQuestions = officialSources.flatMap((source) => source.suggestedQuestions).slice(0, 6)

  return (
    <>
      <JsonLd data={knowledgeJsonLd(base)} />
      <JsonLd data={faqJsonLd(base.faq)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "首页", url: "/" },
          { name: "知识库", url: "/knowledge" },
          { name: base.title, url: `/knowledge/${base.slug}` }
        ])}
      />
      <section className="bg-white py-14">
        <Container>
          <p className="text-sm font-semibold text-wechat">专题知识库</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-ink">{base.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-9 text-slate-600">{base.description}</p>
          <div className="mt-7 flex flex-wrap gap-2">
            {base.keywords.map((keyword) => (
              <span key={keyword} className="rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-700">
                {keyword}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-6 text-sm text-slate-500">
            <span>更新时间：{base.updated}</span>
            <span>文章数量：{base.articleCount || 0}</span>
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-surface py-14">
        <Container className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <LearningPath base={base} />
          <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-ink">常见问题</h2>
            <div className="mt-5 grid gap-4">
              {base.faq.map((item) => (
                <div key={item.question} className="rounded-xl bg-slate-100 p-4">
                  <h3 className="font-medium text-ink">{item.question}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {officialSources.length ? (
        <section className="bg-white py-14">
          <Container className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold text-wechat">官方资料核对</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight text-ink">先查 ima 原始资料，再看站内解释</h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                这个专题关联的官方资料库用于核对公告、规则和案例。站内内容负责解释路径，ima 负责承载原始资料来源。
              </p>
              <div className="mt-6">
                <ImaSourceOverview knowledgeSlug={slug} compact />
              </div>
            </div>
            <ImaKnowledgeSearch
              sources={officialSources}
              initialSource={officialSources[0].slug}
              suggestedQuestions={suggestedQuestions}
            />
          </Container>
        </section>
      ) : null}

      <section className="bg-white py-14">
        <Container>
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-ink">核心文章</h2>
            <p className="mt-4 text-base leading-8 text-slate-600">按专题相关性展示，优先帮助新手建立完整理解。</p>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
          {!articles.length ? (
            <div className="mt-8 rounded-2xl border border-dashed border-line bg-surface p-10 text-center text-sm text-slate-500">
              该专题文章正在整理中。
            </div>
          ) : null}
        </Container>
      </section>
    </>
  )
}
