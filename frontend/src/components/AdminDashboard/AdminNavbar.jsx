// import { useState } from "react";
import { Bell, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm">
      {/* Title */}
      <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>

      {/* Right Section */}
      <div className="flex items-center space-x-5">
        
        {/* Profile + Logout */}
        <div className="flex items-center space-x-3">
          {/* Profile Icon + Name */}
          <div className="flex items-center space-x-2">
            <span className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-lg">
              A
            </span>
            <span className="text-gray-700 font-medium">Admin01</span>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
