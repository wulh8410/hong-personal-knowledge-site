import {
  Bot,
  Building2,
  ChartNoAxesCombined,
  CircleDollarSign,
  PanelsTopLeft,
  SearchCheck,
  Store,
  UsersRound
} from "lucide-react"

import type { KnowledgeBase } from "./types"

export const siteConfig = {
  name: "宏的微信生态实战笔记",
  author: "宏",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://hong-amber.vercel.app",
  description:
    "持续整理微信小店、微信推客、小程序商城、微信豆投放、AI 工具与搜索和 AI 可见性内容资产建设的实战经验。",
  keywords: [
    "微信小店",
    "微信推客",
    "微信豆投放",
    "小程序商城",
    "视频号直播",
    "AI工具",
    "Codex",
    "WorkBuddy",
    "Marvis",
    "SEO",
    "GEO",
    "微信生态"
  ]
}

export const navItems = [
  { label: "首页", href: "/" },
  { label: "文章", href: "/articles" },
  { label: "知识库", href: "/knowledge" },
  { label: "关于我", href: "/about" }
]

export const abilityItems = [
  {
    title: "微信小店",
    description: "梳理小店规则、商品、交易、售后和商家运营中的关键判断。",
    keywords: ["入驻规则", "商品运营", "售后机制", "平台治理"],
    href: "/knowledge/wechat-store",
    icon: Store
  },
  {
    title: "微信推客",
    description: "拆解推客规则、个人玩法、机构平台搭建和商家运营路径。",
    keywords: ["机构平台", "佣金机制", "直播授权", "短视频授权"],
    href: "/knowledge/wechat-tuike",
    icon: UsersRound
  },
  {
    title: "微信豆与投放",
    description: "理解微信豆、小店广告与 ADQ 的差异，搭建更清楚的投放框架。",
    keywords: ["微信豆", "小店广告", "ADQ", "投放复盘"],
    href: "/knowledge/ad-traffic",
    icon: CircleDollarSign
  },
  {
    title: "小程序与私域",
    description: "围绕商城、会员、导购、企微和私域闭环做系统化规划。",
    keywords: ["小程序商城", "会员体系", "企微", "私域闭环"],
    href: "/knowledge/public-private-domain",
    icon: PanelsTopLeft
  },
  {
    title: "AI 工具实战",
    description: "把 Codex、WorkBuddy、Marvis 等工具用于内容、开发和运营流程。",
    keywords: ["Agent", "Codex", "内容生产", "自动化"],
    href: "/knowledge/ai-tools",
    icon: Bot
  },
  {
    title: "搜索与 AI 可见性内容增长",
    description: "把个人经验结构化成搜索引擎和 AI 搜索都能理解的内容资产。",
    keywords: ["SEO", "GEO", "结构化数据", "内容资产"],
    href: "/knowledge/geo",
    icon: SearchCheck
  }
]

export const knowledgeBases: KnowledgeBase[] = [
  {
    slug: "wechat-store",
    title: "微信小店知识库",
    shortDescription: "从规则、商品、交易到商家运营，系统理解微信小店。",
    description:
      "系统整理微信小店入驻、商品、交易、售后、内容场景和商家运营中的核心问题，帮助商家先建立规则感，再做动作。",
    icon: "Store",
    topics: ["微信小店是什么", "商家入驻与类目", "商品发布与价格", "订单售后", "直播带货承接", "平台规则避坑"],
    keywords: ["微信小店", "视频号直播", "商家运营", "平台规则"],
    updated: "2026-06-27",
    learningPath: [
      { title: "先理解微信小店的交易闭环", href: "/articles/wechat-store-basic" },
      { title: "再看商品、售后和平台治理规则", href: "/knowledge/wechat-store" },
      { title: "最后结合内容场景做运营动作", href: "/knowledge/wechat-store" }
    ],
    faq: [
      {
        question: "微信小店适合所有商家吗？",
        answer: "不适合无货源、无服务能力或只想短期套利的商家。它更适合愿意长期经营内容场景和交易闭环的团队。"
      }
    ]
  },
  {
    slug: "video-account",
    title: "视频号知识库",
    shortDescription: "围绕视频号内容、直播、带货和账号经营，建立系统判断。",
    description:
      "整理视频号账号定位、直播间运营、内容分发、商品承接和复盘方法，帮助团队把直播从单场动作变成长期经营能力。",
    icon: "ChartNoAxesCombined",
    topics: ["账号定位", "直播间运营", "短视频内容", "带货承接", "数据复盘", "团队协作"],
    keywords: ["视频号", "视频号直播", "直播带货", "账号运营"],
    updated: "2026-06-29",
    learningPath: [
      { title: "先明确账号和直播间承担的业务角色", href: "/knowledge/video-account" },
      { title: "再拆直播脚本、货盘和投流配合", href: "/knowledge/video-account" },
      { title: "最后用数据复盘沉淀可复制动作", href: "/knowledge/video-account" }
    ],
    faq: [
      {
        question: "视频号直播只看单场 GMV 吗？",
        answer: "不应该只看单场 GMV。直播间还承担内容测试、粉丝关系、商品教育和私域承接，复盘要同时看交易和长期资产。"
      }
    ]
  },
  {
    slug: "ad-traffic",
    title: "广告投放知识库",
    shortDescription: "把微信豆、小店广告和 ADQ 放到同一套投放框架里理解。",
    description:
      "围绕微信生态投放入口、预算分配、素材测试、转化目标和复盘指标，整理适合商家和直播团队的投放判断方法。",
    icon: "CircleDollarSign",
    topics: ["微信豆", "小店广告", "ADQ", "直播间加热", "素材测试", "投放复盘"],
    keywords: ["广告投放", "微信豆", "小店广告", "ADQ"],
    updated: "2026-06-29",
    learningPath: [
      { title: "微信豆、小店广告和 ADQ 有什么区别？", href: "/articles/wechat-ads-overview" },
      { title: "先按投放目标选入口", href: "/knowledge/ad-traffic" },
      { title: "再建立素材与数据复盘机制", href: "/knowledge/ad-traffic" }
    ],
    faq: [
      {
        question: "投放第一步应该先加预算吗？",
        answer: "不建议。第一步应该先确认目标、素材、承接页和数据口径，否则预算越大，错误也会被放大。"
      }
    ]
  },
  {
    slug: "wechat-tuike",
    title: "微信推客知识库",
    shortDescription: "拆解推客规则、个人玩法、机构平台和商家运营路径。",
    description:
      "系统整理微信推客的规则、玩法、机构平台搭建、商家运营和普通人入场路径，避免只看佣金不看场景。",
    icon: "UsersRound",
    topics: ["微信推客是什么", "个人推客怎么做", "机构平台怎么搭", "商家佣金怎么设", "直播/短视频授权", "选品与避坑"],
    keywords: ["微信推客", "推客机构", "佣金", "私域分销"],
    updated: "2026-06-27",
    learningPath: [
      { title: "微信推客是什么？", href: "/articles/wechat-tuike-guide" },
      { title: "普通人怎么做微信推客？", href: "/articles/wechat-tuike-guide" },
      { title: "商家怎么设置推客佣金？", href: "/knowledge/wechat-tuike" },
      { title: "推客机构平台怎么搭建？", href: "/knowledge/wechat-tuike" },
      { title: "推客选品与避坑指南", href: "/knowledge/wechat-tuike" }
    ],
    faq: [
      {
        question: "微信推客适合普通人吗？",
        answer: "适合，但前提是理解选品、触达场景和佣金机制，不建议只靠盲目转发商品链接。"
      }
    ]
  },
  {
    slug: "store-live-violations",
    title: "微信小店&直播违规规则及解析",
    shortDescription: "把常见违规、处罚原因和整改路径整理成可查询规则库。",
    description:
      "围绕微信小店和视频号直播中的商品、内容、营销、履约和售后违规场景，整理规则原意、典型案例和整改方向。",
    icon: "ShieldCheck",
    topics: ["商品违规", "直播违规", "虚假宣传", "价格规则", "履约售后", "整改复盘"],
    keywords: ["微信小店违规", "视频号直播违规", "平台规则", "案例解析"],
    updated: "2026-06-29",
    learningPath: [
      { title: "先查官方规则和处罚案例", href: "/knowledge#ima-search" },
      { title: "再判断违规发生在哪个业务环节", href: "/knowledge/store-live-violations" },
      { title: "最后形成商品、直播和售后的预防清单", href: "/knowledge/store-live-violations" }
    ],
    faq: [
      {
        question: "违规规则为什么要单独做知识库？",
        answer: "因为违规往往不是单个动作的问题，而是商品、直播话术、营销承诺和履约流程共同造成的，需要按场景复盘。"
      }
    ]
  },
  {
    slug: "ai-tools",
    title: "AI工具实战知识库",
    shortDescription: "把 AI 工具用于内容、开发、运营和知识库维护。",
    description:
      "记录 Codex、WorkBuddy、Marvis、Agent 工作流在内容生产、代码开发、资料整理和业务自动化中的真实用法。",
    icon: "Bot",
    topics: ["Codex 开发", "Agent 工作流", "内容生产", "自动化脚本", "知识库维护", "提示词复用"],
    keywords: ["AI 工具", "Codex", "Agent", "自动化"],
    updated: "2026-06-27",
    learningPath: [
      { title: "AI 工具如何提升内容生产效率？", href: "/articles/ai-tools-workflow" },
      { title: "把重复三遍的流程整理成工作流", href: "/knowledge/ai-tools" },
      { title: "再考虑自动化和工具封装", href: "/knowledge/ai-tools" }
    ],
    faq: [
      {
        question: "AI 工具先学哪个？",
        answer: "先从最常重复的工作开始，不要按工具热度排序。能马上节省时间的流程，才值得优先 AI 化。"
      }
    ]
  },
  {
    slug: "geo",
    title: "GEO实战探索",
    shortDescription: "探索让内容被搜索引擎和 AI 搜索更准确理解的方法。",
    description:
      "围绕个人主页、专题内容、结构化数据、内部链接和 AI 搜索可识别性，沉淀 GEO 内容资产建设方法。",
    icon: "SearchCheck",
    topics: ["GEO", "AI 搜索可见性", "结构化数据", "专题页设计", "内容资产", "品牌实体"],
    keywords: ["GEO", "AI 搜索", "结构化数据", "内容资产"],
    updated: "2026-06-27",
    learningPath: [
      { title: "个人主页如何做 GEO？", href: "/articles/geo-personal-site" },
      { title: "先让网站主体和领域清楚", href: "/knowledge/geo" },
      { title: "再用专题页和结构化数据增强识别", href: "/knowledge/geo" }
    ],
    faq: [
      {
        question: "GEO 第一阶段最该做什么？",
        answer: "先把作者、领域、专题和文章关系讲清楚。没有清楚的信息结构，后续再做技术优化也很难被准确理解。"
      }
    ]
  },
  {
    slug: "public-private-domain",
    title: "微信公私域联运知识库",
    shortDescription: "用小程序、企微、公众号、视频号和社群承接微信生态流量。",
    description:
      "整理公众号、视频号、小程序商城、企微、社群和会员体系之间的协作方式，关注公域获客与私域复购如何联动。",
    icon: "PanelsTopLeft",
    topics: ["公众号", "视频号", "小程序商城", "企微承接", "社群运营", "会员复购"],
    keywords: ["微信公域", "私域", "小程序商城", "企微"],
    updated: "2026-06-27",
    learningPath: [
      { title: "先明确公域入口和私域承接关系", href: "/knowledge/public-private-domain" },
      { title: "再设计会员、导购和企微触达路径", href: "/knowledge/public-private-domain" },
      { title: "最后看复购、留存和内容资产沉淀", href: "/knowledge/public-private-domain" }
    ],
    faq: [
      {
        question: "公私域联运第一版要做多复杂？",
        answer: "第一版不应该复杂。先跑通内容触达、交易承接、企微沉淀和复购提醒，再逐步补自动化和数据分析。"
      }
    ]
  }
]

export const caseTypes = [
  {
    title: "微信推客 SaaS 系统交付与共创",
    icon: Building2
  },
  {
    title: "小程序商城搭建与代运营",
    icon: Store
  },
  {
    title: "微信小店与视频号相关运营项目",
    icon: ChartNoAxesCombined
  },
  {
    title: "AI 内容与知识库工作流搭建",
    icon: Bot
  }
]
