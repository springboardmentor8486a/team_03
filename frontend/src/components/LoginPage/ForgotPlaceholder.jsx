import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/forgotpassword.css";
import logo from "../../assets/urbanalive.jpg"; 

export default function ForgotPlaceholder() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const validateEmail = (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).toLowerCase());

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
setLoading(true);

try {
  // 🔹 Call your backend to send OTP
const response = await fetch("http://localhost:5000/api/users/forgot-password", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email }),
});

  const data = await response.json();

  if (!response.ok) {
    setError(data.message || "Failed to send verification code.");
    setLoading(false);
    return;
  }

  // ✅ Success
  setMessage(`A verification code was sent to ${email}. Check your inbox.`);

  sessionStorage.setItem("forgot_email", email);

  // (Optional) if backend returns a requestId / resetToken, store it
  if (data.requestId) {
    sessionStorage.setItem("request_id", data.requestId);
  }

  // Redirect to verify page
  setTimeout(() => navigate("/login/verify"), 1000);

} catch {
  setError("Network error, please try again.");
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="forgot-container">
      {/* LEFT */}
      <div className="forgot-left">
        <div className="left-inner">
          <div className="brand-row">
            <div className="brand-logo">
              <img src={logo} alt="logo" />
            </div>
            <div className="brand-text">
              <div className="brand-title">UrbanAlive</div>
              <div className="brand-sub">Civic Engagement Platform</div>
            </div>
          </div>

          <h1 className="forgot-heading">Reset Your Password</h1>

          <p className="forgot-desc">
            Don't worry, it happens to the best of us. Enter your email address and
            we'll send you a code to reset your password.
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="forgot-right">
        <div className="forgot-card">
          <div className="back-row">
            <button className="back-btn" onClick={() => navigate(-1)}>
              ← Back to Login
            </button>
          </div>

          <h2 className="forgot-title">Forgot Password?</h2>
          <p className="forgot-sub">Enter your email address and we'll send you a verification code</p>

          <form className="forgot-form" onSubmit={handleSubmit}>
            <label className="label">Email Address</label>
            <div className="input-with-icon">
              <span className="input-icon">✉️</span>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {error && <div className="form-error">{error}</div>}
            {message && <div className="form-success">{message}</div>}

            <button className="send-btn" type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Verification Code"}
            </button>
          </form>

          <div className="signin-line">
            Remember your password? <Link to="/">Sign In →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}





