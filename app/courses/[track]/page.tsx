import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, BookOpen, Clock3, FileText, Radio } from "lucide-react"

import { CourseProgress } from "@/components/course/CourseProgress"
import { FieldIndex, SectionLabel } from "@/components/ip/ArchiveUI"
import { Container } from "@/components/layout/Container"
import { courseStatusLabels } from "@/lib/course-data"
import { getCourseTrackBySlug, getCourseTracks } from "@/lib/content"
import { absoluteUrl } from "@/lib/utils"

type PageProps = { params: Promise<{ track: string }> }

export function generateStaticParams() {
  return getCourseTracks().map((track) => ({ track: track.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { track: trackSlug } = await params
  const track = getCourseTrackBySlug(trackSlug)
  if (!track) return {}
  return {
    title: track.title,
    description: track.description,
    alternates: { canonical: absoluteUrl(`/courses/${track.slug}`) }
  }
}

export default async function CourseTrackPage({ params }: PageProps) {
  const { track: trackSlug } = await params
  const track = getCourseTrackBySlug(trackSlug)
  if (!track) notFound()

  return (
    <>
      <section className="archive-grid-dark border-b border-white/10 py-12 text-white sm:py-16 lg:py-20">
        <Container>
          <div className="flex items-start justify-between gap-8">
            <SectionLabel title="课程路径" english="LEARNING ROUTE" dark />
            <FieldIndex current={track.index} total="05" dark />
          </div>
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
            <div>
              <Link href="/courses" className="inline-flex items-center gap-3 text-sm text-white/55 transition hover:text-wechat">
                <ArrowLeft className="h-4 w-4" /> 返回全部课程
              </Link>
              <h1 className="mt-7 max-w-4xl text-[42px] font-semibold leading-[1.12] sm:text-[68px]">{track.title}</h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/62">{track.description}</p>
              <p className="mt-5 border-l-2 border-wechat pl-5 text-sm leading-7 text-white/72">{track.promise}</p>
            </div>
            {track.lessons.length ? (
              <CourseProgress lessonKeys={track.lessons.map((lesson) => `${track.slug}/${lesson.slug}`)} />
            ) : (
              <div className="border border-white/18 p-6">
                <Radio className="h-6 w-6 text-wechat" />
                <p className="mt-5 text-lg font-semibold">课程正在整理</p>
                <p className="mt-3 text-sm leading-7 text-white/52">先把真实培训资料整理完整，再开放学习路径。</p>
              </div>
            )}
          </div>
        </Container>
      </section>

      <section className="paper-texture min-h-[520px] py-14 lg:py-20">
        <Container>
          <div className="grid gap-10 xl:grid-cols-[260px_minmax(0,1fr)]">
            <aside className="border-t-2 border-ink pt-6">
              <p className="font-mono text-[11px] text-cobalt">COURSE DOSSIER / {track.index}</p>
              <h2 className="mt-5 text-xl font-semibold">适合谁学习</h2>
              <p className="mt-3 text-sm leading-7 text-ink/58">{track.audience}</p>
              <div className="mt-8 border-t border-line pt-5">
                <p className="text-xs text-ink/45">课程状态</p>
                <p className="mt-2 text-sm font-semibold text-wechat">{track.planned ? "筹备中" : `${track.lessons.length} 节已上线`}</p>
              </div>
            </aside>

            <div>
              <div className="flex items-end justify-between gap-6 border-b-2 border-ink pb-5">
                <div>
                  <p className="font-mono text-xs text-wechat">SYLLABUS</p>
                  <h2 className="mt-2 text-3xl font-semibold">课程目录</h2>
                </div>
                <BookOpen className="h-7 w-7 text-ink/22" strokeWidth={1.2} />
              </div>

              {track.lessons.length ? (
                <div>
                  {track.lessons.map((lesson, index) => (
                    <Link
                      key={lesson.slug}
                      href={`/courses/${track.slug}/${lesson.slug}`}
                      className="group grid gap-4 border-b border-line py-6 sm:grid-cols-[68px_minmax(0,1fr)_150px_24px] sm:items-center"
                    >
                      <span className="font-mono text-lg text-wechat">{String(index + 1).padStart(2, "0")}</span>
                      <span>
                        <strong className="block text-xl leading-8 transition group-hover:text-wechat">{lesson.title}</strong>
                        <span className="mt-2 block text-sm leading-6 text-ink/50">{lesson.description}</span>
                      </span>
                      <span className="flex flex-wrap gap-3 text-xs text-ink/45">
                        <span className="inline-flex items-center gap-1.5"><FileText className="h-3.5 w-3.5" />{courseStatusLabels[lesson.status]}</span>
                        <span className="inline-flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5" />{lesson.duration}</span>
                      </span>
                      <ArrowRight className="h-4 w-4 text-cobalt transition-transform group-hover:translate-x-1" />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="border-b border-line py-20 text-center">
                  <p className="text-2xl font-semibold">第一批课程资料正在整理</p>
                  <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-ink/55">
                    这里不会先放空标题。等文字稿、信息图和回放至少具备一种有效材料后再上线。
                  </p>
                  <Link href="/courses" className="mt-7 inline-flex items-center gap-3 border-b border-wechat pb-2 text-sm font-semibold text-wechat">
                    查看其他课程 <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
