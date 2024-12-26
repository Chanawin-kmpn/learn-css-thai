import React from "react";

import Sidebar from "@/components/Navbar/Sidebar";
import SidebarHeader from "@/components/Navbar/SidebarHeader";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="jun-layout pt-8 lg:pt-16">
      <SidebarHeader />
      <div className="jun-content lg:pl-[17.5rem]">{children}</div>
      <Sidebar />
    </div>
  );
};

export default layout;
