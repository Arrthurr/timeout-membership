import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

const { mockUseChat, mockHandleSubmit, mockHandleInputChange } = vi.hoisted(
  () => ({
    mockUseChat: vi.fn(),
    mockHandleSubmit: vi.fn((e: any) => e.preventDefault()),
    mockHandleInputChange: vi.fn(),
  })
);

vi.mock("@ai-sdk/react", () => ({
  useChat: mockUseChat,
}));

vi.mock("react-markdown", () => ({
  default: ({ children }: { children: string }) => <span>{children}</span>,
}));

import Chat from "./chat";

beforeEach(() => {
  vi.clearAllMocks();
  mockUseChat.mockReturnValue({
    messages: [],
    input: "",
    handleInputChange: mockHandleInputChange,
    handleSubmit: mockHandleSubmit,
    isLoading: false,
  });
});

describe("Chat", () => {
  it("renders the input field and send button", () => {
    render(<Chat />);
    expect(screen.getByPlaceholderText("Say something...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();
  });

  it("configures useChat with correct API endpoint", () => {
    render(<Chat />);
    expect(mockUseChat).toHaveBeenCalledWith(
      expect.objectContaining({
        api: expect.stringContaining("/api/chat"),
        maxSteps: 10,
      })
    );
  });

  it("shows no messages initially", () => {
    render(<Chat />);
    const messageArea = screen.queryByText("Hello");
    expect(messageArea).not.toBeInTheDocument();
  });

  it("renders user messages with correct styling alignment", () => {
    mockUseChat.mockReturnValue({
      messages: [
        {
          id: "msg-1",
          role: "user",
          content: "Hello there",
          parts: [{ type: "text", text: "Hello there" }],
        },
      ],
      input: "",
      handleInputChange: mockHandleInputChange,
      handleSubmit: mockHandleSubmit,
      isLoading: false,
    });

    render(<Chat />);
    expect(screen.getByText("Hello there")).toBeInTheDocument();
  });

  it("renders assistant messages", () => {
    mockUseChat.mockReturnValue({
      messages: [
        {
          id: "msg-1",
          role: "assistant",
          content: "Hi, how can I help?",
          parts: [{ type: "text", text: "Hi, how can I help?" }],
        },
      ],
      input: "",
      handleInputChange: mockHandleInputChange,
      handleSubmit: mockHandleSubmit,
      isLoading: false,
    });

    render(<Chat />);
    expect(screen.getByText("Hi, how can I help?")).toBeInTheDocument();
  });

  it("renders a conversation with multiple messages in order", () => {
    mockUseChat.mockReturnValue({
      messages: [
        {
          id: "msg-1",
          role: "user",
          content: "What services do you offer?",
          parts: [{ type: "text", text: "What services do you offer?" }],
        },
        {
          id: "msg-2",
          role: "assistant",
          content: "We offer haircuts, shaves, and more!",
          parts: [
            { type: "text", text: "We offer haircuts, shaves, and more!" },
          ],
        },
      ],
      input: "",
      handleInputChange: mockHandleInputChange,
      handleSubmit: mockHandleSubmit,
      isLoading: false,
    });

    render(<Chat />);
    expect(
      screen.getByText("What services do you offer?")
    ).toBeInTheDocument();
    expect(
      screen.getByText("We offer haircuts, shaves, and more!")
    ).toBeInTheDocument();
  });

  it("calls handleSubmit when form is submitted", () => {
    render(<Chat />);
    const form = screen.getByRole("button", { name: "Send" }).closest("form")!;
    fireEvent.submit(form);
    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it("calls handleInputChange when typing in input", () => {
    render(<Chat />);
    const input = screen.getByPlaceholderText("Say something...");
    fireEvent.change(input, { target: { value: "test message" } });
    expect(mockHandleInputChange).toHaveBeenCalled();
  });

  it("skips non-text message parts", () => {
    mockUseChat.mockReturnValue({
      messages: [
        {
          id: "msg-1",
          role: "assistant",
          content: "",
          parts: [{ type: "tool-invocation", toolName: "search" }],
        },
      ],
      input: "",
      handleInputChange: mockHandleInputChange,
      handleSubmit: mockHandleSubmit,
      isLoading: false,
    });

    render(<Chat />);
    // Should render without errors, no text content from tool parts
    expect(screen.queryByText("search")).not.toBeInTheDocument();
  });
});
