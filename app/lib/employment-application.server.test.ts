import { describe, expect, it } from "vitest";
import type { EmploymentApplicationValues } from "~/lib/employment-application";
import {
  formatEmploymentApplicationEmail,
  parseEmploymentApplicationFormData,
  validateEmploymentApplication,
} from "~/lib/employment-application.server";

function createValidApplication(
  overrides: Partial<EmploymentApplicationValues> = {},
): EmploymentApplicationValues {
  return {
    firstName: "Jordan",
    lastName: "Lee",
    email: "jordan@example.com",
    addressLine1: "123 Main St",
    addressLine2: "Apt 4",
    city: "Chicago",
    state: "IL",
    zipCode: "60707",
    educationLevel: "beauty-barber-school",
    desiredPosition: "barber",
    desiredSalary: "$60,000",
    dateAvailable: "2026-08-01",
    previouslyEmployed: "no",
    hasValidLicense: "yes",
    currentlyEmployed: "yes",
    canInquirePresentEmployment: "yes",
    companyName: "North Side Cuts",
    companyAddress: "456 Oak Ave, Chicago, IL",
    supervisor: "Alex Morgan",
    duties: "Cuts, shaves, and client consultations",
    lastWages: "$22/hour",
    dateStarted: "2024-01-15",
    dateLeft: "2026-06-01",
    reasonForLeaving: "Relocated",
    canProvideWorkPermit: "no",
    careerGoals: "Build a loyal client book",
    salonPersonality: "Warm, professional, and community-focused",
    professionalContribution: "Strong client service and team collaboration",
    additionalRemarks: "Available evenings",
    acknowledgement: true,
    ...overrides,
  };
}

function toFormData(values: EmploymentApplicationValues): FormData {
  const formData = new FormData();
  formData.set("firstName", values.firstName);
  formData.set("lastName", values.lastName);
  formData.set("email", values.email);
  formData.set("addressLine1", values.addressLine1);
  formData.set("addressLine2", values.addressLine2);
  formData.set("city", values.city);
  formData.set("state", values.state);
  formData.set("zipCode", values.zipCode);
  formData.set("educationLevel", values.educationLevel);
  formData.set("desiredPosition", values.desiredPosition);
  formData.set("desiredSalary", values.desiredSalary);
  formData.set("dateAvailable", values.dateAvailable);
  formData.set("previouslyEmployed", values.previouslyEmployed);
  formData.set("hasValidLicense", values.hasValidLicense);
  formData.set("currentlyEmployed", values.currentlyEmployed);
  formData.set("canInquirePresentEmployment", values.canInquirePresentEmployment);
  formData.set("companyName", values.companyName);
  formData.set("companyAddress", values.companyAddress);
  formData.set("supervisor", values.supervisor);
  formData.set("duties", values.duties);
  formData.set("lastWages", values.lastWages);
  formData.set("dateStarted", values.dateStarted);
  formData.set("dateLeft", values.dateLeft);
  formData.set("reasonForLeaving", values.reasonForLeaving);
  formData.set("canProvideWorkPermit", values.canProvideWorkPermit);
  formData.set("careerGoals", values.careerGoals);
  formData.set("salonPersonality", values.salonPersonality);
  formData.set("professionalContribution", values.professionalContribution);
  formData.set("additionalRemarks", values.additionalRemarks);
  if (values.acknowledgement) {
    formData.set("acknowledgement", "on");
  }
  return formData;
}

describe("parseEmploymentApplicationFormData", () => {
  it("parses submitted values and acknowledgement checkbox", () => {
    const values = createValidApplication();
    const parsed = parseEmploymentApplicationFormData(toFormData(values));

    expect(parsed.firstName).toBe("Jordan");
    expect(parsed.desiredPosition).toBe("barber");
    expect(parsed.acknowledgement).toBe(true);
  });
});

describe("validateEmploymentApplication", () => {
  it("accepts a complete barber application", () => {
    expect(validateEmploymentApplication(createValidApplication())).toBeNull();
  });

  it("rejects missing required fields", () => {
    expect(
      validateEmploymentApplication(createValidApplication({ firstName: "" })),
    ).toBe("Please complete all required fields.");
  });

  it("rejects malformed email addresses", () => {
    expect(
      validateEmploymentApplication(createValidApplication({ email: "not-an-email" })),
    ).toBe("Please enter a valid email address.");
  });

  it("requires a license for barber and stylist roles", () => {
    expect(
      validateEmploymentApplication(
        createValidApplication({ desiredPosition: "barber", hasValidLicense: "" }),
      ),
    ).toBe("Please indicate whether you have a valid license for this position.");

    expect(
      validateEmploymentApplication(
        createValidApplication({
          desiredPosition: "nail-technician",
          hasValidLicense: "",
        }),
      ),
    ).toBeNull();
  });

  it("requires present-employment inquiry when currently employed", () => {
    expect(
      validateEmploymentApplication(
        createValidApplication({
          currentlyEmployed: "yes",
          canInquirePresentEmployment: "",
        }),
      ),
    ).toBe("Please indicate whether we may inquire about your present employment.");
  });

  it("requires acknowledgement", () => {
    expect(
      validateEmploymentApplication(createValidApplication({ acknowledgement: false })),
    ).toBe("Please confirm that you understand and agree to the acknowledgement statement.");
  });
});

describe("formatEmploymentApplicationEmail", () => {
  it("includes key sections and applicant details", () => {
    const email = formatEmploymentApplicationEmail(createValidApplication());

    expect(email).toContain("New employment application");
    expect(email).toContain("Jordan Lee");
    expect(email).toContain("Position: Barber");
    expect(email).toContain("Valid license: Yes");
    expect(email).toContain("May inquire about present employment: Yes");
    expect(email).toContain("Work eligibility");
    expect(email).not.toContain("Criminal disclosure");
  });
});
