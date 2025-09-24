import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/urbanalive.jpg";

export default function ForgotPlaceholder() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).toLowerCase());

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!validateEmail(email)) return setError("Please enter a valid email address.");

    setLoading(true);
    try {
      // Replace with your actual backend endpoint
      const response = await axios.post("http://localhost:5000/api/users/forgot-password", { email });
      setLoading(false);
      setMessage(response.data?.message || `A verification code was sent to ${email}.`);
      sessionStorage.setItem("forgot_email", email);
      navigate("/login/verify");
    } catch (err) {
      setLoading(false);
      setError(
        err.response?.data?.message || "Failed to send verification code. Please try again."
      );
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* LEFT purple panel */}
      <div className="flex-1 md:flex-[1.05] bg-gradient-to-b from-[#6e21f2] via-[#b81fe7] to-[#8421b7] text-white p-12 flex items-center">
        <div className="max-w-xl w-full">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-14 h-14 rounded-lg bg-white/10 flex items-center justify-center">
              <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
            </div>
            <div>
              <div className="font-bold text-lg">UrbanAlive</div>
              <div className="text-[13px] opacity-95 -mt-1">Your Community Platform</div>
            </div>
          </div>
          <h1 className="text-4xl font-semibold leading-tight mb-4">Reset Your Password</h1>
          <p className="text-sm max-w-md opacity-90 leading-relaxed">
            Enter your email and we'll send you a code to reset your password.
          </p>
        </div>
      </div>

      {/* RIGHT white form */}
      <div className="flex-1 md:flex-[0.7] bg-white flex items-center justify-center p-14">
        <div className="w-full max-w-md">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-700 text-sm mb-2 hover:underline"
          >
            ← Back to Login
          </button>

          <h2 className="text-2xl font-bold mb-2">Forgot Password?</h2>
          <p className="text-gray-600 mb-4">
            Enter your email to receive a verification code.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex flex-col">
              <label className="font-semibold text-sm mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              {loading ? "Sending..." : "Send Verification Code"}
            </button>
          </form>

          <div className="mt-4 text-sm text-gray-600">
            Remember your password?{" "}
            <Link to="/login/" className="text-purple-600 font-bold">
              Sign In →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
