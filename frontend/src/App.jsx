
import './App.css'
import Home from "./pages/Home"
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Profile from "./components/Dashboard/Profile";
import ReportIssue from "./components/Dashboard/ReportIssue"

function App() {
  return (
    <>
    <Home/>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/reportissue" element={<ReportIssue/>}/>
    </Routes>
    </>
  );
}

export default App;
