import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="flex items-center justify-between px-6 py-5 bg-white border-b shadow-sm">
      {/* Title */}
      <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>

      {/* Right Section */}
      <div className="flex items-center space-x-5">
        {/* Search */}
        <input
          type="text"
          placeholder="Search reports, locations..."
          className="border rounded-lg px-4 py-2 text-sm w-72 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            className="flex items-center space-x-2 focus:outline-none"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
              J
            </span>
            <ChevronDown
              size={18}
              className={`text-gray-600 transition-transform ${
                isDropdownOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg">
              <button
                onClick={() => navigate("/profile")}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
