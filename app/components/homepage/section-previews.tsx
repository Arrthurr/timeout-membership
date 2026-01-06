import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { ArrowRight, Scissors, Coffee, Users, User, Star } from "lucide-react";

export default function SectionPreviews() {
  const sections = [
    {
      id: "services",
      title: "Expert Services",
      description: "Traditional cuts, hot shaves, and modern styling with sports-themed flair",
      icon: Scissors,
      link: "/services",
      color: "barber-brown",
      highlights: ["$35-$150 range", "10 unique services", "Sports themes"],
      image: "/images/barber-chairs.jpg"
    },
    {
      id: "cafe",
      title: "Out of Bounds Café",
      description: "Premium coffee and select spirits to complement your experience",
      icon: Coffee,
      link: "/cafe",
      color: "barber-orange", 
      highlights: ["Specialty coffee", "Select spirits", "Member perks"],
      image: "/images/coffee-bar.jpg"
    },
    {
      id: "community",
      title: "Community Hub",
      description: "Events, tournaments, and the :20 Second Timeout Foundation",
      icon: Users,
      link: "/community",
      color: "barber-green",
      highlights: ["Chess tournaments", "Youth foundation", "Community events"],
      image: "/images/chess-board-chairs.jpg"
    },
    {
      id: "about",
      title: "Our Story",
      description: "Meet Shannon Jones and discover the heart behind Timeout At Shannon's",
      icon: User,
      link: "/about",
      color: "slate",
      highlights: ["Master barber", "Chicago heritage", "Community focused"],
      image: "/images/shannon-jones-portrait.jpg"
    },
    {
      id: "membership",
      title: "Membership Tiers",
      description: "Exclusive benefits, discounts, and VIP treatment for our members",
      icon: Star,
      link: "#pricing",
      color: "barber-green",
      highlights: ["20% savings", "Priority booking", "Exclusive perks"],
      image: "/images/membership-card.jpg"
    }
  ];

  return (
    <section id="discover" className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Discover What Makes Us Special
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From expert services to community spirit, explore all the ways Timeout At Shannon's 
            creates an exceptional experience for every guest.
          </p>
        </div>

        {/* Section Previews Grid */}
        <div className="grid gap-6 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            const colorClasses = {
              'barber-brown': 'border-barber-brown-200 hover:border-barber-brown-300 bg-barber-brown-50/50',
              'barber-orange': 'border-barber-orange-200 hover:border-barber-orange-300 bg-barber-orange-50/50',
              'barber-green': 'border-barber-green-200 hover:border-barber-green-300 bg-barber-green-50/50',
              'slate': 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
            };

            const iconColorClasses = {
              'barber-brown': 'text-barber-brown-600 bg-barber-brown-100',
              'barber-orange': 'text-barber-orange-600 bg-barber-orange-100', 
              'barber-green': 'text-barber-green-600 bg-barber-green-100',
              'slate': 'text-slate-600 bg-slate-100'
            };

            return (
              <Card 
                key={section.id}
                className={`group relative overflow-hidden transition-all duration-300 hover:shadow-lg ${colorClasses[section.color as keyof typeof colorClasses] || colorClasses.slate}`}
              >
                {/* Background Image */}
                <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                  <img 
                    src={section.image} 
                    alt={`${section.title} preview`}
                    className="w-full h-full object-cover"
                  />
                </div>

                <CardHeader className="relative z-10">
                  <div className="flex items-center gap-4 mb-3">
                    <div className={`p-2 rounded-lg ${iconColorClasses[section.color as keyof typeof iconColorClasses] || iconColorClasses.slate}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {section.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-muted-foreground text-sm leading-relaxed">
                    {section.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10">
                  {/* Highlights */}
                  <div className="space-y-2 mb-6">
                    {section.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          section.color === 'barber-brown' ? 'bg-barber-brown-500' :
                          section.color === 'barber-orange' ? 'bg-barber-orange-500' :
                          section.color === 'barber-green' ? 'bg-barber-green-500' :
                          'bg-slate-500'
                        }`}></span>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  {section.link.startsWith('#') ? (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="group/btn w-full justify-between text-foreground hover:text-primary hover:bg-primary/5"
                      onClick={() => {
                        const targetId = section.link.substring(1);
                        const element = document.getElementById(targetId);
                        if (element) {
                          const navOffset = 80;
                          const elementTop = element.offsetTop - navOffset;
                          window.scrollTo({ top: elementTop, behavior: 'smooth' });
                        }
                      }}
                    >
                      <span>Explore {section.title}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  ) : (
                    <Button 
                      asChild 
                      variant="ghost" 
                      size="sm" 
                      className="group/btn w-full justify-between text-foreground hover:text-primary hover:bg-primary/5"
                    >
                      <Link to={section.link} prefetch="viewport">
                        <span>Explore {section.title}</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 bg-barber-green-50 text-barber-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span className="text-base">🎯</span>
            <span>Ready to get started?</span>
          </div>
          <div className="space-y-3">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/pricing" prefetch="viewport">
                <span>Join Our Community</span>
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground">
              Or <Link to="/services" className="underline hover:text-primary">book a service</Link> to experience us first-hand
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
