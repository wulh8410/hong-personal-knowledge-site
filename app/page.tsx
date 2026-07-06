import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { ArchiveLink, CoordinateMark, FieldIndex, RedNote, SectionLabel } from "@/components/ip/ArchiveUI"
import { Container } from "@/components/layout/Container"
import { JsonLd } from "@/components/seo/JsonLd"
import { getFeaturedArticles, getKnowledgeBases } from "@/lib/content"
import { personJsonLd, websiteJsonLd } from "@/lib/seo"
import { formatDate } from "@/lib/utils"

const capabilityTrack = [
  {
    index: "01",
    title: "技术底座",
    description: "SaaS 系统 · 小程序商城 · 自动化工作流",
    english: "FOUNDATION / ENGINEERING"
  },
  {
    index: "02",
    title: "运营增长",
    description: "视频号直播 · 微信豆投放 · 微信推客",
    english: "GROWTH / OPERATIONS"
  },
  {
    index: "03",
    title: "知识资产",
    description: "AI 工具 · 专题内容 · GEO 实战",
    english: "ASSET / CONTENT"
  }
]

const proofTrack = [
  {
    index: "01",
    title: "程序员出身",
    description: "SaaS 系统 · 小程序商城 · 企业数字化"
  },
  {
    index: "02",
    title: "品牌经营与私域",
    description: "惠氏 · 嘉实多 · 立白 · 香飘飘"
  },
  {
    index: "03",
    title: "直播与投放实战",
    description: "立白 · 燕之屋 · 徐福记｜微信豆千万级经验"
  },
  {
    index: "04",
    title: "AI 与知识资产",
    description: "内容工作流 · 知识库 · GEO 实战探索"
  }
]

const heroIndex = [
  "首页",
  "方法论",
  "实战体系",
  "案例复盘",
  "增长工具箱",
  "知识库",
  "公开课",
  "AI / GEO",
  "资源清单",
  "关于我",
  "联系我",
  "更新日志"
]

const contactChannels = [
  {
    index: "01",
    label: "公众号",
    value: "宏记",
    description: "获取方法论、案例复盘与更新日志。",
    src: "/images/ip-redesign/social-wechat-official.jpg",
    alt: "公众号宏记二维码"
  },
  {
    index: "02",
    label: "视频号",
    value: "吴亮宏",
    description: "直播投放、实战拆解与最新分享。",
    src: "/images/ip-redesign/social-video-account.jpg",
    alt: "视频号吴亮宏二维码"
  },
  {
    index: "03",
    label: "微信",
    value: "wulh8410",
    description: "添加后请备注具体问题与合作方向。",
    src: "/images/avatar/hong-wechat-qr.png",
    alt: "宏的个人微信二维码"
  }
]

export default function HomePage() {
  const knowledgeBases = getKnowledgeBases()
  const latestArticles = getFeaturedArticles(3)

  return (
    <>
      <JsonLd data={personJsonLd()} />
      <JsonLd data={websiteJsonLd()} />

      <section className="archive-grid-dark relative min-h-[calc(100svh-104px)] overflow-hidden border-b border-white/10 text-white">
        <Container className="relative grid min-h-[calc(100svh-104px)] gap-8 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(430px,0.82fr)] lg:items-center lg:gap-10 lg:py-16 2xl:pr-[250px]">
          <div className="relative z-20 archive-fade-in">
            <div className="flex items-center gap-4 border-l border-white/18 pl-6">
              <span className="h-2 w-2 rounded-full bg-wechat" />
              <span className="font-mono text-[10px] text-white/50">01&nbsp;&nbsp;/&nbsp;&nbsp;FIELD DOSSIER</span>
            </div>
            <p className="mt-9 flex items-center gap-4 text-base text-white/70 sm:mt-14 sm:text-lg">
              <span className="text-2xl font-semibold text-wechat">宏</span>
              <span className="h-7 w-px bg-white/45" />
              <span>15 年微信生态全链路实战</span>
            </p>
            <h1 className="mt-5 max-w-4xl text-[38px] font-semibold leading-[1.12] text-white sm:mt-7 sm:text-[58px] sm:leading-[1.16] lg:text-[68px]">
              把技术做成增长，
              <br />
              把经验沉淀成知识
            </h1>
            <div className="mt-6 h-0.5 w-10 bg-wechat sm:mt-7" />
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/62 sm:mt-7 sm:text-base sm:leading-8">
              微信小店 · 视频号直播 · 微信豆投放 · 微信推客 · AI / GEO
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row">
              <ArchiveLink href="/knowledge" primary className="sm:min-w-56">
                进入知识库
              </ArchiveLink>
              <ArchiveLink href="/articles" dark className="sm:min-w-48">
                阅读最新文章
              </ArchiveLink>
            </div>
          </div>

          <div
            className="relative z-10 min-h-[360px] overflow-hidden sm:min-h-[420px] lg:h-[680px]"
            style={{
              maskImage: "linear-gradient(90deg, transparent 0%, black 16%, black 100%)",
              WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 16%, black 100%)"
            }}
          >
            <Image
              src="/images/avatar/hong-stage-background.png"
              alt="宏在微信生态增长峰会进行视频号直播分享"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 620px"
              className="object-cover object-[60%_center] lg:scale-[1.16]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,15,20,0.48),transparent_36%)]" />
          </div>

          <div className="absolute bottom-10 left-12 hidden items-center gap-8 lg:flex">
            <CoordinateMark dark />
            <span className="dot-field h-10 w-28 text-white/18" />
          </div>

          <aside className="absolute inset-y-0 right-0 hidden w-[220px] border-l border-white/10 bg-ink/78 px-8 py-12 2xl:block">
            <ol className="relative mt-1 grid gap-[18px] border-l border-white/20 pl-8">
              {heroIndex.map((item, index) => (
                <li
                  key={item}
                  className={`relative flex items-center gap-4 font-mono text-[11px] ${
                    index === 0 ? "text-wechat" : "text-white/38"
                  }`}
                >
                  <span
                    className={`absolute -left-[37px] h-2 w-2 rounded-full ${
                      index === 0 ? "bg-wechat" : "border border-white/24 bg-ink"
                    }`}
                  />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
            <p className="absolute bottom-12 left-12 font-mono text-[10px] leading-5 text-white/35">
              SCROLL
              <br />
              TO EXPLORE
            </p>
          </aside>
        </Container>
      </section>

      <section className="paper-texture relative overflow-hidden border-b border-line py-16 lg:py-24">
        <Container>
          <div className="flex items-start justify-between gap-8">
            <div>
              <SectionLabel title="技术 × 运营 × 内容资产" />
              <h2 className="mt-8 text-[38px] font-semibold leading-tight sm:text-[54px]">懂技术，也懂运营</h2>
              <p className="mt-4 text-base text-ink/58 sm:text-lg">从系统架构到直播间，从投放数据到长期知识资产</p>
            </div>
            <div className="hidden lg:block">
              <CoordinateMark />
            </div>
          </div>

          <div className="relative mt-10 aspect-[16/5] min-h-[260px] overflow-hidden border border-line">
            <Image
              src="/images/ip-redesign/openclass-2026-talk-desktop.png"
              alt="宏在微信公开课互动展区"
              fill
              sizes="(max-width: 1440px) 100vw, 1344px"
              className="hidden object-cover md:block"
            />
            <Image
              src="/images/ip-redesign/openclass-2026-talk-mobile.png"
              alt="宏在微信公开课互动展区"
              fill
              sizes="(max-width: 767px) 100vw, 1px"
              className="object-cover md:hidden"
            />
          </div>

          <div className="relative mt-5 grid gap-8 border-t-2 border-wechat pt-10 md:grid-cols-3">
            {capabilityTrack.map((item) => (
              <article key={item.index} className="relative border-l border-line pl-5 md:border-l-0 md:pl-0">
                <span className="absolute -top-[47px] left-0 h-4 w-4 rounded-full border-2 border-wechat bg-paper" />
                <p className="font-mono text-sm text-wechat">{item.index}</p>
                <h3 className="mt-4 text-2xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-ink/58">{item.description}</p>
                <p className="mt-6 font-mono text-[10px] text-cobalt">{item.english}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-end">
            <RedNote>重复三遍的事，值得被 AI 化。</RedNote>
            <Link href="/about#experience" className="inline-flex items-center gap-4 border-b border-cobalt pb-2 text-sm font-semibold">
              查看我的实战路径
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>

      <section className="archive-grid-dark overflow-hidden border-b border-white/10 py-16 text-white lg:py-24">
        <Container>
          <div className="flex items-start justify-between gap-8">
            <SectionLabel title="专题知识库" english="KNOWLEDGE SYSTEM" dark />
            <div className="hidden lg:block">
              <CoordinateMark dark />
            </div>
          </div>
          <div className="mx-auto mt-12 max-w-5xl text-center">
            <h2 className="text-[36px] font-semibold leading-tight sm:text-[48px]">
              八个专题，构成一套<span className="text-wechat">微信生态作战地图</span>
            </h2>
            <p className="mt-5 text-base text-white/58">先查规则，再拆路径，最后把经验沉淀成可复用资产。</p>
          </div>

          <div className="mt-12 flex snap-x gap-2 overflow-x-auto pb-4 lg:grid lg:grid-cols-8 lg:overflow-visible">
            {knowledgeBases.map((base, index) => (
              <Link
                key={base.slug}
                href={`/knowledge/${base.slug}`}
                className={`group relative min-h-[340px] min-w-[240px] snap-start border px-5 py-6 transition lg:min-w-0 ${
                  index === 0
                    ? "border-wechat bg-wechat/[0.08] shadow-[inset_0_0_55px_rgba(7,193,96,0.08)]"
                    : "border-white/20 hover:border-wechat/70 hover:bg-white/[0.03]"
                }`}
                style={{ clipPath: "polygon(10% 0, 100% 0, 90% 100%, 0 100%)" }}
              >
                <p className={`font-mono text-sm ${index === 0 ? "text-wechat" : "text-white/35"}`}>
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className={`mt-12 text-xl font-semibold leading-8 ${index === 0 ? "text-wechat" : "text-white"}`}>
                  {base.title
                    .replace("知识库", "")
                    .replace("微信小店&直播", "违规")
                    .replace("实战探索", "探索")
                    .replace("微信公私域联运", "公私域联运")}
                </h3>
                <span className={`mt-6 block h-px w-6 ${index === 0 ? "bg-wechat" : "bg-white/28"}`} />
                <p className="mt-6 text-xs leading-6 text-white/48">{base.shortDescription}</p>
                <p className="absolute bottom-7 left-5 font-mono text-[10px] text-white/42">专题索引 · 持续更新</p>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <ArchiveLink href="/knowledge" primary className="min-w-72">
              查看全部知识库
            </ArchiveLink>
          </div>
        </Container>
      </section>

      <section className="paper-texture overflow-hidden border-b border-line py-16 lg:py-24">
        <Container>
          <div className="flex items-start justify-between gap-8">
            <div>
              <SectionLabel title="实战履历" english="PROOF OF WORK" />
              <h2 className="mt-8 max-w-5xl text-[38px] font-semibold leading-tight sm:text-[54px]">
                不是头衔堆叠，
                <br />
                是一条长期做成事情的路径
              </h2>
              <p className="mt-4 text-base text-ink/58 sm:text-lg">15 年一线实践，从写系统，到做增长，再到把经验沉淀成知识。</p>
            </div>
            <FieldIndex current="04" />
          </div>

          <div className="mt-10 grid min-h-[360px] gap-3 bg-ink p-3 md:grid-cols-[1.15fr_0.72fr_0.88fr_1fr]">
            <PhotoFrame src="/images/ip-redesign/openclass-2026-stage-desktop.png" alt="2026 微信公开课现场" />
            <PhotoFrame src="/images/ip-redesign/openclass-2025-mobile.png" alt="2025 微信公开课现场" />
            <div className="flex flex-col justify-center bg-paper px-7 py-10 text-ink">
              <span className="w-fit border border-ink/30 px-2 py-1 font-mono text-[10px]">沉淀 · 方法论 · 复利</span>
              <h3 className="mt-6 text-2xl font-semibold leading-9">把实战经验，沉淀为可复用的知识体系</h3>
              <p className="mt-4 text-sm leading-7 text-ink/58">从项目打法到方法模型，从内容资产到知识库建设，让经验持续复利。</p>
            </div>
            <PhotoFrame src="/images/ip-redesign/openclass-2026-talk-mobile.png" alt="微信公开课 TALK 展区" />
          </div>

          <div className="grid border-t-2 border-wechat md:grid-cols-4">
            {proofTrack.map((item) => (
              <article key={item.index} className="border-b border-line px-3 py-7 md:border-b-0 md:border-r md:last:border-r-0">
                <p className="font-mono text-sm text-wechat">{item.index}</p>
                <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-xs leading-6 text-ink/55">{item.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="archive-grid-dark text-white">
        <Container className="grid lg:grid-cols-[1.65fr_1fr]">
          <div className="border-white/10 py-16 lg:border-r lg:pr-12 lg:py-20">
            <SectionLabel title="最近更新" english="KEEP SHIPPING" dark />
            <h2 className="mt-7 text-[36px] font-semibold leading-tight sm:text-[46px]">持续更新，也欢迎来聊具体问题</h2>
            <p className="mt-4 text-sm leading-7 text-white/55">文章讲方法，知识库查规则，具体问题可以直接交流。</p>
            <div className="mt-10">
              {latestArticles.map((article, index) => (
                <Link
                  key={article.slug}
                  href={`/articles/${article.slug}`}
                  className="group grid grid-cols-[68px_1fr_auto] items-center gap-5 border-b border-white/14 py-7"
                >
                  <div>
                    <p className="font-mono text-3xl font-light text-white/60">{String(index + 1).padStart(2, "0")}</p>
                    <p className="mt-2 font-mono text-[10px] text-white/40">{formatDate(article.updated || article.date)}</p>
                  </div>
                  <div className="border-l border-white/15 pl-6">
                    <p className="text-xs text-wechat">{article.category}</p>
                    <h3 className="mt-3 text-xl font-semibold leading-8 sm:text-2xl">{article.title}</h3>
                  </div>
                  <ArrowRight className="h-5 w-5 text-white/45 transition group-hover:translate-x-1 group-hover:text-wechat" />
                </Link>
              ))}
            </div>
            <Link href="/articles" className="mt-9 inline-flex items-center gap-4 border-b border-cobalt pb-2 text-sm font-semibold text-cobalt">
              查看全部文章
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="py-16 lg:pl-12 lg:py-20">
            <SectionLabel title="信号台" english="SIGNAL DESK" dark />
            <div className="mt-8">
              {contactChannels.map((channel) => (
                <article key={channel.index} className="grid grid-cols-[28px_112px_1fr] gap-4 border-b border-white/12 py-5 first:pt-0">
                  <span className="mt-4 font-mono text-xs text-wechat">{channel.index}</span>
                  <div className="relative aspect-square overflow-hidden bg-white p-1">
                    <Image src={channel.src} alt={channel.alt} fill sizes="112px" className="object-contain" />
                  </div>
                  <div className="pt-3">
                    <h3 className="text-base font-semibold">
                      <span className="text-wechat">{channel.label}</span>
                      <span className="mx-2 text-white/25">|</span>
                      {channel.value}
                    </h3>
                    <p className="mt-3 text-xs leading-6 text-white/52">{channel.description}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-5 text-xs leading-6 text-white/50">
              交流请备注：微信生态 <span className="text-wechat">/</span> AI <span className="text-wechat">/</span> 内容资产
            </p>
            <a href="weixin://" className="mt-6 inline-flex h-12 w-full items-center justify-center gap-5 bg-wechat text-sm font-semibold">
              开始一次具体交流
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Container>
      </section>
    </>
  )
}

function PhotoFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative min-h-[320px] overflow-hidden">
      <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 30vw" className="object-cover" />
    </div>
  )
}
