"use client";
import React, { useMemo, useState } from "react";

import {
  useFullscreen,
  usePrettier,
  usePaneData,
} from "@/helpers/Playground.helpers";

import CodeWrapper from "./CodeWrapper";
import Editor from "./Editor";
import Pane from "./Pane";
import Result from "./Result";
import SplitPane from "./SplitPane";
import TabbedEditors from "./TabbedEditors";
import RefreshButton from "./Toolbar/RefreshButton";
import Toolbar from "./Toolbar/Toolbar";

interface PlaygroundProps {
  id: string;
  title: string;
  html?: string;
  css?: string;
  js?: string;
  mode: "default" | "react";
  layoutMode: "codepen" | "side-by-side" | "vertical-stack" | "tabbed";
  size: "normal" | "wide";
  centered: boolean;
  boxSizing: "content-box" | "border-box";
  splitRatio: string;
  resultStyle?: { [key: string]: string | number | undefined };
  stacked?: boolean;
  startFullscreened: boolean;
  hideTabCheckbox?: boolean;
}

const Playground = ({
  id,
  title,
  html,
  css,
  js,
  mode = "default",
  layoutMode,
  size = "normal",
  centered,
  boxSizing = "border-box",
  splitRatio = "0.5",
  resultStyle = {},
  stacked,
  startFullscreened,
}: PlaygroundProps) => {
  const [htmlCode, setHtmlCode] = useState(html?.trim());
  const [cssCode, setCssCode] = useState(css?.trim());
  const [jsCode, setJsCode] = useState(js?.trim());

  const [randomId, setRandomId] = useState("initial");

  const [isFullscreened, toggleFullscreen] = useFullscreen(startFullscreened);

  // TODO สร้างปุ่มที่ใช้ handleFormat

  const handleFormat = usePrettier({
    htmlCode,
    setHtmlCode,
    cssCode,
    setCssCode,
    jsCode,
    setJsCode,
  });

  // TODO สร้างข้อมูลที่ใช้ในการส่งข้อมูลที่ใช้กับ layout ที่หลากหลาย

  const paneData = usePaneData({
    mode,
    htmlCode,
    setHtmlCode,
    cssCode,
    setCssCode,
    jsCode,
    setJsCode,
  });

  function handleReset() {
    setHtmlCode(html?.trim());
    setCssCode(css?.trim());
    setJsCode(js?.trim());
  }

  const codeMap = useMemo(
    () => ({
      markup: htmlCode,
      css: cssCode,
      javascript: jsCode,
    }),
    [htmlCode, cssCode, jsCode],
  );

  layoutMode =
    layoutMode || (paneData.length === 1 ? "side-by-side" : "codepen");

  const stretchResults = isFullscreened || layoutMode !== "codepen";

  // สร้าง component ฝั่งขวาที่เป็นส่วนของ Result
  const resultPane = (
    <Pane
      title="Result"
      style={{ height: stretchResults ? "100%" : undefined }}
      actions={
        <RefreshButton
          handleRefresh={() => {
            setRandomId(Math.random().toString());
          }}
        />
      }
    >
      <Result
        key={randomId}
        id={id}
        codeMap={codeMap}
        mode={mode}
        centered={centered}
        stretched={stretchResults}
        layoutMode={layoutMode}
        isFullscreened={isFullscreened}
        boxSizing={boxSizing}
        style={resultStyle}
      />
    </Pane>
  );

  let contents;
  // สร้างเนื้อหาสำหรับ Codeeditor จาก layoutMode
  switch (layoutMode) {
    case "codepen": {
      const [firstPane, secondPane] = paneData;
      contents = (
        <>
          {/* Splitpane ที่รับเป็น CodeEdior  ซ้ายและขวา ซึ่ง ผลลัพธ์จะอยู่ข้างล่าง */}
          <SplitPane
            splitRatio={Number(splitRatio)}
            isFullscreened={isFullscreened}
            leftChild={
              <Pane title={firstPane.label}>
                <Editor
                  code={firstPane.code}
                  language={firstPane.language}
                  handleUpdate={firstPane.handleUpdate}
                  handleFormat={handleFormat}
                  maxHeight={isFullscreened ? undefined : "50vh"}
                />
              </Pane>
            }
            rightChild={
              <Pane title={secondPane.label}>
                <Editor
                  code={secondPane.code}
                  language={secondPane.language}
                  handleUpdate={secondPane.handleUpdate}
                  handleFormat={handleFormat}
                  maxHeight={isFullscreened ? undefined : "50vh"}
                />
              </Pane>
            }
          />
          <div className="h-full flex-1 border-t">{resultPane}</div>
        </>
      );
      break;
    }

    case "side-by-side": {
      const [data] = paneData;
      const { label, ...editorData } = data;
      contents = (
        <>
          {/* Splitpane จะรับ CodeEditor อันเดียว อยู่ทางด้านซ้าย และผลลัพธ์จะอยู่ด้านขวา */}
          <SplitPane
            splitRatio={Number(splitRatio)}
            isFullscreened={isFullscreened}
            leftChild={
              <Pane title={label} style={{ height: "100%" }}>
                <Editor
                  {...editorData}
                  handleFormat={handleFormat}
                  maxHeight={isFullscreened ? undefined : "100vh"}
                />
              </Pane>
            }
            rightChild={resultPane}
          />
        </>
      );
      break;
    }

    case "tabbed": {
      contents = (
        <SplitPane
          splitRatio={Number(splitRatio)}
          isFullscreened={isFullscreened}
          leftChild={
            <TabbedEditors
              paneData={paneData}
              splitRatio={Number(splitRatio)}
              maxHeight={!isFullscreened ? "80vh" : "100%"}
              handleFormat={handleFormat}
            />
          }
          rightChild={resultPane}
        />
      );
      break;
    }

    case "vertical-stack": {
      const [firstPane, secondPane] = paneData;
      contents = (
        <SplitPane
          splitRatio={Number(splitRatio)}
          isFullscreened={isFullscreened}
          leftChild={
            <div>
              <Pane title={firstPane.label} style={{ flex: 1, minHeight: 0 }}>
                <Editor
                  code={firstPane.code}
                  language={firstPane.language}
                  handleUpdate={firstPane.handleUpdate}
                  handleFormat={handleFormat}
                />
              </Pane>
              <div className="border-t border-zinc-700" />
              <Pane
                title={secondPane.label}
                style={{
                  flex: 1,
                  minHeight: 0,
                }}
              >
                <Editor
                  code={secondPane.code}
                  language={secondPane.language}
                  handleUpdate={secondPane.handleUpdate}
                  handleFormat={handleFormat}
                />
              </Pane>
            </div>
          }
          rightChild={resultPane}
        />
      );
      break;
    }
    default: {
      throw new Error("Unrecognized layout mode: " + layoutMode);
    }
  }

  return (
    <CodeWrapper
      data-id={id}
      size={size}
      stacked={!!stacked}
      isFullscreened={isFullscreened}
      // hideTabCheckbox={hideTabCheckbox}
    >
      <Toolbar
        title={title}
        isFullscreened={isFullscreened}
        handleToggleFullscreen={toggleFullscreen}
        handleReset={handleReset}
        handleFormat={handleFormat}
      />
      {contents}
    </CodeWrapper>
  );
};

export default Playground;
