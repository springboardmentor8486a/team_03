import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiMapPin,
  FiUploadCloud,
  FiCamera,
} from "react-icons/fi";

export default function ReportIssue() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    location: "",
    priority: "",
    photos: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      photos: Array.from(e.target.files),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 bg-purple-800 hover:bg-purple-900 px-3 py-1 rounded-md shadow"
          >
            <FiArrowLeft /> Back to Dashboard
          </button>
          <div className="ml-5">
            <h1 className="text-2xl font-bold text-left">Report an Issue</h1>
            <p className="text-sm opacity-90">
              Help make your community cleaner and safer
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-3xl mx-auto mt-8 bg-white shadow rounded-lg p-8">
        <h2 className="flex items-center gap-2 font-semibold text-gray-800 text-lg">
          <FiCamera className="text-purple-600 " /> Issue Details
        </h2>
        <p className="text-sm text-gray-500 mb-6 text-left mt-2">
          Provide detailed information about the issue you want to report
        </p>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Issue Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 text-left">
              Issue Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded p-2 mt-1 bg-gray-100 focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select an issue category</option>
              <option>Potholes</option>
              <option>Lighting</option>
              <option>Water</option>
              <option>General</option>
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 text-left">
              Issue Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Brief summary of the issue"
              className="w-full border rounded p-2 mt-1 bg-gray-100 focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 text-left">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide detailed information about the issue, including when you noticed it and any relevant details..."
              rows="3"
              className="w-full border rounded p-2 mt-1 bg-gray-100 focus:ring-2 focus:ring-purple-500"
            ></textarea>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 text-left">
              Location *
            </label>
            <div className="flex items-center">
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter address or coordinates"
                className="w-full border rounded-l p-2 mt-1 bg-gray-100 focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                className="border rounded-r p-2 mt-1 bg-gray-100 hover:bg-gray-200"
              >
                <FiMapPin className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 text-left">
              Priority Level *
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full border rounded p-2 mt-1 bg-gray-100 focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select priority level</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 text-left">
              Photos (Optional)
            </label>
            <div className="mt-2 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6 bg-gray-50">
              <FiUploadCloud className="text-gray-400 text-3xl" />
              <p className="text-gray-500 text-sm mt-2">
                Drag and drop photos here, or{" "}
                <label className="text-purple-600 cursor-pointer hover:underline">
                  click to browse
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Maximum 5 photos, up to 10MB each
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-4 py-2 border rounded-md shadow hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-md shadow hover:from-purple-700 hover:to-purple-800"
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>

      {/* Info Cards */}
      <div className="max-w-3xl mx-auto mt-10 grid grid-cols-3 gap-6 mb-10">
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center shadow-sm">
          <FiCamera className="text-purple-600 text-2xl mx-auto" />
          <h3 className="mt-2 font-medium text-gray-800">Add Photos</h3>
          <p className="text-sm text-gray-500">
            Photos help authorities understand and prioritize your report
          </p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center shadow-sm">
          <FiMapPin className="text-green-600 text-2xl mx-auto" />
          <h3 className="mt-2 font-medium text-gray-800">Precise Location</h3>
          <p className="text-sm text-gray-500">
            Accurate location helps dispatch teams reach the right place
          </p>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 text-center shadow-sm">
          <FiUploadCloud className="text-orange-600 text-2xl mx-auto" />
          <h3 className="mt-2 font-medium text-gray-800">Track Progress</h3>
          <p className="text-sm text-gray-500">
            Monitor your report status from submission to resolution
          </p>
        </div>
      </div>
    </div>
  );
}
