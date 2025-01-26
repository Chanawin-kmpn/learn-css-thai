import React from "react";

interface VisuallyHiddenProps {
  children: React.ReactNode;
}
const VisuallyHidden = ({ children }: VisuallyHiddenProps) => {
  return <span className="sr-only">{children}</span>;
};

export default VisuallyHidden;
