# 新电脑迁移检查清单

## 1. 推荐做法

优先从 GitHub 克隆，不建议只靠压缩包复制：

```bash
git clone https://github.com/wulh8410/hong-personal-knowledge-site.git
cd hong-personal-knowledge-site
npm install
```

## 2. 本地运行

```bash
npm run dev
```

浏览器打开本地地址，通常是：

```text
http://localhost:3000
```

## 3. 基础验证

```bash
npm run lint
npm run build
```

两个都通过，说明项目在新电脑可以继续开发。

## 4. 需要登录的服务

### GitHub

用于拉取、提交、推送代码。

验证：

```bash
git remote -v
git status
git pull
```

### Vercel

用于部署正式站。

```bash
npm exec --yes vercel@latest -- login
```

部署：

```powershell
$env:HTTP_PROXY='';
$env:HTTPS_PROXY='';
npm exec --yes vercel@latest -- deploy --prod --yes --scope wulh19841020-9594s-projects
```

## 5. 环境变量

生产环境已在 Vercel Sensitive 环境变量里配置：

- `IMA_OPENAPI_CLIENTID`
- `IMA_OPENAPI_APIKEY`

新电脑本地如果要测试知识库搜索，需要在本机配置同名环境变量。

不要把凭据值写到：

- `MEMORY.md`
- `AGENTS.md`
- `docs/`
- `.env` 并提交到 Git
- 任何源码文件

## 6. 新 Codex 开始前必须读

让新电脑 Codex 先读：

- `AGENTS.md`
- `MEMORY.md`
- `docs/handoff/project-conversation-record.md`
- `docs/handoff/codex-resume-prompt.md`

然后再继续开发。

