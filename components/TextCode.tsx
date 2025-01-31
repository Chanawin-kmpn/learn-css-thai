import React from "react";

import { TextCodeProps } from "@/types/types";

const TextCode = ({ children, backgroundMode = "default" }: TextCodeProps) => {
  const background = getBackground(backgroundMode);
  return (
    <code
      className={`relative -mx-px my-px inline text-nowrap rounded-sm px-[6px] py-[2px] tracking-tight mix-blend-darken dark:mix-blend-lighten ${background}`}
    >
      {children}
    </code>
  );
};

function getBackground(backgroundMode: TextCodeProps["backgroundMode"]) {
  switch (backgroundMode) {
    case "warning":
      return "bg-amber-200 dark:bg-amber-950";
    case "info":
      return "bg-blue-200 dark:bg-blue-950";
    case "default":
      return "bg-zinc-200 dark:bg-zinc-700";
  }
}

export default TextCode;
