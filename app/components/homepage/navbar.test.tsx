import { fireEvent, render, screen, within } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";
import { Navbar } from "~/components/homepage/navbar";

function NavbarRoute() {
  return <Navbar />;
}

const NavbarRouteStub = createRoutesStub([
  {
    path: "/",
    Component: NavbarRoute,
  },
]);

function expectZenotiLink(link: HTMLElement, href: string) {
  expect(link).toHaveAttribute("href", href);
  expect(link).toHaveAttribute("target", "_blank");
  expect(link).toHaveAttribute("rel", "noopener noreferrer");
}

describe("Navbar", () => {
  it("points Book Now and My Account at Zenoti on desktop and in the menu", () => {
    render(<NavbarRouteStub initialEntries={["/"]} />);

    const bookNowLinks = screen.getAllByRole("link", { name: "Book Now" });
    expect(bookNowLinks).toHaveLength(1);
    expectZenotiLink(
      bookNowLinks[0],
      "https://timeoutlounge.zenoti.com/webstoreNew/services/873658fa-44c6-4608-9402-09634ce4864c",
    );

    const accountLinks = screen.getAllByRole("link", { name: "My Account" });
    expect(accountLinks).toHaveLength(1);
    expectZenotiLink(
      accountLinks[0],
      "https://timeoutlounge.zenoti.com/webstoreNew/user/signIn",
    );

    expect(screen.queryByText("Sign In")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));

    const dialog = screen.getByRole("dialog");
    expectZenotiLink(
      within(dialog).getByRole("link", { name: "Book Now" }),
      "https://timeoutlounge.zenoti.com/webstoreNew/services/873658fa-44c6-4608-9402-09634ce4864c",
    );
    expectZenotiLink(
      within(dialog).getByRole("link", { name: "My Account" }),
      "https://timeoutlounge.zenoti.com/webstoreNew/user/signIn",
    );

    expect(screen.queryByText("Sign In")).not.toBeInTheDocument();

    for (const anchor of document.querySelectorAll("a")) {
      expect(anchor.getAttribute("href") ?? "").not.toContain(
        "webstoreNew/services/guest",
      );
    }
  });
});
