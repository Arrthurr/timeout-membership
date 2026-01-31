import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { ShopHistory } from "~/components/about/shop-history";
import { Button } from "~/components/ui/button";
import { Navbar } from "~/components/homepage/navbar";
import Footer from "~/components/homepage/footer";

export const meta: MetaFunction = () => {
  return [
    { title: "About Shannon Jones & Timeout At Shannon's - Master Barber & Community Leader" },
    { name: "description", content: "Meet Shannon Jones, the vision and craft behind Timeout At Shannon's. Learn how a Chicago barber built a modern members-only lounge rooted in community and quiet luxury." },
    { name: "keywords", content: "Shannon Jones, master barber, Timeout At Shannon's, barber shop history, community leader, professional barbering, shop owner biography" }
  ];
};

export default function AboutRoute() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      {/* Hero Section */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
                Shannon Jones, the craft behind the club.
              </h1>
              <p className="text-lg text-muted-foreground">
                Chicago-born master barber who turned a neighborhood chair into a modern members-only lounge—equal parts craft, comfort, and community.
              </p>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>25+ years of precision cuts and calm hospitality.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>A clubhouse mindset: stay before and after—coffee, bar, conversation.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>Rooted in Chicago impact through the :20 Second Timeout Foundation.</span>
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
                  <Link to="/membership">Join the club</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-border hover:bg-muted">
                  <Link to="/services">Book with Shannon</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl shadow-xl overflow-hidden">
                <img
                  src="/images/shannon-jones-portrait.jpg"
                  alt="Shannon Jones - Master Barber and Owner of Timeout At Shannon's"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white space-y-1">
                  <div className="text-sm opacity-90">Shannon Jones</div>
                  <div className="text-lg font-semibold">Master Barber & Owner</div>
                </div>
              </div>
              <div className="absolute -top-3 -right-3 bg-background/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-border">
                <div className="text-2xl font-semibold text-foreground">25+</div>
                <div className="text-sm text-muted-foreground">Years of craft</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-20 bg-muted">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold">From K-Town chair to citywide club</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Shannon started in a basement shop on Chicago’s West Side, honing a craft that blends precision, warmth, and a sense of place. Timeout grew from that chair into a lounge where members linger, connect, and get cared for.
              </p>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>Pivot Point–trained with decades of mentoring and mastery.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>Built an elite, loyal clientele—athletes, artists, neighbors alike.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>Designs spaces to slow down: crafted seating, bar service, conversation.</span>
                </li>
              </ul>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
                <div className="text-sm text-muted-foreground mb-2">Chicago legacy</div>
                <div className="text-xl font-semibold text-foreground">Neighborhood roots, citywide reach.</div>
              </div>
              <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
                <div className="text-sm text-muted-foreground mb-2">Hospitality lens</div>
                <div className="text-xl font-semibold text-foreground">Calm, hosted, never rushed.</div>
              </div>
              <div className="rounded-xl border border-border bg-background p-6 shadow-sm sm:col-span-2">
                <div className="text-sm text-muted-foreground mb-2">Community impact</div>
                <div className="text-xl font-semibold text-foreground">The :20 Second Timeout Foundation ties every visit to local youth.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-16 md:py-20 bg-background">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold">How Timeout was built</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A few pivotal moments that shaped the club you step into today.
            </p>
          </div>
          <ShopHistory variant="timeline" />
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-16 md:py-20 bg-muted">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold">Recognition along the way</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Honored for craft, culture, and community leadership.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Wall Street Journal feature",
                detail: "Front-page story highlighting the shop’s rise.",
                year: "2002"
              },
              {
                title: "Chicago’s Hottest Barbershop",
                detail: "Voted by New City Magazine.",
                year: "2002"
              },
              {
                title: "National media",
                detail: "Coverage in Men's Health, Slam, Hoop, ABC7.",
                year: "Multiple"
              },
            ].map((item, idx) => (
              <div key={idx} className="rounded-xl border border-border bg-background p-6 text-left shadow-sm">
                <div className="text-sm text-muted-foreground mb-2">{item.year}</div>
                <div className="text-xl font-semibold mb-2">{item.title}</div>
                <p className="text-sm text-muted-foreground">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-20 bg-background">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold">What guides the experience</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Three principles that shape every visit.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Master craftsmanship", desc: "Precision cuts, shaves, and grooming anchored in decades of practice." },
              { title: "Club comfort", desc: "Spaces designed to slow down: lounge, bar, and conversation without the rush." },
              { title: "Chicago impact", desc: "Every membership fuels the :20 Second Timeout Foundation for local youth." },
            ].map((item, idx) => (
              <div key={idx} className="rounded-xl border border-border bg-background p-6 text-left shadow-sm">
                <div className="text-xl font-semibold mb-2">{item.title}</div>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-muted">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-semibold mb-4">Visit the club, feel the difference</h2>
          <p className="text-muted-foreground mb-6">
            Membership puts you at the center of Shannon’s craft: calm spaces, hosted service, and a community rooted in Chicago.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
              <Link to="/membership">Join now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-border hover:bg-muted">
              <Link to="/services">Book a service</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
