import React from "react";
import Button from "../components/Button.js";
import LogoutHeader from "../components/LogoutHeader.js";
import NavBar from "../components/NavBar.js";
import TextBox from "../components/TextBox.js";
import UploadFile from "../components/UploadFile.js";

function NewSchedule() {
  return (
    <div className="content-center text-center">
      <LogoutHeader text="Schedules" />

      <h1 className="font-bold text-5xl mt-12 mb-12">Create New Schedule</h1>
      <h2 className="font-bold text-2xl ml-3 mr-3 mb-12">
        Please navigate to your Cal Poly portal and download the schedule.ics
        file to your schedule.
      </h2>

      <form>
        <TextBox
          text="Schedule Name"
          type="schedule name"
          className="mx-auto w-3/4 mt-12 mb-8"
        />

        <UploadFile
          text="Import Schedule File"
          className="mx-auto w-3/4 mb-8"
        />

        <Button
          text="Add Schedule"
          className="bg-[#003831] text-white font-bold py-1 pt-2 pb-2 px-24 shadow-xl rounded mb-30 mt-10 w-3/4 mx-auto"
        />
      </form>

      <div className="fixed bottom-0 left-0 right-0">
        <NavBar activePage="schedule" />
      </div>
    </div>
  );
}

export default NewSchedule;
