import { FOUNDATION_INFO, FOUNDATION_IMPACT } from "~/lib/constants/foundation";

export function FoundationHero() {
  return (
    <section className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="text-center max-w-4xl mx-auto">
          {/* Foundation Logo */}
          <div className="mb-8">
            <img
              src={FOUNDATION_INFO.logo}
              alt={FOUNDATION_INFO.name}
              className="mx-auto h-24 w-auto md:h-32 lg:h-40 object-contain"
            />
          </div>

          {/* Foundation Name & Tagline */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-amber-900 dark:text-amber-100 mb-4">
              {FOUNDATION_INFO.name}
            </h1>
            <p className="text-xl md:text-2xl text-amber-700 dark:text-amber-200 font-medium">
              {FOUNDATION_INFO.tagline}
            </p>
          </div>

          {/* Mission Statement */}
          <div className="mb-12">
            <p className="text-lg md:text-xl text-amber-800 dark:text-amber-300 leading-relaxed max-w-3xl mx-auto">
              {FOUNDATION_INFO.mission}
            </p>
          </div>

          {/* Key Impact Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
            {FOUNDATION_IMPACT.statistics.slice(0, 6).map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/50 dark:bg-amber-900/20 rounded-lg p-4 border border-amber-200 dark:border-amber-700">
                  <div className="text-2xl md:text-3xl font-bold text-amber-900 dark:text-amber-100 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-amber-700 dark:text-amber-300 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl">
              Get Involved
            </button>
            <button className="bg-transparent border-2 border-amber-600 text-amber-700 dark:text-amber-300 hover:bg-amber-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
              Learn More
            </button>
          </div>

          {/* Established Year */}
          <div className="mt-8 pt-8 border-t border-amber-200 dark:border-amber-700">
            <p className="text-amber-600 dark:text-amber-400 font-medium">
              Established {FOUNDATION_INFO.establishedYear}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
