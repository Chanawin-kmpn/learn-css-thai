import React from "react";

import SidebarHeader from "@/components/Navbar/SidebarHeader";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="pt-8 lg:pt-16">
      <SidebarHeader />
      <div className="lg:pl-[17.5rem]">{children}</div>
    </div>
  );
};

export default layout;
