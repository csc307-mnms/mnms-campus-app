import React from "react";

const PageHeader = ({ text, href }) => {
  return (
    <div className="content-center bg-[#003831] pb-1 pt-1 flex justify-center items-center">
      <p className="text-center text-white">{text}</p>
      <a
        aria-label="back button"
        href={href}
        key="back button"
        className=" text-white font-bold px-3"
      >
        Back
      </a>
    </div>
  );
};

export default PageHeader;
