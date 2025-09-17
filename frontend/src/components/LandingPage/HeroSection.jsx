import React from "react";
import HeroHeading from "./HeroHeading";
import HeroSideImage from "./HeroSideImage";
import cleaningImage from "../../assets/cleaningImage.jpeg";

const HeroSection = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between gap-10 px-6 md:px-12 lg:px-20 mt-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Left side */}
      <HeroHeading
        title="Make Your"
        highlight="Community"
        afterHighlight="Cleaner & Safer"
        subtitle="Report local issues, track their progress, and work together with your community to create positive change. From potholes to broken streetlights, your voice matters."
        primaryBtnText="Start Reporting Issues"
        secondaryBtnText="Learn More"
        gradientFrom="from-purple-500"
        gradientTo="to-green-500"
      />

      {/* Right side */}
      <HeroSideImage
        image={cleaningImage}
        altText="Cleaning"
        topBadgeText="Issue Resolved"
        topBadgeColor="bg-green-500"
        bottomBadgeText="New Report"
        bottomBadgeDotColor="bg-orange-500"
        bottomBadgeTextColor="text-blue-600"
      />
    </section>
  );
};

export default HeroSection;
