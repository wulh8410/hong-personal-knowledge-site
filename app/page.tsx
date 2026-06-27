import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  FileText,
  Layers3,
  MessageCircle,
  Network,
  PanelsTopLeft,
  SearchCheck,
  ShieldCheck,
  Store,
  UsersRound,
  Workflow
} from "lucide-react"

import { ArticleCard } from "@/components/article/ArticleCard"
import { Container } from "@/components/layout/Container"
import { JsonLd } from "@/components/seo/JsonLd"
import { getAllCases, getFeaturedArticles, getKnowledgeBases } from "@/lib/content"
import { personJsonLd, websiteJsonLd } from "@/lib/seo"

const services = [
  {
    title: "微信小店与视频号电商",
    description: "看懂平台规则、交易链路、商品运营和售后边界，避免一上来就做错方向。",
    points: ["入局判断", "商品与交易", "规则避坑"],
    icon: Store
  },
  {
    title: "微信推客与分销体系",
    description: "拆清个人推客、商家佣金、直播/短视频授权和机构平台的协作方式。",
    points: ["佣金机制", "授权场景", "机构平台"],
    icon: UsersRound
  },
  {
    title: "小程序商城与私域闭环",
    description: "用小程序、会员、企微和内容触达承接微信生态流量，而不是只做一个页面。",
    points: ["商城规划", "会员复购", "企微承接"],
    icon: PanelsTopLeft
  },
  {
    title: "AI 工具与内容资产",
    description: "把选题、文章、知识库和自动化流程做成可复用资产，让搜索和 AI 更容易理解你。",
    points: ["内容工作流", "知识库沉淀", "AI 搜索可见"],
    icon: Bot
  }
]

const startPath = [
  {
    title: "先判断微信生态机会",
    description: "适不适合做微信小店、推客、视频号电商，先看规则和链路。",
    href: "/knowledge/wechat-store",
    icon: ShieldCheck
  },
  {
    title: "再设计可执行路径",
    description: "商家、推客、内容、投放、私域、系统分别怎么配合。",
    href: "/knowledge/wechat-tuike",
    icon: Workflow
  },
  {
    title: "最后沉淀长期资产",
    description: "用专题页、文章和结构化内容，让经验持续被用户和 AI 发现。",
    href: "/knowledge/seo-geo",
    icon: SearchCheck
  }
]

const audience = ["微信小店商家", "视频号电商团队", "微信推客机构", "小程序商城团队", "想用 AI 提效的内容团队"]

export default function HomePage() {
  const knowledgeBases = getKnowledgeBases()
  const featuredArticles = getFeaturedArticles(6)
  const cases = getAllCases()

  return (
    <>
      <JsonLd data={personJsonLd()} />
      <JsonLd data={websiteJsonLd()} />

      <section className="bg-[#f5f8f6]">
        <Container className="grid gap-10 py-10 lg:grid-cols-[1fr_420px] lg:items-center lg:py-20">
          <div>
            <p className="inline-flex items-center gap-2 border border-emerald-200 bg-white px-3 py-1.5 text-sm font-semibold text-wechat">
              <Network className="h-4 w-4" />
              宏｜微信生态电商与 AI 工具实战
            </p>
            <h1 className="mt-5 max-w-4xl text-[34px] font-semibold leading-[1.12] text-ink sm:text-5xl lg:mt-6 lg:text-[58px] lg:leading-tight">
              帮商家和团队看懂微信生态，把方法落到系统、内容和增长动作里
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg sm:leading-9 lg:mt-6">
              我是宏，程序员出身，长期做微信小店、微信推客、小程序商城、微信豆投放和 AI 内容工作流。这个网站沉淀的是可执行、可复用、可持续更新的实战笔记。
            </p>
            <div className="mt-5 flex items-center gap-3 border border-line bg-white p-3 shadow-sm lg:hidden">
              <div className="relative h-16 w-12 shrink-0 overflow-hidden bg-[#eef3ef]">
                <Image
                  src="/images/avatar/hong-business-white.png"
                  alt="宏的个人商务照"
                  width={1050}
                  height={1400}
                  priority
                  className="absolute bottom-0 left-1/2 h-[95%] w-auto max-w-none -translate-x-1/2 object-contain"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">宏</p>
                <p className="mt-1 text-xs leading-5 text-slate-600">微信生态电商与 AI 工具实战</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-1.5 sm:gap-2 lg:mt-7">
              {audience.map((item) => (
                <span key={item} className="border border-line bg-white px-3 py-1.5 text-xs text-slate-700 sm:text-sm">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-7 flex flex-row gap-3 lg:mt-8">
              <Link
                href="/knowledge"
                className="inline-flex h-11 flex-1 items-center justify-center gap-2 bg-ink px-4 text-sm font-semibold text-white transition hover:bg-slate-800 sm:h-12 sm:flex-none sm:px-6"
              >
                从知识库开始
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/articles"
                className="inline-flex h-11 flex-1 items-center justify-center border border-slate-300 bg-white px-4 text-sm font-semibold text-ink transition hover:border-wechat hover:text-wechat sm:h-12 sm:flex-none sm:px-6"
              >
                看最新文章
              </Link>
            </div>
          </div>

          <aside className="hidden border border-line bg-white p-4 shadow-[0_24px_70px_rgba(15,23,42,0.10)] lg:block">
            <div className="relative h-[460px] overflow-hidden bg-[#eef3ef]">
              <Image
                src="/images/avatar/hong-business-white.png"
                alt="宏的个人商务照"
                width={1050}
                height={1400}
                priority
                className="absolute bottom-0 left-1/2 h-[96%] w-auto max-w-none -translate-x-1/2 object-contain"
              />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              {[
                ["定位", "微信生态"],
                ["方法", "规则到落地"],
                ["资产", "内容知识库"]
              ].map(([label, value]) => (
                <div key={label} className="bg-slate-50 px-2 py-3">
                  <p className="text-xs text-slate-500">{label}</p>
                  <p className="mt-1 text-sm font-semibold text-ink">{value}</p>
                </div>
              ))}
            </div>
          </aside>
        </Container>
      </section>

      <section className="bg-white py-12 lg:py-16">
        <Container>
          <SectionHeader
            label="我能提供什么"
            title="不是卖概念，而是把微信生态里的关键问题讲清楚、做成可执行方案"
            subtitle="围绕商家最常遇到的四类问题：平台规则、分销协作、商城承接、内容和 AI 工作流。"
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {services.map((item) => {
              const Icon = item.icon
              return (
                <article key={item.title} className="border border-line bg-white p-5 shadow-sm">
                  <div className="grid h-11 w-11 place-items-center bg-emerald-50 text-wechat">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-5 text-lg font-semibold leading-7 text-ink">{item.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                  <div className="mt-5 grid gap-2">
                    {item.points.map((point) => (
                      <div key={point} className="flex items-center gap-2 text-sm text-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-wechat" />
                        {point}
                      </div>
                    ))}
                  </div>
                </article>
              )
            })}
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-[#f7f9fb] py-16">
        <Container className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <SectionHeader
            label="建议阅读路径"
            title="第一次来，可以按这 3 步看"
            subtitle="先判断机会，再拆执行路径，最后把经验沉淀成能被搜索和 AI 识别的内容资产。"
          />
          <div className="grid gap-4">
            {startPath.map((item, index) => {
              const Icon = item.icon
              return (
                <Link key={item.title} href={item.href} className="group grid gap-4 border border-line bg-white p-5 sm:grid-cols-[56px_1fr_auto] sm:items-center">
                  <div className="grid h-14 w-14 place-items-center bg-ink text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-wechat">第 {index + 1} 步</p>
                    <h3 className="mt-1 text-lg font-semibold text-ink">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
                  </div>
                  <ArrowRight className="hidden h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-wechat sm:block" />
                </Link>
              )
            })}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <SectionHeader
              label="专题知识库"
              title="把零散经验整理成 6 个专题"
              subtitle="每个专题都围绕一个长期方向：规则、路径、案例、工具和常见问题会持续补充。"
            />
            <Link href="/knowledge" className="inline-flex items-center gap-2 text-sm font-semibold text-wechat">
              进入知识库
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {knowledgeBases.map((base) => (
              <Link key={base.slug} href={`/knowledge/${base.slug}`} className="group border border-line bg-white p-5 shadow-sm transition hover:border-emerald-300 hover:shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-wechat">{base.articleCount || 0} 篇内容</p>
                    <h3 className="mt-2 text-lg font-semibold text-ink">{base.title}</h3>
                  </div>
                  <ArrowRight className="h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-wechat" />
                </div>
                <p className="mt-4 min-h-14 text-sm leading-7 text-slate-600">{base.shortDescription}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {base.topics.slice(0, 4).map((topic) => (
                    <span key={topic} className="bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
                      {topic}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-[#f7f9fb] py-16">
        <Container>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <SectionHeader
              label="先读这些"
              title="精选文章"
              subtitle="这些文章优先解释平台规则、实操路径和 AI 工具如何真正进入工作流。"
            />
            <Link href="/articles" className="inline-flex items-center gap-2 text-sm font-semibold text-wechat">
              查看全部文章
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

      <section className="bg-white py-16">
        <Container>
          <SectionHeader
            label="实践经验"
            title="我参与过的项目类型"
            subtitle="不写夸张数据，只保留能说明经验边界的项目类型和交付内容。"
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {cases.map((item) => (
              <article key={item.slug} className="border border-line bg-white p-5 shadow-sm">
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

      <section className="bg-[#07111f] py-16 text-white">
        <Container className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-center">
          <div>
            <p className="text-sm font-semibold text-emerald-300">联系宏</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl">
              如果你正在做微信小店、推客、小程序商城，或者想把 AI 用到内容和运营里，可以先从一次交流开始。
            </h2>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {[
                { label: "规则怎么理解", icon: ShieldCheck },
                { label: "路径怎么落地", icon: Workflow },
                { label: "内容怎么沉淀", icon: FileText }
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="flex items-center gap-3 border border-white/10 bg-white/[0.04] p-4">
                    <Icon className="h-5 w-5 text-emerald-300" />
                    <span className="text-sm font-semibold">{item.label}</span>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="bg-white p-4 text-ink">
            <Image
              src="/images/avatar/hong-wechat-qr.png"
              alt="宏的个人微信二维码"
              width={600}
              height={600}
              className="h-auto w-full"
            />
            <div className="mt-4 flex items-center gap-3 border-t border-line pt-4">
              <MessageCircle className="h-5 w-5 text-wechat" />
              <div>
                <p className="text-sm font-semibold">扫码加微信</p>
                <p className="mt-1 text-xs text-slate-500">请备注：微信生态 / AI / 内容资产</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

function SectionHeader({
  label,
  title,
  subtitle
}: {
  label: string
  title: string
  subtitle: string
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold text-wechat">{label}</p>
      <h2 className="mt-3 text-3xl font-semibold leading-tight text-ink sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-8 text-slate-600">{subtitle}</p>
    </div>
  )
}
