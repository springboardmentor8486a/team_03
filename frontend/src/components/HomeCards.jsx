import React from "react";
import { Star } from "lucide-react";

/* Floating decorative icons */
export const FloatingIcon = ({ icon: Icon, delay = 0, size = 24, position }) => (
  <div
    className={`absolute ${position} animate-float`}
    style={{
      animationDelay: `${delay}s`,
      animationDuration: "3s",
    }}
  >
    <div className="bg-green-100/30 backdrop-blur-sm rounded-full p-3 shadow-lg">
      <Icon size={size} className="text-green-600" />
    </div>
  </div>
);

/* Feature cards (What you can report) */
export const FeatureCard = ({ icon: Icon, title, description, color, delay = 0 }) => (
  <div
    className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group animate-slideUp"
    style={{ animationDelay: `${delay}s` }}
  >
    <div
      className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
    >
      <Icon size={28} className="text-white" />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

/* Statistics (Impact numbers) */
export const StatCard = ({ number, label, icon: Icon, delay = 0 }) => (
  <div
    className="text-center animate-slideUp"
    style={{ animationDelay: `${delay}s` }}
  >
    <div className="bg-green-600/10 backdrop-blur-sm rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
      <Icon size={28} className="text-green-600" />
    </div>
    <div className="text-4xl font-bold text-green-700 mb-2">{number}</div>
    <div className="text-gray-600">{label}</div>
  </div>
);

/* Testimonials (Community feedback) */
export const TestimonialCard = ({ name, role, content, avatar, rating = 5 }) => (
  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
    <div className="flex items-center mb-4">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} size={16} className="text-yellow-400 fill-current" />
      ))}
    </div>
    <p className="text-gray-700 mb-4 italic">"{content}"</p>
    <div className="flex items-center">
      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center text-white font-semibold mr-4">
        {avatar}
      </div>
      <div>
        <div className="font-semibold text-gray-900">{name}</div>
        <div className="text-sm text-gray-500">{role}</div>
      </div>
    </div>
  </div>
);
