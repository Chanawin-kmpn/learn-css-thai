import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <main className="relative h-full lg:mx-auto">{children}</main>;
};

export default layout;
