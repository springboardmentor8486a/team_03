import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginForm from "./pages/LoginForm";
import Dashboard from "./pages/Dashboard";
import Profile from "./components/Dashboard/Profile"; 
import ReportIssue from "./components/Dashboard/ReportIssue";
import AdminDashboard from "./pages/AdminDashboard";
import ViewDetails from "./components/Dashboard/ViewDetails";
import WorkProgressDashboard from "./pages/WorkProgressDashboard";
import MyReports from "./components/Dashboard/MyReports";
import Analytics from "./components/Dashboard/Analytics";
import AreaMap from "./components/Dashboard/AreaMap";
import CommunityReports from "./components/Dashboard/Community";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/*" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
        <Route path="/profile" element={<Profile />} /> {/* ✅ add route */}
        <Route path="/view-details" element={<ViewDetails />} /> {/* ✅ add view details route */}
        <Route path="/my-reports" element={<MyReports />} /> {/* ✅ add reports route */}
        <Route path="/analytics" element={<Analytics />} /> {/* ✅ add analytics route */}
        <Route path="/map" element={<AreaMap />} /> {/* ✅ add map route */}
        <Route path="/community" element={<CommunityReports />} /> {/* ✅ add community route */}
        <Route path="/reportissue" element={<ReportIssue />} /> {/* ✅ add report issue route */}
        <Route path="/work-progress" element={<WorkProgressDashboard />} />
        
      </Routes>
    </BrowserRouter>
  );
  
}

export default App;
