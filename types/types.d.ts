export interface BaseContent {
  slug: string;
  slugAsParams: string;
  content: string;
  title: string;
  description: string;
  published: boolean;
  createdDate?: string | undefined;
  updatedDate?: string | undefined;
  _meta: {
    filePath: string;
    fileName: string;
    directory: string;
    path: string;
    extension: string;
  };
  toc?: boolean;
}

export interface Doc extends BaseContent {
  doc: string;
}

export interface Blog extends BaseContent {
  blog: string;
  authorName: string;
  authorImage?: string;
}

export interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export interface PlaygroundProps {
  id: string;
  title: string;
  html?: string;
  css?: string;
  js?: string;
  mode: "default" | "react";
  layoutMode: "codepen" | "side-by-side" | "vertical-stack" | "tabbed";
  size: "normal" | "wide";
  centered: boolean;
  className?: string;
  boxSizing: "content-box" | "border-box";
  splitRatio: string;
  resultStyle?: { [key: string]: string | number | undefined };
  stacked?: boolean;
  startFullscreened: boolean;
  hideTabCheckbox?: boolean;
}

export interface TextCodeProps {
  children: string;
  backgroundMode?: "default" | "warning" | "info";
}

export interface ImageCompareProps {
  className?: string;
  firstImage: string;
  firstImageLabel: string;
  firstImageAlt: string;
  secondImage: string;
  secondImageLabel: string;
  secondImageAlt: string;
}

export interface RGBInteractiveProps {
  className?: string;
  hasAlpha: boolean;
}

export interface HSLInteractiveProps {
  className?: string;
  hasAlpha: boolean;
}
