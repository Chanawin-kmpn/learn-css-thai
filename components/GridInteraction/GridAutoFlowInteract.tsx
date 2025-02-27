"use client";
import React from "react";

const GridAutoFlowInteract = () => {
  const [gridAutoFlow, setGridAutoFlow] = React.useState("row");
  const handleSetGridAutoFlow = (value: "row" | "column") => {
    setGridAutoFlow(value);
  };
  const gridAutoFlowStyle = {
    display: "grid",
    gridAutoFlow,
    gap: "16px",
    width: "100%",
    height: "100%",
    border: "3px solid #3f3f46",
  };
  return (
    <div className="mb-12 mt-6 rounded-md border border-secondary-orange p-4 dark:border-primary-lime">
      <div className="flex flex-col gap-4">
        {/* ส่วนแสดงกริด */}
        <div className="relative flex min-h-[200px] items-center justify-center rounded-sm bg-white p-8">
          <div className="flex min-h-[300px] w-full items-center justify-center">
            <div style={gridAutoFlowStyle}>
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: "#84cc16",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "16px",
                  }}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ส่วนควบคุม */}
        <div className="mt-4">
          <p className="mb-2 font-bold">Grid Auto Flow:</p>
          <div className="flex gap-4">
            <label htmlFor="row" className="flex items-center gap-2">
              Row (default)
              <input
                type="radio"
                id="row"
                name="gridAutoFlow"
                value="row"
                checked={gridAutoFlow === "row"}
                onChange={(e) =>
                  handleSetGridAutoFlow(e.target.value as "row" | "column")
                }
              />
            </label>

            <label htmlFor="column" className="flex items-center gap-2">
              Column
              <input
                type="radio"
                id="column"
                name="gridAutoFlow"
                value="column"
                checked={gridAutoFlow === "column"}
                onChange={(e) =>
                  handleSetGridAutoFlow(e.target.value as "row" | "column")
                }
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridAutoFlowInteract;
