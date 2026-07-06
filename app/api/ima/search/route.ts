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
  const rules: [RegExp, string][] = [
    [/微信豆/, "微信豆"],
    [/加热/, "加热"],
    [/投放|广告|ADQ/i, "投放"],
    [/推客|佣金|分销|带货计划/, "推客"],
    [/违规|处罚|申诉|整改/, "违规"],
    [/公告/, "公告"],
    [/规则|保证金|开店|类目|准入|变化/, "规则"]
  ]

  for (const [pattern, keyword] of rules) {
    if (pattern.test(query)) candidates.push(keyword)
  }

  return [...new Set(candidates)]
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

    const seen = new Set<string>()
    const results = items
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
        excerpt: stripMarkup(item.highlight_content || "")
      }))

    return NextResponse.json({
      query,
      matchedQuery,
      sourceName: source.shortName,
      count: results.length,
      results: results.slice(0, 12)
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "IMA 查询失败，请稍后再试。" },
      { status: 502 }
    )
  }
}
