"use client"

import Image from "next/image"
import { ScanLine, X } from "lucide-react"
import { useEffect, useState } from "react"

export type KnowledgeQrLibrary = {
  index: string
  name: string
  src: string
}

export function KnowledgeQrList({ libraries }: { libraries: KnowledgeQrLibrary[] }) {
  const [activeLibrary, setActiveLibrary] = useState<KnowledgeQrLibrary | null>(null)

  useEffect(() => {
    if (!activeLibrary) return

    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveLibrary(null)
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [activeLibrary])

  return (
    <>
      <div className="border-t border-white/15">
        {libraries.map((library) => (
          <button
            key={library.index}
            type="button"
            onClick={() => setActiveLibrary(library)}
            aria-haspopup="dialog"
            className="group grid w-full grid-cols-[44px_1fr_auto] items-center gap-4 border-b border-white/12 py-3 text-left transition hover:bg-white/[0.035] sm:py-4"
          >
            <span className="font-mono text-sm text-white/62">{library.index}</span>
            <span className="text-sm leading-6 text-white/76 transition group-hover:text-white">{library.name}</span>
            <span className="inline-flex items-center gap-2 font-mono text-[10px] text-wechat">
              <span className="hidden sm:inline">查看知识码</span>
              <ScanLine className="h-4 w-4" />
            </span>
          </button>
        ))}
      </div>

      {activeLibrary ? (
        <div
          className="fixed inset-0 z-[100] grid place-items-center bg-black/80 p-4 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setActiveLibrary(null)
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="knowledge-qr-title"
            className="w-full max-w-[590px] border border-white/20 bg-[#10151a] p-4 shadow-dossier sm:p-7"
          >
            <div className="flex items-start justify-between gap-5 border-b border-white/12 pb-4">
              <div>
                <p className="font-mono text-[10px] text-wechat">{activeLibrary.index} / VERIFIED SOURCE</p>
                <h2 id="knowledge-qr-title" className="mt-2 pr-3 text-lg font-semibold leading-7 text-white sm:text-xl">
                  {activeLibrary.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setActiveLibrary(null)}
                aria-label="关闭知识码"
                className="grid h-10 w-10 shrink-0 place-items-center border border-white/20 text-white/70 transition hover:border-wechat hover:text-wechat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mx-auto mt-5 aspect-square w-full max-w-[500px] overflow-hidden bg-white">
              <Image
                src={activeLibrary.src}
                alt={`${activeLibrary.name}知识码`}
                width={720}
                height={720}
                unoptimized
                priority
                className="h-full w-full object-contain"
              />
            </div>
            <p className="mt-4 text-center text-sm text-white/58">使用微信或 ima 扫码加入知识库</p>
          </section>
        </div>
      ) : null}
    </>
  )
}
