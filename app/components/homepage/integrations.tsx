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
        {/* Background imagery */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-barber-brown-900/40 via-barber-brown-800/30 to-transparent z-10"></div>
          <div className="w-full h-full bg-[url('/images/barber-shop/barber-chairs.jpg')] bg-cover bg-center bg-no-repeat opacity-15"></div>
        </div>
        
        <div className="relative z-20 mx-auto max-w-5xl px-6 mt-[2rem]">
          <div className="grid items-center sm:grid-cols-2">
            <div className="relative mx-auto w-fit">
              {/* Barber shop atmosphere showcase */}
              <div className="relative grid grid-cols-2 gap-4 p-6">
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

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
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
                    {loaderData?.isSignedIn
                      ? loaderData?.hasActiveSubscription
                        ? "View My Membership"
                        : "Join Today"
                      : "Become a Member"}
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link
                    to="#features"
                    prefetch="viewport"
                  >
                    View Services
                  </Link>
                </Button>
              </div>
              
              <div className="pt-2">
                <p className="text-xs text-muted-foreground">
                  Supporting Chicago's youth through the :20 Second Timeout Foundation
                </p>
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
