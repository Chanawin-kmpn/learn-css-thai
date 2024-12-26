import { ChevronDown } from "lucide-react";
import Link from "next/link";
import React from "react";

import ROUTES from "@/constants/router";

import { CloseDrawerButton } from "../Triggers";
import { Button } from "../ui/button";

const SidebarContent = () => {
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
                    {section.children.map((item) =>
                      item.label !== "Flexbox" && item.label !== "CSS Grid" ? (
                        <li
                          className="jun-sidebarMenuItem"
                          key={`Sub Section ${item.label}`}
                        >
                          <Button
                            variant="ghost"
                            className="jun-sidebarMenuButton"
                          >
                            <Link
                              className="link text-dark700_light400 jun-sidebarText"
                              href={item.path}
                            >
                              {item.label}
                            </Link>
                          </Button>
                        </li>
                      ) : (
                        <li
                          className="jun-sidebarMenu-nested jun-sidebarMenuItem"
                          key={`Sub Section ${item.label}`}
                        >
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
                              // defaultChecked
                            />
                          </label>
                          <div className="jun-collapsibleContent">
                            <div>
                              <ul className="jun-sidebarMenu jun-sidebarMenu-nested">
                                {item.children?.map((child) => (
                                  <li
                                    className="jun-sidebarMenuItem"
                                    key={`Super Sub Section ${child.path}`}
                                  >
                                    <Button
                                      variant="ghost"
                                      className="jun-sidebarMenuButton"
                                    >
                                      <Link
                                        className="link text-dark700_light400 jun-sidebarText"
                                        href={child.path}
                                      >
                                        {child.label}
                                      </Link>
                                    </Button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </li>
                      ),
                    )}
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
