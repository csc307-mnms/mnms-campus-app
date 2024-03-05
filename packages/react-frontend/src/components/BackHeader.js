import React from "react";

const BackHeader = ({ text, href }) => {
  return (
    <div className="grid grid-rows-2 grid-flow-cols w-full h-32 bg-[#003831] ">
      <div className="grid grid-cols-2 pt-4 pl-4 pr-4">
        <div className="col-span-1 text-left">
          <button
            aria-label="back button"
            key="back button"
            onClick={() => {
              window.location.href = href;
            }}
            className="text-blue-500 font-bold px-3"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default BackHeader;
