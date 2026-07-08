# hong 个人 IP 知识库官网项目对话记录

更新时间：2026-07-08

## 1. 项目定位

宏要做一个个人 IP 主页，定位是“微信生态 + AI + GEO”领域专家，网站要体现技术与运营结合的专业性。

当前网站不是传统营销落地页，而是个人品牌知识库型官网，核心页面包括：

- 首页
- 文章
- 知识库
- 关于我

当前线上地址：

- Vercel 正式站：https://hong-amber.vercel.app
- GitHub Pages 入口：https://wulh8410.github.io/hong-personal-knowledge-site/
- GitHub 仓库：https://github.com/wulh8410/hong-personal-knowledge-site

GitHub Pages 当前只是静态跳转入口，因为主站依赖 Vercel Serverless API 承载 ima 搜索。

## 2. 技术栈与运行方式

项目技术栈：

- Next.js App Router
- TypeScript
- Tailwind CSS
- Markdown 内容管理
- 静态生成 + 少量 Serverless API

关键脚本：

```bash
npm install
npm run dev
npm run lint
npm run build
```

注意：

- `package.json` 已固定 `dev` 和 `build` 使用 `--webpack`，原因是 Windows 本地环境下 Next.js 16 默认 Turbopack 原生绑定不稳定。
- 本地开发默认用 `npm run dev`。
- 生产部署走 Vercel。

## 3. 仓库关键文件

- `AGENTS.md`：项目工作规则，任何新 Codex 开始前必须先读。
- `MEMORY.md`：项目历史决策、踩坑和进度记录，任何新 Codex 开始前必须先读。
- `app/page.tsx`：首页。
- `app/articles/page.tsx`：文章列表页。
- `app/articles/[slug]/page.tsx`：文章详情页。
- `app/knowledge/page.tsx`：知识库页。
- `app/about/page.tsx`：关于我。
- `app/api/ima/search/route.ts`：ima 知识库搜索服务端接口。
- `lib/markdown.ts`：文章 Markdown 统一渲染和清洗规则。
- `lib/content.ts`：Markdown 内容读取。
- `lib/constants.ts`：知识库、导航、分类等站点配置。
- `content/articles`：站内文章 Markdown。
- `public/images/ip-redesign`：个人 IP 改版后的网页图片素材。
- `design-references/personal-ip-redesign`：设计参考图、知识库二维码源素材、照片裁切记录。

## 4. 设计方向记录

最终视觉方向叫“实战档案馆”：

- 用精密网格表达技术和系统感。
- 用真实项目照片表达运营实战。
- 用编辑部式信息结构表达知识沉淀。
- 颜色体系为墨黑、纸白、微信绿、钴蓝、少量朱红。

明确避免：

- 紫蓝 AI 渐变。
- 悬浮光球。
- 卡片墙。
- 深色区大白底贴片。
- 过度营销感的横幅。

用户多次反馈：

- 页面要专业，但不能像模板站。
- 联系区白色卡片像“膏药”，后续深色区辅助面板要融入暗色体系。
- 字体层级要清晰，不要大大小小混乱。
- 图片不能遮挡人物头部和关键信息。

## 5. 已完成的主要工作

### V1 建站

- 完成 Next.js 项目。
- 完成首页、文章、知识库、关于我基础结构。
- 无复杂后台，内容主要由 Markdown 管理。
- 已部署 Vercel。

### 文章系统

- 已将 `资料/文章集合` 下 58 篇 Markdown 导入 `content/articles`。
- 已按微信小店、视频号、广告投放、微信推客、违规规则及解析、微信公私域联运等分类归档。
- 文章列表页已改为“最新 6 篇 + 按分类分区浏览”。
- 文章详情页已统一成编辑部阅读版式。
- 已支持 `originalUrl` 字段，有飞书原文链接时显示“查看飞书原文”。
- 用户提供的 `C:\Users\xiang\WorkBuddy\2026-07-07-17-38-20\微信小店文章整理.md` 已用于给 51 篇文章补齐飞书原文链接。
- 未匹配文章不强行挂链接。

### 文章渲染清洗

`lib/markdown.ts` 负责统一处理文章导出噪音：

- 删除 `<title>...</title>`。
- 删除泛化一级标题，如“功能介绍”。
- 删除 Markdown/HTML 横向分隔线。
- 修正飞书导出的 `img href`。
- 将正文一级标题降为章节标题。
- 识别独占粗体短句为章节标题。
- 将 `internal-api-drive-stream.feishu.cn` 图片地址规范成图片节点。
- 无法解析的飞书图片地址残留不展示，避免读者看到裸 URL。

### 知识库系统

站点接入 ima：

- 新增 `/api/ima/search`。
- 前端不暴露 `kb_id` / `media_id`。
- 服务端固定映射 4 个知识库，不再运行时按名称搜索。
- 前端已移除“全部官方资料库”。
- 知识库查询改成“答案优先 + 来源追溯”。
- 能拿到网页 URL 的资料显示“查看原文”。
- 拿不到网页 URL 的资料只展示标题和摘要，不展示不可点击提示。

当前已配置的生产环境变量在 Vercel Sensitive 环境变量里：

- `IMA_OPENAPI_CLIENTID`
- `IMA_OPENAPI_APIKEY`

注意：凭据值不要写进仓库、文档或记忆文件。

### 知识库二维码

- 四张 ima 知识库二维码已整理到 `design-references/personal-ip-redesign/knowledge-qr`。
- 网页使用 `public/images/ip-redesign/qr-*-code.png` 的码区裁切图。
- 二维码禁止 AI 重绘、透视变形、有损压缩。
- 知识库页顶部四项可以点击弹出扫码层。

### 图片与页面视觉

主要素材集中在 `public/images/ip-redesign`。

近期重要图片状态：

- 首页首屏商务主视觉：`hero-business-portrait.png`
- 首页“懂技术，也懂运营”现场图：`openclass-2026-talk-desktop.png`
- 关于页“直播实践/系统与商城”证据区左图：`openclass-2026-stage-desktop.png`

最新改动：

- 关于页“直播实践/系统与商城”现场证据区左侧图片已从 `openclass-2026-talk-desktop.png` 改为 `openclass-2026-stage-desktop.png`。

## 6. 当前 Git 状态

当前主分支：

```bash
main
```

远端：

```bash
origin https://github.com/wulh8410/hong-personal-knowledge-site.git
```

最近提交：

```text
38b91fc update about page openclass image
ba1b8d2 clean article image urls and separators
d7ea0b8 replace home talk feature photo
b03d40b remove feature photo top mask
75eca9e polish feature image and timeline typography
```

当前生产部署：

- Vercel alias 到 `https://hong-amber.vercel.app`

## 7. 迁移到新电脑的推荐流程

### 方式 A：从 GitHub 克隆

```bash
git clone https://github.com/wulh8410/hong-personal-knowledge-site.git
cd hong-personal-knowledge-site
npm install
npm run dev
```

验证：

```bash
npm run lint
npm run build
```

### 方式 B：复制整个项目目录

可以直接复制当前目录：

```text
D:\CodxWork\hong
```

复制到新电脑后运行：

```bash
npm install
npm run dev
```

更推荐方式 A，因为 Git 历史、远端和同步关系更清晰。

## 8. 新电脑需要额外处理的东西

### GitHub

新电脑需要登录 GitHub，并确保可以推送到：

```text
https://github.com/wulh8410/hong-personal-knowledge-site
```

验证：

```bash
git remote -v
git status
git pull
```

### Vercel

新电脑如果要部署，需要登录 Vercel：

```bash
npm exec --yes vercel@latest -- login
```

部署命令：

```powershell
$env:HTTP_PROXY='';
$env:HTTPS_PROXY='';
npm exec --yes vercel@latest -- deploy --prod --yes --scope wulh19841020-9594s-projects
```

原因：旧电脑环境里曾有非法代理变量影响 Vercel CLI，清空代理变量更稳。

### ima 凭据

生产环境变量已在 Vercel 配好。新电脑本地如果要调试 ima 搜索，需要自行配置：

- `IMA_OPENAPI_CLIENTID`
- `IMA_OPENAPI_APIKEY`

凭据只在本机环境变量或 Vercel Sensitive 环境变量里配置，不写进仓库。

## 9. 继续开发时的注意事项

- 每次实质工作前必须先读 `AGENTS.md` 和 `MEMORY.md`。
- 新增经验、用户纠正、部署坑、视觉决策，要主动写入 `MEMORY.md`。
- 不要把凭据值写入 `MEMORY.md` 或任何提交文件。
- 文章排版问题优先改 `lib/markdown.ts` 和 `app/globals.css`，不要逐篇手工修，除非是单篇内容事实错误。
- 二维码素材只做等比显示或无损裁切，不用 AI 重绘。
- 生产部署前至少跑 `npm run lint` 和 `npm run build`。

