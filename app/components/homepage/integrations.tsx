import { memo } from "react";
import { Link } from "react-router";
import { LogoIcon } from "~/components/logo";
import {
  Convex,
  Polar,
  ReactIcon,
  ReactRouter,
  TailwindIcon,
  Typescript,
} from "~/components/logos";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { Navbar } from "./navbar";

export default function IntegrationsSection({
  loaderData,
}: {
  loaderData?: { isSignedIn: boolean; hasActiveSubscription: boolean };
}) {
  return (
    <section id="hero">
      <Navbar loaderData={loaderData} />
      <div className="relative bg-muted dark:bg-background py-24 md:py-32 overflow-hidden">
        {/* Enhanced Background imagery */}
        <div className="absolute inset-0 z-0">
          {/* Primary background image */}
          <div className="absolute inset-0 z-0">
            <div className="w-full h-full bg-[url('/images/barber-shop/barber-chairs.jpg')] bg-cover bg-center bg-no-repeat opacity-20"></div>
          </div>
          
          {/* Secondary atmosphere image - Chess area */}
          <div className="absolute top-0 right-0 w-1/2 h-full z-1">
            <div className="w-full h-full bg-[url('/images/barber-shop/chess-board-chairs.jpg')] bg-cover bg-left bg-no-repeat opacity-10"></div>
          </div>
          
          {/* Gradient overlays for depth and readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-barber-brown-900/50 via-barber-brown-800/30 to-barber-brown-700/20 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-barber-brown-900/20 z-10"></div>
        </div>
        
        <div className="relative z-20 mx-auto max-w-5xl px-6 mt-[2rem]">
          <div className="grid items-center sm:grid-cols-2">
            <div className="relative mx-auto w-fit">
              {/* Atmospheric decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-barber-orange-500/10 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-barber-brown-500/10 rounded-full blur-xl animate-pulse [animation-delay:1s]"></div>
              
              {/* Barber shop atmosphere showcase */}
              <div className="relative grid grid-cols-2 gap-4 p-6 backdrop-blur-sm">
                <div className="col-span-2 text-center mb-4">
                  <h3 className="text-lg font-semibold text-primary mb-2">The Timeout Experience</h3>
                </div>
                
                {/* Service highlights with icons */}
                <div className="bg-background/80 backdrop-blur-sm rounded-xl p-4 text-center border border-barber-brown-200">
                  <div className="text-2xl mb-2">✂️</div>
                  <p className="text-sm font-medium">Expert Cuts</p>
                  <p className="text-xs text-muted-foreground">Traditional & Modern</p>
                </div>
                
                <div className="bg-background/80 backdrop-blur-sm rounded-xl p-4 text-center border border-barber-brown-200">
                  <div className="text-2xl mb-2">🪒</div>
                  <p className="text-sm font-medium">Hot Shaves</p>
                  <p className="text-xs text-muted-foreground">Straight Razor</p>
                </div>
                
                <div className="bg-background/80 backdrop-blur-sm rounded-xl p-4 text-center border border-barber-brown-200">
                  <div className="text-2xl mb-2">☕</div>
                  <p className="text-sm font-medium">Coffee Bar</p>
                  <p className="text-xs text-muted-foreground">Premium Brews</p>
                </div>
                
                <div className="bg-background/80 backdrop-blur-sm rounded-xl p-4 text-center border border-barber-brown-200">
                  <div className="text-2xl mb-2">🥃</div>
                  <p className="text-sm font-medium">Select Spirits</p>
                  <p className="text-xs text-muted-foreground">Evening Relaxation</p>
                </div>
                
                {/* Additional atmosphere elements */}
                <div className="col-span-2 mt-4 text-center">
                  <div className="bg-barber-green-50 rounded-lg p-3 border border-barber-green-200">
                    <p className="text-sm font-medium text-barber-green-800">🏆 Community Champions</p>
                    <p className="text-xs text-barber-green-600">:20 Second Timeout Foundation</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto mt-6 max-w-lg space-y-6 text-center sm:mt-0 sm:text-left">
              <h2 className="text-balance text-3xl font-semibold md:text-4xl">
                Timeout At Shannon's
              </h2>
              <p className="text-muted-foreground text-lg">
                Where tradition meets excellence. Experience premium barber services in a warm, welcoming environment that feels like home.
              </p>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  ✂️ Expert cuts & shaves • ☕ Coffee & spirits bar • 🏆 Community focused
                </p>
              </div>

              {/* Membership Benefits Preview */}
              <div className="space-y-4">
                <div className="bg-background/80 backdrop-blur-sm rounded-lg p-4 border border-barber-orange-200">
                  <h4 className="text-sm font-semibold text-barber-orange-800 mb-3 flex items-center gap-2">
                    <span className="text-base">💎</span> Member Benefits
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-barber-orange-600 rounded-full"></span>
                      <span className="text-barber-orange-700">Service discounts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-barber-orange-600 rounded-full"></span>
                      <span className="text-barber-orange-700">Priority booking</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-barber-orange-600 rounded-full"></span>
                      <span className="text-barber-orange-700">Free bar drinks</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-barber-orange-600 rounded-full"></span>
                      <span className="text-barber-orange-700">Reward points</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Call-to-Action Buttons */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" asChild className="bg-primary hover:bg-primary/90 shadow-lg relative overflow-hidden group">
                  <Link
                    to={
                      loaderData?.isSignedIn
                        ? loaderData?.hasActiveSubscription
                          ? "/dashboard"
                          : "/pricing"
                        : "/pricing"
                    }
                    prefetch="viewport"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {loaderData?.isSignedIn
                        ? loaderData?.hasActiveSubscription
                          ? <>📋 View My Membership</>
                          : <>🚀 Join Today</>
                        : <>🎯 Become a Member</>}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-barber-orange-600/20 via-transparent to-barber-orange-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-barber-brown-300 hover:bg-barber-brown-50"
                  onClick={() => {
                    const element = document.getElementById('features');
                    if (element) {
                      const navOffset = 80;
                      const elementTop = element.offsetTop - navOffset;
                      window.scrollTo({ top: elementTop, behavior: 'smooth' });
                    }
                  }}
                >
                  <span className="flex items-center gap-2">
                    ✂️ View Services
                  </span>
                </Button>
              </div>
              
              {/* Value Proposition & Foundation */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="text-barber-green-600">💰</span>
                  <span>Save 20% annually • No commitment required</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="text-barber-green-600">🏆</span>
                  <span>Supporting Chicago's youth through the :20 Second Timeout Foundation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const IntegrationCard = memo(({
  children,
  className,
  borderClassName,
}: {
  children: React.ReactNode;
  className?: string;
  borderClassName?: string;
}) => {
  return (
    <div
      className={cn(
        "bg-background relative flex size-20 rounded-xl dark:bg-transparent",
        className
      )}
    >
      <div
        role="presentation"
        className={cn(
          "absolute inset-0 rounded-xl border border-black/20 dark:border-white/25",
          borderClassName
        )}
      />
      <div className="relative z-20 m-auto size-fit *:size-8">{children}</div>
    </div>
  );
});
