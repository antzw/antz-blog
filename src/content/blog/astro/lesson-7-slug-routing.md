---
title: 第 7 课：多级路由支持（动态 slug 路由）
description: 添加博客列表图片封面，并优化了排版
pubDate: 2025-07-13
tags: ["astro", "建站", "blog","教学"]
cover: "/cover/astro.png"
---

在这一课中，我们将实现 Astro 博客中的「多级目录支持」，使文章可以使用类似 `/blog/astro/lesson-7-slug-routing` 的路径结构，而不是扁平的 `/blog/lesson-7`。

---

## ✨ 效果展示

- ✅ 你可以将博客内容放在子文件夹中，如：`blog/astro/lesson-7.md`
- ✅ 页面路径将自动对应为 `/blog/astro/lesson-7`
- ✅ 无需 `split('/')`，Astro 会自动处理

---

## 🧠 背景原理

Astro 的动态路由 `[...slug].astro` 用于捕获多段路径，例如：

```bash
/blog/astro/lesson-7-slug-routing -> [...slug] = ["astro", "lesson-7-slug-routing"]
```

但需要注意：

> 🔥 `getStaticPaths()` 返回的 `params.slug` 必须是 **字符串** 而不是数组，否则会报错！

这是 Astro 的设计特性 —— 即使你定义了 `[...slug].astro`，它仍然要求 `params.slug` 是字符串。

---

## 📁 内容结构调整

将你的博客文章组织为多级目录：

```bash
src/content/blog/
├── linux/
│   └── 1.md
└── astro/
    ├── lesson-6-card-layout.md
    └── lesson-7-slug-routing.md
```

这样，slug 将自动变为：

- `linux/1`
- `astro/lesson-6-card-layout`
- `astro/lesson-7-slug-routing`

---

## 🧩 配置 `getStaticPaths`

`src/pages/blog/[...slug].astro`:

```ts
export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.slug }, // ✅ 注意：不能 .split("/")
    props: post,
  }));
}
```

:::caution 注意
不要写成：

```ts
params: { slug: post.slug.split("/") } // ❌ 会报错！
```

否则会报错：

```
Invalid getStaticPaths route parameter for slug. Expected string, received array
```

---

## ✅ 页面完整代码

```astro
---
import { type CollectionEntry, getCollection } from 'astro:content';
import Layout from '../../layouts/Layout.astro';
import { render } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: post,
  }));
}

type Props = CollectionEntry<'blog'>;
const post = Astro.props;
const { Content } = await render(post);
---

<Layout>
  <h1>{post.data.title}</h1>
  <p>📅 {post.data.pubDate.toLocaleDateString()}</p>
  <Content />
</Layout>
```

---

## 📝 小结

- ✅ 多级目录 slug 用 `[...slug].astro`
- ✅ slug 必须是字符串：`params: { slug: post.slug }`
- ✅ 不要使用 `.split('/')` 否则会报错
- ✅ Markdown 路径结构会自动转换为正确的 slug

---

下一课我们将进入第 8 课：离线全文搜索（基于 JSON 构建索引 + 前端搜索）