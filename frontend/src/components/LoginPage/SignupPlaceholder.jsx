import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/urbanalive.jpg";
import "../../styles/signuppage.css";

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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const validateEmail = (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).toLowerCase());
  const validatePhone = (p) => /^[0-9\-+\s]{7,15}$/.test(p);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!fullName.trim()) return setError("Please enter your full name.");
    if (!validateEmail(email)) return setError("Please enter a valid email.");
    if (!validatePhone(phone)) return setError("Please enter a valid phone number.");
    if (password.length < 6)
      return setError("Password must be at least 6 characters.");
    if (password !== confirm) return setError("Passwords do not match.");
    if (!agree)
      return setError("You must agree to the Terms of Service and Privacy Policy.");

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          email,
          phone,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setLoading(false);
        setSuccess("Account created successfully! Redirecting...");
        setTimeout(() => navigate("/login"), 900);
      } else {
        setLoading(false);
        setError(data.message || "Registration failed");
      }
    } catch (error) {
      setLoading(false);
      setError("Network error. Please try again.",error);
    }
  };

  return (
    <div className="signup-container">
      {/* LEFT */}
      <div className="signup-left">
        <div className="signup-left-inner">
          <div className="brand-row">
            <div className="brand-logo">
              <img src={logo} alt="logo" />
            </div>
            <div className="brand-text">
              <div className="brand-title">UrbanAlive</div>
              <div className="brand-sub">Civic Engagement Platform</div>
            </div>
          </div>

          <h1 className="signup-heading">Join Our Community of Change Makers</h1>

          <p className="signup-desc">
            Be part of the solution. Report issues, track progress, and help make
            your neighborhood a better place for everyone.
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="signup-right">
        <div className="signup-card">
          <h2>Create Your Account</h2>
          <p className="small-sub">Join the civic engagement platform</p>

          <form className="signup-form" onSubmit={handleSubmit}>
            <label className="label">Full Name</label>
            <div className="input-with-icon">
              <span className="input-icon">👤</span>
              <input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <label className="label">Email Address</label>
            <div className="input-with-icon">
              <span className="input-icon">✉️</span>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <label className="label">Phone Number</label>
            <div className="input-with-icon">
              <span className="input-icon">📞</span>
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* PASSWORD FIELD */}
            <label className="label">Password</label>
            <div className="input-with-icon password-field">
              <span className="input-icon">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer" }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* CONFIRM PASSWORD FIELD */}
            <label className="label">Confirm Password</label>
            <div className="input-with-icon password-field">
              <span className="input-icon">🔒</span>
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
              <span
                className="eye-icon"
                onClick={() => setShowConfirm(!showConfirm)}
                style={{ cursor: "pointer" }}
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="agree-row">
              <label className="agree">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                />
                <span>I agree to the</span>
              </label>
              <div className="links">
                <a href="/">Terms of Service</a> <span>and</span>{" "}
                <a href="/">Privacy Policy</a>
              </div>
            </div>

            {error && <div className="form-error">{error}</div>}
            {success && <div className="form-success">{success}</div>}

            <button className="create-btn" type="submit" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div className="signin-link">
            Already have an account? <Link to="/login">Sign In →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
