import React from "react";

const Sidebar = () => {
  return (
    <aside className="jun-edgeSidebar relative jun-edgeSidebar-w-[256px]  before:fixed before:top-0 max-lg:jun-edgeSidebar-drawer lg:fixed lg:top-[4.6875rem] lg:mt-16 lg:jun-edgeSidebar-permanent-visible">
      <div className="jun-edgeContent  bg-dark-900 px-6  lg:bg-transparent">
        Navigation Link
      </div>
      <div className="absolute right-0 hidden h-4/5 w-px bg-zinc-700 dark:bg-zinc-400 lg:block" />
    </aside>
  );
};

export default Sidebar;
