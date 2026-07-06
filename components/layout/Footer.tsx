import Link from "next/link"

import { navItems, siteConfig } from "@/lib/constants"
import { Container } from "./Container"

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink text-white">
      <Container className="flex flex-col gap-8 py-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-2xl font-bold text-wechat">{"//"}</span>
            <span className="text-sm font-semibold">宏 · 微信生态实战</span>
          </div>
          <p className="mt-3 max-w-xl text-xs leading-6 text-white/50">
            把技术做成增长，把经验沉淀成知识。持续更新微信生态、AI 工具与 GEO 实战内容。
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-3">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-xs text-white/55 transition hover:text-wechat">
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
      <Container className="border-t border-white/10 py-5 text-center text-xs text-white/42">
        © 2026 {siteConfig.name}
      </Container>
    </footer>
  )
}
