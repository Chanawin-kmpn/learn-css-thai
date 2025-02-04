"use client";
import Image from "next/image";
import React, { useState } from "react";

import { ImageCompareProps } from "@/types/types";

const ImageCompare = ({
  className,
  firstImage,
  firstImageLabel,
  firstImageAlt,
  secondImage,
  secondImageLabel,
  secondImageAlt,
}: ImageCompareProps) => {
  const [showSecondImage, setShowSecondImage] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleToggle = () => {
    setShowSecondImage(!showSecondImage);
  };

  return (
    <div
      className={`flex flex-col items-center space-y-4 rounded-md border border-primary-lime bg-zinc-200 px-8 pb-8 pt-6 dark:bg-zinc-900 ${className}`}
    >
      {/* ส่วนแสดงรูปภาพ */}
      <div className="relative self-stretch md:h-[400px]">
        {isExpanded ? (
          // โหมด Expanded
          <div className="grid grid-cols-2 gap-4">
            <div className="flex h-[400px] flex-col items-center">
              <h4 className="h4-section text-dark900_light100 mb-2">
                {firstImageLabel}
              </h4>
              <div className="relative h-[360px] w-full">
                <Image
                  src={firstImage}
                  alt={firstImageAlt}
                  fill
                  className="block rounded-lg object-contain"
                  loading="eager"
                  priority
                  sizes="(max-width: 600px) 100vw, 50vw" // Responsive sizes
                />
              </div>
            </div>
            <div className="flex h-[400px] flex-col items-center">
              <h4 className="h4-section text-dark900_light100 mb-2">
                {secondImageLabel}
              </h4>
              <div className="relative h-[360px] w-full">
                <Image
                  src={secondImage}
                  alt={secondImageAlt}
                  fill
                  className="block rounded-lg object-contain"
                  loading="eager"
                  priority
                  sizes="(max-width: 600px) 100vw, 50vw" // Responsive sizes
                />
              </div>
            </div>
          </div>
        ) : (
          // โหมด Toggle
          <div className="relative flex flex-col items-center">
            <h4 className="h4-section text-dark900_light100 mb-2">
              {showSecondImage ? secondImageLabel : firstImageLabel}
            </h4>
            <div className="relative size-64 w-full md:h-[360px]">
              {/* รูปแรก */}
              <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{
                  zIndex: showSecondImage ? 0 : 1,
                  opacity: showSecondImage ? 0 : 1,
                }}
              >
                <Image
                  src={firstImage}
                  alt={firstImageAlt}
                  fill
                  className="block rounded-lg object-contain"
                  loading="eager"
                  priority
                  sizes="(max-width: 600px) 100vw, 50vw" // Responsive sizes
                />
              </div>
              {/* รูปที่สอง */}
              <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{
                  zIndex: showSecondImage ? 1 : 0,
                  opacity: showSecondImage ? 1 : 0,
                }}
              >
                <Image
                  src={secondImage}
                  alt={secondImageAlt}
                  fill
                  className="block rounded-lg object-contain"
                  loading="eager"
                  priority
                  sizes="(max-width: 600px) 100vw, 50vw" // Responsive sizes
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ปุ่มควบคุม */}
      <div className="flex gap-2">
        <button
          onClick={handleToggle}
          className="w-32 rounded-md bg-primary-lime px-4 py-3 font-bold text-zinc-900 transition-colors hover:bg-lime-600 disabled:cursor-not-allowed disabled:bg-lime-900 disabled:text-zinc-900 disabled:dark:text-zinc-500"
          disabled={isExpanded}
        >
          Toggle
        </button>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-light100_dark900 hidden w-32 rounded-md border border-lime-500 px-4 py-3 font-bold text-dark-900 transition-colors hover:bg-lime-700 dark:text-white lg:block"
        >
          {isExpanded ? "Collapse" : "Expand"}
        </button>
      </div>
    </div>
  );
};

export default ImageCompare;
