import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FiFilter,
  FiUserPlus,
  FiShield,
  FiUsers,
  FiUserCheck,
  FiUserX,
  FiEdit3,
  FiTrash2,
  FiX,
} from "react-icons/fi";


import AdminSidebar from "./AdminSidebar";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

export default function AdminUserManagement() {
  const [users, setUsers] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState("");
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, user: null });

  const navigate = useNavigate();
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  const fetchUsers = async () => {
    if (!token) {
      setError("Unauthorized. Please login as admin.");
      navigate("/login");
      return;
    }

    try {
      const { data } = await axiosInstance.get("/users/admin/users");
      setUsers(Array.isArray(data) ? data : data.users || []);
      sessionStorage.setItem("userlength", data.length);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 403) {
        setError("Unauthorized. Please login as admin.");
        navigate("/login");
      } else {
        setError("Failed to fetch users.");
      }
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openDialog = (user) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedUser(null);
  };

  // Open custom confirm modal
  const openConfirmModal = (user) => {
    setConfirmModal({ isOpen: true, user });
  };

  const closeConfirmModal = () => {
    setConfirmModal({ isOpen: false, user: null });
  };

 const handleDeleteUser = async () => {
  const user = confirmModal.user;
  if (!user) return;

  try {
    await axiosInstance.delete(`/users/admin/${user._id || user.id}`);

    // Refetch users from backend to reload table
    fetchUsers();
  } catch (error) {
    console.error("Delete user error:", error);
  } finally {
    closeConfirmModal();
  }
};

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1 overflow-y-auto">
        <AdminNavbar/>
        <div className="space-y-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-zinc-900">User Management</h2>
              <p className="text-zinc-600">Manage users</p>
            </div>
            {/* <div className="flex gap-3">
              <button className="flex items-center gap-2 border rounded-lg px-4 py-2 text-zinc-700 hover:bg-zinc-100">
                <FiFilter size={16} /> Filter
              </button>
              <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-4 py-2">
                <FiUserPlus size={16} /> Add User
              </button>
            </div> */}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border">
              <FiUsers className="text-purple-600" size={28} />
              <div>
                <p className="text-sm text-zinc-600">Total Users</p>
                <p className="text-lg font-semibold text-zinc-900">{users.length}</p>
              </div>
            </div>
            {/* <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border">
              <FiUserCheck className="text-green-600" size={28} />
              <div>
                <p className="text-sm text-zinc-600">Active Users</p>
                <p className="text-lg font-semibold text-zinc-900">
                  {users.filter((u) => u.status === "Active").length}
                </p>
              </div>
            </div> */}
            {/* <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border">
              <FiUserX className="text-red-500" size={28} />
              <div>
                <p className="text-sm text-zinc-600">Inactive Users</p>
                <p className="text-lg font-semibold text-zinc-900">
                  {users.filter((u) => u.status !== "Active").length}
                </p>
              </div>
            </div> */}
            {/* <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border">
              <FiShield className="text-blue-600" size={28} />
              <div>
                <p className="text-sm text-zinc-600">Authorities</p>
                <p className="text-lg font-semibold text-zinc-900">
                  {users.filter((u) => u.role === "Authority").length}
                </p>
              </div>
            </div> */}
          </div>

          {/* User Table */}
          {error && <div className="text-red-500 font-semibold mb-2">{error}</div>}
          <div className="overflow-x-auto bg-white border rounded-xl shadow-sm">
            <table className="min-w-full text-sm">
              <thead className="bg-zinc-100 text-zinc-700 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Reported complaints</th>
                  <th className="px-6 py-3 text-left">Location</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-zinc-100">
                {Array.isArray(users) &&
                  users.map((user) => (
                    <tr
                      key={user._id || user.id}
                      className="hover:bg-zinc-50 transition-colors"
                    >
                      <td className="px-6 py-3 font-medium text-zinc-900">{user.name}</td>
                      <td className="px-6 py-3 text-zinc-600">{user.email}</td>
                      <td className="px-6 py-3 text-zinc-600">{user.complaintCount}</td>
                      <td className="px-6 py-3 text-zinc-600">{user.city}</td>
                      <td className="px-6 py-3 text-right flex justify-end gap-2">
                        <button
                          onClick={() => openDialog(user)}
                          className="p-2 rounded-md hover:bg-zinc-100 text-zinc-700"
                        >
                          <FiEdit3 size={16} />
                        </button>
                        <button
                          onClick={() => openConfirmModal(user)}
                          className="p-2 rounded-md hover:bg-red-50 text-red-600"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Edit Dialog */}
          {isDialogOpen && selectedUser && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-xl shadow-lg w-96 relative">
                <button
                  onClick={closeDialog}
                  className="absolute top-3 right-3 text-zinc-600 hover:text-zinc-800"
                >
                  <FiX size={18} />
                </button>
                <h3 className="text-lg font-semibold text-zinc-900 mb-4">Edit User</h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-zinc-700 mb-1">Name</label>
                    <input
                      type="text"
                      defaultValue={selectedUser.name}
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-700 mb-1">Email</label>
                    <input
                      type="email"
                      defaultValue={selectedUser.email}
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-3">
                    <button
                      onClick={closeDialog}
                      className="px-4 py-2 border rounded-lg text-zinc-700 hover:bg-zinc-100"
                    >
                      Cancel
                    </button>
                    <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Custom Confirm Modal */}
          {confirmModal.isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">
                <h3 className="text-lg font-semibold text-zinc-900 mb-4">
                  Delete User
                </h3>
                <p className="text-zinc-600 mb-6">
                  Are you sure you want to delete <strong>{confirmModal.user.name}</strong>?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={closeConfirmModal}
                    className="px-4 py-2 border rounded-lg text-zinc-700 hover:bg-zinc-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteUser}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )} 
        </div>
      </div>
    </div>
  );
}
