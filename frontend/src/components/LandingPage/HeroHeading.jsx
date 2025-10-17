import React from "react";
import HeroFeature from "./HeroFeature";

const HeroHeading = ({
  title, // e.g. "Make Your"
  highlight, // e.g. "Community"
  afterHighlight, // e.g. "Cleaner & Safer"
  subtitle,
  primaryBtnText,
  secondaryBtnText,
  gradientFrom = "from-purple-500", // default colors
  gradientTo = "to-green-500",
}) => {
  return (
    <section className="text-left max-w-2xl px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
        {title}{" "}
        <span
          className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} bg-clip-text text-transparent`}
        >
          {highlight}
        </span>{" "}
        {afterHighlight}
      </h1>

      {/* Subheading */}
      <p className="mt-3 sm:mt-4 lg:mt-6 text-sm sm:text-base lg:text-lg text-gray-600">
        {subtitle}
      </p>

      {/* Features */}
      <div className="mt-5 sm:mt-6 lg:mt-8">
        <HeroFeature />
      </div>

      {/* Action buttons */}
      <div className="mt-6 sm:mt-8 lg:mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
        {primaryBtnText && (
          <button
            className={`w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white font-semibold shadow-md hover:opacity-90 transition`}
          >
            {primaryBtnText}
          </button>
        )}
        {secondaryBtnText && (
          <button
            className="w-full sm:w-auto px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium bg-white hover:bg-gray-100 transition"
          >
            {secondaryBtnText}
          </button>
        )}
      </div>
    </section>
  );
};

export default HeroHeading;
