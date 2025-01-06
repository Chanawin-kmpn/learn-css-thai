import React from "react";

import CodeBlock from "@/components/CodeEditor/CodeBlock";
import CodeEdit from "@/components/CodeEditor/CodeEdit";
import { syntax } from "@/constants/code";

const page = () => {
  return (
    <div>
      <CodeBlock code={syntax} />
      <CodeEdit />
    </div>
  );
};

export default page;
