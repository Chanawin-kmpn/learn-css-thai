"use client";
import React, { useState } from "react";

const HEXInteractive = () => {
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);

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
    <div className="rounded-lg border-primary-lime bg-zinc-200 p-4 dark:bg-transparent">
      <div
        className="mb-6 h-40 w-full rounded-lg"
        style={{ backgroundColor: hexColor }}
      >
        <p className="rounded-t bg-black/50 p-2 text-center font-bold text-white">
          Hex Code: {hexColor}
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-4">
          <label>Red (0-255): {red}</label>
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
          <label>Green (0-255): {green}</label>
          <input
            type="range"
            min="0"
            max="255"
            value={green}
            onChange={(e) => setGreen(Number(e.target.value))}
            className="slider bg-gradient-to-r from-black to-[#00ff00]"
          />
        </div>

        <div className="flex flex-col gap-4">
          <label>Blue (0-255): {blue}</label>
          <input
            type="range"
            min="0"
            max="255"
            value={blue}
            onChange={(e) => setBlue(Number(e.target.value))}
            className="slider bg-gradient-to-r from-black to-[#0000ff]"
          />
        </div>
      </div>
    </div>
  );
};

export default HEXInteractive;
