import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ComplaintUpdateModal = ({ isOpen, onClose, complaint, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    priority: '',
    location: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // API base URL
  const API_BASE_URL = 'http://localhost:5000/api';

  // Categories and priorities
  const categories = [
    'Infrastructure',
    'Roads',
    'Public Safety',
    'Environment',
    'Public Transport',
    'Other'
  ];

  const priorities = ['Low', 'Medium', 'High', 'Critical'];

  // Initialize form data when complaint changes
  useEffect(() => {
    if (complaint) {
      setFormData({
        title: complaint.title || '',
        category: complaint.category || '',
        priority: complaint.priority || '',
        location: complaint.location || '',
        description: complaint.description || ''
      });
    }
  }, [complaint]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setError('');
      setSuccess('');
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('Title is required');
      return false;
    }
    if (!formData.category) {
      setError('Category is required');
      return false;
    }
    if (!formData.location.trim()) {
      setError('Location is required');
      return false;
    }
    if (!formData.description.trim()) {
      setError('Description is required');
      return false;
    }
    if (formData.title.length > 100) {
      setError('Title cannot exceed 100 characters');
      return false;
    }
    if (formData.location.length > 200) {
      setError('Location cannot exceed 200 characters');
      return false;
    }
    if (formData.description.length > 1000) {
      setError('Description cannot exceed 1000 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const response = await axios.put(
        `${API_BASE_URL}/complaints/${complaint._id}`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        setSuccess('Complaint updated successfully!');
        
        // Call onUpdate callback if provided
        if (onUpdate) {
          onUpdate(response.data.data);
        }

        // Close modal after a short delay
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setError('Failed to update complaint');
      }
    } catch (err) {
      console.error('Error updating complaint:', err);
      setError(err.response?.data?.message || 'Failed to update complaint');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form to original complaint data
    if (complaint) {
      setFormData({
        title: complaint.title || '',
        category: complaint.category || '',
        priority: complaint.priority || '',
        location: complaint.location || '',
        description: complaint.description || ''
      });
    }
    setError('');
    setSuccess('');
    onClose();
  };

  if (!isOpen || !complaint) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Update Complaint</h2>
            <p className="text-sm text-gray-600 mt-1">ID: {complaint._id}</p>
          </div>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
              <div className="flex">
                <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-green-800">{success}</span>
              </div>
            </div>
          )}

          {/* Error Message */}
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

          <div className="space-y-4">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter complaint title"
                maxLength={100}
                required
              />
              <div className="text-right text-xs text-gray-500 mt-1">
                {formData.title.length}/100 characters
              </div>
            </div>

            {/* Category and Priority */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                  Priority *
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Priority</option>
                  {priorities.map(priority => (
                    <option key={priority} value={priority}>{priority}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter location"
                maxLength={200}
                required
              />
              <div className="text-right text-xs text-gray-500 mt-1">
                {formData.location.length}/200 characters
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe the complaint in detail"
                maxLength={1000}
                required
              />
              <div className="text-right text-xs text-gray-500 mt-1">
                {formData.description.length}/1000 characters
              </div>
            </div>

            {/* Current Status Display */}
            <div className="bg-gray-50 p-3 rounded-md">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Status
              </label>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                complaint.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                complaint.status === 'In Progress' ? 'bg-purple-100 text-purple-800' :
                complaint.status === 'In Review' ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {complaint.status}
              </span>
              <p className="text-xs text-gray-600 mt-1">
                Status can only be updated by administrators
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-3 pt-6 border-t mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={loading}
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Updating...
                </div>
              ) : (
                'Update Complaint'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComplaintUpdateModal;
