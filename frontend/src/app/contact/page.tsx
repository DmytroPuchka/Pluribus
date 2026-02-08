import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  MessageSquare,
  HelpCircle,
} from "lucide-react"
import { ContactForm } from "./contact-form"

export const metadata: Metadata = {
  title: "Contact Us - Pluribus",
  description:
    "Get in touch with Pluribus. We're here to help with questions about buying, selling, or using our platform. Contact us via email, phone, or our contact form.",
  keywords: [
    "contact",
    "support",
    "customer service",
    "help",
    "email",
    "phone",
  ],
  openGraph: {
    title: "Contact Us - Pluribus",
    description:
      "Get in touch with Pluribus. We're here to help with questions about buying, selling, or using our platform.",
    type: "website",
  },
}

export default function Contact() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20 md:py-32">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're here to help! Whether you have questions about our platform, need support, or want to partner with us, our team is ready to assist.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information and Form Section */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto">
            {/* Contact Info Cards */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Mail className="h-8 w-8 text-blue-600 mb-4" />
                  <h3 className="font-semibold mb-2 text-lg">Email</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Send us an email and we'll respond within 24 hours.
                  </p>
                  <a
                    href="mailto:support@pluribus.com"
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    support@pluribus.com
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Phone className="h-8 w-8 text-blue-600 mb-4" />
                  <h3 className="font-semibold mb-2 text-lg">Phone</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Call us during business hours (9 AM - 6 PM UTC)
                  </p>
                  <a
                    href="tel:+1234567890"
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    +1 (234) 567-890
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <MapPin className="h-8 w-8 text-blue-600 mb-4" />
                  <h3 className="font-semibold mb-2 text-lg">Office</h3>
                  <p className="text-sm text-muted-foreground">
                    123 Commerce Street
                    <br />
                    Tech City, TC 12345
                    <br />
                    United States
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto mb-16">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Social Media Links Section */}
      <section className="py-20 md:py-32 bg-muted/50">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Connect With Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Follow our social media channels for updates, news, and community discussions about Pluribus.
            </p>
          </div>

          <div className="flex justify-center gap-6 flex-wrap max-w-4xl mx-auto mb-12">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-input hover:bg-muted transition-colors"
              aria-label="Follow on Twitter"
            >
              <Twitter className="h-5 w-5" />
              <span className="font-medium">Twitter</span>
            </a>

            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-input hover:bg-muted transition-colors"
              aria-label="Follow on Facebook"
            >
              <Facebook className="h-5 w-5" />
              <span className="font-medium">Facebook</span>
            </a>

            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-input hover:bg-muted transition-colors"
              aria-label="Follow on LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
              <span className="font-medium">LinkedIn</span>
            </a>

            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-input hover:bg-muted transition-colors"
              aria-label="Follow on Instagram"
            >
              <Instagram className="h-5 w-5" />
              <span className="font-medium">Instagram</span>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ and Help Section */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Quick Help</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Can't find what you're looking for? Check out our FAQ or knowledge base.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <HelpCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-2 text-lg">Frequently Asked Questions</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Browse our comprehensive FAQ section to find answers to common questions about buying, selling, payments, and shipping.
                    </p>
                    <Button variant="outline" asChild>
                      <Link href="/how-it-works#faq">View FAQ</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <MessageSquare className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-2 text-lg">Live Chat Support</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      For immediate assistance, open our live chat to connect with our support team. Available 24/7 for urgent issues.
                    </p>
                    <Button variant="outline">Start Live Chat</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Response Time Section */}
      <section className="py-20 md:py-32 bg-blue-50 dark:bg-blue-950/20">
        <div className="container px-4">
          <Card className="max-w-3xl mx-auto border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-900/20">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">We Value Your Time</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  We're committed to responding to all inquiries as quickly as possible. Here's what to expect:
                </p>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-blue-600 mb-2">24h</div>
                    <p className="text-sm text-muted-foreground">
                      Email responses
                    </p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600 mb-2">1h</div>
                    <p className="text-sm text-muted-foreground">
                      Live chat during business hours
                    </p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600 mb-2">Immediate</div>
                    <p className="text-sm text-muted-foreground">
                      Emergency support
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0 max-w-3xl mx-auto">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Have a General Question?</h2>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                Check out our how-it-works guide for detailed information about using Pluribus as a buyer or seller.
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/how-it-works">Learn How It Works</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
