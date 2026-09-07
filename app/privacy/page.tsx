import type { Metadata } from "next"

import { SectionLabel } from "@/components/ip/ArchiveUI"
import { Container } from "@/components/layout/Container"
import { absoluteUrl } from "@/lib/utils"

export const metadata: Metadata = {
  title: "隐私说明",
  description: "了解本站在访问、知识库查询和外部链接使用过程中的数据处理方式。",
  alternates: { canonical: absoluteUrl("/privacy") }
}

export default function PrivacyPage() {
  return (
    <article className="paper-texture min-h-[70vh] border-b border-line py-14 lg:py-20">
      <Container className="max-w-4xl">
        <SectionLabel title="隐私说明" english="PRIVACY" />
        <h1 className="mt-8 text-[40px] font-semibold leading-tight sm:text-[56px]">本站如何处理访问与查询信息</h1>
        <p className="mt-5 text-sm text-ink/50">更新日期：<time dateTime="2026-09-08">2026 年 9 月 8 日</time></p>
        <div className="content-body mt-10 border-t-2 border-ink pt-8">
          <h2>普通访问</h2>
          <p>本站目前不提供账号注册，也不主动部署广告追踪脚本。托管平台可能为安全、性能和故障排查记录必要的访问日志，具体处理规则以相应平台的隐私政策为准。</p>
          <h2>知识库查询</h2>
          <p>当你使用知识库查询功能时，输入的问题会发送到本站服务端，并通过 ima OpenAPI 检索对应知识库。请不要在查询框中提交身份证号、联系方式、商业机密或其他敏感信息。</p>
          <h2>外部链接</h2>
          <p>文章、课程和资料来源可能链接到微信、飞书或其他第三方页面。离开本站后的数据处理由对应网站负责。</p>
          <h2>联系与更新</h2>
          <p>如需反馈隐私问题，可通过“关于我”页面公开的微信渠道联系宏。本说明会随站点功能变化更新。</p>
        </div>
      </Container>
    </article>
  )
}
