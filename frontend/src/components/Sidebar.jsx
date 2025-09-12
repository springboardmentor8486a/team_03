import React from "react";
import { Home, FileText, Users, Settings, Menu } from "lucide-react";

const SidebarItem = ({ icon, text, isActive, onClick, isSidebarOpen }) => (
  <div
    className={`flex items-center p-4 cursor-pointer transition-colors ${
      isActive
        ? "bg-green-100 text-green-700"
        : "text-gray-700 hover:bg-gray-100"
    }`}
    onClick={onClick}
  >
    <span className="mr-3">{icon}</span>
    {isSidebarOpen && <span className="font-medium">{text}</span>}
  </div>
);

const Sidebar = ({
  activePage,
  setActivePage,
  isSidebarOpen,
  setIsSidebarOpen,
}) => (
  <div
    className={`${
      isSidebarOpen ? "w-64" : "w-20"
    } bg-white border-r border-gray-200 transition-all duration-300 h-screen`}
  >
    {/* Header */}
    <div className="p-4 flex items-center justify-between border-b border-gray-200">
      {isSidebarOpen && (
        <h2 className="text-xl font-bold text-green-700">CleanStreet</h2>
      )}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="p-1 rounded hover:bg-gray-100 text-gray-700"
      >
        <Menu size={24} />
      </button>
    </div>

    {/* Navigation */}
    <nav className="mt-6">
      <SidebarItem
        icon={<Home size={20} />}
        text="Dashboard"
        isActive={activePage === "dashboard"}
        onClick={() => setActivePage("dashboard")}
        isSidebarOpen={isSidebarOpen}
      />
      <SidebarItem
        icon={<FileText size={20} />}
        text="Reports"
        isActive={activePage === "reports"}
        onClick={() => setActivePage("reports")}
        isSidebarOpen={isSidebarOpen}
      />
      <SidebarItem
        icon={<Users size={20} />}
        text="Volunteers"
        isActive={activePage === "volunteers"}
        onClick={() => setActivePage("volunteers")}
        isSidebarOpen={isSidebarOpen}
      />
      <SidebarItem
        icon={<Settings size={20} />}
        text="Settings"
        isActive={activePage === "settings"}
        onClick={() => setActivePage("settings")}
        isSidebarOpen={isSidebarOpen}
      />
    </nav>
  </div>
);

export default Sidebar;
