import React, { memo } from "react";
import { AddScheduleData } from "../data/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddSchedule = memo(({ activePage }) => {
  return (

    <div>
      {AddScheduleData.map(({ label, href, icon }) => (
        <button
          aria-label={label}
          className="p-1 pb-1 pt-1 transition-all rounded duration-300 bg-[#ffffff] border-gray-300 border"
          onClick={() => (window.location.href = href)}
          key={label}
        >
          <FontAwesomeIcon icon={icon} className="h-7 w-7 px-1"/>
        </button>
      ))}
    </div>
  );
});

export default AddSchedule;
