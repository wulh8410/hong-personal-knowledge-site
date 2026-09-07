import type { Metadata } from "next"

import { SectionLabel } from "@/components/ip/ArchiveUI"
import { Container } from "@/components/layout/Container"
import { absoluteUrl } from "@/lib/utils"

export const metadata: Metadata = {
  title: "使用条款",
  description: "本站内容来源、适用边界、转载和外部链接说明。",
  alternates: { canonical: absoluteUrl("/terms") }
}

export default function TermsPage() {
  return (
    <article className="paper-texture min-h-[70vh] border-b border-line py-14 lg:py-20">
      <Container className="max-w-4xl">
        <SectionLabel title="使用条款" english="TERMS" />
        <h1 className="mt-8 text-[40px] font-semibold leading-tight sm:text-[56px]">内容可以参考，但要结合最新规则判断</h1>
        <p className="mt-5 text-sm text-ink/50">更新日期：<time dateTime="2026-09-08">2026 年 9 月 8 日</time></p>
        <div className="content-body mt-10 border-t-2 border-ink pt-8">
          <h2>内容用途</h2>
          <p>本站内容用于分享微信生态、AI 工具和 GEO 实践经验，不构成法律、财务或平台审核承诺。平台规则和产品能力会变化，执行前应核对官方最新公告。</p>
          <h2>来源与署名</h2>
          <p>文章和课程尽量标注作者、更新时间与可公开来源。引用第三方资料时，相关权利归原作者或发布平台所有。</p>
          <h2>转载与使用</h2>
          <p>未经许可，不得批量复制、售卖或冒用本站原创内容。合理引用请注明作者“宏”并链接到对应原文页面。</p>
          <h2>外部服务</h2>
          <p>本站提供的微信、飞书、ima 等外部链接和查询能力由第三方服务支持，其可用性与内容准确性可能随平台变化。</p>
        </div>
      </Container>
    </article>
  )
}
