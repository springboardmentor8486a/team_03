import { useState } from "react";
import { FiLock, FiCheckCircle, FiShield, FiUsers } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirm) {
      setMessage("Passwords do not match");
      return;
    }

    // TODO: Call your backend API for resetting password
    console.log("Resetting password:", password);

    setMessage("Password reset successfully! Redirecting...");
    setTimeout(() => navigate("/LoginPage/LoginPage"), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side */}
      <div className="flex-1 bg-gradient-to-br from-purple-600 to-pink-500 text-white flex flex-col justify-center px-10 py-12">
        <div className="max-w-lg">
          <h1 className="text-4xl font-bold leading-tight mb-4">
            Reset Your Password Securely
          </h1>
          <p className="text-lg mb-6 opacity-90">
            Create a strong new password to protect your account and continue
            engaging with your community safely.
          </p>

          <ul className="space-y-4">
            <li className="flex items-center space-x-3">
              <FiShield className="text-2xl" />
              <span>Enhanced security with encrypted storage</span>
            </li>
            <li className="flex items-center space-x-3">
              <FiCheckCircle className="text-2xl" />
              <span>Quick and easy password reset process</span>
            </li>
            <li className="flex items-center space-x-3">
              <FiUsers className="text-2xl" />
              <span>Trusted by thousands of community members</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Right side */}
      <div className="flex-1 flex items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Create New Password
          </h2>
          <p className="text-gray-500 mb-6">
            Enter and confirm your new password to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="flex items-center mt-2 border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-purple-500">
                <FiLock className="text-gray-400 mr-2" />
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="flex items-center mt-2 border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-purple-500">
                <FiLock className="text-gray-400 mr-2" />
                <input
                  type="password"
                  placeholder="Re-enter password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="w-full outline-none"
                  required
                />
              </div>
            </div>

            {message && (
              <p className="text-sm text-center text-purple-600">{message}</p>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Reset Password
            </button>

            <p className="text-sm text-gray-500 text-center">
              Remembered your password?{" "}
              <span
                onClick={() => navigate("/LoginPage/LoginPage")}
                className="text-purple-600 font-medium hover:underline cursor-pointer"
              >
                Back to Login
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
