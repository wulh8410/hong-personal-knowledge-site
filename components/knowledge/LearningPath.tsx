import Link from "next/link"

import type { KnowledgeBase } from "@/lib/types"

export function LearningPath({ base }: { base: KnowledgeBase }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-ink">新手入门路径</h2>
      <div className="mt-5 grid gap-4">
        {base.learningPath.map((item, index) => (
          <Link
            href={item.href}
            key={`${item.href}-${item.title}`}
            className="grid grid-cols-[2.5rem_1fr] gap-3 rounded-xl border border-line p-4 transition hover:border-wechat hover:bg-emerald-50/40"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-sm font-semibold text-white">
              {index + 1}
            </span>
            <span>
              <span className="block font-medium text-ink">{item.title}</span>
              {item.description ? <span className="mt-1 block text-sm text-slate-500">{item.description}</span> : null}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
