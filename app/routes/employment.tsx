import { useEffect, useRef, useState } from "react";
import { Form, useActionData, useNavigation } from "react-router";
import { TurnstileWidget } from "~/components/contact/turnstile-widget";
import { Navbar } from "~/components/homepage/navbar";
import Footer from "~/components/homepage/footer";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { isEmploymentRateLimited } from "~/lib/contact-rate-limit";
import {
  DESIRED_POSITIONS,
  EDUCATION_LEVELS,
  type EmploymentApplicationActionData,
  positionRequiresLicense,
  US_STATES,
} from "~/lib/employment-application";
import {
  formatEmploymentApplicationEmail,
  parseEmploymentApplicationFormData,
  validateEmploymentApplication,
} from "~/lib/employment-application.server";
import { getClientIp, verifyTurnstileToken } from "~/lib/form-security.server";

const INPUT_CLASS =
  "w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground";
const TEXTAREA_CLASS = `${INPUT_CLASS} resize-y`;
const LABEL_CLASS = "text-sm font-medium";
const FIELD_GROUP_CLASS = "space-y-2";
const SECTION_CLASS = "space-y-6 rounded-lg border border-border bg-card p-6";
const SECTION_TITLE_CLASS = "text-xl font-semibold text-primary";
const RADIO_GROUP_CLASS = "flex flex-wrap gap-4";

export function meta() {
  return [
    { title: "Employment | Timeout At Shannon's - Chicago Barber Shop" },
    {
      name: "description",
      content:
        "Apply to join the team at Timeout At Shannon's in Chicago. Share your experience, goals, and the role you're interested in.",
    },
    {
      name: "keywords",
      content:
        "Timeout At Shannon's jobs, Chicago barber employment, salon careers, stylist application, barber application",
    },
  ];
}

export async function action({
  request,
}: {
  request: Request;
}): Promise<EmploymentApplicationActionData> {
  const formData = await request.formData();
  const clientIp = getClientIp(request);

  const honeypot = formData.get("company");
  if (typeof honeypot === "string" && honeypot.trim().length > 0) {
    return {
      ok: true,
      message: "Thanks for applying. We'll review your application and follow up if there's a fit.",
    };
  }

  const values = parseEmploymentApplicationFormData(formData);
  const validationMessage = validateEmploymentApplication(values);
  if (validationMessage) {
    return {
      ok: false,
      message: validationMessage,
      values,
    };
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const resendFromEmail = process.env.RESEND_FROM_EMAIL;
  const contactToEmail = process.env.CONTACT_TO_EMAIL;
  const turnstileSecretKey = process.env.TURNSTILE_SECRET_KEY;
  const turnstileToken = formData.get("cf-turnstile-response");

  if (!resendApiKey || !resendFromEmail || !contactToEmail || !turnstileSecretKey) {
    return {
      ok: false,
      message:
        "The employment application is not fully configured yet. Please call us at 312-491-1748 while we finish setup.",
      values,
    };
  }

  if (typeof turnstileToken !== "string" || !turnstileToken.trim()) {
    return {
      ok: false,
      message: "Please complete the spam check before submitting.",
      values,
    };
  }

  if (clientIp && (await isEmploymentRateLimited(clientIp))) {
    return {
      ok: false,
      message: "Too many submissions. Please wait a few minutes and try again.",
      values,
    };
  }

  const isTurnstileValid = await verifyTurnstileToken(
    turnstileToken,
    clientIp,
    turnstileSecretKey,
  );
  if (!isTurnstileValid) {
    return {
      ok: false,
      message: "Spam verification failed. Please try again.",
      values,
    };
  }

  const to = contactToEmail
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(resendApiKey);

    await resend.emails.send({
      from: resendFromEmail,
      to,
      replyTo: values.email,
      subject: `Employment application from ${values.firstName} ${values.lastName}`,
      text: formatEmploymentApplicationEmail(values),
    });

    return {
      ok: true,
      message: "Thanks for applying. We'll review your application and follow up if there's a fit.",
    };
  } catch (error) {
    console.error("Failed to send employment application email", error);
    return {
      ok: false,
      message:
        "We couldn't submit your application right now. Please try again shortly or call us at 312-491-1748.",
      values,
    };
  }
}

type YesNoFieldProps = {
  name: string;
  legend: string;
  value: string;
  required?: boolean;
};

function YesNoField({ name, legend, value, required = false }: YesNoFieldProps) {
  return (
    <fieldset className={FIELD_GROUP_CLASS}>
      <legend className={LABEL_CLASS}>{legend}</legend>
      <div className={RADIO_GROUP_CLASS} role="radiogroup" aria-label={legend}>
        {(["yes", "no"] as const).map((option) => (
          <label key={option} className="inline-flex items-center gap-2 text-sm">
            <input
              type="radio"
              name={name}
              value={option}
              defaultChecked={value === option}
              required={required}
              className="size-4 border-border text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <span>{option === "yes" ? "Yes" : "No"}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function EmploymentPage() {
  const actionData = useActionData<EmploymentApplicationActionData>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;
  const [turnstileResetSignal, setTurnstileResetSignal] = useState(0);
  const wasSubmittingRef = useRef(false);

  const values = actionData?.values;
  const [desiredPosition, setDesiredPosition] = useState(values?.desiredPosition ?? "");
  const [currentlyEmployed, setCurrentlyEmployed] = useState(values?.currentlyEmployed ?? "");
  const showLicenseQuestion = positionRequiresLicense(desiredPosition);
  const showPresentEmploymentInquiry = currentlyEmployed === "yes";

  useEffect(() => {
    if (navigation.state === "submitting") {
      wasSubmittingRef.current = true;
      return;
    }

    if (wasSubmittingRef.current && navigation.state === "idle") {
      wasSubmittingRef.current = false;
      if (actionData && !actionData.ok) {
        setTurnstileResetSignal((count) => count + 1);
      }
    }
  }, [navigation.state, actionData]);

  useEffect(() => {
    if (values?.desiredPosition) {
      setDesiredPosition(values.desiredPosition);
    }
    if (values?.currentlyEmployed) {
      setCurrentlyEmployed(values.currentlyEmployed);
    }
  }, [values?.desiredPosition, values?.currentlyEmployed]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center space-y-4 mb-10 md:mb-12">
            <h1 className="text-4xl md:text-5xl font-semibold text-primary">Employment</h1>
            <p className="text-lg text-muted-foreground">
              Bring your talent to Timeout at Shannon&apos;s. Tell us about your experience, goals,
              and the role you&apos;re interested in, and our team will follow up if there&apos;s a
              fit.
            </p>
          </div>

          <Card className="mx-auto max-w-3xl border border-border bg-card">
            <CardHeader>
              <CardTitle>Apply to join our team</CardTitle>
              <CardDescription>
                Complete the application below. Required fields are marked with an asterisk.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form method="post" className="space-y-10">
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <section className={SECTION_CLASS} aria-labelledby="personal-information-heading">
                  <h2 id="personal-information-heading" className={SECTION_TITLE_CLASS}>
                    Personal information
                  </h2>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className={FIELD_GROUP_CLASS}>
                      <label htmlFor="firstName" className={LABEL_CLASS}>
                        First name *
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        defaultValue={values?.firstName ?? ""}
                        autoComplete="given-name"
                        required
                        className={INPUT_CLASS}
                      />
                    </div>
                    <div className={FIELD_GROUP_CLASS}>
                      <label htmlFor="lastName" className={LABEL_CLASS}>
                        Last name *
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        defaultValue={values?.lastName ?? ""}
                        autoComplete="family-name"
                        required
                        className={INPUT_CLASS}
                      />
                    </div>
                  </div>
                  <div className={FIELD_GROUP_CLASS}>
                    <label htmlFor="email" className={LABEL_CLASS}>
                      Email address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      defaultValue={values?.email ?? ""}
                      autoComplete="email"
                      required
                      className={INPUT_CLASS}
                      placeholder="you@example.com"
                    />
                  </div>
                  <div className={FIELD_GROUP_CLASS}>
                    <label htmlFor="addressLine1" className={LABEL_CLASS}>
                      Address line 1 *
                    </label>
                    <input
                      id="addressLine1"
                      name="addressLine1"
                      type="text"
                      defaultValue={values?.addressLine1 ?? ""}
                      autoComplete="address-line1"
                      required
                      className={INPUT_CLASS}
                    />
                  </div>
                  <div className={FIELD_GROUP_CLASS}>
                    <label htmlFor="addressLine2" className={LABEL_CLASS}>
                      Address line 2
                    </label>
                    <input
                      id="addressLine2"
                      name="addressLine2"
                      type="text"
                      defaultValue={values?.addressLine2 ?? ""}
                      autoComplete="address-line2"
                      className={INPUT_CLASS}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className={`${FIELD_GROUP_CLASS} sm:col-span-1`}>
                      <label htmlFor="city" className={LABEL_CLASS}>
                        City *
                      </label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        defaultValue={values?.city ?? ""}
                        autoComplete="address-level2"
                        required
                        className={INPUT_CLASS}
                      />
                    </div>
                    <div className={FIELD_GROUP_CLASS}>
                      <label htmlFor="state" className={LABEL_CLASS}>
                        State *
                      </label>
                      <select
                        id="state"
                        name="state"
                        defaultValue={values?.state ?? ""}
                        autoComplete="address-level1"
                        required
                        className={INPUT_CLASS}
                      >
                        <option value="">Select a state</option>
                        {US_STATES.map((state) => (
                          <option key={state.value} value={state.value}>
                            {state.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className={FIELD_GROUP_CLASS}>
                      <label htmlFor="zipCode" className={LABEL_CLASS}>
                        Zip code *
                      </label>
                      <input
                        id="zipCode"
                        name="zipCode"
                        type="text"
                        defaultValue={values?.zipCode ?? ""}
                        autoComplete="postal-code"
                        inputMode="numeric"
                        required
                        className={INPUT_CLASS}
                      />
                    </div>
                  </div>
                </section>

                <section className={SECTION_CLASS} aria-labelledby="education-heading">
                  <h2 id="education-heading" className={SECTION_TITLE_CLASS}>
                    Educational background
                  </h2>
                  <fieldset className={FIELD_GROUP_CLASS}>
                    <legend className={LABEL_CLASS}>Most recent education *</legend>
                    <div className="space-y-3">
                      {EDUCATION_LEVELS.map((level) => (
                        <label key={level.value} className="flex items-center gap-2 text-sm">
                          <input
                            type="radio"
                            name="educationLevel"
                            value={level.value}
                            defaultChecked={values?.educationLevel === level.value}
                            required
                            className="size-4 border-border text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          />
                          <span>{level.label}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </section>

                <section className={SECTION_CLASS} aria-labelledby="desired-position-heading">
                  <h2 id="desired-position-heading" className={SECTION_TITLE_CLASS}>
                    Desired position
                  </h2>
                  <fieldset className={FIELD_GROUP_CLASS}>
                    <legend className={LABEL_CLASS}>Position *</legend>
                    <div className="space-y-3">
                      {DESIRED_POSITIONS.map((position) => (
                        <label key={position.value} className="flex items-center gap-2 text-sm">
                          <input
                            type="radio"
                            name="desiredPosition"
                            value={position.value}
                            checked={desiredPosition === position.value}
                            onChange={() => setDesiredPosition(position.value)}
                            required
                            className="size-4 border-border text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          />
                          <span>{position.label}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <div className={FIELD_GROUP_CLASS}>
                    <label htmlFor="desiredSalary" className={LABEL_CLASS}>
                      Desired salary
                    </label>
                    <input
                      id="desiredSalary"
                      name="desiredSalary"
                      type="text"
                      defaultValue={values?.desiredSalary ?? ""}
                      className={INPUT_CLASS}
                      placeholder="Optional"
                    />
                  </div>
                  <div className={FIELD_GROUP_CLASS}>
                    <label htmlFor="dateAvailable" className={LABEL_CLASS}>
                      Date available
                    </label>
                    <input
                      id="dateAvailable"
                      name="dateAvailable"
                      type="date"
                      defaultValue={values?.dateAvailable ?? ""}
                      className={INPUT_CLASS}
                    />
                  </div>
                  <YesNoField
                    name="previouslyEmployed"
                    legend="Previously employed by Timeout At Shannon's? *"
                    value={values?.previouslyEmployed ?? ""}
                    required
                  />
                  {showLicenseQuestion && (
                    <YesNoField
                      name="hasValidLicense"
                      legend="Do you have a valid license? (If you are applying for barber/stylist position) *"
                      value={values?.hasValidLicense ?? ""}
                      required
                    />
                  )}
                  <fieldset className={FIELD_GROUP_CLASS}>
                    <legend className={LABEL_CLASS}>Are you currently employed? *</legend>
                    <div className={RADIO_GROUP_CLASS} role="radiogroup" aria-label="Are you currently employed?">
                      {(["yes", "no"] as const).map((option) => (
                        <label key={option} className="inline-flex items-center gap-2 text-sm">
                          <input
                            type="radio"
                            name="currentlyEmployed"
                            value={option}
                            checked={currentlyEmployed === option}
                            onChange={() => setCurrentlyEmployed(option)}
                            required
                            className="size-4 border-border text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          />
                          <span>{option === "yes" ? "Yes" : "No"}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  {showPresentEmploymentInquiry && (
                    <YesNoField
                      name="canInquirePresentEmployment"
                      legend="If so, can we inquire about your present employment? *"
                      value={values?.canInquirePresentEmployment ?? ""}
                      required
                    />
                  )}
                </section>

                <section className={SECTION_CLASS} aria-labelledby="recent-employment-heading">
                  <h2 id="recent-employment-heading" className={SECTION_TITLE_CLASS}>
                    Recent employment
                  </h2>
                  <div className={FIELD_GROUP_CLASS}>
                    <label htmlFor="companyName" className={LABEL_CLASS}>
                      Company name
                    </label>
                    <input
                      id="companyName"
                      name="companyName"
                      type="text"
                      defaultValue={values?.companyName ?? ""}
                      className={INPUT_CLASS}
                    />
                  </div>
                  <div className={FIELD_GROUP_CLASS}>
                    <label htmlFor="companyAddress" className={LABEL_CLASS}>
                      Company address
                    </label>
                    <input
                      id="companyAddress"
                      name="companyAddress"
                      type="text"
                      defaultValue={values?.companyAddress ?? ""}
                      className={INPUT_CLASS}
                    />
                  </div>
                  <div className={FIELD_GROUP_CLASS}>
                    <label htmlFor="supervisor" className={LABEL_CLASS}>
                      Supervisor/manager
                    </label>
                    <input
                      id="supervisor"
                      name="supervisor"
                      type="text"
                      defaultValue={values?.supervisor ?? ""}
                      className={INPUT_CLASS}
                    />
                  </div>
                  <div className={FIELD_GROUP_CLASS}>
                    <label htmlFor="duties" className={LABEL_CLASS}>
                      Describe duties
                    </label>
                    <textarea
                      id="duties"
                      name="duties"
                      rows={4}
                      defaultValue={values?.duties ?? ""}
                      className={TEXTAREA_CLASS}
                    />
                  </div>
                  <div className={FIELD_GROUP_CLASS}>
                    <label htmlFor="lastWages" className={LABEL_CLASS}>
                      Last wages
                    </label>
                    <input
                      id="lastWages"
                      name="lastWages"
                      type="text"
                      defaultValue={values?.lastWages ?? ""}
                      className={INPUT_CLASS}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className={FIELD_GROUP_CLASS}>
                      <label htmlFor="dateStarted" className={LABEL_CLASS}>
                        Date started
                      </label>
                      <input
                        id="dateStarted"
                        name="dateStarted"
                        type="date"
                        defaultValue={values?.dateStarted ?? ""}
                        className={INPUT_CLASS}
                      />
                    </div>
                    <div className={FIELD_GROUP_CLASS}>
                      <label htmlFor="dateLeft" className={LABEL_CLASS}>
                        Date left
                      </label>
                      <input
                        id="dateLeft"
                        name="dateLeft"
                        type="date"
                        defaultValue={values?.dateLeft ?? ""}
                        className={INPUT_CLASS}
                      />
                    </div>
                  </div>
                  <div className={FIELD_GROUP_CLASS}>
                    <label htmlFor="reasonForLeaving" className={LABEL_CLASS}>
                      Reason for leaving
                    </label>
                    <textarea
                      id="reasonForLeaving"
                      name="reasonForLeaving"
                      rows={4}
                      defaultValue={values?.reasonForLeaving ?? ""}
                      className={TEXTAREA_CLASS}
                    />
                  </div>
                </section>

                <section className={SECTION_CLASS} aria-labelledby="work-eligibility-heading">
                  <h2 id="work-eligibility-heading" className={SECTION_TITLE_CLASS}>
                    Work eligibility
                  </h2>
                  <YesNoField
                    name="canProvideWorkPermit"
                    legend="If you are under 18, can you provide a work permit? *"
                    value={values?.canProvideWorkPermit ?? ""}
                    required
                  />
                </section>

                <section className={SECTION_CLASS} aria-labelledby="personal-statements-heading">
                  <h2 id="personal-statements-heading" className={SECTION_TITLE_CLASS}>
                    Personal statements
                  </h2>
                  <div className={FIELD_GROUP_CLASS}>
                    <label htmlFor="careerGoals" className={LABEL_CLASS}>
                      What would you ultimately like to achieve in your career and how do you think
                      Timeout at Shannon&apos;s can support you?
                    </label>
                    <textarea
                      id="careerGoals"
                      name="careerGoals"
                      rows={4}
                      defaultValue={values?.careerGoals ?? ""}
                      className={TEXTAREA_CLASS}
                    />
                  </div>
                  <div className={FIELD_GROUP_CLASS}>
                    <label htmlFor="salonPersonality" className={LABEL_CLASS}>
                      Based on what you know about Timeout at Shannon&apos;s, how would you describe
                      the personality of the salon?
                    </label>
                    <textarea
                      id="salonPersonality"
                      name="salonPersonality"
                      rows={4}
                      defaultValue={values?.salonPersonality ?? ""}
                      className={TEXTAREA_CLASS}
                    />
                  </div>
                  <div className={FIELD_GROUP_CLASS}>
                    <label htmlFor="professionalContribution" className={LABEL_CLASS}>
                      What kind of professional and positive contribution can you make to the Timeout
                      at Shannon&apos;s environment?
                    </label>
                    <textarea
                      id="professionalContribution"
                      name="professionalContribution"
                      rows={4}
                      defaultValue={values?.professionalContribution ?? ""}
                      className={TEXTAREA_CLASS}
                    />
                  </div>
                  <div className={FIELD_GROUP_CLASS}>
                    <label htmlFor="additionalRemarks" className={LABEL_CLASS}>
                      Any additional remarks?
                    </label>
                    <textarea
                      id="additionalRemarks"
                      name="additionalRemarks"
                      rows={4}
                      defaultValue={values?.additionalRemarks ?? ""}
                      className={TEXTAREA_CLASS}
                    />
                  </div>
                </section>

                <section className={SECTION_CLASS} aria-labelledby="acknowledgement-heading">
                  <h2 id="acknowledgement-heading" className={SECTION_TITLE_CLASS}>
                    Acknowledgement and disclaimer
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    I certify that, to the best of my knowledge and belief, the answers given by me
                    to the aforementioned questions, and the statements by me in this application
                    are correct and complete. I understand that misrepresentation or omission of
                    facts in this application may lead to my discharge. If employed, I understand
                    and agree that such employment may be terminated at any time without prior
                    notice, and that my employment will not be governed by any expressed or implied
                    contract, but is at will.
                  </p>
                  <label className="flex items-start gap-3 text-sm">
                    <input
                      type="checkbox"
                      name="acknowledgement"
                      defaultChecked={values?.acknowledgement ?? false}
                      required
                      className="mt-1 size-4 rounded border-border text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                    <span>I understand and agree *</span>
                  </label>
                </section>

                <div className="space-y-2">
                  {turnstileSiteKey ? (
                    <TurnstileWidget siteKey={turnstileSiteKey} resetSignal={turnstileResetSignal} />
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      Spam protection is not configured yet. Please set Turnstile environment
                      variables.
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-muted-foreground">
                    Fields marked with an asterisk are required.
                  </p>
                  <Button type="submit" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Apply"}
                  </Button>
                </div>

                {actionData && (
                  <p
                    className={
                      actionData.ok
                        ? "rounded-md border border-primary/20 bg-primary/10 px-3 py-2 text-sm text-foreground"
                        : "rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-foreground"
                    }
                  >
                    {actionData.message}
                  </p>
                )}

                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">
                    Timeout at Shannon&apos;s is an Equal Opportunity Employer.
                  </strong>{" "}
                  It is our policy to abide by all Federal and Local laws concerning discrimination
                  in employment. No question in this application is intended to elicit information
                  in violation of such law nor will any information obtained in response to any
                  question be used in violation of any such law.
                </p>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
