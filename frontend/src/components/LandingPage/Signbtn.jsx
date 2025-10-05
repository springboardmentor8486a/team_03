import React from "react";
import { useNavigate } from "react-router-dom";

const Signbtn = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/login")}
      className="px-6 py-2 rounded hover:bg-gray-200 text-black transition"
    >
      Sign In
    </button>
  );
};

export default Signbtn;
