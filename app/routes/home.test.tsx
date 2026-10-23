import { render, screen } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";
import Home from "~/routes/home";

const HomeRouteStub = createRoutesStub([
  {
    path: "/",
    Component: Home,
  },
]);

describe("Home", () => {
  it("offers a gift card between the hero and the club section", () => {
    render(<HomeRouteStub initialEntries={["/"]} />);

    const giftCards = screen.getAllByRole("link", { name: "Buy a Gift Card" });
    expect(giftCards).toHaveLength(1);
    expect(giftCards[0]).toHaveAttribute(
      "href",
      "https://timeoutlounge.zenoti.com/webstoreNew/giftcards/873658fa-44c6-4608-9402-09634ce4864c",
    );
    expect(giftCards[0]).toHaveAttribute("target", "_blank");
    expect(giftCards[0]).toHaveAttribute("rel", "noopener noreferrer");

    const hero = screen.getByRole("heading", {
      name: "Quiet luxury never sounded so good.",
    });
    const club = screen.getByRole("heading", {
      name: "Built as a club, not just a chair",
    });
    expect(hero.compareDocumentPosition(giftCards[0]) & Node.DOCUMENT_POSITION_FOLLOWING).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
    expect(giftCards[0].compareDocumentPosition(club) & Node.DOCUMENT_POSITION_FOLLOWING).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
  });
});
