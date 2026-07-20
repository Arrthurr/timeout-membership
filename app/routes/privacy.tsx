import { Navbar } from "~/components/homepage/navbar";
import Footer from "~/components/homepage/footer";

const LAST_UPDATED = "July 20, 2026";
const PRIVACY_EMAIL = "shop@timeoutatshannons.com";

export function meta() {
  return [
    {
      title: "Privacy Policy | Timeout At Shannon's",
    },
    {
      name: "description",
      content:
        "Privacy Policy for the Timeout At Shannon's website. Learn what information we collect, how we use it, and how to contact us about your data.",
    },
    {
      name: "keywords",
      content:
        "Timeout At Shannon's privacy policy, Chicago barber shop privacy, website privacy policy",
    },
  ];
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <header className="space-y-4 mb-12">
            <h1 className="text-4xl md:text-5xl font-semibold text-primary">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">
              Last updated: {LAST_UPDATED}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              This Privacy Policy describes how Timeout At Shannon&apos;s
              (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects,
              uses, and shares information when you visit our marketing website
              at timeoutatshannons.com (the &quot;Site&quot;). It applies to this
              Site only. It does not cover third-party booking platforms,
              payment processors, or other services you may use when you leave
              our Site.
            </p>
          </header>

          <div className="space-y-10 text-base leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-primary">
                Who we are
              </h2>
              <p className="text-muted-foreground">
                Timeout At Shannon&apos;s is a barber shop and lounge located at
                1607 N. Rutherford Ave., Suite 101, Chicago, IL 60707. You can
                reach us by phone at{" "}
                <a
                  href="tel:+13124911748"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  312-491-1748
                </a>{" "}
                or by email at{" "}
                <a
                  href={`mailto:${PRIVACY_EMAIL}`}
                  className="text-primary underline-offset-4 hover:underline"
                >
                  {PRIVACY_EMAIL}
                </a>
                .
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-primary">
                Information we collect
              </h2>
              <p className="text-muted-foreground">
                We do not require you to create an account to browse the Site.
                We may collect the following information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  <span className="text-foreground font-medium">
                    Contact form information.
                  </span>{" "}
                  If you submit our contact form, we collect your first name,
                  last name, email address, mobile phone number, and the message
                  you send.
                </li>
                <li>
                  <span className="text-foreground font-medium">
                    Employment application information.
                  </span>{" "}
                  If you submit our employment application, we collect the
                  information you provide in the form, including contact
                  details, address, education and work history, position
                  preferences, personal statements, and your acknowledgement of
                  the application terms.
                </li>
                <li>
                  <span className="text-foreground font-medium">
                    Technical and security information.
                  </span>{" "}
                  When you use the contact form or employment application, we may process your IP address
                  and related request metadata to help prevent spam and abuse
                  (including rate limiting and Cloudflare Turnstile
                  verification).
                </li>
                <li>
                  <span className="text-foreground font-medium">
                    Usage analytics.
                  </span>{" "}
                  We use Vercel Analytics to understand general Site traffic and
                  performance. This may include aggregated or device-related
                  usage information as described by Vercel.
                </li>
              </ul>
              <p className="text-muted-foreground">
                This Site does not process payments or maintain customer login
                accounts. Booking and payment for services may occur on
                third-party platforms linked from the Site.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-primary">
                How we use information
              </h2>
              <p className="text-muted-foreground">We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Respond to inquiries about appointments, memberships, events, or general questions</li>
                <li>Review employment applications and follow up with applicants when appropriate</li>
                <li>Operate, maintain, and improve the Site</li>
                <li>Protect the Site against spam, fraud, and abuse</li>
                <li>Understand how visitors use the Site at a high level</li>
                <li>Comply with legal obligations where applicable</li>
              </ul>
              <p className="text-muted-foreground">
                We do not sell your personal information.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-primary">
                Third-party services
              </h2>
              <p className="text-muted-foreground">
                We use trusted service providers to help run the Site. These
                providers process information on our behalf or as independent
                controllers of their own services:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  <span className="text-foreground font-medium">Resend</span>{" "}
                  — delivers contact form messages and employment applications by email.
                </li>
                <li>
                  <span className="text-foreground font-medium">
                    Cloudflare Turnstile
                  </span>{" "}
                  — helps verify that form submissions are made by real people
                  and reduce bots.
                </li>
                <li>
                  <span className="text-foreground font-medium">
                    Vercel Analytics
                  </span>{" "}
                  — provides website analytics and hosting-related insights.
                </li>
                <li>
                  <span className="text-foreground font-medium">
                    Zenoti and other booking links
                  </span>{" "}
                  — if you book an appointment through an external booking
                  provider linked from the Site, that provider&apos;s privacy
                  policy governs the information you provide there.
                </li>
                <li>
                  <span className="text-foreground font-medium">YouTube</span>{" "}
                  — if you follow links to our video content on YouTube,
                  Google&apos;s privacy practices apply.
                </li>
              </ul>
              <p className="text-muted-foreground">
                We encourage you to review each third party&apos;s privacy
                policy for details about how they handle data.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-primary">
                Retention, deletion, and your choices
              </h2>
              <p className="text-muted-foreground">
                We retain contact form messages, employment applications, and related records for as long
                as needed to respond to your inquiry or review your application and for ordinary business
                and security purposes, unless a longer period is required by
                law. Analytics data is retained according to our analytics
                provider&apos;s practices.
              </p>
              <p className="text-muted-foreground">
                To request access to, correction of, or deletion of personal
                information you have provided through the Site, email us at{" "}
                <a
                  href={`mailto:${PRIVACY_EMAIL}`}
                  className="text-primary underline-offset-4 hover:underline"
                >
                  {PRIVACY_EMAIL}
                </a>
                . We will respond within a reasonable time. You may also stop
                interacting with the Site at any time; if you use third-party
                booking or video services, manage your preferences directly with
                those providers.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-primary">
                Children&apos;s privacy
              </h2>
              <p className="text-muted-foreground">
                The Site is not directed to children under 13, and we do not
                knowingly collect personal information from children under 13.
                If you believe a child has provided us with personal information
                through the Site, contact us at{" "}
                <a
                  href={`mailto:${PRIVACY_EMAIL}`}
                  className="text-primary underline-offset-4 hover:underline"
                >
                  {PRIVACY_EMAIL}
                </a>{" "}
                and we will take appropriate steps to delete it.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-primary">
                Changes to this policy
              </h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. When we do,
                we will revise the &quot;Last updated&quot; date at the top of
                this page. Continued use of the Site after changes are posted
                means you acknowledge the updated policy.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-primary">
                Contact us
              </h2>
              <p className="text-muted-foreground">
                For privacy questions or requests, contact Timeout At
                Shannon&apos;s at:
              </p>
              <address className="not-italic text-muted-foreground space-y-1">
                <p>Timeout At Shannon&apos;s</p>
                <p>1607 N. Rutherford Ave., Suite 101</p>
                <p>Chicago, IL 60707</p>
                <p>
                  Phone:{" "}
                  <a
                    href="tel:+13124911748"
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    312-491-1748
                  </a>
                </p>
                <p>
                  Email:{" "}
                  <a
                    href={`mailto:${PRIVACY_EMAIL}`}
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    {PRIVACY_EMAIL}
                  </a>
                </p>
              </address>
            </section>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
