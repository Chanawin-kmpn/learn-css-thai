import React from "react";

import CodeBlock from "@/components/CodeEditor/CodeBlock";
// import CodeEditor from "@/components/CodeEditor/CodeEditor";
import { syntax } from "@/constants/code";

const page = () => {
  return (
    <div>
      <CodeBlock code={syntax} />
      {/* <CodeEditor /> */}
    </div>
  );
};

export default page;
