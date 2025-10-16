import axios from "axios";
import { useEffect, useState } from "react";
import {
  FiArrowLeft,
  FiCalendar,
  FiEdit3,
  FiFlag,
  FiMail,
  FiMapPin,
  FiSettings,
  FiTag,
  FiThumbsDown,
  FiThumbsUp
} from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import UpdateReport from "./UpdateReport";
export default function ViewDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const complaint = location.state;

  // Frontend state
  const [upvotes, setUpvotes] = useState(complaint.votes || 0);
  const [downvotes, setDownvotes] = useState(0);
  const [photos, setPhotos] = useState(complaint.photos || []);
  const [workProgressPhotos, setWorkProgressPhotos] = useState(
    complaint.workProgressPhotos || []
  );
  const [comments, setComments] = useState([]);
  const [adminResponses, setAdminResponses] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [updateType, setUpdateType] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [updatePhoto, setUpdatePhoto] = useState(null);
  const [activeButton, setActiveButton] = useState("Admin Response");
  const [title, setTitle] = useState(complaint.title || "");

  const BACKEND_URL = "http://localhost:5000/api"; // Replace with your backend URL

  // Fetch initial data: comments and admin responses
  useEffect(() => {
    fetchComments();
    fetchAdminResponses();
  }, []);

  const fetchComments = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/complaints/${complaint._id}/comments`);
      setComments(res.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const fetchAdminResponses = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/complaints/${complaint._id}/admin-responses`);
      setAdminResponses(res.data);
    } catch (error) {
      console.error("Error fetching admin responses:", error);
    }
  };

  // Upvote API call
  const handleUpvote = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/complaints/${complaint._id}/upvote`);
      setUpvotes(res.data.upvotes); // update count from backend
    } catch (error) {
      console.error("Error updating upvotes:", error);
    }
  };

  // Downvote API call
  const handleDownvote = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/complaints/${complaint._id}/downvote`);
      setDownvotes(res.data.downvotes); // update count from backend
    } catch (error) {
      console.error("Error updating downvotes:", error);
    }
  };

  // Add comment API call
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await axios.post(`${BACKEND_URL}/complaints/${complaint._id}/comments`, {
        text: newComment
      });
      setComments(res.data); // backend returns updated comment list
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const openUpdateModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setModalIsOpen(false);
    setUpdateType("");
    setUpdateStatus("");
    setUpdateDescription("");
    setUpdatePhoto(null);
  };

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
        headers: { "Content-Type": "multipart/form-data" }
      });

      fetchAdminResponses(); // refresh admin responses
      closeModal();
    } catch (error) {
      console.error("Error submitting update:", error);
    }
  };

  return (
    <>
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center text-gray-600 hover:text-purple-600 gap-2 font-medium"
          >
            <FiArrowLeft className="text-lg" /> <span>Dashboard</span>
          </button>
          <button
            onClick={openUpdateModal}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
          >
            Update Report
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10 space-y-6">
        {/* Header & badges */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 px-4 py-2 rounded-lg shadow-sm">
            {title}
          </h1>

          <div className="flex flex-wrap items-center mt-2 gap-3">
            <div className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-purple-100 text-purple-800 font-medium shadow-sm hover:bg-purple-200 transition">
              <FiTag className="w-3 h-3" /> {complaint.category}
            </div>
            <div className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full font-medium shadow-sm transition ${complaint.status === "In Progress" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200" : complaint.status === "Resolved" ? "bg-green-100 text-green-800 hover:bg-green-200" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
              <FiSettings className="w-3 h-3" /> {complaint.status}
            </div>
            <div className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full font-medium shadow-sm transition ${complaint.priority === "High" ? "bg-red-100 text-red-700 hover:bg-red-200" : complaint.priority === "Medium" ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200" : "bg-green-100 text-green-700 hover:bg-green-200"}`}>
              <FiFlag className="w-3 h-3" /> {complaint.priority}
            </div>
          </div>

          <div className="flex flex-wrap items-center mt-4 gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1"><FiMapPin /> {complaint.location}</div>
            <div className="flex items-center gap-1"><FiCalendar /> Submitted: {complaint.submitted}</div>
            <div className="flex items-center gap-1"><FiCalendar /> Updated: {complaint.updated}</div>
          </div>
        </div>

        {/* Post-style Container */}
        <div className=" p-6 rounded-xl  max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel */}

          <div className="col-span-2 space-y-6 bg-white rounded-xl shadow-md p-6">
            <div className="mt-4">
              <strong>Description:</strong>
              <p className="text-gray-700">{complaint.description}</p>
            </div>
            {/* Complaint Photos */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Complaint Photos Submitted by Reporter
              </h2>
              <div className="flex gap-4 overflow-x-auto">
                {photos.map((photo, idx) => (
                  <div key={idx} className="flex-shrink-0 w-48 h-48 bg-gray-200 rounded-xl flex items-center justify-center">
                    <img
                      src={`http://localhost:5000/uploads/${photo || "placeholder.jpg"}`}
                      alt={`Complaint photo ${idx + 1}`}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Work Progress Photos */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Work Progress Photos Submitted by Admin
              </h2>
              <div className="flex gap-4 overflow-x-auto">
                {workProgressPhotos.map((photo, idx) => (
                  <div key={idx} className="flex-shrink-0 w-48 h-48 bg-gray-200 rounded-xl flex items-center justify-center">
                    <img
                      src={`http://localhost:5000/uploads/${photo || "placeholder.jpg"}`}
                      alt={`Work progress photo ${idx + 1}`}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Voting */}
            <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
              <div className="flex gap-3">
                <button onClick={handleUpvote} className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-lg hover:bg-green-200 transition">
                  <FiThumbsUp /> {upvotes}
                </button>
                <button onClick={handleDownvote} className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-lg hover:bg-red-200 transition">
                  <FiThumbsDown /> {downvotes}
                </button>
              </div>
              <button onClick={openUpdateModal} className="flex items-center gap-1 bg-purple-600 text-white px-3 py-1 rounded-lg hover:bg-purple-700 transition">
                <FiEdit3 /> Update
              </button>
            </div>
          </div>

          {/* Right Panel */}
          <div className="bg-white rounded-2xl shadow-sm p-4 border h-36 border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              👤 Reporter Information
            </h2>
            <p className="mb-2">
              <span className="font-semibold">Name:</span> {complaint.reporterName || "N/A"}
            </p>
            <p className="mb-2 flex items-center gap-2">
              <FiMail className="text-purple-500" /><span className="font-semibold">Email:</span>
              <span>{complaint.reporterEmail || "N/A"}</span>
            </p>
          </div>
        </div>
        <div className="bg-purple-50 p-6 rounded-xl shadow-md border border-purple-200">
          {/* Admin Responses */}
          <div className="mt-4">
            <h3 className="text-md font-semibold text-gray-800 mb-2">Admin Responses</h3>
            <div className="space-y-2">
              {adminResponses.length ? (
                adminResponses.map((resp) => (
                  <div key={resp._id} className="bg-purple-50 p-3 rounded-lg border-l-4 border-purple-500">
                    <p className="text-sm text-gray-700">{resp.text}</p>
                    <span className="text-xs text-gray-500">{new Date(resp.timestamp).toLocaleString()}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No admin responses yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-purple-50 p-6 rounded-xl shadow-md border border-purple-200">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-purple-200">
            <h3 className="text-lg font-semibold text-purple-800">
              Comments ({comments.length})
            </h3>
          </div>
          <form onSubmit={handleAddComment} className="mb-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows="3"
            ></textarea>
            <button type="submit" className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Add Comment
            </button>
          </form>
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment._id} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-semibold text-gray-800">{comment.user}</span>
                  <span className="text-sm text-gray-500">{new Date(comment.timestamp).toLocaleString()}</span>
                </div>
                <p className="text-gray-700">{comment.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Update Modal */}
        {modalIsOpen && (
          <UpdateReport
            complaint={complaint}
            onClose={() => setModalIsOpen(false)}
            onUpdate={fetchAdminResponses} // refresh admin responses after update
          />
        )}
      </div>
    </>
  );
}
