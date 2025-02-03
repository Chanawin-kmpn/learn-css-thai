"use client";
import { Info, AlertTriangle, Lightbulb } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface CalloutProps {
  children: React.ReactNode;
  className?: string;
  type?: "info" | "warning" | "tip";
  title?: string;
  initialHeight?: number;
}

export default function Callout({
  children,
  className,
  type = "info",
  title,
  initialHeight = 250,
}: CalloutProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  // วัดความสูงของ content จริง เมื่อเดิมที mount หรือ children เปลี่ยน
  useEffect(() => {
    setInterval(() => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }
    }, 1000);
    // ตั้ง interval 1 วิเพื่อให้สามารถวัดความสูงของ content ได้ทันเวลา
  }, [children]);

  // เช็คว่าเราจำเป็นต้องแสดงปุ่ม Show More/Less หรือไม่
  const shouldShowButton = contentHeight > initialHeight;

  const styles = {
    wrapper: {
      info: "bg-blue-50 dark:bg-blue-950/40 border-l-4 border-blue-500",
      warning: "bg-amber-50 dark:bg-amber-950/40 border-l-4 border-amber-500",
      tip: "bg-lime-50 dark:bg-lime-950/40 border-l-4 border-lime-500",
    },
    icon: {
      info: "text-blue-500",
      warning: "text-amber-500",
      tip: "text-lime-500",
    },
    button: {
      info: "text-blue-600 hover:text-blue-800",
      warning: "text-amber-600 hover:text-amber-800",
      tip: "text-lime-600 hover:text-lime-800",
    },
  };

  const icons = {
    info: <Info className={`size-5 ${styles.icon[type]}`} />,
    warning: <AlertTriangle className={`size-5 ${styles.icon[type]}`} />,
    tip: <Lightbulb className={`size-5 ${styles.icon[type]}`} />,
  };

  return (
    <div
      className={`my-4 rounded-r-md p-4 ${styles.wrapper[type]} ${className} relative transition-all duration-300 ease-in-out`}
    >
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t ${
          type === "info"
            ? "from-blue-50 dark:from-blue-950/40"
            : type === "warning"
              ? "from-amber-50 dark:from-amber-950/40"
              : "from-lime-50 dark:from-lime-950/40"
        } to-transparent`}
      />
      <div className="flex items-start gap-3">
        <div className="shrink-0 pt-1">{icons[type]}</div>
        <div className="flex-1">
          {title && (
            <strong className="mb-2 block text-lg text-zinc-900 dark:text-zinc-100">
              {title}
            </strong>
          )}
          {/* ส่วนเนื้อหา */}
          <div
            className="relative transition-all duration-300 ease-in-out"
            style={{
              maxHeight: isExpanded ? contentHeight : initialHeight,
              overflow: "hidden",
            }}
          >
            <div ref={contentRef}>{children}</div>
            {!isExpanded && shouldShowButton && (
              <div
                className={`pointer-events-none absolute inset-x-0 bottom-0 h-20`}
              />
            )}
          </div>
          {/* ปุ่ม Show More/Less */}
          {shouldShowButton && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`mt-2 text-lg font-bold ${styles.button[type]}`}
            >
              {isExpanded ? "แสดงน้อยลง" : "แสดงเพิ่มเติม"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
