//forgotchangepass.js
import React, { useState, useEffect } from "react";
import Button from "../components/Button.js";
import backgroundImage from "../resources/calpolycampus.jpg";
import BackHeader from "../components/BackHeader.js";
import TextBox from "../components/TextBox.js";
import { SectionID, BackendURI } from "../data/data.js";
import { useLocation } from "react-router-dom";

function ForgotChangePass() {
  const location = useLocation();
  const [username, setUsername] = useState();
  const [password] = useState();
  const [newpass, setNewPass] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const username = searchParams.get("username");
    setUsername(username);

    if (username) {
      fetch(`${BackendURI}/users/username/${username}`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("Error fetching user data");
          }
        })
        .then((data) => {
          setUsername(data.username);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [location]);

  const handleClick = (e) => {
    e.preventDefault();
    if (newpass !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (newpass === "") {
      setError("New Password is empty");
      return;
    }
    if (newpass === password) {
      setError("New Password is the same as current. Please enter a new one");
      return;
    }
    fetch(`${BackendURI}/users/overwritePass`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, newpass }),
    })
      .then((res) => {
        if (res.ok) {
          window.location.href = `${SectionID.Login}`;
          return res.json();
        } else if (res.status === 401) {
          throw new Error("Invalid password");
        } else {
          throw new Error("Error changing pass");
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="content-center text-center">
      <div>
        <BackHeader text="Change Password" href="/" />
      </div>

      {/* Background Image */}
      <div
        className="absolute top-0 right-0 bottom-0 left-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.3,
          pointerEvents: "none",
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
          {/* New Password box */}
          <TextBox
            text="New Password"
            type="password"
            className="mx-auto w-3/4 mb-3 w-80"
            onChange={(e) => setNewPass(e.target.value)}
          />

          {/* Confirm Password box */}
          <TextBox
            text="Confirm Password"
            type="password"
            className="mx-auto w-3/4 mb-12 w-80"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* Create Account Button */}
          <Button
            text="Change Password"
            className="bg-[#003831] text-white font-bold py-2 px-24 shadow-xl rounded mt-10 w-80 whitespace-nowrap"
            onClick={handleClick}
          />

          {/* Error Message */}
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default ForgotChangePass;
