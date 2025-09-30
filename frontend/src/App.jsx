import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginForm from "./pages/LoginForm";
import Dashboard from "./pages/Dashboard";
import Profile from "./components/Dashboard/Profile"; 
import ReportIssue from "./components/Dashboard/ReportIssue";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/*" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admindashboard" element={<AdminDashboard/>}/>
        <Route path="/profile" element={<Profile />} /> {/* ✅ add route */}
        <Route path="/reportissue" element={<ReportIssue />} /> {/* ✅ add report issue route */}
      </Routes>
    </BrowserRouter>
  );
  
}

export default App;
