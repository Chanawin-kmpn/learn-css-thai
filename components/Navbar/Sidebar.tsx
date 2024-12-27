"use client";

import React from "react";

import SidebarContent from "./SidebarContent";

const Sidebar = () => {
  return (
    <aside className="jun-edgeSidebar relative jun-edgeSidebar-drawer jun-edgeSidebar-w-[256px] before:fixed before:top-0 lg:top-[4.6875rem] lg:mt-16 lg:jun-edgeSidebar-permanent lg:jun-edgeSidebar-permanent-hidden">
      <div className="jun-edgeContent overflow-y-auto bg-light-100 p-8 dark:bg-dark-900">
        <SidebarContent isMobile={true} />
      </div>
    </aside>
  );
};

export default Sidebar;
