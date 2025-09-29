import { FiArrowLeft } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

export default function ViewDetails() {
    const location = useLocation();
    const complaint = location.state;
    const navigate = useNavigate();

    // Priority color mapping
    const priorityColors = {
        High: "bg-red-100 text-red-700",
        Medium: "bg-yellow-100 text-yellow-700",
        Low: "bg-green-100 text-green-700",
    };

    if (!complaint) return <h2 className="text-center mt-10 text-gray-500">No data received</h2>;

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-8">
            <button
                onClick={() => navigate("/dashboard")}
                className="flex items-center text-sm text-gray-600 gap-2 mb-6 hover:text-purple-600 transition"
            >
                <FiArrowLeft /> Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold mb-6 text-purple-700">{complaint.title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <p className="mb-2">
                        <span className="font-semibold text-gray-700">Category:</span>{" "}
                        <span className="text-gray-900">{complaint.category}</span>
                    </p>
                    <p className="mb-2">
                        <span className="font-semibold text-gray-700">Priority:</span>{" "}
                        <span
                            className={`inline-block px-2 py-1 rounded text-sm font-semibold ${
                                priorityColors[complaint.priority] || "bg-gray-100 text-gray-700"
                            }`}
                        >
                            {complaint.priority}
                        </span>
                    </p>
                    <p className="mb-2">
                        <span className="font-semibold text-gray-700">Status:</span>{" "}
                        <span className="text-gray-900">{complaint.status}</span>
                    </p>
                    <p className="mb-2">
                        <span className="font-semibold text-gray-700">Location:</span>{" "}
                        <span className="text-gray-900">{complaint.location}</span>
                    </p>
                </div>
                <div>
                    <p className="mb-2">
                        <span className="font-semibold text-gray-700">Submitted:</span>{" "}
                        <span className="text-gray-900">{complaint.submitted}</span>
                    </p>
                    <p className="mb-2">
                        <span className="font-semibold text-gray-700">Assigned To:</span>{" "}
                        <span className="text-gray-900">{complaint.assignedTo}</span>
                    </p>
                </div>
            </div>
            <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Description</h2>
                <p className="text-gray-800 bg-gray-50 rounded p-4">{complaint.description}</p>
            </div>
        </div>
    );
}
