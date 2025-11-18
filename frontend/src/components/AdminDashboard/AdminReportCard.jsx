import { FiMapPin, FiEye, FiEdit, FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../../utils/imageUtils";

export default function AdminReportCard({ report, onStatusUpdate }) {
  const navigate = useNavigate();
  const { title, location, status, photo, description, submittedAt, createdAt } = report;

  const statusColors = {
    "Received": "bg-blue-100 text-blue-700",
    "In Review": "bg-yellow-100 text-yellow-700",
    "In Progress": "bg-orange-100 text-orange-700",
    "Resolved": "bg-green-100 text-green-700",
    "Closed": "bg-gray-100 text-gray-700",
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Not available';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Invalid date';
    }
  };

  const handleView = () => {
    navigate("/admin/report-details", { state: report });
  };

  const handleUpdate = () => {
    if (onStatusUpdate) {
      onStatusUpdate(report);
    }
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

      {/* Description */}
      {description && (
        <p className="mt-4 text-sm text-gray-700 line-clamp-2">{description}</p>
      )}

      {/* Complaint Photo */}
      {photo && (
        <div className="mt-4 rounded-lg overflow-hidden border border-gray-200">
          <img
            src={getImageUrl(photo)}
            alt="Complaint photo"
            className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
        <span>Reported on: {formatDate(submittedAt || createdAt)}</span>
        <div className="flex gap-3">
          <button
            className="flex items-center gap-1 px-3 py-1 text-sm border rounded-md hover:bg-purple-50 hover:border-purple-300 hover:text-purple-600 transition-colors duration-200"
            onClick={handleView}
          >
            <FiEye /> View
          </button>
          <button 
            className="flex items-center gap-1 px-3 py-1 text-sm border rounded-md hover:bg-yellow-50 hover:border-yellow-300 hover:text-yellow-600 transition-colors duration-200"
            onClick={handleUpdate}
          >
            <FiEdit /> Update
          </button>
        </div>
      </div>
    </div>
  );
}
