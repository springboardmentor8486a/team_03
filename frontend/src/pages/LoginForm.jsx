import { Routes, Route, Outlet } from "react-router-dom";
import LoginPage from "../components/LoginPage/LoginPage";
import SignupPlaceholder from "../components/LoginPage/SignupPlaceholder";
import ForgotPlaceholder from "../components/LoginPage/ForgotPlaceholder";
import VerifyPlaceholder from "../components/LoginPage/VerifyPlaceholder";

// Optional layout if you want a wrapper for login pages
function LoginLayout() {
  return (
    <div>
      <Outlet /> {/* renders the nested login page component */}
    </div>
  );
}

export default function LoginForm() {
  return (
    <Routes>
      <Route path="/" element={<LoginLayout />}>
        <Route index element={<LoginPage />} />           {/* /login */}
        <Route path="signup" element={<SignupPlaceholder />} />  {/* /login/signup */}
        <Route path="forgot" element={<ForgotPlaceholder />} />  {/* /login/forgot */}
        <Route path="verify" element={<VerifyPlaceholder />} />  {/* /login/verify */}
      </Route>
    </Routes>
  );
}
