# 发给新电脑 Codex 的接续提示词

把下面这段完整复制给新电脑上的 Codex：

```text
你现在接手的是宏的个人 IP 知识库官网项目。

项目路径如果已克隆，通常是：
D:\CodxWork\hong

如果还没克隆，请先执行：
git clone https://github.com/wulh8410/hong-personal-knowledge-site.git
cd hong-personal-knowledge-site
npm install

请你开始任何实质工作前，必须先完整读取项目根目录的：
1. AGENTS.md
2. MEMORY.md
3. docs/handoff/project-conversation-record.md

这个项目的基本情况：
- 目标：宏的个人 IP 主页，定位“微信生态 + AI + GEO”领域专家。
- 技术栈：Next.js App Router + TypeScript + Tailwind CSS + Markdown 内容管理 + 静态生成。
- 主分支：main。
- GitHub 仓库：https://github.com/wulh8410/hong-personal-knowledge-site
- 生产站：https://hong-amber.vercel.app
- GitHub Pages 入口：https://wulh8410.github.io/hong-personal-knowledge-site/

当前设计方向是“实战档案馆”：
- 墨黑 / 纸白 / 微信绿 / 钴蓝 / 少量朱红。
- 用精密网格表达技术，用真实项目照片表达运营，用编辑部式结构表达知识沉淀。
- 避免模板感、紫蓝 AI 渐变、悬浮光球、卡片墙和深色区大白底贴片。

关键目录：
- app/page.tsx：首页。
- app/articles/page.tsx：文章列表。
- app/articles/[slug]/page.tsx：文章详情。
- app/knowledge/page.tsx：知识库。
- app/about/page.tsx：关于我。
- app/api/ima/search/route.ts：ima 查询接口。
- lib/markdown.ts：文章 Markdown 统一渲染清洗。
- lib/content.ts：内容读取。
- lib/constants.ts：知识库、分类和站点配置。
- content/articles：文章 Markdown。
- public/images/ip-redesign：网页图片素材。
- design-references/personal-ip-redesign：设计参考、二维码源素材和照片裁切记录。

重要规则：
- 每次工作前先读 AGENTS.md 和 MEMORY.md。
- 工作中学到新东西要主动写回 MEMORY.md。
- 凭据只记位置，不记值。
- 不要把任何 API Key 写入仓库。
- 文章排版问题优先在 lib/markdown.ts 或 app/globals.css 统一解决，不要逐篇手改。
- 二维码素材禁止 AI 重绘，只能无损裁切或等比显示。
- 部署前跑 npm run lint 和 npm run build。

生产部署命令：
powershell 下执行：
$env:HTTP_PROXY='';
$env:HTTPS_PROXY='';
npm exec --yes vercel@latest -- deploy --prod --yes --scope wulh19841020-9594s-projects

ima 搜索依赖环境变量：
- IMA_OPENAPI_CLIENTID
- IMA_OPENAPI_APIKEY

生产环境变量已在 Vercel Sensitive 里配置。新电脑本地如果要调试 ima，需要另行在本机配置，但不要写入仓库。

最新已完成状态：
- 关于页“直播实践/系统与商城”现场证据区左图已改为 public/images/ip-redesign/openclass-2026-stage-desktop.png。
- 文章详情页已统一清理飞书图片地址和横向分隔线，规则在 lib/markdown.ts。
- 最新提交附近包括：
  - 38b91fc update about page openclass image
  - ba1b8d2 clean article image urls and separators

请先执行：
git status
git pull
npm run lint
npm run build

然后根据我的下一条需求继续开发。
```

