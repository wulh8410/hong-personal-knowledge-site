import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  ChevronRight,
  DatabaseZap,
  Gauge,
  Layers3,
  MessageCircle,
  Radar,
  ShieldCheck,
  Sparkles,
  Store,
  Workflow
} from "lucide-react"

import { ArticleCard } from "@/components/article/ArticleCard"
import { Container } from "@/components/layout/Container"
import { JsonLd } from "@/components/seo/JsonLd"
import { abilityItems } from "@/lib/constants"
import { getAllCases, getFeaturedArticles, getKnowledgeBases } from "@/lib/content"
import { personJsonLd, websiteJsonLd } from "@/lib/seo"

const proofItems = [
  { label: "长期方向", value: "微信生态 / AI / GEO" },
  { label: "内容结构", value: "专题知识库 + 实战文章" },
  { label: "更新方式", value: "Markdown 静态内容资产" }
]

const methodItems = [
  {
    title: "先看规则",
    description: "平台边界、交易链路、投放入口和授权机制先讲清楚。",
    icon: ShieldCheck
  },
  {
    title: "再拆路径",
    description: "把商家、推客、内容、私域和系统交付拆成可执行步骤。",
    icon: Workflow
  },
  {
    title: "沉淀资产",
    description: "用文章、专题页和结构化数据，让经验能被搜索和 AI 理解。",
    icon: DatabaseZap
  }
]

export default function HomePage() {
  const knowledgeBases = getKnowledgeBases()
  const featuredArticles = getFeaturedArticles(6)
  const cases = getAllCases()

  return (
    <>
      <JsonLd data={personJsonLd()} />
      <JsonLd data={websiteJsonLd()} />

      <section className="relative overflow-hidden bg-[#07111f] text-white">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent" />
        <Container className="relative grid min-h-[calc(100vh-4rem)] gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:py-0">
          <div className="pb-0 pt-4 lg:pb-16 lg:pt-20">
            <div className="inline-flex items-center gap-2 border border-emerald-300/25 bg-emerald-300/10 px-3 py-1.5 text-xs font-semibold text-emerald-100">
              <Sparkles className="h-3.5 w-3.5" />
              宏的微信生态实战笔记
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              微信生态电商与 AI 实战知识库
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-9 text-slate-300">
              我是宏，程序员出身，长期研究微信小店、微信推客、小程序商城、微信豆投放与 AI 工具工作流。这里沉淀可检索、可复用、能执行的内容资产。
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/knowledge"
                className="inline-flex h-12 items-center justify-center gap-2 bg-emerald-400 px-5 text-sm font-semibold text-[#06121f] transition hover:bg-emerald-300"
              >
                进入知识库
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/articles"
                className="inline-flex h-12 items-center justify-center border border-white/18 px-5 text-sm font-semibold text-white transition hover:border-emerald-300/60 hover:text-emerald-100"
              >
                查看最新文章
              </Link>
            </div>
            <div className="mt-10 hidden gap-3 sm:grid sm:grid-cols-3">
              {proofItems.map((item) => (
                <div key={item.label} className="border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-xs text-slate-400">{item.label}</p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[420px] overflow-hidden sm:min-h-[520px] lg:h-[720px]">
            <div className="absolute bottom-0 left-0 right-0 top-10 border border-white/10 bg-white sm:left-14" />
            <div className="absolute bottom-10 left-4 z-10 w-[min(78vw,360px)] border border-white/12 bg-[#081827]/90 p-4 shadow-2xl backdrop-blur sm:left-8">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center bg-emerald-400 text-[#06121f]">
                  <Radar className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">核心方法</p>
                  <p className="text-sm font-semibold">规则理解 + 工具化执行 + 内容资产化</p>
                </div>
              </div>
            </div>
            <Image
              src="/images/avatar/hong-business-white.png"
              alt="宏的个人商务照"
              width={1050}
              height={1400}
              priority
              className="absolute bottom-0 right-0 h-[94%] w-auto max-w-none object-contain sm:right-6 lg:right-0"
            />
          </div>
        </Container>
      </section>

      <section className="bg-white py-14">
        <Container className="grid gap-5 lg:grid-cols-3">
          {methodItems.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="border border-line bg-white p-5">
                <Icon className="h-6 w-6 text-wechat" />
                <h2 className="mt-5 text-lg font-semibold text-ink">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
              </div>
            )
          })}
        </Container>
      </section>

      <section className="border-y border-line bg-[#f6f8fb] py-16">
        <Container>
          <SectionHeader
            eyebrow="Focus Matrix"
            title="我长期研究和实践的方向"
            subtitle="不是泛泛而谈的个人博客，而是围绕微信生态电商、AI 工具和 GEO 内容资产持续沉淀。"
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {abilityItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group border border-line bg-white p-5 transition hover:border-emerald-300 hover:shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="grid h-10 w-10 place-items-center bg-[#edfdf4] text-wechat">
                      <Icon className="h-5 w-5" />
                    </div>
                    <ChevronRight className="h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-wechat" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-ink">{item.title}</h3>
                  <p className="mt-3 min-h-14 text-sm leading-7 text-slate-600">{item.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.keywords.map((keyword) => (
                      <span key={keyword} className="bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
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

      <section className="bg-[#07111f] py-16 text-white">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <SectionHeader
              eyebrow="Knowledge Base"
              title="系统化知识库"
              subtitle="按专题组织内容，让新访问者能快速知道从哪里开始，也让搜索引擎和 AI 工具更容易理解领域关系。"
              dark
            />
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { label: "专题", value: "6" },
                { label: "首批文章", value: String(featuredArticles.length) },
                { label: "内容形态", value: "文章 / FAQ / 案例" }
              ].map((item) => (
                <div key={item.label} className="border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-xs text-slate-400">{item.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {knowledgeBases.map((base) => (
              <Link
                key={base.slug}
                href={`/knowledge/${base.slug}`}
                className="group border border-white/10 bg-white/[0.04] p-5 transition hover:border-emerald-300/60 hover:bg-white/[0.07]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
                      {base.articleCount || 0} articles
                    </p>
                    <h3 className="mt-3 text-lg font-semibold text-white">{base.title}</h3>
                  </div>
                  <ArrowRight className="h-5 w-5 text-slate-500 transition group-hover:translate-x-1 group-hover:text-emerald-200" />
                </div>
                <p className="mt-4 min-h-14 text-sm leading-7 text-slate-300">{base.shortDescription}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {base.topics.slice(0, 4).map((topic) => (
                    <span key={topic} className="border border-white/10 px-2.5 py-1 text-xs text-slate-300">
                      {topic}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <SectionHeader
              eyebrow="Featured"
              title="精选文章"
              subtitle="优先阅读这些文章，可以快速建立对微信生态电商、AI 工具和 GEO 内容资产的整体理解。"
            />
            <Link href="/articles" className="inline-flex items-center gap-2 text-sm font-semibold text-wechat">
              全部文章
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featuredArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-[#f6f8fb] py-16">
        <Container>
          <SectionHeader
            eyebrow="Practice"
            title="项目与实践经验"
            subtitle="不展示未经确认的夸张数据，只展示我长期参与过的系统、运营、投放和内容工作流类型。"
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {cases.map((item) => (
              <article key={item.slug} className="border border-line bg-white p-5">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center bg-ink text-white">
                    <Layers3 className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold text-wechat">{item.type}</p>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.problem}</p>
                <div className="mt-5 grid gap-2">
                  {item.deliverables.slice(0, 3).map((deliverable) => (
                    <div key={deliverable} className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="h-4 w-4 text-wechat" />
                      {deliverable}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-center">
          <div>
            <SectionHeader
              eyebrow="Contact"
              title="关于宏"
              subtitle="程序员出身，长期从事互联网与微信生态电商相关项目。相比单纯做内容，我更关注规则、工具和方法能不能落地，能不能被复用。"
            />
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {[
                { label: "微信生态", icon: Store },
                { label: "AI 工具", icon: Bot },
                { label: "GEO 资产", icon: Gauge }
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="flex items-center gap-3 border border-line bg-white p-4">
                    <Icon className="h-5 w-5 text-wechat" />
                    <span className="text-sm font-semibold text-ink">{item.label}</span>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="border border-line bg-[#07111f] p-5 text-white">
            <div className="flex items-center gap-3">
              <MessageCircle className="h-5 w-5 text-emerald-300" />
              <div>
                <p className="text-sm font-semibold">加微信交流</p>
                <p className="mt-1 text-xs text-slate-400">微信生态 / AI 工作流 / GEO 内容资产</p>
              </div>
            </div>
            <div className="mt-5 bg-white p-3">
              <Image
                src="/images/avatar/hong-wechat-qr.png"
                alt="宏的个人微信二维码"
                width={600}
                height={600}
                className="h-auto w-full"
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  dark = false
}: {
  eyebrow: string
  title: string
  subtitle: string
  dark?: boolean
}) {
  return (
    <div className="max-w-3xl">
      <p className={dark ? "text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200" : "text-xs font-semibold uppercase tracking-[0.18em] text-wechat"}>
        {eyebrow}
      </p>
      <h2 className={dark ? "mt-3 text-3xl font-semibold leading-tight text-white" : "mt-3 text-3xl font-semibold leading-tight text-ink"}>
        {title}
      </h2>
      <p className={dark ? "mt-4 text-base leading-8 text-slate-300" : "mt-4 text-base leading-8 text-slate-600"}>
        {subtitle}
      </p>
    </div>
  )
}
