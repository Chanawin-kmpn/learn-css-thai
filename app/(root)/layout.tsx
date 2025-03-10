import React from "react";

import "@/styles/prism.css";
import { LayoutProps } from "@/.next/types/app/(root)/layout";

const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="container jun-content relative mx-auto h-full px-4 lg:px-0">
      {children}
    </main>
  );
};

export default Layout;
