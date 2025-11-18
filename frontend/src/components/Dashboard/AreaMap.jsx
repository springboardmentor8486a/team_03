// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  FiArrowLeftCircle,
  FiCheckCircle,
  FiClock,
  FiFilter,
  FiLayers,
  FiMapPin,
  FiRefreshCw,
  FiSend,
  FiUser,
  FiZoomIn,
  FiZoomOut
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Footer from "./DashFooter"; // ✅ Adjust this path as needed


export default function AreaMap() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ✅ Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white border-b shadow-sm sticky top-0 z-20"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <button
                onClick={() => navigate("/dashboard")}
                className="flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition"
              >
                <FiArrowLeftCircle size={20} />
                Back to Dashboard
              </button>
            </motion.div>

            <h1 className="text-lg font-semibold text-gray-800">
             Area Map
            </h1>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-100 transition">
              <FiRefreshCw className="text-gray-600" /> Refresh
            </button>
            <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-100 transition">
              <FiSend className="text-gray-600" /> My Location
            </button>
          </div>
        </div>
      </motion.header>

      {/* ✅ Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-6 space-y-6">
        {/* Page Heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800">Area Map</h2>
          <p className="text-gray-500 text-sm">
            View and track reports around your area
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          <StatCard
            icon={<FiMapPin className="text-purple-500" size={20} />}
            label="Nearby"
            value="3"
          />
          <StatCard
            icon={<FiUser className="text-blue-500" size={20} />}
            label="Your Reports"
            value="2"
          />
          <StatCard
            icon={<FiClock className="text-orange-500" size={20} />}
            label="In Progress"
            value="1"
          />
          <StatCard
            icon={<FiCheckCircle className="text-green-500" size={20} />}
            label="Resolved"
            value="1"
          />
        </motion.div>

        {/* Filter Reports */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-sm rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-gray-700 font-medium flex items-center gap-2">
              <FiFilter className="text-indigo-500" /> Filter Reports
            </h3>
          </div>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-indigo-400 transition">
            <option>All Reports</option>
            <option>Nearby Reports</option>
            <option>Resolved Reports</option>
            <option>In Progress</option>
          </select>
        </motion.div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white shadow-sm rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-gray-700 font-medium flex items-center gap-2">
              <FiMapPin className="text-indigo-500" /> Map View
            </h3>
            <div className="flex items-center gap-2">
              <IconButton icon={<FiZoomIn />} />
              <IconButton icon={<FiZoomOut />} />
              <IconButton icon={<FiLayers />} />
            </div>
          </div>

          {/* Placeholder for map */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="w-full h-80 bg-gradient-to-b from-green-50 to-blue-50 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 text-sm"
          >
            Map Integration Coming Soon
          </motion.div>
        </motion.div>
      </main>

      {/* ✅ Footer */}
      <Footer />
    </div>
  );
}

/* ====== Reusable Components ====== */

const StatCard = ({ icon, label, value }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    transition={{ type: "spring", stiffness: 200 }}
    className="bg-white border border-gray-100 shadow-sm rounded-xl px-5 py-4 flex flex-col gap-2 hover:shadow-md transition-all"
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-gray-600">{icon}</div>
      <span
        className={`text-xs font-semibold ${label === "Resolved"
            ? "text-green-600"
            : label === "In Progress"
              ? "text-orange-600"
              : label === "Your Reports"
                ? "text-blue-600"
                : "text-purple-600"
          }`}
      >
        {label.toUpperCase()}
      </span>
    </div>
    <p className="text-2xl font-semibold text-gray-800">{value}</p>
  </motion.div>
);

const IconButton = ({ icon }) => (
  <motion.button
    whileHover={{ scale: 1.1, rotate: 5 }}
    whileTap={{ scale: 0.95 }}
    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-gray-600 transition"
  >
    {icon}
  </motion.button>
);
