import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminDashboard/AdminSidebar";
import AdminNavbar from "../components/AdminDashboard/AdminNavbar";

export default function AdminReportDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const report = state || {};

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <AdminSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminNavbar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Report Details</h1>
            <div>
              <button
                onClick={() => navigate(-1)}
                className="px-3 py-1 rounded border text-sm"
              >
                Back
              </button>
            </div>
          </div>

          {report && report.title ? (
            <div className="space-y-6">
              {/* Main Complaint Details */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4">{report.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Status</p>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      report.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                      report.status === 'In Progress' ? 'bg-orange-100 text-orange-800' :
                      report.status === 'In Review' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {report.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Priority</p>
                    <p className="text-gray-900">{report.priority}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Category</p>
                    <p className="text-gray-900">{report.category}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Location</p>
                    <p className="text-gray-900">{report.location}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Description</p>
                  <p className="text-gray-800 leading-relaxed">{report.description}</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700">Reported by</p>
                  <p className="text-gray-900">{report.reportedBy?.name} ({report.reportedBy?.email})</p>
                </div>
              </div>

              {/* Admin Information Section */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-4 text-blue-800">Admin Information</h3>
                
                {/* Admin Notes */}
                <div className="mb-6">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Admin Notes</p>
                  {report.adminNotes ? (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-gray-800 leading-relaxed">{report.adminNotes}</p>
                    </div>
                  ) : (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-gray-500 italic">No admin notes available</p>
                    </div>
                  )}
                </div>

                {/* Assignment Information */}
                {report.assignedTo && (
                  <div className="mb-6">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Assigned To</p>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-gray-800">
                        <strong>{report.assignedTo.name}</strong>
                        {report.assignedTo.assignedAt && (
                          <span className="text-sm text-gray-600 ml-2">
                            (Assigned on: {new Date(report.assignedTo.assignedAt).toLocaleDateString()})
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                )}

                {/* Resolution Information */}
                {report.resolvedAt && (
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Resolved At</p>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-gray-800">
                        {new Date(report.resolvedAt).toLocaleDateString()} at {new Date(report.resolvedAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                )}

                {/* Timestamps */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <p className="font-semibold">Created</p>
                    <p>{new Date(report.createdAt || report.submittedAt).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Last Updated</p>
                    <p>{new Date(report.updatedAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Photo Section */}
              {report.photo && (
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-4">Complaint Photo</h3>
                  <img
                    src={report.photo}
                    alt="Complaint"
                    className="w-full max-w-md rounded-lg shadow-md"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-600">No report data available. Open the report from the list to view details.</p>
          )}
        </main>
      </div>
    </div>
  );
}
