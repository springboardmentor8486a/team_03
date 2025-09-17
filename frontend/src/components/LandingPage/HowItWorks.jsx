import React from "react";
import { Camera, Send, CheckCircle } from "lucide-react";
import StepCard from "./StepCard";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: <Camera className="w-8 h-8" />,
      title: "Spot & Capture",
      description:
        "Take a photo of the issue and add a brief description. Our app automatically captures location data.",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      borderColor: "border-purple-200",
    },
    {
      number: "02",
      icon: <Send className="w-8 h-8" />,
      title: "Submit & Share",
      description:
        "Submit your report to municipal authorities and share with your community for support and validation.",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      borderColor: "border-green-200",
    },
    {
      number: "03",
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Track & Celebrate",
      description:
        "Monitor progress through our dashboard, receive updates, and celebrate when your issue gets resolved!",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      borderColor: "border-orange-200",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50" id="howitworks">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            How Clean Street{" "}
            <span className="text-transparent bg-gradient-to-r from-purple-600 to-green-600 bg-clip-text">
              Works
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Making a difference in your community is simple. Follow these three
            easy steps to report issues and drive positive change.
          </p>
        </div>

        {/* Steps */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 relative">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              step={step}
              showArrow={index < steps.length - 1}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-medium text-gray-700">
              Ready to make a difference?
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
