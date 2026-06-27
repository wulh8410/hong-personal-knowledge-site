import Link from "next/link"

import { knowledgeBases, navItems, siteConfig } from "@/lib/constants"
import { Container } from "./Container"

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-white">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-wechat text-sm font-semibold">
              宏
            </span>
            <span className="font-semibold">{siteConfig.name}</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-7 text-slate-300">{siteConfig.description}</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold">快速导航</h2>
          <div className="mt-4 grid gap-3">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-slate-300 hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold">知识库</h2>
          <div className="mt-4 grid gap-3">
            {knowledgeBases.map((item) => (
              <Link
                key={item.slug}
                href={`/knowledge/${item.slug}`}
                className="text-sm text-slate-300 hover:text-white"
              >
                {item.title.replace("知识库", "")}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold">联系与关注</h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">公众号 / 视频号 / 微信二维码占位，可在上线前替换。</p>
          <div className="mt-5 grid h-28 w-28 place-items-center rounded-lg border border-white/15 bg-white/5 text-center text-xs text-slate-400">
            QR
          </div>
        </div>
      </Container>
      <Container className="border-t border-white/10 py-5 text-xs text-slate-400">
        © 2026 {siteConfig.name}. 备案信息占位。
      </Container>
    </footer>
  )
}
