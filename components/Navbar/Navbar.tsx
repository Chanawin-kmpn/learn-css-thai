import Image from "next/image";
import Link from "next/link";
import React from "react";

import NavLinks from "./NavLinks";

const Navbar = () => {
  return (
    <>
      <nav className="flex-between bg-nav jun-header sticky top-0 w-full border-b border-dark-900/10 p-4 jun-header-h-[4.6875rem] dark:border-white/10">
        <Link href="/">
          <Image src="/images/logo.png" width={56} height={56} alt="CSS Logo" />
        </Link>

        <div>
          <section>
            <NavLinks />
          </section>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
