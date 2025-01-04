import React from "react";

import SidebarHeader from "@/components/Navbar/SidebarHeader";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="pt-14 lg:pt-16">
      <SidebarHeader />
      <div className="lg:pl-8">{children}</div>
    </div>
  );
};

export default layout;
