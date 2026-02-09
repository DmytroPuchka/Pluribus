'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { useTranslations } from '@/contexts/TranslationsContext';

interface TableOfContentsItem {
  title: string;
  id: string;
}

const tableOfContents: TableOfContentsItem[] = [
  { title: "Acceptance of Terms", id: "acceptance" },
  { title: "User Accounts", id: "accounts" },
  { title: "User Obligations", id: "obligations" },
  { title: "Prohibited Activities", id: "prohibited" },
  { title: "Product Listings", id: "listings" },
  { title: "Orders and Payments", id: "orders" },
  { title: "Shipping and Delivery", id: "shipping" },
  { title: "Returns and Refunds", id: "returns" },
  { title: "Disputes", id: "disputes" },
  { title: "Intellectual Property", id: "intellectual" },
  { title: "Limitation of Liability", id: "liability" },
  { title: "Changes to Terms", id: "changes" },
  { title: "Contact Information", id: "contact" },
];

export default function TermsOfService() {
  const { t } = useTranslations();
  const lastUpdatedDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20 md:py-32">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              {t('pages.terms.hero.title')}
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              {t('pages.terms.hero.subtitle')}
            </p>
            <p className="text-sm text-muted-foreground">
              {t('pages.terms.hero.lastUpdated')}: {lastUpdatedDate}
            </p>
          </div>
        </div>
      </section>

      {/* Legal Disclaimer */}
      <section className="py-8 border-b">
        <div className="container px-4">
          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-amber-900 mb-2">
                    {t('pages.terms.disclaimer.title')}
                  </h3>
                  <p className="text-sm text-amber-800">
                    {t('pages.terms.disclaimer.description')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-20">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Table of Contents */}
            <aside className="lg:col-span-1">
              <Card className="sticky top-4 h-fit">
                <CardContent className="pt-6">
                  <h2 className="font-semibold mb-4 text-sm uppercase tracking-wide">
                    Table of Contents
                  </h2>
                  <nav className="space-y-2">
                    {tableOfContents.map((item) => (
                      <Link
                        key={item.id}
                        href={`#${item.id}`}
                        className="block text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </aside>

            {/* Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* 1. Acceptance of Terms */}
              <section id="acceptance" className="scroll-mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold mb-4">
                      1. Acceptance of Terms
                    </h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        By accessing and using the Pluribus platform
                        (hereinafter referred to as "Platform," "Service," or
                        "we/us"), including our website and mobile applications,
                        you agree to be bound by these Terms of Service
                        ("Terms"). If you do not agree to any part of these
                        Terms, you must not use the Platform.
                      </p>
                      <p>
                        We reserve the right to modify these Terms at any time.
                        Continued use of the Platform following the posting of
                        modified Terms means that you accept and agree to the
                        changes. Your continued use of the Platform constitutes
                        your acceptance of the modified Terms.
                      </p>
                      <p>
                        These Terms apply to all users, whether you are accessing
                        the Platform as a buyer, seller, or both. Additional
                        terms may apply to specific services or features offered
                        through the Platform.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* 2. User Accounts */}
              <section id="accounts" className="scroll-mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold mb-4">2. User Accounts</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          2.1 Account Registration
                        </h3>
                        <p>
                          To use certain features of the Platform, you must
                          create a user account. You agree to provide accurate,
                          current, and complete information during registration
                          and to update such information to maintain accuracy. You
                          are responsible for maintaining the confidentiality of
                          your account credentials and for all activities that
                          occur under your account.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          2.2 Eligibility
                        </h3>
                        <p>
                          You must be at least 18 years of age to use the
                          Platform. By registering, you represent and warrant
                          that you have the legal capacity to enter into this
                          agreement. Individuals under 18 may use the Platform
                          only with explicit parental or guardian consent.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          2.3 Account Security
                        </h3>
                        <p>
                          You are responsible for all activities conducted through
                          your account. You agree to notify us immediately of any
                          unauthorized use of your account or password. We are not
                          liable for any losses arising from unauthorized use of
                          your account.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          2.4 Account Termination
                        </h3>
                        <p>
                          We reserve the right to suspend or terminate your
                          account if you violate these Terms or engage in
                          prohibited activities. Upon termination, your right to
                          use the Platform ceases immediately.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* 3. User Obligations */}
              <section id="obligations" className="scroll-mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold mb-4">
                      3. User Obligations
                    </h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        As a user of the Platform, you agree to:
                      </p>
                      <ul className="space-y-3 ml-4">
                        <li className="flex gap-3">
                          <span className="font-semibold text-foreground">•</span>
                          <span>
                            Comply with all applicable laws, regulations, and
                            these Terms
                          </span>
                        </li>
                        <li className="flex gap-3">
                          <span className="font-semibold text-foreground">•</span>
                          <span>
                            Not use the Platform for any illegal or unauthorized
                            purpose
                          </span>
                        </li>
                        <li className="flex gap-3">
                          <span className="font-semibold text-foreground">•</span>
                          <span>
                            Provide accurate and truthful information in all
                            transactions
                          </span>
                        </li>
                        <li className="flex gap-3">
                          <span className="font-semibold text-foreground">•</span>
                          <span>
                            Respect the intellectual property rights of others
                          </span>
                        </li>
                        <li className="flex gap-3">
                          <span className="font-semibold text-foreground">•</span>
                          <span>
                            Communicate respectfully with other users and our
                            team
                          </span>
                        </li>
                        <li className="flex gap-3">
                          <span className="font-semibold text-foreground">•</span>
                          <span>
                            Pay all fees and charges owed for your transactions
                          </span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* 4. Prohibited Activities */}
              <section id="prohibited" className="scroll-mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold mb-4">
                      4. Prohibited Activities
                    </h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        You agree not to engage in any of the following activities:
                      </p>
                      <ul className="space-y-3 ml-4">
                        <li className="flex gap-3">
                          <span className="font-semibold text-foreground">•</span>
                          <span>
                            Selling illegal, counterfeit, or stolen items
                          </span>
                        </li>
                        <li className="flex gap-3">
                          <span className="font-semibold text-foreground">•</span>
                          <span>
                            Engaging in fraudulent or deceptive practices
                          </span>
                        </li>
                        <li className="flex gap-3">
                          <span className="font-semibold text-foreground">•</span>
                          <span>
                            Harassment, abuse, or defamation of other users
                          </span>
                        </li>
                        <li className="flex gap-3">
                          <span className="font-semibold text-foreground">•</span>
                          <span>
                            Attempting to gain unauthorized access to the Platform
                          </span>
                        </li>
                        <li className="flex gap-3">
                          <span className="font-semibold text-foreground">•</span>
                          <span>
                            Disrupting the normal functioning of the Platform
                          </span>
                        </li>
                        <li className="flex gap-3">
                          <span className="font-semibold text-foreground">•</span>
                          <span>
                            Violating export control or sanctions regulations
                          </span>
                        </li>
                        <li className="flex gap-3">
                          <span className="font-semibold text-foreground">•</span>
                          <span>
                            Using automated tools to scrape data from the Platform
                          </span>
                        </li>
                        <li className="flex gap-3">
                          <span className="font-semibold text-foreground">•</span>
                          <span>
                            Money laundering or financial crimes
                          </span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* 5. Product Listings */}
              <section id="listings" className="scroll-mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold mb-4">
                      5. Product Listings
                    </h2>
                    <div className="space-y-4 text-muted-foreground">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          5.1 Seller Responsibilities
                        </h3>
                        <p>
                          Sellers are responsible for the accuracy and legality
                          of their product listings. All product descriptions,
                          prices, images, and specifications must be accurate,
                          complete, and not misleading. Sellers warrant that they
                          have the right to sell all items listed on the Platform.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          5.2 Prohibited Listings
                        </h3>
                        <p>
                          We reserve the right to remove listings that contain
                          prohibited items, including but not limited to:
                          counterfeit goods, weapons, hazardous materials,
                          stolen items, and items that violate local laws or
                          regulations. Sellers who repeatedly list prohibited
                          items may have their accounts terminated.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          5.3 Pricing and Availability
                        </h3>
                        <p>
                          Sellers must update inventory in real-time to reflect
                          actual availability. We are not responsible for
                          overselling or price errors caused by seller negligence.
                          Sellers must honor prices displayed on the Platform at
                          the time of purchase.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* 6. Orders and Payments */}
              <section id="orders" className="scroll-mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold mb-4">
                      6. Orders and Payments
                    </h2>
                    <div className="space-y-4 text-muted-foreground">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          6.1 Order Confirmation
                        </h3>
                        <p>
                          Placing an order constitutes an offer to purchase. Orders
                          are subject to seller acceptance. We will send you a
                          confirmation email when an order is placed, but this does
                          not guarantee that the order will be fulfilled.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          6.2 Payment Methods
                        </h3>
                        <p>
                          We accept payment through Stripe, including major credit
                          and debit cards. By providing payment information, you
                          authorize us to charge your account for the purchase
                          amount plus applicable fees. All payments are processed
                          securely and encrypted.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          6.3 Escrow Protection
                        </h3>
                        <p>
                          All buyer payments are held in escrow until the buyer
                          confirms receipt of the item or the dispute resolution
                          process is completed. This protects both buyers and
                          sellers from fraud and ensures secure transactions.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          6.4 Fees and Taxes
                        </h3>
                        <p>
                          Sellers pay a transaction fee on orders processed through
                          the Platform. All prices displayed to buyers include
                          applicable shipping costs. Buyers may be responsible for
                          import duties, customs taxes, and VAT depending on their
                          location and applicable regulations.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* 7. Shipping and Delivery */}
              <section id="shipping" className="scroll-mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold mb-4">
                      7. Shipping and Delivery
                    </h2>
                    <div className="space-y-4 text-muted-foreground">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          7.1 Shipping Responsibility
                        </h3>
                        <p>
                          Sellers are responsible for packaging, labeling, and
                          shipping items in a timely manner. Sellers must use
                          reliable carriers and provide tracking information to
                          buyers. We are not responsible for delays or damages
                          caused by carriers.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          7.2 Delivery Times
                        </h3>
                        <p>
                          Estimated delivery times are provided by sellers and are
                          approximate. We are not responsible for delays beyond our
                          control, including customs clearance, weather, or carrier
                          issues. International shipments typically take 7-30 days.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          7.3 Risk of Loss
                        </h3>
                        <p>
                          Risk of loss transfers to the buyer upon delivery or
                          when the buyer takes possession of the item, whichever
                          comes first. The buyer is responsible for any loss or
                          damage that occurs after delivery.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          7.4 Customs and Import Regulations
                        </h3>
                        <p>
                          Buyers are responsible for understanding and complying
                          with their country's import regulations and paying any
                          required customs duties or import taxes. We cannot be held
                          liable for items seized by customs authorities.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* 8. Returns and Refunds */}
              <section id="returns" className="scroll-mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold mb-4">
                      8. Returns and Refunds
                    </h2>
                    <div className="space-y-4 text-muted-foreground">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          8.1 Return Policies
                        </h3>
                        <p>
                          Each seller may establish their own return policy. The
                          applicable return policy will be displayed on each product
                          listing. Buyers must review the return policy before
                          completing a purchase. We recommend that sellers provide
                          reasonable return windows (typically 7-30 days).
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          8.2 Refund Processing
                        </h3>
                        <p>
                          Refunds will be processed within 5-10 business days of
                          approval. The refund will be credited to the original
                          payment method. Return shipping costs may be borne by the
                          buyer or seller depending on the circumstances and seller
                          policy.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          8.3 Defective or Damaged Items
                        </h3>
                        <p>
                          If an item arrives damaged or defective, contact the seller
                          immediately with photographic evidence. Sellers are
                          responsible for providing replacement or refund for defective
                          items received. For carrier-caused damage, file a claim with
                          the carrier with the seller's assistance.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* 9. Disputes */}
              <section id="disputes" className="scroll-mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold mb-4">9. Disputes</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          9.1 Dispute Resolution Process
                        </h3>
                        <p>
                          In the event of a dispute, the parties agree to first
                          attempt resolution through direct communication. If
                          resolution cannot be reached within 5 days, either party
                          may initiate a formal dispute through our Platform.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          9.2 Mediation
                        </h3>
                        <p>
                          Our team will review disputes and provide mediation
                          services. We will investigate the claims of both parties
                          and make a determination based on the evidence provided.
                          This determination is binding on both parties.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          9.3 Arbitration
                        </h3>
                        <p>
                          Any disputes arising out of or relating to these Terms
                          or the use of the Platform shall be resolved through
                          binding arbitration in accordance with the laws of the
                          jurisdiction where our company is headquartered, unless
                          otherwise agreed upon by the parties.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          9.4 Class Action Waiver
                        </h3>
                        <p>
                          You agree that any dispute shall be brought in an
                          individual capacity and not as a plaintiff or class member
                          in any class or representative action. You waive your right
                          to participate in a class action lawsuit against the Platform.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* 10. Intellectual Property */}
              <section id="intellectual" className="scroll-mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold mb-4">
                      10. Intellectual Property
                    </h2>
                    <div className="space-y-4 text-muted-foreground">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          10.1 Platform Content
                        </h3>
                        <p>
                          The Platform and all content provided by Pluribus,
                          including but not limited to text, graphics, logos, images,
                          and software, are owned by Pluribus or its licensors and
                          are protected by copyright and other intellectual property
                          laws. You may not reproduce, distribute, or transmit such
                          content without our prior written permission.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          10.2 User Content
                        </h3>
                        <p>
                          You retain ownership of content you create and upload to
                          the Platform (product descriptions, reviews, images). By
                          uploading content, you grant Pluribus a non-exclusive,
                          royalty-free license to use, display, and distribute such
                          content on the Platform.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          10.3 Trademark
                        </h3>
                        <p>
                          "Pluribus" and all associated logos are trademarks of
                          Pluribus. You may not use these trademarks without express
                          written permission. Any unauthorized use is prohibited.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          10.4 Copyright Infringement
                        </h3>
                        <p>
                          If you believe that content on the Platform infringes your
                          copyright, please contact us with detailed information,
                          including proof of ownership. We will investigate and
                          remove infringing content when appropriate.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* 11. Limitation of Liability */}
              <section id="liability" className="scroll-mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold mb-4">
                      11. Limitation of Liability
                    </h2>
                    <div className="space-y-4 text-muted-foreground">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          11.1 As-Is Basis
                        </h3>
                        <p>
                          The Platform is provided on an "AS-IS" and "AS-AVAILABLE"
                          basis without warranties of any kind, either express or
                          implied. We do not warrant that the Platform will be
                          uninterrupted, error-free, or free of viruses.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          11.2 Disclaimer of Warranties
                        </h3>
                        <p>
                          We disclaim all warranties, including warranties of
                          merchantability, fitness for a particular purpose, and
                          non-infringement. We are not responsible for the accuracy,
                          completeness, or quality of products or services offered by
                          sellers.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          11.3 Limitation of Damages
                        </h3>
                        <p>
                          In no event shall Pluribus be liable for indirect,
                          incidental, special, consequential, or punitive damages
                          arising out of or relating to your use of the Platform,
                          even if advised of the possibility of such damages.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          11.4 Limitation Amount
                        </h3>
                        <p>
                          Our total liability for any claims arising out of or
                          relating to these Terms shall not exceed the amount you
                          paid to Pluribus in the twelve months preceding the claim.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* 12. Privacy and Changes to Terms */}
              <section id="changes" className="scroll-mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold mb-4">
                      12. Privacy Policy and Changes to Terms
                    </h2>
                    <div className="space-y-4 text-muted-foreground">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          12.1 Privacy Policy
                        </h3>
                        <p>
                          Your use of the Platform is also governed by our
                          <Link
                            href="/privacy"
                            className="text-blue-600 hover:underline"
                          >
                            {" "}
                            Privacy Policy
                          </Link>
                          . Please review our Privacy Policy to understand our
                          practices regarding the collection and use of your personal
                          information.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          12.2 Modifications to Terms
                        </h3>
                        <p>
                          We may modify these Terms at any time by posting the
                          modified version on the Platform. Your continued use of
                          the Platform following the posting of modifications
                          constitutes your acceptance of the modified Terms. We
                          recommend that you review these Terms regularly for
                          changes.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          12.3 Notification of Changes
                        </h3>
                        <p>
                          For material changes to these Terms, we will make reasonable
                          efforts to notify users through email or a prominent notice
                          on the Platform. However, it is your responsibility to review
                          these Terms regularly.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* 13. Contact Information */}
              <section id="contact" className="scroll-mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold mb-4">
                      13. Contact Information
                    </h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        If you have any questions or concerns regarding these Terms
                        of Service, please contact us:
                      </p>
                      <div className="bg-muted p-6 rounded-lg mt-4 space-y-2">
                        <p>
                          <span className="font-semibold text-foreground">Email:</span>{" "}
                          support@pluribus.com
                        </p>
                        <p>
                          <span className="font-semibold text-foreground">
                            Mailing Address:
                          </span>{" "}
                          Pluribus Inc.<br />
                          Legal Department<br />
                          [Your Company Address]
                        </p>
                        <p>
                          <span className="font-semibold text-foreground">
                            Response Time:
                          </span>{" "}
                          We will respond to inquiries within 5 business days.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Closing Statement */}
              <section className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <div className="space-y-4 text-muted-foreground">
                  <p className="font-semibold text-foreground">
                    Entire Agreement
                  </p>
                  <p>
                    These Terms of Service, together with the Privacy Policy and
                    any other terms referenced herein, constitute the entire
                    agreement between you and Pluribus regarding your use of the
                    Platform and supersede all prior agreements and understandings.
                  </p>
                  <p>
                    If any provision of these Terms is found to be invalid or
                    unenforceable, the remaining provisions shall continue in full
                    force and effect.
                  </p>
                  <p className="text-sm italic pt-4">
                    Last Updated: {lastUpdatedDate}
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 md:py-20 bg-muted/50 border-t">
        <div className="container px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">{t('pages.terms.cta.title')}</h2>
            <p className="text-muted-foreground mb-6">
              {t('pages.terms.cta.description')}
            </p>
            <Link
              href="mailto:support@pluribus.com"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t('pages.terms.cta.button')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
