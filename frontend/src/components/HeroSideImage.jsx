import React from "react";

const HeroSideImage = ({
  image,
  altText,
  topBadgeText,
  topBadgeColor = "bg-green-500",
  bottomBadgeText,
  bottomBadgeDotColor = "bg-orange-500",
  bottomBadgeTextColor = "text-gray-800",
}) => {
  return (
    <div className="relative max-w-xl mx-auto rounded-2xl overflow-hidden shadow-lg">
      {/* Image */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl">
        <img
          src={image}
          alt={altText}
          className="w-[500px] h-96 lg:h-[500px] object-cover rounded-2xl"
        />
      </div>

      {/* Top-left badge */}
      {topBadgeText && (
        <div className="absolute top-3 left-3 bg-white rounded-lg shadow px-3 py-1 flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${topBadgeColor} animate-pulse`} />
          <span className="text-sm font-medium text-gray-700">{topBadgeText}</span>
        </div>
      )}

      {/* Bottom-right badge */}
      {bottomBadgeText && (
        <div className="absolute bottom-3 right-3 bg-white rounded-lg shadow px-3 py-1 flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${bottomBadgeDotColor} animate-pulse`} />
          <span className={`text-sm font-medium ${bottomBadgeTextColor}`}>
            {bottomBadgeText}
          </span>
        </div>
      )}
    </div>
  );
};

export default HeroSideImage;
