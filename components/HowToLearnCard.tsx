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
    <div className="learnCard relative flex-1 rounded-lg bg-light-100 p-4 dark:bg-dark-900">
      <div className="text-dark900_light100 mb-2 flex flex-col gap-4 lg:mb-4">
        <IconComponent className="size-8" />
        <h3 className="text-lg font-bold dark:text-primary-lime">{title}</h3>
      </div>
      <p className="text-dark700_light400 paragraph">{description}</p>
    </div>
  );
};

export default HowToLearnCard;
