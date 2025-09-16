import React from "react";

export default function FloatingStat({ position, color, value }) {
  const positionClasses = {
    topRight: "absolute -top-6 -right-6",
    bottomLeft: "absolute -bottom-6 -left-6",
  };

  return (
    <div className={`${positionClasses[position]} bg-white rounded-lg shadow-lg p-4 ${color === "pulse" ? "animate-pulse" : "animate-bounce"}`}>
      <div className="flex items-center gap-2">
        <div className={`w-4 h-4 rounded-full ${color === "green" ? "bg-green-500" : "bg-purple-500"}`}></div>
        <span className="text-sm font-medium text-gray-800">{value}</span>
      </div>
    </div>
  );
}
