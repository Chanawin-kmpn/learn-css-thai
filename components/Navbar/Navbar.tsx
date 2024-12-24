import Image from "next/image";
import Link from "next/link";
import React from "react";

import NavLinks from "./NavLinks";

const Navbar = () => {
  return (
    <nav className="flex-between bg-nav sticky top-0  border-b border-dark-900/10 p-4 dark:border-white/10">
      <Link href="/">
        <Image src="/images/logo.png" width={56} height={56} alt="CSS Logo" />
      </Link>

      <div>
        <section>
          <NavLinks />
        </section>
      </div>
    </nav>
  );
};

export default Navbar;
