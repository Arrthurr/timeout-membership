import { useState } from "react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { ServiceCard } from "~/components/services/service-card";
import { BookingLink } from "~/components/services/booking-link";
import { MembershipCards } from "~/components/pricing/membership-cards";
import { Navbar } from "~/components/homepage/navbar";
import Footer from "~/components/homepage/footer";
import type { BarberService } from "~/lib/constants/services";
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
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const filteredServices = selectedCategory === 'all' 
    ? BARBER_SERVICES 
    : BARBER_SERVICES.filter(service => service.category === selectedCategory);

  const handleBookService = (serviceId: string) => {
    setSelectedService(serviceId);
    // Scroll to booking section
    document.getElementById('booking-section')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start' 
    });
  };

  const selectedServiceData = selectedService 
    ? BARBER_SERVICES.find(s => s.id === selectedService)
    : null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-semibold text-primary mb-6">
              Signature services for members
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Precision cuts, shaves, and grooming with room to linger. Book the craft; enjoy the lounge, bar, and priority treatment that come with membership.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
                <Link to="/pricing">Join the club</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-border hover:bg-muted" asChild>
                <Link to="#booking-section">Book a service</Link>
              </Button>
            </div>
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
                onBookService={handleBookService}
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

      {/* Membership Levels Section */}
      <section className="py-16 bg-muted">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Membership levels
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your needs
            </p>
          </div>
          <MembershipCards />
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking-section" className="py-16 bg-background">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Ready to book?
            </h2>
            <p className="text-lg text-muted-foreground">
              Schedule your appointment and experience the Timeout difference.
            </p>
          </div>

          <BookingLink 
            serviceId={selectedService || undefined}
            serviceName={selectedServiceData?.name}
            className="max-w-2xl mx-auto"
          />

          {selectedService && selectedServiceData && (
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                Selected service: <span className="font-medium text-primary">
                  {selectedServiceData.name} - ${selectedServiceData.price}
                </span>
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedService(null)}
                className="mt-2"
              >
                Clear Selection
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
