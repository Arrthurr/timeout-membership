"use client";
import { Navbar } from "~/components/homepage/navbar";
import Footer from "~/components/homepage/footer";
import { MembershipCards } from "~/components/pricing/membership-cards";

export default function IntegratedPricing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 py-12">
        <MembershipCards showHeader />
      </section>
      <Footer />
    </div>
  );
}
