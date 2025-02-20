import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import normalizePath from "normalize-path";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";

const docs = defineCollection({
  name: "Doc",
  directory: "content/docs",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
    published: z.boolean().default(false),
    createdDate: z.string().optional(),
    updatedDate: z.string().optional(),
    toc: z.boolean().optional().default(true),
  }),
  transform: async (document, context) => {
    const doc = await compileMDX(context, document, {
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ["subheading-anchor"],
              ariaLabel: "Link to section",
            },
          },
        ],
      ],
    });
    const normalizedPath = normalizePath(document._meta.path);
    return {
      ...document,
      slug: `${normalizedPath}`,
      slugAsParams: normalizedPath.split("/").slice(1).join("/"),
      doc,
    };
  },
});

const blogs = defineCollection({
  name: "Blog",
  directory: "content/blogs",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
    authorName: z.string(),
    authorImage: z.string().optional(),
    published: z.boolean().default(false),
    createdDate: z.string().optional(),
    updatedDate: z.string().optional(),
    toc: z.boolean().optional().default(true),
  }),
  transform: async (document, context) => {
    const blog = await compileMDX(context, document, {
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ["subheading-anchor"],
              ariaLabel: "Link to section",
            },
          },
        ],
      ],
    });
    const normalizedPath = normalizePath(document._meta.path);
    return {
      ...document,
      slug: `${normalizedPath}`,
      slugAsParams: normalizedPath.split("/").slice(1).join("/"),
      blog,
    };
  },
});

export default defineConfig({
  collections: [docs, blogs],
});
