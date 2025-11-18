import { useState } from "react";
import {
  Menu,
  LayoutDashboard,
  FileText,
  BarChart2,
  Map,
  Users,
  User,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  // active / normal styles
  const activeClass =
    "flex items-center space-x-4 text-purple-600 font-semibold text-lg";
  const normalClass =
    "flex items-center space-x-4 text-gray-700 font-medium text-lg hover:text-purple-600";

  return (
    <div
      className={`${
        isOpen ? "w-72" : "w-24"
      } bg-white border-r flex flex-col transition-all duration-300`}
    >
      {/* Header with Logo + Toggle Button */}
      <div className="p-6 flex items-center justify-between border-b">
        {isOpen && (
          <div className="flex flex-col">
            <span className="text-green-600 font-bold text-xl">
              UrbanAlive
            </span>
            <span className="text-gray-500 text-base">Civic Platform</span>
          </div>
        )}
        <button
          className="text-gray-600 hover:text-purple-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-6 space-y-6">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? activeClass : normalClass)}
        >
          <LayoutDashboard size={26} />
          {isOpen && <span>Dashboard</span>}
        </NavLink>

        <NavLink
          to="/my-reports"
          className={({ isActive }) => (isActive ? activeClass : normalClass)}
        >
          <FileText size={26} />
          {isOpen && <span>My Reports</span>}
        </NavLink>

        <NavLink
          to="/analytics"
          className={({ isActive }) => (isActive ? activeClass : normalClass)}
        >
          <BarChart2 size={26} />
          {isOpen && <span>Analytics</span>}
        </NavLink>

        <NavLink
          to="/map"
          className={({ isActive }) => (isActive ? activeClass : normalClass)}
        >
          <Map size={26} />
          {isOpen && <span>Area Map</span>}
        </NavLink>

        <NavLink
          to="/communitys"
          className={({ isActive }) => (isActive ? activeClass : normalClass)}
        >
          <Users size={26} />
          {isOpen && <span>Community</span>}
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) => (isActive ? activeClass : normalClass)}
        >
          <User size={26} />
          {isOpen && <span>Profile</span>}
        </NavLink>

      </nav>
    </div>
  );
}
