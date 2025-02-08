"use client";
import React, { useState, useMemo } from "react";

import { HSLInteractiveProps } from "@/types/types";

const HSLInteractive = ({ hasAlpha, className }: HSLInteractiveProps) => {
  const [hue, setHue] = useState(180);
  const [saturation, setSaturation] = useState(50);
  const [lightness, setLightness] = useState(50);
  const [alpha, setAlpha] = useState(1);

  // คำนวณ gradient แบบ dynamic
  const saturationBG = useMemo(
    () =>
      `linear-gradient(to right, 
      hsl(${hue}, 0%, 50%), 
      hsl(${hue}, 100%, 50%)
    )`,
    [hue],
  );

  const lightnessBG = useMemo(
    () =>
      `linear-gradient(to right, 
      #000000, 
      hsl(${hue}, 100%, 50%), 
      #ffffff
    )`,
    [hue],
  );

  const hslColor = hasAlpha
    ? `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`
    : `hsl(${hue}, ${saturation}%, ${lightness}%)`;

  return (
    <div
      className={`rounded-lg border border-primary-lime bg-zinc-100 p-4 dark:bg-zinc-900 ${className}`}
    >
      <div
        className="relative mb-6 h-40 w-full rounded-lg border border-zinc-900 dark:border-zinc-200"
        style={{ backgroundColor: hslColor }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%, transparent 50%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.1) 75%, transparent 75%, transparent)`,
            backgroundSize: "20px 20px",
          }}
        />
        <p className="absolute inset-x-0 bottom-0 rounded-b-xl bg-black/50 p-2 text-center font-bold text-white">
          HSL Code: {hslColor}
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <label>Hue (0-360): {hue}</label>
            <span
              className="size-6 rounded-full border"
              style={{ backgroundColor: `hsl(${hue}, 100%, 50%)` }}
            />
          </div>
          <input
            type="range"
            min="0"
            max="360"
            value={hue}
            onChange={(e) => setHue(Number(e.target.value))}
            className="slider hsl-slider"
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <label>Saturation (0-100%): {saturation}%</label>
            <div
              className="size-6 rounded-full border"
              style={{
                background: `linear-gradient(to right, 
                  hsl(${hue}, 0%, 50%), 
                  hsl(${hue}, 100%, 50%)
                )`,
              }}
            />
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={saturation}
            onChange={(e) => setSaturation(Number(e.target.value))}
            className="slider"
            style={{ backgroundImage: saturationBG }}
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <label>Lightness (0-100%): {lightness}%</label>
            <div
              className="size-6 rounded-full border"
              style={{
                background: `linear-gradient(to right, 
                  #000, 
                  hsl(${hue}, 100%, 50%), 
                  #fff
                )`,
              }}
            />
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={lightness}
            onChange={(e) => setLightness(Number(e.target.value))}
            className="slider"
            style={{ backgroundImage: lightnessBG }}
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
                    ${hslColor}
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

export default HSLInteractive;
