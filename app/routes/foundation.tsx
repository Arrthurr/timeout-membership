import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { FoundationHero } from "~/components/foundation/hero";
import { CommunityPrograms } from "~/components/foundation/programs";
import { CommunityEvents } from "~/components/foundation/events";
import { ImpactMetrics } from "~/components/foundation/impact";
import { Button } from "~/components/ui/button";
import { Navbar } from "~/components/homepage/navbar";

export const meta: MetaFunction = () => {
  return [
    { title: "20 Second Timeout Foundation | Community Impact & Programs" },
    { 
      name: "description", 
      content: "Supporting our community through youth development, mental health awareness, and meaningful connections. Join the 20 Second Timeout Foundation in making a difference." 
    },
    { property: "og:title", content: "20 Second Timeout Foundation | Community Impact & Programs" },
    { 
      property: "og:description", 
      content: "Supporting our community through youth development, mental health awareness, and meaningful connections. Join the 20 Second Timeout Foundation in making a difference." 
    },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "20 Second Timeout Foundation | Community Impact & Programs" },
    { 
      name: "twitter:description", 
      content: "Supporting our community through youth development, mental health awareness, and meaningful connections. Join the 20 Second Timeout Foundation in making a difference." 
    },
  ];
};

export default function Foundation() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      {/* Foundation Hero Section */}
      <FoundationHero />

      {/* Community Programs Section */}
      <CommunityPrograms />

      {/* Community Events Section */}
      <CommunityEvents />

      {/* Impact Metrics Section */}
      <ImpactMetrics />

      {/* Contact & Support Section */}
      <section className="py-16 lg:py-20 bg-muted">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            Join the :20 Second Timeout Foundation mission
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            Your time, resources, and voice fuel youth mentorship, community programs, and educational support in Chicago.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              { icon: "🤝", title: "Volunteer", desc: "Share time and skills to support programs." },
              { icon: "💝", title: "Donate", desc: "Fund mentorship, community, and education." },
              { icon: "📢", title: "Advocate", desc: "Spread the mission to those who can help." },
            ].map((item, idx) => (
              <div key={idx} className="rounded-xl border border-border bg-background p-6 shadow-sm">
                <div className="text-2xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
              <Link to="/pricing">Become a member</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-border hover:bg-muted" asChild>
              <Link to="/contact">Contact the foundation</Link>
            </Button>
          </div>

          <div className="border-t border-border pt-6 text-center text-sm text-muted-foreground">
            <p className="mb-2 font-semibold text-foreground">20 Second Timeout Foundation</p>
            <p className="mb-1">foundation@20secondtimeout.org | (555) 123-4567</p>
            <p>123 Community Way, Chicago, IL</p>
          </div>
        </div>
      </section>
    </div>
  );
}
