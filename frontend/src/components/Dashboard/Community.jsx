/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  FiUser,
  FiTrendingUp,
  FiCheckCircle,
  FiMapPin,
  FiCalendar,
  FiEye,
  FiThumbsUp,
  FiMessageSquare,
  FiPlus,
  FiSearch,
  FiArrowLeft,
} from "react-icons/fi";
import Footer from "./DashFooter"; // ✅ use your existing footer
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CommunityReports = () => {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  // Dummy data (replace with backend fetch later)
  useEffect(() => {
    setReports([
      {
        id: 1,
        title: "Traffic light malfunction",
        category: "Infrastructure",
        description:
          "Traffic light stuck on red in all directions causing major backup.",
        location: "Broadway & 5th St",
        distance: "1.5 mi",
        date: "Dec 10",
        author: "Robert Martinez",
        likes: 42,
        comments: 1,
        status: "Submitted",
      },
      {
        id: 2,
        title: "Overflowing storm drain",
        category: "Water",
        description:
          "Storm drain backing up during rain, flooding the intersection.",
        location: "Elm Street & Park Ave",
        distance: "0.5 mi",
        date: "Dec 10",
        author: "David Kim",
        likes: 15,
        comments: 3,
        status: "In Progress",
      },
      {
        id: 3,
        title: "Graffiti vandalism on bus stop",
        category: "Vandalism",
        description:
          "Fresh graffiti appeared overnight on bus stop shelter.",
        location: "Main St Bus Stop #12",
        distance: "0.8 mi",
        date: "Dec 9",
        author: "Anna Rodriguez",
        likes: 8,
        comments: 2,
        status: "Submitted",
        image:
          "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=800&q=60",
      },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 🌐 Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          {/* Back Button + Title */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition font-medium"
            >
              <FiArrowLeft size={18} /> Back to Dashboard
            </button>
            <h1 className="text-lg font-semibold text-gray-800">
              Community Reports
            </h1>
          </div>

          {/* Search + Report Button */}
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search community reports..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none w-64"
              />
            </div>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-700 transition-all shadow-sm">
              <FiPlus /> Report Issue
            </button>
          </div>
        </div>
      </nav>

      {/* 📊 Overview Section */}
      <div className="max-w-7xl mx-auto w-full px-6 mt-6 space-y-2">
        <h2 className="text-2xl font-semibold text-gray-800">
          Community Reports
        </h2>
        <p className="text-gray-500">
          See what's happening in your neighborhood
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white shadow rounded-xl p-4 flex justify-between items-center border border-gray-100"
          >
            <div>
              <p className="text-gray-600 text-sm">Total Reports</p>
              <h3 className="text-2xl font-semibold mt-1">6</h3>
            </div>
            <div className="text-purple-500 bg-purple-100 p-3 rounded-lg">
              <FiUser size={22} />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white shadow rounded-xl p-4 flex justify-between items-center border border-gray-100"
          >
            <div>
              <p className="text-gray-600 text-sm">In Progress</p>
              <h3 className="text-2xl font-semibold mt-1">2</h3>
            </div>
            <div className="text-orange-500 bg-orange-100 p-3 rounded-lg">
              <FiTrendingUp size={22} />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white shadow rounded-xl p-4 flex justify-between items-center border border-gray-100"
          >
            <div>
              <p className="text-gray-600 text-sm">Resolved</p>
              <h3 className="text-2xl font-semibold mt-1">1</h3>
            </div>
            <div className="text-green-500 bg-green-100 p-3 rounded-lg">
              <FiCheckCircle size={22} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* 🔍 Filters */}
      <div className="max-w-7xl mx-auto w-full px-6 mt-6">
        <div className="bg-white shadow-sm rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-gray-100">
          <select className="border border-gray-200 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-purple-500 focus:outline-none">
            <option>All Status</option>
            <option>Submitted</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>

          <select className="border border-gray-200 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-purple-500 focus:outline-none">
            <option>Most Recent</option>
            <option>Oldest</option>
            <option>Most Liked</option>
          </select>
        </div>
      </div>

      {/* 🧾 Reports Grid */}
      <div className="max-w-7xl mx-auto w-full px-6 mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 pb-10">
        {reports.map((report) => (
          <motion.div
            key={report.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col transition-all hover:shadow-md"
          >
            {report.image && (
              <div className="relative">
                <img
                  src={report.image}
                  alt={report.title}
                  className="w-full h-44 object-cover"
                />
                <span className="absolute top-3 right-3 bg-purple-100 text-purple-600 text-xs font-medium px-2 py-1 rounded-md">
                  {report.status}
                </span>
              </div>
            )}

            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-gray-900 font-medium text-base">
                {report.title}
              </h3>
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-md mt-1 w-fit">
                {report.category}
              </span>
              <p className="text-gray-600 text-sm mt-2 flex-1">
                {report.description}
              </p>

              <div className="mt-3 text-sm text-gray-500 space-y-1">
                <p className="flex items-center gap-2">
                  <FiMapPin className="text-purple-500" /> {report.location}{" "}
                  <span className="text-purple-500">• {report.distance}</span>
                </p>
                <p className="flex items-center gap-2">
                  <FiCalendar className="text-purple-500" /> {report.date} by{" "}
                  {report.author}
                </p>
              </div>

              <div className="mt-4 flex justify-between items-center text-gray-600 text-sm">
                <div className="flex gap-4">
                  <span className="flex items-center gap-1">
                    <FiThumbsUp /> {report.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiMessageSquare /> {report.comments}
                  </span>
                </div>
                <button className="flex items-center gap-1 text-purple-600 hover:text-purple-800 transition">
                  <FiEye /> View
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🦶 Footer */}
      <Footer />
    </div>
  );
};

export default CommunityReports;
