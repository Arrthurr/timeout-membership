import { TrendingUp, Users, DollarSign, Calendar, Handshake, Award } from "lucide-react";
import { FOUNDATION_IMPACT, VOLUNTEER_OPPORTUNITIES, DONATION_TIERS } from "~/lib/constants/foundation";

export function ImpactMetrics() {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}k`;
    }
    return num.toString();
  };

  const getStatIcon = (label: string) => {
    if (label.includes("Members") || label.includes("Volunteers")) return Users;
    if (label.includes("Funds")) return DollarSign;
    if (label.includes("Events")) return Calendar;
    if (label.includes("Partnerships")) return Handshake;
    if (label.includes("Programs")) return Award;
    return TrendingUp;
  };

  return (
    <section className="py-16 lg:py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-900 dark:text-amber-100 mb-4">
            Our Impact
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Together, we're making a measurable difference in our community. 
            See how your support translates into real, positive change.
          </p>
        </div>

        {/* Main Impact Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
          {FOUNDATION_IMPACT.statistics.map((stat, index) => {
            const IconComponent = getStatIcon(stat.label);
            return (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 p-6 rounded-xl border border-amber-200 dark:border-amber-700 group-hover:shadow-lg transition-shadow duration-300">
                  <div className="bg-amber-600 text-white p-3 rounded-lg inline-flex mb-4">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-amber-900 dark:text-amber-100 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-amber-700 dark:text-amber-300 font-medium mb-2">
                    {stat.label}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    {stat.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Volunteer Opportunities Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-amber-900 dark:text-amber-100 mb-4">
              Get Involved
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Join our community of dedicated volunteers making a difference. 
              Find the perfect opportunity that matches your skills and schedule.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VOLUNTEER_OPPORTUNITIES.slice(0, 3).map((opportunity) => (
              <div 
                key={opportunity.id}
                className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow duration-300"
              >
                <h4 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-3">
                  {opportunity.title}
                </h4>
                <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                  {opportunity.description}
                </p>
                <div className="mb-4">
                  <div className="text-sm font-medium text-amber-700 dark:text-amber-300 mb-2">
                    Time Commitment: {opportunity.timeCommitment}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {opportunity.skills.map((skill, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 text-xs font-medium rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg font-semibold transition-colors duration-200">
                  Learn More
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="bg-transparent border-2 border-amber-600 text-amber-700 dark:text-amber-300 hover:bg-amber-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
              View All Volunteer Opportunities
            </button>
          </div>
        </div>

        {/* Donation Impact Section */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 p-8 md:p-12 rounded-xl border border-amber-200 dark:border-amber-700">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-amber-900 dark:text-amber-100 mb-4">
              Make Your Impact
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Every donation, no matter the size, contributes to meaningful change in our community. 
              Choose a giving level that works for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DONATION_TIERS.slice(0, 3).map((tier) => (
              <div 
                key={tier.id}
                className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow duration-300 text-center"
              >
                <h4 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-2">
                  {tier.title}
                </h4>
                <div className="text-3xl font-bold text-amber-600 mb-4">
                  ${tier.amount}
                </div>
                <ul className="text-left space-y-2 mb-6">
                  {tier.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 shrink-0"></div>
                      <span className="text-slate-600 dark:text-slate-400 text-sm">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg font-semibold transition-colors duration-200">
                  Donate Now
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="bg-transparent border-2 border-amber-600 text-amber-700 dark:text-amber-300 hover:bg-amber-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
              View All Giving Levels
            </button>
          </div>
        </div>

        {/* Key Achievements */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-amber-900 dark:text-amber-100 mb-8">
            Key Achievements This Year
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 p-6 rounded-xl border border-green-200 dark:border-green-700">
              <div className="text-2xl font-bold text-green-800 dark:text-green-200 mb-2">
                ${formatNumber(FOUNDATION_IMPACT.totalFundsRaised)}
              </div>
              <div className="text-sm text-green-600 dark:text-green-400">
                Total Funds Raised
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 p-6 rounded-xl border border-blue-200 dark:border-blue-700">
              <div className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-2">
                {FOUNDATION_IMPACT.communityMembersServed}+
              </div>
              <div className="text-sm text-blue-600 dark:text-blue-400">
                People Served
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20 p-6 rounded-xl border border-purple-200 dark:border-purple-700">
              <div className="text-2xl font-bold text-purple-800 dark:text-purple-200 mb-2">
                {FOUNDATION_IMPACT.volunteersEngaged}+
              </div>
              <div className="text-sm text-purple-600 dark:text-purple-400">
                Active Volunteers
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 p-6 rounded-xl border border-orange-200 dark:border-orange-700">
              <div className="text-2xl font-bold text-orange-800 dark:text-orange-200 mb-2">
                {FOUNDATION_IMPACT.partnershipsFormed}+
              </div>
              <div className="text-sm text-orange-600 dark:text-orange-400">
                Community Partnerships
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
