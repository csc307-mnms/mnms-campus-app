import LogoutHeader from "../components/LogoutHeader.js";
import NavBar from "../components/NavBar.js";
import React, { useState, useEffect } from "react";

function ProfilePage({ token }) {
  const [email, setEmail] = useState("");

  console.log(JSON.parse(atob(token.split(".")[1])).username);

  useEffect(() => {
    fetch(
      "http://localhost:8000/users/username/" +
        JSON.parse(atob(token.split(".")[1])).username,
    )
      .then((res) => res.json())
      .then((data) => {
        setEmail(data.email);
      });
  }, [token]);

  // console.log(handleFetch());

  return (
    <>
      <LogoutHeader text="Profile" />

      <div>
        <p className="text-center">Username</p>
        <p className="bg-[#e5e7eb] px-1 rounded w-50 text-center shadow-lg h-10 mt-2">
          {JSON.parse(atob(token.split(".")[1])).username}
        </p>
        <p className="text-center">Email</p>
        <p className="bg-[#e5e7eb] px-1 rounded w-50 text-center shadow-lg h-10 mt-2">
          {/* {fetch("http://localhost:8000/users/username/" + JSON.parse(atob(token.split('.')[1])).username)
          .then((res)=>res).json().email} */}
          {email}
        </p>
      </div>

      <NavBar activePage="profile" />
    </>
  );
}

export default ProfilePage;