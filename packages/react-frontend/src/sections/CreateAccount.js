import React, { useState } from "react";
import backgroundImage from "../resources/calpolycampus.jpg";
import BackHeader from "../components/BackHeader";
import Button from "../components/Button";
import TextBox from "../components/TextBox";

function CreateAccount() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [error, setError] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 409) {
          throw new Error("User already exists");
        } else {
          throw new Error("Error creating user");
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

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
          Create Account
        </p>
      </div>

      {/* Instruction Paragraph */}
      <div className="absolute top-[280px] left-1/2 transform -translate-x-1/2 w-4/5">
        <p className="font-sans text-center text-1xl font-bold mb-5">
          Please fill out the following information to create a PolyBuddy
          account.
        </p>
      </div>

      {/* Content Center */}
      <div className="absolute bottom-[110px] left-1/2 transform -translate-x-1/2">
        <form onSubmit={handleSubmit}>
          {/* Username box */}
          <TextBox
            text="Username"
            type="text"
            className="mx-auto w-3/4 mt-5 mb-3 w-80"
            onChange={(e) => setUsername(e.target.value)}
          />

          {/* Cal Poly Email */}
          <TextBox
            text="Cal Poly Email"
            type="text"
            className="mx-auto w-3/4 mb-3 w-80"
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password box */}
          <TextBox
            text="Password"
            type="password"
            className="mx-auto w-3/4 mb-3 w-80"
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Confirm Password box */}
          <TextBox
            text="Confirm Password"
            type="password"
            className="mx-auto w-3/4 mb-12 w-80"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* Error Message */}
          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* Create Account Button */}
          <Button
            text="Sign Up"
            className="bg-[#003831] text-white font-bold py-2.5 px-24 shadow-xl rounded mt-8 w-80"
          />
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;
