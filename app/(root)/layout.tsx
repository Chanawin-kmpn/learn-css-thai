import React from "react";

import InsetSidebar from "@/components/Navbar/InsetSidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="container jun-content relative mx-auto h-full">
      <InsetSidebar />
      {children}
    </main>
  );
};

export default layout;
