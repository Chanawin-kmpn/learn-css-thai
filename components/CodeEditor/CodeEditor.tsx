/* eslint-disable tailwindcss/classnames-order */
"use client";

import dynamic from "next/dynamic";
import Prism from "prismjs";
import React, { useState, useEffect } from "react";
import Editor from "react-simple-code-editor";
import "prismjs/components/prism-css";
import "prismjs/themes/prism-tomorrow.css";

/**
 * ตัวอย่าง Live CSS Playground:
 * - ด้านซ้าย: Edit code CSS
 * - ด้านขวา: Preview ผลลัพธ์
 */

interface LiveCSSPlaygroundProps {
  initialCSS?: string;
  initialHtml?: string;
}

const CodeEditor: React.FC<LiveCSSPlaygroundProps> = ({
  initialCSS,
  initialHtml,
}) => {
  const [cssCode, setCssCode] = useState(
    initialCSS ||
      `/* พิมพ์แก้ไขโค้ด CSS ได้ที่นี่ */
.box {
  width: 100px;
  height: 100px;
  background-color: royalblue;
  transition: transform 0.3s ease;
}

.box:hover {
  transform: rotate(20deg) scale(1.2);
}`,
  );
  const [htmlCode, setHtmlCode] = useState(
    initialHtml ||
      `<div className="box flex items-center justify-center text-white">
          Hover Me!
        </div>`,
  );

  // ฟังก์ชัน highlight โค้ดด้วย Prism
  const highlightWithPrism = (code: string) => {
    return Prism.highlight(code, Prism.languages.css, "css");
  };

  return (
    <div className="flex size-full flex-col gap-4 md:flex-row">
      {/* Editor ด้านซ้าย */}
      <div className="md:w-1/2">
        <Editor
          value={cssCode}
          onValueChange={(newCode) => setCssCode(newCode)}
          highlight={(code) => highlightWithPrism(code)}
          padding={16}
          className="bg-zinc-700 p-4 font-firaCode text-sm lg:text-lg"
        />
      </div>

      {/* Preview ด้านขวา */}
      <div className="relative rounded-md border border-gray-600 p-4 md:w-1/2">
        {/* ใส่ CSS ที่ผู้ใช้แก้ไขลงใน style tag */}
        <style>{cssCode}</style>
        <div className="box flex items-center justify-center text-white">
          Hover Me!
        </div>
      </div>
    </div>
  );
};

// dynamic import เพื่อไม่ให้ SSR ทำงานกับ component นี้
export default dynamic(() => Promise.resolve(CodeEditor), {
  ssr: false,
});
