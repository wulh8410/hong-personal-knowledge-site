import type { Metadata } from "next"

import { Container } from "@/components/layout/Container"
import { JsonLd } from "@/components/seo/JsonLd"
import { getAllCases } from "@/lib/content"
import { breadcrumbJsonLd } from "@/lib/seo"
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
      <section className="bg-white py-14">
        <Container>
          <p className="text-sm font-semibold text-wechat">Cases</p>
          <h1 className="mt-4 text-4xl font-bold text-ink">案例与实践经验</h1>
          <p className="mt-5 max-w-3xl text-lg leading-9 text-slate-600">
            V1 先展示项目类型和交付经验，不做夸张营销，也不暴露客户隐私。
          </p>
        </Container>
      </section>

      <section className="border-y border-line bg-surface py-14">
        <Container className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((item) => (
            <article key={item.slug} className="rounded-2xl border border-line bg-white p-6 shadow-sm">
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
          ))}
        </Container>
      </section>
    </>
  )
}
