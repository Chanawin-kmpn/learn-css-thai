"use client";
import { usePathname } from "next/navigation";
import React from "react";

import SidebarContent from "./SidebarContent";

const InsetSidebar = () => {
  const pathName = usePathname();
  return (
    <>
      {pathName.startsWith("/docs") && (
        <div className="relative hidden p-8 jun-insetSidebar jun-insetSidebar-w-[220px] lg:block lg:pt-16 xl:jun-insetSidebar-w-[256px]">
          <SidebarContent />
          <div className="absolute right-0 top-16 hidden h-5/6 w-px bg-zinc-700 dark:bg-zinc-400 lg:block" />
        </div>
      )}
    </>
  );
};

export default InsetSidebar;
