import Image from "next/image"
import Link from "next/link"

import { knowledgeBases, navItems, siteConfig } from "@/lib/constants"
import { Container } from "./Container"

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <Container className="grid gap-8 py-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_220px]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center bg-ink text-sm font-semibold text-white">
              宏
            </span>
            <span className="font-semibold text-ink">{siteConfig.name}</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
            持续整理微信小店、微信推客、小程序商城、微信豆投放、AI 工具与 AI 搜索可见性的实战经验。
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-ink">快速入口</h2>
          <div className="mt-4 grid gap-3">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-slate-600 hover:text-wechat">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-ink">专题知识库</h2>
          <div className="mt-4 grid gap-3">
            {knowledgeBases.slice(0, 5).map((item) => (
              <Link
                key={item.slug}
                href={`/knowledge/${item.slug}`}
                className="text-sm text-slate-600 hover:text-wechat"
              >
                {item.title.replace("知识库", "")}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-ink">加微信交流</h2>
          <div className="mt-4 border border-line bg-white p-2">
            <Image
              src="/images/avatar/hong-wechat-qr.png"
              alt="宏的个人微信二维码"
              width={600}
              height={600}
              className="h-auto w-full"
            />
          </div>
        </div>
      </Container>
      <Container className="border-t border-line py-5 text-xs text-slate-500">
        © 2026 {siteConfig.name}. 持续更新微信生态与 AI 工具实战内容。
      </Container>
    </footer>
  )
}
