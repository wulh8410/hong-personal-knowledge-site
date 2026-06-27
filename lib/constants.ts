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
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com",
  description:
    "持续整理微信小店、微信推客、小程序商城、微信豆投放、AI 工具与 SEO/GEO 内容资产建设的实战经验。",
  keywords: [
    "微信小店",
    "微信推客",
    "微信豆投放",
    "小程序商城",
    "视频号电商",
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
  { label: "知识库", href: "/knowledge" },
  { label: "文章", href: "/articles" },
  { label: "案例", href: "/cases" },
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
    href: "/knowledge/wechat-ads",
    icon: CircleDollarSign
  },
  {
    title: "小程序与私域",
    description: "围绕商城、会员、导购、企微和私域闭环做系统化规划。",
    keywords: ["小程序商城", "会员体系", "企微", "私域闭环"],
    href: "/knowledge/miniprogram-private-domain",
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
    title: "SEO/GEO 内容增长",
    description: "把个人经验结构化成搜索引擎和 AI 搜索都能理解的内容资产。",
    keywords: ["SEO", "GEO", "结构化数据", "内容资产"],
    href: "/knowledge/seo-geo",
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
    topics: ["微信小店是什么", "商家入驻与类目", "商品发布与价格", "订单售后", "视频号带货", "平台规则避坑"],
    keywords: ["微信小店", "视频号电商", "商家运营", "平台规则"],
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
    slug: "wechat-ads",
    title: "微信豆与投放知识库",
    shortDescription: "区分微信豆、小店广告、ADQ，建立可复盘的投放框架。",
    description:
      "围绕微信豆、小店广告、ADQ 和视频号内容场景，整理投放入口、适用目标、成本结构和复盘方法。",
    icon: "ChartNoAxesCombined",
    topics: ["微信豆是什么", "小店广告适合谁", "ADQ 与微信豆区别", "投放预算", "素材测试", "复盘指标"],
    keywords: ["微信豆", "小店广告", "ADQ", "视频号投放"],
    updated: "2026-06-27",
    learningPath: [
      { title: "微信豆、小店广告和 ADQ 有什么区别？", href: "/articles/wechat-ads-overview" },
      { title: "先按投放目标选入口", href: "/knowledge/wechat-ads" },
      { title: "再建立素材与数据复盘机制", href: "/knowledge/wechat-ads" }
    ],
    faq: [
      {
        question: "微信豆和 ADQ 是同一个东西吗？",
        answer: "不是。微信豆更偏内容场景内的加热工具，ADQ 是更完整的广告投放体系，目标、账户和复盘方式都不同。"
      }
    ]
  },
  {
    slug: "miniprogram-private-domain",
    title: "小程序与私域知识库",
    shortDescription: "用小程序商城、会员和企微承接微信生态流量。",
    description:
      "整理小程序商城、会员体系、企微触达、导购运营和私域闭环的规划方法，关注系统是否真正服务业务。",
    icon: "PanelsTopLeft",
    topics: ["小程序商城规划", "会员体系", "企微承接", "导购运营", "复购路径", "私域数据"],
    keywords: ["小程序商城", "私域", "会员", "企微"],
    updated: "2026-06-27",
    learningPath: [
      { title: "先明确商城承接什么业务", href: "/knowledge/miniprogram-private-domain" },
      { title: "再设计会员和导购触达路径", href: "/knowledge/miniprogram-private-domain" },
      { title: "最后看数据复盘和长期留存", href: "/knowledge/miniprogram-private-domain" }
    ],
    faq: [
      {
        question: "小程序商城一定要做很复杂吗？",
        answer: "不一定。第一版应该先解决商品、订单、会员和触达闭环，复杂营销玩法要等基础数据跑通后再加。"
      }
    ]
  },
  {
    slug: "ai-tools",
    title: "AI 工具实战知识库",
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
    slug: "seo-geo",
    title: "SEO/GEO 知识库",
    shortDescription: "把经验变成搜索引擎和 AI 搜索能理解的结构化资产。",
    description:
      "围绕个人主页、专题内容、结构化数据、内部链接和 AI 搜索可识别性，沉淀 GEO 内容资产建设方法。",
    icon: "SearchCheck",
    topics: ["个人主页 SEO", "GEO 是什么", "结构化数据", "专题页设计", "内容资产", "AI 搜索识别"],
    keywords: ["SEO", "GEO", "结构化数据", "内容资产"],
    updated: "2026-06-27",
    learningPath: [
      { title: "个人主页如何做 GEO？", href: "/articles/geo-personal-site" },
      { title: "先让网站主体和领域清楚", href: "/knowledge/seo-geo" },
      { title: "再用专题页和结构化数据增强识别", href: "/knowledge/seo-geo" }
    ],
    faq: [
      {
        question: "GEO 第一阶段最该做什么？",
        answer: "先把作者、领域、专题和文章关系讲清楚。没有清楚的信息结构，后续再做技术优化也很难被准确理解。"
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
