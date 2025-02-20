import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { allBlogs, allDocs } from "@/.content-collections/generated";
import { Blog, Doc } from "@/types/types";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-spread */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function checkDocsPath(path: string) {
  return path.startsWith("/docs");
}

export function checkHomePath(path: string) {
  return path === "/";
}

type Timeout = ReturnType<typeof setTimeout>;
export const throttle = (func: Function, limit: number) => {
  let lastFunc: Timeout;
  let lastRan: number;
  return function (...args: any) {
    if (!lastRan) {
      func.apply(null, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(
        function () {
          if (Date.now() - lastRan >= limit) {
            func.apply(null, args);
            lastRan = Date.now();
          }
        },
        limit - (Date.now() - lastRan),
      );
    }
  };
};

export function moveCursorWithinInput(
  input: HTMLInputElement,
  position: number,
) {
  // Super old browsers (like, IE?) don't support this.
  if (!input?.setSelectionRange) {
    return;
  }

  input?.focus();
  input?.setSelectionRange(position, position);
}

// ฟังก์ชัน normalize (เหมือนเดิม)
export const normalize = (
  number: number,
  currentScaleMin: number,
  currentScaleMax: number,
  newScaleMin = 0,
  newScaleMax = 1,
) => {
  const standardNormalization =
    (number - currentScaleMin) / (currentScaleMax - currentScaleMin);
  return (newScaleMax - newScaleMin) * standardNormalization + newScaleMin;
};

export async function getDocFromParams(slug: string[] | null): Promise<Doc> {
  const slugPath = slug?.join("/") || "";
  try {
    const doc = allDocs.find((doc) => doc.slug === slugPath)!;
    return doc;
  } catch (error) {
    console.error("Error fetching doc:", error);
    throw new Error(`Doc not found for slug: ${slugPath}`);
  }
}

export async function getBlogFromParams(slug: string[] | null): Promise<Blog> {
  const slugPath = slug?.join("/") || "";
  try {
    const blog = allBlogs.find((blog) => blog.slug === slugPath)!;
    return blog;
  } catch (error) {
    console.error("Error fetching doc:", error);
    throw new Error(`Doc not found for slug: ${slugPath}`);
  }
}

export async function getDocFromSegment(
  segment: string[] | undefined,
): Promise<Doc> {
  const slugPath = segment?.join("/") || "";

  try {
    const doc = allDocs.find((doc) => doc.slug === slugPath)!;
    return doc;
  } catch (error) {
    console.error("Error fetching doc:", error);
    throw new Error(`Doc not found for slug: ${slugPath}`);
  }
}
