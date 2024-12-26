"use client";
import { usePathname } from "next/navigation";
import React from "react";

import SidebarContent from "./SidebarContent";

const InsetSidebar = () => {
  const pathName = usePathname();
  return (
    <>
      {pathName.startsWith("/docs") && (
        <div className="hidden p-8 jun-insetSidebar jun-insetSidebar-w-[220px] lg:block lg:pt-16 xl:jun-insetSidebar-w-[256px]">
          <SidebarContent />
        </div>
      )}
    </>
  );
};

export default InsetSidebar;
