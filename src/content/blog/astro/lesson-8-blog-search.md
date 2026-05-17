---
title: 为 Astro 博客添加离线搜索功能
description: 构建一个**不依赖后端、支持关键词模糊匹配**的搜索系统，基于构建阶段生成的 JSON 索引 + 前端加载 + Fuse.js 实现。
pubDate: 2025-07-14
tags: ["astro", "建站", "blog","教学"]
cover: "/cover/astro.png"
---



第 8 课：**为 Astro 博客添加离线搜索功能**，我们将一步步构建一个**不依赖后端、支持关键词模糊匹配**的搜索系统，基于构建阶段生成的 JSON 索引 + 前端加载 + Fuse.js 实现。

------

## 🎯 课程目标

你将学到：

- 如何在构建阶段生成文章索引 JSON 文件
- 如何在 Astro 中引入前端搜索库（如 Fuse.js）
- 如何创建一个搜索组件，支持关键词匹配与高亮
- 如何优化加载体验与样式

------

## 🧱 第一步：构建时生成索引文件

Astro 的 `src/content/blog/*.md` 数据可以在构建阶段统一导出并保存为 JSON 供前端使用。

新建 `src/scripts/generateSearchIndex.ts`：

```ts
// src/scripts/generateSearchIndex.ts
import fs from 'fs';
import path from 'path';
import { getCollection } from 'astro:content';

async function generateIndex() {
  const posts = await getCollection('blog');

  const index = posts.map((post) => ({
    slug: `/blog/${post.slug}/`,
    title: post.data.title,
    description: post.data.description,
    body: post.body, // 原始 markdown
    tags: post.data.tags || [],
  }));

  const outputPath = path.resolve('./public/search-index.json');
  fs.writeFileSync(outputPath, JSON.stringify(index, null, 2));
  console.log('✅ 搜索索引已生成');
}

generateIndex();
```

### ⏱️ 添加构建钩子

修改你的 `package.json`：

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build && tsx src/scripts/generateSearchIndex.ts",
    "preview": "astro preview"
  }
}
```

现在，每次构建后，都会自动生成 `/public/search-index.json`。

------

## 🧪 第二步：加载索引并搜索

新建 `src/components/SearchBox.astro`：

```astro
---
import { useEffect, useState } from 'react';
import Fuse from 'fuse.js';

const [query, setQuery] = useState('');
const [results, setResults] = useState([]);

useEffect(() => {
  let fuse;
  fetch('/search-index.json')
    .then(res => res.json())
    .then(data => {
      fuse = new Fuse(data, {
        keys: ['title', 'description', 'body'],
        threshold: 0.3,
      });
    });

  const handleSearch = () => {
    if (fuse && query) {
      setResults(fuse.search(query).map(result => result.item));
    } else {
      setResults([]);
    }
  };

  const timeout = setTimeout(handleSearch, 300);
  return () => clearTimeout(timeout);
}, [query]);
---

<div class="search-box">
  <input
    type="text"
    placeholder="搜索文章…"
    value={query}
    onInput={(e) => setQuery(e.currentTarget.value)}
  />

  <ul>
    {results.map((post) => (
      <li>
        <a href={post.slug}>{post.title}</a>
      </li>
    ))}
  </ul>
</div>
```

### 📦 安装依赖

```bash
npm install fuse.js
```

------

## 🎨 第三步：样式与优化

你可以在 `global.css` 中添加样式：

```css
.search-box {
  margin: 2rem 0;
}

.search-box input {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.search-box ul {
  list-style: none;
  padding-left: 0;
  margin-top: 1rem;
}

.search-box li {
  margin-bottom: 0.5rem;
}
```

------

## 🧠 原理讲解

| 阶段     | 原理                                                         |
| -------- | ------------------------------------------------------------ |
| 构建阶段 | 用 `getCollection()` 获取所有博客元数据和正文内容，写入静态 JSON 文件 |
| 加载阶段 | 前端页面加载 JSON 数据到内存，使用 Fuse.js 创建搜索引擎实例  |
| 搜索阶段 | 每次输入关键字后，运行 `fuse.search()` 返回匹配项，并渲染结果列表 |

------

## ✅ 小结

离线搜索 = 内容结构化 + 本地索引加载 + 前端模糊匹配。

相比 Algolia 等服务端方案，它：

- 🚫 不依赖外部服务
- 🔒 更隐私安全
- ⚡️ 页面响应更快
- ✅ Astro 兼容性强

