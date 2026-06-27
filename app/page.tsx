import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"

import { ArticleCard } from "@/components/article/ArticleCard"
import { Container } from "@/components/layout/Container"
import { JsonLd } from "@/components/seo/JsonLd"
import { abilityItems } from "@/lib/constants"
import { getAllCases, getFeaturedArticles, getKnowledgeBases } from "@/lib/content"
import { personJsonLd, websiteJsonLd } from "@/lib/seo"

export default function HomePage() {
  const knowledgeBases = getKnowledgeBases()
  const featuredArticles = getFeaturedArticles(6)
  const cases = getAllCases()

  return (
    <>
      <JsonLd data={personJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <section className="bg-white">
        <Container className="grid gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold text-wechat">个人品牌 · 微信生态 · AI/GEO</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-ink sm:text-5xl">
              微信生态电商与 AI 实战知识库
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-9 text-slate-600">
              长期深耕微信小店、微信推客、小程序商城、微信豆投放与 AI 工具应用，持续整理微信生态规则、产品能力、实战经验和内容增长方法。
            </p>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
              把复杂的微信生态规则、工具玩法和增长经验，整理成普通商家也能看懂、能执行、能复用的知识资产。
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {["微信小店", "微信推客", "微信豆投放", "小程序商城", "AI 工具", "SEO/GEO", "内容资产"].map(
                (tag) => (
                  <span key={tag} className="rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-700">
                    {tag}
                  </span>
                )
              )}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/knowledge"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                进入知识库
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/articles"
                className="inline-flex items-center justify-center rounded-full border border-line bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:border-wechat hover:text-wechat"
              >
                查看最新文章
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-line bg-surface p-5 shadow-soft">
            <div className="rounded-2xl bg-ink p-6 text-white">
              <p className="text-sm text-emerald-200">能力矩阵</p>
              <h2 className="mt-2 text-2xl font-semibold">从规则理解到可执行方案</h2>
              <div className="mt-6 grid gap-3">
                {[
                  "微信小店规则与运营",
                  "微信推客平台与玩法",
                  "微信豆 / 小店广告投放",
                  "小程序商城与私域闭环",
                  "AI 工具与 Agent 应用",
                  "SEO / GEO 内容资产"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl bg-white/8 p-3">
                    <CheckCircle2 className="h-4 w-4 text-bright" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-surface py-16">
        <Container>
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-ink">我长期研究和实践的方向</h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              这些不是临时追热点，而是围绕微信生态电商长期积累出来的实战能力。
            </p>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {abilityItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl border border-line bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
                >
                  <Icon className="h-7 w-7 text-wechat" />
                  <h3 className="mt-5 text-xl font-semibold text-ink">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.keywords.map((keyword) => (
                      <span key={keyword} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </Link>
              )
            })}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <SectionTitle
            title="系统化知识库"
            subtitle="围绕微信生态电商、AI 工具和 GEO 内容资产，持续更新可检索、可复用、可沉淀的专题内容。"
          />
          <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {knowledgeBases.map((base) => (
              <Link
                key={base.slug}
                href={`/knowledge/${base.slug}`}
                className="rounded-2xl border border-line bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
              >
                <p className="text-sm font-medium text-wechat">{base.articleCount || 0} 篇文章</p>
                <h3 className="mt-3 text-xl font-semibold text-ink">{base.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{base.shortDescription}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {base.topics.slice(0, 4).map((topic) => (
                    <span key={topic} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
                      {topic}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-surface py-16">
        <Container>
          <SectionTitle
            title="精选文章"
            subtitle="优先阅读这些系统性文章，可以快速理解微信生态电商和 AI 工具的关键逻辑。"
          />
          <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featuredArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <SectionTitle
            title="项目与实践经验"
            subtitle="不只整理资料，也长期参与微信生态相关系统、运营、投放和内容项目。"
          />
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {cases.map((item) => (
              <article key={item.slug} className="rounded-2xl border border-line bg-white p-6 shadow-sm">
                <p className="text-sm font-medium text-wechat">{item.type}</p>
                <h3 className="mt-3 text-xl font-semibold text-ink">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{item.problem}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ink py-16 text-white">
        <Container className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-sm font-semibold text-emerald-200">关于宏</p>
            <h2 className="mt-3 text-3xl font-bold">程序员出身，长期做微信生态和 AI 工具实战</h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">
              相比单纯做内容，我更关注一个方法能不能落地、能不能复用、能不能真正解决商家和团队的问题。这个网站会持续沉淀我在微信生态、AI 工具和 GEO 内容建设上的实战观察。
            </p>
          </div>
          <Link
            href="/about"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink"
          >
            查看完整介绍
          </Link>
        </Container>
      </section>
    </>
  )
}

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="max-w-2xl">
      <h2 className="text-3xl font-bold text-ink">{title}</h2>
      <p className="mt-4 text-base leading-8 text-slate-600">{subtitle}</p>
    </div>
  )
}
