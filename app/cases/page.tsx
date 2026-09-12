import type { Metadata } from "next"

import { Container } from "@/components/layout/Container"
import { ContentAttribution } from "@/components/content/ContentAttribution"
import { JsonLd } from "@/components/seo/JsonLd"
import { getAllCases } from "@/lib/content"
import { siteConfig } from "@/lib/constants"
import { breadcrumbJsonLd, collectionPageJsonLd } from "@/lib/seo"
import { absoluteUrl } from "@/lib/utils"

export const metadata: Metadata = {
  title: "案例与实践经验",
  description: "查看微信推客 SaaS、小程序商城、微信小店运营、AI 内容工作流等实践经验。",
  alternates: {
    canonical: absoluteUrl("/cases")
  },
  openGraph: {
    title: "案例与实践经验",
    description: "不夸大数据、不暴露客户隐私，记录真实项目类型和交付经验。",
    url: absoluteUrl("/cases")
  }
}

export default function CasesPage() {
  const cases = getAllCases()

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "首页", url: "/" },
          { name: "案例", url: "/cases" }
        ])}
      />
      <JsonLd
        data={collectionPageJsonLd({
          name: "宏的微信生态案例与实践经验",
          description: metadata.description as string,
          path: "/cases",
          items: cases.map((item) => ({ name: item.title, path: `/cases#case-${item.slug}` }))
        })}
      />
      <section className="bg-white py-14">
        <Container>
          <p className="text-sm font-semibold text-wechat">实践经验</p>
          <h1 className="mt-4 text-4xl font-bold text-ink">案例与实践经验</h1>
          <p className="mt-5 max-w-3xl text-lg leading-9 text-slate-600">
            这里展示本人参与项目的脱敏经验总结，不公开客户敏感经营数据，项目结果也不构成普遍效果承诺。
          </p>
          <ContentAttribution className="mt-6" date={siteConfig.lastModified} label="经验整理" note="案例信息已做隐私脱敏" />
        </Container>
      </section>

      <section className="border-y border-line bg-surface py-14">
        <Container>
          <ol className="grid list-none gap-5 md:grid-cols-2 lg:grid-cols-3">
            {cases.map((item) => (
              <li key={item.slug}>
              <article id={`case-${item.slug}`} className="h-full scroll-mt-24 rounded-2xl border border-line bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-wechat">{item.type}</p>
              <h2 className="mt-3 text-xl font-semibold text-ink">{item.title}</h2>
              <div className="mt-5 grid gap-4 text-sm leading-7 text-slate-600">
                <p>
                  <span className="font-semibold text-ink">问题背景：</span>
                  {item.problem}
                </p>
                <p>
                  <span className="font-semibold text-ink">解决方案：</span>
                  {item.solution}
                </p>
              </div>
              <div className="mt-5">
                <h3 className="text-sm font-semibold text-ink">交付内容</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.deliverables.map((deliverable) => (
                    <span key={deliverable} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
                      {deliverable}
                    </span>
                  ))}
                </div>
              </div>
              </article>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  )
}
