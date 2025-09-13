import React from "react";

const HeroSideImage = ({
  image,
  altText,
  topBadgeText,
  topBadgeColor = "bg-green-500",
  bottomBadgeText,
  bottomBadgeDotColor = "bg-orange-500",
  bottomBadgeTextColor = "text-blue-600",
}) => {
  return (
    <div className="relative max-w-xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-white">
      {/* Top status badge */}
      {topBadgeText && (
        <div className="absolute top-3 left-3 bg-white shadow px-3 py-1 rounded-full flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${topBadgeColor}`} />
          <span className="text-sm font-medium text-gray-700">
            {topBadgeText}
          </span>
        </div>
      )}

      {/* Image */}
      <img src={image} alt={altText} className="w-[400px] h-full object-cover" />

      {/* Bottom status badge */}
      {bottomBadgeText && (
        <div className="absolute bottom-3 right-3 bg-white shadow px-3 py-1 rounded-full flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${bottomBadgeDotColor}`} />
          <span className={`text-sm font-semibold ${bottomBadgeTextColor}`}>
            {bottomBadgeText}
          </span>
        </div>
      )}
    </div>
  );
};

export default HeroSideImage;
