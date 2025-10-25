import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiSettings, FiInfo, FiCheck, FiClock, FiCalendar } from "react-icons/fi";
import { getImageUrl } from "../utils/imageUtils";

import AdminSidebar from "../components/AdminDashboard/AdminSidebar";
import AdminNavbar from "../components/AdminDashboard/AdminNavbar";
import AdminFooter from "../components/AdminDashboard/AdminFooter";
import LocationMap from "../components/Dashboard/LocationMap";

export default function WorkProgressDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    // Check user role from localStorage/sessionStorage
    const user = JSON.parse(localStorage.getItem("user")) || JSON.parse(sessionStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      navigate("/login");
      return;
    }

    // Fetch complaints
    const token = user.token;
    axios.get("http://localhost:5000/api/complaints", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setComplaints(response.data);
        if (response.data.length > 0) {
          setSelectedComplaint(response.data[0]);
        }
      })
      .catch(error => {
        console.error("Error fetching complaints:", error);
        // Mock data if API fails
        setComplaints([
          {
            _id: "1",
            title: "Streetlight Outage",
            status: "In Progress",
            priority: "High",
            location: "Main St, City Center",
            submitted: "2024-01-10",
            photos: ["photo1.jpg"],
            assignedTo: "John Doe",
            department: "City Works"
          },
          {
            _id: "2",
            title: "Pothole Repair",
            status: "Resolved",
            priority: "Medium",
            location: "Elm St",
            submitted: "2024-01-05",
            photos: ["photo2.jpg"],
            assignedTo: "Jane Smith",
            department: "Road Maintenance"
          }
        ]);
        if (complaints.length > 0) {
          setSelectedComplaint(complaints[0]);
        }
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const progressSteps = [
    { label: "Submitted", status: "submitted" },
    { label: "In Progress", status: "in-progress" },
    { label: "Resolved", status: "resolved" },
  ];

  const getProgressIndex = (status) => {
    switch (status?.toLowerCase()) {
      case "in progress": return 1;
      case "resolved": return 2;
      default: return 0;
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim() && selectedComplaint) {
      const comment = {
        text: newComment,
        complaintId: selectedComplaint._id,
        user: "Admin User",
        timestamp: new Date().toISOString().split('T')[0]
      };
      // POST to API
      const token = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user")).token;
      axios.post(`http://localhost:5000/api/complaints/${selectedComplaint._id}/comments`, comment, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => {
          setComments([...comments, response.data]);
        })
        .catch(error => {
          console.error("Error adding comment:", error);
          // Local add as fallback
          setComments([...comments, comment]);
        });
      setNewComment("");
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Work Progress Dashboard</h1>
            <div className="flex items-center gap-4">
              <div className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
                Admin
              </div>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                Generate Report
              </button>
            </div>
          </div>

          {/* Complaints List */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Complaints</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {complaints.map((complaint) => (
                <div
                  key={complaint._id}
                  onClick={() => setSelectedComplaint(complaint)}
                  className={`p-4 rounded-lg border cursor-pointer transition ${
                    selectedComplaint?._id === complaint._id ? "border-purple-500 bg-purple-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <h3 className="font-semibold text-gray-900 mb-2">{complaint.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    complaint.status === "Resolved" ? "bg-green-100 text-green-700" :
                    complaint.status === "In Progress" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-700"
                  }`}>
                    {complaint.status}
                  </span>
                  <p className="text-sm text-gray-600 mt-2">{complaint.location}</p>
                </div>
              ))}
            </div>
          </div>

          {selectedComplaint && (
            <>
              {/* Main Body Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column: Selected Complaint Details */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-800">Complaint Details</h2>
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-lg font-semibold mb-2">{selectedComplaint.title}</h3>
                    <p className="text-gray-600 mb-4">{selectedComplaint.description || "No description"}</p>
                    {selectedComplaint.photos && selectedComplaint.photos.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {selectedComplaint.photos.map((photo, idx) => (
                          <img
                            key={idx}
                            src={getImageUrl(photo)}
                            alt="Complaint photo"
                            className="rounded w-full h-32 object-cover"
                          />
                        ))}
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Assigned: {selectedComplaint.assignedTo}</span>
                      <span className="text-sm text-gray-500">Dept: {selectedComplaint.department}</span>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Timeline</h3>
                    <ul className="space-y-3">
                      {progressSteps.map((step, index) => (
                        <li key={step.label} className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            index <= getProgressIndex(selectedComplaint.status) ? "bg-purple-500 text-white" : "bg-gray-300"
                          }`}>
                            {index < getProgressIndex(selectedComplaint.status) ? <FiCheck /> : index + 1}
                          </div>
                          <div>
                            <span className="font-medium">{step.label}</span>
                            <span className="text-sm text-gray-500 block">
                              {index === 0 ? selectedComplaint.submitted : "Pending"}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Column: Actions and Map */}
                <div className="space-y-6">
                  {/* Quick Actions */}
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <button className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition flex items-center justify-center gap-2">
                        <FiEdit2 /> Update Status
                      </button>
                      <button className="w-full bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition flex items-center justify-center gap-2">
                        <FiUserCheck /> Assign Team
                      </button>
                      <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2">
                        <FiPhoneCall /> Contact Reporter
                      </button>
                    </div>
                  </div>

                  {/* Location Map */}
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Location</h3>
                    <LocationMap lat={selectedComplaint.locationLat || 37.7749} lng={selectedComplaint.locationLng || -122.4194} />
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Comments & Updates</h3>
                <form onSubmit={handleAddComment} className="mb-6">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add comment or update..."
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none h-20 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button type="submit" className="mt-3 bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition">
                    Post Comment
                  </button>
                </form>
                <div className="space-y-3">
                  {comments.length > 0 ? (
                    comments.map((comment) => (
                      <div key={comment.id || comment._id} className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium text-purple-700">{comment.user}</h4>
                          <span className="text-sm text-gray-500">{comment.timestamp}</span>
                        </div>
                        <p className="text-gray-700">{comment.text}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No comments yet.</p>
                  )}
                </div>
              </div>
            </>
          )}
        </main>

        <AdminFooter />
      </div>
    </div>
  );
}
