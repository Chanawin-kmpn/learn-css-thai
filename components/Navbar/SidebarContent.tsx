"use client";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

import ROUTES from "@/constants/router";
import { cn } from "@/lib/utils";

import { CloseDrawerButton } from "../Triggers";

const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => {
  const pathName = usePathname();
  useEffect(() => {
    // เมื่อ pathname เปลี่ยน จะ scroll กลับไปด้านบน
    window.scrollTo(0, 0);
  }, [pathName]);
  return (
    <>
      <CloseDrawerButton />
      <div className="jun-sidebarContainer">
        <ul className="jun-sidebarMenu space-y-8">
          {ROUTES.map((section) => (
            <li
              className="jun-sidebarMenuItem space-y-4"
              key={`Main Section ${section.label}`}
            >
              <div className="link-label jun-sidebarText">{section.label}</div>
              <div className="jun-sidebarGroupText">
                <div>
                  <ul className="jun-sidebarMenu jun-sidebarMenu-nested before:bg-dark-700/20 before:dark:bg-light-400/20">
                    {section.children.map((item) => {
                      let isActive = pathName.includes(item.path);
                      return item.label !== "Flexbox" &&
                        item.label !== "CSS Grid" ? (
                        <li
                          className="jun-sidebarMenuItem"
                          key={`Sub Section ${item.label}`}
                        >
                          <Link
                            className="link text-dark700_light400 jun-sidebarMenuButton transition-all duration-150 hover:bg-light-300 hover:dark:bg-dark-700"
                            href={item.path}
                          >
                            <span
                              className={cn(
                                "jun-sidebarText",
                                isActive &&
                                  "text-secondary-orange dark:text-primary-lime",
                              )}
                            >
                              {item.label}
                            </span>
                          </Link>
                        </li>
                      ) : (
                        <li
                          className="jun-sidebarMenuItem"
                          key={`Sub Section ${item.label}`}
                        >
                          {isMobile ? (
                            <>
                              <div className="link-label jun-sidebarText">
                                {item.label}
                              </div>
                              <div className="jun-sidebarGroupText">
                                <ul className="jun-sidebarMenu jun-sidebarMenu-nested">
                                  {item.children?.map((child) => (
                                    <li
                                      className="jun-sidebarMenuItem"
                                      key={`Super Sub Section ${child.label}`}
                                    >
                                      <Link
                                        className="link text-dark700_light400 jun-sidebarMenuButton transition-all duration-150 hover:bg-light-300 hover:dark:bg-dark-700"
                                        href={child.path}
                                      >
                                        <span
                                          className={cn(
                                            "jun-sidebarText",
                                            pathName.includes(child.path) &&
                                              "text-secondary-orange dark:text-primary-lime",
                                          )}
                                        >
                                          {child.label}
                                        </span>
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </>
                          ) : (
                            <>
                              <label
                                htmlFor={`menu-${item.label}`}
                                className="jun-sidebarMenuButton jun-collapsibleTrigger"
                              >
                                <span className="link-label jun-sidebarText">
                                  {item.label}
                                </span>
                                <ChevronDown className="jun-collapsibleIcon jun-collapsibleIcon-rotate-180 size-4" />
                                <input
                                  type="checkbox"
                                  className="sr-only"
                                  id={`menu-${item.label}`}
                                  defaultChecked
                                />
                              </label>
                              <div className="jun-collapsibleContent">
                                <div>
                                  <ul className="jun-sidebarMenu jun-sidebarMenu-nested">
                                    {item.children?.map((child) => {
                                      isActive = pathName.includes(child.path);
                                      return (
                                        <li
                                          className="jun-sidebarMenuItem"
                                          key={`Super Sub Section ${child.path}`}
                                        >
                                          <Link
                                            className="link text-dark700_light400 jun-sidebarMenuButton transition-all duration-150 hover:bg-light-300 hover:dark:bg-dark-700"
                                            href={child.path}
                                          >
                                            <span
                                              className={cn(
                                                "jun-sidebarText",
                                                isActive &&
                                                  "text-secondary-orange dark:text-primary-lime",
                                              )}
                                            >
                                              {child.label}
                                            </span>
                                          </Link>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </div>
                              </div>
                            </>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SidebarContent;
