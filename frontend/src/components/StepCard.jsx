import React from "react";

export default function StepCard({ step, showArrow }) {
  return (
    <div className="relative">
      {/* Card */}
      <div
        className={`relative border-2 ${step.borderColor} rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group bg-white`}
      >
        <div className="p-8 text-center">
          {/* Step Number */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <div
              className={`w-8 h-8 ${step.bgColor} rounded-full flex items-center justify-center border-4 border-white shadow-lg`}
            >
              <span className={`text-sm font-bold ${step.iconColor}`}>
                {step.number}
              </span>
            </div>
          </div>

          {/* Icon */}
          <div
            className={`w-20 h-20 ${step.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 mt-4 group-hover:scale-110 transition-transform duration-300`}
          >
            <span className={step.iconColor}>{step.icon}</span>
          </div>

          {/* Content */}
          <h3 className="font-bold mb-4">{step.title}</h3>
          <p className="text-gray-600 leading-relaxed">{step.description}</p>
        </div>
      </div>

      {/* Arrow between steps */}
      {showArrow && (
        <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      )}
    </div>
  );
}
