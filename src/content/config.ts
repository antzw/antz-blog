import { defineCollection, z } from "astro:content";

//z是Zod，一个强大的数据验证库
const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),  // 自动校验是否是合法日期
    cover: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  blog,
};

