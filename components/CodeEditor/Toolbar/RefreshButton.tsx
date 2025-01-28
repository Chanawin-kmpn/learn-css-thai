import { RefreshCw } from "lucide-react";
import React, { useState } from "react";

import VisuallyHidden from "@/components/VisuallyHidden/VisuallyHidden";

interface RefreshButtonProps {
  handleRefresh: () => void;
}

const RefreshButton = ({ handleRefresh }: RefreshButtonProps) => {
  const [rotation, setRotation] = useState(0);
  return (
    <abbr>
      <button
        title="Refresh Preview"
        className={`action-btn origin-center transition-all duration-500 ease-out`}
        style={{ transform: `rotate(${rotation}deg)` }} // This is a dynamic style
        onClick={() => {
          handleRefresh();
          setRotation((r) => r + 180);
        }}
      >
        <RefreshCw size={16} />
        <VisuallyHidden>Refresh for rerender result</VisuallyHidden>
      </button>
    </abbr>
  );
};

export default RefreshButton;
