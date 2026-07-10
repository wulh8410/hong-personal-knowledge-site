import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BookOpen, FileText, ImageIcon, Play, Radio, Route } from "lucide-react"

import { CourseProgress } from "@/components/course/CourseProgress"
import { FieldIndex, SectionLabel } from "@/components/ip/ArchiveUI"
import { Container } from "@/components/layout/Container"
import { JsonLd } from "@/components/seo/JsonLd"
import { courseStatusLabels } from "@/lib/course-data"
import { getCourseTracks } from "@/lib/content"
import { breadcrumbJsonLd } from "@/lib/seo"
import { absoluteUrl, cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "实战课程",
  description: "围绕微信小店、广告投放、微信推客、视频号直播和短视频，按业务问题组织的体系化实战课程。",
  alternates: { canonical: absoluteUrl("/courses") },
  openGraph: {
    title: "宏的实战课",
    description: "从一个业务问题开始，沿着课程路径系统学习微信生态实战方法。",
    url: absoluteUrl("/courses")
  }
}

export default function CoursesPage() {
  const tracks = getCourseTracks()
  const featured = tracks.find((track) => track.slug === "wechat-store")!
  const lessonCount = tracks.reduce((total, track) => total + track.lessons.length, 0)

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "首页", url: "/" }, { name: "实战课程", url: "/courses" }])} />

      <section className="archive-grid-light overflow-hidden border-b border-line py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="flex items-start justify-between gap-8">
            <SectionLabel title="宏的实战课" english="PRACTICAL COURSE" />
            <FieldIndex current="01" total="06" />
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(520px,1.1fr)] lg:items-end">
            <div className="relative z-10 pb-2">
              <h1 className="max-w-4xl text-[44px] font-semibold leading-[1.08] sm:text-[70px] lg:text-[82px]">
                把经验，学成
                <br />
                <span className="relative inline-block">
                  可执行的方法
                  <span className="absolute -bottom-2 left-0 h-1 w-[68%] bg-wechat" />
                </span>
              </h1>
              <p className="mt-8 max-w-xl text-base leading-8 text-ink/62 sm:text-lg">
                不从资料数量开始，而从你的业务问题开始。选一个方向，沿着课程路径完成每一节实战课。
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="#course-map"
                  className="inline-flex h-12 items-center gap-4 bg-wechat px-6 text-sm font-semibold text-white transition hover:bg-[#05a954]"
                >
                  查看课程路径 <ArrowRight className="h-4 w-4" />
                </Link>
                <span className="inline-flex h-12 items-center border border-line bg-white/70 px-5 font-mono text-xs text-ink/55">
                  {lessonCount} 节真实课程 · 持续更新
                </span>
              </div>
            </div>

            <div className="relative min-h-[390px] overflow-hidden border border-line bg-ink shadow-dossier sm:min-h-[500px]">
              <Image
                src="/images/ip-redesign/openclass-2026-stage-desktop.png"
                alt="微信公开课活动现场"
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 grid grid-cols-3 border-t border-white/20 bg-ink/82 text-white backdrop-blur-sm">
                {[
                  ["01", "课程地图"],
                  ["02", "每周一堂"],
                  ["03", "三类资料"]
                ].map(([index, label]) => (
                  <div key={index} className="border-r border-white/15 p-4 last:border-r-0 sm:p-5">
                    <p className="font-mono text-lg text-wechat">{index}</p>
                    <p className="mt-2 text-xs text-white/70 sm:text-sm">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="course-map" className="archive-grid-dark scroll-mt-20 border-b border-white/10 py-14 text-white lg:py-20">
        <Container>
          <div className="flex items-start justify-between gap-8">
            <SectionLabel title="按业务问题选课" english="COURSE MAP" dark />
            <FieldIndex current="02" total="06" dark />
          </div>
          <div className="mt-10 grid gap-px border border-white/15 bg-white/15 lg:grid-cols-5">
            {tracks.map((track, index) => {
              const firstLesson = track.lessons[0]
              const href = track.planned ? `/courses/${track.slug}` : firstLesson ? `/courses/${track.slug}` : "/courses"
              return (
                <Link
                  key={track.slug}
                  href={href}
                  className={cn(
                    "group relative min-h-[300px] overflow-hidden bg-ink p-6 transition hover:bg-[#111820] lg:min-h-[430px]",
                    index === 0 && "lg:col-span-2"
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono text-sm text-wechat">{track.index}</span>
                    <span className="border border-white/18 px-2 py-1 font-mono text-[10px] text-white/45">
                      {track.planned ? "筹备中" : `${track.lessons.length} 节课`}
                    </span>
                  </div>
                  <h2 className={cn("mt-8 font-semibold leading-tight", index === 0 ? "text-4xl sm:text-5xl" : "text-3xl")}>
                    {track.shortTitle}
                  </h2>
                  <p className="mt-5 max-w-lg text-sm leading-7 text-white/55">{track.description}</p>
                  {index === 0 ? (
                    <div className="mt-8 grid gap-3 border-t border-white/12 pt-6 sm:grid-cols-2">
                      {track.lessons.slice(0, 4).map((lesson) => (
                        <span key={lesson.slug} className="flex items-start gap-3 text-sm leading-6 text-white/72">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-wechat" />
                          {lesson.title}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <span className="absolute bottom-6 left-6 inline-flex items-center gap-3 border-b border-wechat pb-2 text-sm font-semibold text-wechat">
                    {track.planned ? "查看筹备说明" : "进入课程"}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              )
            })}
          </div>
        </Container>
      </section>

      <section className="paper-texture border-b border-line py-14 lg:py-20">
        <Container>
          <div className="flex items-start justify-between gap-8">
            <SectionLabel title="首发课程" english="WEEKLY CLASS" />
            <FieldIndex current="03" total="06" />
          </div>
          <div className="mt-10 grid gap-10 xl:grid-cols-[minmax(0,1fr)_340px]">
            <div>
              <div className="flex flex-col gap-5 border-b-2 border-ink pb-8 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-mono text-xs text-wechat">COURSE 01 / WECHAT STORE</p>
                  <h2 className="mt-4 text-[38px] font-semibold leading-tight sm:text-[56px]">{featured.title}</h2>
                  <p className="mt-5 max-w-2xl text-base leading-8 text-ink/60">{featured.promise}</p>
                </div>
                <Link
                  href={`/courses/${featured.slug}`}
                  className="inline-flex shrink-0 items-center gap-4 border-b border-wechat pb-2 text-sm font-semibold text-wechat"
                >
                  查看完整路径 <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid sm:grid-cols-2">
                {featured.lessons.map((lesson, index) => (
                  <Link
                    key={lesson.slug}
                    href={`/courses/${featured.slug}/${lesson.slug}`}
                    className="group grid min-h-28 grid-cols-[52px_1fr] border-b border-line py-5 sm:odd:border-r sm:odd:pr-7 sm:even:pl-7"
                  >
                    <span className="font-mono text-sm text-wechat">{String(index + 1).padStart(2, "0")}</span>
                    <span>
                      <strong className="block text-lg leading-7 transition group-hover:text-wechat">{lesson.title}</strong>
                      <span className="mt-2 block text-xs text-ink/48">
                        {courseStatusLabels[lesson.status]} · {lesson.duration}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="space-y-5">
              <CourseProgress lessonKeys={featured.lessons.map((lesson) => `${featured.slug}/${lesson.slug}`)} />
              <div className="relative aspect-[4/3] overflow-hidden border border-line bg-white">
                <Image
                  src="/images/courses/issue-17-infographic.png"
                  alt="微信小店课程信息图"
                  fill
                  className="object-contain"
                  sizes="340px"
                />
              </div>
              <p className="border-l-2 border-cobalt pl-4 text-sm leading-7 text-ink/58">
                可以按顺序学习，也可以直接进入当前业务问题对应的课时。
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-cobalt/25 bg-cobalt py-14 text-white lg:py-20">
        <Container>
          <div className="flex items-start justify-between gap-8">
            <SectionLabel title="每节课只保留三种材料" english="LESSON MATERIALS" dark />
            <FieldIndex current="04" total="06" dark />
          </div>
          <div className="mt-10 grid border-y border-white/25 md:grid-cols-3">
            {[
              { icon: FileText, index: "01", title: "文字稿", description: "适合系统阅读、搜索和反复查阅，不需要拖动视频找答案。" },
              { icon: ImageIcon, index: "02", title: "信息图", description: "把一节课的核心结构压缩成一张图，便于复习和保存。" },
              { icon: Play, index: "03", title: "直播回放", description: "保留完整讲解、案例和现场补充，适合深入学习。" }
            ].map((item) => (
              <div key={item.index} className="border-b border-white/25 p-7 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 sm:p-9">
                <div className="flex items-center justify-between">
                  <item.icon className="h-7 w-7 text-white" strokeWidth={1.4} />
                  <span className="font-mono text-sm text-white/45">{item.index}</span>
                </div>
                <h2 className="mt-12 text-3xl font-semibold">{item.title}</h2>
                <p className="mt-4 text-sm leading-7 text-white/68">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="archive-grid-dark py-16 text-white lg:py-24">
        <Container>
          <div className="mx-auto max-w-5xl text-center">
            <Radio className="mx-auto h-8 w-8 text-wechat" strokeWidth={1.3} />
            <h2 className="mt-7 text-[36px] font-semibold leading-tight sm:text-[58px]">从一节解决问题的课开始</h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/58">
              先选你的业务方向，再按自己的节奏学完每一段路径。课程会随着真实培训持续更新。
            </p>
            <Link
              href={`/courses/${featured.slug}/${featured.lessons[0].slug}`}
              className="mt-9 inline-flex h-12 items-center gap-4 bg-wechat px-7 text-sm font-semibold text-white transition hover:bg-[#05a954]"
            >
              <BookOpen className="h-4 w-4" /> 从第 1 课开始
            </Link>
            <div className="mt-14 grid border-y border-white/14 sm:grid-cols-5">
              {tracks.map((track) => (
                <div key={track.slug} className="border-b border-white/14 px-3 py-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
                  <Route className="mx-auto h-4 w-4 text-wechat" />
                  <p className="mt-3 text-sm font-semibold">{track.shortTitle}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
