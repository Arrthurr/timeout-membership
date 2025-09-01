import { 
  Heart, 
  Users, 
  Target, 
  Award, 
  TrendingUp, 
  MapPin, 
  Calendar,
  DollarSign,
  BookOpen,
  Handshake,
  ArrowRight,
  Star
} from "lucide-react";
import { FOUNDATION_INFO, FOUNDATION_IMPACT, FOUNDATION_PROGRAMS } from "~/lib/constants/foundation";

interface FoundationInfoProps {
  showFullDetails?: boolean;
  showImpactStories?: boolean;
  showPrograms?: boolean;
  showMetrics?: boolean;
  className?: string;
}

export function FoundationInfo({
  showFullDetails = true,
  showImpactStories = true,
  showPrograms = true,
  showMetrics = true,
  className = ""
}: FoundationInfoProps) {
  
  // Impact stories data
  const impactStories = [
    {
      id: 1,
      title: "Supporting Local Families",
      description: "Through our community programs, we've helped 75+ families access mental health resources and support services during challenging times.",
      icon: Heart,
      metric: "75+ Families Helped",
      color: "blue"
    },
    {
      id: 2,
      title: "Youth Leadership Development", 
      description: "Our mentorship programs have guided 50+ young people toward college and career success, with 100% of participants graduating high school.",
      icon: Users,
      metric: "50+ Youth Mentored",
      color: "green"
    },
    {
      id: 3,
      title: "Community Space Enhancement",
      description: "We've improved 15+ community spaces, creating safe and welcoming environments where neighbors can connect and build relationships.",
      icon: MapPin,
      metric: "15+ Spaces Enhanced",
      color: "purple"
    },
    {
      id: 4,
      title: "Educational Scholarships",
      description: "Since 2021, we've awarded $40,000 in scholarships to 16 college-bound students, removing financial barriers to higher education.",
      icon: BookOpen,
      metric: "$40k in Scholarships",
      color: "orange"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return {
          bg: "from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20",
          border: "border-blue-200 dark:border-blue-700",
          icon: "bg-blue-600",
          text: "text-blue-800 dark:text-blue-200",
          metric: "text-blue-600"
        };
      case "green":
        return {
          bg: "from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20",
          border: "border-green-200 dark:border-green-700", 
          icon: "bg-green-600",
          text: "text-green-800 dark:text-green-200",
          metric: "text-green-600"
        };
      case "purple":
        return {
          bg: "from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20",
          border: "border-purple-200 dark:border-purple-700",
          icon: "bg-purple-600", 
          text: "text-purple-800 dark:text-purple-200",
          metric: "text-purple-600"
        };
      case "orange":
        return {
          bg: "from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20",
          border: "border-orange-200 dark:border-orange-700",
          icon: "bg-orange-600",
          text: "text-orange-800 dark:text-orange-200", 
          metric: "text-orange-600"
        };
      default:
        return {
          bg: "from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20",
          border: "border-amber-200 dark:border-amber-700",
          icon: "bg-amber-600",
          text: "text-amber-800 dark:text-amber-200",
          metric: "text-amber-600"
        };
    }
  };

  return (
    <section className={`py-16 lg:py-20 bg-white dark:bg-slate-900 ${className}`}>
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <img
              src={FOUNDATION_INFO.logo}
              alt={FOUNDATION_INFO.name}
              className="mx-auto h-16 w-auto md:h-20 object-contain"
            />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-900 dark:text-amber-100 mb-4">
            Making a Real Difference
          </h2>
          <p className="text-xl md:text-2xl text-amber-600 dark:text-amber-400 font-medium mb-6">
            Community Impact Through the 20 Second Timeout Foundation
          </p>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Every day, we're working to build stronger communities through meaningful connections, 
              mental health support, and opportunities for growth. See how your support creates lasting change.
            </p>
          </div>
        </div>

        {/* Key Impact Metrics */}
        {showMetrics && (
          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-amber-900 dark:text-amber-100 text-center mb-12">
              Our Community Impact by the Numbers
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {FOUNDATION_IMPACT.statistics.map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-xl border border-slate-200 dark:border-slate-600 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="text-3xl md:text-4xl font-bold text-amber-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-slate-700 dark:text-slate-300 font-medium mb-2">
                    {stat.label}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Impact Stories */}
        {showImpactStories && (
          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-amber-900 dark:text-amber-100 text-center mb-12">
              Stories of Impact
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {impactStories.map((story) => {
                const IconComponent = story.icon;
                const colors = getColorClasses(story.color);
                
                return (
                  <div 
                    key={story.id}
                    className={`bg-gradient-to-br ${colors.bg} p-8 rounded-xl border ${colors.border} hover:shadow-lg transition-shadow duration-300`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`${colors.icon} text-white p-3 rounded-lg shrink-0`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div className="flex-grow">
                        <h4 className={`text-xl font-bold ${colors.text} mb-3`}>
                          {story.title}
                        </h4>
                        <p className={`${colors.text.replace('800', '700').replace('200', '300')} leading-relaxed mb-4`}>
                          {story.description}
                        </p>
                        <div className={`inline-flex items-center gap-2 ${colors.metric} font-bold text-lg`}>
                          <TrendingUp className="h-5 w-5" />
                          {story.metric}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Foundation Programs Overview */}
        {showPrograms && (
          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-amber-900 dark:text-amber-100 text-center mb-12">
              Our Core Programs
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {FOUNDATION_PROGRAMS.map((program) => {
                const getIcon = (iconName: string) => {
                  switch (iconName) {
                    case "Users": return Users;
                    case "Heart": return Heart;
                    case "Home": return MapPin;
                    case "Shield": return Award;
                    default: return Target;
                  }
                };
                
                const IconComponent = getIcon(program.icon);
                
                return (
                  <div 
                    key={program.id}
                    className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow duration-300 text-center"
                  >
                    <div className="bg-amber-100 dark:bg-amber-900/20 p-4 rounded-lg inline-flex mb-4">
                      <IconComponent className="h-8 w-8 text-amber-600" />
                    </div>
                    <h4 className="text-lg font-bold text-amber-900 dark:text-amber-100 mb-3">
                      {program.title}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                      {program.description}
                    </p>
                    <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-lg mb-4">
                      <div className="text-amber-600 font-bold text-lg mb-1">
                        {program.impact}
                      </div>
                      <div className="text-amber-700 dark:text-amber-300 text-xs">
                        Current Impact
                      </div>
                    </div>
                    <ul className="text-left space-y-1">
                      {program.highlights.slice(0, 3).map((highlight, index) => (
                        <li key={index} className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
                          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full shrink-0"></div>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Recognition & Achievements */}
        {showFullDetails && (
          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-amber-900 dark:text-amber-100 text-center mb-12">
              Recognition & Achievements
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20 rounded-xl border border-yellow-200 dark:border-yellow-700">
                <div className="bg-yellow-600 text-white p-3 rounded-lg inline-flex mb-4">
                  <Award className="h-6 w-6" />
                </div>
                <h4 className="text-lg font-bold text-yellow-900 dark:text-yellow-100 mb-2">
                  Community Excellence Award
                </h4>
                <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                  Recognized by the City for outstanding community service and impact in 2024.
                </p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20 rounded-xl border border-emerald-200 dark:border-emerald-700">
                <div className="bg-emerald-600 text-white p-3 rounded-lg inline-flex mb-4">
                  <Handshake className="h-6 w-6" />
                </div>
                <h4 className="text-lg font-bold text-emerald-900 dark:text-emerald-100 mb-2">
                  Partnership Network
                </h4>
                <p className="text-emerald-700 dark:text-emerald-300 text-sm">
                  Collaborating with 25+ local organizations to maximize community impact.
                </p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20 rounded-xl border border-rose-200 dark:border-rose-700">
                <div className="bg-rose-600 text-white p-3 rounded-lg inline-flex mb-4">
                  <Star className="h-6 w-6" />
                </div>
                <h4 className="text-lg font-bold text-rose-900 dark:text-rose-100 mb-2">
                  Volunteer Recognition
                </h4>
                <p className="text-rose-700 dark:text-rose-300 text-sm">
                  Our 180+ volunteers have logged over 5,000 hours of community service.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Foundation Goals & Vision */}
        {showFullDetails && (
          <div className="mb-16 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 p-8 md:p-12 rounded-xl border border-amber-200 dark:border-amber-700">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-amber-900 dark:text-amber-100 mb-8">
                Looking Forward: Our 2025 Goals
              </h3>
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div>
                  <div className="text-3xl font-bold text-amber-600 mb-2">1,500+</div>
                  <div className="text-amber-800 dark:text-amber-200 font-medium mb-2">People Served</div>
                  <div className="text-amber-700 dark:text-amber-300 text-sm">Expanding our reach by 20%</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-600 mb-2">$60k</div>
                  <div className="text-amber-800 dark:text-amber-200 font-medium mb-2">Scholarship Fund</div>
                  <div className="text-amber-700 dark:text-amber-300 text-sm">Supporting 6 students annually</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-600 mb-2">250+</div>
                  <div className="text-amber-800 dark:text-amber-200 font-medium mb-2">Active Volunteers</div>
                  <div className="text-amber-700 dark:text-amber-300 text-sm">Growing our volunteer base</div>
                </div>
              </div>
              <p className="text-lg text-amber-800 dark:text-amber-200 leading-relaxed">
                Together, we're building a stronger, more connected community where every person has the 
                support they need to thrive. Your involvement makes this vision a reality.
              </p>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-amber-900 dark:text-amber-100 mb-6">
            Join Our Community Impact
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
            Whether you volunteer, donate, or simply spread the word, every action contributes 
            to positive change in our community.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
              Volunteer With Us
              <ArrowRight className="h-4 w-4" />
            </button>
            <button className="bg-transparent border-2 border-amber-600 text-amber-700 dark:text-amber-300 hover:bg-amber-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2">
              Make a Donation
              <Heart className="h-4 w-4" />
            </button>
            <button className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2">
              Learn More
              <BookOpen className="h-4 w-4" />
            </button>
          </div>

          {/* Contact Info */}
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 max-w-lg mx-auto">
            <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-4">
              Get Connected
            </h4>
            <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center justify-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Established {FOUNDATION_INFO.establishedYear}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{FOUNDATION_INFO.address.city}, {FOUNDATION_INFO.address.state}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span>${FOUNDATION_IMPACT.totalFundsRaised.toLocaleString()} raised to date</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
