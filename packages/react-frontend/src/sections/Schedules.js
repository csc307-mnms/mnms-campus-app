import React, { useState } from "react";
import Select from "react-select";
import LogoutHeader from "../components/LogoutHeader.js";
import NavBar from "../components/NavBar.js";
import Calendar from "../components/Calendar.js";

function Schedules() {
  // const [schedules, setSchedules] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  // useEffect(() => {
  //   fetch("http://localhost:8000/schedules/:id")
  //   .then((response) => response.json())
  //   .then((data) => {
  //     const options = data.map((schedule) => ({
  //       label: schedule.name,
  //       value: schedule.id,
  //     }));
  //     setSchedules(options);
  //   })
  //   .catch((error) => {
  //     console.error("Error fetching schedules:", error);
  //   });
  // }, []);

  const options = [
    { value: "Select Schedule", label: "Select Schedule" },
    { value: "F2023", label: "F2023" },
    { value: "W2024", label: "W2024" },
  ];

  //setSchedules(options);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setSelectedSchedule(selectedOption);
  };

  return (
    <div className="content-center text-center">
      <LogoutHeader text="Schedules" selectedOption={selectedOption} />

      <div className="mx-auto w-1/2 items-center">
        <Select
          className="w-100 mt-5 mb-5 font-bold text-xl"
          options={options}
          onChange={handleChange}
          placeholder="Select Schedule"
          menuPlacement="auto"
        />
      </div>

      {selectedSchedule && (
        <Calendar selectedScheduleId={selectedSchedule.value} />
      )}

      <div className="fixed bottom-0 left-0 right-0">
        <NavBar activePage="schedule" />
      </div>
    </div>
  );
}

export default Schedules;
