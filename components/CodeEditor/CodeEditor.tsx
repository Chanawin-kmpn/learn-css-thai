"use client";

import Editor from "@monaco-editor/react";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

import "prismjs/components/prism-css";
import "prismjs/themes/prism-tomorrow.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CSSCode, HTMLCode } from "@/constants/code";

// * ไอเดีย ใช้ layout ของ sandpack แต่ว่า editor ใช้ของ Monaco
// ! ศึกษา https://www.joshwcomeau.com/react/next-level-playground/

const CodeEditor = () => {
  const [cssCode, setCssCode] = useState(CSSCode);
  const [htmlCode, setHtmlCode] = useState(HTMLCode);
  const [previewContent, setPreviewContent] = useState("");

  const createPreviewContent = (htmlCode: string, cssCode: string) => {
    return `  
      <!DOCTYPE html>  
      <html>  
        <head>  
          <style>${cssCode}</style>  
        </head>  
        <body>${htmlCode}</body>  
      </html>  
    `;
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (htmlCode && cssCode) {
        const content = createPreviewContent(htmlCode, cssCode);
        setPreviewContent(content);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [htmlCode, cssCode]);

  const handleCssEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCssCode(value);
    }
  };

  const handleHtmlEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setHtmlCode(value);
    }
  };

  return (
    <div className="flex h-[34rem] w-full flex-col rounded-lg bg-zinc-700">
      <header className="flex h-16 w-full items-center justify-between rounded-t-lg bg-zinc-900 px-4">
        <p className="text-sm font-bold text-zinc-300">Code Playground</p>
        <div></div>
      </header>
      <div className="flex h-full flex-col p-4 lg:flex-row">
        <div className="min-w-52 rounded-md bg-zinc-500">
          <div className="h-full overflow-hidden rounded-b-md">
            <Tabs defaultValue="css" className="h-full">
              <TabsList className="w-full justify-start rounded-b-none bg-zinc-700">
                <TabsTrigger value="css" className="rounded-md">
                  style.css
                </TabsTrigger>
                <TabsTrigger value="html" className="rounded-md">
                  index.html
                </TabsTrigger>
              </TabsList>
              <TabsContent value="css" className="mt-0 h-[calc(100%-2.5rem)]">
                <Editor
                  height="100%"
                  language="css"
                  defaultValue={cssCode}
                  options={{
                    minimap: { enabled: false },
                  }}
                  onChange={handleCssEditorChange}
                />
              </TabsContent>
              <TabsContent value="html" className="mt-0 h-[calc(100%-2.5rem)]">
                <Editor
                  height="100%"
                  language="html"
                  defaultValue={htmlCode}
                  options={{
                    minimap: { enabled: false },
                  }}
                  onChange={handleHtmlEditorChange}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <button className="resize"></button>
        <div className="min-w-52 overflow-hidden rounded-md bg-zinc-800">
          <div className="flex h-10 items-center justify-start px-4">
            <p className="text-base font-bold">Result</p>
          </div>
          <iframe
            srcDoc={previewContent}
            className="size-full border-none text-dark-900"
            sandbox="allow-scripts"
            title="preview"
          />{" "}
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(CodeEditor), {
  ssr: false,
});
