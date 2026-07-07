import { NextResponse } from "next/server"

import { getImaSourceBySlug } from "@/lib/ima-sources"

export const runtime = "nodejs"

type ImaApiResponse<T> = {
  code?: number
  msg?: string
  data?: T
}

type IMAKnowledgeSearchData = {
  info_list?: {
    media_id?: string
    title?: string
    parent_folder_id?: string
    highlight_content?: string
    media_type?: number
  }[]
}

type IMAMediaInfoData = {
  url_info?: {
    url?: string
  }
}

type SearchItem = {
  media_id?: string
  title?: string
  parent_folder_id?: string
  highlight_content?: string
  media_type?: number
}

type SearchResult = {
  title: string
  sourceName: string
  sourceSlug: string
  mediaType: string
  excerpt: string
  sourceUrl: string
}

const IMA_BASE_URL = "https://ima.qq.com"

const knowledgeBaseIds: Record<string, string> = {
  "wechat-store-rules": "lnjCSbFM0iMtELSpYQg7wAD9hbXX8cA8PE7s346NQh8=",
  "video-channel-ads": "JEJJbbzPGhv-KoUZ6G6-APTDewAVM0mzPxSTG9y4bBA=",
  "wechat-tuike": "hPPISeQLYr3PgSQ3-BbckUOap88X62JsqDudhZOtbo4=",
  "store-violation-cases": "E1brEUZntgvy43c6t3uhuQWGad6hxWNeidzY-g61zSw="
}

function stripMarkup(value = "") {
  return value.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()
}

function mediaTypeLabel(mediaType?: number) {
  const labels: Record<number, string> = {
    1: "PDF",
    2: "网页",
    3: "Word",
    4: "PPT",
    5: "Excel",
    6: "公众号文章",
    7: "Markdown",
    9: "图片",
    11: "笔记",
    13: "文本",
    15: "音频"
  }
  return mediaType ? labels[mediaType] || "资料" : "资料"
}

function normalizeForMatch(value = "") {
  return stripMarkup(value).toLowerCase().replace(/\s+/g, "")
}

function queryTerms(query: string) {
  const dictionary = [
    "微信小店",
    "视频号",
    "直播",
    "微信豆",
    "小店广告",
    "ADQ",
    "投放",
    "推客",
    "佣金",
    "分销",
    "带货计划",
    "违规",
    "申诉",
    "处罚",
    "整改",
    "保证金",
    "开店",
    "入驻",
    "申请",
    "品牌",
    "品牌申请",
    "品牌库",
    "热招品牌",
    "品牌授权",
    "商标",
    "商标注册证",
    "授权书",
    "类目",
    "类目申请",
    "类目资质",
    "类目准入",
    "准入",
    "报白",
    "教育培训",
    "保健食品",
    "膳食营养补充食品",
    "资质",
    "商品上架",
    "商品管理",
    "上架",
    "商品发布",
    "商品信息",
    "场景管理",
    "公告",
    "规则",
    "店铺体验分",
    "优选联盟",
    "电商罗盘",
    "搜索场景",
    "推荐场景"
  ]
  const normalized = normalizeForMatch(query)
  return dictionary.filter((term) => normalized.includes(normalizeForMatch(term)))
}

async function imaPost<T>(path: string, body: unknown): Promise<ImaApiResponse<T>> {
  const clientId = process.env.IMA_OPENAPI_CLIENTID
  const apiKey = process.env.IMA_OPENAPI_APIKEY

  if (!clientId || !apiKey) {
    return { code: -1, msg: "IMA 服务端凭据未配置。" }
  }

  const response = await fetch(`${IMA_BASE_URL}/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "ima-openapi-clientid": clientId,
      "ima-openapi-apikey": apiKey,
      "ima-openapi-ctx": "site=hong-personal-knowledge-site"
    },
    body: JSON.stringify(body),
    cache: "no-store"
  })

  const text = await response.text()
  try {
    return JSON.parse(text) as ImaApiResponse<T>
  } catch {
    return { code: -1, msg: "IMA 返回了不可解析的响应。" }
  }
}

function queryCandidates(query: string) {
  const candidates = [query]

  const terms = queryTerms(query)
  if (terms.length >= 2) {
    candidates.push(terms.slice(0, 4).join(" "))
  }

  if (query.length <= 10) {
    for (const term of terms) {
      candidates.push(term)
    }
  }

  return [...new Set(candidates)]
}

function relevanceScore(item: SearchItem, terms: string[]) {
  if (!terms.length) return 1
  const haystack = normalizeForMatch(`${item.title || ""} ${item.highlight_content || ""}`)
  return terms.reduce((score, term) => score + (haystack.includes(normalizeForMatch(term)) ? 1 : 0), 0)
}

async function getSourceUrl(mediaId?: string) {
  if (!mediaId) return ""

  const response = await imaPost<IMAMediaInfoData>("openapi/wiki/v1/get_media_info", {
    media_id: mediaId
  })

  if (response.code !== 0) return ""
  return response.data?.url_info?.url || ""
}

function compactText(value = "") {
  return stripMarkup(value)
    .replace(/([。！？；])\s+/g, "$1")
    .replace(/\s{2,}/g, " ")
    .slice(0, 240)
}

function pickEvidence(results: SearchResult[]) {
  const seen = new Set<string>()
  return results
    .map((item) => ({
      title: item.title,
      url: item.sourceUrl,
      excerpt: compactText(item.excerpt)
    }))
    .filter((item) => {
      const key = normalizeForMatch(item.title)
      if (!key || seen.has(key)) return false
      seen.add(key)
      return true
    })
    .slice(0, 3)
}

function evidenceTitleText(results: SearchResult[]) {
  return pickEvidence(results)
    .map((item) => item.title)
    .join("、")
}

function answerForQuery(query: string, sourceName: string, results: SearchResult[]) {
  const evidence = pickEvidence(results)
  const normalized = query.toLowerCase()

  if (/品牌申请|申请品牌|热招品牌|品牌库|品牌授权|商标/.test(query)) {
    return {
      title: "品牌申请先判断“品牌是否在库”，再补授权和资质材料",
      summary:
        "你搜的是品牌申请，不是普通商品上架。处理重点是先确认品牌是否已在平台品牌库或热招品牌范围内；如果不在，再按品牌入库/品牌资质流程补商标、授权链路和主体证明。",
      steps: [
        "先在微信小店后台的品牌相关入口检索品牌名称，确认该品牌是否已存在于品牌库、热招品牌或可选择品牌范围内。",
        "如果品牌已在库，按页面要求选择品牌并提交商品或店铺关联；重点核对授权主体、经营主体和商品类目是否一致。",
        "如果品牌不在库，准备品牌申请材料：商标注册证或受理通知书、品牌授权书、授权链路证明、营业执照和联系人信息。",
        "确认授权链路是否完整：商标权利人到当前经营主体之间的每一级授权都要能对应，不要只上传末端授权截图。",
        "提交后关注审核失败原因，常见问题是品牌名不一致、授权期限不覆盖、授权主体不匹配、商标类目与经营类目不一致。"
      ],
      checklist: ["品牌是否在库", "商标注册证/受理通知书", "品牌授权书", "完整授权链路", "主体与类目是否一致"],
      note: `以上按「${sourceName}」命中的品牌申请资料整理。实际入口名称和材料要求以微信小店后台当前页面为准。`,
      evidence
    }
  }

  if (/类目申请|申请类目|类目准入|类目资质|新增类目|开放类目|报白|准入/.test(query)) {
    return {
      title: "类目申请先看准入条件，再按类目补齐专项资质",
      summary:
        "类目申请的核心不是“能不能点提交”，而是这个类目是否开放、主体是否符合准入、专项资质是否齐全。不同类目的材料差异很大，教育培训、食品、保健食品等类目通常会有更细的资质要求。",
      steps: [
        "先确认要经营的商品属于哪个一级/二级/三级类目，不要用相近类目绕开资质要求。",
        "查看该类目是否开放申请，以及是否要求定向准入、平台邀约、报白或特殊资质审核。",
        "按类目准备材料：营业执照经营范围、行业许可证、品牌授权、质检/检测报告、生产或经营许可等。",
        "在后台提交类目申请或新增经营类目，材料名称、主体名称、证件有效期要与店铺主体一致。",
        "审核通过后再上架对应商品；未通过时先对照失败原因补材料，不要直接换类目规避审核。"
      ],
      checklist: ["准确类目路径", "是否开放/定向准入", "营业执照经营范围", "行业许可证", "品牌/检测/生产经营资料"],
      note: `以上按「${sourceName}」命中的类目申请资料整理。具体类目开放状态和资质清单以平台后台最新页面为准。`,
      evidence
    }
  }

  if (/商品上架|商品发布|上架商品|发布商品|商品管理|场景管理/.test(query)) {
    return {
      title: "商品上架按“信息完整、资质合规、场景可用、审核通过”四步走",
      summary:
        "你查到的资料指向商品管理和商品上架场景。实际操作不要只填标题和价格，要先把类目、资质、图文信息、库存履约和可售场景一次性核对清楚，否则后面容易卡在审核、直播挂载或场景曝光。",
      steps: [
        "先确认商品类目和经营资质：选择正确类目，涉及食品、美妆、品牌授权等商品时，提前准备许可证、检测报告或授权材料。",
        "补齐商品基础信息：商品标题、主图、详情图、规格、价格、库存、运费模板、发货时效、售后规则都要完整且一致。",
        "检查商品内容合规：不要使用夸大功效、绝对化用语、违规承诺、与资质不匹配的宣传素材，主图和详情页要能支撑真实履约。",
        "选择商品可用场景：根据业务需要配置小店货架、视频号橱窗、直播间挂载、短视频挂载或推荐/搜索等场景，确认每个场景是否满足平台要求。",
        "提交审核并复查结果：审核通过后再做直播挂载和投放；审核失败时先看失败原因，对应修改类目、资质、素材或商品信息后再提交。"
      ],
      checklist: ["类目是否正确", "资质/授权是否齐全", "标题主图详情是否一致", "价格库存运费是否可履约", "直播/橱窗/搜索等场景是否可用"],
      note: `以上是基于「${sourceName}」命中的商品管理资料整理出的上架路径，最终入口和审核口径以微信小店后台最新页面为准。`,
      evidence
    }
  }

  if (/开店|入驻|申请店铺|开通小店/.test(query)) {
    return {
      title: "开店先按“主体资质 → 类目资质 → 结算账户 → 审核上架”走",
      summary:
        "如果你问的是微信小店怎么开，先不要急着上商品。核心是先确认主体能不能入驻、类目需不需要额外资质，再完成店铺与结算配置。",
      steps: [
        "进入微信小店/视频号小店相关入口，选择开店或入驻申请。",
        "选择经营主体类型，按要求提交营业执照、经营者或法人身份信息。",
        "选择经营类目，涉及食品、美妆、医疗、品牌授权等类目时，补充对应资质或授权文件。",
        "配置店铺基础信息、客服联系方式、结算账户和协议签署。",
        "等待平台审核，通过后再配置商品、运费模板、售后规则和直播/内容挂载路径。"
      ],
      checklist: ["营业执照或主体证明", "法人/经营者身份证明", "结算银行卡或对公账户", "类目资质", "品牌授权或商标资料"],
      note: `以上是基于「${sourceName}」命中的资料整理的操作路径，具体入口名称和类目资质以平台最新页面为准。`,
      evidence
    }
  }

  if (/推客|佣金|带货计划|分销/.test(query)) {
    return {
      title: "推客问题先拆成“计划、佣金、授权、结算”四件事",
      summary: "商家侧重点不是先找人带货，而是先把可推广商品、佣金规则和归因口径配置清楚。",
      steps: [
        "确认商品是否适合开放推客推广，并检查价格、库存、履约和售后是否稳定。",
        "创建或调整带货计划，设置可推广商品、佣金比例、推广时间和生效范围。",
        "明确推客或机构的授权关系，避免重复归因、佣金争议和无效推广。",
        "上线后按成交、退款、佣金支出和推客质量做复盘，淘汰低质量渠道。"
      ],
      checklist: ["可推广商品清单", "佣金比例", "推广周期", "授权范围", "结算和退款口径"],
      note: `结果来自「${sourceName}」的命中资料，建议结合具体商品毛利再决定佣金。`,
      evidence
    }
  }

  if (/微信豆|投放|广告|加热|adq|素材/i.test(normalized)) {
    return {
      title: "投放问题先确定目标，再看素材、转化链路和复盘指标",
      summary: "不要只问“怎么投”。先判断你要拉直播间人气、商品成交、线索还是内容曝光，不同目标对应不同账户、素材和数据口径。",
      steps: [
        "确定投放目标：直播间进入、商品成交、内容加热、线索收集或品牌曝光。",
        "准备素材和落地链路，确认直播间、商品页、小店和客服承接没有断点。",
        "小预算测试不同素材、定向和时段，先看点击、进入、停留、成交和退款。",
        "放量前设置止损线，按 ROI、成交成本、互动质量和复购线索做复盘。"
      ],
      checklist: ["投放目标", "素材版本", "预算和止损线", "商品页/直播间承接", "复盘指标"],
      note: `这是按「${sourceName}」命中资料整理的执行框架，具体投放入口和能力以账户实际开通情况为准。`,
      evidence
    }
  }

  if (/违规|处罚|申诉|整改|封禁|限流/.test(query)) {
    return {
      title: "违规问题先定位规则条款，再做证据、整改和申诉",
      summary: "不要先写申诉理由。先确认违规类型、触发场景和平台引用的规则，再决定是整改、补充资质还是申诉。",
      steps: [
        "记录违规通知里的处罚类型、违规对象、时间和平台引用规则。",
        "对照资料库中的规则原文或案例，确认触发点是商品、内容、直播话术、资质还是履约。",
        "整理证据：商品资质、授权证明、聊天/直播截图、整改前后对比。",
        "先完成可整改项，再按平台申诉入口提交简洁说明和证据材料。"
      ],
      checklist: ["违规通知", "规则条款", "整改截图", "资质/授权证明", "申诉说明"],
      note: `结果基于「${sourceName}」相关规则和案例。涉及处罚时，以平台后台通知和最新规则为准。`,
      evidence
    }
  }

  const evidenceTitles = evidenceTitleText(results)
  return {
    title: "根据命中资料，先确认适用范围，再按后台要求补齐材料和动作",
    summary: evidenceTitles
      ? `这次命中的资料主要是：${evidenceTitles}。建议直接围绕这些资料判断你的问题属于哪一类规则或流程，再按后台要求准备材料、提交或整改。`
      : `我在「${sourceName}」里找到了相关资料。建议先确认这个问题对应的是规则、资质、投放、推客还是违规处理，再按后台要求执行。`,
    steps: [
      "先看命中资料标题和摘要，确认它对应的是申请流程、资质要求、规则限制、运营配置还是违规处理。",
      "把你的实际情况补齐：经营主体、商品/服务类型、类目、品牌、使用场景和当前卡住的后台步骤。",
      "按命中资料里的要求准备材料或修改配置；如果涉及资质和审核，优先处理主体一致性、证件有效期和授权链路。",
      "提交前再检查一次后台页面的必填项和失败原因，避免重复用同一批不合规材料提交。"
    ],
    checklist: ["经营主体", "商品/服务类目", "品牌或授权", "资质材料", "后台当前步骤", "审核失败原因"],
    note: "如果答案还不够准，建议把问题写成具体场景，例如“教育培训类目怎么申请”“品牌不在库怎么办”“食品类目需要哪些资质”。",
    evidence
  }
}

export async function POST(request: Request) {
  let payload: { query?: string; source?: string }
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: "请求格式不正确。" }, { status: 400 })
  }

  const query = (payload.query || "").trim()
  const sourceSlug = (payload.source || "").trim()

  if (query.length < 2) {
    return NextResponse.json({ error: "请输入至少 2 个字再搜索。" }, { status: 400 })
  }

  if (!process.env.IMA_OPENAPI_CLIENTID || !process.env.IMA_OPENAPI_APIKEY) {
    return NextResponse.json({ error: "IMA 服务端凭据未配置，暂时不能查询官方资料。" }, { status: 503 })
  }

  const source = getImaSourceBySlug(sourceSlug)
  const knowledgeBaseId = knowledgeBaseIds[sourceSlug]
  if (!source || !knowledgeBaseId) {
    return NextResponse.json({ error: "未找到对应的官方资料库。" }, { status: 404 })
  }

  try {
    let matchedQuery = query
    let items: NonNullable<IMAKnowledgeSearchData["info_list"]> = []

    for (const candidate of queryCandidates(query)) {
      const response = await imaPost<IMAKnowledgeSearchData>("openapi/wiki/v1/search_knowledge", {
        query: candidate,
        knowledge_base_id: knowledgeBaseId,
        cursor: ""
      })

      if (response.code !== 0) {
        throw new Error(response.msg || `资料库「${source.shortName}」查询失败。`)
      }

      items = response.data?.info_list || []
      if (items.length) {
        matchedQuery = candidate
        break
      }
    }

    const terms = queryTerms(query)
    const filteredItems = items
      .map((item) => ({ item, score: relevanceScore(item, terms) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ item }) => item)

    const visibleItems = terms.length ? filteredItems : items

    const enrichedItems = await Promise.all(
      visibleItems.slice(0, 12).map(async (item) => ({
        ...item,
        sourceUrl: await getSourceUrl(item.media_id)
      }))
    )

    const seen = new Set<string>()
    const results = enrichedItems
      .filter((item) => {
        const key = item.media_id || item.title || ""
        if (!key || seen.has(key)) return false
        seen.add(key)
        return true
      })
      .map((item) => ({
        title: item.title || "未命名资料",
        sourceName: source.shortName,
        sourceSlug: source.slug,
        mediaType: mediaTypeLabel(item.media_type),
        excerpt: stripMarkup(item.highlight_content || ""),
        sourceUrl: item.sourceUrl || ""
      }))

    return NextResponse.json({
      query,
      matchedQuery,
      sourceName: source.shortName,
      count: results.length,
      answer: answerForQuery(query, source.shortName, results),
      results: results.slice(0, 12)
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "IMA 查询失败，请稍后再试。" },
      { status: 502 }
    )
  }
}
