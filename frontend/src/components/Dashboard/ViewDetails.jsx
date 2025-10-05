import {
  FiArrowLeft,
  FiMapPin,
  FiCalendar,
  FiClock,
  FiFlag,
  FiTag,
  FiUser,
  FiMail,
  FiEdit2,
  FiMessageCircle,
  FiThumbsUp,
  FiPhoneCall,
  FiCamera,
} from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

export default function ViewDetails() {
  const location = useLocation();
  const complaint = location.state;
  const navigate = useNavigate();

  const priorityColors = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-green-100 text-green-700",
  };

  if (!complaint)
    return (
      <h2 className="text-center mt-20 text-gray-500 text-lg">
        No data received
      </h2>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center text-gray-600 hover:text-purple-600 gap-2 mb-8 transition-colors"
      >
        <FiArrowLeft className="text-lg" /> <span>Back to Dashboard</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: Main Complaint Info */}
        <div className="lg:col-span-2 bg-white shadow-sm rounded-2xl p-8 border border-gray-100">
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            {complaint.title}
          </h1>
          <p className="text-gray-500 mb-6">
            Detailed information and progress tracking
          </p>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold flex items-center gap-1">
              <FiTag /> {complaint.category}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 ${priorityColors[complaint.priority] ||
                "bg-gray-100 text-gray-700"
                }`}
            >
              <FiFlag /> {complaint.priority}
            </span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold flex items-center gap-1">
              ⏱️ {complaint.status}
            </span>
          </div>

          {/* Location and Time */}
          <div className="flex flex-wrap items-center gap-6 text-gray-700 mb-8">
            <p className="flex items-center gap-2">
              <FiMapPin className="text-purple-500" /> {complaint.location}
            </p>
            <p className="flex items-center gap-2">
              <FiCalendar className="text-purple-500" /> Submitted:{" "}
              {complaint.submitted}
            </p>
            <p className="flex items-center gap-2">
              <FiClock className="text-purple-500" /> Updated:{" "}
              {complaint.updated || "N/A"}
            </p>
          </div>

          {/* Description */}
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Description
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            {complaint.description}
          </p>

          {/* Photos */}
          {complaint.photos && complaint.photos.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-3">
                <FiCamera /> Photos Submitted by Reporter
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {complaint.photos.map((photo, idx) => (
                  <img
                    key={idx}
                    src={`http://localhost:5000/uploads/${photo}`}
                    alt={`complaint-photo-${idx}`}
                    className="rounded-lg object-cover w-full h-40 border border-gray-200 hover:shadow-md transition"
                  />
                ))}
              </div>
            </div>
          )}

        </div>

        {/* RIGHT: Details + Actions */}
        <div className="space-y-6">
          {/* Assignment Details */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              🗂 Assignment Details
            </h2>
            <p className="mb-2">
              <span className="font-semibold">Department:</span>{" "}
              {complaint.department || "City Works Department"}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Assigned To:</span>{" "}
              {complaint.assignedTo}
            </p>
            <p>
              <span className="font-semibold">Estimated Resolution:</span>{" "}
              {complaint.resolution || "N/A"}
            </p>
          </div>

          {/* Reporter Info */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              👤 Reporter Information
            </h2>
            <p className="mb-2">
              <span className="font-semibold">Name:</span>{" "}
              {complaint.reporterName || "N/A"}
            </p>
            <p className="mb-2 flex items-center gap-2">
              <FiMail className="text-purple-500" />
              <span>{complaint.reporterEmail || "N/A"}</span>
            </p>
            <p>
              <span className="font-semibold">Submitted:</span>{" "}
              {complaint.submitted}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              ⚡ Quick Actions
            </h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-2 bg-purple-700 text-white py-2 rounded-lg font-semibold hover:bg-purple-800 transition">
                <FiEdit2 /> Update Report
              </button>
              <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg font-semibold hover:bg-gray-50 transition">
                <FiMessageCircle /> Add Comment
              </button>
              <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg font-semibold hover:bg-gray-50 transition">
                <FiThumbsUp /> Upvote Report
              </button>
              <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg font-semibold hover:bg-gray-50 transition">
                <FiPhoneCall /> Contact Department
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
