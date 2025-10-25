import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { getImageUrl } from "../../utils/imageUtils";

const ComplaintDetailModal = ({ complaint, isOpen, onClose }) => {
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // API base URL
  const API_BASE_URL = 'http://localhost:5000/api';

  // Fetch complaint details
  const fetchComplaintDetails = useCallback(async () => {
    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/complaints/${complaintId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setComplaint(response.data.data);
      } else {
        setError('Failed to fetch complaint details');
      }
    } catch (err) {
      console.error('Error fetching complaint:', err);
      setError(err.response?.data?.message || 'Failed to fetch complaint details');
    } finally {
      setLoading(false);
    }
  }, [complaintId, API_BASE_URL]);

  useEffect(() => {
    if (isOpen && complaintId) {
      fetchComplaintDetails();
    }
  }, [isOpen, complaintId, fetchComplaintDetails]);

  // Priority badge color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Received': return 'bg-blue-100 text-blue-800';
      case 'In Review': return 'bg-yellow-100 text-yellow-800';
      case 'In Progress': return 'bg-purple-100 text-purple-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  // Calculate days since submission
  const getDaysSinceSubmission = (submittedAt) => {
    if (!submittedAt) return 0;
    const diffTime = Math.abs(new Date() - new Date(submittedAt));
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Complaint Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Loading complaint details...</span>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
              <div className="flex">
                <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-red-800">{error}</span>
              </div>
            </div>
          )}

          {complaint && !loading && (
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <p className="text-lg font-semibold text-gray-900">{complaint.title}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ID</label>
                  <p className="text-sm font-mono text-gray-600">{complaint._id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {complaint.category}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(complaint.priority)}`}>
                    {complaint.priority}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(complaint.status)}`}>
                    {complaint.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Days Since Submission</label>
                  <p className="text-lg font-medium text-gray-900">
                    {getDaysSinceSubmission(complaint.submittedAt)} days
                  </p>
                </div>
              </div>

              {/* Uploaded Photo */}
              {complaint.photo && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
                  <img
                    src={getImageUrl(complaint.photo)}
                    alt="Complaint Photo"
                    className="max-w-xs rounded shadow border"
                  />
                </div>
              )}

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-md">{complaint.location}</p>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <p className="text-gray-900 bg-gray-50 p-4 rounded-md whitespace-pre-wrap">{complaint.description}</p>
              </div>

              {/* Reporter Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reported By</label>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="font-medium text-gray-900">{complaint.reportedBy?.name || 'N/A'}</p>
                  <p className="text-sm text-gray-600">{complaint.reportedBy?.email || 'N/A'}</p>
                </div>
              </div>

              {/* Assignment Information */}
              {complaint.assignedTo && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                  <div className="bg-blue-50 p-3 rounded-md">
                    <p className="font-medium text-blue-900">{complaint.assignedTo.name}</p>
                    <p className="text-sm text-blue-700">{complaint.assignedTo.department}</p>
                    {complaint.assignedTo.contact && (
                      <p className="text-sm text-blue-600">{complaint.assignedTo.contact}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Admin Notes */}
              {complaint.adminNotes && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Admin Notes</label>
                  <p className="text-gray-900 bg-yellow-50 p-3 rounded-md">{complaint.adminNotes}</p>
                </div>
              )}

              {/* Timestamps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Submitted At</label>
                  <p className="text-sm text-gray-600">{formatDate(complaint.submittedAt)}</p>
                </div>

                {complaint.resolvedAt && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Resolved At</label>
                    <p className="text-sm text-gray-600">{formatDate(complaint.resolvedAt)}</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Updated</label>
                  <p className="text-sm text-gray-600">{formatDate(complaint.updatedAt)}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Close
          </button>
          
          {complaint && onUpdate && (
            <button
              onClick={() => onUpdate(complaint)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Edit Complaint
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetailModal;
