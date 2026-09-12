import Link from "next/link"

import { siteConfig } from "@/lib/constants"
import { cn, formatDate } from "@/lib/utils"

type ContentAttributionProps = {
  label?: string
  date?: string
  note?: string
  dark?: boolean
  className?: string
}

export function ContentAttribution({
  label = "内容整理",
  date = siteConfig.lastModified,
  note,
  dark = false,
  className
}: ContentAttributionProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 border-l-2 border-wechat pl-4 text-xs leading-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5",
        dark ? "text-white/58" : "text-ink/55",
        className
      )}
    >
      <span>
        {label} / <Link href="/about" rel="author" className="font-semibold underline-offset-4 hover:underline">{siteConfig.author}</Link>
      </span>
      <time dateTime={date}>更新 / {formatDate(date)}</time>
      {note ? <span>{note}</span> : null}
    </div>
  )
}
