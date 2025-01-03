import { LucideIcon } from "lucide-react";
import React from "react";

interface HowtolearnCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

const HowToLearnCard = ({ title, description, icon }: HowtolearnCardProps) => {
  const IconComponent = icon;
  return (
    <div className="flex-1 rounded-lg bg-gradient-to-r from-lime-500 to-orange-500 p-4 text-zinc-900">
      <div className="mb-2 flex items-center justify-between text-zinc-700 dark:text-zinc-900 lg:mb-4">
        <h3 className="h3-banner">{title}</h3>
        <IconComponent className="size-6" />
      </div>
      <p className="text-sm text-zinc-700 dark:text-zinc-900">{description}</p>
    </div>
  );
};

export default HowToLearnCard;
