// src/components/Header.jsx

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 h-16 bg-gradient-to-r from-green-50 to-white shadow-sm">
      <div className="flex items-center justify-between h-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Logo/Brand */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center cursor-pointer"
        >
          <h1 className="text-2xl font-extrabold text-green-700 tracking-wide drop-shadow-md hover:text-green-900 transition-colors duration-300">
            CleanStreet
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a
            href="#about"
            className="text-gray-700 hover:text-green-700 font-medium transition-colors duration-200"
          >
            About
          </a>
          <a
            href="#report"
            className="text-gray-700 hover:text-green-700 font-medium transition-colors duration-200"
          >
            Report
          </a>
          <button
            onClick={() => navigate("/login")}
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-200"
          >
            Login
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-700 hover:text-green-700 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg border-t">
          <nav className="flex flex-col space-y-1 p-4">
            <a
              href="#about"
              className="text-gray-700 hover:text-green-700 font-medium py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#report"
              className="text-gray-700 hover:text-green-700 font-medium py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Report
            </a>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/login");
              }}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-3 rounded-lg transition-colors duration-200 text-left"
            >
              Login
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
