import { useState } from "react";
import { Button } from "~/components/ui/button";
import { ServiceCard } from "~/components/services/service-card";
import { Navbar } from "~/components/homepage/navbar";
import Footer from "~/components/homepage/footer";
import {
  BARBER_SERVICES,
  SERVICE_CATEGORIES,
} from "~/lib/constants/services";

export function meta() {
  return [
    { title: "Barber Services | Timeout At Shannon's - Chicago Premium Barber Shop" },
    { 
      name: "description", 
      content: "Discover our championship-level barber services. From precision cuts to luxury shaves, experience the ultimate in men's grooming at Timeout At Shannon's in Chicago." 
    },
    { 
      name: "keywords", 
      content: "Chicago barber, premium haircuts, straight razor shave, beard trim, men's grooming, barber shop services, sports themed cuts" 
    },
    { property: "og:title", content: "Barber Services | Timeout At Shannon's" },
    { 
      property: "og:description", 
      content: "Championship-level barber services in Chicago. Premium cuts, shaves, and grooming with sports-themed service names and expert craftsmanship." 
    },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Barber Services | Timeout At Shannon's" },
    {
      name: "twitter:description",
      content: "Championship-level barber services in Chicago. Premium cuts, shaves, and grooming with sports-themed service names and expert craftsmanship."
    }
  ];
}

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredServices = selectedCategory === 'all' 
    ? BARBER_SERVICES 
    : BARBER_SERVICES.filter(service => service.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      {/* Hero Section */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-semibold text-primary">
              Slam dunk treatments
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Precision cuts, shaves, and grooming with room to linger.
            </p>
          </div>
        </div>
      </section>

      {/* Service Categories Filter */}
      <section className="py-8 bg-background border-b border-border">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
              className="min-w-[120px]"
            >
              All Services ({BARBER_SERVICES.length})
            </Button>
            {Object.entries(SERVICE_CATEGORIES).map(([key, category]) => {
              const count = BARBER_SERVICES.filter((s) => s.category === key).length;
              return (
                <Button
                  key={key}
                  variant={selectedCategory === key ? "default" : "outline"}
                  onClick={() => setSelectedCategory(key)}
                  className="min-w-[120px]"
                >
                  {category.name} ({count})
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          {/* Category Description */}
          {selectedCategory !== 'all' && (
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                {SERVICE_CATEGORIES[selectedCategory as keyof typeof SERVICE_CATEGORIES].name}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {SERVICE_CATEGORIES[selectedCategory as keyof typeof SERVICE_CATEGORIES].description}
              </p>
            </div>
          )}

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                className="h-full"
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredServices.length === 0 && (
            <div className="text-center py-16">
              <div className="text-4xl mb-4">🤔</div>
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                No services found
              </h3>
              <p className="text-muted-foreground">
                Try selecting a different category to see available services.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
