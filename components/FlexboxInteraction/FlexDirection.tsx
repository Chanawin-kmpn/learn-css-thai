"use client";
import React, { useMemo, useState } from "react";

import Select from "../Select/Select";

interface FlexDirectionProps {
  className?: string;
  withAlignment?: boolean;
}

const FlexDirection: React.FC<FlexDirectionProps> = ({
  withAlignment = false,
}) => {
  const [direction, setDirection] = useState("row");
  const [justifyContent, setJustifyContent] = useState("flex-start");
  const [alignItems, setAlignItems] = useState("stretch");
  const [showAxis, setShowAxis] = useState(false);

  // คำนวณ class names สำหรับ container
  const containerClasses = useMemo(() => {
    const baseClasses = "flex h-80 min-h-32 rounded-md border relative ";
    const directionClasses = {
      row: "flex-row",
      "row-reverse": "flex-row-reverse",
      column: "flex-col",
      "column-reverse": "flex-col-reverse",
    }[direction];

    const justifyClasses = withAlignment
      ? {
          "flex-start": "justify-start",
          "flex-end": "justify-end",
          center: "justify-center",
          "space-between": "justify-between",
          "space-around": "justify-around",
          "space-evenly": "justify-evenly",
        }[justifyContent]
      : "";

    const alignClasses = withAlignment
      ? {
          stretch: "items-stretch",
          "flex-start": "items-start",
          "flex-end": "items-end",
          center: "items-center",
          baseline: "items-baseline",
        }[alignItems]
      : "";

    return `${baseClasses} ${directionClasses} ${justifyClasses} ${alignClasses}`;
  }, [direction, justifyContent, alignItems, withAlignment]);

  return (
    <div className="rounded-md border border-secondary-orange p-4 dark:border-primary-lime">
      <div className="mb-8 flex flex-col gap-4">
        <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
          <Select
            value={direction}
            onChange={setDirection}
            option={[
              {
                value: "row",
                label: "flex-direction: row;",
              },
              {
                value: "row-reverse",
                label: "flex-direction: row-reverse;",
              },
              {
                value: "column",
                label: "flex-direction: column;",
              },
              {
                value: "column-reverse",
                label: "flex-direction: column-reverse;",
              },
            ]}
            selectLabel="flex-direction"
          />

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setShowAxis((prev) => !prev)}
              className="axis-toggle"
            >
              <div
                className="bg-light100_dark900 relative z-[2] size-4 rounded-[50%] border-2 border-secondary-orange outline outline-white transition-transform dark:border-primary-lime dark:outline-zinc-900"
                style={{ transform: `translateX(${showAxis ? "100%" : "0%"})` }}
              ></div>
            </button>
            <div>แสดงชื่อแกน</div>
          </div>
        </div>

        {withAlignment && (
          <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
            {/* Justify Content Select */}

            <Select
              value={justifyContent}
              onChange={setJustifyContent}
              option={[
                { value: "flex-start", label: "justify-content: flex-start;" },
                { value: "flex-end", label: "justify-content: flex-end;" },
                { value: "center", label: "justify-content: center;" },
                {
                  value: "space-between",
                  label: "justify-content: space-between;",
                },
                {
                  value: "space-around",
                  label: "justify-content: space-around;",
                },
                {
                  value: "space-evenly",
                  label: "justify-content: space-evenly;",
                },
              ]}
              selectLabel="justify-content"
            />

            {/* Align Items Select */}
            <Select
              value={alignItems}
              onChange={setAlignItems}
              option={[
                { value: "stretch", label: "align-items: stretch;" },
                { value: "flex-start", label: "align-items: flex-start;" },
                { value: "flex-end", label: "align-items: flex-end;" },
                { value: "center", label: "align-items: center;" },
                { value: "baseline", label: "align-items: baseline;" },
              ]}
              selectLabel="align-items"
            />
          </div>
        )}
      </div>

      <div className={containerClasses}>
        {[
          { bg: "bg-[#e74c3c]", text: "Item 1" },
          { bg: "bg-[#f1c40f]", text: "Item 2" },
          { bg: "bg-[#2ecc71]", text: "Item 3" },
          { bg: "bg-[#9b59b6]", text: "Item 4" },
        ].map((item, index) => (
          <div
            key={index}
            className={`rounded-md p-5 text-center ${item.bg} ${
              item.bg === "bg-[#f1c40f]" ? "text-gray-800" : "text-white"
            }`}
          >
            {item.text}
          </div>
        ))}
        <div
          className="absolute inset-x-0 top-1/2 h-[2px] whitespace-nowrap bg-zinc-700 transition-opacity"
          style={{ opacity: `${showAxis ? 1 : 0}` }}
        >
          <div className="-top-1 left-2 -translate-y-full">
            {direction === "row" || direction === "row-reverse"
              ? "แกนหลัก"
              : "แกนรอง"}
          </div>
        </div>
        <div
          className="absolute inset-y-0 left-1/2 w-[2px] whitespace-nowrap bg-zinc-700 transition-opacity"
          style={{ opacity: `${showAxis ? 1 : 0}` }}
        >
          <div className="-top-4 left-1 origin-bottom-left rotate-90">
            {direction === "column" || direction === "column-reverse"
              ? "แกนหลัก"
              : "แกนรอง"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlexDirection;
