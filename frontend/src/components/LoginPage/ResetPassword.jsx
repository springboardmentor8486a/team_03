import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/urbanalive.jpg";
export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const email = ""; // Replace with actual email
      const requestId = ""; // Replace with actual requestId

      const response = await fetch("http://localhost:5000/api/users/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, requestId, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to reset password.");
        return;
      }

      setSuccess("Password reset successful! Redirecting to login...");
      setTimeout(() => navigate("/"), 1500);
    } catch {
      setError("Network error, please try again.");
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* LEFT gradient section (hidden on small screens) */}
      <div className="hidden lg:flex flex-[1.05] bg-gradient-to-b from-[#6e21f2] via-[#b81fe7] to-[#8421b7] text-white p-12 items-center">
        <div className="max-w-[620px] w-full">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center">
              <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
            </div>
            <div>
              <div className="font-bold text-lg">YourApp</div>
              <div className="text-sm opacity-90 -mt-1">Secure and Smart</div>
            </div>
          </div>
          <h1 className="text-4xl font-semibold leading-tight mb-4">Reset Your Password</h1>
          <p className="text-[15px] opacity-95 leading-relaxed max-w-[520px]">
            Update your account password to continue accessing your dashboard securely.
          </p>
        </div>
      </div>

      {/* ✅ RIGHT form section (now always fills available space) */}
      <div className="flex flex-col flex-1 bg-white items-center justify-center p-6 sm:p-10 lg:p-14 w-full min-h-screen">
        <div className="w-full max-w-md">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-gray-600 text-sm mb-2 hover:underline"
          >
            ← Back
          </button>

          <h2 className="text-2xl font-bold mb-2">Reset Your Password</h2>
          <p className="text-gray-600 mb-6">Enter and confirm your new password below.</p>

          <form onSubmit={handleSubmit}>
            <label className="block font-semibold mb-2 text-sm">New Password</label>
            <div className="relative mb-4">
              <input
                type="password"
                className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 text-sm outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <label className="block font-semibold mb-2 text-sm">Confirm Password</label>
            <div className="relative mb-4">
              <input
                type="password"
                className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 text-sm outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {error && <div className="text-red-600 mb-3 text-sm">{error}</div>}
            {success && <div className="text-green-600 mb-3 text-sm">{success}</div>}

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-green-400 text-white font-semibold text-sm hover:opacity-90 transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Reset Password
            </button>
          </form>

          <p className="mt-4 text-gray-600 text-sm text-center">
            Remembered your password?{" "}
            <a href="/" className="text-purple-600 font-semibold hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
