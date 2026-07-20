export const EDUCATION_LEVELS = [
  { value: "high-school", label: "High school" },
  { value: "college", label: "College" },
  { value: "graduate-school", label: "Graduate school" },
  { value: "beauty-barber-school", label: "Beauty/Barber school" },
  { value: "trade-business-school", label: "Trade/business school" },
  { value: "other", label: "Other" },
] as const;

export const DESIRED_POSITIONS = [
  { value: "barber", label: "Barber" },
  { value: "stylist", label: "Stylist (women's)" },
  { value: "nail-technician", label: "Nail technician" },
] as const;

export const US_STATES = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "DC", label: "District of Columbia" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
] as const;

export type EducationLevel = (typeof EDUCATION_LEVELS)[number]["value"];
export type DesiredPosition = (typeof DESIRED_POSITIONS)[number]["value"];
export type YesNo = "yes" | "no";

export type EmploymentApplicationValues = {
  firstName: string;
  lastName: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  educationLevel: EducationLevel | "";
  desiredPosition: DesiredPosition | "";
  desiredSalary: string;
  dateAvailable: string;
  previouslyEmployed: YesNo | "";
  hasValidLicense: YesNo | "";
  currentlyEmployed: YesNo | "";
  canInquirePresentEmployment: YesNo | "";
  companyName: string;
  companyAddress: string;
  supervisor: string;
  duties: string;
  lastWages: string;
  dateStarted: string;
  dateLeft: string;
  reasonForLeaving: string;
  canProvideWorkPermit: YesNo | "";
  careerGoals: string;
  salonPersonality: string;
  professionalContribution: string;
  additionalRemarks: string;
  acknowledgement: boolean;
};

export type EmploymentApplicationActionData = {
  ok: boolean;
  message: string;
  values?: EmploymentApplicationValues;
};

export function positionRequiresLicense(position: DesiredPosition | ""): boolean {
  return position === "barber" || position === "stylist";
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
