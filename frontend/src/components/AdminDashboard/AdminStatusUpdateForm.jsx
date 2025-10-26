import React, { useState } from 'react';
import { getAuthToken } from '../../utils/authUtils';

const AdminStatusUpdateForm = ({ complaint, isOpen, onClose, onStatusUpdate }) => {
  const [formData, setFormData] = useState({
    status: complaint?.status || 'Received',
    adminNotes: complaint?.adminNotes || ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const statusOptions = [
    { value: 'Received', label: 'Received', color: 'bg-blue-100 text-blue-800' },
    { value: 'In Review', label: 'In Review', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'In Progress', label: 'In Progress', color: 'bg-orange-100 text-orange-800' },
    { value: 'Resolved', label: 'Resolved', color: 'bg-green-100 text-green-800' },
    { value: 'Closed', label: 'Closed', color: 'bg-gray-100 text-gray-800' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }

      console.log('Making API request with token:', token.substring(0, 20) + '...');

      // Prepare the request body
      const requestBody = {
        status: formData.status,
        adminNotes: formData.adminNotes.trim()
      };

      console.log('Request body:', requestBody);

      const response = await fetch(`http://localhost:5000/api/complaints/admin/${complaint._id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestBody)
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      // Get response as text first to see what we're actually getting
      const responseText = await response.text();
      console.log('Raw response:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse response as JSON:', parseError);
        throw new Error(`Server returned invalid JSON. Response: ${responseText.substring(0, 200)}...`);
      }

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update complaint status');
      }

      // Call the callback with updated complaint data
      onStatusUpdate(data.data);
      
      // Close the modal
      onClose();
      
    } catch (err) {
      console.error('Error updating complaint status:', err);
      setError(err.message || 'Failed to update complaint status');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !complaint) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Update Complaint Status</h2>
              <p className="text-sm text-gray-600">
                Complaint ID: {complaint._id}
              </p>
              <p className="text-sm font-medium text-gray-700 mt-1">
                {complaint.title}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Current Status Display */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Current Status</h3>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              statusOptions.find(s => s.value === complaint.status)?.color || 'bg-gray-100 text-gray-800'
            }`}>
              {complaint.status}
            </span>
            {complaint.assignedTo && (
              <div className="mt-2 text-sm text-gray-600">
                Assigned to: <span className="font-medium">{complaint.assignedTo.name}</span>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Status Selection */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                New Status *
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>



            {/* Admin Notes */}
            <div>
              <label htmlFor="adminNotes" className="block text-sm font-medium text-gray-700 mb-2">
                Admin Notes
              </label>
              <textarea
                id="adminNotes"
                name="adminNotes"
                value={formData.adminNotes}
                onChange={handleInputChange}
                rows={4}
                placeholder="Add notes about the status change, actions taken, or additional information..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {isLoading ? 'Updating...' : 'Update Status'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-400 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminStatusUpdateForm;