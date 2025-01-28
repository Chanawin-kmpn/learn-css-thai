import React from "react";

import { TooltipProvider } from "@/components/ui/tooltip";

import FormatButton from "./FormatButton";
import ResetButton from "./ResetButton";

interface ToolbarProps {
  title: string;
  isFullscreened: boolean;
  handleToggleFullscreen: () => void;
  handleReset: () => void;
  handleFormat: () => void;
}

const Toolbar = ({ title, handleReset, handleFormat }: ToolbarProps) => {
  return (
    <TooltipProvider>
      <div className="relative flex h-8 items-center justify-between rounded-t-[4px] bg-zinc-400 px-4 leading-8 dark:bg-zinc-700">
        <p className="font-firaCode text-sm font-bold">
          {title || "Code Playground"}
        </p>
        <div className="mr-[-10px] flex gap-2 text-white">
          <FormatButton handleFormat={handleFormat} />
          <ResetButton handleReset={handleReset} />
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Toolbar;
