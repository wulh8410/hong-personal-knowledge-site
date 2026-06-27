# 项目记忆

## 项目基础

- 项目名：hong
- 初始化日期：2026-06-27
- 当前目标：开发第一版个人品牌知识库型官网，V1 不做复杂后台。
- 技术栈：Next.js App Router + TypeScript + Tailwind CSS + Markdown 内容管理 + 静态生成。

## 工作规则

- 每次开始实质工作前先读取 `AGENTS.md` 和 `MEMORY.md`。
- 工作中主动记录架构决策、踩坑、用户纠正、外部资源位置。
- 凭据只记录位置，不记录值。

## 本次记录

- 2026-06-27：当前仓库初始只有个人主页开发方案文档，根目录缺少 `AGENTS.md` 和 `MEMORY.md`；因模板目录 `~/.codex/templates/` 不存在，已按用户提供规则创建本地约束文件。
- 2026-06-27：V1 采用无复杂后台方案，文章放在 `content/articles`，案例放在 `content/cases`，知识库配置集中在 `lib/constants.ts`，内容读取集中在 `lib/content.ts`，便于后续替换为 Decap CMS 等 Markdown CMS。
- 2026-06-27：当前 Windows 环境下 Next.js 16 默认 Turbopack 构建缺少可用原生绑定，`package.json` 已将 `dev` 和 `build` 固定为 `--webpack`，避免本地构建失败。
- 2026-06-27：GitHub 私有仓库已创建并推送到 `https://github.com/wulh8410/hong-personal-knowledge-site`；Vercel CLI 可通过 `npm exec --yes vercel@latest -- ...` 使用，但当前机器没有 Vercel 登录缓存，`vercel whoami` 会等待登录导致超时。
- 2026-06-27：用户反馈已登录 Vercel 后，本进程仍未发现 `~/.vercel` 或 `VERCEL_TOKEN`，`vercel whoami` 与 `vercel deploy --prod --yes` 均超时；下一步需要在当前环境完成 Vercel 登录，或临时提供 `VERCEL_TOKEN` 只用于部署命令。
- 2026-06-27：Vercel 生产部署成功，项目 scope 为 `wulh19841020-9594s-projects`，生产域名为 `https://hong-amber.vercel.app`；部署命令需临时清空非法 `HTTP_PROXY`/`HTTPS_PROXY` 环境变量，例如 `$env:HTTP_PROXY=''; $env:HTTPS_PROXY=''; npm exec --yes vercel@latest -- deploy --prod --yes --scope wulh19841020-9594s-projects`。
