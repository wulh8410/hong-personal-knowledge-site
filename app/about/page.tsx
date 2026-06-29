import type { Metadata } from "next"

import { Container } from "@/components/layout/Container"
import { JsonLd } from "@/components/seo/JsonLd"
import { siteConfig } from "@/lib/constants"
import { breadcrumbJsonLd, personJsonLd } from "@/lib/seo"
import { absoluteUrl } from "@/lib/utils"

export const metadata: Metadata = {
  title: "关于宏",
  description: "了解宏在微信生态电商、微信推客、AI 工具和搜索与 AI 可见性内容资产建设方面的长期实践方向。",
  alternates: {
    canonical: absoluteUrl("/about")
  },
  openGraph: {
    title: `关于宏｜${siteConfig.name}`,
    description: "程序员出身，长期从事互联网和微信生态电商相关项目。",
    url: absoluteUrl("/about")
  }
}

export default function AboutPage() {
  const principles = ["不空谈概念", "不追逐伪风口", "重视规则和平台逻辑", "重视实操和复盘", "重视长期内容资产"]

  return (
    <>
      <JsonLd data={personJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "首页", url: "/" },
          { name: "关于我", url: "/about" }
        ])}
      />
      <section className="bg-white py-14">
        <Container>
          <p className="text-sm font-semibold text-wechat">关于我</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-ink">我是宏，程序员出身，长期做微信生态电商与 AI 工具实战</h1>
          <p className="mt-6 max-w-3xl text-lg leading-9 text-slate-600">
            早期主要做小程序商城、品牌商城系统和企业数字化项目，后来逐步深入微信小店、视频号、微信豆投放、微信推客和 AI 工具应用。
          </p>
        </Container>
      </section>

      <section className="border-y border-line bg-surface py-14">
        <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-2xl font-bold text-ink">个人定位</h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              我关注的不是概念有多新，而是一个工具、一个规则、一个方法，到底能不能帮商家和团队真正拿到结果。
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {["微信小店与视频号直播", "微信推客与机构平台", "小程序商城与私域闭环", "AI 工具与自动化工作流", "搜索与 AI 可见性内容资产", "系统化知识库建设"].map(
              (item) => (
                <div key={item} className="rounded-2xl border border-line bg-white p-5 text-sm font-medium text-ink shadow-sm">
                  {item}
                </div>
              )
            )}
          </div>
        </Container>
      </section>

      <section className="bg-white py-14">
        <Container className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-line p-6">
            <h2 className="text-2xl font-bold text-ink">内容原则</h2>
            <div className="mt-5 grid gap-3">
              {principles.map((item) => (
                <div key={item} className="rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-line p-6">
            <h2 className="text-2xl font-bold text-ink">这个网站会更新什么</h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              这里会持续整理我在微信生态电商、微信推客、AI 工具和搜索与 AI 可见性内容资产建设方面的实战观察。内容会优先服务真实问题：规则怎么理解、工具怎么选、流程怎么跑、经验怎么复用。
            </p>
            <p className="mt-4 text-base leading-8 text-slate-600">
              如果你也在做微信小店、推客、小程序商城，或者想把 AI 用到内容和运营里，可以从首页二维码加微信交流。
            </p>
          </div>
        </Container>
      </section>
    </>
  )
}
