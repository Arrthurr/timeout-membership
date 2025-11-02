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
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          {/* Background video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          >
            <source src="/SJ-Last-Chapter.mp4" type="video/mp4" />
          </video>
          
          {/* Gradient overlays for depth and readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-barber-brown-900/50 via-barber-brown-800/30 to-barber-brown-700/20 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-barber-brown-900/20 z-10"></div>
        </div>
        
        <div className="relative z-20 mx-auto max-w-5xl px-6 mt-[2rem]">
          <div className="grid items-center sm:grid-cols-2">
            <div className="relative mx-auto w-fit">
              {/* Left column intentionally left empty */}
            </div>
            <div className="mx-auto mt-6 max-w-lg space-y-6 text-center sm:mt-0 sm:text-left">
              <div className="flex justify-center sm:justify-start mb-4">
                <img
                  src="/images/barber-shop/timeout_logo_crop.png"
                  alt="Timeout At Shannon's Logo"
                  className="h-20 md:h-28 w-auto"
                />
              </div>
              <p className="text-muted-foreground text-lg">
                The sole desire of Timeout at Shannon's is to inspire our clientele to live a lifestyle that exceeds the boundaries others have erected around them and dare to walk their own path and create their own, with our professional clientele along with our staff training and community outreach.
              </p>
              <p className="text-muted-foreground text-lg">
                Our core values encompass grooming, lifestyle, and mental enrichment. It reflects our commitment to providing a comprehensive experience that goes beyond physical grooming.
              </p>

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
