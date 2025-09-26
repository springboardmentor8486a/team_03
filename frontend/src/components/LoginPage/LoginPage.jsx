import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/loginpage.css";
import logo from "../assets/urbanalive.jpg"; 

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).toLowerCase());

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateEmail(email)) return setError("Please enter a valid email.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");

   
    setLoading(true);
  
   try {
      // Step 1: Login request
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed.");
        setLoading(false);
        return;
      }

      // Step 2: Save token
      localStorage.setItem("token", data.token);

      // Step 3: Fetch user details from backend (instead of relying on localStorage only)
      const userResponse = await fetch("http://localhost:5000/api/users/login", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.token}`,
        },
      });

      const userData = await userResponse.json();

      if (!userResponse.ok) {
        setError("Failed to fetch user details.");
        setLoading(false);
        return;
      }

      // Save user details
      if (remember) {
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        sessionStorage.setItem("user", JSON.stringify(userData));
      }

      setLoading(false);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };
    
  return (
    <div className="signin-container">
      {/* LEFT */}
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
                <div className="f-sub">Submit issues with photos and location data</div>
              </div>
            </div>

            <div className="feature">
              <div className="f-icon">⏱</div>
              <div>
                <div className="f-title">Real-time Tracking</div>
                <div className="f-sub">Follow your reports from submission to resolution</div>
              </div>
            </div>

            <div className="feature">
              <div className="f-icon">👥</div>
              <div>
                <div className="f-title">Community Impact</div>
                <div className="f-sub">Join thousands making a difference locally</div>
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

      {/* RIGHT */}
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
            <div className="input-with-icon">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
              <Link to="/forgot" className="forgot-link">
                Forgot password?
              </Link>
            </div>

            {error && <div className="error-text">{error}</div>}

            <button className="gradient-btn" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign In to Dashboard"}
            </button>
          </form>

          <div className="signup-line">
            New to our platform? <Link to="/signup">Create Your Account →</Link>
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
