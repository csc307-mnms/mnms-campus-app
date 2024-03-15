import React from "react";
import useToken from "../hooks/useToken.js";
import { useNavigate } from "react-router-dom";

const LogoutHeader = ({ text }) => {
  const { clearToken } = useToken();
  const navigate = useNavigate();

  return (
    <div className="grid grid-rows-2 grid-flow-cols w-full h-32 bg-[#003831] ">
      <div className="grid grid-cols-2 pt-4 pl-4 pr-4">
        <div className="col-span-1 text-left">
          <button
            aria-label="back button"
            key="back button"
            onClick={() => {
              navigate(-1);
            }}
            className="text-blue-500 font-bold px-3"
          >
            Back
          </button>
        </div>

        <div className="col-span-1 text-right">
          <button
            aria-label="logout button"
            key="logout button"
            className="text-blue-500 font-bold px-3"
            onClick={() => {
              console.log("Logging out");
              clearToken();
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <p className="text-white text-xl font-bold">{text}</p>
    </div>
  );
};

export default LogoutHeader;
