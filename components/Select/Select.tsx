import { ChevronDown } from "lucide-react";
import React from "react";

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  option: { value: string; label: string }[];
  selectLabel: string;
}

const Select = ({ value, onChange, option, selectLabel }: SelectProps) => {
  return (
    <label className="block w-fit">
      <div className="group-select group/select">
        <select
          id="directionSelect"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 size-full cursor-pointer appearance-none text-base opacity-0"
        >
          {option.map((item) => (
            <option value={item.value} key={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <div className="group-select-content">{`${selectLabel}: ${value};`}</div>
        <div className="pointer-events-none absolute inset-y-0 right-[10px] my-auto size-6">
          <ChevronDown size={24} />
        </div>
      </div>
    </label>
  );
};

export default Select;
