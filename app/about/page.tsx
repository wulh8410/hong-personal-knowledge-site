import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowDown, FileText, Layers3, Send, UsersRound } from "lucide-react"

import { ContactSignal } from "@/components/ip/ContactSignal"
import { CoordinateMark, FieldIndex, SectionLabel } from "@/components/ip/ArchiveUI"
import { Container } from "@/components/layout/Container"
import { JsonLd } from "@/components/seo/JsonLd"
import { siteConfig } from "@/lib/constants"
import { breadcrumbJsonLd, personJsonLd } from "@/lib/seo"
import { absoluteUrl } from "@/lib/utils"

export const metadata: Metadata = {
  title: "关于宏",
  description: "了解宏在微信生态、视频号直播、广告投放、微信推客、AI 工具和 GEO 方面的长期实践。",
  alternates: {
    canonical: absoluteUrl("/about")
  },
  openGraph: {
    title: `关于宏｜${siteConfig.name}`,
    description: "程序员出身，15 年微信生态全链路实战，只分享经实战验证、可落地的解决方案。",
    url: absoluteUrl("/about")
  }
}

const capabilityRows = [
  { label: "系统", icon: Layers3 },
  { label: "运营", icon: UsersRound },
  { label: "投放", icon: Send },
  { label: "内容", icon: FileText }
]

const projectBars = [
  {
    row: 0,
    start: 1,
    span: 2,
    title: "微信小店培训",
    note: "从规则到实操，培训落地与团队赋能"
  },
  {
    row: 0,
    start: 4,
    span: 3,
    title: "微信推客 SaaS 系统交付与共创",
    note: "系统交付、二开共创与长期迭代"
  },
  {
    row: 1,
    start: 2,
    span: 3,
    title: "操盘多个知名品牌视频号直播",
    note: "直播策略、脚本、排期与复盘沉淀"
  },
  {
    row: 1,
    start: 5,
    span: 2,
    title: "品牌小程序商城搭建与代运营",
    note: "商城搭建、代运营与增长优化"
  },
  {
    row: 2,
    start: 1,
    span: 3,
    title: "消耗千万级的微信豆代投",
    note: "投放策略、素材测试与 ROI 提升"
  },
  {
    row: 3,
    start: 5,
    span: 2,
    title: "AI 内容与知识库工作流搭建",
    note: "内容生产、知识沉淀与流程自动化"
  }
]

const principles = ["不空谈概念", "不追逐伪风口", "重视规则和平台逻辑", "重视实操和复盘", "重视长期内容资产"]

export default function AboutPage() {
  return (
    <>
      <JsonLd data={personJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "首页", url: "/" },
          { name: "关于我", url: "/about" }
        ])}
      />

      <section className="archive-grid-dark relative min-h-[calc(100svh-104px)] overflow-hidden text-white">
        <Image
          src="/images/ip-redesign/openclass-2026-stage-desktop.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,15,20,0.98)_0%,rgba(11,15,20,0.86)_48%,rgba(11,15,20,0.35)_100%)]" />

        <aside className="absolute inset-y-0 left-0 hidden w-32 bg-paper text-ink xl:block">
          <div className="absolute inset-x-6 top-16 font-mono text-[10px] leading-6 text-ink/55">
            <span className="text-lg font-bold text-wechat">{"//"}</span>
            <p className="mt-3">视频号培训讲师</p>
            <span className="mt-4 block h-28 w-px bg-ink/22" />
            <p className="mt-4">腾讯广告分享嘉宾</p>
            <span className="mt-4 block h-28 w-px bg-ink/22" />
            <p className="mt-4">微信豆千万级<br />投放经验</p>
          </div>
          <div className="absolute bottom-12 left-6">
            <FieldIndex current="10" />
          </div>
        </aside>

        <Container className="relative grid min-h-[calc(100svh-104px)] gap-8 py-12 lg:grid-cols-[1fr_0.82fr] lg:items-center lg:py-16 xl:pl-44">
          <div className="relative z-10 archive-fade-in">
            <SectionLabel title="关于宏" english="FROM CODE TO GROWTH" dark />
            <h1 className="mt-9 max-w-3xl text-[36px] font-semibold leading-[1.18] sm:text-[58px]">
              <span className="block whitespace-nowrap">先是程序员，</span>
              <span className="block whitespace-nowrap">后来成为长期在一线</span>
              <span className="block whitespace-nowrap">做增长的人</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/62">
              15 年微信生态全链路实践，把系统、内容、投放、直播和私域放到同一张经营地图里。
            </p>
            <blockquote className="mt-8 flex items-start gap-4 text-base text-white/75">
              <span className="font-serif text-4xl leading-none text-wechat">“</span>
              <span>只分享经实战验证、可落地的解决方案。</span>
            </blockquote>
            <Link href="#experience" className="mt-10 inline-flex items-center gap-4 border-b border-wechat pb-2 text-sm font-semibold">
              继续了解我的经历
              <ArrowDown className="h-4 w-4" />
            </Link>
          </div>

          <div
            className="relative z-10 min-h-[420px] overflow-hidden lg:h-[680px]"
            style={{
              maskImage: "radial-gradient(ellipse at 62% 52%, black 42%, black 56%, transparent 84%)",
              WebkitMaskImage: "radial-gradient(ellipse at 62% 52%, black 42%, black 56%, transparent 84%)"
            }}
          >
            <Image
              src="/images/ip-redesign/portrait-office.png"
              alt="宏的个人商务照"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 620px"
              className="object-cover object-[58%_center] brightness-[0.82]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,15,20,0.65),transparent_42%)]" />
          </div>
        </Container>
      </section>

      <section id="experience" className="paper-texture scroll-mt-20 border-b border-line">
        <div className="relative overflow-hidden py-16 lg:py-20">
          <Container>
            <SectionLabel title="实践范围" english="PRACTICE RANGE" />
            <h2 className="mt-8 max-w-5xl text-[40px] font-semibold leading-tight sm:text-[56px]">
              系统、运营、投放、内容，
              <br />
              最终都要回到业务结果
            </h2>
            <p className="mt-5 text-base leading-8 text-ink/58">技术不是后台，运营不是口号；两者要在同一条业务链路上协作。</p>
          </Container>
          <div
            className="absolute right-0 top-0 hidden h-full w-[28%] overflow-hidden lg:block"
            style={{ clipPath: "polygon(22% 0, 100% 0, 100% 100%, 58% 100%)" }}
          >
            <Image
              src="/images/ip-redesign/openclass-2026-stage-mobile.png"
              alt="宏在 2026 微信公开课"
              fill
              sizes="28vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="archive-grid-dark px-5 py-12 text-white sm:px-8 lg:px-12 lg:py-16">
          <div className="mx-auto max-w-[1440px]">
            <div className="hidden grid-cols-[150px_repeat(6,minmax(0,1fr))] gap-x-0 lg:grid">
              <div className="border-r border-white/16 pr-6 font-mono text-[10px] text-white/45">能力维度</div>
              {Array.from({ length: 6 }, (_, index) => (
                <div key={index} className="border-r border-dashed border-white/18 px-3 pb-3 font-mono text-sm text-wechat">
                  {String(index + 1).padStart(2, "0")}
                </div>
              ))}

              {capabilityRows.map((row, rowIndex) => {
                const Icon = row.icon
                return (
                  <div key={row.label} className="contents">
                    <div className="flex h-24 items-center gap-4 border-r border-t border-dashed border-white/18 pr-5">
                      <span className="grid h-11 w-11 place-items-center rounded-full border border-wechat text-wechat">
                        <Icon className="h-5 w-5" strokeWidth={1.5} />
                      </span>
                      <span className="text-lg font-semibold">{row.label}</span>
                    </div>
                    <div className="relative col-span-6 h-24 border-t border-dashed border-white/18">
                      {projectBars
                        .filter((item) => item.row === rowIndex)
                        .map((item) => (
                          <div
                            key={item.title}
                            className="absolute top-5 flex h-12 items-center justify-between gap-5 border-r-4 border-wechat bg-paper px-4 text-ink shadow-soft"
                            style={{
                              left: `${((item.start - 1) / 6) * 100}%`,
                              width: `${(item.span / 6) * 100}%`
                            }}
                          >
                            <strong className="truncate text-sm">{item.title}</strong>
                            <span className="truncate text-[10px] text-ink/52">{item.note}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="grid gap-3 lg:hidden">
              {projectBars.map((item) => (
                <article key={item.title} className="border-l-4 border-wechat bg-paper px-5 py-4 text-ink">
                  <h3 className="text-base font-semibold">{item.title}</h3>
                  <p className="mt-2 text-xs leading-6 text-ink/55">{item.note}</p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <Container className="grid gap-8 py-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div className="relative aspect-[16/7] overflow-hidden">
            <Image
              src="/images/ip-redesign/openclass-2026-talk-desktop.png"
              alt="宏在微信公开课 TALK 展区"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
          <div className="grid gap-4 text-sm text-ink/70 sm:grid-cols-2">
            <p className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full border-2 border-wechat" />
              直播实践：立白 · 燕之屋 · 徐福记
            </p>
            <p className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full border-2 border-cobalt" />
              系统与商城：惠氏 · 嘉实多 · 香飘飘
            </p>
          </div>
        </Container>
      </section>

      <section className="paper-texture py-16 lg:py-20">
        <Container>
          <SectionLabel title="内容原则" english="WORKING PRINCIPLES" />
          <h2 className="mx-auto mt-12 max-w-6xl text-center text-[38px] font-semibold leading-tight sm:text-[52px]">
            只分享经实战验证、可落地的解决方案。
          </h2>
          <div className="mt-14 grid border-y border-line py-7 sm:grid-cols-2 lg:grid-cols-5">
            {principles.map((principle, index) => (
              <div key={principle} className="flex items-center gap-4 border-b border-line px-4 py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
                <span className="font-mono text-sm font-semibold text-wechat">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-sm font-medium">{principle}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 flex justify-end">
            <CoordinateMark />
          </div>
        </Container>
      </section>

      <ContactSignal />
    </>
  )
}
