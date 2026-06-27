import type { Metadata } from "next"

import "./globals.css"

import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { siteConfig } from "@/lib/constants"
import { absoluteUrl } from "@/lib/utils"

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "宏的微信生态实战笔记｜微信小店、微信推客、微信豆投放与 AI 工具知识库",
    template: `%s｜${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  alternates: {
    canonical: absoluteUrl("/")
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: absoluteUrl("/"),
    siteName: siteConfig.name,
    title: "宏的微信生态实战笔记",
    description: siteConfig.description
  }
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body className="font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
