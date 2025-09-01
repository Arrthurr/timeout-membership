import { Award, GraduationCap, Users, Star, MapPin, Calendar } from "lucide-react";

interface OwnerBioProps {
  variant?: 'full' | 'compact' | 'sidebar';
  showImage?: boolean;
  showStats?: boolean;
  showQuote?: boolean;
  className?: string;
}

export function OwnerBio({ 
  variant = 'full',
  showImage = true,
  showStats = true,
  showQuote = true,
  className = ""
}: OwnerBioProps) {
  
  const achievements = [
    {
      icon: GraduationCap,
      title: "Pivot Point International",
      description: "Graduate with top honors from Chicago's premier barbering school",
      year: "Early Career"
    },
    {
      icon: Users,
      title: "Arthur Johnson Mentorship",
      description: "Trained under one of Chicago's most respected stylists at Ajes Salon",
      year: "Professional Training"
    },
    {
      icon: Star,
      title: "Elite Clientele",
      description: "Built reputation serving celebrities, athletes, and Chicago's notable figures",
      year: "Career Growth"
    },
    {
      icon: Award,
      title: "National Recognition",
      description: "Featured in Wall Street Journal, Men's Health, and major publications",
      year: "Industry Leader"
    }
  ];

  const keyStats = [
    { label: "Years of Excellence", value: "25+", icon: Calendar },
    { label: "Established", value: "1998", icon: MapPin },
    { label: "Media Features", value: "10+", icon: Star },
    { label: "Industry Leader", value: "Chicago", icon: Award }
  ];

  if (variant === 'compact') {
    return (
      <div className={`bg-white dark:bg-slate-900 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 ${className}`}>
        <div className="flex gap-4 items-start">
          {showImage && (
            <div className="flex-shrink-0">
              <img
                src="/images/barber-shop/shannon-jones-portrait.jpg"
                alt="Shannon Jones - Master Barber"
                className="w-20 h-20 rounded-lg object-cover"
              />
            </div>
          )}
          <div className="flex-grow">
            <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-2">
              Shannon Jones
            </h3>
            <p className="text-amber-600 font-medium mb-3">Master Barber & Founder</p>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Born and raised in Chicago's K-Town, Shannon has dedicated over 25 years to creating 
              an oasis of style and culture at Timeout At Shannon's.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'sidebar') {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="text-center">
          {showImage && (
            <img
              src="/images/barber-shop/shannon-jones-portrait.jpg"
              alt="Shannon Jones - Master Barber"
              className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-amber-200 dark:border-amber-700"
            />
          )}
          <h3 className="text-lg font-bold text-amber-900 dark:text-amber-100 mb-1">
            Shannon Jones
          </h3>
          <p className="text-amber-600 font-medium mb-3">Master Barber & Founder</p>
        </div>
        
        {showStats && (
          <div className="space-y-3">
            {keyStats.slice(0, 2).map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="flex items-center gap-3">
                  <div className="bg-amber-100 dark:bg-amber-900/20 p-2 rounded-lg">
                    <IconComponent className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <div className="font-bold text-amber-900 dark:text-amber-100">{stat.value}</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {showQuote && (
          <blockquote className="text-sm text-slate-600 dark:text-slate-400 italic border-l-4 border-amber-200 dark:border-amber-700 pl-4">
            "For me, the job of a barber doesn't end with a haircut. It's about embodying the culture 
            and social importance of the barbershop as a vital institution."
          </blockquote>
        )}
      </div>
    );
  }

  // Full variant
  return (
    <section className={`py-16 lg:py-20 bg-white dark:bg-slate-900 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-900 dark:text-amber-100 mb-6">
              Meet the Master
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Shannon Jones' journey from Chicago's K-Town neighborhood to becoming a nationally 
              recognized master barber is a story of passion, dedication, and unwavering excellence.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
            {/* Profile Section */}
            <div>
              {showImage && (
                <div className="relative mb-8">
                  <div className="aspect-[4/5] max-w-sm mx-auto bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-2xl overflow-hidden">
                    <img
                      src="/images/barber-shop/shannon-jones-portrait.jpg"
                      alt="Shannon Jones - Master Barber and Founder"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 text-white">
                      <div className="text-sm opacity-90">Shannon Jones</div>
                      <div className="text-lg font-semibold">Master Barber & Founder</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Key Stats */}
              {showStats && (
                <div className="grid grid-cols-2 gap-4">
                  {keyStats.map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                      <div key={index} className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                        <div className="bg-amber-100 dark:bg-amber-900/20 p-3 rounded-lg inline-flex mb-3">
                          <IconComponent className="h-5 w-5 text-amber-600" />
                        </div>
                        <div className="text-2xl font-bold text-amber-600 mb-1">{stat.value}</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Biography Content */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-amber-900 dark:text-amber-100 mb-4">
                  The Journey Begins
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Born and raised on Chicago's West Side in the infamous K-Town neighborhood, 
                  Shannon Jones began his extraordinary journey in the most humble of settings—his 
                  childhood home's basement. What started as a makeshift barber salon would become 
                  the foundation of his legendary career.
                </p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  In that basement, Shannon didn't just cut hair; he cultivated relationships, 
                  honed his craft, and developed the vision that would eventually transform the 
                  barbering industry in Chicago and beyond.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-amber-900 dark:text-amber-100 mb-4">
                  Professional Excellence
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Shannon's commitment to excellence led him to Chicago's prestigious Pivot Point 
                  International, where his tremendous talent was immediately recognized. Graduating 
                  among the top of his class, he caught the attention of industry leaders.
                </p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Under the mentorship of Arthur Johnson, owner of Ajes Salon and one of Chicago's 
                  most respected stylists, Shannon mastered not just the technical aspects of 
                  barbering, but the art of creating an unparalleled client experience.
                </p>
              </div>

              {showQuote && (
                <blockquote className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 p-6 rounded-xl border-l-4 border-amber-400">
                  <p className="text-lg text-amber-800 dark:text-amber-200 italic leading-relaxed mb-4">
                    "For Shannon Jones, the job of a barber doesn't end with a haircut. Instead, 
                    he has dedicated his life to a career that embodies the culture and social 
                    importance of the barbershop as a vital institution."
                  </p>
                  <cite className="text-sm text-amber-600 dark:text-amber-400">- Shannon's Philosophy</cite>
                </blockquote>
              )}
            </div>
          </div>

          {/* Professional Achievements */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-amber-900 dark:text-amber-100 text-center mb-12">
              Professional Journey
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => {
                const IconComponent = achievement.icon;
                return (
                  <div key={index} className="text-center p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="bg-amber-600 text-white p-4 rounded-lg inline-flex mb-4">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h4 className="text-lg font-bold text-amber-900 dark:text-amber-100 mb-2">
                      {achievement.title}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
                      {achievement.description}
                    </p>
                    <span className="text-xs text-amber-600 font-medium bg-amber-100 dark:bg-amber-900/20 px-3 py-1 rounded-full">
                      {achievement.year}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legacy Section */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 p-8 md:p-12 rounded-xl border border-amber-200 dark:border-amber-700">
              <h3 className="text-2xl md:text-3xl font-bold text-amber-900 dark:text-amber-100 mb-6">
                Building a Legacy
              </h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8 max-w-4xl mx-auto">
                Over the course of his career, Shannon positioned himself as one of Chicago's premiere 
                barbers, attracting an enormous and diverse clientele that included celebrities, 
                professional athletes, and some of Chicago's most notable business and community figures. 
                But his greatest achievement isn't just the clients he's served—it's the culture he's created.
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <div className="text-3xl font-bold text-amber-600 mb-2">1998</div>
                  <div className="text-amber-800 dark:text-amber-200 font-medium">Founded Timeout</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-600 mb-2">25+</div>
                  <div className="text-amber-800 dark:text-amber-200 font-medium">Years of Excellence</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-600 mb-2">Chicago</div>
                  <div className="text-amber-800 dark:text-amber-200 font-medium">Premier Destination</div>
                </div>
              </div>
            </div>
          </div>

          {/* Vision Statement */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-amber-900 dark:text-amber-100 mb-6">
              The Timeout Vision
            </h3>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-4xl mx-auto">
              Shannon has given the barbering industry a look at the future, creating in Timeout 
              an oasis of style, a touchstone of culture, and a meeting place for those who wish 
              to engage in the art of successful living. This isn't just a barbershop—it's a 
              testament to the power of vision, dedication, and the belief that excellence in 
              craft can transform communities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
