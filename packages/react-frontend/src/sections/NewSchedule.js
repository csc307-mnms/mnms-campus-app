import React, { useState } from "react";
import Button from "../components/Button.js";
import LogoutHeader from "../components/LogoutHeader.js";
import NavBar from "../components/NavBar.js";
import TextBox from "../components/TextBox.js";
import FileUpload from "../components/FileUpload.js";

function NewSchedule(props) {
  const [name, setScheduleName] = useState();
  const [file, setScheduleFile] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (!name || !file) {
      setError("Please fill out all fields");
      setSuccess(null);
      return;
    }
    // const formData = new FormData();
    // formData.append('name', name);
    // formData.append('file', file);
    // body: FormData,
    fetch("http://localhost:8000/schedules", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, file }),
    })
      .then((res) => {
        if (res.ok) {
          setSuccess("Schedule added successfully");
          setScheduleName("");
          setScheduleFile(null);
        } else if (res.status === 409) {
          setError("Schedule already exists");
          setSuccess(null);
        } else {
          setError("Error creating schedule");
          setSuccess(null);
        }
      })
      .catch((error) => {
        setError(error.message);
        setSuccess(null);
      });
  }

  return (
    <div className="content-center text-center">
      <LogoutHeader text="Schedules" />

      <h1 className="font-bold text-5xl mt-12 mb-12">Create New Schedule</h1>
      <h2 className="font-bold text-2xl ml-3 mr-3 mb-12">
        Please navigate to your Cal Poly portal and download the schedule.ics
        file to your schedule.
      </h2>

      <form onSubmit={handleSubmit}>
        <TextBox
          text="Schedule Name"
          name="name"
          type="text"
          className="mx-auto w-3/4 mt-12 mb-8"
          onChange={(e) => setScheduleName(e.target.value)}
        />

        <FileUpload
          text="Import Schedule File"
          name="file"
          type="file"
          className="mx-auto w-3/4 mb-8"
          onChange={(e) => setScheduleFile(e.target.value)}
        />

        <Button
          text="Add Schedule"
          className="bg-[#003831] text-white font-bold py-1 pt-2 pb-2 px-24 shadow-xl rounded mb-30 mt-5 w-3/4 mx-auto"
        />
        {error && <p className="text-red-500 mt-3">{error}</p>}
        {success && <p className="text-green-500 mt-3">{success}</p>}
      </form>

      <div className="fixed bottom-0 left-0 right-0">
        <NavBar activePage="schedule" />
      </div>
    </div>
  );
}

export default NewSchedule;
