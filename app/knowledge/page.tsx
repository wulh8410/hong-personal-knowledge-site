import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { ImaKnowledgeSearch } from "@/components/ima/ImaKnowledgeSearch"
import { ArchiveLink, CoordinateMark, FieldIndex, RedNote, SectionLabel } from "@/components/ip/ArchiveUI"
import { KnowledgeQrList } from "@/components/knowledge/KnowledgeQrList"
import { Container } from "@/components/layout/Container"
import { JsonLd } from "@/components/seo/JsonLd"
import { imaSources } from "@/lib/ima-sources"
import { breadcrumbJsonLd } from "@/lib/seo"
import { absoluteUrl } from "@/lib/utils"

export const metadata: Metadata = {
  title: "系统化知识库",
  description: "围绕微信小店、视频号直播、广告投放、微信推客、违规规则、AI 工具、GEO 和公私域联运，持续更新可复用的专题内容。",
  alternates: {
    canonical: absoluteUrl("/knowledge")
  },
  openGraph: {
    title: "系统化知识库",
    description: "先查官方事实，再看解释、路径与可执行动作。",
    url: absoluteUrl("/knowledge")
  }
}

const qrLibraries = [
  {
    index: "01",
    name: "微信小店官方公告与规则知识库",
    src: "/images/ip-redesign/qr-store-rules-code.png"
  },
  {
    index: "02",
    name: "视频号投放大全",
    src: "/images/ip-redesign/qr-video-ads-code.png"
  },
  {
    index: "03",
    name: "微信推客知识库",
    src: "/images/ip-redesign/qr-wechat-tuike-code.png"
  },
  {
    index: "04",
    name: "微信小店视频号违规规则及案例大全",
    src: "/images/ip-redesign/qr-violations-code.png"
  }
]

const deckPositions = [
  "lg:left-0 lg:bottom-0 lg:-rotate-[1.8deg]",
  "lg:left-[20%] lg:bottom-[68px] lg:rotate-[1.4deg]",
  "lg:left-[40%] lg:bottom-[136px] lg:-rotate-[1.8deg]",
  "lg:left-[60%] lg:bottom-[204px] lg:rotate-[1.4deg]"
]

const paths = [
  {
    index: "01",
    title: "官方来源",
    description: "公告、规则原文、平台案例",
    action: "查看来源",
    href: "#libraries"
  },
  {
    index: "02",
    title: "宏的解释",
    description: "判断适用场景，拆清平台逻辑与风险边界",
    action: "阅读相关文章",
    href: "/articles"
  },
  {
    index: "03",
    title: "执行动作",
    description: "形成直播话术、商品页和复盘检查清单",
    action: "保存学习路径",
    href: "/knowledge/wechat-store"
  }
]

export default function KnowledgePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "首页", url: "/" },
          { name: "知识库", url: "/knowledge" }
        ])}
      />

      <section id="libraries" className="archive-grid-dark overflow-hidden border-b border-white/10 text-white">
        <Container className="grid min-w-0 min-h-[790px] gap-4 py-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-12 lg:py-20">
          <div className="relative order-2 min-w-0 min-h-[510px] lg:order-1 lg:min-h-[610px]">
            <div className="absolute left-0 top-0 hidden lg:block">
              <FieldIndex current="08" dark />
            </div>
            <div className="absolute left-0 top-14 hidden h-28 w-28 rounded-full border border-white/12 lg:block">
              <div className="absolute inset-4 rounded-full border border-dashed border-white/20" />
              <span className="absolute inset-0 grid place-items-center font-mono text-[9px] text-white/26">VERIFIED<br />SOURCES</span>
            </div>

            <div className="flex h-full snap-x items-end gap-4 overflow-x-auto pb-4 pt-8 lg:absolute lg:inset-x-0 lg:bottom-0 lg:block lg:overflow-visible lg:pt-0">
              {qrLibraries.map((library, index) => (
                <article
                  key={library.index}
                  className={`relative h-[366px] w-[300px] shrink-0 snap-start border border-white/35 bg-[#151a20] p-2 shadow-dossier lg:absolute lg:h-[360px] lg:w-[292px] ${deckPositions[index]}`}
                  style={{ zIndex: index + 1 }}
                >
                  <span className="absolute -top-8 left-4 grid h-12 w-12 place-items-center border border-white/30 bg-ink font-mono text-xl text-white/80">
                    {library.index}
                  </span>
                  <div className="relative aspect-square w-full overflow-hidden bg-white">
                    <Image
                      src={library.src}
                      alt={`${library.name}知识码`}
                      fill
                      unoptimized
                      priority={index < 2}
                      sizes="292px"
                      className="object-contain"
                    />
                  </div>
                  <p className="line-clamp-2 px-2 pb-1 pt-3 text-xs leading-5 text-white/70">{library.name}</p>
                </article>
              ))}
            </div>
            <div className="absolute bottom-0 left-0 hidden h-14 w-[92%] border border-white/15 bg-[#11161c] lg:block" />
          </div>

          <div className="order-1 min-w-0 lg:order-2">
            <div className="flex items-start justify-between gap-6">
              <SectionLabel title="知识库" english="VERIFIED SOURCES" dark />
              <FieldIndex current="08" dark />
            </div>
            <h1 className="mt-8 text-[38px] font-semibold leading-[1.14] sm:mt-10 sm:text-[58px]">
              四套官方资料库，
              <br />
              先查事实，再谈方法
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/58 sm:mt-7">
              公告、规则、投放和违规案例放在 ima；站内文章负责解释判断、路径和落地动作。
            </p>

            <div className="mt-7 sm:mt-9">
              <KnowledgeQrList libraries={qrLibraries} />
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row">
              <ArchiveLink href="#ima-search" primary className="sm:min-w-64">
                打开知识库工作台
              </ArchiveLink>
              <ArchiveLink href="#learning-path" dark className="sm:min-w-48">
                查看学习路径
              </ArchiveLink>
            </div>
            <p className="mt-6 font-mono text-[10px] text-white/38 sm:mt-8">扫码可直接订阅 ima 知识库</p>
          </div>
        </Container>
      </section>

      <section id="learning-path" className="paper-texture border-b border-line py-16 lg:py-24">
        <Container>
          <div className="flex items-start justify-between gap-8">
            <SectionLabel title="查询路径" english="FROM FACT TO ACTION" />
            <div className="hidden lg:block">
              <CoordinateMark />
            </div>
          </div>
          <div className="mt-10 flex items-end justify-between gap-8">
            <div>
              <h2 className="max-w-6xl text-[38px] font-semibold leading-tight sm:text-[54px]">
                一个问题，沿着来源、解释和动作往下走
              </h2>
              <p className="mt-5 text-base leading-8 text-ink/58">先核对官方资料，再理解规则逻辑，最后形成可以执行的清单。</p>
            </div>
            <FieldIndex current="09" />
          </div>

          <div className="mt-10">
            <ImaKnowledgeSearch sources={imaSources} showIntro={false} />
          </div>

          <div className="relative mt-16 grid gap-0 border-t-2 border-wechat md:grid-cols-3">
            {paths.map((path) => (
              <article key={path.index} className="relative border-b border-line px-5 py-10 md:border-b-0 md:border-r md:last:border-r-0">
                <span className="absolute -top-2 left-5 h-4 w-4 rounded-full border-2 border-wechat bg-paper" />
                <div className="flex items-center gap-4">
                  <span className="font-mono text-3xl font-semibold text-wechat">{path.index}</span>
                  <span className="h-8 w-px bg-wechat" />
                  <h3 className="text-2xl font-semibold">{path.title}</h3>
                </div>
                <p className="mt-7 min-h-14 text-sm leading-7 text-ink/58">{path.description}</p>
                <Link href={path.href} className="mt-7 inline-flex items-center gap-5 border-b border-cobalt pb-2 text-sm font-semibold text-cobalt">
                  {path.action}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <RedNote>资料层负责准确，方法层负责可执行。</RedNote>
            <span className="dot-field h-12 w-36 text-ink/12" />
          </div>
        </Container>
      </section>
    </>
  )
}
