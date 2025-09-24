import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/urbanalive.jpg";

export default function VerifyPlaceholder() {
  const navigate = useNavigate();
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [resendSecs, setResendSecs] = useState(60);

  const inputsRef = useRef([]);
  const email = sessionStorage.getItem("forgot_email");

  // Countdown for resend
  useEffect(() => {
    if (resendSecs > 0) {
      const timer = setTimeout(() => setResendSecs(resendSecs - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendSecs]);

  // Handle input change
  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newDigits = [...digits];
      newDigits[index] = value;
      setDigits(newDigits);

      if (value && index < 5) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  // Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // Handle paste (entire code)
  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").slice(0, 6).split("");
    if (pasteData.every((ch) => /^[0-9]$/.test(ch))) {
      setDigits(pasteData.concat(Array(6 - pasteData.length).fill("")));
      inputsRef.current[5]?.focus();
    }
  };

  // Submit verification
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const code = digits.join("");
    if (code.length !== 6) return setError("Please enter the full 6-digit code.");

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/users/verify-otp", {
        email,
        otp: code,
      });

      if (response.data.success) {
        setMessage("Code verified! You can now reset your password.");
        navigate("/login/reset");
      } else {
        setError(response.data.message || "Invalid code. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Resend handler
  const handleResend = () => {
    setResendSecs(60);
    setMessage("A new code has been sent to your email.");
    // 🔗 You can also call your backend here to resend OTP
  };

  return (
    <div className="flex min-h-screen">
      {/* LEFT SIDE */}
      <div className="hidden md:flex flex-1 items-center justify-center bg-gradient-to-b from-[#6e21f2] via-[#b81fe7] to-[#8421b7] text-white p-10">
        <div className="max-w-md">
          <div className="flex items-center gap-3 mb-6">
            <img src={logo} alt="logo" className="w-12 h-12 rounded-xl bg-white/20 p-2" />
            <div>
              <div className="font-bold text-2xl">UrbanAlive</div>
              <div className="text-sm opacity-90">Civic Engagement Platform</div>
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-3">Verify Your Identity</h1>
          <p className="text-white/90">
            We’ve sent a 6-digit verification code to your email. Enter the code
            below to continue.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-1 items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <Link to="/login" className="text-sm text-gray-500 hover:text-purple-600">
            ← Back to Login
          </Link>

          <h2 className="text-2xl font-bold mt-6 mb-2">Enter Verification Code</h2>
          <p className="text-gray-600 mb-6">
            We sent a code to <span className="font-semibold">{email}</span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP INPUTS */}
            <div className="flex gap-3 justify-center" onPaste={handlePaste}>
              {digits.map((digit, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  ref={(el) => (inputsRef.current[i] = el)}
                  className="w-12 h-12 text-center text-xl border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              ))}
            </div>

            {error && <div className="text-red-600 text-sm">{error}</div>}
            {message && <div className="text-green-700 text-sm">{message}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-[#8e2df1] to-[#2ad29f] text-white font-bold disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Verifying..." : "Verify Code"}
            </button>

            <div className="text-sm text-gray-500 text-center">
              Resend code in{" "}
              <span className="font-semibold">{resendSecs}s</span>
            </div>

            {resendSecs === 0 && (
              <div className="text-sm text-center">
                Didn’t receive the code?{" "}
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-purple-600 font-semibold hover:underline"
                >
                  Try again
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
