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
    <section id="hero" className="relative">
      <Navbar loaderData={loaderData} variant="transparent" />
      <div className="relative bg-muted dark:bg-background py-24 md:py-32 overflow-hidden pt-32">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          {/* Background video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          >
            <source src="/SJ-Last-Chapter.mp4" type="video/mp4" />
          </video>
          
          {/* Gradient overlays for depth and readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/10 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40 z-10"></div>
        </div>
        
        <div className="relative z-20 mx-auto max-w-5xl px-6 mt-[2rem]">
          <div className="grid items-center sm:grid-cols-2">
            <div className="relative mx-auto w-fit">
              {/* Left column intentionally left empty */}
            </div>
            <div className="mx-auto mt-6 max-w-lg space-y-6 text-center sm:mt-0 sm:text-left">
              <div className="flex justify-center sm:justify-start mb-4">
                <img
                  src="/images/timeout_logo_crop.png"
                  alt="Timeout At Shannon's Logo"
                  className="w-3/4 h-auto"
                />
              </div>
              <div className="space-y-3">
                <h1 className="text-white text-4xl font-semibold leading-tight sm:text-5xl">
                  Quiet luxury and crafted cuts without the fuss.
                </h1>
              </div>

              {/* Membership Outcomes */}
              <div className="grid gap-3 text-sm text-white/80">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-white/70" />
                  <span>Club access: lounge, bar, golf sim, and member events.</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-white/70" />
                  <span>Priority booking with master barbers and elevated amenities.</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-white/70" />
                  <span>Member perks that keep visits easy—drinks, comforts, and care.</span>
                </div>
              </div>

              {/* Enhanced Call-to-Action Buttons */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
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
                          : <>🚀 Join the Club</>
                        : <>🎯 Become a Member</>}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-barber-orange-600/20 via-transparent to-barber-orange-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                </Button>
                <button
                  className="text-white/80 text-sm underline-offset-4 hover:underline transition"
                  onClick={() => {
                    const element = document.getElementById('features');
                    if (element) {
                      const navOffset = 80;
                      const elementTop = element.offsetTop - navOffset;
                      window.scrollTo({ top: elementTop, behavior: 'smooth' });
                    }
                  }}
                >
                  See what’s inside
                </button>
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
