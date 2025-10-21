import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/urbanalive.jpg";
import "../../styles/verify.css";

export default function VerifyPlaceholder() {
  const navigate = useNavigate();
  const savedEmail = sessionStorage.getItem("forgot_email") || "";
  const [email] = useState(savedEmail);
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [resendSecs, setResendSecs] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);

  const maskEmail = (e) => {
    if (!e) return "your email";
    const [local, domain] = e.split("@");
    if (!domain) return e;
    if (local.length <= 2) return `${local}***@${domain}`;
    return `${local.slice(0, 2)}${"*".repeat(Math.max(2, local.length - 2))}@${domain}`;
  };

  // Timer for resend button
  useEffect(() => {
    setResendDisabled(true);
    setResendSecs(60);
    const t = setInterval(() => {
      setResendSecs((s) => {
        if (s <= 1) {
          clearInterval(t);
          setResendDisabled(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    setTimeout(() => inputsRef.current[0]?.focus?.(), 50);
    return () => clearInterval(t);
  }, []);

  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/\D/g, "");
    if (!val) {
      updateDigit(idx, "");
      return;
    }
    if (val.length > 1) {
      const chars = val.split("");
      const newDigits = [...digits];
      let i = idx;
      for (let ch of chars) {
        if (i > 5) break;
        newDigits[i] = ch;
        i++;
      }
      setDigits(newDigits);
      if (i <= 5) inputsRef.current[i]?.focus();
      else inputsRef.current[5]?.focus();
      return;
    }
    updateDigit(idx, val);
    if (idx < 5 && val) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const updateDigit = (idx, value) => {
    setDigits((prev) => {
      const copy = [...prev];
      copy[idx] = value;
      return copy;
    });
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      if (digits[idx]) {
        updateDigit(idx, "");
      } else if (idx > 0) {
        inputsRef.current[idx - 1]?.focus();
        updateDigit(idx - 1, "");
      }
    } else if (e.key === "ArrowLeft" && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    } else if (e.key === "ArrowRight" && idx < 5) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = (e.clipboardData || window.clipboardData).getData("text").replace(/\D/g, "");
    if (!pasted) return;
    const chars = pasted.split("").slice(0, 6);
    const newDigits = ["", "", "", "", "", ""];

    for (let i = 0; i < chars.length; i++) newDigits[i] = chars[i];
    setDigits(newDigits);
    const nextIndex = Math.min(chars.length, 5);
    inputsRef.current[nextIndex]?.focus();
  };

  // In VerifyPlaceholder.jsx
  const verifyCode = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    const otp = digits.join("");

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/verify-otp",
        { email, otp }
      );

      // ✅ Navigate relative to current login route
      navigate(`/login/reset-password/${data.resetToken}`);

    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };


  const handleResend = async () => {
    if (resendDisabled) return;
    setError("");
    setMessage("");
    setResendDisabled(true);
    setResendSecs(60);

    try {
      await axios.post("http://localhost:5000/api/users/forgot-password", { email });
      setMessage(`A new code has been sent to ${maskEmail(email)}.`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP.");
    }

    // Start resend countdown again
    const t = setInterval(() => {
      setResendSecs((s) => {
        if (s <= 1) {
          clearInterval(t);
          setResendDisabled(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  };

  return (
    <div className="verify-container">
      <div className="verify-left">
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

          <h1 className="verify-heading">Verify Your Identity</h1>
          <p className="verify-desc">
            We've sent a 6-digit verification code to your email. Enter it below to continue.
          </p>
        </div>
      </div>

      <div className="verify-right">
        <div className="verify-card">
          <div className="back-row">
            <button className="back-btn" onClick={() => navigate(-1)}>
              ← Back to Login
            </button>
          </div>

          <h2 className="verify-title">Enter Verification Code</h2>
          <p className="verify-sub">
            We sent a code to <strong>{maskEmail(email)}</strong>
          </p>

          <form className="verify-form" onSubmit={verifyCode} onPaste={handlePaste}>
            <div className="code-row">
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => (inputsRef.current[i] = el)}
                  className="code-input"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={d}
                  onChange={(e) => handleChange(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                />
              ))}
            </div>

            {error && <div className="form-error">{error}</div>}
            {message && <div className="form-success">{message}</div>}

            <button className="verify-btn" type="submit" disabled={loading}>
              {loading ? "Verifying..." : "Verify Code"}
            </button>
          </form>

          <div className="resend-row">
            {resendDisabled ? (
              <span className="resend-text">Resend code in {resendSecs}s</span>
            ) : (
              <button className="resend-link" onClick={handleResend}>
                Resend code
              </button>
            )}
            <div className="try-again">
              Didn't receive the code? <button className="try-link" onClick={handleResend}>Try again</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
