import { useState } from "react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { MenuDisplay } from "~/components/cafe/menu-display";
import { Navbar } from "~/components/homepage/navbar";
import {
  CAFE_MENU,
  CAFE_HOURS,
  getCoffeeItems,
  getSpiritsItems,
} from "~/lib/constants/cafe";

export function meta() {
  return [
    { title: "Out of Bounds Café | Timeout At Shannon's - Premium Beverages in Chicago" },
    { 
      name: "description", 
      content: "Complement your grooming experience with premium coffee and select spirits at Out of Bounds Café. Quality beverages in a classic barber shop atmosphere." 
    },
    { 
      name: "keywords", 
      content: "Chicago coffee cafe, barber shop beverages, premium spirits, espresso drinks, whiskey, cognac, Out of Bounds Café" 
    },
    { property: "og:title", content: "Out of Bounds Café | Timeout At Shannon's" },
    { 
      property: "og:description", 
      content: "Premium coffee and select spirits at Out of Bounds Café in Chicago's finest barber shop. Quality beverages that complement our championship grooming services." 
    },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Out of Bounds Café | Timeout At Shannon's" },
    {
      name: "twitter:description",
      content: "Premium coffee and select spirits at Out of Bounds Café in Chicago's finest barber shop. Quality beverages that complement our championship grooming services."
    }
  ];
}

export default function CafePage() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "coffee" | "spirits">("all");

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
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-semibold text-primary mb-6">
              Out of Bounds Café
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Coffee by day, spirits by night—hosted for members. A calm café and coffee program inside the lounge. Grab a coffee before a cut, or stay after hours with select spirits.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
                <Link to="/pricing">Join the club</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-border hover:bg-muted" asChild>
                <Link to="#menu">See the menu</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-background border-b border-border">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
              className="min-w-[120px]"
            >
              Full Menu
            </Button>
            <Button
              variant={selectedCategory === "coffee" ? "default" : "outline"}
              onClick={() => setSelectedCategory("coffee")}
              className="min-w-[120px]"
            >
              ☕ Coffee ({coffeeItems.length})
            </Button>
            <Button
              variant={selectedCategory === "spirits" ? "default" : "outline"}
              onClick={() => setSelectedCategory("spirits")}
              className="min-w-[120px]"
            >
              🥃 Spirits ({spiritsItems.length})
            </Button>
          </div>
        </div>
      </section>

      {/* Menu Display */}
      <section id="menu" className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          {renderCategorySection()}
        </div>
      </section>

      {/* Café Hours & Information */}
      <section className="py-16 bg-muted">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Hours & details
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enjoy coffee throughout the day and spirits in the evening—whether you're here for a service or to unwind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Coffee Hours */}
            <Card className="border border-border bg-background">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <span className="text-2xl">☕</span>
                  Out of Bounds Café Hours
                </CardTitle>
                <CardDescription>
                  Premium coffee available throughout the day
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Monday - Friday:</span>
                  <span className="text-barber-brown-700">{CAFE_HOURS.coffee.weekdays}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Saturday:</span>
                  <span className="text-barber-brown-700">{CAFE_HOURS.coffee.saturday}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Sunday:</span>
                  <span className="text-barber-brown-700">{CAFE_HOURS.coffee.sunday}</span>
                </div>
                <div className="mt-4 p-3 bg-muted rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground">
                    ☕ Fresh coffee available all day • Espresso drinks • Cold brew • French press
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Spirits Hours */}
            <Card className="border border-border bg-background">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <span className="text-2xl">🥃</span>
                  Spirits Hours
                </CardTitle>
                <CardDescription>
                  Premium spirits for evening relaxation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Monday - Friday:</span>
                  <span className="text-orange-700">{CAFE_HOURS.spirits.weekdays}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Saturday:</span>
                  <span className="text-orange-700">{CAFE_HOURS.spirits.saturday}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Sunday:</span>
                  <span className="text-orange-700">{CAFE_HOURS.spirits.sunday}</span>
                </div>
                <div className="mt-4 p-3 bg-muted rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground">
                    🥃 Must be 21+ with valid ID • Premium whiskeys, cognac, rum • Evening only
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Member Benefits */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Member perks at Out of Bounds Café
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Better pricing, reserved spots, and hosted service while you sip.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background rounded-xl p-6 text-center border border-barber-green-200 shadow-sm">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">
                Member pricing
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Preferred rates on coffee and select spirits.
              </p>
            </div>

            <div className="bg-background rounded-xl p-6 text-center border border-barber-green-200 shadow-sm">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">
                Reserved seating
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Settle into member-preferred spots and occasional specials.
              </p>
            </div>

            <div className="bg-background rounded-xl p-6 text-center border border-barber-green-200 shadow-sm">
              <div className="text-3xl mb-3">☕</div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">
                Hosted coffee
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Complimentary drip coffee during services.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
              <Link to="/pricing">
                Become a member
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Atmosphere Section */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
              A hosted café inside the lounge
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Traditional barbering meets modern hospitality—start with coffee, stay for a pour, and linger with friends.
            </p>
          </div>

          <div className="rounded-xl p-8 border border-border bg-muted">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl mb-2">🏛️</div>
                <h3 className="font-semibold text-lg mb-2">Classic Atmosphere</h3>
                <p className="text-sm text-muted-foreground">
                  Warm, classic vibe with a calm café experience.
                </p>
              </div>
              <div>
                <div className="text-3xl mb-2">🤝</div>
                <h3 className="font-semibold text-lg mb-2">Social hub</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with fellow members over a coffee or an evening pour.
                </p>
              </div>
              <div>
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="font-semibold text-lg mb-2">Quality Focus</h3>
                <p className="text-sm text-muted-foreground">
                  Every beverage meets the same standard as our grooming craft.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

