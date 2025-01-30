import React from "react";

import InsetSidebar from "@/components/Navbar/InsetSidebar";
import TableOfContent from "@/components/TableOfContent";
import { getDocFromSegment } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string[] }>;
}

const layout = async ({ children, params }: LayoutProps) => {
  const doc = await getDocFromSegment((await params).slug);

  return (
    <div className="lg:gap-8">
      <InsetSidebar />
      <div className="pt-16">{children}</div>
      <TableOfContent content={doc.content} />
    </div>
  );
};

export default layout;
