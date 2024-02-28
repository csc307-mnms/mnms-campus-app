import React from "react";

const TextBox = ({ text, type, className }) => {
  return (
    <div className={className}>
      <label htmlFor="name" className="block font-bold text-left">
        {text}
      </label>
      <input
        type={type}
        className="bg-[#e5e7eb] px-1 rounded w-full shadow-lg h-10 mt-2"
      />
    </div>
  );
};

export default TextBox;
