/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  FilePlus2,
  FileText,
  Clock,
  Activity,
  CheckCircle2,
  XCircle,
  LayoutDashboard,
  FileCheck2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "./DashFooter";

export default function MyReports() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const navigate = useNavigate();

  // ✅ Simplified Token Retrieval
  const getToken = () => {
    try {
      return (
        localStorage.getItem("token") ||
        sessionStorage.getItem("token") ||
        JSON.parse(localStorage.getItem("user") || "{}").token ||
        JSON.parse(sessionStorage.getItem("user") || "{}").token ||
        null
      );
    } catch {
      return null;
    }
  };

  // ✅ Fetch Complaints from Backend
  const fetchComplaints = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setError("Please login to view your reports.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await fetch("http://localhost:5000/api/complaints/my", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 403)
          setError("You are not authorized to view these reports.");
        else setError("Failed to load your reports.");
        setComplaints([]);
        return;
      }

      const data = await response.json();
      setComplaints(data?.data || []);
    } catch (err) {
      console.error("Error fetching complaints:", err);
      setError("Failed to load your reports. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  // ✅ Tabs & Category Options
  const tabs = ["All", "Submitted", "In Review", "In Progress", "Resolved", "Closed"];
  const categories = [
    "All Categories",
    "Infrastructure",
    "Roads",
    "Public Safety",
    "Environment",
    "Public Transport",
    "Other",
  ];

  // ✅ Dynamic Filtering Logic
  const filteredReports = complaints.filter((r) => {
    const normalize = (val) => val?.toLowerCase().trim();

    const matchesSearch = normalize(r.title || "").includes(normalize(searchQuery));
    const matchesCategory =
      categoryFilter === "All Categories" ||
      normalize(r.category) === normalize(categoryFilter);
    const matchesStatus =
      activeTab === "All" || normalize(r.status) === normalize(activeTab);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // ✅ Dynamic Summary Counts
  const statusCounts = complaints.reduce((acc, r) => {
    acc[r.status] = (acc[r.status] || 0) + 1;
    return acc;
  }, {});

  const summaryCards = [
    {
      label: "Total",
      value: `${complaints.length} reports`,
      color: "from-purple-500 to-indigo-500",
      icon: <FileText />,
    },
    {
      label: "Submitted",
      value: `${statusCounts["Submitted"] || 0} new`,
      color: "from-blue-500 to-sky-500",
      icon: <FileCheck2 />,
    },
    {
      label: "In Review",
      value: `${statusCounts["In Review"] || 0} pending`,
      color: "from-yellow-500 to-amber-400",
      icon: <Clock />,
    },
    {
      label: "In Progress",
      value: `${statusCounts["In Progress"] || 0} active`,
      color: "from-orange-500 to-pink-500",
      icon: <Activity />,
    },
    {
      label: "Resolved",
      value: `${statusCounts["Resolved"] || 0} done`,
      color: "from-green-500 to-emerald-400",
      icon: <CheckCircle2 />,
    },
    {
      label: "Closed",
      value: `${statusCounts["Closed"] || 0} closed`,
      color: "from-red-500 to-rose-500",
      icon: <XCircle />,
    },
  ];

  const priorityColors = {
    High: "bg-red-100 text-red-700 border-red-300",
    Urgent: "bg-orange-100 text-orange-700 border-orange-300",
    Medium: "bg-blue-100 text-blue-700 border-blue-300",
    Low: "bg-green-100 text-green-700 border-green-300",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col min-h-screen bg-gray-50"
    >
      {/* Navbar */}
      <div className="bg-white border-b shadow-sm px-8 py-4 flex justify-between items-center sticky top-0 z-10">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-gray-700 hover:text-purple-600 font-medium transition"
        >
          <LayoutDashboard size={22} />
          Back to Dashboard
        </button>
        <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
          My Reports
        </h1>
        <button
          onClick={() => navigate("/reportissue")}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium shadow-md transition"
        >
          <FilePlus2 size={20} /> New Report
        </button>
      </div>

      <div className="flex-1 p-8 space-y-8">
        {/* ✅ Summary Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-5">
          {summaryCards.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03 }}
              className={`bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-4`}
            >
              <div
                className={`p-3 rounded-lg bg-gradient-to-r ${item.color} text-white shadow`}
              >
                {item.icon}
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">{item.label}</p>
                <p className="text-lg font-bold text-gray-800">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <input
              type="text"
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-700"
            />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-700"
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ✅ Report Cards */}
        {loading ? (
          <p className="text-center text-gray-500 mt-10">Loading your reports...</p>
        ) : error ? (
          <p className="text-center text-red-500 mt-10">{error}</p>
        ) : filteredReports.length === 0 ? (
          <div className="text-center mt-20">
            <FileText className="mx-auto text-gray-400" size={40} />
            <p className="text-gray-500 mt-3 italic">No reports found for this filter.</p>
          </div>
        ) : (
          filteredReports.map((r) => (
            <motion.div
              key={r._id}
              layout
              whileHover={{ scale: 1.02, boxShadow: "0 4px 14px rgba(0,0,0,0.1)" }}
              className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 transition cursor-pointer"
              onClick={() => navigate(`/reports/${r._id}`)}
            >
              <div className="flex flex-wrap gap-3 items-center">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-semibold rounded-full">
                  {r.status}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full">
                  {r.category}
                </span>
                <span
                  className={`px-3 py-1 text-sm font-semibold rounded-full border ${
                    priorityColors[r.priority] ||
                    "bg-gray-100 text-gray-700 border-gray-300"
                  }`}
                >
                  {r.priority}
                </span>
              </div>

              <h2 className="font-semibold text-lg text-gray-900 mt-3">{r.title}</h2>
              <p className="text-gray-600 mt-1">{r.description}</p>

              <div className="grid sm:grid-cols-3 gap-3 mt-5">
                <div className="bg-purple-50 border border-purple-100 rounded-lg p-3">
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium text-gray-800">{r.location}</p>
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                  <p className="text-sm text-gray-500">Submitted</p>
                  <p className="font-medium text-gray-800">
                    {r.createdAt?.split("T")[0]}
                  </p>
                </div>
                <div className="bg-orange-50 border border-orange-100 rounded-lg p-3">
                  <p className="text-sm text-gray-500">Last Update</p>
                  <p className="font-medium text-gray-800">
                    {r.updatedAt?.split("T")[0]}
                  </p>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <Footer />
    </motion.div>
  );
}
