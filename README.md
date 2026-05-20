# AntZ Blog Template

一个面向个人博客/知识库的 Astro 模板，强调内容优先、阅读体验和可维护性。

- MD/MDX 内容驱动
- 标签筛选 + 全文搜索
- 文章目录（TOC）
- 响应式布局 + 亮/暗主题
- 开箱可部署到 Cloudflare Pages

## Demo

- 线上示例：[https://antz.top]（替换为你的真实地址）

## 快速开始

```bash
npm install
npm run dev
```

访问 `http://localhost:4321`。

常用命令：

- `npm run dev`：本地开发
- `npm run build`：生产构建到 `dist/`
- `npm run preview`：本地预览构建结果
- `npm run check`：Astro 类型与内容检查

## 内容写作

博客内容目录：`src/content/blog/`

每篇文章使用 `.md` 或 `.mdx`，Frontmatter 字段：

```yaml
---
title: "文章标题"
description: "一句话摘要"
pubDate: 2026-05-21
tags: ["Astro", "Blog"]
cover: "/cover/your-image.jpg"
---
```

其中 `title`、`description`、`pubDate` 为必填。

## 模板自定义

你通常只需要修改这几处：

- 站点布局与导航：`src/layouts/Layout.astro`
- 首页内容：`src/pages/index.astro`
- 联系方式：`src/components/ContactLinks.astro`
- 全局主题变量：`src/styles/global.css`

## Cloudflare Pages 部署

1. 将仓库推送到 GitHub。
2. Cloudflare Pages 连接该仓库。
3. 构建配置：
- Framework preset: `Astro`
- Build command: `npm run build`
- Build output directory: `dist`
4. 在 Pages 环境变量中设置：
- `SITE_URL=https://你的域名`
5. 首次部署成功后绑定自定义域名。

## 发布前检查

```bash
npm run check
npm run build
```

确保以下项目通过：

- 页面可正常访问（首页、博客列表、文章详情）
- 标签筛选和搜索可用
- 移动端样式正常

## 推广你的博客（可直接执行）

### 1) Astro 官方生态

- 提交到 Astro Showcase：`https://astro.build/showcase/`
- 如果后续抽象成通用主题，可提交 Astro Themes：`https://astro.build/themes/`

### 2) 搜索引擎收录

- 上线后在 `public/robots.txt` 把 `Sitemap` 改为真实域名
- 在 Google Search Console 提交 sitemap
- 每篇文章补齐明确标题、摘要、标签

### 3) 社区与社媒分发

首月建议节奏：

- 第 1 周：发布开源介绍（X / 即刻 / 掘金）
- 第 2 周：发布技术拆解文（DEV.to / Reddit `r/astro`、`r/webdev`）
- 第 3~4 周：根据反馈迭代功能并发更新帖

### 4) 转化追踪

- 用 UTM 区分来源渠道
- 追踪指标：UV、文章停留时长、GitHub Star/Fork、部署反馈数

## License

MIT
