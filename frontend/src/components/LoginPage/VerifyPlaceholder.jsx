import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function VerifyPlaceholder() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const email = sessionStorage.getItem("forgot_email"); // stored in ForgotPassword step

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!code) return setError("Please enter the verification code.");

    setLoading(true);

    try {
      // Call your backend to verify OTP
      const response = await axios.post("http://localhost:5000/api/users/verify-code", {
        email,
        code,
      });

      if (response.data.success) {
        setMessage("Code verified! You can now reset your password.");
        navigate("/login/reset"); // go to reset password page
      } else {
        setError(response.data.message || "Invalid code. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-2">Verify Your Email</h2>
        <p className="text-gray-600 mb-4">
          Enter the verification code sent to{" "}
          <span className="font-semibold">{email}</span>.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-col">
            <label className="font-semibold text-sm mb-1">Verification Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {error && <div className="text-red-600">{error}</div>}
          {message && <div className="text-green-700">{message}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-[#8e2df1] to-[#2ad29f] text-white font-bold disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying..." : "Verify Code"}
          </button>
        </form>
      </div>
    </div>
  );
}
