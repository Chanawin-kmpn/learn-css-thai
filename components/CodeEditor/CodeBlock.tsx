/* eslint-disable tailwindcss/no-custom-classname */
"use client";
import { Check, Copy } from "lucide-react";
import dynamic from "next/dynamic";
import Prism from "prismjs";
import React, { useEffect, useState } from "react";

import "prismjs/components/prism-css"; // import language support

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = "css" }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  return (
    <div className="relative">
      <button
        onClick={copyToClipboard}
        className="absolute right-2 top-2 rounded-md bg-zinc-500 p-1"
      >
        {copied ? (
          <span className="flex items-center gap-1 text-sm text-zinc-900">
            <Check className="size-4 text-lime-500" />
            Copied!
          </span>
        ) : (
          <span className="flex items-center gap-1 text-sm text-zinc-900">
            <Copy className="size-4 text-zinc-900" />
            Copy
          </span>
        )}
      </button>

      <pre className="overflow-x-scroll rounded-md bg-zinc-700 p-4">
        <code className={`language-${language} text-sm lg:text-base`}>
          {code}
        </code>
      </pre>
    </div>
  );
};

export default dynamic(() => Promise.resolve(CodeBlock), {
  ssr: false,
});
