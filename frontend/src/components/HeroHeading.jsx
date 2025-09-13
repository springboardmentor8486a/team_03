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
    <section className="text-left max-w-2xl">
      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
        {title}{" "}
        <span
          className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} bg-clip-text text-transparent`}
        >
          {highlight}
        </span>{" "}
        {afterHighlight}
      </h1>

      {/* Subheading */}
      <p className="mt-4 md:mt-6 text-base md:text-lg text-gray-600">
        {subtitle}
      </p>

      {/* Features */}
      <div className="mt-6 md:mt-8">
        <HeroFeature />
      </div>

      {/* Action buttons */}
      <div className="mt-8 md:mt-10 flex flex-wrap gap-4">
        {primaryBtnText && (
          <button
            className={`px-6 py-3 rounded-lg bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white font-semibold shadow-md hover:opacity-90 transition`}
          >
            {primaryBtnText}
          </button>
        )}
        {secondaryBtnText && (
          <button
            className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium bg-white hover:bg-gray-100 transition"
          >
            {secondaryBtnText}
          </button>
        )}
      </div>
    </section>
  );
};

export default HeroHeading;
