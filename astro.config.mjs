// astro.config.mjs
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { exec } from 'child_process';

export default defineConfig({
  integrations: [mdx()],
  hooks: {
    'astro:build:done': async () => {
      exec('npx tsx src/scripts/generateSearchIndex.ts', (err, stdout, stderr) => {
        if (err) {
          console.error('❌ 生成搜索索引失败:', stderr);
        } else {
          console.log('✅ 搜索索引已生成');
        }
      });
    }
  }
});
// This configuration file sets up Astro with MDX support and a hook to generate a search index after the build is complete.