import {
  DESIRED_POSITIONS,
  EDUCATION_LEVELS,
  type DesiredPosition,
  type EducationLevel,
  type EmploymentApplicationValues,
  type YesNo,
  isValidEmail,
  positionRequiresLicense,
  US_STATES,
} from "~/lib/employment-application";

export type {
  EmploymentApplicationActionData,
  EmploymentApplicationValues,
} from "~/lib/employment-application";

export {
  DESIRED_POSITIONS,
  EDUCATION_LEVELS,
  US_STATES,
  isValidEmail,
  positionRequiresLicense,
};

const EDUCATION_LEVEL_SET = new Set<string>(EDUCATION_LEVELS.map((entry) => entry.value));
const DESIRED_POSITION_SET = new Set<string>(DESIRED_POSITIONS.map((entry) => entry.value));
const US_STATE_SET = new Set<string>(US_STATES.map((entry) => entry.value));

function getFieldValue(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function parseYesNo(value: string): YesNo | "" {
  if (value === "yes" || value === "no") {
    return value;
  }
  return "";
}

export function parseEmploymentApplicationFormData(
  formData: FormData,
): EmploymentApplicationValues {
  const educationLevel = getFieldValue(formData, "educationLevel");
  const desiredPosition = getFieldValue(formData, "desiredPosition");

  return {
    firstName: getFieldValue(formData, "firstName"),
    lastName: getFieldValue(formData, "lastName"),
    email: getFieldValue(formData, "email"),
    addressLine1: getFieldValue(formData, "addressLine1"),
    addressLine2: getFieldValue(formData, "addressLine2"),
    city: getFieldValue(formData, "city"),
    state: getFieldValue(formData, "state"),
    zipCode: getFieldValue(formData, "zipCode"),
    educationLevel: EDUCATION_LEVEL_SET.has(educationLevel)
      ? (educationLevel as EducationLevel)
      : "",
    desiredPosition: DESIRED_POSITION_SET.has(desiredPosition)
      ? (desiredPosition as DesiredPosition)
      : "",
    desiredSalary: getFieldValue(formData, "desiredSalary"),
    dateAvailable: getFieldValue(formData, "dateAvailable"),
    previouslyEmployed: parseYesNo(getFieldValue(formData, "previouslyEmployed")),
    hasValidLicense: parseYesNo(getFieldValue(formData, "hasValidLicense")),
    currentlyEmployed: parseYesNo(getFieldValue(formData, "currentlyEmployed")),
    canInquirePresentEmployment: parseYesNo(
      getFieldValue(formData, "canInquirePresentEmployment"),
    ),
    companyName: getFieldValue(formData, "companyName"),
    companyAddress: getFieldValue(formData, "companyAddress"),
    supervisor: getFieldValue(formData, "supervisor"),
    duties: getFieldValue(formData, "duties"),
    lastWages: getFieldValue(formData, "lastWages"),
    dateStarted: getFieldValue(formData, "dateStarted"),
    dateLeft: getFieldValue(formData, "dateLeft"),
    reasonForLeaving: getFieldValue(formData, "reasonForLeaving"),
    canProvideWorkPermit: parseYesNo(getFieldValue(formData, "canProvideWorkPermit")),
    careerGoals: getFieldValue(formData, "careerGoals"),
    salonPersonality: getFieldValue(formData, "salonPersonality"),
    professionalContribution: getFieldValue(formData, "professionalContribution"),
    additionalRemarks: getFieldValue(formData, "additionalRemarks"),
    acknowledgement: formData.get("acknowledgement") === "on",
  };
}

export function validateEmploymentApplication(
  values: EmploymentApplicationValues,
): string | null {
  if (
    !values.firstName ||
    !values.lastName ||
    !values.email ||
    !values.addressLine1 ||
    !values.city ||
    !values.state ||
    !values.zipCode ||
    !values.educationLevel ||
    !values.desiredPosition
  ) {
    return "Please complete all required fields.";
  }

  if (!US_STATE_SET.has(values.state)) {
    return "Please select a valid U.S. state.";
  }

  if (!isValidEmail(values.email)) {
    return "Please enter a valid email address.";
  }

  if (!values.previouslyEmployed) {
    return "Please indicate whether you were previously employed by Timeout At Shannon's.";
  }

  if (positionRequiresLicense(values.desiredPosition) && !values.hasValidLicense) {
    return "Please indicate whether you have a valid license for this position.";
  }

  if (!values.currentlyEmployed) {
    return "Please indicate whether you are currently employed.";
  }

  if (values.currentlyEmployed === "yes" && !values.canInquirePresentEmployment) {
    return "Please indicate whether we may inquire about your present employment.";
  }

  if (!values.acknowledgement) {
    return "Please confirm that you understand and agree to the acknowledgement statement.";
  }

  return null;
}

function formatYesNo(value: YesNo | ""): string {
  if (value === "yes") return "Yes";
  if (value === "no") return "No";
  return "Not provided";
}

function labelForEducationLevel(value: EducationLevel | ""): string {
  const match = EDUCATION_LEVELS.find((entry) => entry.value === value);
  return match?.label ?? "Not provided";
}

function labelForDesiredPosition(value: DesiredPosition | ""): string {
  const match = DESIRED_POSITIONS.find((entry) => entry.value === value);
  return match?.label ?? "Not provided";
}

function formatOptional(value: string): string {
  return value.trim() ? value : "Not provided";
}

export function formatEmploymentApplicationEmail(values: EmploymentApplicationValues): string {
  const addressLines = [
    values.addressLine1,
    values.addressLine2,
    `${values.city}, ${values.state} ${values.zipCode}`,
  ].filter(Boolean);

  const sections = [
    "New employment application",
    "",
    "Personal information",
    `Name: ${values.firstName} ${values.lastName}`,
    `Email: ${values.email}`,
    "Address:",
    ...addressLines.map((line) => `  ${line}`),
    "",
    "Educational background",
    `Most recent education: ${labelForEducationLevel(values.educationLevel)}`,
    "",
    "Desired position",
    `Position: ${labelForDesiredPosition(values.desiredPosition)}`,
    `Desired salary: ${formatOptional(values.desiredSalary)}`,
    `Date available: ${formatOptional(values.dateAvailable)}`,
    `Previously employed by Timeout At Shannon's: ${formatYesNo(values.previouslyEmployed)}`,
    ...(positionRequiresLicense(values.desiredPosition)
      ? [`Valid license: ${formatYesNo(values.hasValidLicense)}`]
      : []),
    `Currently employed: ${formatYesNo(values.currentlyEmployed)}`,
    ...(values.currentlyEmployed === "yes"
      ? [
          `May inquire about present employment: ${formatYesNo(values.canInquirePresentEmployment)}`,
        ]
      : []),
    "",
    "Recent employment",
    `Company name: ${formatOptional(values.companyName)}`,
    `Company address: ${formatOptional(values.companyAddress)}`,
    `Supervisor/manager: ${formatOptional(values.supervisor)}`,
    `Describe duties: ${formatOptional(values.duties)}`,
    `Last wages: ${formatOptional(values.lastWages)}`,
    `Date started: ${formatOptional(values.dateStarted)}`,
    `Date left: ${formatOptional(values.dateLeft)}`,
    `Reason for leaving: ${formatOptional(values.reasonForLeaving)}`,
    "",
    "Work eligibility",
    `Can provide work permit if under 18: ${formatYesNo(values.canProvideWorkPermit)}`,
    "",
    "Personal statements",
    `Career goals: ${formatOptional(values.careerGoals)}`,
    `Salon personality: ${formatOptional(values.salonPersonality)}`,
    `Professional contribution: ${formatOptional(values.professionalContribution)}`,
    `Additional remarks: ${formatOptional(values.additionalRemarks)}`,
    "",
    "Acknowledgement",
    values.acknowledgement
      ? "Applicant confirmed the acknowledgement statement."
      : "Applicant did not confirm the acknowledgement statement.",
  ];

  return sections.join("\n");
}
