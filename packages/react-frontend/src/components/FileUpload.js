import React from "react";

const FileUpload = ({ text, className, onChange }) => {
  return (
    <div className={className}>
      <label htmlFor="name" className="block font-bold text-left">
        {text}
      </label>
      <input
        id="file"
        name="file"
        type="file"
        className="w-full h-10 mt-4"
        onChange={onChange}
      />
    </div>
  );
};
export default FileUpload;
