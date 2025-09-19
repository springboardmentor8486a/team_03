import {
  FiFileText,
  FiCheckCircle,
  FiClock,
  FiUsers,
  FiCalendar,
  FiTrendingUp,
  FiMapPin,
  FiFilter,
} from "react-icons/fi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Dashboard/DashSidebar";
import Navbar from "../components/Dashboard/Navbar";
import StatCard from "../components/Dashboard/StatCard";
import ReportCard from "../components/Dashboard/ReportCard";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("My Reports");
  const [username, setUsername] = useState("User"); // default fallback
  const navigate = useNavigate();

  // Fetch username from localStorage when component mounts
  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) setUsername(storedName);
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Navbar />

        <div className="p-8 overflow-y-auto space-y-8">
          {/* Welcome Message */}
          <div className="flex items-center justify-between w-full mb-6">
            {/* Left Section */}
            <div>
              <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
                Welcome back, {username}!
              </h1>
              <p className="flex items-center text-gray-600 text-sm mt-1">
                <FiMapPin size={16} className="mr-1 text-purple-600" />
                Downtown • Civic Engagement Dashboard
              </p>
            </div>

            {/* Right Section */}
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-100 transition">
                <FiFilter size={16} />
                Filter
              </button>
              <button
                onClick={() => navigate("/reportissue")}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white text-sm font-medium shadow-md hover:opacity-90 transition"
              >
                + Report Issue
              </button>
            </div>
          </div>

          {/* Top Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="My Reports"
              value="6"
              subtitle="+2 this week"
              color="from-purple-500 to-purple-600"
              icon={<FiFileText size={24} />}
            />
            <StatCard
              title="Resolved"
              value="2"
              subtitle="33% completion"
              color="from-green-500 to-green-600"
              icon={<FiCheckCircle size={24} />}
            />
            <StatCard
              title="In Progress"
              value="2"
              subtitle="Avg 4.2 days"
              color="from-orange-500 to-orange-600"
              icon={<FiClock size={24} />}
            />
            <StatCard
              title="Community Score"
              value="8.7"
              subtitle="+0.3 this month"
              color="from-pink-500 to-purple-500"
              icon={<FiUsers size={24} />}
            />
          </div>

          {/* Tabs */}
          <div className="border-b flex space-x-8">
            {["My Reports", "Activity", "Community"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 font-medium transition ${
                  activeTab === tab
                    ? "border-b-2 border-purple-600 text-purple-600"
                    : "text-gray-500 hover:text-purple-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-purple-600 font-medium flex items-center gap-2">
                <FiTrendingUp /> Response Rate
              </p>
              <h2 className="text-2xl font-bold">78%</h2>
              <div className="w-full bg-gray-200 h-2 rounded mt-2">
                <div
                  className="h-2 rounded bg-purple-600"
                  style={{ width: "78%" }}
                ></div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-green-600 font-medium flex items-center gap-2">
                <FiCalendar /> This Month
              </p>
              <h2 className="text-2xl font-bold">156</h2>
              <p className="text-gray-500 text-sm">District reports</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-purple-600 font-medium flex items-center gap-2">
                <FiUsers /> Active Citizens
              </p>
              <h2 className="text-2xl font-bold">891</h2>
              <p className="text-gray-500 text-sm">In your area</p>
            </div>
          </div>

          {/* Reports List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ReportCard
              title="Broken streetlight on Main St"
              category="Infrastructure"
              priority="High"
              location="Main St & 5th Ave"
              status="In Review"
              description="The streetlight has been out for 3 days and poses a safety risk."
              submitted="2025-09-12"
              assignedTo="John Doe"
            />
            <ReportCard
              title="Pothole on 5th Avenue"
              category="Roads"
              priority="Medium"
              location="5th Avenue"
              status="Received"
              description="Large pothole causing vehicle damage."
              submitted="2025-09-11"
              assignedTo="Jane Smith"
            />
            <ReportCard
              title="Graffiti on City Hall Wall"
              category="Public Property"
              priority="Low"
              location="City Hall"
              status="Resolved"
              description="Graffiti removed and wall repainted."
              submitted="2025-09-10"
              assignedTo="Alex Johnson"
            />
            <ReportCard
              title="Water leakage in park fountain"
              category="Parks & Recreation"
              priority="Medium"
              location="Central Park"
              status="Pending"
              description="Fountain leaking water continuously, needs maintenance."
              submitted="2025-09-13"
              assignedTo="Emily Davis"
            />
            <ReportCard
              title="Damaged bench in playground"
              category="Public Property"
              priority="Low"
              location="Sunset Playground"
              status="Rejected"
              description="Bench reported but maintenance team found it safe to use."
              submitted="2025-09-09"
              assignedTo="Michael Lee"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
