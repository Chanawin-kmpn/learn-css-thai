import { Metadata } from "next";

import { allDocs } from "@/.content-collections/generated";
import Construction from "@/components/Construction";
import { Mdx } from "@/components/mdx-components";
import { getDocFromParams } from "@/lib/utils";
import { DocPageProps } from "@/types/types";

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
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

export default async function DocPage({ params }: DocPageProps) {
  const doc = await getDocFromParams((await params).slug);

  // console.log("params slug", (await params).slug);
  // console.log("doc", doc);

  if (!doc.published) {
    return <Construction />;
  }

  return (
    <>
      <div className="flex">
        <div>
          <h1>{doc.title}</h1>
          <Mdx code={doc.doc} />
          <div>
            <p className="">อัพเดตล่าสุดเมื่อ</p>
            <span>{doc.date}</span>
          </div>
        </div>
      </div>
    </>
  );
}
