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
      <div className="px-4 pt-16">{children}</div>
      {doc.toc && (
        <aside className="-z-10 hidden p-8 jun-insetSidebar jun-insetSidebar-fixed jun-insetSidebar-w-[250px] lg:block">
          <nav className="jun-insetContent max-h-[calc(100vh-4rem)] overflow-y-auto pt-24">
            <TableOfContent content={doc.content} />
          </nav>
        </aside>
      )}
    </div>
  );
};

export default layout;
