import { FiMapPin, FiEye, FiEdit, FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function AdminReportCard({ report }) {
  const navigate = useNavigate();
  const { title, location, date, status } = report;

  const statusColors = {
    Received: "bg-blue-100 text-blue-700",
    "In Progress": "bg-yellow-100 text-yellow-700",
    Resolved: "bg-green-100 text-green-700",
    Urgent: "bg-red-100 text-red-700",
  };

  const handleView = () => {
    navigate("/admin/report-details", { state: report });
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-md border hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg flex items-center gap-2 mb-1">
            <FiMapPin className="text-gray-600" />
            {title}
          </h3>
          <p className="text-sm text-gray-500 ml-6">{location}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}
        >
          {status}
        </span>
      </div>

      {/* Footer */}
      <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
        <span>Reported on: {date}</span>
        <div className="flex gap-3">
          <button
            className="flex items-center gap-1 px-3 py-1 text-sm border rounded-md hover:bg-purple-50 hover:border-purple-300 hover:text-purple-600 transition-colors duration-200"
            onClick={handleView}
          >
            <FiEye /> View
          </button>
          <button className="flex items-center gap-1 px-3 py-1 text-sm border rounded-md hover:bg-yellow-50 hover:border-yellow-300 hover:text-yellow-600 transition-colors duration-200">
            <FiEdit /> Update
          </button>
          <button className="flex items-center gap-1 px-3 py-1 text-sm border rounded-md hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition-colors duration-200 text-green-600">
            <FiCheckCircle /> Resolve
          </button>
        </div>
      </div>
    </div>
  );
}
