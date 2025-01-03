"use client";

import { EllipsisVertical, Minus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { navbarLinks } from "@/constants";
import { checkDocsPath, cn } from "@/lib/utils";

import Theme from "./Theme";

const NavLinks = () => {
  const pathName = usePathname();

  return (
    <div className="flex items-center gap-16">
      <div className="flex-between gap-4 lg:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <EllipsisVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {navbarLinks.map((link) => (
              <DropdownMenuItem key={link.label} asChild>
                <Link href={link.href}>{link.label}</Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Theme</DropdownMenuLabel>
            <Theme isMobile={true} />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="hidden items-center lg:flex">
        <div className="space-x-4">
          {navbarLinks.map((link) => {
            const isDocsActive = checkDocsPath(pathName);
            const isBlogsActive = pathName.startsWith("/blogs");

            const isActive = checkDocsPath(link.href)
              ? isDocsActive
              : link.href.startsWith("/blogs")
                ? isBlogsActive
                : pathName === link.href;

            return (
              <Link
                className={cn(
                  isActive
                    ? "text-primary-lime"
                    : "text-dark700 dark:text-light-100",
                  "link-label",
                )}
                key={link.label}
                href={link.href}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
        <Minus className="ml-4 rotate-90" />
        <Theme />
      </div>
    </div>
  );
};

export default NavLinks;
