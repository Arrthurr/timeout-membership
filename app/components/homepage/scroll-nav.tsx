import { useState, useEffect } from "react";
import { cn } from "~/lib/utils";
import { ChevronDown, Home, Eye, Star, Users, DollarSign } from "lucide-react";

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const navOffset = 80; // Account for navbar height
    const elementTop = element.offsetTop - navOffset;
    
    window.scrollTo({
      top: elementTop,
      behavior: 'smooth'
    });
  }
};

const sections = [
  { id: "hero", label: "Home", icon: Home, shortLabel: "Home" },
  { id: "discover", label: "Discover", icon: Eye, shortLabel: "Discover" },
  { id: "features", label: "Amenities", icon: Star, shortLabel: "Features" },
  { id: "team", label: "Values", icon: Users, shortLabel: "Values" },
  { id: "pricing", label: "Membership", icon: DollarSign, shortLabel: "Plans" }
];

export function ScrollNavigation() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120; // Offset for better detection
      
      // Show navigation after scrolling past the hero
      setIsVisible(window.scrollY > 200);
      
      // Find the active section
      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section.id);
        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Navigation - Fixed side navigation */}
      <div 
        className={cn(
          "fixed left-6 top-1/2 -translate-y-1/2 z-40 transition-all duration-300",
          "hidden lg:block",
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"
        )}
      >
        <div className="bg-background/80 backdrop-blur-md border border-border rounded-2xl p-2 shadow-lg">
          <nav className="space-y-1">
            {sections.map((section) => {
              const IconComponent = section.icon;
              const isActive = activeSection === section.id;
              
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    "flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                    "hover:bg-primary/10 hover:text-primary group",
                    isActive
                      ? "bg-primary/15 text-primary shadow-sm"
                      : "text-muted-foreground"
                  )}
                  title={section.label}
                >
                  <IconComponent 
                    className={cn(
                      "w-4 h-4 transition-colors",
                      isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                    )}
                  />
                  <span className={cn(
                    "transition-colors whitespace-nowrap",
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                  )}>
                    {section.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Navigation - Bottom fixed navigation */}
      <div 
        className={cn(
          "fixed bottom-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-300",
          "lg:hidden",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        <div className="bg-background/90 backdrop-blur-md border border-border rounded-2xl p-2 shadow-lg">
          <nav className="flex space-x-1">
            {sections.map((section) => {
              const IconComponent = section.icon;
              const isActive = activeSection === section.id;
              
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    "flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200",
                    "hover:bg-primary/10 hover:text-primary",
                    isActive
                      ? "bg-primary/15 text-primary shadow-sm"
                      : "text-muted-foreground"
                  )}
                  title={section.label}
                >
                  <IconComponent 
                    className={cn(
                      "w-4 h-4 transition-colors",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )}
                  />
                  <span className={cn(
                    "transition-colors leading-tight",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}>
                    {section.shortLabel}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Enhanced Hero Scroll Indicator */}
      <div 
        className={cn(
          "fixed bottom-8 left-1/2 -translate-x-1/2 z-30 transition-all duration-500",
          activeSection === "hero" ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <button
          onClick={() => scrollToSection("discover")}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
        >
          <div className="text-xs font-medium">Explore More</div>
          <div className="p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border group-hover:border-primary/50 group-hover:bg-primary/5 transition-all">
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </div>
        </button>
      </div>
    </>
  );
}

export default ScrollNavigation;
