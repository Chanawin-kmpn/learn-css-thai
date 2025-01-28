/* eslint-disable import/no-duplicates */
import type * as PrettierType from "prettier";
import type { Plugin } from "prettier";
import { useState, useEffect, useCallback, useMemo } from "react";

interface PrettierStandalone {
  format: (source: string, options: PrettierType.Options) => Promise<string>;
}

interface UsePaneData {
  mode: "default" | "react";
  htmlCode: string | undefined;
  setHtmlCode: (code: string) => void;
  cssCode: string | undefined;
  setCssCode: (code: string) => void;
  jsCode: string | undefined;
  setJsCode: (code: string) => void;
}

interface UsePrettier {
  htmlCode: string | undefined;
  setHtmlCode: (code: string) => void;
  cssCode: string | undefined;
  setCssCode: (code: string) => void;
  jsCode: string | undefined;
  setJsCode: (code: string) => void;
}

export function usePrettier({
  htmlCode,
  setHtmlCode,
  cssCode,
  setCssCode,
  jsCode,
  setJsCode,
}: UsePrettier) {
  const [prettier, setPrettier] = useState<PrettierStandalone | null>(null);
  const [babelParser, setBabelParser] = useState<Plugin | null>(null);
  const [cssParser, setCssParser] = useState<Plugin | null>(null);
  const [htmlParser, setHtmlParser] = useState<Plugin | null>(null);

  useEffect(() => {
    Promise.all([
      import("prettier/standalone"),
      import("prettier/parser-html"),
      import("prettier/parser-postcss"),
      import("prettier/parser-babel"),
    ])
      .then(([prettierModule, htmlModule, cssModule, babelModule]) => {
        setPrettier(prettierModule.default as PrettierStandalone);
        setHtmlParser(htmlModule.default);
        setCssParser(cssModule.default);
        setBabelParser(babelModule.default);
      })
      .catch((err) => {
        console.error("Could not load Prettier and its parsers:", err);
      });
  }, []);

  const hasLoaded = !!prettier && !!htmlParser && !!cssParser && !!babelParser;

  const handleFormat = useCallback(async () => {
    if (!hasLoaded || !prettier || !htmlParser || !cssParser || !babelParser) {
      return;
    }

    const prettierOptions = {
      printWidth: 40,
    };

    if (jsCode) {
      const formattedJsCode = await prettier.format(jsCode, {
        parser: "babel",
        plugins: [babelParser],
        ...prettierOptions,
      });
      setJsCode(formattedJsCode);
    }

    if (cssCode) {
      const formattedCssCode = await prettier.format(cssCode, {
        parser: "css",
        plugins: [cssParser],
        ...prettierOptions,
      });
      setCssCode(formattedCssCode);
    }

    if (htmlCode) {
      const formattedHtmlCode = await prettier.format(htmlCode, {
        parser: "html",
        plugins: [htmlParser],
        ...prettierOptions,
      });
      setHtmlCode(formattedHtmlCode);
    }
  }, [
    hasLoaded,
    jsCode,
    cssCode,
    htmlCode,
    babelParser,
    cssParser,
    htmlParser,
    prettier,
    setCssCode,
    setHtmlCode,
    setJsCode,
  ]);

  return handleFormat;
}

export function usePaneData({
  mode,
  htmlCode,
  setHtmlCode,
  cssCode,
  setCssCode,
  jsCode,
  setJsCode,
}: UsePaneData) {
  const panes = useMemo(() => {
    const paneData = [
      {
        language: "markup",
        label: "index.html",
        code: htmlCode,
        handleUpdate: setHtmlCode,
      },
      {
        language: "css",
        label: "style.css",
        code: cssCode,
        handleUpdate: setCssCode,
      },
    ];

    if (mode === "react") {
      paneData.unshift({
        language: "jsx",
        label: "JSX",
        code: jsCode,
        handleUpdate: setJsCode,
      });
    } else {
      paneData.push({
        language: "javascript",
        label: "JS",
        code: jsCode,
        handleUpdate: setJsCode,
      });
    }

    return paneData.filter(({ code }) => typeof code === "string");
  }, [mode, htmlCode, cssCode, jsCode, setHtmlCode, setCssCode, setJsCode]);

  if (panes.length === 0 || panes.length === 3) {
    console.error(
      "Passed the wrong number of code snippets! I only understand 1 or 2 code snippets at once",
    );
  }

  return panes;
}

export function useFullscreen(
  startFullscreened: boolean,
): [boolean, () => void] {
  const [isFullscreened, setIsFullscreened] = useState(startFullscreened);

  useEffect(() => {
    if (!isFullscreened) {
      return;
    }

    function handleKeydown(ev: KeyboardEvent) {
      if (ev.key === "Escape") {
        setIsFullscreened(false);
      }
    }

    window.addEventListener("keydown", handleKeydown);

    window.requestAnimationFrame(() => {
      const fullscreenElem = document.querySelector(`#fs-wrapper`);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      fullscreenElem?.focus();
    });

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [isFullscreened]);

  return [isFullscreened, () => setIsFullscreened((prev) => !prev)];
}
