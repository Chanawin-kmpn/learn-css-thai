import { RotateCcw } from "lucide-react";
import React from "react";

import VisuallyHidden from "@/components/VisuallyHidden/VisuallyHidden";
import { useToast } from "@/hooks/use-toast";
import { normalize } from "@/lib/utils";

const RESET_AFTER = 1000; // 1 วินาที

interface ResetButtonProps {
  handleReset: () => void;
}

const ResetButton = ({ handleReset }: ResetButtonProps) => {
  const { toast } = useToast();
  const [isRunning, setIsRunning] = React.useState(false);
  const [rotation, setRotation] = React.useState(0);
  const mouseDownAt = React.useRef<number | null>(null);

  // จัดการเมื่อกดปุ่ม
  function handleMouseDown() {
    mouseDownAt.current = Date.now();
    setIsRunning(true);
  }

  // จัดการเมื่อปล่อยปุ่ม
  function handleMouseUp() {
    if (!mouseDownAt.current) return;

    const delta = Date.now() - mouseDownAt.current;

    if (delta < 900) {
      toast({
        description: "กรุณากดปุ่มข้างไว้ 1 วินาที เพื่อรีเซ็ตโค้ด",
        variant: "destructive",
      });
    }

    setIsRunning(false);
    setRotation(0);
    mouseDownAt.current = null;
  }

  // อัพเดทการหมุนทุกๆ 20ms
  React.useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      if (!mouseDownAt.current) return;

      const delta = Date.now() - mouseDownAt.current;

      if (delta > RESET_AFTER) {
        handleReset();
        setIsRunning(false);
        setRotation(0);
        return;
      }

      // แปลงเวลาเป็นองศาการหมุน (0-360)
      const degrees = normalize(delta, 0, RESET_AFTER, 0, 360);
      setRotation(degrees);
    }, 20);

    return () => clearInterval(intervalId);
  }, [isRunning, handleReset]);

  return (
    <button
      className="action-btn"
      title="Reset Code"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // เผื่อเมาส์เลื่อนออกนอกปุ่ม
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      <RotateCcw
        size={16}
        style={{
          transform: `rotate(-${rotation}deg)`,
          transition: isRunning ? "none" : "transform 0.3s ease-out",
        }}
      />
      <VisuallyHidden>Reset Code</VisuallyHidden>
    </button>
  );
};

export default ResetButton;
