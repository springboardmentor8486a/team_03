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
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">{report.title}</h2>
              <p className="text-gray-600 mb-4">{report.description}</p>
              <p className="text-sm text-gray-500">Location: {report.location}</p>
              <p className="text-sm text-gray-500">Status: {report.status}</p>
            </div>
          ) : (
            <p className="text-gray-600">No report data available. Open the report from the list to view details.</p>
          )}
        </main>
      </div>
    </div>
  );
}
