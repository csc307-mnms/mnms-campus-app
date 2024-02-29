import React from "react";
import Button from "../components/Button.js";
import LogoutHeader from "../components/LogoutHeader.js";
import NavBar from "../components/NavBar.js";
import TextBox from "../components/TextBox.js";

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
          text="Current Password"
          type="text"
          className="mx-auto w-3/4 mt-12 mb-8"
        />

        {/* New Password box */}
        <TextBox
          text="New Password"
          type="password"
          className="mx-auto w-3/4 mb-8"
        />

        {/* Confirm Password box */}
        <TextBox
          text="Confirm Password"
          type="password"
          className="mb-24 mx-auto w-3/4"
        />

        {/* Change Password Button */}
        <Button
          text="Change Password"
          className="bg-[#003831] text-white font-bold py-1 pt-2 pb-2 px-24 shadow-xl rounded mb-64"
        />
      </form>

      <NavBar activePage="schedule" />
    </div>
  );
}

export default NewSchedule;
