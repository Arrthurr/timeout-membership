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
            Premium Amenities & Atmosphere
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Step into a world where traditional barbering meets modern comfort. Every detail creates an exceptional experience that goes far beyond the ordinary haircut.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:gap-12">
          
          {/* Feature 1: Premium Barber Chairs */}
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
                Settle into our premium, vintage-inspired barber chairs and experience the perfect fusion 
                of traditional craftsmanship and modern comfort. Every service includes luxury amenities 
                designed to make your visit truly exceptional.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-2 h-2 bg-barber-brown-600 rounded-full"></span>
                  <span>Hot towel treatments</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-2 h-2 bg-barber-brown-600 rounded-full"></span>
                  <span>Premium grooming products</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-2 h-2 bg-barber-brown-600 rounded-full"></span>
                  <span>Complimentary beverages</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-2 h-2 bg-barber-brown-600 rounded-full"></span>
                  <span>Master barber expertise</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-2 h-2 bg-barber-brown-600 rounded-full"></span>
                  <span>Scalp massage service</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-2 h-2 bg-barber-brown-600 rounded-full"></span>
                  <span>Beard oil conditioning</span>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2: Chess & Relaxation */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-barber-green-100 text-barber-green-800 px-3 py-1 rounded-full text-sm font-medium">
                ♛ Strategic Relaxation
              </div>
              <h3 className="text-3xl font-semibold">
                Golf, Chess & Conversation
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Challenge yourself on our golf simulator, or fellow members to a game of chess while you wait. Our games create connections and foster the community 
                spirit that makes Timeout special.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-2 h-2 bg-barber-green-600 rounded-full"></span>
                  <span>Realistic indoor golf simulator</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-2 h-2 bg-barber-green-600 rounded-full"></span>
                  <span>Hand-crafted chess sets</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-2 h-2 bg-barber-green-600 rounded-full"></span>
                  <span>Comfortable seating areas</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/images/barber-shop/chess-board-pictures.jpg"
                alt="Chess boards and comfortable chairs at Timeout At Shannon's"
                className="w-full h-[400px] object-cover rounded-xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-barber-brown-900/20 to-transparent rounded-xl"></div>
            </div>
          </div>

          {/* Feature 3: Unique Details */}
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
                Every detail creates atmosphere. From vintage architectural elements to modern amenities, 
                discover the thoughtful touches that transform a simple visit into a memorable experience 
                that keeps our members coming back.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-2 h-2 bg-slate-600 rounded-full"></span>
                  <span>Member lounge areas</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-2 h-2 bg-slate-600 rounded-full"></span>
                  <span>Product display & retail</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-2 h-2 bg-slate-600 rounded-full"></span>
                  <span>Climate-controlled comfort</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-2 h-2 bg-slate-600 rounded-full"></span>
                  <span>Vintage decor & memorabilia</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-2 h-2 bg-slate-600 rounded-full"></span>
                  <span>Private consultation areas</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-2 h-2 bg-slate-600 rounded-full"></span>
                  <span>Chicago sports memorabilia</span>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 4: Shot Clock Heritage */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                🏀 Chicago Heritage
              </div>
              <h3 className="text-3xl font-semibold">
                :20 Second Timeout Legacy
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Our vintage shot clock represents more than decor — it symbolizes our commitment 
                to Chicago's youth through the <a href="/foundation" className="text-primary hover:underline">:20 Second Timeout Foundation</a>, creating opportunities 
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

        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-barber-green-50 to-barber-orange-50 rounded-2xl p-8 border border-barber-green-100">
            <div className="inline-flex items-center gap-2 bg-barber-green-100 text-barber-green-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
              <span>🎯</span>
              <span>Ready to join our community?</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
              Experience All These Amenities As A Member
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Join our membership community and enjoy exclusive access to premium amenities, 
              priority booking, and significant savings on all services.
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
                className="gap-2 border-barber-brown-300 hover:bg-barber-brown-50"
              >
                <Link to="/services">
                  <span>Book A Service First</span>
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
