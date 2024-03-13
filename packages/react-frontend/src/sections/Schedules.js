import React, { useState, useEffect } from "react";
import Select from "react-select";
import LogoutHeader from "../components/LogoutHeader.js";
import NavBar from "../components/NavBar.js";
import Calendar from "../components/Calendar.js";
import AddSchedule from "../components/AddSchedule.js";
import { BackendURI } from "../data/data.js";

function Schedules() {
  const [schedules, setSchedules] = useState(null);
  const [scheduleOptions, setScheduleOptions] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  useEffect(() => {
    fetch(`${BackendURI}/schedules`)
      .then((response) => response.json())
      .then((data) => {
        const options = data.map((schedule) => ({
          label: schedule.name,
          value: schedule,
        }));
        setScheduleOptions(options);
      })
      .catch((error) => {
        console.error("Error fetching schedules:", error);
      });
  }, []);

  const handleScheduleSelect = (selectedOption) => {
    setSelectedSchedule(selectedOption.value._id);
    console.log(selectedOption.value._id);
  };

  return (
    <div className="content-center text-center">
      <LogoutHeader text="Schedules" />

      <div className="flex justify-between mt-5 mx-4 mb-4">
        <div className="w-1/5"> </div>
        <div className="w-3/5 pr-2 items-center justify-end">
          <Select
            className="font-bold text-xl w-100"
            options={scheduleOptions}
            onChange={handleScheduleSelect}
            placeholder="Select Schedule"
            menuPlacement="auto"
          />
        </div>
        <div className="w-1/5 item-center justify-end">
          <AddSchedule />
        </div>
      </div>

      {selectedSchedule && <Calendar selectedScheduleId={selectedSchedule} />}

      <div className="fixed bottom-0 left-0 right-0">
        <NavBar activePage="schedule" />
      </div>
    </div>
  );
}

export default Schedules;
