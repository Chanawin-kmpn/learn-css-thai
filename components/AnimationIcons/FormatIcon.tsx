import { animated, useSpring } from "@react-spring/web";
import { Wand } from "lucide-react";
import React from "react";

import { SPRING_CONFIG } from "@/constants/spring-config";

export type Status = "idle" | "hovering" | "pressed" | "formatting";

interface FormatIconProps {
  status: Status;
}

const FormatIcon = ({ status }: FormatIconProps) => {
  const wandRotation = getWandRotation(status);

  const wandGroupStyle = useSpring({
    transform: `rotate(${wandRotation}deg)`,
    config: SPRING_CONFIG.springy,
  });

  const AnimatedWand = animated(Wand);
  return <AnimatedWand style={wandGroupStyle} size={16} />;
};

function getWandRotation(status: Status) {
  switch (status) {
    case "idle":
      return 0;
    case "hovering":
      return -25;
    case "pressed":
      return -65;
    case "formatting":
      return 0;
  }
}
export default FormatIcon;
