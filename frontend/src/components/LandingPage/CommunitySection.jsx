import React, { useState } from "react";
import FeatureList from "./CommunityFeatureList";
import CTAButtons from "./CTAButtons";
import PlatformInfo from "./PlatformInfo";
import FloatingStat from "./FloatingStat";

export default function CommunitySection() {
  const [imgError, setImgError] = useState(false);
  const imageUrl =
    "https://images.unsplash.com/photo-1560220604-1985ebfe28b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBwZW9wbGUlMjB2b2x1bnRlZXJpbmclMjB0b2dldGhlcnxlbnwxfHx8fDE3NTc2NjM1NzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

  return (
    <section className="py-20 bg-gradient-to-br from-purple-600 via-blue-600 to-green-600 relative overflow-hidden" id="community">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl font-bold leading-tight">
                Ready to Transform Your Community?
              </h2>
              <p className="text-xl text-purple-100 leading-relaxed">
                Join thousands of active citizens who are making their neighborhoods cleaner, safer, and more responsive. Your voice matters, and together we can create lasting change.
              </p>
            </div>

            <FeatureList />
            <CTAButtons />
            <PlatformInfo />
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={imgError ? "https://via.placeholder.com/500x400?text=Image+Unavailable" : imageUrl}
                alt="Community volunteering together"
                className="w-full h-96 lg:h-[500px] object-cover"
                onError={() => setImgError(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent"></div>
            </div>

            <FloatingStat position="topRight" color="green" value="+127 Reports Today" />
            <FloatingStat position="bottomLeft" color="pulse" value="89% Resolved" />
          </div>
        </div>
      </div>
    </section>
  );
}
