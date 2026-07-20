import { fireEvent, render, screen } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";
import EmploymentPage from "~/routes/employment";

const EmploymentRouteStub = createRoutesStub([
  {
    path: "/employment",
    Component: EmploymentPage,
  },
]);

describe("EmploymentPage", () => {
  it("renders the application sections and required controls", () => {
    const { container } = render(<EmploymentRouteStub initialEntries={["/employment"]} />);

    expect(screen.getByRole("heading", { name: "Employment" })).toBeInTheDocument();
    expect(screen.getByText(/Bring your talent to Timeout at Shannon's/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Personal information" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Educational background" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Desired position" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Recent employment" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Work eligibility" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Personal statements" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Acknowledgement and disclaimer" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Apply" })).toBeInTheDocument();
    expect(
      screen.getByText(/Timeout at Shannon's is an Equal Opportunity Employer/i),
    ).toBeInTheDocument();
    expect(screen.queryByText(/convicted of a crime/i)).not.toBeInTheDocument();
    expect(container.querySelector('input[name="applicationFax"]')).toBeInTheDocument();
    expect(container.querySelector('input[name="company"]')).not.toBeInTheDocument();
  });

  it("shows the license question for barber applicants", () => {
    render(<EmploymentRouteStub initialEntries={["/employment"]} />);

    fireEvent.click(screen.getByLabelText("Barber"));

    expect(
      screen.getByText(/Do you have a valid license\? \(If you are applying for barber\/stylist position\)/i),
    ).toBeInTheDocument();
  });

  it("shows the present-employment inquiry when currently employed is yes", () => {
    render(<EmploymentRouteStub initialEntries={["/employment"]} />);

    fireEvent.click(screen.getByLabelText("Yes", { selector: "input[name='currentlyEmployed']" }));

    expect(
      screen.getByText(/can we inquire about your present employment\?/i),
    ).toBeInTheDocument();
  });
});
