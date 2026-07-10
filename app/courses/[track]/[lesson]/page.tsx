import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, ExternalLink, FileText, ImageIcon, Play, Radio } from "lucide-react"

import { LessonCompleteButton } from "@/components/course/LessonCompleteButton"
import { TableOfContents } from "@/components/article/TableOfContents"
import { FieldIndex, SectionLabel } from "@/components/ip/ArchiveUI"
import { Container } from "@/components/layout/Container"
import { JsonLd } from "@/components/seo/JsonLd"
import { courseStatusLabels } from "@/lib/course-data"
import {
  getAdjacentCourseLessons,
  getAllCourseLessons,
  getCourseLesson,
  getCourseTrackBySlug
} from "@/lib/content"
import { extractToc, renderMarkdown } from "@/lib/markdown"
import { breadcrumbJsonLd } from "@/lib/seo"
import { absoluteUrl } from "@/lib/utils"

type PageProps = { params: Promise<{ track: string; lesson: string }> }

export function generateStaticParams() {
  return getAllCourseLessons().map((lesson) => ({ track: lesson.track, lesson: lesson.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { track: trackSlug, lesson: lessonSlug } = await params
  const lesson = getCourseLesson(trackSlug, lessonSlug)
  if (!lesson) return {}
  return {
    title: lesson.title,
    description: lesson.description,
    alternates: { canonical: absoluteUrl(`/courses/${trackSlug}/${lessonSlug}`) },
    openGraph: {
      type: "article",
      title: lesson.title,
      description: lesson.description,
      url: absoluteUrl(`/courses/${trackSlug}/${lessonSlug}`)
    }
  }
}

export default async function CourseLessonPage({ params }: PageProps) {
  const { track: trackSlug, lesson: lessonSlug } = await params
  const lesson = getCourseLesson(trackSlug, lessonSlug)
  const track = getCourseTrackBySlug(trackSlug)
  if (!lesson || !track) notFound()

  const html = await renderMarkdown(lesson.content)
  const toc = extractToc(lesson.content)
  const adjacent = getAdjacentCourseLessons(track.slug, lesson.slug)
  const lessonKey = `${track.slug}/${lesson.slug}`

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: lesson.title,
    description: lesson.description,
    learningResourceType: "lesson",
    educationalUse: "instruction",
    inLanguage: "zh-CN",
    isPartOf: {
      "@type": "Course",
      name: track.title,
      url: absoluteUrl(`/courses/${track.slug}`)
    },
    url: absoluteUrl(`/courses/${track.slug}/${lesson.slug}`)
  }

  return (
    <>
      <JsonLd data={courseJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "首页", url: "/" },
          { name: "实战课程", url: "/courses" },
          { name: track.title, url: `/courses/${track.slug}` },
          { name: lesson.title, url: `/courses/${track.slug}/${lesson.slug}` }
        ])}
      />

      <article className="paper-texture border-b border-line py-11 sm:py-14 lg:py-20">
        <Container>
          <div className="flex items-start justify-between gap-8">
            <SectionLabel title={track.shortTitle} english="PRACTICAL LESSON" />
            <FieldIndex current={String(lesson.order).padStart(2, "0")} total={String(track.lessons.length).padStart(2, "0")} />
          </div>
          <div className="mt-8 max-w-5xl sm:mt-11">
            <Link
              href={`/courses/${track.slug}`}
              className="inline-flex items-center gap-3 text-sm text-ink/52 transition hover:text-wechat"
            >
              <ArrowLeft className="h-4 w-4" /> 返回课程目录
            </Link>
            <h1 className="mt-7 text-[38px] font-semibold leading-[1.15] sm:text-[60px]">{lesson.title}</h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-ink/60 sm:text-lg">{lesson.description}</p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-5 font-mono text-[11px] text-ink/48">
              <span>{lesson.sourceIssue}</span>
              <span>{lesson.sourceDate}</span>
              <span>{courseStatusLabels[lesson.status]}</span>
              <span>{lesson.duration}</span>
            </div>
          </div>
        </Container>
      </article>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="mx-auto grid max-w-[1240px] gap-10 xl:grid-cols-[minmax(0,820px)_320px] xl:items-start">
            <div className="min-w-0">
              {lesson.infographic ? (
                <div className="mb-12 border-t-2 border-ink pt-7">
                  <div className="flex items-center justify-between gap-5">
                    <div>
                      <p className="font-mono text-[10px] text-wechat">VISUAL SUMMARY</p>
                      <h2 className="mt-2 text-2xl font-semibold">先用一张图看懂本课</h2>
                    </div>
                    <ImageIcon className="h-6 w-6 text-cobalt" strokeWidth={1.3} />
                  </div>
                  <a
                    href={lesson.infographic}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative mt-6 block aspect-video overflow-hidden border border-line bg-paper"
                    aria-label="查看信息图原图"
                  >
                    <Image
                      src={lesson.infographic}
                      alt={`${lesson.title}信息图`}
                      fill
                      priority
                      className="object-contain"
                      sizes="(max-width: 1280px) 100vw, 820px"
                    />
                    <span className="absolute bottom-3 right-3 border border-ink/15 bg-paper/95 px-3 py-2 text-xs font-semibold text-ink shadow-soft transition group-hover:border-cobalt group-hover:text-cobalt">
                      查看原图
                    </span>
                  </a>
                </div>
              ) : null}

              <div className="border-t-2 border-ink pt-8 sm:pt-10">
                <div className="content-body" dangerouslySetInnerHTML={{ __html: html }} />
              </div>

              <nav className="mt-14 grid border-y border-line sm:grid-cols-2">
                {adjacent.previous ? (
                  <Link
                    href={`/courses/${track.slug}/${adjacent.previous.slug}`}
                    className="group border-b border-line px-1 py-6 sm:border-b-0 sm:border-r sm:pr-8"
                  >
                    <span className="flex items-center gap-3 text-xs text-ink/42"><ArrowLeft className="h-3.5 w-3.5" />上一课</span>
                    <strong className="mt-3 block text-lg leading-7 transition group-hover:text-wechat">{adjacent.previous.title}</strong>
                  </Link>
                ) : <div className="hidden sm:block" />}
                {adjacent.next ? (
                  <Link
                    href={`/courses/${track.slug}/${adjacent.next.slug}`}
                    className="group px-1 py-6 text-right sm:pl-8"
                  >
                    <span className="flex items-center justify-end gap-3 text-xs text-ink/42">下一课<ArrowRight className="h-3.5 w-3.5" /></span>
                    <strong className="mt-3 block text-lg leading-7 transition group-hover:text-wechat">{adjacent.next.title}</strong>
                  </Link>
                ) : null}
              </nav>
            </div>

            <aside className="space-y-4 xl:sticky xl:top-24">
              <div className="border-t-2 border-wechat bg-paper p-5">
                <p className="font-mono text-[10px] text-wechat">LESSON MATERIALS</p>
                <h2 className="mt-3 text-xl font-semibold">本节学习材料</h2>
                <div className="mt-5 divide-y divide-line border-y border-line">
                  <div className="flex items-center justify-between py-4 text-sm">
                    <span className="inline-flex items-center gap-3"><FileText className="h-4 w-4 text-wechat" />文字稿</span>
                    <span className="text-ink/42">{lesson.status === "video" ? "待补" : "已整理"}</span>
                  </div>
                  <div className="flex items-center justify-between py-4 text-sm">
                    <span className="inline-flex items-center gap-3"><ImageIcon className="h-4 w-4 text-cobalt" />信息图</span>
                    <span className="text-ink/42">{lesson.infographic ? "原图" : "暂无"}</span>
                  </div>
                  <div className="flex items-center justify-between py-4 text-sm">
                    <span className="inline-flex items-center gap-3"><Play className="h-4 w-4 text-signal" />直播回放</span>
                    <span className="text-ink/42">{lesson.replayUrl ? "可观看" : "暂无"}</span>
                  </div>
                </div>
                {lesson.replayUrl ? (
                  <a
                    href={lesson.replayUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-3 bg-ink px-5 text-sm font-semibold text-white transition hover:bg-wechat"
                  >
                    <Play className="h-4 w-4" /> 打开直播回放
                  </a>
                ) : (
                  <div className="mt-5 border border-line bg-white px-4 py-3 text-sm leading-6 text-ink/52">本课暂无公开回放，先完成图文学习。</div>
                )}
              </div>

              <LessonCompleteButton lessonKey={lessonKey} />

              {lesson.sourceUrl ? (
                <a
                  href={lesson.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-12 items-center justify-between border border-line bg-white px-4 text-sm font-semibold text-ink transition hover:border-cobalt hover:text-cobalt"
                >
                  查看飞书原始文字稿 <ExternalLink className="h-4 w-4" />
                </a>
              ) : null}

              <div className="border-l-2 border-cobalt px-4 py-2 text-xs leading-6 text-ink/52">
                <Radio className="mb-2 h-4 w-4 text-cobalt" />
                课程内容来自真实培训资料，规则变化时以平台最新公告为准。
              </div>

              {toc.length ? <TableOfContents items={toc} /> : null}
            </aside>
          </div>
        </Container>
      </section>
    </>
  )
}
