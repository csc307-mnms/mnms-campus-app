//changepass.js
import React from "react";
import Button from "../components/Button.js";
import LogoutHeader from "../components/LogoutHeader.js";
import NavBar from "../components/NavBar.js";
import TextBox from "../components/TextBox.js";

function ChangePass() {
  return (
    <div className="content-center text-center">
      <LogoutHeader text="Change Password" />

      <form>
        {/* Current Password box */}
        <TextBox
          text="Current Password"
          type="password"
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

      <NavBar activePage="profile" />
    </div>
  );
}

export default ChangePass;
