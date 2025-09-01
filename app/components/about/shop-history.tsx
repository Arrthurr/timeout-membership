import { Calendar, Award, Newspaper, TrendingUp, MapPin, Users, Star, Building } from "lucide-react";

interface ShopHistoryProps {
  variant?: 'full' | 'timeline' | 'summary';
  showMilestones?: boolean;
  showFoundingStory?: boolean;
  showRecognition?: boolean;
  className?: string;
}

export function ShopHistory({
  variant = 'full',
  showMilestones = true,
  showFoundingStory = true,
  showRecognition = true,
  className = ""
}: ShopHistoryProps) {

  const timelineEvents = [
    {
      year: "1990s",
      title: "The K-Town Foundation",
      description: "Shannon begins his journey in the basement of his childhood home in Chicago's K-Town neighborhood, creating an authentic barber salon that becomes the neighborhood's choice destination.",
      icon: Building,
      color: "amber",
      isFoundational: true
    },
    {
      year: "1998",
      title: "The Grand Opening",
      date: "February 24, 1998",
      description: "Timeout At Shannon's officially opens its doors. Initially amazed at the scope and nuance of Shannon's vision, visitors quickly become accustomed to the unprecedented level of service and care.",
      icon: Calendar,
      color: "blue",
      isFoundational: true
    },
    {
      year: "2002",
      title: "National Recognition",
      description: "A pivotal year: New City magazine votes Timeout At Shannon's as Chicago's hottest barbershop, while the Wall Street Journal features Shannon and the salon in a front-page story printed nationwide.",
      icon: Award,
      color: "green",
      achievements: ["New City Magazine: Chicago's Hottest Barbershop", "Wall Street Journal: Front-page Feature"]
    },
    {
      year: "2000s",
      title: "Media Spotlight",
      description: "The salon gains widespread media attention, featured in prestigious publications including Men's Health, Slam, Hoop, Sophisticate's Black Hair, Complete Women, Dime, and Salon Sense, plus a feature story on Chicago's Channel 7 ABC Nightly News.",
      icon: Newspaper,
      color: "purple",
      achievements: ["Men's Health Magazine", "Channel 7 ABC News", "Multiple National Publications"]
    },
    {
      year: "2010s",
      title: "Decade of Excellence",
      description: "Throughout the 2010s, Timeout At Shannon's continues to set the standard for premium barbering services, attracting celebrities, professional athletes, and Chicago's elite while maintaining its commitment to exceptional craftsmanship.",
      icon: TrendingUp,
      color: "indigo",
      achievements: ["Celebrity Clientele Growth", "Industry Leadership", "Chicago's Premier Destination"]
    },
    {
      year: "Present",
      title: "Living Legacy",
      description: "Today, Timeout At Shannon's stands as a testament to Shannon's original vision: an oasis of style, a touchstone of culture, and a meeting place for those who engage in the art of successful living.",
      icon: Star,
      color: "orange",
      isFoundational: true
    }
  ];

  const milestones = [
    {
      icon: MapPin,
      title: "From Basement to Boardroom",
      stat: "K-Town to National Fame",
      description: "From humble beginnings in a basement barbershop to national recognition"
    },
    {
      icon: Calendar,
      title: "25+ Years Strong",
      stat: "Since 1998",
      description: "Over a quarter-century of consistent excellence and innovation"
    },
    {
      icon: Award,
      title: "Industry Recognition",
      stat: "10+ Features",
      description: "Featured in major publications and television programs nationwide"
    },
    {
      icon: Users,
      title: "Elite Clientele",
      stat: "Celebrities & Athletes",
      description: "Serving Chicago's most notable figures and national celebrities"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "amber":
        return {
          bg: "from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20",
          border: "border-amber-200 dark:border-amber-700",
          icon: "bg-amber-600",
          accent: "text-amber-600"
        };
      case "blue":
        return {
          bg: "from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20",
          border: "border-blue-200 dark:border-blue-700",
          icon: "bg-blue-600",
          accent: "text-blue-600"
        };
      case "green":
        return {
          bg: "from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20",
          border: "border-green-200 dark:border-green-700",
          icon: "bg-green-600",
          accent: "text-green-600"
        };
      case "purple":
        return {
          bg: "from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20",
          border: "border-purple-200 dark:border-purple-700",
          icon: "bg-purple-600",
          accent: "text-purple-600"
        };
      case "indigo":
        return {
          bg: "from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20",
          border: "border-indigo-200 dark:border-indigo-700",
          icon: "bg-indigo-600",
          accent: "text-indigo-600"
        };
      case "orange":
        return {
          bg: "from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20",
          border: "border-orange-200 dark:border-orange-700",
          icon: "bg-orange-600",
          accent: "text-orange-600"
        };
      default:
        return {
          bg: "from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700",
          border: "border-slate-200 dark:border-slate-700",
          icon: "bg-slate-600",
          accent: "text-slate-600"
        };
    }
  };

  if (variant === 'summary') {
    return (
      <div className={`bg-white dark:bg-slate-900 p-6 md:p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 ${className}`}>
        <h3 className="text-2xl font-bold text-amber-900 dark:text-amber-100 mb-6">Our Story</h3>
        <div className="space-y-4">
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Since February 24, 1998, Timeout At Shannon's has been more than just a barbershop—it's been 
            a cultural institution. From Shannon's humble beginnings in a K-Town basement to national 
            recognition in the Wall Street Journal, our story is one of vision, dedication, and excellence.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {milestones.map((milestone, index) => {
              const IconComponent = milestone.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-amber-100 dark:bg-amber-900/20 p-3 rounded-lg inline-flex mb-2">
                    <IconComponent className="h-5 w-5 text-amber-600" />
                  </div>
                  <div className="text-sm font-bold text-amber-600">{milestone.stat}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">{milestone.title}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'timeline') {
    return (
      <div className={`${className}`}>
        <div className="max-w-4xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-12 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-amber-200 dark:bg-amber-700"></div>
          
          <div className="space-y-12">
            {timelineEvents.map((event, index) => {
              const IconComponent = event.icon;
              const colors = getColorClasses(event.color);
              const isEven = index % 2 === 0;
              
              return (
                <div key={index} className={`flex gap-8 items-start relative ${!isEven ? 'md:flex-row-reverse' : ''}`}>
                  <div className={`flex-shrink-0 w-24 text-center relative z-10 ${!isEven ? 'md:order-2' : ''}`}>
                    <div className={`${colors.icon} text-white px-3 py-2 rounded-lg font-bold shadow-lg text-sm`}>
                      {event.year}
                    </div>
                  </div>
                  <div className={`flex-grow bg-gradient-to-br ${colors.bg} p-6 rounded-xl shadow-lg border ${colors.border} md:w-1/2 ${!isEven ? 'md:order-1' : ''}`}>
                    <div className="flex items-start gap-3 mb-4">
                      <div className={`${colors.icon} text-white p-2 rounded-lg shrink-0`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className={`text-lg font-bold ${colors.accent.replace('text-', 'text-').replace('-600', '-800')} dark:${colors.accent.replace('-600', '-200')} mb-1`}>
                          {event.title}
                        </h3>
                        {event.date && (
                          <div className={`text-sm ${colors.accent} font-medium mb-2`}>{event.date}</div>
                        )}
                      </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                      {event.description}
                    </p>
                    {event.achievements && (
                      <div className="space-y-1">
                        {event.achievements.map((achievement, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 ${colors.icon} rounded-full`}></div>
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Full variant
  return (
    <section className={`py-16 lg:py-20 bg-slate-50 dark:bg-slate-800 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-900 dark:text-amber-100 mb-6">
              The Timeout At Shannon's Story
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-4xl mx-auto leading-relaxed">
              From a vision born in a Chicago basement to a nationally recognized institution, 
              our story spans over 25 years of excellence, innovation, and unwavering commitment 
              to the art of barbering.
            </p>
          </div>

          {/* Founding Story */}
          {showFoundingStory && (
            <div className="mb-20">
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 p-8 md:p-12 rounded-2xl border border-amber-200 dark:border-amber-700">
                <div className="max-w-4xl mx-auto text-center">
                  <div className="bg-amber-600 text-white p-4 rounded-full inline-flex mb-8">
                    <Building className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-amber-900 dark:text-amber-100 mb-6">
                    It All Started with a Vision
                  </h3>
                  <div className="space-y-6 text-lg text-amber-800 dark:text-amber-200 leading-relaxed">
                    <p>
                      In the basement of a family home in Chicago's K-Town neighborhood, Shannon Jones 
                      planted the seeds of what would become a legendary barbershop. It was more than 
                      just cutting hair—it was about creating a space where community, culture, and 
                      craftsmanship converged.
                    </p>
                    <p>
                      That basement wasn't just Shannon's first barbershop; it was his laboratory. 
                      Here, he honed his skills, developed his unique vision, and built the foundation 
                      for what would eventually become Chicago's most celebrated barbering destination.
                    </p>
                    <blockquote className="text-xl italic border-l-4 border-amber-400 pl-6 my-8">
                      "It was in that basement that Shannon first planted the seeds that would grow 
                      into the fruit of Timeout, honing his barbering skills while forming a unique vision."
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Key Milestones */}
          {showMilestones && (
            <div className="mb-20">
              <h3 className="text-2xl md:text-3xl font-bold text-amber-900 dark:text-amber-100 text-center mb-12">
                Key Milestones
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {milestones.map((milestone, index) => {
                  const IconComponent = milestone.icon;
                  return (
                    <div key={index} className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 text-center">
                      <div className="bg-amber-100 dark:bg-amber-900/20 p-4 rounded-lg inline-flex mb-4">
                        <IconComponent className="h-6 w-6 text-amber-600" />
                      </div>
                      <div className="text-2xl font-bold text-amber-600 mb-2">{milestone.stat}</div>
                      <h4 className="text-lg font-bold text-amber-900 dark:text-amber-100 mb-2">
                        {milestone.title}
                      </h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Historical Timeline */}
          <div className="mb-20">
            <h3 className="text-2xl md:text-3xl font-bold text-amber-900 dark:text-amber-100 text-center mb-16">
              Our Journey Through Time
            </h3>
            <ShopHistory variant="timeline" className="" />
          </div>

          {/* Recognition & Media Coverage */}
          {showRecognition && (
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-amber-900 dark:text-amber-100 text-center mb-12">
                Recognition & Media Coverage
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-blue-600 text-white p-3 rounded-lg">
                      <Award className="h-6 w-6" />
                    </div>
                    <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100">Industry Recognition</h4>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0"></div>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-slate-100">Wall Street Journal</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">Front-page national feature story (2002)</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0"></div>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-slate-100">New City Magazine</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">Chicago's Hottest Barbershop (2002)</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0"></div>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-slate-100">Channel 7 ABC News</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">Chicago television feature story</div>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-purple-600 text-white p-3 rounded-lg">
                      <Newspaper className="h-6 w-6" />
                    </div>
                    <h4 className="text-xl font-bold text-purple-900 dark:text-purple-100">Media Features</h4>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 shrink-0"></div>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-slate-100">Men's Health Magazine</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">National lifestyle publication feature</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 shrink-0"></div>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-slate-100">Sports Publications</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">Featured in Slam, Hoop, and Dime magazines</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 shrink-0"></div>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-slate-100">Beauty & Style</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">Sophisticate's Black Hair, Complete Women, Salon Sense</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Legacy Statement */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-8 md:p-12 rounded-2xl">
              <h3 className="text-2xl md:text-3xl font-bold mb-6">A Living Legacy</h3>
              <p className="text-xl leading-relaxed max-w-4xl mx-auto mb-8">
                Today, Timeout At Shannon's continues to embody Shannon's original vision: 
                an oasis of style, a touchstone of culture, and a meeting place for those 
                who engage in the art of successful living. Our story isn't just history—it's 
                a living testament to the power of vision, dedication, and excellence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-amber-600 hover:bg-amber-50 px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
                  Experience Our Legacy
                </button>
                <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-amber-600 px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
                  Book Your Visit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
