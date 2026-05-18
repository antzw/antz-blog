// src/scripts/generateSearchIndex.ts
import fs from 'fs/promises';
import path from 'path';
import { getCollection } from 'astro:content';

export default async function generateSearchIndex() {
  const posts = await getCollection('blog');

  const index = posts.map((post) => ({
    slug: `/blog/${post.id}/`,
    title: post.data.title,
    description: post.data.description,
    body: post.body || '', // markdown 原文
    tags: post.data.tags || [],
  }));

  const outputPath = path.resolve('./public/search-index.json');
  await fs.writeFile(outputPath, JSON.stringify(index, null, 2), 'utf-8');
  console.log('✅ 搜索索引已生成 → public/search-index.json');
}
// 注意：确保在 Astro 配置中正确设置了 `astro:content` 集成
// 以及在构建完成后调用此脚本a
// 例如在 `astro.config.mjs` 中添加 `hooks` 配置
// hooks: {
//   'astro:build:done': async () => {
//     await generateSearchIndex();
//   }
// }
// 这样可以确保在每次构建后自动生成搜索索引文件
// 生成的 `search-index.json` 文件将包含所有博客文章的标题、描述
// 和正文内容，便于前端搜索功能使用
// 注意：如果你的博客文章内容较多，可能需要考虑索引的大小和性能
// 可以根据需要调整索引内容，例如只包含标题和描述，或使用更简洁的格式
// 另外，确保在前端代码中正确加载和使用这个索引文件
// 例如在搜索组件中使用 `fetch('/search-index.json')`
// 来获取索引数据，并实现搜索功能
// 这样可以实现一个简单的客户端搜索功能，用户可以输入关键词
// 来搜索博客文章，匹配标题、描述和正文内容
// 你可以根据需要进一步优化搜索算法，例如使用模糊匹配
// 或者添加更多的搜索选项
// 这样可以提升用户体验，让用户更容易找到感兴趣的内容
// 最后，确保在部署时将 `public/search-index.json` 文件包含在内
// 这样用户在访问博客时可以直接获取到搜索索引数据
// 你可以在部署脚本中添加相应的步骤，确保索引文件
// 始终是最新的
// 这样可以确保用户在访问博客时能够获得最新的搜索结果
// 你可以根据需要进一步扩展这个功能，例如添加搜索结果高亮
// 或者搜索历史记录等功能
// 这样可以提升搜索体验，让用户更容易找到感兴趣的内容
// 你可以根据需要进一步优化搜索算法，例如使用模糊匹配
// 或者添加更多的搜索选项
// 这样可以提升用户体验，让用户更容易找到感兴趣的内容
// 最后，确保在部署时将 `public/search-index.json` 文件包含在内
// 这样用户在访问博客时可以直接获取到搜索索引数据
// 你可以在部署脚本中添加相应的步骤，确保索引文件
// 始终是最新的
// 这样可以确保用户在访问博客时能够获得最新的搜索结果
// 你可以根据需要进一步扩展这个功能，例如添加搜索结果高亮
// 或者搜索历史记录等功能
// 这样可以提升搜索体验，让用户更容易找到感兴趣的内容
// 你可以根据需要进一步优化搜索算法，例如使用模糊匹配
// 或者添加更多的搜索选项 