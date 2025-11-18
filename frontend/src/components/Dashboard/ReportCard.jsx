import { FiEye, FiMapPin } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../../utils/imageUtils";

export default function ReportCard({ complaint }) {
  const navigate = useNavigate();
  const {
    title,
    category,
    priority,
    location,
    status,
    description,
    photo
  } = complaint;

  const statusColors = {
    "In Review": "bg-yellow-100 text-yellow-700",
    Received: "bg-blue-100 text-blue-700",
    Resolved: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
    Pending: "bg-purple-100 text-purple-700",
  };
 const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const priorityColors = {
    High: "text-red-600",
    Medium: "text-yellow-600",
    Low: "text-green-600",
  };

  const handleViewDetails = () => {
    navigate("/view-details", {
      state: { 
        ...complaint, 
        photos: [complaint.photo]
      }
    });
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border hover:shadow-lg transition-shadow duration-200">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg flex items-center gap-2 mb-1">
            <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
              <FiMapPin className="text-gray-600" />
            </span>
            {title}
          </h3>
          <p className="text-sm text-gray-500 text-left ml-8">{category}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${statusColors[status] || "bg-gray-100 text-gray-700"}`}
        >
          {status}
        </span>
      </div>

      {/* Priority + Location */}
      <div className="mt-4 flex items-center gap-4 text-sm">
        <span className={`font-semibold ${priorityColors[priority] || "text-gray-700"}`}>
          {priority}
        </span>
        <div className="flex items-center gap-1 text-gray-600">
          <FiMapPin className="text-gray-500" />
          <span>{location}</span>
        </div>
      </div>

      {/* Description */}
      <p className="mt-10 text-gray-700 text-sm leading-relaxed text-left">{description}</p>

      {/* Complaint Photo */}
      {photo && (
        <div className="mt-4 rounded-lg overflow-hidden border border-gray-200">
          <img
            src={getImageUrl(photo)}
            alt="Complaint photo"
            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 flex flex-col gap-1 text-xs text-gray-500 text-left">
        <span>Submitted: {formatDate(complaint.createdAt) || 'N/A'}</span>
        {/* <span className={`${assignedTo === 'Unassigned' ? 'text-orange-600' : 'text-gray-500'}`}>
          Assigned to: {assignedTo || 'Unassigned'}
        </span> */}
      </div>

      {/* Action Buttons */}
      <div className="mt-5 flex gap-3">
        <button className="flex items-center gap-2 px-4 py-2 text-sm border rounded-md hover:bg-gray-100 transition"
          onClick={handleViewDetails}>
          <FiEye /> View Details
        </button>
        {/* <button className="flex items-center gap-2 px-4 py-2 text-sm border rounded-md hover:bg-gray-100 transition">
          <FiEdit /> Update
        </button> */}
      </div>
    </div>
  );
}
