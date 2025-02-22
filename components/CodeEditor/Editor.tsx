import { Highlight } from "prism-react-renderer";
import React, { ComponentRef, useRef, useState } from "react";
import { flushSync } from "react-dom";
import SimpleEditor from "react-simple-code-editor";

import { syntaxTheme } from "@/helpers/syntax.helpers";
import { moveCursorWithinInput } from "@/lib/utils";

import VisuallyHidden from "../VisuallyHidden/VisuallyHidden";

interface EditorProps {
  code: string | undefined;
  language: string;
  maxHeight?: string | undefined;
  handleUpdate: (code: string) => void;
  handleFormat: () => void;
}

interface SimpleEditorRef extends ComponentRef<typeof SimpleEditor> {
  _input: HTMLInputElement;
}

const Editor = ({
  code,
  language,
  maxHeight,
  handleUpdate,
  handleFormat,
}: EditorProps) => {
  const textareaRef = useRef<SimpleEditorRef>(null);
  const focusTrapperRef = useRef<HTMLButtonElement>(null);
  const [ignoreTabKey, setIgnoreTabKey] = useState(false);
  const [isFocusingYellowBox, setIsFocusingYellowBox] = useState(false);

  function handleKeyDown(ev: React.KeyboardEvent) {
    if (ev.metaKey && ev.key === "s") {
      if (textareaRef.current) {
        const input: HTMLInputElement = textareaRef.current._input;
        const cursorAt = input.selectionStart;

        window.requestAnimationFrame(() => {
          moveCursorWithinInput(input, cursorAt!);
        });
      }

      ev.preventDefault();
      handleFormat();

      // NOTE: This doesn't actually work super well. It's off by a few positions. It's still better than doing nothing, since that always shoves the cursor to the very end, but it's not perfect.
      // Rather than fix, though, I should migrate to Sandpack, assuming the Static template stuff can be resolved.
    }

    if (ev.key === "Escape") {
      focusTrapperRef.current!.focus();
      setIgnoreTabKey(true);
    }

    if (ev.shiftKey && ev.key === "Tab") {
      const input = textareaRef.current!._input;
      const cursorAt = input.selectionStart;

      if (cursorAt === 0) {
        ev.preventDefault();
        focusTrapperRef.current!.focus();
      }
    }
  }
  return (
    <div data-in={String(ignoreTabKey)} style={{ maxHeight: `${maxHeight}px` }}>
      <button
        ref={focusTrapperRef}
        onFocus={() => setIsFocusingYellowBox(true)}
        onBlur={() => setIsFocusingYellowBox(false)}
        onKeyDown={(ev: React.KeyboardEvent<HTMLButtonElement>): void => {
          ev.stopPropagation();
          ev.preventDefault();

          flushSync(() => {
            setIsFocusingYellowBox(false);
          });

          const input = textareaRef.current!._input;
          input.focus();
        }}
      >
        <span className="sr-only">
          Focus the editor. This will trap focus until you press Escape.
        </span>
      </button>
      <label htmlFor="code-editor" inert={isFocusingYellowBox}>
        <SimpleEditor
          id="code-editor"
          ref={textareaRef}
          value={code!}
          onValueChange={handleUpdate}
          onKeyDown={handleKeyDown}
          translate="no"
          className="code-editor p-4 font-firaCode"
          highlight={(code) => (
            <Highlight theme={syntaxTheme} code={code} language={language}>
              {({ tokens, getLineProps, getTokenProps }) => (
                <>
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line })}>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                    </div>
                  ))}
                </>
              )}
            </Highlight>
          )}
        />
        <VisuallyHidden>Label for Code Editor</VisuallyHidden>
      </label>
    </div>
  );
};

export default Editor;
