import * as Icons from "lucide-react";
import features from "../LandingPage/JsonFiles/FeatureCard.json"; // Import your JSON

export default function Features() {
  return (
    <div className="px-6 md:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-3 gap-6">
      {features.features.map((feature, index) => {
        const LucideIcon = Icons[feature.icon]; // Dynamically get icon

        return (
          <div
            key={index}
            className="relative p-6 rounded-2xl shadow-md flex flex-col items-start gap-3
                       transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl
                       hover:bg-gray-50 group overflow-hidden"
          >
            {/* Background Gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${feature.gradient || "from-purple-100 to-purple-200"} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
            />

            {/* Icon */}
            <div
              className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center
                         mx-auto mb-6 transform transition-transform duration-300 group-hover:scale-110`}
            >
              {LucideIcon && (
                <LucideIcon
                  className={`w-6 h-6 ${feature.color} transition-colors duration-300 group-hover:text-purple-500`}
                />
              )}
            </div>

            {/* Title */}
            <h3 className="text-lg font-extrabold text-gray-900 transition-colors duration-300 group-hover:text-purple-600">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        );
      })}
    </div>
  );
}
