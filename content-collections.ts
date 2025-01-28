import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import normalizePath from "normalize-path";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";

const docs = defineCollection({
  name: "Doc",
  directory: "content",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
    published: z.boolean().default(true),
    date: z.string().optional(),
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
      slug: `/${normalizedPath}`,
      slugAsParams: normalizedPath.split("/").slice(1).join("/"),
      doc,
    };
  },
});

export default defineConfig({
  collections: [docs],
});
