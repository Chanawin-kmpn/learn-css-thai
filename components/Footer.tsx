"use client";
import { Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import ROUTES from "@/constants/router";
import { checkDocsPath } from "@/lib/utils";

const Footer = () => {
  const pathName = usePathname();
  const isDocsPath = checkDocsPath(pathName);
  return (
    <div className="jun-footer flex flex-col gap-4 border-t border-dark-700/20 px-8 py-4 dark:border-light-400/20 lg:gap-8 lg:px-8 lg:py-4">
      {isDocsPath && (
        <div className="lg:hidden">
          <Image src="/images/logo.png" alt="CSS logo" width={56} height={56} />
        </div>
      )}
      {!isDocsPath && (
        <div className="flex flex-col gap-4">
          <div className="lg:hidden">
            <Image
              src="/images/logo.png"
              alt="CSS logo"
              width={56}
              height={56}
            />
          </div>
          <ul className="grid grid-cols-2 justify-start gap-8 lg:grid-cols-3">
            {ROUTES.map((section) => (
              <li className="" key={section.label}>
                <div className="link-label mb-2">{section.label}</div>
                <ul className="">
                  {section.children.map((item) => {
                    if (item.children) {
                      return (
                        <li key={item.label} className="mb-2 ml-4">
                          <div className="link-label mb-2">{item.label}</div>
                          <ul>
                            {item.children.map((child) => (
                              <li key={child.label} className="ml-4">
                                <Link
                                  className="link text-dark700_light400"
                                  href={child.path}
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      );
                    } else {
                      return (
                        <li key={item.label} className="ml-4">
                          <Link
                            className="link text-dark700_light400"
                            href={item.path}
                          >
                            {item.label}
                          </Link>
                        </li>
                      );
                    }
                  })}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="text-dark700_light400 flex items-center justify-between">
        <div className="hidden lg:block">
          <Image src="/images/logo.png" alt="CSS logo" width={56} height={56} />
        </div>

        <p className="text-xs">Copyright &copy; 2024 Chanawin</p>
        <Link href="https://github.com/Chanawin-kmpn" target="_blank">
          <Github />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
