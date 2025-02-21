import { ChevronLeft, CircleUserRound } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { allBlogs } from "@/.content-collections/generated";
import { Mdx } from "@/components/mdx-components";
import { getBlogFromParams } from "@/lib/utils";
import { PageProps } from "@/types/types";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const blog = await getBlogFromParams((await params).slug);

  if (!blog) {
    return {
      title: "ไม่พบเอกสาร | ซี เอสๆ",
      description: "ไม่พบเอกสารที่คุณต้องการ",
    };
  }

  return {
    title: `${blog.title} | ซี เอสๆ`,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      type: "article",
    },
  };
}

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  return allBlogs.map((blog) => ({
    slug: blog.slugAsParams.split("/"),
  }));
}

const BlogPage = async ({ params }: PageProps) => {
  const blog = await getBlogFromParams((await params).slug);
  return (
    <div className="flex flex-col space-y-8">
      <div>
        <Link href="/blogs" className="flex items-center">
          <ChevronLeft size={16} className="mr-4" />
          Back
        </Link>
      </div>
      <div className="flex flex-col">
        <div className="space-y-6">
          <p className="text-dark700_light400 text-xs lg:text-sm">
            {blog.createdDate}
          </p>
          <h1 className="h1-section">{blog.title}</h1>
          <div className="flex items-center space-x-4">
            {blog.authorImage ? (
              <div className="relative flex size-9 shrink-0 items-center justify-center self-start overflow-hidden rounded-full">
                <Image
                  src={blog.authorImage}
                  alt={blog.authorName}
                  fill
                  className="object-cover"
                  sizes="100%"
                />
              </div>
            ) : (
              <CircleUserRound size={36} />
            )}
            <p>{blog.authorName}</p>
          </div>
        </div>
      </div>
      <div>
        <Mdx code={blog.blog} />
      </div>
      <div className="self-end">
        <span className="paragraph-sm text-zinc-700 dark:text-zinc-400">
          อัพเดตล่าสุดเมื่อ
        </span>
        <p className="paragraph text-zinc-900 dark:text-zinc-100">
          {blog.updatedDate}
        </p>
      </div>
    </div>
  );
};

export default BlogPage;
