import { useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { ServiceCard } from "~/components/services/service-card";
import { BookingLink } from "~/components/services/booking-link";
import { 
  BARBER_SERVICES, 
  SERVICE_CATEGORIES, 
  BarberService 
} from "~/lib/constants/services";

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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-barber-brown-50 py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-barber-brown-100/50 to-transparent"></div>
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
              Our Services
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Experience championship-level grooming with our sports-themed services. 
              From precision cuts to luxury shaves, every service is crafted with the 
              excellence you deserve.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <Badge variant="secondary" className="text-sm">
                ✂️ Expert Barbers
              </Badge>
              <Badge variant="secondary" className="text-sm">
                🏆 Championship Service
              </Badge>
              <Badge variant="secondary" className="text-sm">
                💯 Premium Products
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories Filter */}
      <section className="py-8 bg-background border-b border-barber-brown-200">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              className="min-w-[120px]"
            >
              All Services ({BARBER_SERVICES.length})
            </Button>
            {Object.entries(SERVICE_CATEGORIES).map(([key, category]) => {
              const count = BARBER_SERVICES.filter(s => s.category === key).length;
              return (
                <Button
                  key={key}
                  variant={selectedCategory === key ? 'default' : 'outline'}
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

      {/* Member Benefits Section */}
      <section className="py-16 bg-barber-green-50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-barber-green-800 mb-4">
              🏆 Member Benefits
            </h2>
            <p className="text-lg text-barber-green-700 max-w-2xl mx-auto">
              Join the Timeout family and enjoy exclusive member pricing on all services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background rounded-xl p-6 text-center border border-barber-green-200 shadow-sm">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="font-semibold text-lg mb-2 text-barber-green-800">
                Save on Every Service
              </h3>
              <p className="text-sm text-muted-foreground">
                Get $5-$15 off every service with your membership
              </p>
            </div>

            <div className="bg-background rounded-xl p-6 text-center border border-barber-green-200 shadow-sm">
              <div className="text-3xl mb-3">⭐</div>
              <h3 className="font-semibold text-lg mb-2 text-barber-green-800">
                Earn Points
              </h3>
              <p className="text-sm text-muted-foreground">
                Accumulate points with every service for future rewards
              </p>
            </div>

            <div className="bg-background rounded-xl p-6 text-center border border-barber-green-200 shadow-sm">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-semibold text-lg mb-2 text-barber-green-800">
                Priority Booking
              </h3>
              <p className="text-sm text-muted-foreground">
                Get first access to premium time slots and new services
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
              <a href="/pricing">
                Become a Member Today
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking-section" className="py-16 bg-background">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Ready to Book?
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
    </div>
  );
}
