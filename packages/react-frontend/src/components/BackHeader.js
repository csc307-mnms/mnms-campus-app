import React from "react";

const BackHeader = ({ text, href }) => {
  return (
    <div className="grid grid-rows-2 grid-flow-cols w-full h-32 bg-[#003831] ">
      <div className="grid grid-cols-2 pt-4 pl-4 pr-4">
        <div className="col-span-1 text-left">
          <a
            aria-label="back button"
            href={href}
            key="back button"
            className="text-blue-500 font-bold px-3"
          >
            Back
          </a>
        </div>
      </div>
    </div>
  );
};

export default BackHeader;
