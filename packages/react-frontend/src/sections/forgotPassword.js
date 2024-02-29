import React from "react";
import backgroundImage from "../resources/calpolycampus.jpg";
import BackHeader from "../components/BackHeader";
import Button from "../components/Button";
import TextBox from "../components/TextBox";

function ForgotPassword() {
  return (
    <div className="relative h-screen">
      <BackHeader text="Create Account" href="/" />

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
          Forgot Password
        </p>
      </div>

      {/* Instruction Paragraph */}
      <div className="absolute top-[280px] left-1/2 transform -translate-x-1/2 w-4/5">
        <p className="font-sans text-center text-1xl font-bold mb-5">
          Enter the email address associated with your PolyBuddy account.
        </p>
      </div>

      {/* Content Center */}
      <div className="absolute top-[370px] left-1/2 transform -translate-x-1/2">
        <form>
          {/* Email */}
          <TextBox text="Email" type="text" className="mx-auto w-3/4 w-80" />

          {/* Create Account Button */}
          <Button
            text="Send Recovery Email"
            className="bg-[#003831] text-white font-bold py-2.5 w-full shadow-xl rounded mt-8 w-80"
          />
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
