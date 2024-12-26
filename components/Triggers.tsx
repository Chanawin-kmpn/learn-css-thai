"use client";

import { X } from "lucide-react";
import { triggerEdgeDrawer } from "tailwindcss-jun-layout";

import { Button } from "./ui/button";

export const CloseDrawerButton = () => {
  return (
    <Button
      variant="ghost"
      className="self-end jun-edgeDrawerTrigger lg:hidden"
      onClick={() => triggerEdgeDrawer()}
    >
      <X />
    </Button>
  );
};
