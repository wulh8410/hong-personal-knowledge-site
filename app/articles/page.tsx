import type { Metadata } from "next"

import { ArticleListClient } from "@/components/article/ArticleListClient"
import { Container } from "@/components/layout/Container"
import { JsonLd } from "@/components/seo/JsonLd"
import { getAllArticles } from "@/lib/content"
import { breadcrumbJsonLd } from "@/lib/seo"
import { absoluteUrl } from "@/lib/utils"

export const metadata: Metadata = {
  title: "文章",
  description: "阅读关于微信小店、微信推客、微信豆投放、AI 工具和 SEO/GEO 的系统性文章。",
  alternates: {
    canonical: absoluteUrl("/articles")
  },
  openGraph: {
    title: "文章",
    description: "微信生态电商与 AI 工具实战文章列表。",
    url: absoluteUrl("/articles")
  }
}

export default function ArticlesPage() {
  const articles = getAllArticles()

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "首页", url: "/" },
          { name: "文章", url: "/articles" }
        ])}
      />
      <section className="bg-white py-14">
        <Container>
          <p className="text-sm font-semibold text-wechat">Articles</p>
          <h1 className="mt-4 text-4xl font-bold text-ink">文章</h1>
          <p className="mt-5 max-w-3xl text-lg leading-9 text-slate-600">
            优先整理能解释规则、路径和实操判断的系统性文章。第一版支持本地搜索和分类筛选。
          </p>
        </Container>
      </section>
      <section className="border-y border-line bg-surface py-14">
        <Container>
          <ArticleListClient articles={articles} />
        </Container>
      </section>
    </>
  )
}
