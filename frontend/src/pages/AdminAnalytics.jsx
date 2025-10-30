import React from "react";
import AdminSidebar from "../components/AdminDashboard/AdminSidebar";
import AdminNavbar from "../components/AdminDashboard/AdminNavbar";
import Analytics from "../components/Dashboard/Analytics";

export default function AdminAnalytics() {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <AdminSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminNavbar />
        <main className="flex-1 overflow-y-auto p-6">
          
          <Analytics />
        </main>
      </div>
    </div>
  );
}
