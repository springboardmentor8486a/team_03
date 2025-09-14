import { useState } from "react";
import {
  Menu,
  LayoutDashboard,
  FileText,
  BarChart2,
  Map,
  Users,
  User,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

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
        <a
          href="#"
          className="flex items-center space-x-4 text-purple-600 font-semibold text-lg hover:text-purple-700"
        >
          <LayoutDashboard size={26} />
          {isOpen && <span>Dashboard</span>}
        </a>
        <a
          href="#"
          className="flex items-center space-x-4 text-gray-700 font-medium text-lg hover:text-purple-600"
        >
          <FileText size={26} />
          {isOpen && <span>My Reports</span>}
        </a>
        <a
          href="#"
          className="flex items-center space-x-4 text-gray-700 font-medium text-lg hover:text-purple-600"
        >
          <BarChart2 size={26} />
          {isOpen && <span>Analytics</span>}
        </a>
        <a
          href="#"
          className="flex items-center space-x-4 text-gray-700 font-medium text-lg hover:text-purple-600"
        >
          <Map size={26} />
          {isOpen && <span>Area Map</span>}
        </a>
        <a
          href="#"
          className="flex items-center space-x-4 text-gray-700 font-medium text-lg hover:text-purple-600"
        >
          <Users size={26} />
          {isOpen && <span>Community</span>}
        </a>
        <a
          href="#"
          className="flex items-center space-x-4 text-gray-700 font-medium text-lg hover:text-purple-600"
        >
          <User size={26} />
          {isOpen && <span>Profile</span>}
        </a>
        <a
          href="#"
          className="flex items-center space-x-4 text-gray-700 font-medium text-lg hover:text-purple-600"
        >
          <Settings size={26} />
          {isOpen && <span>Settings</span>}
        </a>
      </nav>
    </div>
  );
}
