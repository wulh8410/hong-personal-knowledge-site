import { NextResponse } from "next/server"

import { getImaSourceBySlug, imaSources } from "@/lib/ima-sources"

export const runtime = "nodejs"

type ImaApiResponse<T> = {
  code?: number
  msg?: string
  data?: T
}

type IMAKnowledgeBaseSearchData = {
  info_list?: {
    id?: string
    name?: string
    kb_id?: string
    kb_name?: string
  }[]
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

async function resolveKnowledgeBaseId(sourceName: string) {
  const response = await imaPost<IMAKnowledgeBaseSearchData>("openapi/wiki/v1/search_knowledge_base", {
    query: sourceName,
    cursor: "",
    limit: 10
  })

  if (response.code !== 0) {
    throw new Error(response.msg || "无法查询 IMA 知识库。")
  }

  const list = response.data?.info_list || []
  const exact = list.find((item) => (item.kb_name || item.name) === sourceName)
  const target = exact || list[0]
  const id = target?.kb_id || target?.id

  if (!id) {
    throw new Error(`未找到资料库「${sourceName}」。`)
  }

  return id
}

export async function POST(request: Request) {
  let payload: { query?: string; source?: string }
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: "请求格式不正确。" }, { status: 400 })
  }

  const query = (payload.query || "").trim()
  const sourceSlug = (payload.source || "all").trim()

  if (query.length < 2) {
    return NextResponse.json({ error: "请输入至少 2 个字再搜索。" }, { status: 400 })
  }

  if (!process.env.IMA_OPENAPI_CLIENTID || !process.env.IMA_OPENAPI_APIKEY) {
    return NextResponse.json({ error: "IMA 服务端凭据未配置，暂时不能查询官方资料。" }, { status: 503 })
  }

  const targetSources =
    sourceSlug === "all" ? imaSources : getImaSourceBySlug(sourceSlug) ? [getImaSourceBySlug(sourceSlug)!] : []

  if (!targetSources.length) {
    return NextResponse.json({ error: "未找到对应的官方资料库。" }, { status: 404 })
  }

  try {
    const results = []

    for (const source of targetSources) {
      const knowledgeBaseId = await resolveKnowledgeBaseId(source.name)
      const response = await imaPost<IMAKnowledgeSearchData>("openapi/wiki/v1/search_knowledge", {
        query,
        knowledge_base_id: knowledgeBaseId,
        cursor: ""
      })

      if (response.code !== 0) {
        throw new Error(response.msg || `资料库「${source.shortName}」查询失败。`)
      }

      for (const item of response.data?.info_list || []) {
        results.push({
          title: item.title || "未命名资料",
          sourceName: source.shortName,
          sourceSlug: source.slug,
          mediaType: mediaTypeLabel(item.media_type),
          excerpt: stripMarkup(item.highlight_content || "")
        })
      }
    }

    return NextResponse.json({
      query,
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

