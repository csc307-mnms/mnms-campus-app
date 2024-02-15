import React from "react";

const PageHeader = ({ text, onClick }) => {
  return (
    <div className="page-header">
      <span>{text}</span>
      <button onClick={onClick}>Redirect</button>
    </div>
  );
};

export default PageHeader;
