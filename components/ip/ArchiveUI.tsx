import Link from "next/link"
import { ArrowRight, Crosshair } from "lucide-react"

import { cn } from "@/lib/utils"

export function SectionLabel({
  title,
  english,
  dark = false
}: {
  title: string
  english?: string
  dark?: boolean
}) {
  return (
    <div className={cn("flex items-center gap-3 text-sm font-semibold", dark ? "text-white" : "text-ink")}>
      <span className="font-mono text-xl font-bold text-wechat">{"//"}</span>
      <span>{title}</span>
      {english ? (
        <>
          <span className={dark ? "text-white/25" : "text-ink/25"}>/</span>
          <span className={cn("font-mono text-[11px] font-normal uppercase", dark ? "text-white/45" : "text-ink/45")}>
            {english}
          </span>
        </>
      ) : null}
    </div>
  )
}

export function CoordinateMark({ dark = false }: { dark?: boolean }) {
  return (
    <div className={cn("flex items-center gap-3 font-mono text-[10px] leading-5", dark ? "text-white/45" : "text-ink/45")}>
      <Crosshair className={cn("h-6 w-6", dark ? "text-white/38" : "text-cobalt")} strokeWidth={1.2} />
      <span>
        22°32&apos;N &nbsp;114°03&apos;E
        <br />
        SHENZHEN · CHINA
      </span>
    </div>
  )
}

export function ArchiveLink({
  href,
  children,
  primary = false,
  dark = false,
  className
}: {
  href: string
  children: React.ReactNode
  primary?: boolean
  dark?: boolean
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex h-12 items-center justify-center gap-5 border px-6 text-sm font-semibold transition",
        primary
          ? "border-wechat bg-wechat text-white hover:bg-[#05aa54]"
          : dark
            ? "border-white/28 text-white hover:border-wechat hover:text-wechat"
            : "border-ink/24 text-ink hover:border-cobalt hover:text-cobalt",
        className
      )}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Link>
  )
}

export function FieldIndex({
  current,
  total = "12",
  dark = false
}: {
  current: string
  total?: string
  dark?: boolean
}) {
  return (
    <div className={cn("font-mono text-[10px] leading-5", dark ? "text-white/46" : "text-cobalt")}>
      <span className="text-wechat">{current}</span> / {total}
      <br />
      FIELD DOSSIER
    </div>
  )
}

export function RedNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-3 text-xs text-signal">
      <span className="grid h-5 w-5 place-items-center rounded-full border border-signal">+</span>
      <span>{children}</span>
    </div>
  )
}
