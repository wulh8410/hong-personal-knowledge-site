export type ImaSource = {
  slug: string
  name: string
  shortName: string
  description: string
  topicSlugs: string[]
  suggestedQuestions: string[]
}

export const imaSources: ImaSource[] = [
  {
    slug: "wechat-store-rules",
    name: "微信小店官方公告与规则知识库",
    shortName: "小店官方规则",
    description: "用于查询微信小店官方公告、平台规则、商家经营边界和规则变化。",
    topicSlugs: ["wechat-store"],
    suggestedQuestions: ["微信小店最近有哪些规则变化？", "商家最容易忽略哪些平台规则？", "新商家开店前应该先看哪些公告？"]
  },
  {
    slug: "wechat-tuike",
    name: "微信推客知识库",
    shortName: "微信推客资料",
    description: "用于查询微信推客规则、推客带货激励、佣金机制、授权和机构运营资料。",
    topicSlugs: ["wechat-tuike"],
    suggestedQuestions: ["微信推客佣金机制怎么理解？", "商家如何设置推客带货计划？", "推客机构适合从哪里开始搭建？"]
  },
  {
    slug: "video-channel-ads",
    name: "视频号投放大全",
    shortName: "视频号投放",
    description: "用于查询视频号投放入口、投放目标、素材测试、复盘指标和常见投放问题。",
    topicSlugs: ["ad-traffic"],
    suggestedQuestions: ["视频号投放适合哪些目标？", "微信豆和小店广告应该怎么区分？", "投放素材测试应该先看哪些指标？"]
  },
  {
    slug: "store-violation-cases",
    name: "微信小店视频号违规规则及案例大全",
    shortName: "违规规则案例",
    description: "用于查询微信小店和视频号常见违规规则、案例、处罚原因和整改方向。",
    topicSlugs: ["wechat-store", "ad-traffic", "store-live-violations"],
    suggestedQuestions: ["商品违规常见原因是什么？", "视频号带货哪些行为容易违规？", "被判违规后应该先查哪些规则？"]
  }
]

export function getImaSourcesForKnowledge(slug: string) {
  return imaSources.filter((source) => source.topicSlugs.includes(slug))
}

export function getImaSourceBySlug(slug: string) {
  return imaSources.find((source) => source.slug === slug)
}
