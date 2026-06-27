import Link from "next/link"

import { Container } from "@/components/layout/Container"

export default function NotFound() {
  return (
    <section className="bg-white py-24">
      <Container className="text-center">
        <p className="text-sm font-semibold text-wechat">404</p>
        <h1 className="mt-4 text-4xl font-bold text-ink">页面不存在</h1>
        <p className="mt-5 text-slate-600">这个链接暂时没有对应内容，可以回到知识库或文章列表继续阅读。</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/knowledge" className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white">
            知识库
          </Link>
          <Link href="/articles" className="rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink">
            文章列表
          </Link>
        </div>
      </Container>
    </section>
  )
}
