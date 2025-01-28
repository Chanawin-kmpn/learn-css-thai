/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from "react";

interface CodeWrapperProps {
  stacked: boolean;
  size: "normal" | "wide";
  className?: string;
  children: React.ReactNode;
  isFullscreened: boolean;
}

const CodeWrapper = ({
  stacked,
  size,
  className,
  children,
  isFullscreened,
}: CodeWrapperProps) => {
  const inlineRef = useRef<HTMLDivElement>(null);

  const [isActuallyFullscreened, setIsActuallyFullscreened] =
    useState(isFullscreened);
  // eslint-disable-next-line no-unused-vars
  const [blockerSize, setBlockerSize] = useState(0);

  useEffect(() => {
    setIsActuallyFullscreened(isFullscreened);

    if (!inlineRef.current) return;

    if (isFullscreened) {
      const boundingBox = inlineRef.current.getBoundingClientRect();

      setBlockerSize(boundingBox.height);
    } else {
      setBlockerSize(0);
    }
  }, [isFullscreened]);

  if (isActuallyFullscreened) {
    return (
      <>
        <div
          className="inline-outer-wrapper mb-12 max-md:mb-8"
          data-stacked={String(!!stacked)}
          // as={size === 'wide' ? FullWidthChild : 'div'}
        >
          <div ref={inlineRef} className={className}>
            {children}
          </div>
        </div>
      </>
    );
  }
  return (
    <div
      className="inline-outer-wrapper mb-12 overflow-hidden rounded-md border border-zinc-700 max-md:mb-8"
      data-stacked={String(!!stacked)}
      // as={size === 'wide' ? FullWidthChild : 'div'}
    >
      <div>{children}</div>
    </div>
  );
};

export default CodeWrapper;
