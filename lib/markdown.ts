import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeRaw from "rehype-raw"
import rehypeSlug from "rehype-slug"
import rehypeStringify from "rehype-stringify"
import remarkGfm from "remark-gfm"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { unified } from "unified"

import type { TocItem } from "./types"
import { slugify } from "./utils"

function normalizeMarkdown(markdown: string) {
  return markdown
    .replace(/^\s*<title>[\s\S]*?<\/title>\s*/i, "")
    .replace(/^\s*#\s+(功能介绍|目录|正文|文章)\s*/m, "")
    .replace(/^\s*(-{3,}|—{3,}|_{3,}|\*{3,})\s*$/gm, "")
    .replace(/<img\b([^>]*?)\shref=(["'])(.*?)\2([^>]*?)>/gi, '<img$1 src=$2$3$2$4>')
    .replace(/\n{3,}/g, "\n\n")
    .trim()
}

export async function renderMarkdown(markdown: string) {
  const normalized = normalizeMarkdown(markdown)
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "wrap",
      properties: {
        className: ["anchor-heading"]
      }
    })
    .use(rehypeStringify)
    .process(normalized)

  return String(file)
}

export function extractToc(markdown: string): TocItem[] {
  return Array.from(normalizeMarkdown(markdown).matchAll(/^(##|###)\s+(.+)$/gm)).map((match) => ({
    level: match[1] === "##" ? 2 : 3,
    text: match[2].trim(),
    id: slugify(match[2])
  }))
}
