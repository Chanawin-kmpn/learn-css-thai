"use client";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

import "@/styles/prism.css";

import InsetSidebar from "@/components/Navbar/InsetSidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  useEffect(() => {
    // เมื่อ pathname เปลี่ยน จะ scroll กลับไปด้านบน
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <main className="container jun-content relative mx-auto h-full">
      <InsetSidebar />
      {children}
    </main>
  );
};

export default Layout;
