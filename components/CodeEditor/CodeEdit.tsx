/* eslint-disable tailwindcss/no-custom-classname */
"use client";

import { Copy, Check } from "lucide-react";
import dynamic from "next/dynamic";
import Prism from "prismjs";
import React, { useEffect, useRef, useState } from "react";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/themes/prism-tomorrow.css";

interface CodeEditorProps {
  initialCode?: string;
  language?: string;
  onChange?: (code: string) => void;
  readOnly?: boolean;
  showLineNumbers?: boolean;
  height?: string;
  placeholder?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode = "",
  language = "typescript",
  onChange,
  readOnly = false,
  showLineNumbers = true,
  height = "300px",
  placeholder = "// เริ่มเขียนโค้ดที่นี่...",
}) => {
  const [code, setCode] = useState(initialCode);
  const [copied, setCopied] = useState(false);
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  // อัพเดทการ highlight เมื่อโค้ดเปลี่ยน
  useEffect(() => {
    if (typeof window !== "undefined") {
      Prism.highlightAll();
    }
  }, [code]);

  // จัดการ tab key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newCode = code.substring(0, start) + "  " + code.substring(end);
      setCode(newCode);

      // เลื่อน cursor ไปที่ตำแหน่งหลัง tab
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.selectionStart = editorRef.current.selectionEnd =
            start + 2;
        }
      }, 0);
    }
  };

  // จัดการการเปลี่ยนแปลงของโค้ด
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    onChange?.(newCode);
  };

  // คัดลอกโค้ด
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // sync scroll ระหว่าง textarea และ highlighted code
  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (preRef.current) {
      preRef.current.scrollTop = e.currentTarget.scrollTop;
      preRef.current.scrollLeft = e.currentTarget.scrollLeft;
    }
  };

  return (
    <div className="relative rounded-lg border border-zinc-700 bg-[#1d1f21]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-700 px-4 py-2">
        <span className="text-sm text-zinc-400">{language.toUpperCase()}</span>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1 rounded-md bg-zinc-700/50 px-2 py-1 text-sm text-zinc-300 hover:bg-zinc-700/70 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {copied ? (
            <>
              <Check className="size-4" />
              <span className="select-none">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="size-4" />
              <span className="select-none">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Editor */}
      <div className="relative" style={{ height }}>
        <textarea
          ref={editorRef}
          value={code}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onScroll={handleScroll}
          spellCheck="false"
          readOnly={readOnly}
          placeholder={placeholder}
          className="absolute inset-0 w-full resize-none bg-transparent p-4 font-mono text-transparent caret-white outline-none"
          style={{
            WebkitTextFillColor: "transparent",
            lineHeight: "1.5rem",
          }}
        />
        <pre
          ref={preRef}
          className={`pointer-events-none absolute inset-0 m-0 w-full overflow-auto p-4 ${showLineNumbers ? "line-numbers" : ""}`}
          aria-hidden="true"
        >
          <code className={`language-${language} block text-left`}>
            {code || placeholder}
          </code>
        </pre>
      </div>

      <style jsx global>{`
        /* Base Token Colors */
        .token.comment {
          color: #6b7280 !important;
        }
        .token.keyword {
          color: #c678dd !important;
        }
        .token.string {
          color: #98c379 !important;
        }
        .token.number {
          color: #d19a66 !important;
        }
        .token.boolean {
          color: #d19a66 !important;
        }
        .token.function {
          color: #61afef !important;
        }
        .token.class-name {
          color: #e5c07b !important;
        }
        .token.type {
          color: #e5c07b !important;
        }
        .token.interface {
          color: #e5c07b !important;
        }

        /* JSX/TSX Specific */
        .token.tag {
          color: #e06c75 !important;
        }
        .token.attr-name {
          color: #d19a66 !important;
        }
        .token.attr-value {
          color: #98c379 !important;
        }
        .token.punctuation {
          color: #abb2bf !important;
        }
        .token.operator {
          color: #56b6c2 !important;
        }

        /* Line Numbers */
        .line-numbers .line-numbers-rows {
          border-right: 1px solid #404040;
          padding: 1rem 0;
          left: 0;
          width: 2.5rem;
        }

        .line-numbers .line-numbers-rows > span:before {
          color: #636363;
          padding-right: 1rem;
        }

        /* Scrollbar */
        textarea::-webkit-scrollbar,
        pre::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        textarea::-webkit-scrollbar-track,
        pre::-webkit-scrollbar-track {
          background: #2d2d2d;
          border-radius: 4px;
        }

        textarea::-webkit-scrollbar-thumb,
        pre::-webkit-scrollbar-thumb {
          background: #505050;
          border-radius: 4px;
        }

        textarea::-webkit-scrollbar-thumb:hover,
        pre::-webkit-scrollbar-thumb:hover {
          background: #606060;
        }

        /* Placeholder */
        textarea::placeholder {
          color: #6b7280;
        }
      `}</style>
    </div>
  );
};

// ใช้ dynamic import เพื่อหลีกเลี่ยงปัญหา SSR
export default dynamic(() => Promise.resolve(CodeEditor), {
  ssr: false,
});
