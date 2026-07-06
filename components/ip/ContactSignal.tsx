import Image from "next/image"
import { ArrowRight, UserRound } from "lucide-react"

const channels = [
  {
    label: "公众号",
    value: "宏记",
    description: "获取方法论、案例复盘与更新日志。",
    src: "/images/ip-redesign/social-wechat-official.jpg",
    alt: "公众号宏记二维码"
  },
  {
    label: "视频号",
    value: "吴亮宏",
    description: "直播投放、实战拆解与最新分享。",
    src: "/images/ip-redesign/social-video-account.jpg",
    alt: "视频号吴亮宏二维码"
  },
  {
    label: "微信",
    value: "wulh8410",
    description: "添加后请备注具体问题与合作方向。",
    src: "/images/avatar/hong-wechat-qr.png",
    alt: "宏的个人微信二维码"
  }
]

export function ContactSignal({ compact = false }: { compact?: boolean }) {
  return (
    <section id="contact" className="archive-grid-dark border-y border-white/10 text-white">
      <div className={compact ? "px-5 py-10 sm:px-8" : "mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20"}>
        <div className="flex flex-col gap-5 border-b border-white/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3 text-sm font-semibold">
              <span className="font-mono text-xl font-bold text-wechat">{"//"}</span>
              <span>信号台</span>
              <span className="font-mono text-[10px] font-normal text-white/40">SIGNAL DESK</span>
            </div>
            <h2 className="mt-6 text-3xl font-semibold leading-tight sm:text-4xl">关注公开内容，再来聊具体问题</h2>
          </div>
          <span className="inline-flex items-center gap-2 font-mono text-xs text-white/55">
            <span className="h-2 w-2 rounded-full bg-signal" />
            LIVE
          </span>
        </div>

        <div className="grid gap-8 py-8 lg:grid-cols-[1fr_250px] lg:items-center">
          <div className="grid gap-8 md:grid-cols-3">
            {channels.map((channel) => (
              <article key={channel.label} className="relative border-t border-wechat/75 pt-7">
                <span className="absolute -top-1.5 left-0 h-3 w-3 rounded-full border-2 border-wechat bg-ink" />
                <p className="text-base font-semibold">
                  {channel.label} <span className="mx-2 text-wechat">|</span> {channel.value}
                </p>
                <div className="mt-5 flex items-start gap-4">
                  <div className="relative h-28 w-28 shrink-0 overflow-hidden bg-white p-1">
                    <Image src={channel.src} alt={channel.alt} fill sizes="112px" className="object-contain" />
                  </div>
                  <p className="text-xs leading-6 text-white/58">{channel.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="border-t border-white/15 pt-6 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <UserRound className="h-6 w-6 text-wechat" strokeWidth={1.5} />
            <p className="mt-5 text-sm leading-7 text-white/65">
              交流请备注：
              <br />
              微信生态 <span className="text-wechat">/</span> AI <span className="text-wechat">/</span> 内容资产
            </p>
            <a
              href="weixin://"
              className="mt-7 inline-flex items-center gap-3 border-b border-cobalt pb-2 text-base font-semibold text-cobalt"
            >
              开始交流
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
