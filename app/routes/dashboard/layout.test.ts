import { describe, it, expect, vi, beforeEach } from "vitest";

// Use vi.hoisted so these are available in hoisted vi.mock factories
const { mockGetAuth, mockFetchQuery, mockGetUser, mockCreateClerkClient } =
  vi.hoisted(() => {
    const mockGetUser = vi.fn();
    return {
      mockGetAuth: vi.fn(),
      mockFetchQuery: vi.fn(),
      mockGetUser,
      mockCreateClerkClient: vi.fn(() => ({
        users: { getUser: mockGetUser },
      })),
    };
  });

vi.mock("@clerk/react-router/ssr.server", () => ({
  getAuth: mockGetAuth,
}));

vi.mock("convex/nextjs", () => ({
  fetchQuery: mockFetchQuery,
}));

vi.mock("@clerk/react-router/api.server", () => ({
  createClerkClient: mockCreateClerkClient,
}));

// Mock react-router redirect to match real behavior (throws a Response)
vi.mock("react-router", () => ({
  redirect: (url: string) => {
    return new Response(null, {
      status: 302,
      headers: { Location: url },
    });
  },
}));

import { dashboardLoader } from "./layout.loader";

// Helper to create a minimal loader args object
function createLoaderArgs(overrides = {}) {
  return {
    request: new Request("http://localhost/dashboard"),
    params: {},
    context: {},
    ...overrides,
  } as any;
}

describe("Dashboard layout loader", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("CLERK_SECRET_KEY", "test_secret_key");
  });

  it("redirects to /sign-in when user is not authenticated", async () => {
    mockGetAuth.mockResolvedValue({ userId: null });

    const args = createLoaderArgs();

    try {
      await dashboardLoader(args);
      expect.unreachable("Should have thrown a redirect");
    } catch (response: any) {
      expect(response).toBeInstanceOf(Response);
      expect(response.status).toBe(302);
      expect(response.headers.get("Location")).toBe("/sign-in");
    }
  });

  it("redirects to /subscription-required when user has no active subscription", async () => {
    mockGetAuth.mockResolvedValue({ userId: "user_123" });
    mockFetchQuery.mockResolvedValue({ hasActiveSubscription: false });
    mockGetUser.mockResolvedValue({
      id: "user_123",
      firstName: "Test",
      lastName: "User",
    });

    const args = createLoaderArgs();

    try {
      await dashboardLoader(args);
      expect.unreachable("Should have thrown a redirect");
    } catch (response: any) {
      expect(response).toBeInstanceOf(Response);
      expect(response.status).toBe(302);
      expect(response.headers.get("Location")).toBe("/subscription-required");
    }
  });

  it("redirects to /subscription-required when subscription status is null", async () => {
    mockGetAuth.mockResolvedValue({ userId: "user_123" });
    mockFetchQuery.mockResolvedValue(null);
    mockGetUser.mockResolvedValue({ id: "user_123" });

    const args = createLoaderArgs();

    try {
      await dashboardLoader(args);
      expect.unreachable("Should have thrown a redirect");
    } catch (response: any) {
      expect(response).toBeInstanceOf(Response);
      expect(response.status).toBe(302);
      expect(response.headers.get("Location")).toBe("/subscription-required");
    }
  });

  it("returns user data when authenticated with active subscription", async () => {
    const mockUser = {
      id: "user_123",
      firstName: "Test",
      lastName: "User",
      emailAddresses: [{ emailAddress: "test@example.com" }],
      imageUrl: "https://example.com/avatar.png",
    };

    mockGetAuth.mockResolvedValue({ userId: "user_123" });
    mockFetchQuery.mockResolvedValue({ hasActiveSubscription: true });
    mockGetUser.mockResolvedValue(mockUser);

    const args = createLoaderArgs();
    const result = await dashboardLoader(args);

    expect(result).toEqual({ user: mockUser });
  });

  it("passes userId to subscription check query", async () => {
    mockGetAuth.mockResolvedValue({ userId: "user_456" });
    mockFetchQuery.mockResolvedValue({ hasActiveSubscription: true });
    mockGetUser.mockResolvedValue({ id: "user_456" });

    const args = createLoaderArgs();
    await dashboardLoader(args);

    expect(mockFetchQuery).toHaveBeenCalledWith(
      expect.anything(),
      { userId: "user_456" }
    );
  });

  it("creates Clerk client with secret key from env", async () => {
    mockGetAuth.mockResolvedValue({ userId: "user_123" });
    mockFetchQuery.mockResolvedValue({ hasActiveSubscription: true });
    mockGetUser.mockResolvedValue({ id: "user_123" });

    const args = createLoaderArgs();
    await dashboardLoader(args);

    expect(mockCreateClerkClient).toHaveBeenCalledWith({
      secretKey: "test_secret_key",
    });
  });

  it("fetches subscription status and user data in parallel", async () => {
    mockGetAuth.mockResolvedValue({ userId: "user_123" });

    // Track call order to verify both are initiated before awaiting
    const callOrder: string[] = [];
    mockFetchQuery.mockImplementation(async () => {
      callOrder.push("fetchQuery");
      return { hasActiveSubscription: true };
    });
    mockGetUser.mockImplementation(async () => {
      callOrder.push("getUser");
      return { id: "user_123" };
    });

    const args = createLoaderArgs();
    await dashboardLoader(args);

    // Both should have been called
    expect(mockFetchQuery).toHaveBeenCalledTimes(1);
    expect(mockGetUser).toHaveBeenCalledTimes(1);
  });

  it("does not fetch subscription or user data when not authenticated", async () => {
    mockGetAuth.mockResolvedValue({ userId: null });

    const args = createLoaderArgs();

    try {
      await dashboardLoader(args);
    } catch {
      // Expected redirect
    }

    expect(mockFetchQuery).not.toHaveBeenCalled();
    expect(mockGetUser).not.toHaveBeenCalled();
    expect(mockCreateClerkClient).not.toHaveBeenCalled();
  });
});
