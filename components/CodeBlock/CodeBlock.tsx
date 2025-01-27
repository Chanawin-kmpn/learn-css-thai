/* eslint-disable tailwindcss/no-custom-classname */
"use client";
import { Check, Copy } from "lucide-react";
import dynamic from "next/dynamic";
import Prism from "prismjs";
import React, { useEffect, useState } from "react";

import "prismjs/components/prism-css"; // import language support
import VisuallyHidden from "../VisuallyHidden/VisuallyHidden";

interface CodeBlockProps {
  children: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  children,
  language = "css",
}) => {
  const [copied, setCopied] = useState(false);
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  useEffect(() => {
    // ตรวจสอบว่าอยู่ใน browser environment
    if (typeof window !== "undefined") {
      Prism.highlightAll();
    }
  }, [children]);

  return (
    <div className="relative rounded-md border border-primary-lime bg-zinc-200 dark:bg-transparent">
      <button
        onClick={copyToClipboard}
        className="absolute right-2 top-2 rounded-md border border-zinc-900 bg-zinc-200 p-1 dark:border-zinc-200 dark:bg-zinc-900"
      >
        {copied ? (
          <span className="flex items-center gap-1 text-sm text-zinc-900 dark:text-zinc-200">
            <Check className="size-4 text-lime-500" />
            Copied!
          </span>
        ) : (
          <span className="flex items-center gap-1 text-sm text-zinc-900 dark:text-zinc-200">
            <Copy className="size-4 text-zinc-900 dark:text-zinc-200" />
            Copy
          </span>
        )}
        <VisuallyHidden>Copy button</VisuallyHidden>
      </button>

      <pre className="p-4">
        <code className={`language-${language} text-sm lg:text-base`}>
          {children}
        </code>
      </pre>
    </div>
  );
};

export default dynamic(() => Promise.resolve(CodeBlock), {
  ssr: false,
});
