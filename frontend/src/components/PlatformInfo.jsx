import React from "react";
import { Globe } from "lucide-react";

export default function PlatformInfo() {
  return (
    <div className="flex items-center gap-6 pt-4 text-purple-100">
      <div className="flex items-center gap-2">
        <Globe className="w-5 h-5" />
        <span>Available on Web</span>
      </div>
      <div>•</div>
      <div>iOS & Android Coming Soon</div>
    </div>
  );
}
