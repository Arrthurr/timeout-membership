import { Heart, Users, Award, Target, Mail, Phone } from "lucide-react";
import { FOUNDATION_INFO, FOUNDATION_IMPACT } from "~/lib/constants/foundation";

export function FoundationSection() {
  return (
    <section className="py-16 lg:py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <img
              src={FOUNDATION_INFO.logo}
              alt={FOUNDATION_INFO.name}
              className="mx-auto h-20 w-auto md:h-24 object-contain"
            />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-900 dark:text-amber-100 mb-4">
            The :20 Second Timeout Foundation
          </h2>
          <p className="text-xl md:text-2xl text-amber-600 dark:text-amber-400 font-medium mb-6">
            {FOUNDATION_INFO.tagline}
          </p>
          <div className="bg-amber-50 dark:bg-amber-950/20 p-6 md:p-8 rounded-xl border border-amber-200 dark:border-amber-700 max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-amber-800 dark:text-amber-300 leading-relaxed">
              {FOUNDATION_INFO.mission}
            </p>
          </div>
        </div>

        {/* Foundation Pillars */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-amber-900 dark:text-amber-100 text-center mb-12">
            Our Foundation Pillars
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-6 rounded-xl border border-blue-200 dark:border-blue-700 text-center">
              <div className="bg-blue-600 text-white p-3 rounded-lg inline-flex mb-4">
                <Heart className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-3">
                Mental Health Awareness
              </h4>
              <p className="text-blue-700 dark:text-blue-300 text-sm">
                Promoting mental wellness through education, resources, and community support networks.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 p-6 rounded-xl border border-green-200 dark:border-green-700 text-center">
              <div className="bg-green-600 text-white p-3 rounded-lg inline-flex mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-bold text-green-900 dark:text-green-100 mb-3">
                Community Connection
              </h4>
              <p className="text-green-700 dark:text-green-300 text-sm">
                Creating opportunities for meaningful connections and building stronger neighborhoods.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20 p-6 rounded-xl border border-purple-200 dark:border-purple-700 text-center">
              <div className="bg-purple-600 text-white p-3 rounded-lg inline-flex mb-4">
                <Award className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-bold text-purple-900 dark:text-purple-100 mb-3">
                Youth Development
              </h4>
              <p className="text-purple-700 dark:text-purple-300 text-sm">
                Supporting local youth through mentorship, education, and leadership opportunities.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 p-6 rounded-xl border border-orange-200 dark:border-orange-700 text-center">
              <div className="bg-orange-600 text-white p-3 rounded-lg inline-flex mb-4">
                <Target className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-bold text-orange-900 dark:text-orange-100 mb-3">
                Community Wellness
              </h4>
              <p className="text-orange-700 dark:text-orange-300 text-sm">
                Fostering overall community wellness through programs, events, and initiatives.
              </p>
            </div>
          </div>
        </div>

        {/* Impact Summary */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-amber-900 dark:text-amber-100 text-center mb-8">
            Our Impact in Numbers
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {FOUNDATION_IMPACT.statistics.map((stat, index) => (
              <div key={index} className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="text-2xl md:text-3xl font-bold text-amber-600 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why "20 Second Timeout" */}
        <div className="mb-16 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 p-8 md:p-12 rounded-xl border border-amber-200 dark:border-amber-700">
          <h3 className="text-2xl md:text-3xl font-bold text-amber-900 dark:text-amber-100 text-center mb-8">
            Why ":20 Second Timeout"?
          </h3>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-amber-800 dark:text-amber-300 leading-relaxed mb-6">
              In sports, a 20-second timeout is a brief moment to pause, regroup, and refocus. 
              Similarly, our foundation believes in the power of taking intentional moments to:
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-4xl mb-2">🤝</div>
                <h4 className="font-bold text-amber-900 dark:text-amber-100 mb-2">Connect</h4>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  Build meaningful relationships within our community
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">💭</div>
                <h4 className="font-bold text-amber-900 dark:text-amber-100 mb-2">Reflect</h4>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  Take time for mental wellness and personal growth
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🎯</div>
                <h4 className="font-bold text-amber-900 dark:text-amber-100 mb-2">Refocus</h4>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  Channel energy toward positive community impact
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-amber-900 dark:text-amber-100 mb-8">
            Connect with Our Foundation
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a 
              href={`mailto:${FOUNDATION_INFO.email}`}
              className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium transition-colors"
            >
              <Mail className="h-5 w-5" />
              {FOUNDATION_INFO.email}
            </a>
            <div className="hidden sm:block text-slate-400">|</div>
            <a 
              href={`tel:${FOUNDATION_INFO.phone}`}
              className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium transition-colors"
            >
              <Phone className="h-5 w-5" />
              {FOUNDATION_INFO.phone}
            </a>
          </div>
          
          {/* Address */}
          <div className="text-slate-600 dark:text-slate-400 mb-8">
            <p>{FOUNDATION_INFO.address.street}</p>
            <p>{FOUNDATION_INFO.address.city}, {FOUNDATION_INFO.address.state} {FOUNDATION_INFO.address.zipCode}</p>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl">
              Get Involved Today
            </button>
            <button className="bg-transparent border-2 border-amber-600 text-amber-700 dark:text-amber-300 hover:bg-amber-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
              Make a Donation
            </button>
          </div>

          {/* Established */}
          <div className="mt-8 pt-8 border-t border-amber-200 dark:border-amber-700">
            <p className="text-amber-600 dark:text-amber-400 font-medium">
              Proudly serving our community since {FOUNDATION_INFO.establishedYear}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
