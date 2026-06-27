import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ArticleCard } from "@/components/article/ArticleCard"
import { TableOfContents } from "@/components/article/TableOfContents"
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
      <article className="bg-white py-14">
        <Container>
          <div className="mx-auto max-w-4xl">
            <p className="text-sm font-semibold text-wechat">{article.category}</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-ink">{article.title}</h1>
            <p className="mt-5 text-lg leading-9 text-slate-600">{article.description}</p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-500">
              <span>作者：{article.author}</span>
              <span>发布：{formatDate(article.date)}</span>
              <span>更新：{formatDate(article.updated || article.date)}</span>
              <span>{article.readingTime}</span>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-700">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </article>

      <section className="border-y border-line bg-surface py-14">
        <Container className="grid gap-8 xl:grid-cols-[1fr_260px]">
          <div className="mx-auto w-full max-w-3xl rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-9">
            <div className="content-body" dangerouslySetInnerHTML={{ __html: html }} />
            {article.faq?.length ? (
              <div className="mt-12 rounded-2xl bg-surface p-6">
                <h2 className="text-xl font-bold text-ink">FAQ</h2>
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
