import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/forgotpassword.css";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
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
  // 🔹 Retrieve email and requestId (saved during ForgotPassword + Verify steps)
  const email = sessionStorage.getItem("forgot_email");
  const requestId = sessionStorage.getItem("request_id"); // optional if backend returns one

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

  // ✅ Success
  setSuccess("Password reset successful! Redirecting to login...");
  setTimeout(() => navigate("/"), 1500);

} catch (err) {
  setError("Network error, please try again.");
}

  return (
    <div className="forgot-container">
      <div className="forgot-card">
        <h2>Reset Your Password</h2>
        <form onSubmit={handleSubmit}>
          <label>New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
          />
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
          />
          {error && <div className="form-error">{error}</div>}
          {success && <div className="form-success">{success}</div>}
          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
}
