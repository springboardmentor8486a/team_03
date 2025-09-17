import React from "react";
import {  Mail, MapPin } from "lucide-react";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center">
             <img src={logo} alt="Logo" style={{ width: "80px", height: "auto" }} />
            </div>
            <p className="text-gray-400 leading-relaxed">
              Empowering communities to create cleaner, safer neighborhoods
              through civic engagement and transparent reporting.
            </p>
            {/* <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div> */}
          </div>

          {/* Platform */}
          <div className="space-y-4">
            <h3 className="font-medium">Platform</h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">How It Works</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Features</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Pricing</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">API Documentation</a>
            </div>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h3 className="font-medium">Community</h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Success Stories</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Best Practices</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Forums</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Events</a>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-medium">Support</h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Help Center</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Contact Us</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © 2025 UrbanAlive. All rights reserved.
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <MapPin className="w-4 h-4" />
              <span>Serving communities worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
