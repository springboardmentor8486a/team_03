import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import {
  FiArrowLeft,
  FiFlag,
  FiSettings,
  FiTag,
  FiThumbsDown,
  FiThumbsUp,
  FiTrash2
} from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import UpdateReport from "./UpdateReport";

export default function ViewDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const complaint = location.state;
  const BACKEND_URL = "http://localhost:5000/api";

  const token = sessionStorage.getItem("token") || localStorage.getItem("token") || "";
  const loggedInUserId = sessionStorage.getItem("_id") || localStorage.getItem("_id") || "";
  const role = sessionStorage.getItem("role") || localStorage.getItem("role") || "";

  const [upvotes, setUpvotes] = useState(complaint.votes || 0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  const fetchComments = useCallback(async () => {
    try {
      const res = await axios.get(
        `${BACKEND_URL}/complaints/${complaint._id}/comments`,
        authHeaders
      );
      setComments(Array.isArray(res.data.data) ? res.data.data : []);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setComments([]);
    }
  }, [BACKEND_URL, complaint._id, token]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleVote = async (type) => {
    try {
      const res = await axios.patch(
        `${BACKEND_URL}/complaints/${complaint._id}/vote`,
        { action: type },
        authHeaders
      );
      setUpvotes(res.data.votes);
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      const res = await axios.post(
        `${BACKEND_URL}/complaints/${complaint._id}/comments`,
        { text: newComment },
        authHeaders
      );
      setComments(prev => [...prev, res.data.data]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(
        `${BACKEND_URL}/complaints/${complaint._id}/comments/${commentId}`,
        authHeaders
      );
      fetchComments();
    } catch (error) {
      console.error("Error deleting comment:", error);
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
            onClick={() => setModalIsOpen(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
          >
            Update Report
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Panel: Complaint Details */}
          <div className="flex-1 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{complaint.title}</h1>
              <div className="flex gap-3 mt-2 flex-wrap">
                <span className="px-3 py-1 text-xs bg-purple-100 text-purple-800 rounded-full flex items-center gap-1">
                  <FiTag /> {complaint.category}
                </span>
                <span className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded-full flex items-center gap-1">
                  <FiSettings /> {complaint.status}
                </span>
                <span className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-full flex items-center gap-1">
                  <FiFlag /> {complaint.priority}
                </span>
              </div>
              <p className="mt-4 text-gray-700">{complaint.description}</p>
              {complaint.photo && (
                <div className="mt-4 w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={`http://localhost:5000/uploads/${complaint.photo}`}
                    alt="Complaint"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Voting */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleVote("upvote")}
                  className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-lg hover:bg-green-200"
                >
                  <FiThumbsUp /> {upvotes}
                </button>
                <button
                  onClick={() => handleVote("downvote")}
                  className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-lg hover:bg-red-200"
                >
                  <FiThumbsDown />
                </button>
              </div>

              {/* Random Message */}
              <div className="bg-purple-50 p-4 rounded-xl shadow-md mt-6">
                <h1>Admin Responses</h1>
                <p className="text-gray-700">Thank you for submitting the complaint. It will be reviewed shortly!</p>
              </div>

              {/* Comments */}
              <div className="bg-purple-50 p-6 rounded-xl shadow-md mt-6">
                <h3 className="text-lg font-semibold mb-3">Comments ({comments.length})</h3>
                <form onSubmit={handleAddComment} className="mb-4">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full p-3 border rounded-lg resize-none"
                  />
                  <button type="submit" className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    Add Comment
                  </button>
                </form>

                {comments.map((comment) => {
                  const userId = comment.user?._id?.toString() || "";
                  const canDelete = userId === loggedInUserId || role === "admin";
                  return (
                    <div key={comment._id} className="bg-white p-4 rounded-lg shadow-sm flex justify-between mb-2">
                      <div>
                        <p className="font-semibold">{comment.user?.name || "User"}</p>
                        <p>{comment.text}</p>
                      </div>
                      {canDelete && (
                        <button
                          onClick={() => handleDeleteComment(comment._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FiTrash2 />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Panel: Reporter Info */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white p-6 rounded-xl shadow-md sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Reporter Information</h3>
              <div className="space-y-2 text-gray-700">
                <p><span className="font-semibold">Name:</span> {complaint.reportedBy?.name || "N/A"}</p>
                <p><span className="font-semibold">Email:</span> {complaint.reportedBy?.email || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Update Modal */}
      {modalIsOpen && (
        <UpdateReport
          complaint={complaint}
          onClose={() => setModalIsOpen(false)}
          onUpdate={fetchComments}
        />
      )}
    </>
  );
}
