import React from "react";
import AdminSidebar from "../components/AdminDashboard/AdminSidebar";
import AdminNavbar from "../components/AdminDashboard/AdminNavbar";

export default function AdminDepartments() {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <AdminSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminNavbar />
        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="text-2xl font-bold mb-4">Departments</h1>
          <p className="text-gray-600">Department management UI will appear here.</p>
        </main>
      </div>
    </div>
  );
}
