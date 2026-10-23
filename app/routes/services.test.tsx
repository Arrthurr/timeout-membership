import { render, screen } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";
import ServicesPage from "~/routes/services";

const ServicesRouteStub = createRoutesStub([
  {
    path: "/services",
    Component: ServicesPage,
  },
]);

const bookingHrefs = [
  "https://timeoutlounge.zenoti.com/webstoreNew/873658fa-44c6-4608-9402-09634ce4864c?serviceid=ef1a4a01-f6ba-44e2-8af6-5c02ab6a4e07",
  "https://timeoutlounge.zenoti.com/webstoreNew/873658fa-44c6-4608-9402-09634ce4864c?serviceid=9d336934-a810-4e6f-8054-c64269e3294c",
  "https://timeoutlounge.zenoti.com/webstoreNew/873658fa-44c6-4608-9402-09634ce4864c?serviceid=4464e90f-651b-4821-801f-acd9b9d3c545",
  "https://timeoutlounge.zenoti.com/webstoreNew/873658fa-44c6-4608-9402-09634ce4864c?serviceid=145608eb-fc0a-4384-97cd-0e474ca809e8",
  "https://timeoutlounge.zenoti.com/webstoreNew/873658fa-44c6-4608-9402-09634ce4864c?serviceid=84245caa-5a79-4164-b6e3-baad9532a76c",
  "https://timeoutlounge.zenoti.com/webstoreNew/873658fa-44c6-4608-9402-09634ce4864c?serviceid=a1652794-436a-45e1-91b2-e524e29f62d1",
  "https://timeoutlounge.zenoti.com/webstoreNew/873658fa-44c6-4608-9402-09634ce4864c?serviceid=abc1388e-e043-469c-86d8-9a2c36aed063",
];

describe("ServicesPage", () => {
  it("books each service in catalog order and offers gift cards under the hero", () => {
    render(<ServicesRouteStub initialEntries={["/services"]} />);

    const bookingLinks = screen.getAllByRole("link", { name: "Book This Service" });
    expect(bookingLinks).toHaveLength(bookingHrefs.length);

    bookingLinks.forEach((link, index) => {
      expect(link).toHaveAttribute("href", bookingHrefs[index]);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    const giftCard = screen.getByRole("link", { name: "Buy a Gift Card" });
    expect(giftCard).toHaveAttribute(
      "href",
      "https://timeoutlounge.zenoti.com/webstoreNew/giftcards/873658fa-44c6-4608-9402-09634ce4864c",
    );
    expect(giftCard).toHaveAttribute("target", "_blank");
    expect(giftCard).toHaveAttribute("rel", "noopener noreferrer");

    const hero = screen.getByRole("heading", { name: "Slam dunk treatments" });
    const allServices = screen.getByRole("button", { name: /All Services/ });
    expect(hero.compareDocumentPosition(giftCard) & Node.DOCUMENT_POSITION_FOLLOWING).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
    expect(giftCard.compareDocumentPosition(allServices) & Node.DOCUMENT_POSITION_FOLLOWING).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
  });
});
