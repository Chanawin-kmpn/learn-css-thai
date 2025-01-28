import React, { useEffect, useState } from "react";

import useDebouncedValues from "@/hooks/use-debounced-values";
import constructSnippet from "@/lib/constructSnippet";

type ResultProps = {
  id: string;
  codeMap: {
    markup: string | undefined;
    css: string | undefined;
    javascript: string | undefined;
  };
  mode: "default" | "react";
  centered: boolean;
  stretched: boolean;
  boxSizing: string;
  layoutMode: "codepen" | "side-by-side" | "vertical-stack" | "tabbed";
  isFullscreened: boolean;
  style?: React.CSSProperties;
};

const Result = React.memo(function Result({
  id,
  codeMap,
  mode,
  centered,
  stretched,
  boxSizing,
  layoutMode,
  isFullscreened,
  style = {},
}: ResultProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);

    try {
      const code = constructSnippet({
        id,
        codeMap,
        mode,
        centered,
        boxSizing,
      });

      setCode(code);

      setError(null);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(String(error));
      }
    }
  }, [id, codeMap, mode, boxSizing, centered]);

  useEffect(() => {
    function waitForMessage() {
      if (typeof window !== "undefined") {
        window.addEventListener("message", (data) => {
          const frameId = `frame-${id}`;

          if (data.data.source !== frameId) {
            return;
          }

          if (data.data.message.type === "error") {
            setError(data.data.message.data);
          }

          setLoading(false);
        });
      }
    }

    waitForMessage();
  }, [id]);

  const resize =
    layoutMode === "codepen"
      ? isFullscreened
        ? "horizontal"
        : "both"
      : undefined;

  return (
    <div
      style={{ ...style }}
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className={`${`resize-${resize}`} relative rounded-[4px] bg-white ${stretched && "flex-1"} ${stretched && "h-full"} mx-auto my-0 min-h-[360px] w-full max-w-full overflow-hidden`}
    >
      {loading && (
        <div className="absolute right-4 top-4 z-50 text-zinc-900 opacity-50">
          Loading...
        </div>
      )}
      <iframe
        title={"example"}
        srcDoc={code!}
        loading="lazy"
        className="absolute left-0 top-0 block size-full"
      />
      {error && <div>{error}</div>}
    </div>
  );
});

const DebouncedResult = (props: ResultProps) => {
  const debouncedProps = useDebouncedValues(250, props);

  return <Result {...debouncedProps} />;
};

export default DebouncedResult;
