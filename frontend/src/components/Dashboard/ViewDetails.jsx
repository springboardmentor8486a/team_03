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
  FiEdit3,
  FiMessageCircle,
  FiThumbsUp,
  FiPhoneCall,
  FiCamera,
  FiChevronRight,
  FiCheck,
  FiUserCheck,
  FiSettings,
  FiInfo,
  FiX,
} from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ViewDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const mockComplaint = {
    title: "Streetlight Outage",
    category: "Lighting",
    priority: "High",
    status: "In Progress",
    location: "Main St, City Center",
    submitted: "2024-01-10",
    updated: "2024-01-12",
    description: "The streetlight at the corner of Main St and Elm St has been out for two weeks, making the area dark at night.",
    photos: ["streetlight1.jpg", "streetlight2.jpg"],
    department: "City Works",
    assignedTo: "John Doe",
    resolution: "ETA: 2024-01-15",
    reporterName: "Jane Smith",
    reporterEmail: "jane@example.com",
    votes: 5,
    comments: [
      { id: 1, user: "Alice Chen", timestamp: "2024-01-11", text: "Thank you for reporting this issue. We will investigate soon." },
      { id: 2, user: "Lisa Brown", timestamp: "2024-01-12", text: "The repair team is on site now." },
      { id: 3, user: "James Wilson", timestamp: "2024-01-13", text: "Issue resolved. Streetlight is now working." }
    ]
  };

  const complaint = location.state || mockComplaint;

  const [votes, setVotes] = useState(complaint.votes || 0);
  const [comments, setComments] = useState(complaint.comments || []);
  const [newComment, setNewComment] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [updateType, setUpdateType] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [updatePhoto, setUpdatePhoto] = useState(null);

  const priorityColors = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-green-100 text-green-700",
  };

  const progressSteps = [
    { label: "Submitted", status: "submitted" },
    { label: "In Progress", status: "in-progress" },
    { label: "Resolved", status: "resolved" },
  ];

  const getProgressIndex = () => {
    switch (complaint.status?.toLowerCase()) {
      case "in progress": return 1;
      case "resolved": return 2;
      default: return 0;
    }
  };

  const handleVote = () => {
    setVotes(votes + 1);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newCommentObj = {
        id: Date.now(),
        user: "Current User",
        timestamp: new Date().toISOString().split('T')[0],
        text: newComment,
      };
      setComments([...comments, newCommentObj]);
      setNewComment("");
    }
  };

  const openUpdateModal = () => {
    setModalIsOpen(true);
    setUpdateType("");
    setUpdateStatus("");
    setUpdateDescription("");
    setUpdatePhoto(null);
  };

  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    if (updateDescription.trim() || updateType || updateStatus) {
      let updateText = `Update submitted - Type: ${updateType || 'None'}, Status: ${updateStatus || 'No change'}, Description: ${updateDescription.trim()}`;
      if (updatePhoto) {
        updateText += `, New photo added.`;
      }
      const newUpdateComment = {
        id: Date.now(),
        user: "Admin User",
        timestamp: new Date().toISOString().split('T')[0],
        text: updateText,
      };
      setComments([...comments, newUpdateComment]);
      setModalIsOpen(false);
      setUpdateType("");
      setUpdateStatus("");
      setUpdateDescription("");
      setUpdatePhoto(null);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setUpdateType("");
    setUpdateStatus("");
    setUpdateDescription("");
    setUpdatePhoto(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center text-gray-600 hover:text-purple-600 gap-2 mb-8 transition-colors"
      >
        <FiArrowLeft className="text-lg" /> <span>Back to Dashboard</span>
      </button>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">View Details</h1>
        <div className="flex items-center gap-4">
          <div className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
            {complaint.category}
          </div>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      {/* Main Body Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Left Column: Images and Progress */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Complaint Photos</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Photo 1 */}
            <div className="flex-1 h-48 bg-gray-200 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
              <img
                src={`http://localhost:5000/uploads/${complaint.photos[0] || 'placeholder.jpg'}`}
                alt="Complaint photo 1"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            {/* Photo 2 */}
            <div className="flex-1 h-48 bg-gray-200 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
              <img
                src={`http://localhost:5000/uploads/${complaint.photos[1] || 'placeholder.jpg'}`}
                alt="Complaint photo 2"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Status Progress */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Status Progress</h3>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Status</span>
              </div>
              <div className="flex-1 h-1 bg-purple-200 mx-4"></div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Progress</span>
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>50%</span>
              <span>75%</span>
            </div>
          </div>

          {/* Voting Section */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Vote for this Issue</h3>
            <button
              onClick={handleVote}
              className="flex items-center justify-center gap-2 w-full bg-purple-100 text-purple-700 py-3 rounded-lg font-semibold hover:bg-purple-200 transition"
            >
              <FiThumbsUp className="text-lg" /> {votes} Votes
            </button>
          </div>
        </div>

        {/* Right Column: Quick Actions */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button onClick={openUpdateModal} className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
                <FiEdit2 /> Update
              </button>
              <button onClick={openUpdateModal} className="w-full bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
                <FiEdit3 /> Edit Report
              </button>
              <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                <FiPhoneCall /> Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* New Section: Admin Requests */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-6 gap-4">
          <input 
            type="text" 
            placeholder="Search Admin Requests" 
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <div className="flex gap-4 flex-wrap">
            <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition">Timeline</button>
            <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition">Location Map</button>
          </div>
        </div>

        {/* Related Requests List */}
        <div className="space-y-4 mb-6">
          <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
            <h4 className="font-semibold text-purple-700 mb-1">Thank you for the update on the location and streetlight issue</h4>
            <p className="text-sm text-gray-600">You have successfully submitted the request. We will review it soon.</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
            <h4 className="font-semibold text-purple-700 mb-1">Regarding the medical waste collection issue</h4>
            <p className="text-sm text-gray-600">The team has been assigned and will complete the task by end of week.</p>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-purple-50 p-6 rounded-xl shadow-md mb-6 border border-purple-200">
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-purple-200">
          <h3 className="text-lg font-semibold text-purple-800">Comments ({comments.length})</h3>
        </div>
        <form onSubmit={handleAddComment} className="mb-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add comment..."
            className="w-full p-3 border border-purple-300 rounded-lg resize-none h-20 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
          />
          <button type="submit" className="mt-2 bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition flex items-center gap-2">
            Post
          </button>
        </form>
        <div className="space-y-3 max-h-60 overflow-y-auto">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-white p-4 rounded-lg border-l-4 border-purple-300">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-purple-700 text-sm">{comment.user}</h4>
                <span className="text-xs text-gray-500">{comment.timestamp}</span>
              </div>
              <p className="text-gray-700 text-sm">{comment.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Timeline</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            Submitted - {complaint.submitted}
          </li>
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            In Review - {complaint.updated}
          </li>
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            Assigned - In Progress
          </li>
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            Resolved - Pending
          </li>
        </ul>
      </div>

      {/* Update Modal */}
      {modalIsOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">Update Report</h3>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <form onSubmit={handleSubmitUpdate} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Update Type</label>
                  <select
                    value={updateType}
                    onChange={(e) => setUpdateType(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select Type</option>
                    <option value="Status Update">Status Update</option>
                    <option value="Photo Update">Photo Update</option>
                    <option value="General Update">General Update</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={updateStatus}
                    onChange={(e) => setUpdateStatus(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">No Change</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="On Hold">On Hold</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={updateDescription}
                    onChange={(e) => setUpdateDescription(e.target.value)}
                    placeholder="Enter update details..."
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none h-24 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Photo (Optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setUpdatePhoto(e.target.files[0])}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
