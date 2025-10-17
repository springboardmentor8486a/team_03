import React from "react";

export default function ImpactCard({ icon, value, label, description, bgColor, iconColor, gradient }) {
  return (
    <div className="relative p-8 text-center bg-white border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 group overflow-hidden">
      {/* Background Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
      />
      
      {/* Icon */}
      <div
        className={`w-16 h-16 ${bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
      >
        <span className={iconColor}>{icon}</span>
      </div>
      
      {/* Value */}
      <div className="mb-2">
        <span className="text-4xl font-bold text-gray-900">{value}</span>
      </div>

      {/* Label */}
      <h3 className="font-bold mb-2 text-gray-800">{label}</h3>

      {/* Description */}
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
