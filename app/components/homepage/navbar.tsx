"use client";
import { UserButton } from "@clerk/react-router";
import { Github, Menu, X } from "lucide-react";
import React, { useCallback } from "react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

const menuItems = [
  { name: "Home", href: "#hero", icon: "🏠", description: "Welcome home" },
  { name: "Services", href: "/services", icon: "✂️", description: "Cuts & shaves" },
  { name: "Bar", href: "/bar", icon: "☕", description: "Coffee & spirits" },
  { name: "Community", href: "/foundation", icon: "🏆", description: "Foundation & events" },
  { name: "About", href: "#about", icon: "👨‍💼", description: "Shannon's story" },
  { name: "Membership", href: "/pricing", icon: "💎", description: "Join the family" },
];

export const Navbar = ({
  loaderData,
}: {
  loaderData?: { isSignedIn: boolean; hasActiveSubscription: boolean };
}) => {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = useCallback((href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
    setMenuState(false); // Close mobile menu
  }, []);

  // Simple computations don't need useMemo
  const dashboardLink = !loaderData?.isSignedIn 
    ? "/sign-up" 
    : loaderData.hasActiveSubscription ? "/dashboard" : "/pricing";

  const dashboardText = !loaderData?.isSignedIn 
    ? "Get Started (Demo)"
    : loaderData.hasActiveSubscription ? "Dashboard" : "Subscribe";
  return (
    <>
      {/* Mobile menu backdrop */}
      {menuState && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 lg:hidden" 
          onClick={() => setMenuState(false)}
        />
      )}
      
      <header>
        <nav
          data-state={menuState && "active"}
          className="fixed z-99 w-full px-2"
        >
        <div
          className={cn(
            "mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12",
            isScrolled &&
              "bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5"
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full justify-between lg:w-auto">
              <Link
                to="/"
                aria-label="home"
                className="flex items-center space-x-2 font-semibold text-xl"
                prefetch="viewport"
              >
                <img 
                  src="/images/barber-shop/timeout_logo_crop.png" 
                  alt="Timeout At Shannon's Logo" 
                  className="h-10 w-auto" 
                />
                <span className="hidden sm:inline text-primary font-bold">Timeout At Shannon's</span>
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState == true ? "Close Menu" : "Open Menu"}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden rounded-lg hover:bg-barber-brown-50 border border-transparent hover:border-barber-brown-200 transition-all duration-200"
              >
                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200 text-barber-brown-700" />
                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200 text-barber-brown-700" />
              </button>
            </div>

            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    {item.href.startsWith('#') ? (
                      <div
                        onClick={() => handleNavClick(item.href)}
                        className="hover:cursor-pointer text-muted-foreground hover:text-primary block duration-150 transition-colors"
                      >
                        <span>{item.name}</span>
                      </div>
                    ) : (
                      <Link
                        to={item.href}
                        className="text-muted-foreground hover:text-primary block duration-150 transition-colors"
                        prefetch="viewport"
                      >
                        <span>{item.name}</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-background via-barber-brown-25 to-barber-brown-50 in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-barber-brown-200 p-6 shadow-2xl shadow-barber-brown-300/30 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              <div className="lg:hidden w-full">
                {/* Mobile menu header */}
                <div className="mb-6 pb-4 border-b border-barber-brown-200">
                  <h3 className="text-lg font-semibold text-primary mb-1">Navigate</h3>
                  <p className="text-sm text-muted-foreground">Explore Timeout At Shannon's</p>
                </div>
                
                {/* Enhanced mobile menu items */}
                <ul className="space-y-3 mb-6">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      {item.href.startsWith('#') ? (
                        <button
                          onClick={() => handleNavClick(item.href)}
                          className="w-full p-3 rounded-lg bg-white/60 border border-barber-brown-100 hover:bg-barber-brown-50 hover:border-barber-brown-200 transition-all duration-200 group"
                        >
                          <div className="flex items-center space-x-3 text-left">
                            <span className="text-xl">{item.icon}</span>
                            <div className="flex-1">
                              <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                                {item.name}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {item.description}
                              </div>
                            </div>
                            <div className="w-2 h-2 rounded-full bg-barber-brown-300 group-hover:bg-primary transition-colors"></div>
                          </div>
                        </button>
                      ) : (
                        <Link
                          to={item.href}
                          className="block w-full p-3 rounded-lg bg-white/60 border border-barber-brown-100 hover:bg-barber-brown-50 hover:border-barber-brown-200 transition-all duration-200 group"
                          prefetch="viewport"
                          onClick={() => setMenuState(false)}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-xl">{item.icon}</span>
                            <div className="flex-1">
                              <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                                {item.name}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {item.description}
                              </div>
                            </div>
                            <div className="text-barber-brown-400 group-hover:text-primary transition-colors">
                              →
                            </div>
                          </div>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
                
                {/* Quick contact info in mobile menu */}
                <div className="p-3 rounded-lg bg-barber-green-50 border border-barber-green-200 mb-4">
                  <div className="text-center">
                    <div className="text-sm font-medium text-barber-green-800 mb-1">📞 Ready to book?</div>
                    <div className="text-sm text-barber-green-700">Call us: (555) 123-4567</div>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                {loaderData?.isSignedIn ? (
                  <div className="flex items-center gap-3">
                    <Button 
                      asChild 
                      size="sm" 
                      className="bg-primary hover:bg-barber-orange-500 shadow-sm transition-all duration-200"
                    >
                      <Link to={dashboardLink} prefetch="viewport">
                        <span>{dashboardText}</span>
                      </Link>
                    </Button>
                    <UserButton 
                      appearance={{
                        elements: {
                          avatarBox: "w-8 h-8 ring-2 ring-barber-brown-200 hover:ring-barber-brown-300 transition-all duration-200",
                          userButtonPopoverCard: "bg-background border border-border shadow-lg",
                          userButtonPopoverActions: "bg-background",
                          userButtonPopoverActionButton: "hover:bg-secondary transition-colors duration-200",
                          userButtonPopoverFooter: "bg-background",
                        }
                      }}
                    />
                  </div>
                ) : (
                  <>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className={cn(
                        "border-barber-brown-300 text-barber-brown-700 hover:bg-barber-brown-50 hover:text-barber-brown-800 hover:border-barber-brown-400 transition-all duration-200",
                        isScrolled && "lg:hidden"
                      )}
                    >
                      <Link to="/sign-in" prefetch="viewport">
                        <span>Login</span>
                      </Link>
                    </Button>
                    <Button
                      asChild
                      size="sm"
                      className={cn(
                        "bg-primary hover:bg-barber-orange-500 shadow-sm transition-all duration-200",
                        isScrolled && "lg:hidden"
                      )}
                    >
                      <Link to="/sign-up" prefetch="viewport">
                        <span>Sign Up</span>
                      </Link>
                    </Button>
                    <Button
                      asChild
                      size="sm"
                      className={cn(
                        "bg-primary hover:bg-barber-orange-500 shadow-sm transition-all duration-200",
                        isScrolled ? "lg:inline-flex" : "hidden"
                      )}
                    >
                      <Link to="/sign-up" prefetch="viewport">
                        <span>{dashboardText}</span>
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        </nav>
      </header>
    </>
  );
};
