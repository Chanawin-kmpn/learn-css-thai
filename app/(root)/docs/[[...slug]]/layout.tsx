import React from "react";

import InsetSidebar from "@/components/Navbar/InsetSidebar";
import SidebarHeader from "@/components/Navbar/SidebarHeader";
import TableOfContent from "@/components/TableOfContent";
import { getDocFromSegment } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string[] }>;
}

const layout = async ({ children, params }: LayoutProps) => {
  const doc = await getDocFromSegment((await params).slug);

  return (
    <div className="pt-14 lg:pt-16">
      <SidebarHeader />
      <InsetSidebar />
      <div className="lg:pl-8">{children}</div>
      <TableOfContent content={doc.content} />
    </div>
  );
};

export default layout;
