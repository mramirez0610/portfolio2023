import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({
    base: "./src/content/projs",
    pattern: "**/*.{md,mdx}",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().trim().min(40).max(160),
      date: z.coerce.date(),
      slug: z.string(),
      image: image(),
      url: z.url(),
      github: z.url(),
      tech: z.array(z.string()),
    }),
});

const climbing = defineCollection({
  loader: glob({
    base: "./src/content/climbing",
    pattern: "**/*.{md,mdx}",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      slug: z.string(),
      image: image(),
      category: z.array(z.string()).default([]),
      keywords: z.array(z.string()).default([]),
      images: z.array(image()).default([]),
    }),
});

export const collections = { projects, climbing };
