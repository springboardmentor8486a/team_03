import { useState } from "react";
import axios from "axios";

export default function UpdateReport({ complaint, onClose, onUpdate }) {
  const [updateType, setUpdateType] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [updatePhoto, setUpdatePhoto] = useState(null);

  const BACKEND_URL = "http://localhost:5000/api";

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    if (!updateDescription.trim() && !updateType && !updateStatus && !updatePhoto) return;

    try {
      const formData = new FormData();
      formData.append("updateType", updateType);
      formData.append("updateStatus", updateStatus);
      formData.append("description", updateDescription);
      if (updatePhoto) formData.append("photo", updatePhoto);

      await axios.post(`${BACKEND_URL}/complaints/${complaint._id}/update`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onUpdate(); // Refresh data in parent
      onClose();  // Close modal
    } catch (error) {
      console.error("Error submitting update:", error);
      alert("Failed to submit update.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
        <h2 className="text-xl font-bold mb-4">Update Report</h2>
        <form onSubmit={handleSubmitUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Update Type</label>
            <select
              value={updateType}
              onChange={(e) => setUpdateType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select Type</option>
              <option value="Status Update">Status Update</option>
              <option value="Progress Update">Progress Update</option>
              <option value="Resolution Update">Resolution Update</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={updateStatus}
              onChange={(e) => setUpdateStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select Status</option>
              <option value="Submitted">Submitted</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={updateDescription}
              onChange={(e) => setUpdateDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              rows="4"
              placeholder="Enter update description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Photo</label>
            <input
              type="file"
              onChange={(e) => setUpdatePhoto(e.target.files[0])}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              Submit Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
