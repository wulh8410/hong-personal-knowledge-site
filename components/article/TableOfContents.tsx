import type { TocItem } from "@/lib/types"

export function TableOfContents({ items }: { items: TocItem[] }) {
  if (!items.length) return null

  return (
    <aside className="hidden xl:block">
      <div className="sticky top-24 border-t-2 border-wechat bg-paper px-5 py-6">
        <p className="font-mono text-[10px] text-wechat">ARTICLE INDEX</p>
        <h2 className="mt-2 text-sm font-semibold text-ink">本文要点</h2>
        <nav className="mt-5 grid gap-3 border-t border-line pt-4">
          {items.map((item) => (
            <a
              key={`${item.id}-${item.text}`}
              href={`#${item.id}`}
              className={`border-l border-line text-sm leading-6 text-ink/52 transition hover:border-wechat hover:text-wechat ${
                item.level === 3 ? "pl-6" : "pl-3"
              }`}
            >
              {item.text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  )
}
