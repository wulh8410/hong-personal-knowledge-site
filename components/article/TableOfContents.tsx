import type { TocItem } from "@/lib/types"

export function TableOfContents({ items }: { items: TocItem[] }) {
  if (!items.length) return null

  return (
    <aside className="hidden xl:block">
      <div className="sticky top-24 rounded-2xl border border-line bg-white p-5">
        <h2 className="text-sm font-semibold text-ink">目录</h2>
        <nav className="mt-4 grid gap-2">
          {items.map((item) => (
            <a
              key={`${item.id}-${item.text}`}
              href={`#${item.id}`}
              className="text-sm leading-6 text-slate-500 hover:text-wechat"
              style={{ paddingLeft: item.level === 3 ? 12 : 0 }}
            >
              {item.text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  )
}
