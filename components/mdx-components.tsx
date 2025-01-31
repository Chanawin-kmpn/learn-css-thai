import { useMDXComponent } from "@content-collections/mdx/react";
import React from "react";

import { cn } from "@/lib/utils";
import { PlaygroundProps } from "@/types/types";

import Callout from "./Callout";
import CodeBlock from "./CodeBlock/CodeBlock";
import Playground from "./CodeEditor/Playground";
import Construction from "./Construction";
import TextCode from "./TextCode";
import TextLink from "./TextLink";

const component = {
  Callout: ({
    className,
    children,
    ...props
  }: React.HTMLAttributes<HTMLElement> & { children: string }) => (
    <Callout className={cn("mb-12 mt-2", className)} {...props}>
      {children}
    </Callout>
  ),
  Construction,
  CodeBlock: ({
    className,
    children,
    ...props
  }: React.HTMLAttributes<HTMLElement> & { children: string }) => (
    <CodeBlock className={cn("mb-12 mt-2", className)} {...props}>
      {children}
    </CodeBlock>
  ),
  TextCode,
  TextLink,
  Playground: ({ className, ...props }: PlaygroundProps) => (
    <Playground className={cn("mb-12 mt-2", className)} {...props} />
  ),
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn("h1-section text-dark900_light100 mb-5", className)}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "h2-section mb-4 mt-6 text-secondary-orange dark:text-primary-lime",
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn("h3-section text-dark900_light100 mb-2 mt-6", className)}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn(
        "paragraph text-dark700_light400 mb-5 last:mb-0",
        className,
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn("ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn("ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      className={cn("mt-6 border-l-2 pl-6 italic", className)}
      {...props}
    />
  ),
};

interface MDXProps {
  code: string;
  className?: string;
}

export function Mdx({ code, className }: MDXProps) {
  const Component = useMDXComponent(code);
  return (
    <article className={cn("", className)}>
      <Component components={component} />
    </article>
  );
}
