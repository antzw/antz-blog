# AntZ Blog Template
[English](./docs/README.md) | [简体中文](./docs/README.zh-CN.md)

## Preview

| Light                             | Dark                             |
| -------------------------------- | --------------------------------- |
| ![预览](./docs/img1.png) | ![预览](./docs/img3.png) |
| ![预览](./docs/img2.png) | ![预览](./docs/img4.png) |



A content-first Astro blog template focused on readability, maintainability, and fast publishing.

- Markdown/MDX content workflow
- Tag filtering + full-text search
- Table of contents (TOC)
- Responsive layout + light/dark theme
- Ready to deploy on Cloudflare Pages

## Demo

- Live site: [https://antz.top](https://antz.top)

## Quick Start

```bash
npm install
npm run dev
```

Then open `http://localhost:4321`.

Common commands:

- `npm run dev`: start local development
- `npm run build`: build production files to `dist/`
- `npm run preview`: preview the production build locally
- `npm run check`: run Astro checks

## Writing Content

Blog posts live in `src/content/blog/`.

Each post can be `.md` or `.mdx` with this frontmatter schema:

```yaml
---
title: "Post title"
description: "One-line summary"
pubDate: 2026-05-21
tags: ["Astro", "Blog"]
cover: "/cover/your-image.jpg"
---
```

Required fields: `title`, `description`, `pubDate`.

## Customize the Template

Most customizations happen in these files:

- Layout and navigation: `src/layouts/Layout.astro`
- Homepage content: `src/pages/index.astro`
- Contact links: `src/components/ContactLinks.astro`
- Global theme tokens/styles: `src/styles/global.css`

## Deploy to Cloudflare Pages

1. Push this repository to GitHub.
2. Connect the repository in Cloudflare Pages.
3. Build settings:
- Framework preset: `Astro`
- Build command: `npm run build`
- Build output directory: `dist`
4. Add environment variable in Pages:
- `SITE_URL=https://your-domain.com`
5. Deploy and bind your custom domain.

## Pre-release Checklist

```bash
npm run check
npm run build
```

Verify:

- Homepage, blog list, and post detail pages load correctly
- Tag filters and search work as expected
- Mobile and desktop layouts are both correct

## Promotion Playbook

### 1) Astro Ecosystem

- Submit to Astro Showcase: `https://astro.build/showcase/`
- If you later package this as a generic theme, submit to Astro Themes: `https://astro.build/themes/`

### 2) Search Indexing

- Update the sitemap URL in `public/robots.txt` to your real domain after deployment
- Submit your sitemap in Google Search Console
- Keep post titles/descriptions/tags explicit and consistent

### 3) Community Distribution

First-month cadence:

- Week 1: launch post (X / Juejin / product communities)
- Week 2: technical write-up (DEV.to / Reddit `r/astro`, `r/webdev`)
- Week 3-4: ship improvements based on feedback and post updates

### 4) Track Conversion

- Add UTM parameters for each channel
- Track: UV, average reading time, GitHub stars/forks, deployment feedback

## License

MIT
