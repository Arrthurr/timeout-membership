"use client";
import { Navbar } from "~/components/homepage/navbar";
import Footer from "~/components/homepage/footer";
import { MembershipCards } from "~/components/pricing/membership-cards";

export default function IntegratedPricing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <MembershipCards showHeader />
        </div>
      </section>
      <Footer />
    </div>
  );
}
