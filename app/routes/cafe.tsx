import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { MenuDisplay } from "~/components/cafe/menu-display";
import { Navbar } from "~/components/homepage/navbar";
import Footer from "~/components/homepage/footer";
import {
  CAFE_HOURS,
  getCoffeeItems,
} from "~/lib/constants/cafe";

export function meta() {
  return [
    { title: "Out of Bounds Café | Timeout At Shannon's - Premium Coffee in Chicago" },
    { 
      name: "description", 
      content: "Complement your grooming experience with premium coffee at Out of Bounds Café. Quality beverages in a classic barber shop atmosphere." 
    },
    { 
      name: "keywords", 
      content: "Chicago coffee cafe, barber shop beverages, espresso drinks, cold brew, Out of Bounds Café" 
    },
    { property: "og:title", content: "Out of Bounds Café | Timeout At Shannon's" },
    { 
      property: "og:description", 
      content: "Premium coffee at Out of Bounds Café in Chicago's finest barber shop. Quality beverages that complement our championship grooming services." 
    },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Out of Bounds Café | Timeout At Shannon's" },
    {
      name: "twitter:description",
      content: "Premium coffee at Out of Bounds Café in Chicago's finest barber shop. Quality beverages that complement our championship grooming services."
    }
  ];
}

export default function CafePage() {
  const coffeeItems = getCoffeeItems();

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
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              A calm café and coffee program inside the lounge. Grab a coffee before a cut, or stay and unwind.
            </p>
          </div>
        </div>
      </section>

      {/* Menu Display */}
      <section id="menu" className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <MenuDisplay items={coffeeItems} category="coffee" />
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
              Enjoy premium coffee throughout the day—whether you're here for a service or to unwind.
            </p>
          </div>

          <div className="max-w-lg mx-auto">
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
              </CardContent>
            </Card>
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
              Traditional barbering meets modern hospitality—start with coffee and stay awhile.
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
                  Connect with fellow members over a coffee and good conversation.
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

      <Footer />
    </div>
  );
}

