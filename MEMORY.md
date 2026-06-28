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
- 2026-06-27：首页 V2 重设计方向：采用深色技术感首屏、真实商务照、紧凑能力矩阵、知识库暗色专题区、精选文章、项目经验和微信二维码联系区；移动端隐藏首屏证明卡片以避免过长，保证首屏能看到个人照且无横向溢出。
- 2026-06-28：首页 V3 设计决策：用户明确否定 V2 的深色横幅广告感、零散底部和英文标签；新版改为轻色中文优先首屏，直接说明“帮商家和团队看懂微信生态”，用“我能提供什么”“建议阅读路径”“专题知识库”“联系宏”串起服务价值，底部使用真实微信二维码，二级页可见英文眉标和占位文案同步清理。
- 2026-06-28：ima 技能已安装到本机 `C:\Users\xiang\.codex\skills\ima-skill`，下载源为腾讯 ima 技能包；ima API 凭据需要 `IMA_OPENAPI_CLIENTID` 与 `IMA_OPENAPI_APIKEY` 或 `~/.config/ima/client_id`、`~/.config/ima/api_key`，项目仓库不记录凭据值。当前网站接入思路：ima 作为官方公告、规则、案例的权威资料层和查询层，站内 Markdown 知识库作为宏的解释、路径和方法论层，不直接复制 ima 原始资料到静态页面。
- 2026-06-28：站点已实现 ima 接入 V1.2：新增服务端接口 `/api/ima/search`，前端只展示资料库名称、标题、摘要和媒体类型，不暴露 `kb_id`/`media_id`；首页放轻量官方资料入口，`/knowledge` 和相关专题页提供查询组件。Vercel Production 已配置 `IMA_OPENAPI_CLIENTID` 与 `IMA_OPENAPI_APIKEY` 为 Sensitive 环境变量，凭据值不写入仓库或记忆。
