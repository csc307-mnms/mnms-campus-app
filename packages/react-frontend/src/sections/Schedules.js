import React, { useState } from "react";
import Select from "react-select";
import LogoutHeader from "../components/LogoutHeader.js";
import NavBar from "../components/NavBar.js";

function Schedules() {
  const options = [
    { value: "Select Schedule", label: "Select Schedule" },
    { value: "F2023", label: "F2023" },
    { value: "W2024", label: "W2024" },
  ];

  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleAddSchedule = () => {
    console.log("Add schedule clicked");
  };

  return (
    <div className="content-center text-center">
      <LogoutHeader text="Schedules" selectedOption={selectedOption} />

      <div className="mx-auto w-1/2">
        <Select
          className="w-100 mt-5 mb-20 font-bold text-xl"
          options={options}
          onChange={handleChange}
          placeholder="Select Schedule"
          menuPlacement="auto"
        />
      </div>

      <button onClick={handleAddSchedule}>+</button>

      <NavBar activePage="schedules" />
    </div>
  );
}

export default Schedules;
