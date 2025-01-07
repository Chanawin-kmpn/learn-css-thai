import React from "react";

import CodeBlock from "@/components/CodeEditor/CodeBlock";
import CodeEditor from "@/components/CodeEditor/CodeEditor";
import { cssCode, syntax } from "@/constants/code";

const page = () => {
  return (
    <div>
      <CodeBlock code={syntax} />
      <CodeEditor
        code={cssCode}
        initialValue={cssCode}
        height="500px"
        className="mb-4"
      />
    </div>
  );
};

export default page;
