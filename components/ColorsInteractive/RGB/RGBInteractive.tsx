"use client";
import React, { useState, useMemo } from "react";

import { RGBInteractiveProps } from "@/types/types";

const RGBInteractive = ({ hasAlpha, className }: RGBInteractiveProps) => {
  const [red, setRed] = useState(128);
  const [green, setGreen] = useState(128);
  const [blue, setBlue] = useState(128);
  const [alpha, setAlpha] = useState(1);

  // สร้าง gradient สำหรับแต่ละ slider
  const redBG = useMemo(
    () =>
      `linear-gradient(to right, 
      rgb(0, ${green}, ${blue}), 
      rgb(255, ${green}, ${blue})
    )`,
    [green, blue],
  );

  const greenBG = useMemo(
    () =>
      `linear-gradient(to right, 
      rgb(${red}, 0, ${blue}), 
      rgb(${red}, 255, ${blue})
    )`,
    [red, blue],
  );

  const blueBG = useMemo(
    () =>
      `linear-gradient(to right, 
      rgb(${red}, ${green}, 0), 
      rgb(${red}, ${green}, 255)
    )`,
    [red, green],
  );

  const rgbColor = hasAlpha
    ? `rgba(${red}, ${green}, ${blue}, ${alpha})`
    : `rgb(${red}, ${green}, ${blue})`;

  return (
    <div
      className={`rounded-lg border border-primary-lime bg-zinc-100 p-4 dark:bg-zinc-900 ${className}`}
    >
      <div
        className="relative mb-6 h-40 w-full rounded-lg border border-zinc-900 dark:border-zinc-200"
        style={{ backgroundColor: rgbColor }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%, transparent 50%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.1) 75%, transparent 75%, transparent)`,
            backgroundSize: "20px 20px",
          }}
        />
        <p className="absolute inset-x-0 bottom-0 rounded-b-xl bg-black/50 p-2 text-center font-bold text-white">
          RGB Code: {rgbColor}
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
            className="slider"
            style={{ backgroundImage: redBG }}
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
            className="slider"
            style={{ backgroundImage: greenBG }}
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
            className="slider"
            style={{ backgroundImage: blueBG }}
          />
        </div>

        {hasAlpha && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <label>Alpha (0-1): {alpha}</label>
              <div
                className="size-6 rounded-full border"
                style={{
                  background: `linear-gradient(to right, 
                    transparent, 
                    ${rgbColor}
                  )`,
                }}
              />
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step={0.1}
              value={alpha}
              onChange={(e) => setAlpha(Number(e.target.value))}
              className="slider bg-gradient-to-r from-transparent to-black"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RGBInteractive;
