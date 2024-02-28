//homepage.js
import React from "react";
import backgroundImage from "../resources/calpolycampus.jpg";
import CPlogo from "../resources/calpolylogo.png";
import Button from "../components/Button.js";
import TextBox from "../components/TextBox.js";

function HomePage() {
  const containerStyle = {
    position: "relative",
    height: "100vh",
  };

  const backgroundImageStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: 0.3,
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  const logoStyle = {
    width: "250px",
    height: "auto",
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  const textStyle = {
    position: "absolute",
    top: "10%",
    left: "50%",
    transform: "translateX(-50%)",
    fontFamily: "sans-serif",
    color: "#154734",
    fontSize: "40px",
    textAlign: "center",
  };

  const textBoxContainerStyle = {
    position: "absolute",
    top: "55%",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "300px",
    fontSize: "14px",
  };

  const forgotPasswordButtonStyle = {
    color: "#0085FF",
    cursor: "pointer",
    alignSelf: "flex-end",
    marginTop: "8px",
    fontWeight: "bold",
  };

  const signUpButtonStyle = {
    color: "#000000",
    cursor: "pointer",
    alignSelf: "flex-end",
    marginTop: "8px",
    fontWeight: "bold",
  };

  return (
    <div style={containerStyle}>
      <div style={backgroundImageStyle}></div>
      <img src={CPlogo} alt="Logo" style={logoStyle} />
      <div style={textStyle}>
        <p>Welcome to PolyBuddy</p>
      </div>

      <div style={textBoxContainerStyle}>
        <TextBox
          text="Username"
          type="text"
          className="mx-auto w-full mt-12 mb-1"
        />
        <TextBox
          text="Password"
          type="password"
          className="mx-auto w-full mb-1"
        />
        <div style={forgotPasswordButtonStyle}>
          <p>Forgot Password?</p>
        </div>
        <Button
          text="Sign In"
          className="bg-[#003831] text-white font-bold py-1 pt-2 pb-2 px-24 shadow-xl rounded mt-3"
        />
        <div style={signUpButtonStyle}>
          <p>Need an account? Sign up!</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
