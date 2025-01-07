"use client";

import Editor from "@monaco-editor/react";
import { Copy, Redo, Undo } from "lucide-react";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import "prismjs/components/prism-css";
import "prismjs/themes/prism-tomorrow.css";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
      `<div class="box flex items-center justify-center text-white">
  Hover Me!
</div>`,
  );

  const [preview, setPreview] = useState("");
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    updatePreview();
  }, [cssCode, htmlCode]);

  const updatePreview = () => {
    const combinedContent = `
      <html>
        <head>
          <style>${cssCode}</style>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
          ${htmlCode}
        </body>
      </html>
    `;
    setPreview(combinedContent);
  };

  function handleEditorDidMount(editor: string) {
    setInterval(() => {
      editorRef.current = editor;
    }, 200);
  }

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      // อาจจะเพิ่ม toast notification ตรงนี้
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleUndo = () => {
    editorRef.current?.trigger("keyboard", "undo");
  };

  const handleRedo = () => {
    editorRef.current?.trigger("keyboard", "redo");
  };

  return (
    <div className="flex h-fit w-full gap-4 rounded-lg bg-zinc-700 p-4">
      <div className="flex w-1/2 flex-col">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Code Editor</h2>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={handleUndo}>
              <Undo className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleRedo}>
              <Redo className="size-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="html" className="flex-1">
          <TabsList className="mb-2">
            <TabsTrigger value="html">HTML</TabsTrigger>
            <TabsTrigger value="css">CSS</TabsTrigger>
          </TabsList>

          <TabsContent value="html" className="flex-1 rounded-lg">
            <div className="relative h-full">
              <Editor
                height="500px"
                defaultLanguage="html"
                value={htmlCode}
                onChange={(value) => setHtmlCode(value || "")}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: "on",
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  readOnly: false,
                  automaticLayout: true,
                }}
                onMount={handleEditorDidMount}
              />

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2"
                onClick={() => copyToClipboard(htmlCode)}
              >
                <Copy className="size-4" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="css" className="flex-1 rounded-lg">
            <div className="relative h-full">
              <Editor
                height="500px"
                defaultLanguage="css"
                value={cssCode}
                onChange={(value) => setCssCode(value || "")}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: "on",
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  readOnly: false,
                  automaticLayout: true,
                }}
                onMount={handleEditorDidMount}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2"
                onClick={() => copyToClipboard(cssCode)}
              >
                <Copy className="size-4" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="w-1/2">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-white">Preview</h2>
        </div>
        <div className="h-full rounded-lg bg-white">
          <iframe
            srcDoc={preview}
            className="size-full rounded-lg"
            title="preview"
          />
        </div>
      </div>
    </div>
  );
};

// dynamic import เพื่อไม่ให้ SSR ทำงานกับ component นี้
export default dynamic(() => Promise.resolve(CodeEditor), {
  ssr: false,
});
