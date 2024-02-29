//homechangepass.js
import React from "react";
import Button from "../components/Button.js";
import backgroundImage from "../resources/calpolycampus.jpg";
import BackHeader from "../components/BackHeader.js";
import TextBox from "../components/TextBox.js";

function ForgotChangePass() {
  return (
    <div className="content-center text-center">
      <BackHeader text="Change Password" />

      {/* Background Image */}
      <div
        className="absolute top-0 right-0 bottom-0 left-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.3,
        }}
      ></div>

      {/* Create Account Heading */}
      <div className="absolute top-[150px] left-1/2 transform -translate-x-1/2">
        <p
          style={{ color: "#154734" }}
          className="font-sans text-center text-5xl font-bold"
        >
          Change Password
        </p>
      </div>

      {/* Content Center */}
      <div className="absolute bottom-[250px] left-1/2 transform -translate-x-1/2">
        <form>
          {/* Current Password box */}
          <TextBox
            text="Current Password "
            type="password"
            className="mx-auto w-3/4 mt-5 mb-3 w-80"
          />

          {/* New Password box */}
          <TextBox
            text="New Password"
            type="password"
            className="mx-auto w-3/4 mb-3 w-80"
          />

          {/* Confirm Password box */}
          <TextBox
            text="Confirm Password"
            type="password"
            className="mx-auto w-3/4 mb-12 w-80"
          />

          {/* Create Account Button */}
          <Button
            text="Change Password"
            className="bg-[#003831] text-white font-bold py-2 px-24 shadow-xl rounded mt-10 w-80 whitespace-nowrap"
          />
        </form>
      </div>
    </div>
  );
}

export default ForgotChangePass;
