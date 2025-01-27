import { MDXContent } from "@content-collections/mdx/react";
import { Metadata } from "next";

import { allDocs } from "@/.content-collections/generated";
// import { notFound } from 'next/navigation';

interface DocPageProps {
  params: {
    slug: string[];
  };
}

async function getDocFromParams({ params }: DocPageProps) {
  const slug = (await params).slug.join("/") || "";

  const doc = allDocs.find((doc) => doc.slugAsParams === slug);

  if (!doc) {
    return null;
  }

  return doc;
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const doc = await getDocFromParams({ params });

  if (!doc) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: doc.title,
    description: doc.description,
  };
}

export async function generateStaticParams(): Promise<
  DocPageProps["params"][]
> {
  return allDocs.map((doc) => ({
    slug: doc.slugAsParams.split("/"),
  }));
}

export default async function DocPage({ params }: DocPageProps) {
  const doc = await getDocFromParams({ params });
  // console.log("params", params);
  // console.log("doc", doc);
  return (
    <main>
      <h1>{doc!.title}</h1>
      <MDXContent code={doc!.doc} />
    </main>
  );
}
