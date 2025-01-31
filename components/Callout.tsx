import { Info, AlertTriangle } from "lucide-react";
import React from "react";

interface CalloutProps {
  children: React.ReactNode;
  className?: string;
  type?: "info" | "warning";
  title?: string;
}

export default function Callout({
  children,
  className,
  type = "info",
  title,
}: CalloutProps) {
  const styles = {
    wrapper: {
      info: "bg-blue-50 dark:bg-blue-950/40 border-l-4 border-blue-500",
      warning: "bg-amber-50 dark:bg-amber-950/40 border-l-4 border-amber-500",
    },
    icon: {
      info: "text-blue-500",
      warning: "text-amber-500",
    },
  };

  const icons = {
    info: <Info className={`size-5 ${styles.icon[type]}`} />,
    warning: <AlertTriangle className={`size-5 ${styles.icon[type]}`} />,
  };

  return (
    <div
      className={`my-4 rounded-r-md p-4 ${styles.wrapper[type]} ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0 pt-1">{icons[type]}</div>
        <div className="flex-1">
          {title && (
            <strong className="mb-2 block text-lg text-zinc-900 dark:text-zinc-100">
              {title}
            </strong>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
