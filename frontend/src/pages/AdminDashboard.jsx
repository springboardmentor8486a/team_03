import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiFileText,
  FiCheckCircle,
  FiClock,
  FiAlertTriangle,
} from "react-icons/fi";

import AdminSidebar from "../components/AdminDashboard/AdminSidebar";
import AdminNavbar from "../components/AdminDashboard/AdminNavbar";
import AdminStatCard from "../components/AdminDashboard/AdminStatCard";
import AdminReportCard from "../components/AdminDashboard/AdminReportCard";
import AdminFooter from "../components/AdminDashboard/AdminFooter";

export default function AdminDashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    // Check user role from localStorage/sessionStorage
    const user = JSON.parse(localStorage.getItem("user")) || JSON.parse(sessionStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      navigate("/login");
    }
  }, [navigate]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock quick stats - replace with API integration
  const quickStats = {
    activeUsers: 8934,
    responseTime: "2.1 days",
    satisfaction: "4.7/5.0",
  };

  // Mock reports (replace with API call)
  const sampleReports = [
    {
      id: 1,
      title: "Broken streetlight on Main St",
      location: "Main St & 5th Ave",
      date: "2024-01-15",
      status: "In Progress",
    },
    {
      id: 2,
      title: "Pothole on Oak Avenue",
      location: "Oak Ave & 3rd St",
      date: "2024-01-14",
      status: "Received",
    },
    {
      id: 3,
      title: "Garbage overflow at Central Park",
      location: "Central Park Entrance",
      date: "2024-01-14",
      status: "Urgent",
    },
    {
      id: 4,
      title: "Water leak on Pine Street",
      location: "Pine St #124",
      date: "2024-01-13",
      status: "Resolved",
    },
  ];

  const stats = {
    totalReports: 1247,
    resolved: 1054,
    inProgress: 142,
    urgent: 51,
  };

  const fetchReports = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      // Replace with backend call
      // const res = await fetch("/api/admin/reports");
      // const data = await res.json();
      // setReports(data);
      setReports(sampleReports);
    } catch (err) {
      setError("Failed to fetch reports.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8">
          {/* Page Title */}
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Dashboard Overview
            </h1>
            <p className="text-gray-600 text-sm">
              Monitor and manage civic issues across the city
            </p>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AdminStatCard
              title="Total Reports"
              value={stats.totalReports}
              subtitle="+12% this month"
              color="from-purple-500 to-purple-600"
              icon={<FiFileText size={24} />}
            />
            <AdminStatCard
              title="Resolved"
              value={stats.resolved}
              subtitle="84.5% rate"
              color="from-green-500 to-green-600"
              icon={<FiCheckCircle size={24} />}
            />
            <AdminStatCard
              title="In Progress"
              value={stats.inProgress}
              subtitle="Avg 3.2 days"
              color="from-blue-500 to-blue-600"
              icon={<FiClock size={24} />}
            />
            <AdminStatCard
              title="Urgent"
              value={stats.urgent}
              subtitle="Needs attention"
              color="from-red-500 to-red-600"
              icon={<FiAlertTriangle size={24} />}
            />
          </div>

          {/* Recent Reports + Quick Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Reports */}
            <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Recent Reports
                </h2>
                <button className="px-3 py-1 text-sm border rounded-lg hover:bg-gray-100 transition">
                  View All
                </button>
              </div>

              {loading ? (
                <p className="text-gray-500">Loading...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <div className="space-y-4">
                  {reports.map((report) => (
                    <AdminReportCard key={report.id} report={report} />
                  ))}
                </div>
              )}
            </div>

            {/* Quick Stats + Status Overview */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Quick Stats
                </h2>
                <div className="space-y-4 text-sm text-gray-700">
                  <div className="flex justify-between items-center">
                    <span>Active Users</span>
                    <span className="font-semibold text-gray-900">
                      {quickStats.activeUsers.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Response Time</span>
                    <span className="font-semibold text-gray-900">
                      {quickStats.responseTime}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Satisfaction</span>
                    <span className="font-semibold text-gray-900">
                      {quickStats.satisfaction}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Overview */}
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Status Overview
                </h2>
                <div className="space-y-3 text-sm text-gray-700">
                  {[
                    { label: "Resolved", value: stats.resolved, color: "bg-green-500" },
                    { label: "In Progress", value: stats.inProgress, color: "bg-yellow-500" },
                    { label: "Received", value: 31, color: "bg-blue-500" },
                    { label: "Urgent", value: 20, color: "bg-red-500" },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${item.color}`}></span>
                        {item.label}
                      </span>
                      <span className="font-semibold">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <AdminFooter />
        </main>
      </div>
    </div>
  );
}
