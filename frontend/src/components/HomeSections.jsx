import React from "react";
import {
  Trash2,
  Droplet,
  Lightbulb,
  Users,
  ArrowRight,
  Star,
  Shield,
} from "lucide-react";
import { StatCard, FeatureCard, TestimonialCard } from "./HomeCards";

const HomeSections = ({
  testimonials,
  currentTestimonial,
  setCurrentTestimonial,
  onReportIssue,
  onJoinVolunteer,
}) => {
  return (
    <>
      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard number="10K+" label="Issues Reported" icon={Trash2} delay={0} />
            <StatCard number="5K+" label="Resolved Cases" icon={Shield} delay={0.2} />
            <StatCard number="50+" label="Communities Active" icon={Users} delay={0.4} />
            <StatCard number="95%" label="Citizen Satisfaction" icon={Star} delay={0.6} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Report & Resolve{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                City Issues
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              CleanStreet makes it easy for citizens to report problems and for
              authorities to take quick action.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Trash2}
              title="Garbage Dumps"
              description="Report overflowing bins and unhygienic garbage spots in your area."
              color="bg-gradient-to-br from-green-500 to-emerald-600"
              delay={0}
            />
            {/* <FeatureCard
              icon={Road}
              title="Potholes"
              description="Help make roads safer by reporting potholes and damaged streets."
              color="bg-gradient-to-br from-yellow-400 to-orange-500"
              delay={0.2}
            /> */}
            <FeatureCard
              icon={Droplet}
              title="Water Leakage"
              description="Stop water wastage by reporting broken pipelines and leaks."
              color="bg-gradient-to-br from-blue-400 to-blue-600"
              delay={0.4}
            />
            <FeatureCard
              icon={Lightbulb}
              title="Streetlights"
              description="Report faulty or broken streetlights for safer nights."
              color="bg-gradient-to-br from-purple-400 to-purple-600"
              delay={0.6}
            />
            <FeatureCard
              icon={Users}
              title="Community Volunteers"
              description="Join hands with local volunteers and be part of the change."
              color="bg-gradient-to-br from-pink-400 to-rose-500"
              delay={0.8}
            />
            <FeatureCard
              icon={Shield}
              title="Safe & Secure"
              description="All reports are verified and securely shared with the right authorities."
              color="bg-gradient-to-br from-green-400 to-teal-500"
              delay={1}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="py-20 bg-gradient-to-br from-slate-50 to-green-50"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Citizens & Communities
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              See how people are using CleanStreet to make their neighborhoods
              better.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <TestimonialCard {...testimonials[currentTestimonial]} />
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial
                      ? "bg-green-600"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Make Your City Cleaner?
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Join thousands of citizens who are already reporting and solving
              issues with CleanStreet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onReportIssue}
                className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center group"
              >
                Report an Issue
                <ArrowRight
                  size={20}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </button>
              <button
                onClick={onJoinVolunteer}
                className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors"
              >
                Join as Volunteer
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Trash2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">CleanStreet</span>
              </div>
              <p className="text-gray-400">
                Empowering communities to build cleaner, safer, and smarter
                cities together.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Report an Issue</li>
                <li>Volunteer</li>
                <li>Contact Us</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 CleanStreet. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default HomeSections;
