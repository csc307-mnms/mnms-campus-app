import React from "react";

const LogoutHeader = ({ text, href }) => {
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

        <div className="col-span-1 text-right">
          <a
            aria-label="back button"
            href={href}
            key="logout button"
            className="text-blue-500 font-bold px-3"
          >
            Logout
          </a>
        </div>
      </div>

      <p className="text-white text-xl font-bold">{text}</p>
    </div>
  );
};

export default LogoutHeader;
