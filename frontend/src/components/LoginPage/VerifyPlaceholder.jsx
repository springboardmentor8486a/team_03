import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/urbanalive.jpg";
import "../../styles/verify.css";

export default function VerifyPlaceholder() {
  const navigate = useNavigate();
  const savedEmail = sessionStorage.getItem("forgot_email") || "";
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setTimeout(() => inputsRef.current[0]?.focus?.(), 50);
  }, []);

  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/\D/g, "");
    const newDigits = [...digits];
    newDigits[idx] = val;
    setDigits(newDigits);
    if (val && idx < 5) inputsRef.current[idx + 1]?.focus();
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !digits[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  const verifyCode = (e) => {
    e.preventDefault();
    const code = digits.join("");
    if (code.length !== 6) return setError("Enter the 6-digit verification code.");

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (code === "123456") {
        setMessage("Code verified. Redirecting...");
        setTimeout(() => navigate("/dashboard"), 700);
      } else {
        setError("Invalid verification code. Try again.");
      }
    }, 900);
  };

  return (
    <div className="verify-container">
      <div className="verify-left">
        <img src={logo} alt="logo" />
        <h1>Verify Your Identity</h1>
        <p>We've sent a 6-digit code to {savedEmail}</p>
      </div>

      <div className="verify-right">
        <div className="verify-card">
          <button onClick={() => navigate(-1)}>← Back to Login</button>
          <form onSubmit={verifyCode}>
            <div className="code-row">
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => (inputsRef.current[i] = el)}
                  value={d}
                  onChange={(e) => handleChange(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  maxLength={1}
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
              ))}
            </div>
            {error && <div className="form-error">{error}</div>}
            {message && <div className="form-success">{message}</div>}
            <button type="submit" disabled={loading}>
              {loading ? "Verifying..." : "Verify Code"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
