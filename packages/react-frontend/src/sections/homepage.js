// homepage.js
import React from "react";
import backgroundImage from "../resources/calpolycampus.jpg";
import CPlogo from "../resources/calpolylogo.png";
import Button from "../components/Button.js";
import TextBox from "../components/TextBox.js";

function HomePage() {
  return (
    <div className="relative h-screen">
      <div
        className="absolute top-0 right-0 bottom-0 left-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.3,
        }}
      ></div>

      <img
        src={CPlogo}
        alt="Logo"
        className="w-64 h-auto absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/4"
      />

      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2"
        style={{ top: "8%" }}
      >
        <p className="font-sans text-green-800 text-center text-5xl">
          Welcome to PolyBuddy
        </p>
      </div>

      <div className="absolute bottom-[110px] left-1/2 transform -translate-x-1/2">
        <TextBox
          text="Username"
          type="text"
          className="mx-auto w-80 mt-12 mb-1"
        />
        <TextBox
          text="Password"
          type="password"
          className="mx-auto w-80 mt-5 mb-1"
        />

        <div
          style={{ marginLeft: "180px" }}
          className="text-blue-500 cursor-pointer self-end mt-2 font-bold"
        >
          <p>Forgot Password?</p>
        </div>

        <Button
          text="Sign In"
          className="bg-[#003831] text-white font-bold py-2 px-24 shadow-xl rounded mt-3 w-80"
        />

        <div
          style={{ marginLeft: "110px" }}
          className="text-black cursor-pointer self-end mt-2 font-bold"
        >
          <p>Need an account? Sign up!</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
