import logo from './logo.svg';
import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import SignupPlaceholder from "./components/SignupPlaceholder"
import ForgotPlaceholder from "./components/ForgotPlaceholder";
import VerifyPlaceholder from "./components/VerifyPlaceholder";


function App() {
  return (
    
       <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPlaceholder />} />
        <Route path="/forgot" element={<ForgotPlaceholder />} /> 
        <Route path="/verify" element={<VerifyPlaceholder />} />
      </Routes>
    </Router>
 
  );
}

export default App;
