import React from "react";

export default function AdditionalStat({ value, label, description, color }) {
  return (
    <div className="text-center">
      <div className={`text-3xl font-bold ${color} mb-2`}>{value}</div>
      <div className="font-medium text-gray-800 mb-1">{label}</div>
      <div className="text-sm text-gray-600">{description}</div>
    </div>
  );
}
