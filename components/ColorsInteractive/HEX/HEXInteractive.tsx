"use client";
import React, { useState } from "react";

const HEXInteractive = () => {
  const [red, setRed] = useState(128);
  const [green, setGreen] = useState(128);
  const [blue, setBlue] = useState(128);

  const rgbToHex = (r: number, g: number, b: number) => {
    return `#${[r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")}`;
  };

  const hexColor = rgbToHex(red, green, blue);

  return (
    <div className="rounded-lg border border-primary-lime bg-zinc-100 p-4 dark:bg-zinc-900">
      <div
        className="relative mb-6 h-40 w-full rounded-lg border border-zinc-900 dark:border-zinc-200"
        style={{ backgroundColor: hexColor }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%, transparent 50%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.1) 75%, transparent 75%, transparent)`,
            backgroundSize: "20px 20px",
          }}
        />
        <p className="absolute inset-x-0 bottom-0 rounded-b-lg bg-black/50 p-2 text-center font-bold text-white">
          Hex Code: {hexColor}
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <label>Red (0-255): {red}</label>
            <span
              className="size-6 rounded-full border"
              style={{ backgroundColor: `rgb(${red}, 0, 0)` }}
            />
          </div>
          <input
            type="range"
            min="0"
            max="255"
            value={red}
            onChange={(e) => setRed(Number(e.target.value))}
            className="slider bg-gradient-to-r from-black to-[#ff0000]"
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <label>Green (0-255): {green}</label>
            <span
              className="size-6 rounded-full border"
              style={{ backgroundColor: `rgb(0, ${green}, 0)` }}
            />
          </div>
          <input
            type="range"
            min="0"
            max="255"
            value={green}
            onChange={(e) => setGreen(Number(e.target.value))}
            className="slider bg-gradient-to-r from-black to-[#00ff00] dark:border-zinc-400"
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <label>Blue (0-255): {blue}</label>
            <span
              className="size-6 rounded-full border"
              style={{ backgroundColor: `rgb(0, 0, ${blue})` }}
            />
          </div>
          <input
            type="range"
            min="0"
            max="255"
            value={blue}
            onChange={(e) => setBlue(Number(e.target.value))}
            className="slider bg-gradient-to-r from-black to-[#0000ff] dark:border-zinc-400"
          />
        </div>
      </div>
    </div>
  );
};

export default HEXInteractive;
