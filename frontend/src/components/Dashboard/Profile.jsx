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

  // ✅ Fetch user profile dynamically with current token
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = response.data;

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
          setError("Authentication failed. Please login again.");
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          setError("Failed to load profile data. Please try again.");
        }
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (section, key) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [key]: !formData[section][key],
      },
    });
  };

  // ✅ Save updated profile
  const handleSubmit = async () => {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

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

      const updatedUser = response.data;
      setSuccess("Profile updated successfully!");

      if (updatedUser) {
        setFormData((prev) => ({
          ...prev,
          name: updatedUser.name || prev.name,
          phone: updatedUser.phone || prev.phone,
          city: updatedUser.city || prev.city,
          address: updatedUser.address || prev.address,
          bio: updatedUser.bio || prev.bio,
          notifications: updatedUser.notifications || prev.notifications,
          privacy: updatedUser.privacy || prev.privacy,
        }));
      }

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error updating profile:", err);
      if (err.response?.status === 401) {
        setError("Authentication failed. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setError(err.response?.data?.message || "Failed to update profile. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  };

  // ✅ Delete account
  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to permanently delete your account?")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      await axios.delete("http://localhost:5000/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.removeItem("token");
      alert("Account deleted successfully!");
      navigate("/login");
    } catch (err) {
      console.error("Error deleting account:", err);
      setError("Failed to delete account. Please try again.");
    }
  };

  // ✅ Export user data
  const handleExportData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div
          onClick={() => navigate("/dashboard")}
          className="flex items-center text-sm text-gray-600 gap-2 cursor-pointer hover:text-purple-600 transition"
        >
          <FiArrowLeft className="text-gray-500" />
          <span>Back to Dashboard</span>
          <span className="text-gray-400">/</span>
          <span className="font-semibold text-gray-700">Profile Settings</span>
        </div>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className={`px-4 py-2 text-white rounded-md shadow transition ${
            saving ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* Error/Success Messages */}
      {error && (
        <div className="max-w-6xl mx-auto mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          {error}
        </div>
      )}
      {success && (
        <div className="max-w-6xl mx-auto mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
          {success}
        </div>
      )}

      {/* Main Layout */}
      <div className="max-w-6xl mx-auto flex gap-6">
        {/* Sidebar */}
        <div className="w-1/4 bg-white shadow rounded-2xl p-6 self-start">
          <div className="flex flex-col items-center relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white flex items-center justify-center text-2xl font-bold relative">
              {formData.name
                ? formData.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)
                : "U"}
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow cursor-pointer">
                <FiCamera className="text-gray-600 w-4 h-4" />
              </div>
            </div>
            <h2 className="mt-4 font-semibold text-gray-800 text-lg">{formData.name}</h2>
            <p className="text-sm text-gray-500">{formData.email}</p>
            <span className="mt-2 px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-md">
              Active Member
            </span>
          </div>

          <div className="mt-6 space-y-2 text-sm text-gray-600">
            <p className="flex items-center gap-2">
              <FiMapPin className="text-gray-500" /> {formData.city}
            </p>
            <p className="flex items-center gap-2">
              <FiShield className="text-gray-500" /> Verified Account
            </p>
          </div>

          <hr className="my-6 border-gray-200" />

          <div>
            <h3 className="text-sm font-semibold text-gray-800">Community Stats</h3>
            <div className="flex justify-around mt-4">
              <div className="text-center">
                <p className="text-purple-600 text-xl font-bold">6</p>
                <p className="text-gray-500 text-sm">Reports</p>
              </div>
              <div className="text-center">
                <p className="text-green-600 text-xl font-bold">2</p>
                <p className="text-gray-500 text-sm">Resolved</p>
              </div>
            </div>
          </div>

          <hr className="my-6 border-gray-200" />

          <div>
            <h3 className="text-sm font-semibold text-gray-800">Report Types</h3>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center shadow-sm hover:shadow-md cursor-pointer">
                <FiFileText className="text-blue-500 text-xl" />
                <span className="text-xs mt-2 font-medium">General</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center shadow-sm hover:shadow-md cursor-pointer">
                <FiAlertTriangle className="text-red-500 text-xl" />
                <span className="text-xs mt-2 font-medium">Potholes</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center shadow-sm hover:shadow-md cursor-pointer">
                <FiZap className="text-yellow-500 text-xl" />
                <span className="text-xs mt-2 font-medium">Lighting</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center shadow-sm hover:shadow-md cursor-pointer">
                <FiDroplet className="text-blue-600 text-xl" />
                <span className="text-xs mt-2 font-medium">Water</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-10">
          {/* Personal Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="flex items-center gap-2 font-semibold text-gray-800 text-lg">
              <FiUser /> Personal Information
            </h3>
            <div className="grid grid-cols-2 gap-8 mt-4">
              {[
                { name: "name", label: "Full Name", type: "text" },
                { name: "email", label: "Email Address", type: "email", disabled: true },
                { name: "phone", label: "Phone Number", type: "text" },
                { name: "city", label: "City", type: "text" },
              ].map(({ name, label, type, disabled }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-600 text-left">{label}</label>
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    disabled={disabled}
                    className={`w-full border rounded p-2 mt-1 focus:ring-2 focus:ring-purple-500 ${
                      disabled ? "bg-gray-200 cursor-not-allowed" : "bg-gray-100"
                    }`}
                  />
                </div>
              ))}

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-600 text-left">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border rounded p-2 mt-1 bg-gray-100 focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-600 text-left">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full border rounded p-2 mt-1 bg-gray-100 focus:ring-2 focus:ring-purple-500"
                  rows="3"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="flex items-center gap-2 font-semibold text-gray-700 text-lg">
              <FiBell className="text-purple-600" /> Notification Preferences
            </h3>
            <div className="mt-4 space-y-6">
              {[
                {
                  key: "emailUpdates",
                  label: "Email Updates",
                  description: "Receive important updates and announcements via email.",
                },
                {
                  key: "smsAlerts",
                  label: "SMS Alerts",
                  description: "Get urgent alerts and notifications directly on your phone.",
                },
                {
                  key: "pushNotifications",
                  label: "Push Notifications",
                  description: "Allow push notifications on your device for real-time updates.",
                },
                {
                  key: "weeklyDigest",
                  label: "Weekly Digest",
                  description: "Get a weekly summary of activities and updates.",
                },
              ].map(({ key, label, description }) => (
                <div key={key} className="flex items-center justify-between p-4 border rounded-md bg-gray-50">
                  <div className="text-left space-y-2">
                    <p className="font-medium">{label}</p>
                    <p className="text-sm text-gray-500">{description}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.notifications[key]}
                    onChange={() => handleCheckboxChange("notifications", key)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="flex items-center gap-2 font-semibold text-gray-700 text-lg">
              <FiLock className="text-purple-600" /> Privacy & Security
            </h3>
            <div className="mt-4 space-y-5">
              <div className="flex items-center justify-between p-4 border rounded-md bg-gray-50">
                <div className="space-y-2">
                  <p className="font-medium text-left">Profile Visibility</p>
                  <p className="text-sm text-gray-500">Control who can see your profile information</p>
                </div>
                <select
                  value={formData.privacy.visibility}
                  onChange={(e) =>
                    setFormData({ ...formData, privacy: { ...formData.privacy, visibility: e.target.value } })
                  }
                  className="border rounded p-2 text-sm bg-gray-100 focus:ring-2 focus:ring-purple-500"
                >
                  <option>Public</option>
                  <option>Private</option>
                  <option>Friends Only</option>
                </select>
              </div>

              {["showLocation", "showReports", "allowContact"].map((key) => (
                <div key={key} className="flex items-center justify-between p-4 border rounded-md bg-gray-50 text-left">
                  <div className="space-y-2">
                    <p className="font-medium">
                      {key === "showLocation"
                        ? "Show Location"
                        : key === "showReports"
                        ? "Show Reports"
                        : "Allow Contact"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {key === "showLocation"
                        ? "Display your general location to other users"
                        : key === "showReports"
                        ? "Allow others to see your public reports"
                        : "Let community members contact you directly"}
                    </p>
                  </div>
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
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="flex items-center gap-2 font-semibold text-red-600 text-lg">
              <FiTrash2 /> Danger Zone
            </h3>
            <div className="mt-4 space-y-5 text-left">
              <div className="flex items-center justify-between p-4 border rounded-md bg-red-50">
                <div className="space-y-2">
                  <p className="font-medium text-red-700">Delete Account</p>
                  <p className="text-sm text-red-500">Permanently delete your account and all associated data</p>
                </div>
                <button onClick={handleDeleteAccount} className="bg-red-600 text-white px-3 py-1 rounded">
                  Delete Account
                </button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-md bg-yellow-50">
                <div>
                  <p className="font-medium text-yellow-700">Export Data</p>
                  <p className="text-sm text-yellow-600">Download a copy of all your data</p>
                </div>
                <button onClick={handleExportData} className="bg-yellow-500 text-white px-3 py-1 rounded">
                  Export Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
