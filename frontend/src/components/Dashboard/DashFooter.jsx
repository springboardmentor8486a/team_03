import {
  FiMapPin,
  FiMail,
  FiPhone,
  FiGlobe,
  FiTwitter,
  FiBarChart2,
} from "react-icons/fi";

export default function DashFooter() {
  return (
    <footer className="bg-gradient-to-r from-purple-600 to-purple-800 text-white mt-8">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & About */}
        <div>
          <h2 className="text-xl font-bold mb-2">UrbanAlive</h2>
          <p className="text-sm text-gray-200 leading-relaxed">
            A smart civic engagement platform that empowers citizens to report
            local issues and collaborate with municipal authorities for cleaner,
            safer communities.
          </p>
          <div className="flex gap-3 mt-4">
            <span className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-full">
              <FiGlobe />
            </span>
            <span className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-full">
              <FiTwitter />
            </span>
            <span className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-full">
              <FiBarChart2 />
            </span>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="font-semibold mb-3">Quick Actions</h3>
          <ul className="space-y-2 text-gray-200 text-sm">
            <li>Report New Issue</li>
            <li>Track My Reports</li>
            <li>Dashboard</li>
            <li>Profile Settings</li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-gray-200 text-sm">
            <li>How It Works</li>
            <li>Community Guidelines</li>
            <li>Help Center</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>

        {/* Get in Touch */}
        <div>
          <h3 className="font-semibold mb-3">Get in Touch</h3>
          <ul className="space-y-2 text-gray-200 text-sm">
            <li className="flex items-center gap-2">
              <FiMapPin /> India
            </li>
            <li className="flex items-center gap-2">
              <FiMail /> support@cleanstreet.com
            </li>
            <li className="flex items-center gap-2">
              <FiPhone /> +91 88888-88888
            </li>
          </ul>
          <div className="bg-white/10 p-3 rounded-lg mt-4 text-sm">
            Join our community of <br />
            <span className="font-bold text-lg">10,000+ active citizens</span>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="border-t border-white/20 mt-6 py-6 px-6 text-center grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto text-sm">
        <div>
          <p className="font-bold text-lg">2,847</p>
          <p>Issues Reported</p>
        </div>
        <div>
          <p className="font-bold text-lg">1,923</p>
          <p>Issues Resolved</p>
        </div>
        <div>
          <p className="font-bold text-lg">15</p>
          <p>Partner Cities</p>
        </div>
        <div>
          <p className="font-bold text-lg">94%</p>
          <p>Satisfaction Rate</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-gray-300 text-sm py-4 border-t border-white/10">
        © 2025 UrbanAlive. All rights reserved. Built with ❤️ for cleaner
        communities.
      </div>
    </footer>
  );
}
