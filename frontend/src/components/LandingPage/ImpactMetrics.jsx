import React from "react";
import { TrendingUp, Users, MapPin, Clock } from "lucide-react";
import ImpactCard from "./ImpactCard";
import AdditionalStat from "./AdditionalStat";

export default function ImpactMetrics() {
  const metrics = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      value: "2,450+",
      label: "Issues Resolved",
      description: "Community problems fixed this year",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: <Users className="w-8 h-8" />,
      value: "12,800+",
      label: "Active Citizens",
      description: "Community members making a difference",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      gradient: "from-purple-500 to-violet-500",
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      value: "156",
      label: "Neighborhoods",
      description: "Areas actively using Clean Street",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      value: "3.2 days",
      label: "Avg Response Time",
      description: "Faster resolution through community engagement",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      gradient: "from-blue-500 to-cyan-500",
    },
  ];

  const additionalStats = [
    {
      value: "78%",
      label: "Response Rate",
      description: "Issues acknowledged within 24 hours",
      color: "text-purple-600",
    },
    {
      value: "4.8★",
      label: "Community Rating",
      description: "Average satisfaction score",
      color: "text-green-600",
    },
    {
      value: "89%",
      label: "Resolution Rate",
      description: "Issues successfully resolved",
      color: "text-orange-600",
    },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden" id="impact">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Real Impact,
            <span className="text-transparent bg-gradient-to-r from-purple-600 to-green-600 bg-clip-text">
              {" "}
              Real Results
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of citizens who are already making their communities
            cleaner, safer, and more responsive to local needs.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, idx) => (
            <ImpactCard key={idx} {...metric} />
          ))}
        </div>

        {/* Additional Stats */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {additionalStats.map((stat, idx) => (
            <AdditionalStat key={idx} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
