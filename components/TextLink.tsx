import Link from "next/link";
import React from "react";

interface TextLinkProps {
  href: string;
  children: React.ReactNode;
}

const TextLink = ({ href, children }: TextLinkProps) => {
  return (
    <span className="whitespace-nowrap">
      <Link
        className="inline-flex items-center gap-1 font-bold underline transition-colors duration-200 hover:text-secondary-orange dark:hover:text-primary-lime"
        href={href}
        target="_blank"
      >
        {children}
      </Link>
    </span>
  );
};

export default TextLink;
