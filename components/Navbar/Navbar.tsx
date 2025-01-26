"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { checkHomePath, cn } from "@/lib/utils";

import NavLinks from "./NavLinks";
import SearchButton from "../Search/SearchButton";

const Navbar = () => {
  const pathName = usePathname();
  const isHomePath = checkHomePath(pathName);
  return (
    <>
      <nav className="bg-nav jun-header sticky top-0 flex w-full gap-4 border-b border-dark-900/10 p-4 jun-header-h-[4.6875rem] dark:border-white/10 lg:gap-16 lg:px-8">
        <Link href="/">
          <div className="relative aspect-[56/46] w-[56px]">
            <Image
              src="/images/logo.png"
              fill
              className="object-contain"
              alt="CSS Logo"
            />
          </div>
        </Link>

        <div className="flex flex-1 items-center justify-end gap-4 lg:gap-16">
          <div
            className={cn(
              !isHomePath ? "lg:block lg:flex-1" : "block lg:hidden",
            )}
          >
            <SearchButton />
          </div>
          <section>
            <NavLinks />
          </section>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
