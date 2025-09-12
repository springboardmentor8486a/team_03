import React from "react";

function Footer() {
  return (
    <footer className="bg-green-50 border-t py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="text-gray-600 text-sm">
            © 2025 CleanStreet. All rights reserved.
          </div>

          {/* Links */}
          <div className="flex space-x-6 text-sm">
            <a
              href="#privacy"
              className="text-gray-600 hover:text-green-700 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              className="text-gray-600 hover:text-green-700 transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#contact"
              className="text-gray-600 hover:text-green-700 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
