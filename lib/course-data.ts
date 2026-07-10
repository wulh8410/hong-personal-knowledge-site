import type { CourseTrack } from "./types"

export const courseTrackDefinitions: Omit<CourseTrack, "lessons">[] = [
  {
    slug: "wechat-store",
    title: "微信小店经营课",
    shortTitle: "微信小店",
    description: "从平台机会、营销能力到店铺体验与联盟经营，建立一套完整的小店经营判断。",
    promise: "学完后，你能把规则、工具和增长动作放进同一张经营地图。",
    audience: "适合微信小店商家、运营负责人和正在搭建小店业务的团队",
    index: "01",
    color: "green"
  },
  {
    slug: "ad-traffic",
    title: "微信生态广告投放课",
    shortTitle: "广告投放",
    description: "依次掌握小店广告、微信豆与 ADQ，把验证、放大和规模化投放连接起来。",
    promise: "先判断该用什么投，再学习怎么投，减少预算花在错误阶段。",
    audience: "适合商家老板、直播团队和微信生态投放从业者",
    index: "02",
    color: "blue"
  },
  {
    slug: "wechat-tuike",
    title: "微信推客实战课",
    shortTitle: "微信推客",
    description: "理解推客平台、商家、机构与推客之间的协作关系，建立可持续的运营机制。",
    promise: "先把平台和分工看清楚，再决定如何搭建与运营。",
    audience: "适合推客机构、SaaS 团队、商家和私域运营者",
    index: "03",
    color: "red"
  },
  {
    slug: "live-video",
    title: "视频号直播实战课",
    shortTitle: "视频号直播",
    description: "围绕直播定位、货盘、脚本、投流和复盘，沉淀可以重复使用的直播方法。",
    promise: "课程资料正在整理，首版不展示虚构课时。",
    audience: "适合品牌直播团队、操盘手和直播运营负责人",
    index: "04",
    color: "amber",
    planned: true
  },
  {
    slug: "short-video",
    title: "视频号短视频实战课",
    shortTitle: "视频号短视频",
    description: "从内容策划、素材生产到 AI 打品，探索短视频如何服务商品与业务增长。",
    promise: "先从一节真实回放课开始，后续持续补齐完整路径。",
    audience: "适合短视频运营、商家内容团队和 AI 内容实践者",
    index: "05",
    color: "violet"
  }
]

export const courseStatusLabels = {
  complete: "完整课",
  text: "图文课",
  video: "回放课"
} as const
