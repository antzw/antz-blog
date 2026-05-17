---
title: Astro 博客实现夜间模式全攻略
description: 手把手教你给 Astro 博客添加夜间模式切换功能，兼容系统偏好并记忆用户设置。
pubDate: 2025-07-13
tags: ["astro", "教程", "夜间模式", "前端"]
cover: "/cover/astro.png"
---

现代博客已经离不开“夜间模式”这一项体验优化，尤其对于喜欢深夜写作或阅读的开发者和极客来说，能一键切换亮 / 暗色主题，不仅护眼，也很酷。

今天这篇文章就手把手带你给 Astro 博客加上完整的夜间模式功能，包括：

- CSS 变量方案
- 主题切换按钮
- 本地储存记忆
- 自动跟随系统偏好
- 动态切换图标

---

## 🧱 第一步：设置颜色变量

我们在 `src/styles/global.css` 中定义主题色变量。

```css
:root {
  --bg: #ffffff;
  --fg: #1e1e1e;
  --font-body: 'Inter', 'Noto Sans SC', sans-serif;
  --font-size: 17px;
  --line-height: 1.75;
  --max-width: 720px;
}

:root[data-theme="dark"] {
  --bg: #1e1e1e;
  --fg: #ffffff;
}

body {
  background-color: var(--bg);
  color: var(--fg);
  font-family: var(--font-body);
  font-size: var(--font-size);
  line-height: var(--line-height);
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 2rem 1rem;
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

---

## 🎨 第二步：适配代码块暗色样式

```css
pre {
  background-color: #f5f5f5;
  padding: 1em;
  border-radius: 8px;
  overflow: auto;
}

code {
  background-color: #f0f0f0;
  padding: 0.2em 0.4em;
  border-radius: 4px;
  font-family: Menlo, monospace;
}

:root[data-theme="dark"] pre {
  background-color: #2d2d2d;
  color: #f8f8f2;
}

:root[data-theme="dark"] code {
  background-color: #3a3a3a;
  color: #f8f8f2;
}
```

---

## 🧩 第三步：创建主题切换按钮组件

在 `src/components/ThemeToggle.astro` 中新建如下组件：

```astro
---
const htmlId = "theme-toggle";
---

<button id={htmlId} aria-label="切换夜间模式">🌙</button>

<script>
  const html = document.documentElement;
  const toggleButton = document.getElementById("theme-toggle");

  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const currentTheme = savedTheme || (prefersDark ? "dark" : "light");
  html.setAttribute("data-theme", currentTheme);

  const updateIcon = () => {
    const isDark = html.getAttribute("data-theme") === "dark";
    toggleButton.textContent = isDark ? "🔆" : "🌙";
  };

  updateIcon();

  toggleButton?.addEventListener("click", () => {
    const isDark = html.getAttribute("data-theme") === "dark";
    const newTheme = isDark ? "light" : "dark";
    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateIcon();
  });
</script>
```

---

## 🧱 第四步：在布局中引入组件

打开你的 `src/layouts/Layout.astro` 文件，在 `<header>` 中插入该组件：

```astro
---
import ThemeToggle from "../components/ThemeToggle.astro";
---

<header>
  <h1>✨我的数字游乐场🪐</h1>
  <nav>
    <a href="/">主页</a> | <a href="/blog">博客</a>
  </nav>
  <ThemeToggle />
</header>
```

---

## 🧼 第五步：美化按钮样式

继续编辑 `global.css`，为按钮设置样式：

```css
button#theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  margin-left: 1rem;
}
```

---

## ✅ 效果展示

- 按钮初次加载时会根据用户系统偏好自动设置亮/暗主题；
- 点击按钮后图标在 🌙 / 🔆 之间切换；
- 用户的设置将保存在 `localStorage`，刷新页面后自动生效；
- 所有样式都通过 CSS 变量控制，响应灵活。

---

## 🧠 技术原理小结

- 使用 `data-theme` 属性 + CSS 变量实现主题切换；
- 利用 `localStorage` 保存用户选择；
- 使用 `window.matchMedia` 响应系统偏好；
- 通过 `<script>` 实现客户端交互逻辑；
- Astro 组件封装后可在任意页面复用。

---

🎉 现在你的 Astro 博客也支持了真正实用的夜间模式，下一节我们将实现中英语言切换和封面摘要卡片布局，敬请期待！
