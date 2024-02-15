import React from "react";

const Dropdown = ({ options, onSelect, className }) => {
  const handleSelect = (event) => {
    const selectedOption = event.target.value;
    onSelect(selectedOption);
  };

  return (
    <select className={className} onChange={handleSelect}>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
