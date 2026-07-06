import type { Metadata } from "next"
import { notFound } from "next/navigation"

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
