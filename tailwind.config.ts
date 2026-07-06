import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0B0F14",
        paper: "#F7F7F2",
        muted: "#646A70",
        line: "#D8DAD6",
        surface: "#F1F2EE",
        wechat: "#07C160",
        cobalt: "#2458D3",
        signal: "#FF5A45"
      },
      fontFamily: {
        sans: [
          "PingFang SC",
          "HarmonyOS Sans",
          "Microsoft YaHei",
          "system-ui",
          "sans-serif"
        ],
        mono: [
          "SFMono-Regular",
          "Cascadia Code",
          "Roboto Mono",
          "Consolas",
          "monospace"
        ]
      },
      boxShadow: {
        soft: "0 20px 60px rgba(11, 15, 20, 0.10)",
        dossier: "0 32px 90px rgba(0, 0, 0, 0.28)"
      }
    }
  },
  plugins: []
}

export default config
