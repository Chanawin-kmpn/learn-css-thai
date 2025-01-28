import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import React, { useEffect, useState } from "react";

import FormatIcon, { Status } from "@/components/AnimationIcons/FormatIcon";
import { Tooltip } from "@/components/ui/tooltip";
import VisuallyHidden from "@/components/VisuallyHidden/VisuallyHidden";

interface FormatButtonProps {
  handleFormat: () => void;
}

const FormatButton = ({ handleFormat }: FormatButtonProps) => {
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (status !== "formatting") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setStatus("idle");
    }, 200);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [status]);
  return (
    <Tooltip>
      <TooltipTrigger
        onMouseEnter={() => setStatus("hovering")}
        onMouseLeave={() => {
          if (status !== "formatting") {
            setStatus("idle");
          }
        }}
        onMouseDown={() => setStatus("pressed")}
        onMouseUp={() => setStatus("formatting")}
        onClick={handleFormat}
        className="action-btn origin-center"
      >
        <FormatIcon status={status} />
        <VisuallyHidden>Format code using Prettier</VisuallyHidden>
      </TooltipTrigger>
      <TooltipContent>
        <p>Format code</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default FormatButton;
