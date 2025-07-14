---
title:  第 6 课：博客封面摘要卡片布局
description: 添加博客列表图片封面，并优化了排版
pubDate: 2025-07-13
tags: ["astro", "建站", "blog","教学"]
cover: "/cover/astro.png"
---
欢迎来到第六课！本节我们将构建一个带有封面图、标题、摘要、标签和发布日期的卡片式博客文章列表页面，适合 Notion 风格排版，兼容亮/暗色模式。

## 🎯 目标
- 创建 BlogCard.astro 卡片组件
- 使用 Flex 布局实现图文并排
- 支持亮/暗色主题下不同样式
- 可点击跳转至对应博客详情页

---

## 1️⃣ 创建 BlogCard 组件

创建文件：`src/components/BlogCard.astro`

```astro
---
const { title, description, pubDate, cover, tags, href } = Astro.props;

const formatDate = (value) => {
  try {
    const d = typeof value === "string" ? new Date(value) : value;
    return d.toLocaleDateString("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit" });
  } catch {
    return "无发布日期";
  }
};
---

<a href={href} class="card-link">
  <article class="card">
    {cover && (
      <img src={cover} alt={title} class="cover" loading="lazy" decoding="async" />
    )}
    <div class="content">
      <div class="post-header">
        <h2>{title}</h2>
        📅 {formatDate(pubDate)}
      </div>
      <p>{description}</p>
      {tags && <p class="tags">🏷️ {tags.join(", ")}</p>}
    </div>
  </article>
</a>

<style>
.card {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 8px;
  background-color: var(--card-bg, #f6f6f6);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: background-color 0.3s ease;
  flex-wrap: wrap;
}
.card:hover {
  background-color: var(--card-hover-bg, #f1f1f1);
}
[data-theme="dark"] .card {
  background-color: #4b4b4b;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

.cover {
  flex: 0 0 160px;
}
.cover img {
  width: 100%;
  height: auto;
  border-radius: 6px;
  object-fit: cover;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.post-header h2 {
  font-size: 1.25rem;
  margin: 0;
}
.tags {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #888;
}
</style>
```

---

## 2️⃣ 使用卡片组件

修改 `src/pages/blog.astro`：

```astro
---
import { getCollection } from "astro:content";
import BlogCard from "../components/BlogCard.astro";

const posts = await getCollection("blog");
---

<h1>📚博客文章列表</h1>
{posts.map(post => (
  <BlogCard
    title={post.data.title}
    description={post.data.description}
    pubDate={post.data.pubDate}
    cover={post.data.cover}
    tags={post.data.tags}
    href={`/blog/${post.slug}/`}
  />
))}
```

---

## ✅ 小结

通过本节内容你已经掌握：
- 如何使用 Astro 组件封装可复用卡片
- 如何通过 props 显示图文、日期、标签
- 如何为不同主题设计不同样式
