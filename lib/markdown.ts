import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeSlug from "rehype-slug"
import rehypeStringify from "rehype-stringify"
import remarkGfm from "remark-gfm"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { unified } from "unified"

import type { TocItem } from "./types"
import { slugify } from "./utils"

export async function renderMarkdown(markdown: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "wrap",
      properties: {
        className: ["anchor-heading"]
      }
    })
    .use(rehypeStringify)
    .process(markdown)

  return String(file)
}

export function extractToc(markdown: string): TocItem[] {
  return Array.from(markdown.matchAll(/^(##|###)\s+(.+)$/gm)).map((match) => ({
    level: match[1] === "##" ? 2 : 3,
    text: match[2].trim(),
    id: slugify(match[2])
  }))
}
