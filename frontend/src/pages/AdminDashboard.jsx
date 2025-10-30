import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import {
  FiAlertTriangle,
  FiCheckCircle,
  FiClock,
  FiFileText,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import AdminFooter from "../components/AdminDashboard/AdminFooter";
import AdminNavbar from "../components/AdminDashboard/AdminNavbar";
import AdminReportCard from "../components/AdminDashboard/AdminReportCard";
import AdminSidebar from "../components/AdminDashboard/AdminSidebar";
import AdminStatCard from "../components/AdminDashboard/AdminStatCard";
import AdminStatusUpdateForm from "../components/AdminDashboard/AdminStatusUpdateForm";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [stats, setStats] = useState({
    totalReports: 0,
    resolved: 0,
    inProgress: 0,
    rejected: 0,
    resolutionRate: 0,
  });

  const [userCount, setUserCount] = useState(0);
  const [resolutionRate, setResolutionRate] = useState(0);

  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);

  // ✅ Auth check
  useEffect(() => {
    const user =
      JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(sessionStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      navigate("/login");
    }
  }, [navigate]);

  // ✅ Fetch complaints (dashboard overview)
  const fetchReports = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:5000/api/complaints/admin/list?page=1&limit=5",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = res.data.data || [];
      setReports(data);

      const resolved = data.filter((r) => r.status === "Resolved").length;
      const inProgress = data.filter((r) => r.status === "In Progress").length;
      const rejected = data.filter((r) => r.status === "Rejected").length;
      const total = data.length;
      const rate = total ? ((resolved / total) * 100).toFixed(1) : 0;

      setStats({
        totalReports: total,
        resolved,
        inProgress,
        rejected,
        resolutionRate: rate,
      });
      setResolutionRate(rate);
    } catch (err) {
      console.error("Error fetching reports:", err);
      setError("Failed to fetch complaints. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Fetch user count
  const fetchUsers = useCallback(async () => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      const { data } = await axios.get(
        "http://127.0.0.1:5000/users/admin/users",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const users = Array.isArray(data) ? data : data.users || [];
      setUserCount(users.length);
      sessionStorage.setItem("userlength", users.length);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  }, []);

  useEffect(() => {
    fetchReports();
    fetchUsers();
  }, [fetchReports, fetchUsers]);

  // ✅ Handle Status Update from Dashboard
  const handleStatusUpdate = (complaint) => {
    setSelectedComplaint(complaint);
    setIsUpdateFormOpen(true);
  };

  const handleFormClose = () => {
    setIsUpdateFormOpen(false);
    setSelectedComplaint(null);
  };

  const handleComplaintUpdated = (updatedComplaint) => {
    // Update complaint in the list
    setReports((prev) =>
      prev.map((r) =>
        r._id === updatedComplaint._id ? updatedComplaint : r
      )
    );

    // Update stats again
    fetchReports();
  };

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

          {/* ✅ Live Analytics Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AdminStatCard
              title="Total Reports"
              value={stats.totalReports}
              color="from-purple-500 to-purple-600"
              icon={<FiFileText size={24} />}
            />
            <AdminStatCard
              title="Resolved"
              value={stats.resolved}
              subtitle={`${stats.resolutionRate}% rate`}
              color="from-green-500 to-green-600"
              icon={<FiCheckCircle size={24} />}
            />
            <AdminStatCard
              title="In Progress"
              value={stats.inProgress}
              color="from-blue-500 to-blue-600"
              icon={<FiClock size={24} />}
            />
            <AdminStatCard
              title="Rejected"
              value={stats.rejected}
              color="from-red-500 to-red-600"
              icon={<FiAlertTriangle size={24} />}
            />
          </div>

          {/* Reports + Quick Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Reports */}
            <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Recent Complaints
                </h2>
                <button
                  onClick={() => navigate("/admin/complaints")}
                  className="px-3 py-1 text-sm border rounded-lg hover:bg-gray-100 transition"
                >
                  View All
                </button>
              </div>

              {loading ? (
                <p className="text-gray-500">Loading...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : reports.length === 0 ? (
                <p className="text-gray-600">No complaints found.</p>
              ) : (
                <div className="space-y-4">
                  {reports.map((report) => (
                    <AdminReportCard
                      key={report._id || report.id}
                      report={report}
                      onStatusUpdate={handleStatusUpdate} // ✅ Added update handler
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Quick Stats
                </h2>
                <div className="space-y-4 text-sm text-gray-700">
                  <div className="flex justify-between items-center">
                    <span>User Count</span>
                    <span className="font-semibold text-gray-900">
                      {userCount}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Resolution Rate</span>
                    <span className="font-semibold text-gray-900">
                      {resolutionRate}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <AdminFooter />
        </main>
      </div>

      {/* ✅ Status Update Modal */}
      <AdminStatusUpdateForm
        complaint={selectedComplaint}
        isOpen={isUpdateFormOpen}
        onClose={handleFormClose}
        onStatusUpdate={handleComplaintUpdated}
      />
    </div>
  );
}
