import { getKnowledgeBases } from "@/lib/content"
import { siteConfig } from "@/lib/constants"

export const dynamic = "force-static"

export function GET() {
  const knowledgeLinks = getKnowledgeBases()
    .map((base) => `- [${base.title}](${siteConfig.url}/knowledge/${base.slug}): ${base.shortDescription}`)
    .join("\n")

  const body = `# ${siteConfig.name}

> ${siteConfig.description}

作者：宏。主要领域包括微信小店、视频号直播、微信豆投放、微信推客、AI 工具和 GEO 内容资产。

## 主要页面

- [首页](${siteConfig.url}/): 个人介绍、实践范围、关键问题与近期内容。
- [文章](${siteConfig.url}/articles): 按主题整理的微信生态实战文章。
- [知识库](${siteConfig.url}/knowledge): 官方资料查询与专题知识路径。
- [小课堂](${siteConfig.url}/courses): 由真实培训资料整理的体系化课程。
- [关于宏](${siteConfig.url}/about): 经历、项目范围和联系方式。

## 专题知识库

${knowledgeLinks}

## 来源与使用说明

文章会标注作者、发布日期、更新时间及可公开的原始资料链接。平台规则可能更新，涉及准入、处罚和功能状态时，请以微信官方最新公告为准。

- [隐私说明](${siteConfig.url}/privacy)
- [使用条款](${siteConfig.url}/terms)
`

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  })
}
