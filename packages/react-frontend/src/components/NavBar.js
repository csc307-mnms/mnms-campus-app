import React, { memo } from "react";
import { NavBarData } from "../data/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavBar = memo(({ activePage }) => {
  return (
    <div className="grid grid-cols-4 content-center overflow-hidden">
      {NavBarData.map(({ label, href, icon }) => (
        <button
          aria-label={label}
          className="-m-1.5 mx-px p-1.5 px-2 pb-4 pt-6 transition-all duration-300 bg-[#003831]"
          onClick={() => (window.location.href = href)}
          key={label}
        >
          <FontAwesomeIcon icon={icon} className="h-14 w-14 text-white px-5" />
        </button>
      ))}
    </div>
  );
});

export default NavBar;
