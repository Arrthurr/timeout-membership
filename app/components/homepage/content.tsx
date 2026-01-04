import { Button } from "~/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router";

export default function ContentSection() {
  return (
    <section id="features" className="py-16 md:py-32 bg-background">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-primary">
            Built as a club, not just a chair
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Modern-minimal spaces, crafted service, and room to linger. Membership gives you the run of the lounge, not just a booking slot.
          </p>
        </div>

        <div className="grid gap-14 md:gap-16">
          {/* Club Atmosphere */}
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="relative order-2 md:order-1">
              <img
                src="/images/barber-shop/barber-chairs.jpg"
                alt="Lounge seating and barber chairs"
                className="w-full h-[400px] object-cover rounded-xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
            </div>
            <div className="space-y-5 order-1 md:order-2">
              <h3 className="text-3xl font-semibold">A lounge built to stay awhile</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Quiet rooms, crafted seating, and an elevated bar program. Your membership is access to a calm, polished space—not a rushed appointment.
              </p>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>Priority booking with master barbers and attentive hosts.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>Signature amenities every visit—hot towels, premium products, and curated refreshments.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>Stay before and after: lounge seating, coffee, and conversation at your pace.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Club Activities */}
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <h3 className="text-3xl font-semibold">What you can do here</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Move at your own pace—practice on the golf simulator, play a game of chess, or simply settle in with a drink between meetings.
              </p>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>Member-only golf simulator and games that spark conversation.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>Comfortable seating everywhere—choose quiet or social corners.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>Always-on hospitality: bar service, crafted coffee, and staff who know your preferences.</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <img
                src="/images/barber-shop/chess-board-pictures.jpg"
                alt="Chess boards and comfortable chairs at Timeout At Shannon's"
                className="w-full h-[400px] object-cover rounded-xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
            </div>
          </div>

          {/* Proof & Heritage */}
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="relative order-2 md:order-1">
              <img
                src="/images/barber-shop/shot-clock.jpg"
                alt="Vintage shot clock representing the :20 Second Timeout Foundation"
                className="w-full h-[400px] object-cover rounded-xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent rounded-xl"></div>
            </div>
            <div className="space-y-5 order-1 md:order-2">
              <h3 className="text-3xl font-semibold">Heritage you can feel</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Chicago roots, curated memorabilia, and the :20 Second Timeout Foundation woven into the space. It’s hospitality with substance.
              </p>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>Foundation support baked into every membership—mentorship and community impact.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>Spaces layered with Chicago sports history and thoughtful design details.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>Private consultation areas when you want focus, open lounge when you want community.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="bg-muted rounded-2xl p-8 border border-border">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
              Experience the club as a member
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              One membership unlocks every space: lounge, bar, golf sim, crafted cuts, and the quiet you’re looking for.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="gap-2 bg-primary hover:bg-primary/90 shadow-lg"
              >
                <Link to="/pricing">
                  <span>View Membership Plans</span>
                  <ChevronRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="gap-2 border-border hover:bg-muted"
              >
                <Link to="/services">
                  <span>Book a service first</span>
                  <ChevronRight className="size-4" />
                </Link>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Save 20% with annual membership • No long-term commitment
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
