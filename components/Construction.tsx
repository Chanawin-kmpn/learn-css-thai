"use client";
import Lottie from "@lottielab/lottie-player/react";
import React from "react";

const Construction = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <Lottie
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
