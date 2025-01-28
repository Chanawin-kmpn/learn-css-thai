import React from "react";
interface PaneProps {
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  style?: { [key: string]: string | number | undefined };
}

const Pane = ({ title, children, actions, ...delegated }: PaneProps) => {
  return (
    <div className="flex h-full flex-col px-4 pb-4" {...delegated}>
      <div className="mb-6 flex h-[46px] items-center justify-between border-b border-zinc-500">
        <p className="cursor-default font-firaCode">{title}</p>
        {actions}
      </div>
      {children}
    </div>
  );
};

export default Pane;
