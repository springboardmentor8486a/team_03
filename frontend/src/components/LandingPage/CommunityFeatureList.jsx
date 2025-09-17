import React from "react";

export default function CommunityFeatureList() {
  const features = [
    "Free to use, always",
    "Real-time updates on your reports",
    "Connect with your local government",
  ];

  return (
    <div className="space-y-4">
      {features.map((feature, idx) => (
        <div key={idx} className="flex items-center gap-3">
          <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
            <span className="text-green-900 font-bold text-sm">✓</span>
          </div>
          <span className="text-lg">{feature}</span>
        </div>
      ))}
    </div>
  );
}
