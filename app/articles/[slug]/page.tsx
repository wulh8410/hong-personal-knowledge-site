import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, FileText } from "lucide-react"

import { ArticleCard } from "@/components/article/ArticleCard"
import { TableOfContents } from "@/components/article/TableOfContents"
import { FieldIndex, SectionLabel } from "@/components/ip/ArchiveUI"
import { Container } from "@/components/layout/Container"
import { JsonLd } from "@/components/seo/JsonLd"
import { getAllArticles, getArticleBySlug, getRelatedArticles } from "@/lib/content"
import { extractToc, renderMarkdown } from "@/lib/markdown"
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo"
import { absoluteUrl, formatDate } from "@/lib/utils"

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return {}

  return {
    title: article.title,
    description: article.description,
    keywords: article.tags,
    alternates: {
      canonical: absoluteUrl(`/articles/${article.slug}`)
    },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      url: absoluteUrl(`/articles/${article.slug}`),
      publishedTime: article.date,
      modifiedTime: article.updated || article.date,
      authors: [article.author],
      tags: article.tags
    }
  }
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const html = await renderMarkdown(article.content)
  const toc = extractToc(article.content)
  const related = getRelatedArticles(article)

  return (
    <>
      <JsonLd data={articleJsonLd(article)} />
      <JsonLd data={faqJsonLd(article.faq)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "首页", url: "/" },
          { name: "文章", url: "/articles" },
          { name: article.title, url: `/articles/${article.slug}` }
        ])}
      />
      <article className="paper-texture border-b border-line py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="flex items-start justify-between gap-8">
            <SectionLabel title={article.category} english="FIELD NOTE" />
            <FieldIndex current="06" />
          </div>
          <div className="mt-9 max-w-4xl sm:mt-12">
            <h1 className="text-[38px] font-semibold leading-[1.16] text-ink sm:text-[58px]">{article.title}</h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-ink/62 sm:text-lg sm:leading-9">{article.description}</p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-5 font-mono text-[11px] text-ink/48">
              <span>作者 / {article.author}</span>
              <span>发布 / {formatDate(article.date)}</span>
              <span>更新 / {formatDate(article.updated || article.date)}</span>
              <span>{article.readingTime}</span>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span key={tag} className="border border-line bg-white/55 px-3 py-1.5 text-xs text-ink/62">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </article>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="mx-auto grid max-w-[1080px] gap-10 xl:grid-cols-[minmax(0,760px)_260px] xl:items-start">
            <div className="min-w-0 border-t-2 border-ink pt-8 sm:pt-10">
              <div className="content-body" dangerouslySetInnerHTML={{ __html: html }} />
              <div className="mt-14 border-t-2 border-ink bg-paper px-5 py-6 sm:px-7 sm:py-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-wechat" />
                      <h2 className="text-xl font-semibold text-ink">原文与来源</h2>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-ink/58">
                      {article.originalUrl
                        ? "这篇文章由原始飞书文档整理排版，点击可回到原文查看。"
                        : article.sourcePath
                          ? `当前导入记录来自：${article.sourcePath}`
                          : "当前文章暂无可公开跳转的原文链接。"}
                    </p>
                  </div>
                  {article.originalUrl ? (
                    <a
                      href={article.originalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-12 shrink-0 items-center justify-center gap-4 bg-ink px-5 text-sm font-semibold text-white transition hover:bg-wechat"
                    >
                      查看飞书原文
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  ) : (
                    <Link
                      href="/articles"
                      className="inline-flex h-12 shrink-0 items-center justify-center gap-4 border border-line px-5 text-sm font-semibold text-ink transition hover:border-wechat hover:text-wechat"
                    >
                      返回文章列表
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </div>
              {article.faq?.length ? (
                <div className="mt-14 border-t-2 border-wechat bg-paper p-6 sm:p-8">
                  <h2 className="text-xl font-semibold text-ink">常见问题</h2>
                  <div className="mt-5 grid gap-4">
                    {article.faq.map((item) => (
                      <div key={item.question}>
                        <h3 className="font-medium text-ink">{item.question}</h3>
                        <p className="mt-2 text-sm leading-7 text-slate-600">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
            <TableOfContents items={toc} />
          </div>
        </Container>
      </section>

      <section className="bg-white py-14">
        <Container>
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-ink">相关文章</h2>
            <p className="mt-4 text-base leading-8 text-slate-600">继续阅读同一专题或相近标签的内容。</p>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {related.map((item) => (
              <ArticleCard key={item.slug} article={item} />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
