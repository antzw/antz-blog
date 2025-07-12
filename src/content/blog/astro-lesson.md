---
title: Astro搭建自己的博客教学
description: 从0开始一步一步写一个自己的博客网站
pubDate: 2025-07-13
cover: /cover/astro.png
tags: ["astro", "建站", "blog","教学"]
---

# 第1课 astro-01-project-init.md

~~~md
# 第 1 课：Astro 项目初始化 + 原理与结构

## 🚀 什么是 Astro？

Astro 是一个现代静态网站生成器（SSG），支持多框架集成（React、Vue、Svelte 等），以构建高性能、极简的静态网站和博客为目标。它默认生成纯静态页面，页面加载快、SEO 友好，且支持按需加载 JavaScript，避免不必要的前端负担。

相较于 Next.js、Nuxt 等，Astro 更专注静态内容生成，适合博客、文档和个人主页。

---

## 🚀 创建项目

打开终端，运行：

```bash
npm create astro@latest
~~~

选择模板时：

- **blog**：带有博客示例页面、文章内容等，适合直接开始写博客
- **minimal**：极简模板，适合完全自定义

完成后进入项目目录：

```bash
cd my-blog
npm install
npm run dev
```

------

## 🧠 项目结构解读

```bash
my-blog/
├── public/          # 静态资源（图片、图标），直接拷贝到构建后的根目录
├── src/
│   ├── pages/       # 页面文件夹，文件名对应网站路由（URL路径）
│   ├── layouts/     # 页面模板，复用相同的页眉页脚等结构
│   ├── components/  # 组件，封装可复用的小模块，如按钮、Callout等
├── astro.config.mjs # Astro 配置文件，定义构建、集成、路径等设置
```

### 目录说明

- **pages/** 里的 `.astro` 或 `.md` 文件会自动映射成网站页面，例如 `pages/index.astro` 对应 `/` 首页。
- **layouts/** 用来定义页面共用结构。单独写一个 `Layout.astro`，各页面通过包裹实现布局复用。
- **components/** 里放功能性组件，方便在多页面调用，提升代码复用率。
- **public/** 放静态资源，不经过编译，直接拷贝到最终网站目录。

------

## 小结

本课你学会了：

- Astro 是什么，它适合什么场景
- 如何用 `npm create astro` 快速创建项目
- 项目目录结构及功能划分
- Astro 页面基于文件路由自动映射原理

------

# 进阶阅读

- [Astro 官方文档](https://docs.astro.build/)
- 文件路由机制介绍：页面文件名如何映射 URL

```
---

# 第2课 astro-02-content-collections.md

```md
# 第 2 课：写博客文章 + 内容集合原理

---

## 📁 什么是内容集合（Content Collections）？

Astro 通过内容集合管理博客文章、页面等内容，结合 [Zod](https://zod.dev) 进行数据结构验证，确保内容格式正确。

---

## 📁 创建内容集合目录

```bash
mkdir -p src/content/blog
```

创建示例文章 `src/content/blog/2025-07-08.md`：

```md
---
title: 我的第一篇博客
description: 从零开始学 Astro
pubDate: 2025-07-08
tags: ["astro"]
---

欢迎来到 Astro 博客！
```

> 注意：
>
> - `---` 中为 Frontmatter，定义元数据
> - `pubDate` 最好是 ISO 格式或 `YYYY-MM-DD`

------

## 🧪 配置内容集合 Schema（验证规则）

`src/content/config.ts`：

```ts
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { blog };
```

### 为什么要 Schema？

- 规范内容格式，减少写错字段的风险
- Astro 运行时会根据 Schema 验证内容，报错提醒你修正

------

## 📄 创建博客列表页 `/blog`

`src/pages/blog.astro`：

```astro
---
import { getCollection } from "astro:content";
const posts = await getCollection("blog");
---

<ul>
  {posts.map(post => (
    <li><a href={`/blog/${post.slug}/`}>{post.data.title}</a></li>
  ))}
</ul>
```

### 原理说明

- `getCollection("blog")` 获取 `src/content/blog` 下所有文章，返回包含 `slug`、`data`（frontmatter）和 `body` 内容
- `post.slug` 是文件路径生成的 URL 片段，作为链接路径
- 通过循环渲染动态生成列表

------

## 🧭 创建博客详情页 `[...slug].astro`

```astro
---
import { getCollection, getEntryBySlug } from "astro:content";
import { Markdown } from "astro/components";
import Layout from "../../layouts/Layout.astro";

export async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map(post => ({ params: { slug: post.slug.split("/") } }));
}

const slug = Astro.params.slug.join("/");
const post = await getEntryBySlug("blog", slug);
if (!post) throw new Error("文章不存在");
---

<Layout>
  <h1>{post.data.title}</h1>
  <Markdown content={post.body} />
</Layout>
```

### 原理说明

- `[...slug].astro` 是捕获路由，支持多层路径，如 `/blog/2025/07/08`
- `getStaticPaths` 生成所有文章的路由路径，确保静态生成
- `getEntryBySlug` 根据 URL 参数获取对应文章数据和内容
- 使用 `Markdown` 组件渲染文章正文

------

## 小结

本课你学会了：

- 内容集合的概念及 Schema 验证
- 动态获取文章列表及渲染
- 捕获路由及详情页静态生成原理

------

# 进阶阅读

- [Astro Content Collections 官方文档](https://docs.astro.build/en/guides/content-collections/)
- [Zod 校验库介绍](https://zod.dev/)

```
---

# 第3课 astro-03-notion-style-ui.md

```md
# 第 3 课：构建 Notion 风格博客 UI

---

## 🎨 设置全局样式

`src/styles/global.css`：

```css
:root {
  --bg: #fff;
  --fg: #111;
  --font-body: 'Noto Sans SC', sans-serif;
}

:root[data-theme="dark"] {
  --bg: #1e1e1e;
  --fg: #fff;
}

body {
  background: var(--bg);
  color: var(--fg);
  font-family: var(--font-body);
  padding: 2rem;
  max-width: 720px;
  margin: auto;
}
```

### 原理解释

- CSS 变量（Custom Properties）定义颜色、字体，方便主题切换
- 通过 `data-theme="dark"` 选择器重写变量实现暗黑模式
- `max-width` 设定页面宽度，内容居中，模仿 Notion 简洁排版

------

## 💬 Callout 组件

`src/components/Callout.astro`：

```astro
---
const { type = "info", icon = "💡" } = Astro.props;
---

<div class="callout {type}">
  <strong>{icon}</strong>
  <div><slot /></div>
</div>

<style>
.callout {
  padding: 1rem;
  border-left: 4px solid var(--fg);
  background: #f9f9f9;
  margin: 1.5rem 0;
  border-radius: 6px;
  display: flex;
  gap: 1rem;
}
</style>
```

### 原理解释

- 组件接受 `type` 和 `icon` 参数，自定义显示风格
- 通过 `<slot />` 插槽显示调用时包裹的内容，提升复用性
- `border-left` 和背景色模仿 Notion 风格强调提示块

------

## 小结

本课你学会了：

- CSS 变量管理全局主题色
- Astro 组件参数传递及插槽机制
- 如何用组件封装样式，提升 UI 可复用性

------

# 进阶阅读

- [CSS 变量介绍](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Astro 组件文档](https://docs.astro.build/en/core-concepts/astro-components/)

```
---

# 第4课 astro-04-dark-mode.md

```md
# 第 4 课：夜间模式实现 + 原理详解

---

## 🌙 CSS 变量控制颜色

```css
:root {
  --bg: #fff;
  --fg: #111;
}

:root[data-theme="dark"] {
  --bg: #1e1e1e;
  --fg: #fff;
}
```

### 原理说明

- 利用 CSS 自定义属性定义颜色变量，方便动态切换
- 给 `<html>` 标签添加 `data-theme="dark"` 属性时，CSS 变量被覆盖，页面自动变暗

------

## 🌓 加入切换按钮

`Layout.astro` 中添加：

```astro
<button id="theme-toggle">🌓</button>

<script>
  const html = document.documentElement;
  // 页面加载时读取本地存储的主题设置，避免闪白
  const theme = localStorage.getItem("theme");
  if (theme === "dark") html.setAttribute("data-theme", "dark");

  // 点击切换按钮，切换主题，写入本地存储，保证刷新后保持
  document.getElementById("theme-toggle")?.addEventListener("click", () => {
    const isDark = html.getAttribute("data-theme") === "dark";
    if (isDark) {
      html.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    } else {
      html.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
  });
</script>
```

### 原理说明

- `localStorage` 用于在浏览器存储用户偏好，页面刷新也能记住设置
- 通过 `data-theme` 属性控制 CSS 变量，简洁高效
- 按钮监听点击事件，动态更新属性，实现实时切换

------

## 小结

本课你学会了：

- CSS 变量动态主题切换的机制
- 利用 `localStorage` 实现主题持久化
- 如何通过操作 DOM 属性，实现亮暗主题的切换

------

# 进阶阅读

- [CSS 变量和主题切换](https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/)
- [localStorage 使用方法](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

```
---

以上4个文件，内容细化并且涵盖你提到“写错”的地方也已修正。  
你需要我帮你生成这些文件的真实文件到你的项目目录？还是导出为 ZIP 下载包？
```