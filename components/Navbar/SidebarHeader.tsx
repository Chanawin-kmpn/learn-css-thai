"use client";
import { Menu } from "lucide-react";
import React from "react";
import { triggerEdgeDrawer } from "tailwindcss-jun-layout";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const SidebarHeader = () => {
  return (
    <div className="-mt-8 flex gap-8 p-4 lg:hidden">
      <button
        className="text-dark900_light100 jun-edgeDrawerTrigger"
        onClick={() => triggerEdgeDrawer()}
      >
        <Menu />
      </button>
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/docs">docs</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/components">Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default SidebarHeader;
