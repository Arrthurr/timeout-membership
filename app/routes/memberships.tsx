import { MembershipCard } from "~/components/memberships/membership-card";
import { Navbar } from "~/components/homepage/navbar";
import Footer from "~/components/homepage/footer";
import { MEMBERSHIPS } from "~/lib/constants/memberships";

export function meta() {
  return [
    {
      title:
        "Memberships | Timeout At Shannon's - Chicago Premium Barber Shop",
    },
    {
      name: "description",
      content:
        "Join Timeout At Shannon's with a season pass or annual membership. Lock in cuts with Shannon and our team barbers at one price.",
    },
    {
      name: "keywords",
      content:
        "Chicago barber membership, barber season pass, grooming membership, Timeout At Shannon's memberships",
    },
    {
      property: "og:title",
      content: "Memberships | Timeout At Shannon's",
    },
    {
      property: "og:description",
      content:
        "Season passes and annual packages for precision cuts, priority booking, and VIP treatment at Timeout At Shannon's in Chicago.",
    },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Memberships | Timeout At Shannon's",
    },
    {
      name: "twitter:description",
      content:
        "Season passes and annual packages for precision cuts, priority booking, and VIP treatment at Timeout At Shannon's in Chicago.",
    },
  ];
}

export default function MembershipsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-semibold text-primary">
              Signature services for members
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Book the craft; enjoy the lounge, bar, and priority treatment that
              comes with every membership.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {MEMBERSHIPS.map((membership) => (
              <MembershipCard
                key={membership.id}
                membership={membership}
                className="h-full"
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
