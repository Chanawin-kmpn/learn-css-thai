import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import normalizePath from "normalize-path";

const docs = defineCollection({
  name: "Doc",
  directory: "content",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
  }),
  transform: async (document, context) => {
    const doc = await compileMDX(context, document);
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
