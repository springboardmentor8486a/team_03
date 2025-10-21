import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../../assets/urbanalive.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ResetPassword() {
  const { token } = useParams(); // token from URL
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!token) return setError("Invalid reset link");
    if (password.length < 6) return setError("Password must be at least 6 characters");
    if (password !== confirmPassword) return setError("Passwords do not match");

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/users/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to reset password");
        setLoading(false);
        return;
      }

      setSuccess("Password reset successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* LEFT gradient section */}
      <div className="hidden lg:flex flex-[1.05] bg-gradient-to-b from-[#6e21f2] via-[#b81fe7] to-[#8421b7] text-white p-12 items-center">
        <div className="max-w-[620px] w-full">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center">
              <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
            </div>
            <div>
              <div className="font-bold text-lg">UrbanAlive</div>
              <div className="text-sm opacity-90 -mt-1">Secure and Smart</div>
            </div>
          </div>
          <h1 className="text-4xl font-semibold leading-tight mb-4">Reset Your Password</h1>
          <p className="text-[15px] opacity-95 leading-relaxed max-w-[520px]">
            Enter your new password to regain access to your account securely.
          </p>
        </div>
      </div>

      {/* RIGHT form section */}
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
            {/* NEW PASSWORD */}
            <label className="block font-semibold mb-2 text-sm">New Password</label>
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 text-sm outline-none focus:ring-2 focus:ring-purple-500 pr-10"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* CONFIRM PASSWORD */}
            <label className="block font-semibold mb-2 text-sm">Confirm Password</label>
            <div className="relative mb-4">
              <input
                type={showConfirm ? "text" : "password"}
                className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 text-sm outline-none focus:ring-2 focus:ring-purple-500 pr-10"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {error && <div className="text-red-600 mb-3 text-sm">{error}</div>}
            {success && <div className="text-green-600 mb-3 text-sm">{success}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-green-400 text-white font-semibold text-sm hover:opacity-90 transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          <p className="mt-4 text-gray-600 text-sm text-center">
            Remembered your password?{" "}
            <a href="/login" className="text-purple-600 font-semibold hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
