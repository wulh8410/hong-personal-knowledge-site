"use client"

import { Check } from "lucide-react"
import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"
import { COURSE_PROGRESS_EVENT, readCourseProgress, writeCourseProgress } from "./progress-storage"

export function LessonCompleteButton({ lessonKey }: { lessonKey: string }) {
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    const sync = () => setCompleted(readCourseProgress().has(lessonKey))
    sync()
    window.addEventListener(COURSE_PROGRESS_EVENT, sync)
    return () => window.removeEventListener(COURSE_PROGRESS_EVENT, sync)
  }, [lessonKey])

  function toggleCompleted() {
    const progress = readCourseProgress()
    if (progress.has(lessonKey)) progress.delete(lessonKey)
    else progress.add(lessonKey)
    writeCourseProgress(progress)
  }

  return (
    <button
      type="button"
      onClick={toggleCompleted}
      aria-pressed={completed}
      className={cn(
        "group flex min-h-14 w-full items-center justify-between border px-4 text-left text-sm font-semibold transition",
        completed
          ? "border-wechat bg-wechat text-white"
          : "border-line bg-white text-ink hover:border-wechat hover:text-wechat"
      )}
    >
      <span>{completed ? "已完成本课" : "标记为已完成"}</span>
      <span
        className={cn(
          "grid h-7 w-7 place-items-center border transition",
          completed ? "border-white/55" : "border-line group-hover:border-wechat"
        )}
      >
        <Check className={cn("h-4 w-4", completed ? "opacity-100" : "opacity-25")} />
      </span>
    </button>
  )
}
