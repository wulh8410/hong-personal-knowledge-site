"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { useState } from "react"

import { navItems } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { Container } from "./Container"

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const dark = pathname === "/" || pathname.startsWith("/knowledge") || pathname === "/about"

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b backdrop-blur-xl transition-colors",
        dark ? "border-white/10 bg-ink/90 text-white" : "border-line bg-paper/95 text-ink"
      )}
    >
      <Container className="flex h-[72px] items-center justify-between gap-4">
        <Link href="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <span className="font-mono text-2xl font-bold text-wechat">{"//"}</span>
          <span className="truncate text-sm font-semibold sm:text-base">宏 · 微信生态实战</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative py-2 text-sm font-medium transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-wechat after:transition-transform hover:after:scale-x-100",
                  dark ? "text-white/65 hover:text-white" : "text-ink/65 hover:text-ink",
                  active && "text-wechat after:scale-x-100"
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/about#contact"
            className={cn(
              "hidden h-10 items-center gap-2 border px-5 text-sm font-semibold transition sm:inline-flex",
              dark
                ? "border-white/35 text-white hover:border-wechat hover:text-wechat"
                : "border-ink/25 text-ink hover:border-wechat hover:text-wechat"
            )}
          >
            联系我
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <button
            className={cn(
              "grid h-10 w-10 place-items-center border lg:hidden",
              dark ? "border-white/25 text-white" : "border-ink/20 text-ink"
            )}
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "关闭导航" : "打开导航"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {open ? (
        <div className={cn("border-t lg:hidden", dark ? "border-white/10 bg-ink" : "border-line bg-paper")}>
          <Container className="grid py-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "border-b py-4 text-sm font-medium last:border-b-0",
                  dark ? "border-white/10 text-white/75" : "border-line text-ink/75"
                )}
              >
                {item.label}
              </Link>
            ))}
          </Container>
        </div>
      ) : null}
    </header>
  )
}
