import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MembershipCards } from "./membership-cards";

const mockGetPlans = vi.fn();
const mockCreateCheckout = vi.fn();
const mockCreatePortalUrl = vi.fn();
const mockUpsertUser = vi.fn();

vi.mock("@clerk/react-router", () => ({
  useAuth: vi.fn(() => ({ isSignedIn: false, userId: null })),
}));

vi.mock("convex/react", () => ({
  useAction: vi.fn((ref: any) => {
    if (ref === "getAvailablePlans") return mockGetPlans;
    if (ref === "createCheckoutSession") return mockCreateCheckout;
    if (ref === "createCustomerPortalUrl") return mockCreatePortalUrl;
    return vi.fn();
  }),
  useQuery: vi.fn(() => undefined),
  useMutation: vi.fn(() => mockUpsertUser),
}));

vi.mock("../../../convex/_generated/api", () => ({
  api: {
    subscriptions: {
      getAvailablePlans: "getAvailablePlans",
      checkUserSubscriptionStatus: "checkUserSubscriptionStatus",
      fetchUserSubscription: "fetchUserSubscription",
      createCheckoutSession: "createCheckoutSession",
      createCustomerPortalUrl: "createCustomerPortalUrl",
    },
    users: {
      upsertUser: "upsertUser",
    },
  },
}));

vi.mock("./waitlist-dialog", () => ({
  WaitlistDialog: ({ planName, children }: { planName: string; children: React.ReactNode }) => (
    <div data-testid="waitlist-dialog" data-plan-name={planName}>
      {children}
    </div>
  ),
}));

import { useAuth } from "@clerk/react-router";
import { useAction, useQuery } from "convex/react";

const mockPlans = {
  items: [
    {
      id: "plan_1",
      name: "The Lineup",
      description: "Basic membership",
      isRecurring: true,
      prices: [{ id: "price_1", amount: 2500, currency: "USD", interval: "month" }],
    },
    {
      id: "plan_2",
      name: "The Hot Towel",
      description: "Premium membership",
      isRecurring: true,
      prices: [{ id: "price_2", amount: 5000, currency: "USD", interval: "month" }],
    },
    {
      id: "plan_3",
      name: "The Chairman's Cut",
      description: "Exclusive membership",
      isRecurring: true,
      prices: [{ id: "price_3", amount: 10000, currency: "USD", interval: "month" }],
    },
  ],
};

beforeEach(() => {
  vi.clearAllMocks();

  vi.mocked(useAuth).mockReturnValue({
    isSignedIn: false,
    userId: null,
  } as any);

  mockGetPlans.mockResolvedValue(mockPlans);
  mockUpsertUser.mockResolvedValue(undefined);

  vi.mocked(useAction).mockImplementation((ref: any) => {
    if (ref === "getAvailablePlans") return mockGetPlans;
    if (ref === "createCheckoutSession") return mockCreateCheckout;
    if (ref === "createCustomerPortalUrl") return mockCreatePortalUrl;
    return vi.fn();
  });

  vi.mocked(useQuery).mockReturnValue(undefined);
});

describe("MembershipCards", () => {
  it("shows loading state when plans haven't loaded yet", () => {
    mockGetPlans.mockReturnValue(new Promise(() => {})); // never resolves
    render(<MembershipCards />);
    expect(screen.getByText("Loading plans...")).toBeInTheDocument();
  });

  it("renders plan cards once plans are loaded", async () => {
    render(<MembershipCards />);
    await waitFor(() => {
      expect(screen.getByText("The Lineup")).toBeInTheDocument();
    });
    expect(screen.getByText("The Hot Towel")).toBeInTheDocument();
    expect(screen.getByText("The Chairman's Cut")).toBeInTheDocument();
    expect(screen.getByText("Basic membership")).toBeInTheDocument();
    expect(screen.getByText("Premium membership")).toBeInTheDocument();
    expect(screen.getByText("Exclusive membership")).toBeInTheDocument();
  });

  it("displays prices correctly formatted", async () => {
    render(<MembershipCards />);
    await waitFor(() => {
      expect(screen.getByText("$25")).toBeInTheDocument();
    });
    expect(screen.getByText("$50")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
  });

  it("sorts plans by price ascending", async () => {
    render(<MembershipCards />);
    await waitFor(() => {
      expect(screen.getByText("The Lineup")).toBeInTheDocument();
    });
    const descriptions = screen
      .getAllByText(/membership/i)
      .filter((el) => ["Basic membership", "Premium membership", "Exclusive membership"].includes(el.textContent || ""));
    expect(descriptions[0]).toHaveTextContent("Basic membership");
    expect(descriptions[1]).toHaveTextContent("Premium membership");
    expect(descriptions[2]).toHaveTextContent("Exclusive membership");
  });

  it("shows 'Most Popular' badge on middle plan", async () => {
    render(<MembershipCards />);
    await waitFor(() => {
      expect(screen.getByText("Most Popular")).toBeInTheDocument();
    });
  });

  it("shows 'Current Plan' badge when user has matching active subscription", async () => {
    vi.mocked(useAuth).mockReturnValue({
      isSignedIn: true,
      userId: "user_123",
    } as any);

    vi.mocked(useQuery).mockImplementation((ref: any) => {
      if (ref === "checkUserSubscriptionStatus") {
        return { hasActiveSubscription: true } as any;
      }
      if (ref === "fetchUserSubscription") {
        return {
          status: "active",
          amount: 5000,
          customerId: "cust_1",
          polarPriceId: "price_2",
        } as any;
      }
      return undefined;
    });

    render(<MembershipCards />);
    await waitFor(() => {
      expect(screen.getByText("Current Plan", { selector: "span" })).toBeInTheDocument();
    });
  });

  it("shows 'Get Started' button for unauthenticated users", async () => {
    render(<MembershipCards />);
    await waitFor(() => {
      expect(screen.getByText("The Lineup")).toBeInTheDocument();
    });
    // The Lineup and The Hot Towel should have "Get Started", Chairman's Cut has "Join Waitlist"
    const getStartedButtons = screen.getAllByText("Get Started");
    expect(getStartedButtons).toHaveLength(2);
  });

  it("shows 'Current Plan' button text for the current plan", async () => {
    vi.mocked(useAuth).mockReturnValue({
      isSignedIn: true,
      userId: "user_123",
    } as any);

    vi.mocked(useQuery).mockImplementation((ref: any) => {
      if (ref === "checkUserSubscriptionStatus") {
        return { hasActiveSubscription: true } as any;
      }
      if (ref === "fetchUserSubscription") {
        return {
          status: "active",
          amount: 5000,
          customerId: "cust_1",
          polarPriceId: "price_2",
        } as any;
      }
      return undefined;
    });

    render(<MembershipCards />);
    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Current Plan" })).toBeInTheDocument();
    });
  });

  it("shows 'Upgrade' and 'Downgrade' buttons for other plans when subscribed", async () => {
    vi.mocked(useAuth).mockReturnValue({
      isSignedIn: true,
      userId: "user_123",
    } as any);

    vi.mocked(useQuery).mockImplementation((ref: any) => {
      if (ref === "checkUserSubscriptionStatus") {
        return { hasActiveSubscription: true } as any;
      }
      if (ref === "fetchUserSubscription") {
        return {
          status: "active",
          amount: 5000,
          customerId: "cust_1",
          polarPriceId: "price_2",
        } as any;
      }
      return undefined;
    });

    render(<MembershipCards />);
    await waitFor(() => {
      expect(screen.getByText("Downgrade (-$25/mo)")).toBeInTheDocument();
    });
    // Chairman's Cut shows "Join Waitlist" instead of "Upgrade" since it's a waitlist plan
    expect(screen.getByText("Join Waitlist")).toBeInTheDocument();
  });

  it("redirects to /sign-in when clicking subscribe while unauthenticated", async () => {
    const hrefSetter = vi.fn();
    Object.defineProperty(window, "location", {
      value: { href: "" },
      writable: true,
    });
    Object.defineProperty(window.location, "href", {
      set: hrefSetter,
      get: () => "",
    });

    render(<MembershipCards />);
    await waitFor(() => {
      expect(screen.getByText("The Lineup")).toBeInTheDocument();
    });

    const getStartedButtons = screen.getAllByText("Get Started");
    fireEvent.click(getStartedButtons[0]);

    await waitFor(() => {
      expect(hrefSetter).toHaveBeenCalledWith("/sign-in");
    });
  });

  it("shows 'Join Waitlist' button for Chairman's Cut plan", async () => {
    render(<MembershipCards />);
    await waitFor(() => {
      expect(screen.getByText("Join Waitlist")).toBeInTheDocument();
    });
    expect(screen.getByTestId("waitlist-dialog")).toHaveAttribute(
      "data-plan-name",
      "The Chairman's Cut"
    );
  });

  it("shows header when showHeader prop is true", async () => {
    render(<MembershipCards showHeader />);
    await waitFor(() => {
      expect(screen.getByText("Simple, transparent pricing")).toBeInTheDocument();
    });
    expect(screen.getByText("Choose the plan that fits your needs")).toBeInTheDocument();
  });

  it("does not show header when showHeader is false", async () => {
    render(<MembershipCards />);
    await waitFor(() => {
      expect(screen.getByText("The Lineup")).toBeInTheDocument();
    });
    expect(screen.queryByText("Simple, transparent pricing")).not.toBeInTheDocument();
  });

  it("shows 'Complete your setup' message when signed in but no active subscription", async () => {
    vi.mocked(useAuth).mockReturnValue({
      isSignedIn: true,
      userId: "user_123",
    } as any);

    vi.mocked(useQuery).mockImplementation((ref: any) => {
      if (ref === "checkUserSubscriptionStatus") {
        return { hasActiveSubscription: false } as any;
      }
      return undefined;
    });

    render(<MembershipCards showHeader />);
    await waitFor(() => {
      expect(screen.getByText("Complete your setup")).toBeInTheDocument();
    });
  });

  it("displays error message when plans fail to load", async () => {
    mockGetPlans.mockRejectedValue(new Error("Network error"));
    render(<MembershipCards />);
    await waitFor(() => {
      expect(
        screen.getByText("Failed to load pricing plans. Please try again.")
      ).toBeInTheDocument();
    });
  });

  it("shows amber warning when user has subscription not in displayed plans", async () => {
    vi.mocked(useAuth).mockReturnValue({
      isSignedIn: true,
      userId: "user_123",
    } as any);

    vi.mocked(useQuery).mockImplementation((ref: any) => {
      if (ref === "checkUserSubscriptionStatus") {
        return { hasActiveSubscription: true } as any;
      }
      if (ref === "fetchUserSubscription") {
        return {
          status: "active",
          amount: 7500,
          customerId: "cust_1",
          polarPriceId: "price_unknown",
        } as any;
      }
      return undefined;
    });

    render(<MembershipCards />);
    await waitFor(() => {
      expect(
        screen.getByText(
          "You have an active subscription that's not shown above. Contact support for assistance."
        )
      ).toBeInTheDocument();
    });
  });

  it("shows 'Recurring billing' feature for recurring plans", async () => {
    render(<MembershipCards />);
    await waitFor(() => {
      expect(screen.getAllByText("Recurring billing")).toHaveLength(3);
    });
  });
});
