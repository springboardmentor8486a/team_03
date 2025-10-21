// src/pages/LoginForm.jsx
import { Routes, Route, Outlet } from "react-router-dom";
import LoginPage from "../components/LoginPage/LoginPage";
import SignupPlaceholder from "../components/LoginPage/SignupPlaceholder";
import ForgotPlaceholder from "../components/LoginPage/ForgotPlaceholder";
import VerifyPlaceholder from "../components/LoginPage/VerifyPlaceholder";
import ResetPassword from "../components/LoginPage/ResetPassword";

// Optional layout for login pages
function LoginLayout() {
  return (
    <div>
      {/* Could add a common wrapper here (logo/sidebar etc) */}
      <Outlet /> {/* renders the nested login page component */}
    </div>
  );
}

export default function LoginForm() {
  return (
    <Routes>
      <Route path="/" element={<LoginLayout />}>
        <Route index element={<LoginPage />} />
        <Route path="signup" element={<SignupPlaceholder />} />
        <Route path="forgot" element={<ForgotPlaceholder />} />
        <Route path="verify" element={<VerifyPlaceholder />} />
        <Route path="reset-password/:token" element={<ResetPassword />} />

      </Route>


    </Routes>
  );
}
