"use client";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import { triggerEdgeDrawer } from "tailwindcss-jun-layout";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

const SidebarHeader = () => {
  const pathName = usePathname();
  const getSeperatePath = pathName.split("/").slice(1);
  return (
    <div className="bg-nav fixed top-[4.6875rem] flex w-full gap-8 p-4 lg:hidden">
      <button
        className="text-dark900_light100 jun-edgeDrawerTrigger"
        onClick={() => triggerEdgeDrawer()}
      >
        <Menu />
      </button>
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            {getSeperatePath.map((path, index) => {
              const pathName = path.charAt(0).toUpperCase() + path.slice(1);
              const isLastItem = index === getSeperatePath.length - 1;
              const formattedPath = path.includes("-")
                ? pathName.replace("-", " ")
                : pathName;
              return (
                <React.Fragment key={index}>
                  <BreadcrumbItem
                    className={cn(
                      isLastItem
                        ? "link-label text-secondary-orange dark:text-primary-lime"
                        : "link",
                    )}
                  >
                    {formattedPath}
                  </BreadcrumbItem>
                  {!isLastItem && <BreadcrumbSeparator />}
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default SidebarHeader;
