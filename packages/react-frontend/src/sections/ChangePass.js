import React from "react";
import Button from "../components/Button.js";
import LogoutHeader from "../components/LogoutHeader.js";
import NavBar from "../components/NavBar.js";

function ChangePass() {
  return (
    <>
      <LogoutHeader text="Change Password" />

      <form>
        {/* Current Password box */}
        <div className="mb-8 mt-20 mx-auto w-3/4">
          <label htmlFor="name" className="block font-bold text-left">
            Current Password
          </label>
          <input
            type="text"
            className="bg-[#e5e7eb] rounded w-full shadow-lg h-10 mt-2"
          />
        </div>

        {/* New Password box */}
        <div className="mb-8 mx-auto w-3/4">
          <label htmlFor="job" className="block font-bold text-left">
            New Password
          </label>
          <input
            type="text"
            className="bg-[#e5e7eb] rounded w-full shadow-lg h-10 mt-2"
          />
        </div>

        {/* Confirm Password box */}
        <div className="mb-28 mx-auto w-3/4">
          <label htmlFor="job" className="block font-bold text-left">
            Confirm Password
          </label>
          <input
            type="text"
            className="bg-[#e5e7eb] rounded w-full shadow-lg h-10 mt-2"
          />
        </div>

        {/* Change Password Button */}
        <Button
          text="Change Password"
          className="bg-[#003831] text-white font-bold py-1 pt-2 pb-2 px-24 shadow-xl rounded mb-40"
        />
      </form>

      <NavBar activePage="schedules" />
    </>
  );
}

export default ChangePass;
