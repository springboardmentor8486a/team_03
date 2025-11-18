import { useState } from "react";
import {
  Menu,
  LayoutDashboard,
  FileText,
  Users,
  Shield,
  Briefcase,
  BarChart2,
  MapPin,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(true);

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
      {/* Header */}
      <div className="p-6 flex items-center justify-between border-b">
        {isOpen && (
          <div className="flex flex-col">
            <span className="text-green-600 font-bold text-xl">
              UrbanAlive
            </span>
            <span className="text-gray-500 text-base">Admin Dashboard</span>
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
          to="/admin/dashboard"
          className={({ isActive }) => (isActive ? activeClass : normalClass)}
        >
          <LayoutDashboard size={26} />
          {isOpen && <span>Dashboard</span>}
        </NavLink>

        <NavLink
          to="/admin/complaints"
          className={({ isActive }) => (isActive ? activeClass : normalClass)}
        >
          <FileText size={26} />
          {isOpen && <span>Complaints</span>}
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) => (isActive ? activeClass : normalClass)}
        >
          <Users size={26} />
          {isOpen && <span>User Management</span>}
        </NavLink>

{/* 
        <NavLink
          to="/admin/departments"
          className={({ isActive }) => (isActive ? activeClass : normalClass)}
        >
          <Briefcase size={26} />
          {isOpen && <span>Departments</span>}
        </NavLink> */}

        <NavLink
          to="/admin/analytics"
          className={({ isActive }) => (isActive ? activeClass : normalClass)}
        >
          <BarChart2 size={26} />
          {isOpen && <span>Analytics</span>}
        </NavLink>

        <NavLink
          to="/admin/map"
          className={({ isActive }) => (isActive ? activeClass : normalClass)}
        >
          <MapPin size={26} />
          {isOpen && <span>City Map</span>}
        </NavLink>
      </nav>
    </div>
  );
}
