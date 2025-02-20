import { Metadata } from "next";

import { allDocs } from "@/.content-collections/generated";
import { Mdx } from "@/components/mdx-components";
import { getDocFromParams } from "@/lib/utils";
import { PageProps } from "@/types/types";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const doc = await getDocFromParams((await params).slug);

  if (!doc) {
    return {
      title: "ไม่พบเอกสาร | ซี เอสๆ",
      description: "ไม่พบเอกสารที่คุณต้องการ",
    };
  }

  return {
    title: `${doc.title} | ซี เอสๆ`,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: "article",
    },
  };
}

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  return allDocs.map((doc) => ({
    slug: doc.slugAsParams.split("/"),
  }));
}

export default async function DocPage({ params }: PageProps) {
  const doc = await getDocFromParams((await params).slug);

  // console.log("params slug", (await params).slug);
  // console.log("doc", doc);

  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full justify-between">
        <h1 className="h1-section">{doc.title}</h1>
        <div className="self-end">
          <span className="paragraph-sm text-zinc-700 dark:text-zinc-400">
            อัพเดตล่าสุดเมื่อ
          </span>
          <p className="paragraph text-zinc-900 dark:text-zinc-100">
            {doc.updatedDate}
          </p>
        </div>
      </div>
      <Mdx code={doc.doc} />
      <div className="mt-12 flex w-full justify-between">
        <div className="">
          <span className="paragraph-sm text-zinc-700 dark:text-zinc-400">
            สร้างเมื่อ
          </span>
          <p className="paragraph text-zinc-900 dark:text-zinc-100">
            {doc.createdDate}
          </p>
        </div>
        <div className="self-end">
          <span className="paragraph-sm text-zinc-700 dark:text-zinc-400">
            อัพเดตล่าสุดเมื่อ
          </span>
          <p className="paragraph text-zinc-900 dark:text-zinc-100">
            {doc.updatedDate}
          </p>
        </div>
      </div>
    </div>
  );
}
