// homepage.js
import React, { useState } from "react";
import backgroundImage from "../resources/calpolycampus.jpg";
import CPlogo from "../resources/calpolylogo.png";
import Button from "../components/Button.js";
import TextBox from "../components/TextBox.js";
import PropTypes from "prop-types";
import { SectionID, BackendURI } from "../data/data.js";

function Login({ setToken }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${BackendURI}/users/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Invalid username or password");
        }
      })
      .then((data) => {
        setToken(data.token);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

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

      <div className="absolute top-12 left-1/2 transform -translate-x-1/2">
        <p
          style={{ color: "#154734" }}
          className="font-sans font-bold text-center text-5xl"
        >
          Welcome to PolyBuddy
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="absolute bottom-[110px] left-1/2 transform -translate-x-1/2">
          <TextBox
            text="Username"
            type="text"
            className="mx-auto w-80 mt-12 mb-1"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextBox
            text="Password"
            type="password"
            className="mx-auto w-80 mt-5 mb-1"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="text-blue-500 cursor-pointer self-end ml-44 mt-2 font-bold">
            <button
              aria-label="forgot password button"
              onClick={() =>
                (window.location.href = `${SectionID.ForgotPassword}`)
              }
            >
              Forgot Password?
            </button>
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <Button
            text="Sign In"
            className="bg-[#003831] text-white font-bold py-2 px-24 shadow-xl rounded mt-3 w-80"
          />

          <div className="text-black cursor-pointer self-end ml-28 mt-2 font-bold">
            <a
              aria-label="create account button"
              href={`${SectionID.CreateAccount}`}
              key="create account button"
            >
              Need an account? Sign up!
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
