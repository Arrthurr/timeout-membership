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
            Experience The Timeout Difference
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            More than just a haircut – discover our unique blend of traditional barbering, 
            premium amenities, and community spirit.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:gap-12">
          
          {/* Feature 1: Chess & Relaxation */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-barber-green-100 text-barber-green-800 px-3 py-1 rounded-full text-sm font-medium">
                ♛ Strategic Relaxation
              </div>
              <h3 className="text-3xl font-semibold">
                Chess & Conversation
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Challenge fellow members to a game while you wait, or engage in thoughtful 
                conversation. Our chess boards create connections and foster the community 
                spirit that makes Timeout special.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-2 h-2 bg-barber-green-600 rounded-full"></span>
                  <span>Hand-crafted chess sets</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-2 h-2 bg-barber-green-600 rounded-full"></span>
                  <span>Community tournaments</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-2 h-2 bg-barber-green-600 rounded-full"></span>
                  <span>Comfortable seating areas</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/images/barber-shop/chess-board-chairs.jpg"
                alt="Chess boards and comfortable chairs at Timeout At Shannon's"
                className="w-full h-[400px] object-cover rounded-xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-barber-brown-900/20 to-transparent rounded-xl"></div>
            </div>
          </div>

          {/* Feature 2: Premium Barber Chairs */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative order-2 md:order-1">
              <img
                src="/images/barber-shop/barber-chairs.jpg"
                alt="Premium barber chairs at Timeout At Shannon's"
                className="w-full h-[400px] object-cover rounded-xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-barber-brown-900/20 to-transparent rounded-xl"></div>
            </div>
            <div className="space-y-6 order-1 md:order-2">
              <div className="inline-flex items-center gap-2 bg-barber-brown-100 text-barber-brown-800 px-3 py-1 rounded-full text-sm font-medium">
                ✂️ Master Craftsmanship
              </div>
              <h3 className="text-3xl font-semibold">
                Classic Barber Excellence
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Settle into our premium barber chairs and experience the artistry of traditional 
                and modern cutting techniques. Every cut is crafted with precision and care by 
                our experienced barbers.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-2 h-2 bg-barber-brown-600 rounded-full"></span>
                  <span>Vintage-inspired barber chairs</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-2 h-2 bg-barber-brown-600 rounded-full"></span>
                  <span>Traditional hot towel shaves</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-2 h-2 bg-barber-brown-600 rounded-full"></span>
                  <span>Modern cutting techniques</span>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 3: Shot Clock Heritage */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                🏀 Chicago Heritage
              </div>
              <h3 className="text-3xl font-semibold">
                :20 Second Timeout Legacy
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Our vintage shot clock represents more than decor – it symbolizes our commitment 
                to Chicago's youth through the :20 Second Timeout Foundation, creating opportunities 
                and building futures in our community.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                  <span>Community foundation support</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                  <span>Youth mentorship programs</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                  <span>Chicago basketball heritage</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/images/barber-shop/shot-clock.jpg"
                alt="Vintage shot clock representing the :20 Second Timeout Foundation"
                className="w-full h-[400px] object-cover rounded-xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-900/20 to-transparent rounded-xl"></div>
            </div>
          </div>

          {/* Feature 4: Unique Details */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative order-2 md:order-1">
              <img
                src="/images/barber-shop/safe-door.jpg"
                alt="Vintage safe door detail at Timeout At Shannon's"
                className="w-full h-[400px] object-cover rounded-xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent rounded-xl"></div>
            </div>
            <div className="space-y-6 order-1 md:order-2">
              <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-800 px-3 py-1 rounded-full text-sm font-medium">
                🏛️ Authentic Character
              </div>
              <h3 className="text-3xl font-semibold">
                Rich History & Character
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Every corner tells a story. From vintage architectural details to carefully 
                curated historical elements, Timeout At Shannon's preserves the character 
                and charm that makes Chicago neighborhoods special.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-2 h-2 bg-slate-600 rounded-full"></span>
                  <span>Historic architectural elements</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-2 h-2 bg-slate-600 rounded-full"></span>
                  <span>Neighborhood character preservation</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-2 h-2 bg-slate-600 rounded-full"></span>
                  <span>Authentic Chicago experience</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Button
            asChild
            size="lg"
            className="gap-2 bg-primary hover:bg-primary/90"
          >
            <Link to="/pricing">
              <span>Experience Timeout Today</span>
              <ChevronRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
