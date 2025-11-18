import axios from "axios";
import { useEffect, useState } from "react";
import {
  FiArrowLeft,
  FiCamera,
  FiTrash2,
  FiUser
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../../utils/imageUtils";

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
    photo: null,
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
          photo: userData.photo || null,
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

        sessionStorage.setItem("username", userData.name || "User");
        sessionStorage.setItem("city", userData.city || "Unknown");
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile:", err);
        if (err.response?.status === 401) {
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

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, photo: e.target.files[0] }));
    }
  };

  // const handleCheckboxChange = (section, key) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     [section]: { ...prev[section], [key]: !prev[section][key] },
  //   }));
  // };

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
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("city", formData.city);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("bio", formData.bio);
      formDataToSend.append("notifications", JSON.stringify(formData.notifications));
      formDataToSend.append("privacy", JSON.stringify(formData.privacy));
      if (formData.photo) {
        formDataToSend.append("photo", formData.photo);
      }

      const response = await axios.put("http://localhost:5000/api/users/profile", formDataToSend, {
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

  // const handleDeleteAccount = async () => {
  //   if (!window.confirm("Are you sure you want to permanently delete your account?")) return;

  //   const token = getAuthToken();
  //   if (!token) {
  //     navigate("/login");
  //     return;
  //   }

  //   try {
  //     await axios.delete("http://localhost:5000/api/users/profile", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     localStorage.removeItem("token");
  //     sessionStorage.removeItem("token");
  //     alert("Account deleted successfully!");
  //     navigate("/login");
  //   } catch (err) {
  //     console.error("Error deleting account:", err);
  //     setError("Failed to delete account. Please try again.");
  //   }
  // };

  // const handleExportData = async () => {
  //   const token = getAuthToken();
  //   if (!token) {
  //     navigate("/login");
  //     return;
  //   }

  //   try {
  //     const response = await axios.get("http://localhost:5000/api/users/profile/export", {
  //       headers: { Authorization: `Bearer ${token}` },
  //       responseType: "blob",
  //     });
  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", "user_data.json");
  //     document.body.appendChild(link);
  //     link.click();
  //     link.remove();
  //   } catch (err) {
  //     console.error("Error exporting data:", err);
  //     setError("Failed to export data. Please try again.");
  //   }
  // };

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
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white flex items-center justify-center text-2xl font-bold relative overflow-hidden">
            {formData.photo ? (
              <img
                src={typeof formData.photo === 'string' ? getImageUrl(formData.photo) : URL.createObjectURL(formData.photo)}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              formData.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)
            )}
            <FiCamera className="absolute -bottom-1 -right-1 w-4 h-4 text-gray-600" />
          </div>
          <div className="mt-2 w-full flex flex-col items-center">
            <label htmlFor="profile-photo" className="cursor-pointer px-3 py-1 bg-purple-100 text-purple-700 rounded shadow hover:bg-purple-200 transition text-sm">
              Choose Profile Photo
            </label>
            <input
              id="profile-photo"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              style={{ display: 'none' }}
            />
            <span className="text-xs text-gray-500 mt-1">
              {formData.photo && typeof formData.photo !== 'string' ? formData.photo.name : !formData.photo ? 'No file chosen' : ''}
            </span>
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

        

          {/* Danger Zone */}
          {/* <div className="bg-white p-6 rounded-lg shadow space-y-4">
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
          </div> */}
        </div>
      </div>
    </div>
  );
}
