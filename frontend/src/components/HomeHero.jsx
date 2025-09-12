import React from "react";
import {
  Trash2,
  Droplet,
  Lightbulb,
  Users,
  CheckCircle,
  ArrowRight,
  Shield,
} from "lucide-react";
import { FloatingIcon } from "./HomeCards";

const HomeHero = ({ onReportIssue, onJoinVolunteer }) => {
  return (
    <section className="relative pt-24 pb-16 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-200/30 via-green-100/20 to-emerald-200/30"></div>

      {/* Floating Icons */}
      <FloatingIcon icon={Trash2} delay={0} position="top-20 left-10" />
      {/* <FloatingIcon icon={Road} delay={1} position="top-32 right-20" /> */}
      <FloatingIcon icon={Droplet} delay={2} position="top-48 left-1/4" />
      <FloatingIcon icon={Lightbulb} delay={0.5} position="bottom-32 right-10" />
      <FloatingIcon icon={Users} delay={1.5} position="bottom-48 left-16" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-slideLeft">
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Users size={16} className="mr-2" />
              Empowering Communities
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Cleaner Streets,{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Safer Communities
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Report garbage, potholes, water leaks, and broken streetlights in
              seconds. Together, we can build cleaner, safer, and smarter
              cities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={onReportIssue}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center group"
              >
                Report an Issue
                <ArrowRight
                  size={20}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </button>

              <button
                onClick={onJoinVolunteer}
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:border-green-600 hover:text-green-600 transition-colors flex items-center justify-center"
              >
                <Shield size={20} className="mr-2" />
                Join as Volunteer
              </button>
            </div>

            <div className="flex items-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <CheckCircle size={16} className="text-green-600 mr-2" />
                Free to use
              </div>
              <div className="flex items-center">
                <CheckCircle size={16} className="text-green-600 mr-2" />
                Community-driven
              </div>
              <div className="flex items-center">
                <CheckCircle size={16} className="text-green-600 mr-2" />
                Quick reporting
              </div>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="relative animate-slideRight">
            <div className="relative w-96 h-96 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full animate-pulse-slow"></div>
              <div className="absolute inset-4 bg-white/10 backdrop-blur-sm rounded-full"></div>
              <div className="absolute inset-8 bg-white/20 backdrop-blur-sm rounded-full"></div>

              {/* Central Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white rounded-full p-8 shadow-2xl">
                  <Trash2 size={80} className="text-green-600" />
                </div>
              </div>

              {/* Orbiting Elements */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-orbit-slow">
                <div className="bg-white rounded-full p-4 shadow-lg">
                  {/* <Road size={32} className="text-yellow-500" /> */}
                </div>
              </div>

              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 animate-orbit-reverse">
                <div className="bg-white rounded-full p-4 shadow-lg">
                  <Lightbulb size={32} className="text-orange-500" />
                </div>
              </div>

              <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-orbit">
                <div className="bg-white rounded-full p-4 shadow-lg">
                  <Droplet size={32} className="text-blue-500" />
                </div>
              </div>

              <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 animate-orbit-reverse-slow">
                <div className="bg-white rounded-full p-4 shadow-lg">
                  <Users size={32} className="text-green-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
