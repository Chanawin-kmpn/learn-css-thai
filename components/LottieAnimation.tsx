"use client";

import dynamic from "next/dynamic";
import React from "react";

const Lottie = dynamic(() => import("@lottielab/lottie-player/react"), {
  ssr: false, // ปิดการ render ฝั่ง server
});

const LottieAnimation = () => {
  return (
    <div className="mx-auto max-w-[410px]">
      <Lottie
        src="/lotties/light-learn.json"
        autoplay
        className="block dark:hidden"
      />
      <Lottie
        src="/lotties/dark-learn.json"
        autoplay
        className="hidden dark:block"
      />
    </div>
  );
};

export default LottieAnimation;
