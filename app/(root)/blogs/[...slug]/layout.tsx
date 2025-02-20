import React from "react";

import Construction from "@/components/Construction";
import TableOfContent from "@/components/TableOfContent";
import { getBlogFromSegment } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string[] }>;
}

const layout = async ({ children, params }: LayoutProps) => {
  const blog = await getBlogFromSegment((await params).slug);

  return (
    <div className="lg:gap-8">
      {blog.published ? (
        <>
          <div className="px-4 pt-8">{children}</div>
          {blog.toc && (
            <aside className="-z-10 hidden p-8 jun-insetSidebar jun-insetSidebar-fixed jun-insetSidebar-w-[250px] lg:block">
              <nav className="jun-insetContent max-h-[calc(100vh-4rem)] overflow-y-auto pt-24">
                <TableOfContent content={blog.content} />
              </nav>
            </aside>
          )}
        </>
      ) : (
        <Construction />
      )}
    </div>
  );
};

export default layout;
