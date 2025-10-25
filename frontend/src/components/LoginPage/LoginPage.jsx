import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/loginpage.css";
import logo from "../../assets/urbanalive.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // 👈 imported react-icons

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 👁 state toggle
  const navigate = useNavigate();

  const validateEmail = (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).toLowerCase());

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) return setError("Please enter a valid email.");
    if (password.length < 6)
      return setError("Password must be at least 6 characters.");

    setLoading(true);

    try {
      localStorage.clear();
      sessionStorage.clear();

      const res = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      const user = res.data.user || res.data;
      const token = res.data.token || user.token;

      if (remember) {
        localStorage.setItem("token", token);
        localStorage.setItem("_id", user._id);
        localStorage.setItem("role", user.role);
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("_id", user._id);
        sessionStorage.setItem("role", user.role);
        sessionStorage.setItem("user", JSON.stringify(user));
      }

      setLoading(false);
      if (user.role === "admin") navigate("/admin/dashboard");
      else navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setLoading(false);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="signin-container">
      {/* LEFT SIDE */}
      <div className="signin-left">
        <div className="left-inner">
          <div className="logo-block">
            <div className="logo-wrap">
              <img src={logo} alt="Logo" className="logo-img" />
            </div>
            <div className="brand">
              <div className="brand-title">UrbanAlive</div>
              <div className="brand-sub">Civic Engagement Platform</div>
            </div>
          </div>

          <h1 className="left-heading">
            Building Better Communities <br /> Together
          </h1>

          <p className="left-desc">
            Report civic issues, track their progress, and collaborate with your
            local government to create positive change in your neighborhood.
          </p>

          <div className="left-features">
            <div className="feature">
              <div className="f-icon">✔</div>
              <div>
                <div className="f-title">Easy Reporting</div>
                <div className="f-sub">
                  Submit issues with photos and location data
                </div>
              </div>
            </div>

            <div className="feature">
              <div className="f-icon">⏱</div>
              <div>
                <div className="f-title">Real-time Tracking</div>
                <div className="f-sub">
                  Follow your reports from submission to resolution
                </div>
              </div>
            </div>

            <div className="feature">
              <div className="f-icon">👥</div>
              <div>
                <div className="f-title">Community Impact</div>
                <div className="f-sub">
                  Join thousands making a difference locally
                </div>
              </div>
            </div>
          </div>

          <div className="left-stats">
            <div className="stat">
              <div className="stat-num">12.5K+</div>
              <div className="stat-label">Active Citizens</div>
            </div>
            <div className="stat">
              <div className="stat-num">8.9K+</div>
              <div className="stat-label">Issues Resolved</div>
            </div>
            <div className="stat">
              <div className="stat-num">95%</div>
              <div className="stat-label">Response Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="signin-right">
        <div className="form-card">
          <h2 className="form-title">Welcome Back</h2>
          <p className="form-sub">Sign in to your civic engagement dashboard</p>

          <form onSubmit={handleSubmit} className="form-inner">
            <label className="label">Email Address</label>
            <div className="input-with-icon">
              <span className="input-icon">@</span>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <label className="label">Password</label>
            <div className="input-with-icon" style={{ position: "relative" }}>
              <span className="input-icon">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="show-pass-btn"
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "18px",
                  color: "#666",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                title={showPassword ? "Hide Password" : "Show Password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="row-between" style={{ marginBottom: 20 }}>
              <label className="remember">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />{" "}
                Remember me
              </label>
              <Link to="/login/forgot" className="forgot-link">
                Forgot password?
              </Link>
            </div>

            {error && <div className="error-text">{error}</div>}

            <button className="gradient-btn" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign In to Dashboard"}
            </button>
          </form>

          <div className="signup-line">
            New to our platform?{" "}
            <Link to="/login/signup">Create Your Account →</Link>
          </div>

          <div className="small-icons">
            <div>🔒 Secure</div>
            <div>📍 Local</div>
            <div>👥 Community</div>
          </div>
        </div>
      </div>
    </div>
  );
}
