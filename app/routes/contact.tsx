import { useEffect, useRef, useState } from "react";
import { Form, useActionData, useNavigation } from "react-router";
import { TurnstileWidget } from "~/components/contact/turnstile-widget";
import { Navbar } from "~/components/homepage/navbar";
import Footer from "~/components/homepage/footer";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { isContactRateLimited } from "~/lib/contact-rate-limit";

export function meta() {
  return [
    { title: "Contact | Timeout At Shannon's - Chicago Barber Shop" },
    {
      name: "description",
      content:
        "Get in touch with Timeout At Shannon's in Chicago. Send us a message about appointments, memberships, events, or general questions.",
    },
    {
      name: "keywords",
      content: "contact barber shop Chicago, Timeout At Shannon's contact, barber appointment questions",
    },
  ];
}

type ContactField = "firstName" | "lastName" | "email" | "mobilePhone" | "comments";

type ContactActionData = {
  ok: boolean;
  message: string;
  values?: Partial<Record<ContactField, string>>;
};

function getFieldValue(formData: FormData, key: ContactField): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getClientIp(request: Request): string | undefined {
  const cfConnectingIp = request.headers.get("cf-connecting-ip");
  if (cfConnectingIp) return cfConnectingIp.trim();

  const xRealIp = request.headers.get("x-real-ip");
  if (xRealIp) return xRealIp.trim();

  const xForwardedFor = request.headers.get("x-forwarded-for");
  if (!xForwardedFor) return undefined;

  const firstIp = xForwardedFor.split(",")[0];
  return firstIp?.trim() || undefined;
}

async function verifyTurnstileToken(
  token: string,
  remoteIp: string | undefined,
  secretKey: string,
): Promise<boolean> {
  const body = new URLSearchParams();
  body.set("secret", secretKey);
  body.set("response", token);
  if (remoteIp) {
    body.set("remoteip", remoteIp);
  }

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!response.ok) {
    return false;
  }

  const payload = (await response.json()) as { success?: boolean };
  return payload.success === true;
}

export async function action({ request }: { request: Request }): Promise<ContactActionData> {
  const formData = await request.formData();
  const clientIp = getClientIp(request);

  const honeypot = formData.get("company");
  if (typeof honeypot === "string" && honeypot.trim().length > 0) {
    return {
      ok: true,
      message: "Thanks for reaching out. We'll be in touch soon.",
    };
  }

  const firstName = getFieldValue(formData, "firstName");
  const lastName = getFieldValue(formData, "lastName");
  const email = getFieldValue(formData, "email");
  const mobilePhone = getFieldValue(formData, "mobilePhone");
  const comments = getFieldValue(formData, "comments");

  const values = { firstName, lastName, email, mobilePhone, comments };

  if (!firstName || !lastName || !email || !comments) {
    return {
      ok: false,
      message: "Please complete all required fields.",
      values,
    };
  }

  if (!isValidEmail(email)) {
    return {
      ok: false,
      message: "Please enter a valid email address.",
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
        "Contact form is not fully configured yet. Please call us at 312-491-1748 while we finish setup.",
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

  if (clientIp && (await isContactRateLimited(clientIp))) {
    return {
      ok: false,
      message: "Too many submissions. Please wait a few minutes and try again.",
      values,
    };
  }

  const isTurnstileValid = await verifyTurnstileToken(turnstileToken, clientIp, turnstileSecretKey);
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
      replyTo: email,
      subject: `New contact form submission from ${firstName} ${lastName}`,
      text: [
        `First name: ${firstName}`,
        `Last name: ${lastName}`,
        `Email: ${email}`,
        `Mobile phone: ${mobilePhone || "Not provided"}`,
        "",
        "Comments:",
        comments,
      ].join("\n"),
    });

    return {
      ok: true,
      message: "Thanks for your message. We'll follow up shortly.",
    };
  } catch (error) {
    console.error("Failed to send contact form email", error);
    return {
      ok: false,
      message:
        "We couldn't send your message right now. Please try again shortly or call us at 312-491-1748.",
      values,
    };
  }
}

export default function ContactPage() {
  const actionData = useActionData<ContactActionData>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;
  const [turnstileResetSignal, setTurnstileResetSignal] = useState(0);
  const wasSubmittingRef = useRef(false);

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center space-y-4 mb-10 md:mb-12">
            <h1 className="text-4xl md:text-5xl font-semibold text-primary">Contact us</h1>
            <p className="text-lg text-muted-foreground">
              We&apos;d love to hear from you. Send us a note and we&apos;ll follow up as soon as possible.
            </p>
          </div>

          <Card className="mx-auto max-w-3xl border border-border bg-card">
            <CardHeader>
              <CardTitle>Send a message</CardTitle>
              <CardDescription>
                Tell us how we can help. We&apos;ll email your submission to our team.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form method="post" className="space-y-6">
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium">
                      First name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      defaultValue={actionData?.values?.firstName ?? ""}
                      autoComplete="given-name"
                      required
                      className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground"
                      placeholder="First name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium">
                      Last name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      defaultValue={actionData?.values?.lastName ?? ""}
                      autoComplete="family-name"
                      required
                      className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground"
                      placeholder="Last name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={actionData?.values?.email ?? ""}
                    autoComplete="email"
                    required
                    className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground"
                    placeholder="you@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="mobilePhone" className="text-sm font-medium">
                    Mobile phone
                  </label>
                  <input
                    id="mobilePhone"
                    name="mobilePhone"
                    type="tel"
                    defaultValue={actionData?.values?.mobilePhone ?? ""}
                    autoComplete="tel"
                    inputMode="tel"
                    className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground"
                    placeholder="(312) 555-0123"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="comments" className="text-sm font-medium">
                    Comments
                  </label>
                  <textarea
                    id="comments"
                    name="comments"
                    autoComplete="off"
                    required
                    rows={5}
                    className="w-full resize-y rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground"
                    placeholder="Share details about your question."
                    defaultValue={actionData?.values?.comments ?? ""}
                  ></textarea>
                </div>

                <div className="space-y-2">
                  {turnstileSiteKey ? (
                    <TurnstileWidget siteKey={turnstileSiteKey} resetSignal={turnstileResetSignal} />
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      Spam protection is not configured yet. Please set Turnstile environment variables.
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs text-muted-foreground">All fields except mobile phone are required.</p>
                  <Button type="submit" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Submit"}
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
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
