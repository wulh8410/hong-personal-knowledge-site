"use client"

import { CheckCircle2 } from "lucide-react"
import { useEffect, useMemo, useState } from "react"

import { COURSE_PROGRESS_EVENT, readCourseProgress } from "./progress-storage"

export function CourseProgress({ lessonKeys }: { lessonKeys: string[] }) {
  const [completed, setCompleted] = useState(0)
  const lessonKeyString = lessonKeys.join("|")
  const total = lessonKeys.length
  const percentage = total ? Math.round((completed / total) * 100) : 0

  const keys = useMemo(() => lessonKeyString.split("|").filter(Boolean), [lessonKeyString])

  useEffect(() => {
    const sync = () => {
      const progress = readCourseProgress()
      setCompleted(keys.filter((key) => progress.has(key)).length)
    }
    sync()
    window.addEventListener(COURSE_PROGRESS_EVENT, sync)
    window.addEventListener("storage", sync)
    return () => {
      window.removeEventListener(COURSE_PROGRESS_EVENT, sync)
      window.removeEventListener("storage", sync)
    }
  }, [keys])

  return (
    <div className="border border-line bg-white p-5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-wechat" />
          <span className="text-sm font-semibold">学习进度</span>
        </div>
        <span className="font-mono text-sm text-ink/55">
          <strong className="text-xl text-wechat">{completed}</strong> / {total}
        </span>
      </div>
      <div className="mt-4 h-1 bg-line">
        <div className="h-full bg-wechat transition-[width] duration-500" style={{ width: `${percentage}%` }} />
      </div>
      <p className="mt-3 text-xs leading-6 text-ink/48">进度只保存在当前浏览器，不需要登录。</p>
    </div>
  )
}
