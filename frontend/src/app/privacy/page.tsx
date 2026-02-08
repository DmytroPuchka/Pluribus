import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Lock,
  Eye,
  Users,
  Mail,
  AlertCircle,
  CheckCircle,
  Globe,
  Cookie,
  FileText,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy - Pluribus",
  description:
    "Learn about how Pluribus collects, uses, and protects your personal data. GDPR compliant privacy policy for international delivery marketplace.",
  keywords: [
    "privacy policy",
    "GDPR",
    "data protection",
    "privacy",
    "personal data",
  ],
  openGraph: {
    title: "Privacy Policy - Pluribus",
    description:
      "GDPR compliant privacy policy for Pluribus international delivery marketplace.",
    type: "website",
  },
};

interface TableOfContentsItem {
  title: string;
  id: string;
}

const tableOfContents: TableOfContentsItem[] = [
  { title: "Information We Collect", id: "information-we-collect" },
  { title: "How We Use Your Information", id: "how-we-use" },
  { title: "Information Sharing and Disclosure", id: "information-sharing" },
  { title: "Data Security", id: "data-security" },
  { title: "Your Rights (GDPR)", id: "your-rights" },
  { title: "Cookies and Tracking", id: "cookies-tracking" },
  { title: "Third-Party Services", id: "third-party-services" },
  { title: "Children's Privacy", id: "childrens-privacy" },
  { title: "International Data Transfers", id: "international-transfers" },
  { title: "Changes to Privacy Policy", id: "changes" },
  { title: "Contact Information", id: "contact" },
];

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20 md:py-32">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
              <Shield className="h-4 w-4" />
              Your Privacy Matters
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              Privacy <span className="text-blue-600">Policy</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              At Pluribus, we are committed to protecting your privacy and
              ensuring transparency in how we collect, use, and manage your
              personal data. This privacy policy outlines our practices in
              compliance with GDPR and other applicable regulations.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Last Updated: February 8, 2025</span>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Disclaimer */}
      <section className="py-8 bg-amber-50 border-t border-b border-amber-200">
        <div className="container px-4">
          <div className="flex gap-4 max-w-4xl mx-auto">
            <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-900 mb-2">
                Important Legal Notice
              </h3>
              <p className="text-sm text-amber-800">
                This privacy policy is a template provided for informational
                purposes. While it reflects standard data protection practices,
                it should be reviewed and customized by a qualified legal
                professional to ensure full compliance with applicable laws in
                your jurisdiction. Pluribus cannot be held responsible for any
                gaps or misalignment with local regulations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="flex-1">
        <div className="container px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 max-w-6xl mx-auto">
            {/* Sidebar - Table of Contents */}
            <aside className="lg:col-span-1">
              <div className="sticky top-20">
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Table of Contents
                    </h3>
                    <nav className="space-y-3">
                      {tableOfContents.map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className="block text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                        >
                          {item.title}
                        </a>
                      ))}
                    </nav>
                  </CardContent>
                </Card>
              </div>
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-3 space-y-12">
              {/* 1. Information We Collect */}
              <section id="information-we-collect">
                <Card>
                  <CardContent className="p-8">
                    <div className="flex gap-4 mb-6">
                      <Eye className="h-8 w-8 text-blue-600 flex-shrink-0" />
                      <div>
                        <h2 className="text-2xl font-bold mb-4">
                          1. Information We Collect
                        </h2>
                        <div className="space-y-6 text-muted-foreground">
                          <div>
                            <h3 className="font-semibold text-foreground mb-2">
                              Account Information
                            </h3>
                            <p>
                              When you create an account, we collect: name, email
                              address, phone number, shipping address, billing
                              address, payment information, and account
                              preferences.
                            </p>
                          </div>

                          <div>
                            <h3 className="font-semibold text-foreground mb-2">
                              Transaction Data
                            </h3>
                            <p>
                              We record details of purchases, sales, shipping
                              information, order history, payment method details
                              (processed securely through Stripe), and dispute
                              resolution information.
                            </p>
                          </div>

                          <div>
                            <h3 className="font-semibold text-foreground mb-2">
                              Communication Data
                            </h3>
                            <p>
                              Messages exchanged between buyers and sellers,
                              customer support conversations, feedback, reviews,
                              and ratings.
                            </p>
                          </div>

                          <div>
                            <h3 className="font-semibold text-foreground mb-2">
                              Device & Usage Data
                            </h3>
                            <p>
                              IP address, browser type, device type, operating
                              system, pages visited, time spent on pages,
                              referring website, and device identifiers. This
                              information is collected through cookies and
                              similar tracking technologies.
                            </p>
                          </div>

                          <div>
                            <h3 className="font-semibold text-foreground mb-2">
                              Location Data
                            </h3>
                            <p>
                              Your country, region, and city (based on IP address
                              or GPS with your permission). For sellers, we may
                              collect business location information to display on
                              our platform.
                            </p>
                          </div>

                          <div>
                            <h3 className="font-semibold text-foreground mb-2">
                              Identity Verification Data
                            </h3>
                            <p>
                              For sellers and in certain cases for buyers, we may
                              collect government-issued ID, proof of address,
                              business registration documents, and tax
                              information.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* 2. How We Use Your Information */}
              <section id="how-we-use">
                <Card>
                  <CardContent className="p-8">
                    <div className="flex gap-4 mb-6">
                      <CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0" />
                      <div>
                        <h2 className="text-2xl font-bold mb-4">
                          2. How We Use Your Information
                        </h2>
                        <div className="space-y-4 text-muted-foreground">
                          <div className="flex gap-3">
                            <span className="text-green-600 font-bold">•</span>
                            <span>
                              <strong>Account Management:</strong> Creating and
                              maintaining your account, verifying your identity,
                              and managing account settings.
                            </span>
                          </div>
                          <div className="flex gap-3">
                            <span className="text-green-600 font-bold">•</span>
                            <span>
                              <strong>Transaction Processing:</strong> Processing
                              payments, fulfilling orders, arranging shipping,
                              and managing escrow services.
                            </span>
                          </div>
                          <div className="flex gap-3">
                            <span className="text-green-600 font-bold">•</span>
                            <span>
                              <strong>Communication:</strong> Sending transactional
                              emails, order confirmations, shipping updates, and
                              responding to support inquiries.
                            </span>
                          </div>
                          <div className="flex gap-3">
                            <span className="text-green-600 font-bold">•</span>
                            <span>
                              <strong>Security & Fraud Prevention:</strong>
                              Detecting and preventing fraud, unauthorized access,
                              and other security threats.
                            </span>
                          </div>
                          <div className="flex gap-3">
                            <span className="text-green-600 font-bold">•</span>
                            <span>
                              <strong>Personalization:</strong> Customizing your
                              experience, showing relevant products, and providing
                              personalized recommendations.
                            </span>
                          </div>
                          <div className="flex gap-3">
                            <span className="text-green-600 font-bold">•</span>
                            <span>
                              <strong>Service Improvement:</strong> Analyzing usage
                              patterns, conducting research, and improving our
                              platform features and functionality.
                            </span>
                          </div>
                          <div className="flex gap-3">
                            <span className="text-green-600 font-bold">•</span>
                            <span>
                              <strong>Marketing:</strong> Sending promotional
                              emails, newsletters, and updates (with your
                              consent, which you can withdraw anytime).
                            </span>
                          </div>
                          <div className="flex gap-3">
                            <span className="text-green-600 font-bold">•</span>
                            <span>
                              <strong>Legal & Compliance:</strong> Complying with
                              legal obligations, enforcing our terms of service,
                              and resolving disputes.
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* 3. Information Sharing and Disclosure */}
              <section id="information-sharing">
                <Card>
                  <CardContent className="p-8">
                    <div className="flex gap-4 mb-6">
                      <Users className="h-8 w-8 text-purple-600 flex-shrink-0" />
                      <div>
                        <h2 className="text-2xl font-bold mb-4">
                          3. Information Sharing and Disclosure
                        </h2>
                        <div className="space-y-6 text-muted-foreground">
                          <div>
                            <h3 className="font-semibold text-foreground mb-2">
                              Buyers and Sellers
                            </h3>
                            <p>
                              When you make a purchase or sale, we share necessary
                              information with the other party (e.g., shipping
                              address with sellers, contact information for
                              communication purposes).
                            </p>
                          </div>

                          <div>
                            <h3 className="font-semibold text-foreground mb-2">
                              Service Providers
                            </h3>
                            <p>
                              We share data with third-party vendors who assist us
                              in operating our platform, including payment
                              processors (Stripe), email providers, hosting
                              companies, analytics services, and customer support
                              platforms. These vendors are bound by
                              confidentiality agreements.
                            </p>
                          </div>

                          <div>
                            <h3 className="font-semibold text-foreground mb-2">
                              Legal Obligations
                            </h3>
                            <p>
                              We may disclose your information when required by
                              law, court order, government request, or to protect
                              our rights, privacy, safety, or property.
                            </p>
                          </div>

                          <div>
                            <h3 className="font-semibold text-foreground mb-2">
                              Business Transfers
                            </h3>
                            <p>
                              If Pluribus is involved in a merger, acquisition,
                              bankruptcy, or asset sale, your information may be
                              transferred as part of that transaction.
                            </p>
                          </div>

                          <div>
                            <h3 className="font-semibold text-foreground mb-2">
                              Aggregated Data
                            </h3>
                            <p>
                              We may share anonymized and aggregated data (e.g.,
                              market trends, usage statistics) with partners and
                              the public without personal identifiers.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* 4. Data Security */}
              <section id="data-security">
                <Card>
                  <CardContent className="p-8">
                    <div className="flex gap-4 mb-6">
                      <Lock className="h-8 w-8 text-red-600 flex-shrink-0" />
                      <div>
                        <h2 className="text-2xl font-bold mb-4">
                          4. Data Security
                        </h2>
                        <div className="space-y-6 text-muted-foreground">
                          <p>
                            We implement comprehensive security measures to protect
                            your personal data from unauthorized access, alteration,
                            disclosure, or destruction:
                          </p>

                          <div className="bg-slate-50 p-4 rounded border border-slate-200 space-y-3">
                            <div className="flex gap-3">
                              <span className="text-red-600 font-bold">•</span>
                              <span>
                                <strong>SSL/TLS Encryption:</strong> All data
                                transmitted between your browser and our servers is
                                encrypted using SSL/TLS protocol.
                              </span>
                            </div>
                            <div className="flex gap-3">
                              <span className="text-red-600 font-bold">•</span>
                              <span>
                                <strong>Payment Processing:</strong> Payment card
                                information is processed by PCI DSS-compliant
                                payment processors (Stripe) and is never stored on
                                our servers.
                              </span>
                            </div>
                            <div className="flex gap-3">
                              <span className="text-red-600 font-bold">•</span>
                              <span>
                                <strong>Data Encryption:</strong> Sensitive data in
                                our databases is encrypted using industry-standard
                                algorithms.
                              </span>
                            </div>
                            <div className="flex gap-3">
                              <span className="text-red-600 font-bold">•</span>
                              <span>
                                <strong>Access Controls:</strong> Only authorized
                                employees have access to personal data, and access
                                is limited to what's necessary for their role.
                              </span>
                            </div>
                            <div className="flex gap-3">
                              <span className="text-red-600 font-bold">•</span>
                              <span>
                                <strong>Regular Audits:</strong> We conduct
                                regular security audits and penetration testing to
                                identify vulnerabilities.
                              </span>
                            </div>
                          </div>

                          <div>
                            <h3 className="font-semibold text-foreground mb-2">
                              Limitations
                            </h3>
                            <p>
                              While we employ robust security measures, no system
                              is completely secure. We cannot guarantee absolute
                              security of your data. If you believe your
                              information has been compromised, please contact us
                              immediately.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* 5. Your Rights (GDPR) */}
              <section id="your-rights">
                <Card>
                  <CardContent className="p-8">
                    <div className="flex gap-4 mb-6">
                      <Shield className="h-8 w-8 text-blue-600 flex-shrink-0" />
                      <div>
                        <h2 className="text-2xl font-bold mb-4">
                          5. Your Rights Under GDPR and Data Protection Laws
                        </h2>
                        <div className="space-y-6 text-muted-foreground">
                          <p>
                            If you are located in the European Economic Area or
                            other jurisdictions with similar data protection laws,
                            you have the following rights:
                          </p>

                          <div className="space-y-4">
                            <div className="bg-blue-50 p-4 rounded border border-blue-200">
                              <h3 className="font-semibold text-foreground mb-2">
                                Right to Access
                              </h3>
                              <p>
                                You have the right to request a copy of the
                                personal data we hold about you.
                              </p>
                            </div>

                            <div className="bg-blue-50 p-4 rounded border border-blue-200">
                              <h3 className="font-semibold text-foreground mb-2">
                                Right to Rectification
                              </h3>
                              <p>
                                You can request that we correct inaccurate or
                                incomplete personal data.
                              </p>
                            </div>

                            <div className="bg-blue-50 p-4 rounded border border-blue-200">
                              <h3 className="font-semibold text-foreground mb-2">
                                Right to Erasure (Right to be Forgotten)
                              </h3>
                              <p>
                                You can request deletion of your personal data,
                                subject to legal retention requirements and
                                legitimate business needs.
                              </p>
                            </div>

                            <div className="bg-blue-50 p-4 rounded border border-blue-200">
                              <h3 className="font-semibold text-foreground mb-2">
                                Right to Restrict Processing
                              </h3>
                              <p>
                                You can request that we limit how we process your
                                personal data in certain circumstances.
                              </p>
                            </div>

                            <div className="bg-blue-50 p-4 rounded border border-blue-200">
                              <h3 className="font-semibold text-foreground mb-2">
                                Right to Data Portability
                              </h3>
                              <p>
                                You can request your personal data in a structured,
                                machine-readable format and have it transferred to
                                another organization.
                              </p>
                            </div>

                            <div className="bg-blue-50 p-4 rounded border border-blue-200">
                              <h3 className="font-semibold text-foreground mb-2">
                                Right to Object
                              </h3>
                              <p>
                                You can object to our processing of your personal
                                data for marketing and profiling purposes.
                              </p>
                            </div>

                            <div className="bg-blue-50 p-4 rounded border border-blue-200">
                              <h3 className="font-semibold text-foreground mb-2">
                                Right to Withdraw Consent
                              </h3>
                              <p>
                                If we process your data based on your consent, you
                                can withdraw that consent at any time.
                              </p>
                            </div>
                          </div>

                          <p>
                            To exercise these rights, please contact us using the
                            information provided in the Contact Information section
                            below. We will respond to your request within 30 days.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* 6. Cookies and Tracking */}
              <section id="cookies-tracking">
                <Card>
                  <CardContent className="p-8">
                    <div className="flex gap-4 mb-6">
                      <Cookie className="h-8 w-8 text-orange-600 flex-shrink-0" />
                      <div>
                        <h2 className="text-2xl font-bold mb-4">
                          6. Cookies and Tracking Technologies
                        </h2>
                        <div className="space-y-6 text-muted-foreground">
                          <p>
                            Pluribus uses cookies and similar tracking technologies
                            to enhance your user experience, analyze usage patterns,
                            and deliver personalized content.
                          </p>

                          <div>
                            <h3 className="font-semibold text-foreground mb-3">
                              Types of Cookies We Use:
                            </h3>
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-semibold text-foreground mb-2">
                                  Essential Cookies
                                </h4>
                                <p>
                                  Required for site functionality (authentication,
                                  session management, security).
                                </p>
                              </div>
                              <div>
                                <h4 className="font-semibold text-foreground mb-2">
                                  Analytical Cookies
                                </h4>
                                <p>
                                  Used to understand how users interact with our
                                  platform, powered by Google Analytics.
                                </p>
                              </div>
                              <div>
                                <h4 className="font-semibold text-foreground mb-2">
                                  Preference Cookies
                                </h4>
                                <p>
                                  Remember your preferences and settings for future
                                  visits.
                                </p>
                              </div>
                              <div>
                                <h4 className="font-semibold text-foreground mb-2">
                                  Marketing Cookies
                                </h4>
                                <p>
                                  Used to track your activity and deliver targeted
                                  advertisements (requires consent).
                                </p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="font-semibold text-foreground mb-2">
                              Other Tracking Technologies
                            </h3>
                            <p>
                              We may use pixels, web beacons, and similar
                              technologies to track user behavior and measure
                              campaign effectiveness.
                            </p>
                          </div>

                          <div>
                            <h3 className="font-semibold text-foreground mb-2">
                              Managing Cookies
                            </h3>
                            <p>
                              You can control cookie settings through your browser.
                              Most browsers allow you to refuse cookies or alert
                              you when a cookie is being set. Note that disabling
                              cookies may affect site functionality.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* 7. Third-Party Services */}
              <section id="third-party-services">
                <Card>
                  <CardContent className="p-8">
                    <div className="flex gap-4 mb-6">
                      <Globe className="h-8 w-8 text-cyan-600 flex-shrink-0" />
                      <div>
                        <h2 className="text-2xl font-bold mb-4">
                          7. Third-Party Services
                        </h2>
                        <div className="space-y-6 text-muted-foreground">
                          <p>
                            Pluribus integrates with third-party services. Your
                            data may be shared with these providers as follows:
                          </p>

                          <div>
                            <h3 className="font-semibold text-foreground mb-3">
                              Stripe (Payment Processing)
                            </h3>
                            <p className="mb-2">
                              We use Stripe to securely process payments. Stripe
                              collects and processes payment information according
                              to their privacy policy:
                            </p>
                            <a
                              href="https://stripe.com/privacy"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              stripe.com/privacy
                            </a>
                            <p className="mt-2 text-sm">
                              We do not store full credit card details on our
                              servers.
                            </p>
                          </div>

                          <div>
                            <h3 className="font-semibold text-foreground mb-3">
                              Google OAuth (Authentication)
                            </h3>
                            <p className="mb-2">
                              Users can sign up or log in using Google accounts.
                              Google processes authentication data according to
                              their privacy policy:
                            </p>
                            <a
                              href="https://policies.google.com/privacy"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              policies.google.com/privacy
                            </a>
                            <p className="mt-2 text-sm">
                              We only receive basic profile information (email,
                              name) with your consent.
                            </p>
                          </div>

                          <div>
                            <h3 className="font-semibold text-foreground mb-3">
                              Google Maps (Location Services)
                            </h3>
                            <p className="mb-2">
                              We use Google Maps to display seller locations and
                              shipping zones. Google collects location data
                              according to their privacy policy:
                            </p>
                            <a
                              href="https://policies.google.com/privacy"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              policies.google.com/privacy
                            </a>
                          </div>

                          <div>
                            <h3 className="font-semibold text-foreground mb-3">
                              Google Analytics (Analytics)
                            </h3>
                            <p className="mb-2">
                              We use Google Analytics to track website usage and
                              performance. Google processes analytics data
                              according to their privacy policy.
                            </p>
                            <p className="text-sm">
                              You can opt-out of Google Analytics tracking by
                              installing the Google Analytics opt-out browser
                              extension.
                            </p>
                          </div>

                          <div>
                            <h3 className="font-semibold text-foreground mb-3">
                              External Links
                            </h3>
                            <p>
                              Our website may contain links to third-party
                              websites. We are not responsible for their privacy
                              practices. We encourage you to review their privacy
                              policies before sharing personal information.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* 8. Children's Privacy */}
              <section id="childrens-privacy">
                <Card>
                  <CardContent className="p-8">
                    <div className="flex gap-4 mb-6">
                      <Users className="h-8 w-8 text-pink-600 flex-shrink-0" />
                      <div>
                        <h2 className="text-2xl font-bold mb-4">
                          8. Children's Privacy
                        </h2>
                        <div className="space-y-6 text-muted-foreground">
                          <p>
                            Pluribus is not intended for children under the age of
                            13 (or the applicable age of digital consent in your
                            jurisdiction). We do not knowingly collect personal
                            information from children.
                          </p>

                          <p>
                            If we become aware that a child has provided us with
                            personal information, we will take steps to delete such
                            information and terminate the child's account. Parents
                            or guardians who believe their child has provided
                            information to Pluribus should contact us immediately.
                          </p>

                          <p>
                            For users under 18, we provide additional protections
                            and may require parental consent for certain data
                            processing activities.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* 9. International Data Transfers */}
              <section id="international-transfers">
                <Card>
                  <CardContent className="p-8">
                    <div className="flex gap-4 mb-6">
                      <Globe className="h-8 w-8 text-teal-600 flex-shrink-0" />
                      <div>
                        <h2 className="text-2xl font-bold mb-4">
                          9. International Data Transfers
                        </h2>
                        <div className="space-y-6 text-muted-foreground">
                          <p>
                            Pluribus operates internationally and transfers personal
                            data across borders to provide our services. Your data
                            may be transferred to and stored in countries outside
                            the European Economic Area.
                          </p>

                          <div>
                            <h3 className="font-semibold text-foreground mb-2">
                              Legal Mechanisms
                            </h3>
                            <p>
                              We ensure adequate safeguards for international data
                              transfers through:
                            </p>
                            <ul className="list-disc list-inside space-y-2 mt-2">
                              <li>Standard Contractual Clauses (SCCs)</li>
                              <li>Binding Corporate Rules (BCRs)</li>
                              <li>Your explicit consent where applicable</li>
                            </ul>
                          </div>

                          <p>
                            By using Pluribus, you consent to the transfer of your
                            personal data to countries outside the EEA. We will
                            take all necessary steps to ensure such transfers comply
                            with applicable laws.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* 10. Changes to Privacy Policy */}
              <section id="changes">
                <Card>
                  <CardContent className="p-8">
                    <div className="flex gap-4 mb-6">
                      <FileText className="h-8 w-8 text-indigo-600 flex-shrink-0" />
                      <div>
                        <h2 className="text-2xl font-bold mb-4">
                          10. Changes to Privacy Policy
                        </h2>
                        <div className="space-y-6 text-muted-foreground">
                          <p>
                            We may update this privacy policy periodically to
                            reflect changes in our data practices, technology, or
                            applicable laws. We will notify you of material changes
                            by:
                          </p>

                          <div className="bg-indigo-50 p-4 rounded border border-indigo-200 space-y-2">
                            <p className="flex gap-3">
                              <span className="text-indigo-600 font-bold">•</span>
                              <span>
                                Sending you an email notification to your registered
                                email address
                              </span>
                            </p>
                            <p className="flex gap-3">
                              <span className="text-indigo-600 font-bold">•</span>
                              <span>
                                Displaying a prominent notice on our platform
                              </span>
                            </p>
                            <p className="flex gap-3">
                              <span className="text-indigo-600 font-bold">•</span>
                              <span>
                                Requesting your consent where legally required
                              </span>
                            </p>
                          </div>

                          <p>
                            Your continued use of Pluribus following the posting of
                            updated privacy policy constitutes your acceptance of
                            those changes. We encourage you to review this policy
                            periodically to stay informed about how we protect your
                            privacy.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* 11. Contact Information */}
              <section id="contact">
                <Card className="border-2 border-blue-200 bg-blue-50/50">
                  <CardContent className="p-8">
                    <div className="flex gap-4 mb-6">
                      <Mail className="h-8 w-8 text-blue-600 flex-shrink-0" />
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-4">
                          11. Contact Information
                        </h2>
                        <div className="space-y-6 text-muted-foreground">
                          <p>
                            If you have questions about this privacy policy, wish
                            to exercise your data rights, or need to report a
                            privacy concern, please contact us:
                          </p>

                          <div className="bg-white p-6 rounded border border-blue-200 space-y-4">
                            <div>
                              <h3 className="font-semibold text-foreground mb-1">
                                Email
                              </h3>
                              <a
                                href="mailto:privacy@pluribus.com"
                                className="text-blue-600 hover:underline"
                              >
                                privacy@pluribus.com
                              </a>
                            </div>

                            <div>
                              <h3 className="font-semibold text-foreground mb-1">
                                Data Protection Officer (DPO)
                              </h3>
                              <a
                                href="mailto:dpo@pluribus.com"
                                className="text-blue-600 hover:underline"
                              >
                                dpo@pluribus.com
                              </a>
                            </div>

                            <div>
                              <h3 className="font-semibold text-foreground mb-1">
                                Support Portal
                              </h3>
                              <a
                                href="/help"
                                className="text-blue-600 hover:underline"
                              >
                                Visit our support center
                              </a>
                            </div>

                            <div>
                              <h3 className="font-semibold text-foreground mb-1">
                                Response Time
                              </h3>
                              <p>
                                We aim to respond to all privacy-related inquiries
                                within 30 days. For data access requests and other
                                GDPR-related rights, we comply with the 30-day
                                legal response timeframe.
                              </p>
                            </div>
                          </div>

                          <div className="bg-blue-100 p-4 rounded border border-blue-300">
                            <h3 className="font-semibold text-blue-900 mb-2">
                              Regulatory Authorities
                            </h3>
                            <p className="text-blue-800 text-sm">
                              If you believe we have not adequately addressed your
                              privacy concerns, you have the right to lodge a
                              complaint with your local data protection authority.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Call to Action */}
              <section className="mt-12">
                <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0">
                  <CardContent className="p-12 text-center">
                    <h3 className="text-2xl font-bold mb-4">
                      Your Privacy Matters to Us
                    </h3>
                    <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                      We are committed to transparency and putting you in control
                      of your personal data. If you have any questions or
                      concerns, please don't hesitate to reach out.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                        size="lg"
                        variant="secondary"
                        asChild
                        className="bg-white text-blue-600 hover:bg-blue-50"
                      >
                        <a href="mailto:privacy@pluribus.com">
                          Contact Privacy Team
                        </a>
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="bg-transparent border-white text-white hover:bg-white/10"
                        asChild
                      >
                        <Link href="/">Return to Home</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </section>
            </main>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <section className="bg-slate-50 border-t border-slate-200 py-8">
        <div className="container px-4 max-w-6xl mx-auto">
          <p className="text-sm text-muted-foreground text-center">
            This privacy policy is effective as of February 8, 2025. Last updated:
            February 8, 2025. Please review our{" "}
            <Link href="/terms" className="text-blue-600 hover:underline">
              Terms of Service
            </Link>{" "}
            for additional important information about using Pluribus.
          </p>
        </div>
      </section>
    </div>
  );
}

// Fallback Calendar icon since it's not in lucide-react
function Calendar(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h18" />
    </svg>
  );
}
