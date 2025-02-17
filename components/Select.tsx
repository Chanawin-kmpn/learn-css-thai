import React from "react";

interface SelectProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactElement | Array<React.ReactElement>;
}

const Select = ({
  id,
  value,
  onChange,
  children,
  ...delegated
}: SelectProps) => {
  const displayedValue = getDisplayedValue(value, children);
  return (
    <div>
      <select id={id} value={value} onChange={onChange}>
        {children}
      </select>
      <div></div>
    </div>
  );
};

function getDisplayedValue(
  value: string,
  children: React.ReactElement | Array<React.ReactElement>,
) {
  const childArray = Array.isArray(children) ? children : [children];
  const selectedChild = childArray.find((child) => {
    return child.props.value === value;
  });

  if (!selectedChild) {
    throw new Error(`Could not find selected child with value: ${value}`);
  }

  return selectedChild.props.children;
}

export default Select;
