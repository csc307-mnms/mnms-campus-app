import React from "react";

const Tab = ({ label, path, active, onClick }) => {
  const handleClick = () => {
    onClick(path);
  };

  return (
    <button className={`tab ${active ? "active" : ""}`} onClick={handleClick}>
      {label}
    </button>
  );
};

const Tabs = ({ tabs, activeTab, onTabChange }) => {
  const handleTabChange = (path) => {
    onTabChange(path);
  };

  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <Tab
          key={tab.path}
          label={tab.label}
          path={tab.path}
          active={tab.path === activeTab}
          onClick={handleTabChange}
        />
      ))}
    </div>
  );
};

export default Tabs;
