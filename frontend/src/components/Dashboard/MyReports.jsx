import { useState } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  FilePlus2,
  MessageSquare,
  ThumbsUp,
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
import ViewDetails from "./ViewDetails";

const reportsMock = [
  {
    id: 1,
    title: "Broken streetlight on Main St",
    status: "In Progress",
    category: "Infrastructure",
    priority: "High",
    description:
      "The streetlight near the intersection has been out for 3 days, creating a safety hazard for pedestrians and drivers.",
    location: "Main St & 5th Ave",
    submitted: "12/6/2024",
    lastUpdate: "12/10/2024",
    comments: 3,
    likes: 12,
  },
  {
    id: 2,
    title: "Overflowing garbage bins",
    status: "Resolved",
    category: "Sanitation",
    priority: "Medium",
    description:
      "Garbage bins near Park Avenue have been overflowing for a week but have now been cleared.",
    location: "Park Avenue, Zone 3",
    submitted: "11/25/2024",
    lastUpdate: "12/02/2024",
    comments: 2,
    likes: 8,
  },
];

export default function MyReports() {
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const navigate = useNavigate();

  const tabs = ["All", "Submitted", "In Review", "In Progress", "Resolved", "Rejected"];
  const categories = [
    "All Categories",
    "Infrastructure",
    "Roads",
    "Sanitation",
    "Parks",
    "Vandalism",
    "Water Issues",
  ];
  const statuses = ["All Status", "Submitted", "In Review", "In Progress", "Resolved", "Rejected"];

  const filteredReports = reportsMock.filter((r) => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "All Categories" || r.category === categoryFilter;
    const matchesStatus =
      (statusFilter === "All Status" || r.status === statusFilter) &&
      (activeTab === "All" || r.status === activeTab);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // ✅ Updated summary cards text
  const summaryCards = [
    { label: "Total", value: "6 reports", sub: "", color: "from-purple-500 to-indigo-500", icon: <FileText /> },
    { label: "Submitted", value: "1 new", sub: "", color: "from-blue-500 to-sky-500", icon: <FileCheck2 /> },
    { label: "In Review", value: "1 pending", sub: "", color: "from-yellow-500 to-amber-400", icon: <Clock /> },
    { label: "In Progress", value: "2 active", sub: "", color: "from-orange-500 to-pink-500", icon: <Activity /> },
    { label: "Resolved", value: "1 done", sub: "", color: "from-green-500 to-emerald-400", icon: <CheckCircle2 /> },
    { label: "Rejected", value: "1 closed", sub: "", color: "from-red-500 to-rose-500", icon: <XCircle /> },
  ];

  // ✅ Priority color map
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

      {/* ✅ Summary Cards */}
      <div className="flex-1 p-8 space-y-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-5">
          {summaryCards.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03 }}
              className={`bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-4`}
            >
              <div className={`p-3 rounded-lg bg-gradient-to-r ${item.color} text-white shadow`}>
                {item.icon}
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">{item.label}</p>
                <p className="text-lg font-bold text-gray-800">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters Section */}
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
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-700"
            >
              {statuses.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
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
        <div className="space-y-6">
          {filteredReports.length === 0 ? (
            <p className="text-gray-500 italic text-center mt-10">No reports found.</p>
          ) : (
            filteredReports.map((r) => (
              <motion.div
                key={r.id}
                layout
                whileHover={{ scale: 1.01 }}
                className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 transition"
              >
                <div className="flex flex-wrap gap-3 items-center">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-semibold rounded-full">
                    {r.status}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full">
                    {r.category}
                  </span>
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full border ${priorityColors[r.priority] || "bg-gray-100 text-gray-700 border-gray-300"
                      }`}
                  >
                    {r.priority}
                  </span>
                </div>

                <h2 className="font-semibold text-lg text-gray-900 mt-3">{r.title}</h2>
                <p className="text-gray-600 mt-1">{r.description}</p>

                {/* ✅ Tinted Info Boxes */}
                <div className="grid sm:grid-cols-3 gap-3 mt-5">
                  <div className="bg-purple-50 border border-purple-100 rounded-lg p-3">
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium text-gray-800">{r.location}</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                    <p className="text-sm text-gray-500">Submitted</p>
                    <p className="font-medium text-gray-800">{r.submitted}</p>
                  </div>
                  <div className="bg-orange-50 border border-orange-100 rounded-lg p-3">
                    <p className="text-sm text-gray-500">Last Update</p>
                    <p className="font-medium text-gray-800">{r.lastUpdate}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-5">
                  <div className="flex gap-5 text-gray-500">
                    <div className="flex items-center gap-1">
                      <MessageSquare size={18} /> {r.comments}
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp size={18} /> {r.likes}
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/viewdetails/${r.id}`)}
                    className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition"
                    >
                    <Eye size={18} /> View Details
                    </button>

                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </motion.div>
  );
}
