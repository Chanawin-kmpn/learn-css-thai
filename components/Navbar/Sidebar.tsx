"use client";

import React from "react";

import SidebarContent from "./SidebarContent";

const Sidebar = () => {
  return (
    <aside className="jun-edgeSidebar relative jun-edgeSidebar-drawer jun-edgeSidebar-w-[256px] before:fixed before:top-0 lg:top-[4.6875rem] lg:mt-16 lg:jun-edgeSidebar-permanent lg:jun-edgeSidebar-permanent-hidden">
      <div className="jun-edgeContent overflow-y-auto bg-dark-900 p-8 lg:bg-transparent">
        <SidebarContent />
      </div>

      <div className="absolute right-0 hidden h-4/5 w-px bg-zinc-700 dark:bg-zinc-400 lg:block" />
    </aside>
  );
};

export default Sidebar;
