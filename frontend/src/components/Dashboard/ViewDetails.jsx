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
  FiThumbsDown,
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
    workProgressPhotos: ["progress1.jpg", "progress2.jpg"],
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

  const [upvotes, setUpvotes] = useState(complaint.votes || 0);
  const [downvotes, setDownvotes] = useState(0);
  const [photos, setPhotos] = useState(complaint.photos || []);
  const [workProgressPhotos, setWorkProgressPhotos] = useState(complaint.workProgressPhotos || []);
  const [comments, setComments] = useState(complaint.comments || []);
  const [newComment, setNewComment] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [updateType, setUpdateType] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [updatePhoto, setUpdatePhoto] = useState(null);
  const [activeButton, setActiveButton] = useState('Admin Response');
  const [title, setTitle] = useState(complaint.title || '');

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

  const handleUpvote = () => {
    setUpvotes(upvotes + 1);
  };

  const handleDownvote = () => {
    setDownvotes(downvotes + 1);
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
        // Simulate adding the photo to the photos array (in a real app, this would be handled by the backend)
        const newPhotoName = `update_${Date.now()}.jpg`; // Placeholder for uploaded photo name
        setPhotos([...photos, newPhotoName]);
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
    <>
      {/* Fixed Navbar */}
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

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 px-4 py-2 rounded-lg shadow-sm">{title}</h1>
          <div className="flex justify-start items-center mt-2 w-1/2">
            <div className="text-xs text-gray-500 px-2 py-1 rounded shadow-sm bg-gray-100">{complaint.category}</div>
            <div className="text-xs text-yellow-500 px-2 py-1 rounded shadow-sm bg-gray-100 ml-4">{complaint.status}</div>
            <div className="text-xs text-yellow-500 px-2 py-1 rounded shadow-sm bg-gray-100 ml-4">{complaint.priority}</div>
          </div>
          <div className="flex justify-start items-center mt-6 w-1/2">
            <FiMapPin className="text-gray-500 mr-2" />
            <span className="text-sm text-gray-600">{complaint.location}</span>
            <FiCalendar className="text-gray-500 mr-2 ml-4" />
            <span className="text-sm text-gray-600">Submitted: {complaint.submitted}</span>
            <FiCalendar className="text-gray-500 mr-2 ml-4" />
            <span className="text-sm text-gray-600">Updated: {complaint.updated}</span>
          </div>
          <div className="mt-4 w-1/2">
            <strong>Description:</strong>
            <p className="text-base text-gray-700">{complaint.description}</p>
          </div>
        </div>

        {/* Centered Complaint Details Section */}
        <div className="max-w-6xl mx-auto mb-8">
          {/* Row 1: Complaint Photos and Reporter Info */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Complaint Photos Submitted by Reporter</h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-3xl mx-1">
                {/* Photo 1 */}
                <div className="flex-1 max-w-sm h-48 bg-gray-200 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center mx-auto">
                  <img
                    src={`http://localhost:5000/uploads/${photos[0] || 'placeholder.jpg'}`}
                    alt="Complaint photo 1"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                {/* Photo 2 */}
                <div className="flex-1 max-w-sm h-48 bg-gray-200 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center mx-auto">
                  <img
                    src={`http://localhost:5000/uploads/${photos[1] || 'placeholder.jpg'}`}
                    alt="Complaint photo 2"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
            {/* Reporter Info */}
            <div className="w-80 mr-8 mt-5">
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Reporter Information</h3>
                <p className="text-sm text-gray-600"><strong>Name:</strong> {complaint.reporterName}</p>
                <br></br>
                <p className="text-sm text-gray-600"><strong>Contact:</strong> {complaint.reporterEmail}</p>
                <br></br>
                <p className="text-sm text-gray-600"><strong>Submitted:</strong> {complaint.submitted}</p>
              </div>
            </div>
          </div>

          {/* Row 2: Work Progress Photos and Quick Actions */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 ">Work Progress Photos Submitted by Admin</h2>
              <div className="flex flex-col sm:flex-row gap-4 max-w-3xl ">
                {/* Photo 1 */}
                <div className="flex-1 max-w-sm h-48 bg-gray-200 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center">
                  <img
                    src={`http://localhost:5000/uploads/${workProgressPhotos[0] || 'placeholder.jpg'}`}
                    alt="Work progress photo 1"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                {/* Photo 2 */}
                <div className="flex-1 max-w-sm h-48 bg-gray-200 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center">
                  <img
                    src={`http://localhost:5000/uploads/${workProgressPhotos[1] || 'placeholder.jpg'}`}
                    alt="Work progress photo 2"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
            {/* Quick Actions */}
            <div className="w-64 mr-12">
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl shadow-md p-3 text-center">
                <h3 className="text-base font-bold text-purple-800 mb-3 flex items-center justify-center gap-2 mx-auto">
                  <FiSettings className="text-lg" /> Quick Actions
                </h3>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={openUpdateModal}
                    className="group relative bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white p-1.5 rounded-lg shadow-sm transform hover:scale-105 transition-all duration-300 flex flex-col items-center gap-1"
                  >
                    <FiEdit2 className="text-lg group-hover:text-purple-200 transition-colors" />
                    <span className="font-medium text-xs">Update Status</span>
                  </button>
                  <button
                    onClick={openUpdateModal}
                    className="group relative bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white p-1.5 rounded-lg shadow-sm transform hover:scale-105 transition-all duration-300 flex flex-col items-center gap-1"
                  >
                    <FiEdit3 className="text-lg group-hover:text-orange-200 transition-colors" />
                    <span className="font-medium text-xs">Edit Report</span>
                  </button>
                  <button
                    className="group relative bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-1.5 rounded-lg shadow-sm transform hover:scale-105 transition-all duration-300 flex flex-col items-center gap-1"
                  >
                    <FiPhoneCall className="text-lg group-hover:text-blue-200 transition-colors" />
                    <span className="font-medium text-xs">Contact Support</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

         
        


          {/* Combined Status Progress and Voting Section */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-between gap-6">
              {/* Status Progress - Takes more space */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Status Progress</h3>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Status</span>
                  </div>
                  <div className="flex-1 h-1 bg-purple-200 mx-4 rounded-full"></div>
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
              {/* Voting Buttons - Smaller size */}
              <div className="flex flex-col items-center gap-2">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Vote</h4>
                <div className="flex gap-3">
                  <button
                    onClick={handleUpvote}
                    className="flex items-center justify-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg font-medium hover:bg-green-200 transition-all duration-300 hover:scale-105 shadow-sm"
                  >
                    <FiThumbsUp className="text-base" />
                    <span className="text-sm">{upvotes}</span>
                  </button>
                  <button
                    onClick={handleDownvote}
                    className="flex items-center justify-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-lg font-medium hover:bg-red-200 transition-all duration-300 hover:scale-105 shadow-sm"
                  >
                    <FiThumbsDown className="text-base" />
                    <span className="text-sm">{downvotes}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>



        {/* New Section: Admin Requests */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => setActiveButton('Admin Response')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeButton === 'Admin Response' ? 'bg-purple-200 text-purple-800' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'}`}
            >
              Admin Response
            </button>
            <button
              onClick={() => setActiveButton('Timeline')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeButton === 'Timeline' ? 'bg-purple-200 text-purple-800' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'}`}
            >
              Timeline
            </button>
            <button
              onClick={() => setActiveButton('Location Map')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeButton === 'Location Map' ? 'bg-purple-200 text-purple-800' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'}`}
            >
              Location Map
            </button>
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
              placeholder="Add a comment..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows="3"
            ></textarea>
            <button
              type="submit"
              className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Add Comment
            </button>
          </form>
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-semibold text-gray-800">{comment.user}</span>
                  <span className="text-sm text-gray-500">{comment.timestamp}</span>
                </div>
                <p className="text-gray-700">{comment.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Update Modal */}
      {modalIsOpen ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Update Report</h2>
            <form onSubmit={handleSubmitUpdate}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Update Type</label>
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
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Status</label>
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
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={updateDescription}
                  onChange={(e) => setUpdateDescription(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  rows="3"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Photo</label>
                <input
                  type="file"
                  onChange={(e) => setUpdatePhoto(e.target.files[0])}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Submit Update
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
