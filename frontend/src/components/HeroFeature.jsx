import React from 'react'
import { MapPin, Camera, Users } from 'lucide-react';

const HeroFeature = () => {
  const features = [
    {
      icon: MapPin,
      bgColor: "bg-purple-100",
      textColor: "text-purple-500",
      title: "Real-time Location Tracking",
    },
    {
      icon: Camera,
      bgColor: "bg-green-100",
      textColor: "text-green-500",
      title: "Photo Evidence",
    },
    {
      icon: Users,
      bgColor: "bg-orange-100",
      textColor: "text-orange-500",
      title: "Community Voting",
    },
  ];
  return (
    <div>
        <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center items-center">
        {features.map((feature, index) => (
          <div className="flex items-center gap-2" key={index}>
            <span className={`p-2 rounded-full ${feature.bgColor}`}>
              <feature.icon className={`w-5 h-5 ${feature.textColor}`} />
            </span>
            <span className="text-gray-700 font-medium">
              {feature.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HeroFeature;