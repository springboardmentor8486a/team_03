import React from 'react'
import { CheckCircle, MessageSquare, BarChart3 } from 'lucide-react'
import impactImage from '../../assets/impactImage.jpeg'

const ImpactSection = () => {
  const features = [
    {
      icon: CheckCircle,
      bgColor: "bg-purple-100",
      textColor: "text-purple-500",
      title: "Issue Verification",
      description: "Municipal authorities verify and prioritize reported issues based on severity and community votes."
    },
    {
      icon: MessageSquare,
      bgColor: "bg-green-100",
      textColor: "text-green-500",
      title: "Community Engagement",
      description: "Neighbors can comment, vote, and collaborate on solutions to strengthen community bonds."
    },
    {
      icon: BarChart3,
      bgColor: "bg-orange-100",
      textColor: "text-orange-500",
      title: "Performance Metrics",
      description: "Transparent reporting on response times and resolution rates keeps authorities accountable."
    }
  ]

  return (
    <div
      className="flex flex-col md:flex-row items-center justify-between gap-12 px-6 md:px-12 lg:px-20 mt-20 
                 bg-gradient-to-br from-blue-50 via-white to-green-50 py-16"
    >
      {/* Left Content */}
      <div className="flex-1 space-y-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight">
          See Your Impact in Action
        </h1>
        <p className="text-gray-600 text-lg">
          Track every step of the resolution process and watch as your community
          transforms through collective action.
        </p>

        {/* Features */}
        <div className="space-y-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="flex items-start gap-4">
                <span className={`p-3 rounded-xl ${feature.bgColor}`}>
                  <Icon className={`w-6 h-6 ${feature.textColor}`} />
                </span>
                <div>
                  <h3 className="font-bold text-lg">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Right Image */}
      <div className="flex-1 flex justify-center rounded-2xl overflow-hidden shadow-2xl">
        <img
          src={impactImage}
          alt="Impact visualization"
          className="w-full h-96 lg:h-[500px] object-cover"
        />
      </div>
    </div>
  )
}

export default ImpactSection
