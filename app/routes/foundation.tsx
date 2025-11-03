import type { MetaFunction } from "react-router";
import { FoundationHero } from "~/components/foundation/hero";
import { CommunityPrograms } from "~/components/foundation/programs";
import { CommunityEvents } from "~/components/foundation/events";
import { ImpactMetrics } from "~/components/foundation/impact";

export const meta: MetaFunction = () => {
  return [
    { title: "20 Second Timeout Foundation | Community Impact & Programs" },
    { 
      name: "description", 
      content: "Supporting our community through youth development, mental health awareness, and meaningful connections. Join the 20 Second Timeout Foundation in making a difference." 
    },
    { property: "og:title", content: "20 Second Timeout Foundation | Community Impact & Programs" },
    { 
      property: "og:description", 
      content: "Supporting our community through youth development, mental health awareness, and meaningful connections. Join the 20 Second Timeout Foundation in making a difference." 
    },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "20 Second Timeout Foundation | Community Impact & Programs" },
    { 
      name: "twitter:description", 
      content: "Supporting our community through youth development, mental health awareness, and meaningful connections. Join the 20 Second Timeout Foundation in making a difference." 
    },
  ];
};

export default function Foundation() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Foundation Hero Section */}
      <FoundationHero />

      {/* Community Programs Section */}
      <CommunityPrograms />

      {/* Community Events Section */}
      <CommunityEvents />

      {/* Impact Metrics Section */}
      <ImpactMetrics />

      {/* Contact & Support Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-amber-600 to-orange-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Join Our Mission
            </h2>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-90">
              Together, we can create stronger, more connected communities. 
              Whether you volunteer, donate, or simply spread the word, 
              you're making a meaningful difference.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="bg-white/10 rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Volunteer</h3>
                <p className="opacity-80">Share your time and skills to support community programs</p>
              </div>
              <div className="text-center">
                <div className="bg-white/10 rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">💝</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Donate</h3>
                <p className="opacity-80">Contribute financially to fund our community initiatives</p>
              </div>
              <div className="text-center">
                <div className="bg-white/10 rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">📢</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Advocate</h3>
                <p className="opacity-80">Spread awareness about our mission and programs</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className="bg-white text-amber-600 hover:bg-amber-50 px-8 py-4 rounded-lg font-bold text-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
                Get Involved Today
              </button>
              <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-amber-600 px-8 py-4 rounded-lg font-bold text-lg transition-colors duration-200">
                Contact Foundation
              </button>
            </div>

            <div className="border-t border-white/20 pt-8 text-center opacity-80">
              <p className="mb-2">
                <strong>20 Second Timeout Foundation</strong>
              </p>
              <p className="mb-1">foundation@20secondtimeout.org | (555) 123-4567</p>
              <p>123 Community Way, Your City, State 12345</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
