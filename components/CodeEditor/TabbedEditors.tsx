/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";

import Editor from "./Editor";

interface TabbedEditorsProps {
  paneData: Array<{
    language: string;
    label: string;
    code: string | undefined;
    handleUpdate: (code: string) => void;
  }>;
  splitRatio: number;
  maxHeight: string;
  handleFormat: () => void;
}

const TabbedEditors = ({
  paneData,
  splitRatio,
  maxHeight,
  handleFormat,
  ...delegated
}: TabbedEditorsProps) => {
  const [firstPane, secondPane] = paneData;

  const [activeLanguage, setActiveLanguage] = useState(firstPane.language);

  const activePane =
    activeLanguage === firstPane.language ? firstPane : secondPane;
  return (
    <div className="flex h-full max-h-full flex-col p-4 pt-0" {...delegated}>
      <div className="flex h-[46px] items-center space-x-4 border-b border-zinc-500">
        {paneData.map(
          (pane: {
            language: string;
            label: string;
            code: string | undefined;
            handleUpdate: (code: string) => void;
          }) => (
            <button
              key={pane.language}
              className={`${pane === activePane ? "border border-transparent border-b-lime-500 font-bold text-zinc-900 dark:text-zinc-100" : "font-normal text-zinc-500 dark:text-zinc-400"} px-4 py-[10px] font-firaCode`}
              onClick={() => setActiveLanguage(pane.language)}
            >
              {pane.label}
            </button>
          ),
        )}
      </div>
      <div className="flex-1">
        <Editor
          code={activePane.code}
          language={activePane.language}
          handleUpdate={activePane.handleUpdate}
          handleFormat={handleFormat}
          maxHeight={maxHeight}
        />
      </div>
    </div>
  );
};

export default TabbedEditors;
