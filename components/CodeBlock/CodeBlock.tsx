/* eslint-disable tailwindcss/no-custom-classname */
"use client";
import { Check, Copy } from "lucide-react";
import dynamic from "next/dynamic";
import React, { useEffect, useState, memo } from "react";

// 1. แยก Prism import และ highlight ให้โหลดแบบ lazy
const loadPrism = async () => {
  try {
    // Import Prism core
    const Prism = (await import("prismjs")).default;

    // Import language support แบบ ignore types
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await import("prismjs/components/prism-css" as any);

    return Prism;
  } catch (error) {
    console.error("Failed to load Prism:", error);
    return null;
  }
};

interface CodeBlockProps {
  children: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = memo(
  ({ children, language = "css" }) => {
    const [copied, setCopied] = useState(false);

    // 2. แยก copy logic ออกมาเป็น callback
    const copyToClipboard = React.useCallback(async () => {
      try {
        await navigator.clipboard.writeText(children);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy text:", err);
      }
    }, [children]);

    // 3. ปรับปรุง useEffect ให้ทำงานเฉพาะเมื่อจำเป็น
    useEffect(() => {
      let mounted = true;

      const highlight = async () => {
        if (typeof window === "undefined") return;

        try {
          const Prism = await loadPrism();
          if (mounted) {
            Prism!.highlightElement(
              document.querySelector(`code[class*="language-${language}"]`)!,
            );
          }
        } catch (error) {
          console.error("Failed to load Prism:", error);
        }
      };

      highlight();

      return () => {
        mounted = false;
      };
    }, [children, language]);

    // 4. แยก Button component
    const CopyButton = () => (
      <button
        onClick={copyToClipboard}
        className="absolute right-2 top-2 rounded-md border border-zinc-900 bg-zinc-200 p-1 dark:border-zinc-200 dark:bg-zinc-900"
        aria-label={copied ? "Copied!" : "Copy code"}
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
      </button>
    );

    return (
      <div className="relative rounded-md border border-primary-lime bg-zinc-200 dark:bg-transparent">
        <CopyButton />
        <pre className="p-4">
          <code className={`language-${language} text-sm lg:text-base`}>
            {children}
          </code>
        </pre>
      </div>
    );
  },
);

// 5. Add display name for debugging
CodeBlock.displayName = "CodeBlock";

// 6. ใช้ dynamic import with loading optimization
export default dynamic(() => Promise.resolve(CodeBlock), {
  ssr: false,
  loading: () => (
    <div className="relative rounded-md border border-primary-lime bg-zinc-200 dark:bg-transparent">
      <pre className="p-4">
        <code className="text-sm opacity-50 lg:text-base">Loading...</code>
      </pre>
    </div>
  ),
});
