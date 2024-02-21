import React, { memo } from "react";
import { NavBarData } from "../data/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavBar = memo(({ activePage }) => {
  return (
    <div className="content-center align-middle bg-gray-200 px-4 pb-6 pt-4">
      {NavBarData.map(({ label, href, icon }) => (
        <a
          aria-label={label}
          className="-m-1.5 rounded-md p-1.5 transition-all duration-300"
          href={href}
          key={label}
        >
          <FontAwesomeIcon
            icon={icon}
            className="h-14 w-14 text-[#003831] px-5"
          />
        </a>
      ))}
    </div>
  );
});

export default NavBar;
