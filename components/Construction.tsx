"use client";
import dynamic from "next/dynamic";
import React from "react";

const LottiePlayer = dynamic(
  () => import("@lottielab/lottie-player/react").then((mod) => mod.default),
  {
    ssr: false,
  },
);

const Construction = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <LottiePlayer
        src="https://cdn.lottielab.com/l/E8Wtj11Tsmi49s.json"
        autoplay
        className="lg:w-1/2"
      />
      <p className="text-dark900_light100 description text-center">
        🔧 ขออภัย หน้านี้อยู่ระหว่างการพัฒนา 🚧
        <br /> โปรดกลับมาเยี่ยมชมใหม่เร็วๆนี้
      </p>
    </div>
  );
};

export default Construction;
