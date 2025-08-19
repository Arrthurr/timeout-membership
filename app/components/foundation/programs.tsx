import { Users, Heart, Home, Shield } from "lucide-react";
import { FOUNDATION_PROGRAMS } from "~/lib/constants/foundation";

const IconMap = {
  Users: Users,
  Heart: Heart,
  Home: Home,
  Shield: Shield,
};

export function CommunityPrograms() {
  return (
    <section className="py-16 lg:py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-900 dark:text-amber-100 mb-4">
            Community Programs
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Our comprehensive programs address the diverse needs of our community, 
            from youth development to senior support, creating lasting positive impact.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12">
          {FOUNDATION_PROGRAMS.map((program) => {
            const IconComponent = IconMap[program.icon as keyof typeof IconMap];
            
            return (
              <div 
                key={program.id} 
                className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/10 dark:to-orange-950/10 p-8 rounded-xl border border-amber-200 dark:border-amber-800 hover:shadow-lg transition-shadow duration-300"
              >
                {/* Program Icon & Title */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-amber-600 text-white p-3 rounded-lg shrink-0">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-amber-900 dark:text-amber-100 mb-2">
                      {program.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {program.description}
                    </p>
                  </div>
                </div>

                {/* Program Highlights */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-amber-800 dark:text-amber-200 mb-3">
                    Program Highlights:
                  </h4>
                  <ul className="space-y-2">
                    {program.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 shrink-0"></div>
                        <span className="text-slate-700 dark:text-slate-300">
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Impact Metric */}
                <div className="bg-white/50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-700">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber-900 dark:text-amber-100 mb-1">
                      {program.impact}
                    </div>
                    <div className="text-sm text-amber-700 dark:text-amber-300">
                      Community Impact
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Get Involved Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-950/20 dark:to-orange-950/20 p-8 md:p-12 rounded-xl border border-amber-200 dark:border-amber-700">
          <h3 className="text-2xl md:text-3xl font-bold text-amber-900 dark:text-amber-100 mb-4">
            Ready to Make a Difference?
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
            Join us in creating positive change in our community. Whether through volunteering, 
            donations, or participating in our programs, every contribution matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl">
              Volunteer Today
            </button>
            <button className="bg-transparent border-2 border-amber-600 text-amber-700 dark:text-amber-300 hover:bg-amber-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
              Support Programs
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
