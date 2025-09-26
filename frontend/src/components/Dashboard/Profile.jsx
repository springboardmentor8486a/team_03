import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FiArrowLeft,
  FiUser,
  FiPhone,
  FiMapPin,
  FiBell,
  FiShield,
  FiCamera,
  FiFileText,
  FiAlertTriangle,
  FiZap,
  FiDroplet,
  FiLock,
  FiTrash2,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    bio: "",
    notifications: {
      emailUpdates: true,
      smsAlerts: false,
      pushNotifications: true,
      weeklyDigest: true,
    },
    privacy: {
      visibility: "Public",
      showLocation: true,
      showReports: true,
      allowContact: true,
    },
  });

  // Helper: get token
  const getAuthToken = () => {
    return localStorage.getItem("token") || sessionStorage.getItem("token") || null;
  };

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = getAuthToken();
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = response.data?.data ?? response.data;

        setFormData({
          name: userData.name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          city: userData.city || "",
          address: userData.address || "",
          bio: userData.bio || "",
          notifications: {
            emailUpdates: userData.notifications?.emailUpdates ?? true,
            smsAlerts: userData.notifications?.smsAlerts ?? false,
            pushNotifications: userData.notifications?.pushNotifications ?? true,
            weeklyDigest: userData.notifications?.weeklyDigest ?? true,
          },
          privacy: {
            visibility: userData.privacy?.visibility || "Public",
            showLocation: userData.privacy?.showLocation ?? true,
            showReports: userData.privacy?.showReports ?? true,
            allowContact: userData.privacy?.allowContact ?? true,
          },
        });

        localStorage.setItem("username", userData.name || "User");
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          sessionStorage.removeItem("token");
          navigate("/login");
        } else {
          setError("Failed to load profile data. Please try again.");
          setLoading(false);
        }
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (section, key) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: !prev[section][key] },
    }));
  };

  const handleSubmit = async () => {
    setSaving(true);
    setError("");
    setSuccess("");

    const token = getAuthToken();
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const updateData = {
        name: formData.name,
        phone: formData.phone,
        city: formData.city,
        address: formData.address,
        bio: formData.bio,
        notifications: formData.notifications,
        privacy: formData.privacy,
      };

      const response = await axios.put("http://localhost:5000/api/users/profile", updateData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedUser = response.data?.data ?? response.data;

      setSuccess("Profile updated successfully!");
      if (updatedUser) setFormData((prev) => ({ ...prev, ...updatedUser }));
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error updating profile:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setError(err.response?.data?.message || "Failed to update profile. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to permanently delete your account?")) return;

    const token = getAuthToken();
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await axios.delete("http://localhost:5000/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      alert("Account deleted successfully!");
      navigate("/login");
    } catch (err) {
      console.error("Error deleting account:", err);
      setError("Failed to delete account. Please try again.");
    }
  };

  const handleExportData = async () => {
    const token = getAuthToken();
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/api/users/profile/export", {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "user_data.json");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Error exporting data:", err);
      setError("Failed to export data. Please try again.");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div
          onClick={() => navigate("/dashboard")}
          className="flex items-center text-sm text-gray-600 gap-2 cursor-pointer hover:text-purple-600 transition"
        >
          <FiArrowLeft /> Back to Dashboard
        </div>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className={`px-4 py-2 rounded-md shadow text-white transition ${
            saving ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* Error/Success */}
      {error && <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>}
      {success && <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">{success}</div>}

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full lg:w-1/4 bg-white shadow rounded-2xl p-6 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white flex items-center justify-center text-2xl font-bold relative">
            {formData.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)}
            <FiCamera className="absolute -bottom-1 -right-1 w-4 h-4 text-gray-600" />
          </div>
          <h2 className="mt-4 font-semibold text-gray-800 text-lg">{formData.name}</h2>
          <p className="text-sm text-gray-500">{formData.email}</p>
          <span className="mt-2 px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-md">
            Active Member
          </span>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-10">
          {/* Personal Info */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="flex items-center gap-2 text-gray-800 font-semibold text-lg">
              <FiUser /> Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {["name", "email", "phone", "city"].map((field) => (
                <div key={field}>
                  <label className="block text-sm text-gray-600 mb-1">{field === "name" ? "Full Name" : field === "email" ? "Email" : field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    value={formData[field]}
                    disabled={field === "email"}
                    onChange={handleChange}
                    className={`w-full border rounded p-2 bg-gray-100 ${field === "email" ? "cursor-not-allowed" : ""}`}
                  />
                </div>
              ))}
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-600 mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border rounded p-2 bg-gray-100"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-600 mb-1">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows="3"
                  className="w-full border rounded p-2 bg-gray-100"
                />
              </div>
            </div>
          </div>

        {/* Notifications & Privacy */}
          <div className="bg-white p-6 rounded-lg shadow space-y-6">
            <h3 className="flex items-center gap-2 font-semibold text-gray-800 text-lg">
              <FiBell /> Notification Preferences
            </h3>
            <div className="space-y-4">
              {Object.entries(formData.notifications).map(([key, value]) => (
                <div key={key} className="flex justify-between p-4 bg-gray-50 border rounded-md">
                  <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => handleCheckboxChange("notifications", key)}
                  />
                </div>
              ))}
            </div>

            <h3 className="flex items-center gap-2 font-semibold text-gray-800 text-lg mt-6">
              <FiLock /> Privacy Settings
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between p-4 bg-gray-50 border rounded-md">
                <span>Profile Visibility</span>
                <select
                  value={formData.privacy.visibility}
                  onChange={(e) =>
                    setFormData({ ...formData, privacy: { ...formData.privacy, visibility: e.target.value } })
                  }
                  className="border rounded p-1 bg-gray-100"
                >
                  <option>Public</option>
                  <option>Private</option>
                  <option>Friends Only</option>
                </select>
              </div>

              {["showLocation", "showReports", "allowContact"].map((key) => (
                <div key={key} className="flex justify-between p-4 bg-gray-50 border rounded-md">
                  <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                  <input
                    type="checkbox"
                    checked={formData.privacy[key]}
                    onChange={() => handleCheckboxChange("privacy", key)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white p-6 rounded-lg shadow space-y-4">
            <h3 className="flex items-center gap-2 text-red-600 font-semibold text-lg">
              <FiTrash2 /> Danger Zone
            </h3>
            <div className="flex justify-between p-4 bg-red-50 border rounded-md">
              <span>Delete Account</span>
              <button onClick={handleDeleteAccount} className="px-3 py-1 bg-red-600 text-white rounded">
                Delete
              </button>
            </div>

            <div className="flex justify-between p-4 bg-yellow-50 border rounded-md">
              <span>Export Data</span>
              <button onClick={handleExportData} className="px-3 py-1 bg-yellow-500 text-white rounded">
                Export
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
