import React from 'react'
import { MapPin, Camera, Users } from 'lucide-react';
const HeroFeature = () => {
  return (
    <div>
        <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center items-center">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-full bg-purple-100">
            <MapPin className="w-5 h-5 text-purple-500" />
          </span>
          <span className="text-gray-700 font-medium">
            Real-time Location Tracking
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="p-2 rounded-full bg-green-100">
            <Camera className="w-5 h-5 text-green-500" />
          </span>
          <span className="text-gray-700 font-medium">Photo Evidence</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="p-2 rounded-full bg-orange-100">
            <Users className="w-5 h-5 text-orange-500" />
          </span>
          <span className="text-gray-700 font-medium">Community Voting</span>
        </div>
      </div>
    </div>
  )
}

export default HeroFeature