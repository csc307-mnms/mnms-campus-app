//changepass.js
import React, { useState, useEffect } from "react";
import Button from "../components/Button.js";
import LogoutHeader from "../components/LogoutHeader.js";
import NavBar from "../components/NavBar.js";
import TextBox from "../components/TextBox.js";
import { BackendURI } from "../data/data.js";

function ChangePass({ token }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [newpass, setNewPass] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [error, setError] = useState();
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    fetch(
      `${BackendURI}/users/username/` +
        JSON.parse(atob(token.split(".")[1])).username,
    )
      .then((res) => res.json())
      .then((data) => {
        setUsername(data.username);
      });
  }, [token]);

  const handleClick = (e) => {
    e.preventDefault();
    setButtonClicked(true);
    if (newpass !== confirmPassword) {
      setPasswordChanged(false);
      setError("Passwords do not match");
      return;
    }
    if (newpass === "") {
      setPasswordChanged(false);
      setError("New Password is empty");
      return;
    }
    if (newpass === password) {
      setPasswordChanged(false);
      setError("New Password is the same as current. Please enter a new one");
      return;
    }
    fetch("http://localhost:8000/users/pass", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, newpass }),
    })
    .then((res) => {
      if (res.ok) {
        setPasswordChanged(true);
        setError("");
        return res.json();
      } else if (res.status === 401) {
        throw new Error("Invalid current password");
      } else {
        setPasswordChanged(false);
        throw new Error("Error changing pass");
      }
    })
    .catch((error) => {
        setPasswordChanged(false);
        setError(error.message);
    });
    
  };

  return (
    <div className="content-center text-center">
      <LogoutHeader text="Change Password" />

      <form>
        {/* Current Password box */}
        <TextBox
          text="Current Password"
          type="password"
          className="mx-auto w-3/4 mt-12 mb-8"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* New Password box */}
        <TextBox
          text="New Password"
          type="password"
          className="mx-auto w-3/4 mb-8"
          onChange={(e) => setNewPass(e.target.value)}
        />

        {/* Confirm Password box */}
        <TextBox
          text="Confirm Password"
          type="password"
          className="mb-24 mx-auto w-3/4"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {/* Change Password Button */}
        <Button
          text="Change Password"
          className="bg-[#003831] text-white font-bold py-1 pt-2 pb-2 px-24 shadow-xl rounded"
          onClick={handleClick}
        />

        {buttonClicked && (
          <div className={passwordChanged ? "text-green-600 mt-4" : "text-red-600 mt-4"}>
            {passwordChanged ? "Password changed successfully!" : "Password change failed. Please try again."}
          </div>
        )}

        {/* Error Message */}
        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>

      <div className="fixed bottom-0 left-0 right-0">
        <NavBar activePage="schedule" />
      </div>
    </div>
  );
}

export default ChangePass;
