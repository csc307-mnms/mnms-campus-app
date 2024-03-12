import LogoutHeader from "../components/LogoutHeader.js";
import NavBar from "../components/NavBar.js";
import React, { useState, useEffect } from "react";
import { SectionID, BackendURI } from "../data/data.js";

function ProfilePage({ token }) {
  const [email, setEmail] = useState("");

  console.log(JSON.parse(atob(token.split(".")[1])).username);

  useEffect(() => {
    fetch(
      `${BackendURI}/users/username/` +
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
      <div className="content-center text-center">
        <LogoutHeader text="Profile" className="text-center"/>

        <div className="mx-auto w-3/4 mt-12 mb-8">
          <p className="font-bold">Username</p>
          <p className="bg-[#e5e7eb] px-1 rounded w-full text-center shadow-lg h-10 mt-2 align-middle">
            {JSON.parse(atob(token.split(".")[1])).username}
          </p>
          <p className="font-bold">Email</p>
          <p className="bg-[#e5e7eb] px-1 rounded w-full text-center shadow-lg h-10 mt-2 align-middle">
            {email}
          </p>
          <div className="text-blue-500 cursor-pointer self-end ml-44 mt-2 font-bold text-right">
          <button
            aria-label="Change Password Button" 
            onClick={() => (window.location.href = `${SectionID.ChangePass}`)}
          >
            Change Password
          </button>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0">
          <NavBar activePage="profile" />
        </div>
        </div>
    </>
  );
}

export default ProfilePage;
