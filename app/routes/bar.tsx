import { useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { MenuDisplay } from "~/components/bar/menu-display";
import { 
  BAR_MENU,
  BAR_HOURS,
  getCoffeeItems,
  getSpiritsItems
} from "~/lib/constants/bar";

export function meta() {
  return [
    { title: "Bar & Coffee | Timeout At Shannon's - Premium Beverages in Chicago" },
    { 
      name: "description", 
      content: "Complement your grooming experience with premium coffee and select spirits. Our bar offers quality beverages in a classic barber shop atmosphere." 
    },
    { 
      name: "keywords", 
      content: "Chicago coffee bar, barber shop beverages, premium spirits, espresso drinks, whiskey, cognac, barber shop atmosphere" 
    },
    { property: "og:title", content: "Bar & Coffee | Timeout At Shannon's" },
    { 
      property: "og:description", 
      content: "Premium coffee and select spirits in Chicago's finest barber shop. Quality beverages that complement our championship grooming services." 
    },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Bar & Coffee | Timeout At Shannon's" },
    {
      name: "twitter:description",
      content: "Premium coffee and select spirits in Chicago's finest barber shop. Quality beverages that complement our championship grooming services."
    }
  ];
}

export default function BarPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'coffee' | 'spirits'>('all');

  const coffeeItems = getCoffeeItems();
  const spiritsItems = getSpiritsItems();

  const renderCategorySection = () => {
    switch (selectedCategory) {
      case 'coffee':
        return <MenuDisplay items={coffeeItems} category="coffee" className="mb-16" />;
      case 'spirits':
        return <MenuDisplay items={spiritsItems} category="spirits" className="mb-16" />;
      case 'all':
      default:
        return (
          <div className="space-y-16">
            <MenuDisplay items={coffeeItems} category="coffee" />
            <MenuDisplay items={spiritsItems} category="spirits" />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-barber-brown-50 py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-barber-brown-100/50 to-orange-100/30"></div>
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="text-center">
            <div className="flex justify-center items-center gap-4 mb-6">
              <span className="text-4xl">☕</span>
              <h1 className="text-4xl md:text-6xl font-bold text-primary">
                Bar & Coffee
              </h1>
              <span className="text-4xl">🥃</span>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Fuel your day with championship coffee or unwind with premium spirits. 
              Our bar complements your grooming experience with quality beverages 
              that match our commitment to excellence.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <Badge variant="secondary" className="text-sm">
                ☕ Premium Coffee All Day
              </Badge>
              <Badge variant="secondary" className="text-sm">
                🥃 Select Spirits Evenings
              </Badge>
              <Badge variant="secondary" className="text-sm">
                💯 Member Discounts
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-background border-b border-barber-brown-200">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              className="min-w-[120px]"
            >
              Full Menu
            </Button>
            <Button
              variant={selectedCategory === 'coffee' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('coffee')}
              className="min-w-[120px]"
            >
              ☕ Coffee ({coffeeItems.length})
            </Button>
            <Button
              variant={selectedCategory === 'spirits' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('spirits')}
              className="min-w-[120px]"
            >
              🥃 Spirits ({spiritsItems.length})
            </Button>
          </div>
        </div>
      </section>

      {/* Menu Display */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          {renderCategorySection()}
        </div>
      </section>

      {/* Bar Hours & Information */}
      <section className="py-16 bg-barber-brown-50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Bar Hours & Information
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enjoy our beverages during your visit or while waiting for your appointment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Coffee Hours */}
            <Card className="border-barber-brown-300 bg-background">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-barber-brown-800">
                  <span className="text-2xl">☕</span>
                  Coffee Bar Hours
                </CardTitle>
                <CardDescription>
                  Premium coffee available throughout the day
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Monday - Friday:</span>
                  <span className="text-barber-brown-700">{BAR_HOURS.coffee.weekdays}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Saturday:</span>
                  <span className="text-barber-brown-700">{BAR_HOURS.coffee.saturday}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Sunday:</span>
                  <span className="text-barber-brown-700">{BAR_HOURS.coffee.sunday}</span>
                </div>
                <div className="mt-4 p-3 bg-barber-brown-50 rounded-lg border border-barber-brown-200">
                  <p className="text-sm text-barber-brown-700">
                    ☕ Fresh coffee available all day • Espresso drinks • Cold brew • French press
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Spirits Hours */}
            <Card className="border-orange-300 bg-background">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-800">
                  <span className="text-2xl">🥃</span>
                  Spirits Bar Hours
                </CardTitle>
                <CardDescription>
                  Premium spirits for evening relaxation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Monday - Friday:</span>
                  <span className="text-orange-700">{BAR_HOURS.spirits.weekdays}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Saturday:</span>
                  <span className="text-orange-700">{BAR_HOURS.spirits.saturday}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Sunday:</span>
                  <span className="text-orange-700">{BAR_HOURS.spirits.sunday}</span>
                </div>
                <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <p className="text-sm text-orange-700">
                    🥃 Must be 21+ with valid ID • Premium whiskeys, cognac, rum • Evening only
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Member Benefits */}
      <section className="py-16 bg-barber-green-50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-barber-green-800 mb-4">
              🏆 Member Bar Benefits
            </h2>
            <p className="text-lg text-barber-green-700 max-w-2xl mx-auto">
              Members enjoy exclusive discounts on all bar offerings - another reason 
              to join the Timeout family.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background rounded-xl p-6 text-center border border-barber-green-200 shadow-sm">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="font-semibold text-lg mb-2 text-barber-green-800">
                Save on Every Drink
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                $0.50-$3.00 off all coffee and spirits
              </p>
              <div className="text-xs text-barber-green-600 space-y-1">
                <div>• Coffee: Save $0.50-$1.00</div>
                <div>• Spirits: Save $2.00-$3.00</div>
              </div>
            </div>

            <div className="bg-background rounded-xl p-6 text-center border border-barber-green-200 shadow-sm">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-semibold text-lg mb-2 text-barber-green-800">
                Exclusive Access
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Priority seating and special menu items
              </p>
              <div className="text-xs text-barber-green-600 space-y-1">
                <div>• Reserved bar seating</div>
                <div>• Member-only specials</div>
              </div>
            </div>

            <div className="bg-background rounded-xl p-6 text-center border border-barber-green-200 shadow-sm">
              <div className="text-3xl mb-3">☕</div>
              <h3 className="font-semibold text-lg mb-2 text-barber-green-800">
                Complimentary Coffee
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Free basic coffee during services
              </p>
              <div className="text-xs text-barber-green-600 space-y-1">
                <div>• Free drip coffee</div>
                <div>• During appointments</div>
              </div>
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

      {/* Atmosphere Section */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              More Than Just a Barber Shop
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our bar creates a unique atmosphere where traditional barbering meets 
              modern hospitality. Whether you're starting your day with coffee or 
              ending it with premium spirits, every sip complements the Timeout experience.
            </p>
          </div>

          <div className="bg-gradient-to-r from-barber-brown-50 to-orange-50 rounded-xl p-8 border border-barber-brown-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl mb-2">🏛️</div>
                <h3 className="font-semibold text-lg mb-2">Classic Atmosphere</h3>
                <p className="text-sm text-muted-foreground">
                  Traditional barber shop ambiance with modern bar amenities
                </p>
              </div>
              <div>
                <div className="text-3xl mb-2">🤝</div>
                <h3 className="font-semibold text-lg mb-2">Social Hub</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with fellow members over quality beverages and conversation
                </p>
              </div>
              <div>
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="font-semibold text-lg mb-2">Quality Focus</h3>
                <p className="text-sm text-muted-foreground">
                  Every beverage meets the same standard of excellence as our barber services
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
