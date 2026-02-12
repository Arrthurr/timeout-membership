import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";

const { mockSubmitInquiry, mockSendNotification } = vi.hoisted(() => ({
  mockSubmitInquiry: vi.fn(),
  mockSendNotification: vi.fn(),
}));

vi.mock("convex/react", () => ({
  useMutation: () => mockSubmitInquiry,
  useAction: () => mockSendNotification,
}));

vi.mock("../../../convex/_generated/api", () => ({
  api: {
    waitlist: { submitWaitlistInquiry: "submitWaitlistInquiry" },
    waitlistEmail: { sendWaitlistNotification: "sendWaitlistNotification" },
  },
}));

import { WaitlistDialog } from "./waitlist-dialog";

function renderDialog(planName = "The Chairman's Cut") {
  return render(
    <WaitlistDialog planName={planName}>
      <button>Join Waitlist</button>
    </WaitlistDialog>
  );
}

describe("WaitlistDialog", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSubmitInquiry.mockResolvedValue(undefined);
    mockSendNotification.mockResolvedValue(undefined);
    // Radix Dialog uses matchMedia for reduced motion
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders trigger button and dialog starts closed", () => {
    renderDialog();
    expect(screen.getByText("Join Waitlist")).toBeInTheDocument();
    expect(screen.queryByText("Join the Waitlist")).not.toBeInTheDocument();
  });

  it("opens dialog when trigger is clicked and shows form with plan name", async () => {
    renderDialog("The Chairman's Cut");
    fireEvent.click(screen.getByText("Join Waitlist"));

    await waitFor(() => {
      expect(screen.getByText("Join the Waitlist")).toBeInTheDocument();
    });
    expect(
      screen.getByText(/Interested in The Chairman's Cut\?/)
    ).toBeInTheDocument();
  });

  it("shows required fields (name, email) and optional fields (phone, message)", async () => {
    renderDialog();
    fireEvent.click(screen.getByText("Join Waitlist"));

    await waitFor(() => {
      expect(screen.getByLabelText("Full Name *")).toBeInTheDocument();
    });
    expect(screen.getByLabelText("Email *")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone (optional)")).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Why are you interested in .+\? \(optional\)/)
    ).toBeInTheDocument();
  });

  it("form fields are controlled — values update on change", async () => {
    renderDialog();
    fireEvent.click(screen.getByText("Join Waitlist"));

    await waitFor(() => {
      expect(screen.getByLabelText("Full Name *")).toBeInTheDocument();
    });

    const nameInput = screen.getByLabelText("Full Name *");
    const emailInput = screen.getByLabelText("Email *");
    const phoneInput = screen.getByLabelText("Phone (optional)");
    const messageInput = screen.getByLabelText(
      /Why are you interested in .+\? \(optional\)/
    );

    fireEvent.change(nameInput, { target: { value: "Jane Doe" } });
    fireEvent.change(emailInput, { target: { value: "jane@test.com" } });
    fireEvent.change(phoneInput, { target: { value: "(312) 555-0000" } });
    fireEvent.change(messageInput, { target: { value: "Very interested!" } });

    expect(nameInput).toHaveValue("Jane Doe");
    expect(emailInput).toHaveValue("jane@test.com");
    expect(phoneInput).toHaveValue("(312) 555-0000");
    expect(messageInput).toHaveValue("Very interested!");
  });

  it("disables submit button and inputs while submitting", async () => {
    let resolveSubmit: () => void;
    mockSubmitInquiry.mockImplementation(
      () => new Promise<void>((resolve) => (resolveSubmit = resolve))
    );

    renderDialog();
    fireEvent.click(screen.getByText("Join Waitlist"));

    await waitFor(() => {
      expect(screen.getByLabelText("Full Name *")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText("Full Name *"), {
      target: { value: "Test" },
    });
    fireEvent.change(screen.getByLabelText("Email *"), {
      target: { value: "test@test.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Submit Inquiry" }));

    await waitFor(() => {
      expect(screen.getByText("Submitting...")).toBeInTheDocument();
    });

    expect(screen.getByLabelText("Full Name *")).toBeDisabled();
    expect(screen.getByLabelText("Email *")).toBeDisabled();
    expect(screen.getByLabelText("Phone (optional)")).toBeDisabled();
    expect(
      screen.getByRole("button", { name: /Submitting/ })
    ).toBeDisabled();

    resolveSubmit!();
  });

  it("shows success state after successful submission", async () => {
    renderDialog("The Chairman's Cut");
    fireEvent.click(screen.getByText("Join Waitlist"));

    await waitFor(() => {
      expect(screen.getByLabelText("Full Name *")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText("Full Name *"), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByLabelText("Email *"), {
      target: { value: "test@example.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Submit Inquiry" }));

    await waitFor(() => {
      expect(
        screen.getByText("Thank you for your interest!")
      ).toBeInTheDocument();
    });

    // Form should no longer be visible
    expect(screen.queryByLabelText("Full Name *")).not.toBeInTheDocument();
  });

  it("success state shows correct plan name in description", async () => {
    renderDialog("The Chairman's Cut");
    fireEvent.click(screen.getByText("Join Waitlist"));

    await waitFor(() => {
      expect(screen.getByLabelText("Full Name *")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText("Full Name *"), {
      target: { value: "Test" },
    });
    fireEvent.change(screen.getByLabelText("Email *"), {
      target: { value: "t@t.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Submit Inquiry" }));

    await waitFor(() => {
      expect(
        screen.getByText(/We've received your inquiry for The Chairman's Cut/)
      ).toBeInTheDocument();
    });
  });

  it("close button in success state closes dialog", async () => {
    renderDialog();
    fireEvent.click(screen.getByText("Join Waitlist"));

    await waitFor(() => {
      expect(screen.getByLabelText("Full Name *")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText("Full Name *"), {
      target: { value: "Test" },
    });
    fireEvent.change(screen.getByLabelText("Email *"), {
      target: { value: "t@t.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Submit Inquiry" }));

    await waitFor(() => {
      expect(
        screen.getByText("Thank you for your interest!")
      ).toBeInTheDocument();
    });

    // The success state has a visible "Close" button distinct from the X close button
    const closeButtons = screen.getAllByRole("button", { name: /Close/i });
    // The success state Close button is the one with visible text (not the sr-only X button)
    const successCloseButton = closeButtons.find(
      (btn) => btn.textContent?.trim() === "Close"
    )!;
    fireEvent.click(successCloseButton);

    await waitFor(() => {
      expect(
        screen.queryByText("Thank you for your interest!")
      ).not.toBeInTheDocument();
    });
  });

  it("shows error message when submitInquiry throws", async () => {
    mockSubmitInquiry.mockRejectedValue(new Error("Network error"));

    renderDialog();
    fireEvent.click(screen.getByText("Join Waitlist"));

    await waitFor(() => {
      expect(screen.getByLabelText("Full Name *")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText("Full Name *"), {
      target: { value: "Test" },
    });
    fireEvent.change(screen.getByLabelText("Email *"), {
      target: { value: "t@t.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Submit Inquiry" }));

    await waitFor(() => {
      expect(
        screen.getByText("Something went wrong. Please try again.")
      ).toBeInTheDocument();
    });

    // Form should still be visible
    expect(screen.getByLabelText("Full Name *")).toBeInTheDocument();
  });

  it("calls sendNotification after successful submit (fire and forget)", async () => {
    renderDialog("The Chairman's Cut");
    fireEvent.click(screen.getByText("Join Waitlist"));

    await waitFor(() => {
      expect(screen.getByLabelText("Full Name *")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText("Full Name *"), {
      target: { value: "Jane" },
    });
    fireEvent.change(screen.getByLabelText("Email *"), {
      target: { value: "jane@test.com" },
    });
    fireEvent.change(screen.getByLabelText("Phone (optional)"), {
      target: { value: "(312) 555-1234" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Submit Inquiry" }));

    await waitFor(() => {
      expect(mockSendNotification).toHaveBeenCalledWith({
        name: "Jane",
        email: "jane@test.com",
        phone: "(312) 555-1234",
        message: undefined,
        planName: "The Chairman's Cut",
      });
    });
  });

  it("resets form state when dialog is closed and reopened", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });

    renderDialog();
    fireEvent.click(screen.getByText("Join Waitlist"));

    await waitFor(() => {
      expect(screen.getByLabelText("Full Name *")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText("Full Name *"), {
      target: { value: "Test" },
    });
    fireEvent.change(screen.getByLabelText("Email *"), {
      target: { value: "t@t.com" },
    });

    // Close dialog via the X button (Radix close button)
    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    // Advance past the 200ms setTimeout for state reset
    await act(() => vi.advanceTimersByTime(300));

    await waitFor(() => {
      expect(screen.queryByLabelText("Full Name *")).not.toBeInTheDocument();
    });

    // Reopen
    fireEvent.click(screen.getByText("Join Waitlist"));

    await waitFor(() => {
      expect(screen.getByLabelText("Full Name *")).toBeInTheDocument();
    });

    expect(screen.getByLabelText("Full Name *")).toHaveValue("");
    expect(screen.getByLabelText("Email *")).toHaveValue("");

    vi.useRealTimers();
  });
});
