import axios from "axios"; // ✅ import axios
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/urbanalive.jpg";

export default function SignupPlaceholder() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateEmail = (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).toLowerCase());
  const validatePhone = (p) => /^[0-9\-\+\s]{7,15}$/.test(p);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic validation
    if (!fullName.trim()) return setError("Please enter your full name.");
    if (!validateEmail(email)) return setError("Please enter a valid email.");
    if (!validatePhone(phone)) return setError("Please enter a valid phone number.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    if (password !== confirm) return setError("Passwords do not match.");
    if (!agree) return setError("You must agree to the Terms and Privacy Policy.");

    setLoading(true);

    try {
      // ✅ Call backend API
      const res = await axios.post("http://localhost:5000/api/users/register", {
        name: fullName,
        email,
        phone,
        password,
      });

      // Assuming backend returns { token, user }
      const { token, user } = res.data;

      // Store token & user in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setLoading(false);
      setSuccess("Account created successfully! Redirecting...");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // backend error message
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* LEFT panel */}
      <div className="flex-1 md:flex-[1.05] bg-gradient-to-b from-[#6e21f2] via-[#b81fe7] to-[#8421b7] text-white p-12 flex items-center">
        <div className="max-w-xl w-full">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-lg bg-white/10 flex items-center justify-center">
              <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
            </div>
            <div>
              <div className="font-bold text-lg">UrbanAlive</div>
              <div className="text-[13px] opacity-95 -mt-1">Civic Engagement Platform</div>
            </div>
          </div>
          <h1 className="text-4xl font-semibold leading-tight mb-4">
            Join Our Community of Change Makers
          </h1>
          <p className="text-sm max-w-md opacity-90 leading-relaxed">
            Be part of the solution. Report issues, track progress, and help make
            your neighborhood a better place for everyone.
          </p>
        </div>
      </div>

      {/* RIGHT panel */}
      <div className="flex-1 md:flex-[0.7] bg-white flex items-center justify-center p-14">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-1">Create Your Account</h2>
          <p className="text-gray-600 mb-4 text-sm">Join the civic engagement platform</p>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Full Name */}
            <div className="flex flex-col">
              <label className="font-semibold text-sm mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="font-semibold text-sm mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col">
              <label className="font-semibold text-sm mb-1">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label className="font-semibold text-sm mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col">
              <label className="font-semibold text-sm mb-1">Confirm Password</label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="h-4 w-4"
              />
              <span>I agree to the Terms & Privacy Policy</span>
            </div>

            {/* Error / Success */}
            {error && <div className="text-red-600 text-sm">{error}</div>}
            {success && <div className="text-green-700 text-sm">{success}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-[#8e2df1] to-[#2ad29f] text-white font-bold disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-4 text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login/" className="text-purple-600 font-bold">
              Sign In →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
