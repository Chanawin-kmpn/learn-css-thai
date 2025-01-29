import { Metadata } from "next";

import { allDocs } from "@/.content-collections/generated";
import Construction from "@/components/Construction";
import { Mdx } from "@/components/mdx-components";

interface DocPageProps {
  params: Promise<{ slug: string[] }>;
}

interface Doc {
  slug: string;
  slugAsParams: string;
  doc: string;
  content: string;
  title: string;
  description: string;
  published: boolean;
  date?: string | undefined;
  _meta: {
    filePath: string;
    fileName: string;
    directory: string;
    path: string;
    extension: string;
  };
}

async function getDocFromParams(slug: string[]): Promise<Doc> {
  const slugPath = slug?.join("/") || "";

  try {
    const doc = allDocs.find((doc) => doc.slugAsParams === slugPath)!;
    return doc;
  } catch (error) {
    console.error("Error fetching doc:", error);
    throw new Error(`Doc not found for slug: ${slugPath}`);
  }
}

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

  // console.log("params", params);
  // console.log("doc", doc);

  if (!doc.published) {
    return <Construction />;
  }

  return (
    <>
      <h1>{doc.title}</h1>
      <Mdx code={doc.doc} />
      <div>
        <p className="">อัพเดตล่าสุดเมื่อ</p>
        <span>{doc.date}</span>
      </div>
    </>
  );
}
