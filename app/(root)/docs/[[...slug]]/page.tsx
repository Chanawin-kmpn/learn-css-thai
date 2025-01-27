import { Metadata } from "next";

import { allDocs } from "@/.content-collections/generated";
import { Mdx } from "@/components/mdx-components";
// import { notFound } from 'next/navigation';

interface DocPageProps {
  params: Promise<{ slug: string[] }>;
}

interface Doc {
  slugAsParams: string;
  title: string;
  description: string;
  doc: string;
}

async function getDocFromParams(slug: string[]): Promise<Doc | null> {
  const slugPath = slug?.join("/") || "";

  try {
    const doc = allDocs.find((doc) => doc.slugAsParams === slugPath);
    return doc || null;
  } catch (error) {
    console.error("Error fetching doc:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const doc = await getDocFromParams((await params).slug);

  if (!doc) {
    return {
      title: "ไม่พบเอกสาร | My Docs",
      description: "ไม่พบเอกสารที่คุณต้องการ",
    };
  }

  return {
    title: `${doc.title} | My Docs`,
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
  return (
    <>
      <h1>{doc!.title}</h1>
      <Mdx code={doc!.doc} />
    </>
  );
}
