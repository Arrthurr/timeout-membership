import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ServiceCard } from "~/components/services/service-card";
import type { BarberService } from "~/lib/constants/services";
import { zenotiServiceId } from "~/lib/constants/zenoti";

function fixture(id: string, rawZenotiServiceId: string): BarberService {
  return {
    id,
    zenotiServiceId: zenotiServiceId(rawZenotiServiceId),
    name: "Fixture cut",
    sportsTheme: "Fixture",
    price: 40,
    duration: "45 minutes",
    description: "A cut used only by this test.",
    includes: ["Haircut"],
    category: "standard",
  };
}

describe("ServiceCard", () => {
  it("books the Zenoti service id on the card, not the slug", () => {
    render(
      <>
        <ServiceCard
          service={fixture(
            "fixture-cut",
            "00000000-0000-4000-8000-000000000001",
          )}
        />
        <ServiceCard
          service={fixture(
            "other-cut",
            "00000000-0000-4000-8000-000000000002",
          )}
        />
      </>,
    );

    const links = screen.getAllByRole("link", { name: "Book This Service" });

    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute(
      "href",
      "https://timeoutlounge.zenoti.com/webstoreNew/873658fa-44c6-4608-9402-09634ce4864c?serviceid=00000000-0000-4000-8000-000000000001",
    );
    expect(links[1]).toHaveAttribute(
      "href",
      "https://timeoutlounge.zenoti.com/webstoreNew/873658fa-44c6-4608-9402-09634ce4864c?serviceid=00000000-0000-4000-8000-000000000002",
    );

    for (const link of links) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }

    expect(links[0].getAttribute("href")).not.toContain("fixture-cut");
    expect(links[1].getAttribute("href")).not.toContain("other-cut");
  });
});
