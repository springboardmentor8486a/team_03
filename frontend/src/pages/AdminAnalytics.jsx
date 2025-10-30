/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Footer from "../components/AdminDashboard/AdminFooter";
import { FiArrowLeftCircle } from "react-icons/fi";

export default function AnalyticsPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('6');
  
  const [stats, setStats] = useState({
    totalReports: 0,
    resolved: 0,
    inProgress: 0,
    rejected: 0,
    resolutionRate: 0,
    activeReports: 0,
  });

  const [monthlyData, setMonthlyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  const fetchAnalytics = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      // Fetch all analytics data in parallel
      const [monthlyRes, categoryRes, overallRes] = await Promise.all([
        axios.get('http://localhost:5000/api/analytics/monthly', config),
        axios.get('http://localhost:5000/api/analytics/category', config),
        axios.get('http://localhost:5000/api/analytics/overall', config)
      ]);

      setMonthlyData(monthlyRes.data.data);
      setCategoryData(categoryRes.data.data);
      setStats(overallRes.data.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* ✅ Simplified Navbar */}
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white shadow-md sticky top-0 z-20"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Back to Dashboard */}
          <button
            onClick={() => navigate("/admin/dashboard ")}
            className="flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition"
          >
            <FiArrowLeftCircle size={20} />
            Back to Dashboard
          </button>

          {/* Title */}
          <span className="text-gray-800 font-semibold text-lg">
            Report Analytics
          </span>
        </div>
      </motion.nav>

      {/* ✅ Main Content with Reduced Width */}
      <main className="flex-grow p-6 flex flex-col gap-6 max-w-6xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-between items-center"
        >
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Your Report Statistics
            </h2>
            <p className="text-gray-500 text-sm">
              Track your reporting activity and performance
            </p>
          </div>
          {/* <select className="border border-gray-300 rounded-md text-gray-600 text-sm px-3 py-2 focus:outline-none hover:border-indigo-400 transition">
            <option>6 Months</option>
            <option>12 Months</option>
            <option>All Time</option>
          </select> */}
        </motion.div>

        {isLoading ? (
        // Loading state
        <div className="flex flex-col items-center justify-center space-y-4 py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          <p className="text-gray-600">Loading analytics data...</p>
        </div>
      ) : (
        <>
          {/* Top Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <AnimatedCard title="Total Reports" color="purple-500" value={stats.totalReports} />
            <AnimatedCard title="Resolved" color="green-500" value={stats.resolved} />
            <AnimatedCard title="In Progress" color="orange-400" value={stats.inProgress} />
            <AnimatedCard title="Rejected" color="red-500" value={stats.rejected} />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard 
              title="Monthly Reports" 
              type="line" 
              data={monthlyData} 
              emptyMessage="No monthly data available"
            />
            <ChartCard 
              title="Reports by Category" 
              type="bar" 
              data={categoryData}
              emptyMessage="No category data available"
            />
          </div>

          {/* Performance Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-white p-5 rounded-xl shadow-md"
          >
            <h3 className="text-gray-700 font-medium mb-4">Performance Metrics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <MetricCard 
                title="Resolution Rate" 
                value={`${stats.resolutionRate}%`} 
                subtitle="success rate" 
                color="green-400" 
              />
              <MetricCard 
                title="Active Reports" 
                value={stats.activeReports} 
                subtitle="pending action" 
                color="blue-400" 
              />
            </div>
          </motion.div>
        </>
      )}
      </main>

      <Footer />
    </div>
  );
}

// 🔹 Chart Card Component
const ChartCard = ({ title, type, data, emptyMessage = "No data available" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow"
  >
    <h3 className="text-gray-700 font-medium mb-3">{title}</h3>
    {data && data.length > 0 ? (
      <ResponsiveContainer width="100%" height={250}>
        {type === "line" ? (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line type="monotone" dataKey="reports" stroke="#8B5CF6" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        ) : (
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="reports" fill="#8B5CF6" radius={[5, 5, 0, 0]} />
          </BarChart>
        )}
      </ResponsiveContainer>
    ) : (
      <div className="h-[250px] flex items-center justify-center text-gray-500">
        {emptyMessage}
      </div>
    )}
  </motion.div>
);

// 🔹 Animated Stat Card
const AnimatedCard = ({ title, color, value }) => (
  <motion.div
    whileHover={{ scale: 1.04 }}
    transition={{ type: "spring", stiffness: 200 }}
    className="bg-white rounded-xl shadow-md p-5 flex flex-col items-start hover:shadow-lg transition-all"
  >
    <div className={`text-${color} text-sm font-medium mb-2`}>{title}</div>
    <p className="text-3xl font-semibold text-gray-800">{value}</p>
  </motion.div>
);

// 🔹 Metric Card
const MetricCard = ({ title, value, subtitle, color }) => (
  <motion.div
    whileHover={{ scale: 1.04 }}
    transition={{ type: "spring", stiffness: 200 }}
    className={`rounded-xl border-t-4 border-${color} bg-${color}/10 p-5 text-center shadow-sm hover:shadow-md transition`}
  >
    <h4 className={`text-${color} font-semibold text-sm mb-2`}>{title}</h4>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
    {subtitle && <span className="text-gray-500 text-xs">{subtitle}</span>}
  </motion.div>
);
