import React from "react";
import { ArrowRight, Download } from "lucide-react";

export default function CTAButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-lg flex items-center justify-center gap-2 transition-all">
        Get Started Now
        <ArrowRight className="w-5 h-5" />
      </button>

      <button className="border border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg flex items-center justify-center gap-2 transition-all">
        <Download className="w-5 h-5" />
        Download App
      </button>
    </div>
  );
}
