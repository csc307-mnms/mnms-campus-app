import React from "react";

const TextBox = ({ text, type, className, onChange }) => {
  return (
    <div className={className}>
      <label htmlFor={text} className="block font-bold text-left">
        {text}
      </label>
      <input
        type={type}
        className="bg-[#e5e7eb] px-1 rounded w-full shadow-lg h-10 mt-2"
        onChange={onChange}
        id={text}
      />
    </div>
  );
};

export default TextBox;
