import React from "react";
import backgroundImage from "../resources/calpolycampus.jpg";
import CPlogo from "../resources/calpolylogo.png";

//import Button from "../components/Button.js";

function HomePage() {
  const containerStyle = {
    position: "relative",
    height: "100vh",
  };

  const backgroundImageStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: 0.4,
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

  return (
    <div style={containerStyle}>
      <div style={backgroundImageStyle}></div>
      <img src={CPlogo} alt="Logo" style={logoStyle} />
      <div style={textStyle}>
        <p>Welcome to PolyBuddy</p>
      </div>
    </div>
  );
}

export default HomePage;
