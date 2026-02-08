import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  MessageSquare,
  Package,
  Truck,
  CreditCard,
  CheckCircle,
  Globe2,
  Users,
  Shield,
  Star,
  ArrowRight,
  HelpCircle,
  Lock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "How It Works - Pluribus",
  description:
    "Learn how Pluribus works. Complete guide for buyers and sellers on international delivery and global marketplace.",
  keywords: [
    "how it works",
    "guide",
    "international delivery",
    "buyer guide",
    "seller guide",
  ],
  openGraph: {
    title: "How It Works - Pluribus",
    description:
      "Learn how Pluribus works. Complete guide for buyers and sellers on international delivery and global marketplace.",
    type: "website",
  },
};

export default function HowItWorks() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20 md:py-32">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              How
              <span className="text-blue-600"> Pluribus </span>
              Works
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover the simple process behind connecting global buyers and
              sellers. Whether you're looking to purchase or sell, we've made
              international delivery accessible and secure for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Pluribus?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We've built a platform that removes the barriers of international
              shopping, making it as easy as local commerce.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <Globe2 className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="font-semibold mb-2">50+ Countries</h3>
                <p className="text-sm text-muted-foreground">
                  Access sellers from across the globe
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Shield className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="font-semibold mb-2">Secure Payments</h3>
                <p className="text-sm text-muted-foreground">
                  Escrow protection for every transaction
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <MessageSquare className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="font-semibold mb-2">Direct Communication</h3>
                <p className="text-sm text-muted-foreground">
                  Chat with sellers in real-time
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Star className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="font-semibold mb-2">Verified Reviews</h3>
                <p className="text-sm text-muted-foreground">
                  Trust through transparency and ratings
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Buyer Guide */}
      <section className="py-20 md:py-32 bg-muted/50">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">For Buyers</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Follow these simple steps to find and purchase products from
              sellers worldwide
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {/* Step 1 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 font-bold text-lg">
                    1
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">
                        Create Your Account
                      </h3>
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <p className="text-muted-foreground mb-3">
                      Sign up for free with your email or social account. Set
                      up your profile with your shipping information and
                      preferences.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Takes less than 2 minutes
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        No fees required to join
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Verify your email for security
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 font-bold text-lg">
                    2
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">
                        Browse Products & Sellers
                      </h3>
                      <Search className="h-5 w-5 text-blue-600" />
                    </div>
                    <p className="text-muted-foreground mb-3">
                      Explore our catalog or use the interactive map to find
                      sellers. Read reviews and ratings from other buyers to
                      make informed decisions.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Filter by location, price, and ratings
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        View detailed seller profiles
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Check shipping availability to your country
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 font-bold text-lg">
                    3
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">
                        Connect with Sellers
                      </h3>
                      <MessageSquare className="h-5 w-5 text-blue-600" />
                    </div>
                    <p className="text-muted-foreground mb-3">
                      Have questions about a product? Message the seller
                      directly. Discuss specifications, shipping costs, and
                      custom orders through our real-time chat.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Instant messaging with sellers
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Negotiate prices and shipping
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Request custom items or bundles
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 4 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 font-bold text-lg">
                    4
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">
                        Place Your Order
                      </h3>
                      <Package className="h-5 w-5 text-blue-600" />
                    </div>
                    <p className="text-muted-foreground mb-3">
                      Once you're ready, place your order on the platform.
                      Your payment is secured through escrow until you confirm
                      receipt.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Multiple payment options available
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Secure payment processing with Stripe
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Clear order summary and terms
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 5 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 font-bold text-lg">
                    5
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">
                        Track & Receive
                      </h3>
                      <Truck className="h-5 w-5 text-blue-600" />
                    </div>
                    <p className="text-muted-foreground mb-3">
                      Seller ships your order, and you can track it in
                      real-time. Get updates at each step of the delivery
                      process.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Real-time tracking updates
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Receive at your doorstep
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Chat with seller during shipping
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 6 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 font-bold text-lg">
                    6
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">
                        Rate & Review
                      </h3>
                      <Star className="h-5 w-5 text-blue-600" />
                    </div>
                    <p className="text-muted-foreground mb-3">
                      Share your experience by rating the seller and leaving a
                      review. Your feedback helps other buyers and builds a
                      trusted community.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        5-star rating system
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Write detailed reviews
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Verified purchase badge on reviews
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Seller Guide */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">For Sellers</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Start selling to customers around the world in just a few steps
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {/* Step 1 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 font-bold text-lg">
                    1
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">
                        Set Up Your Seller Account
                      </h3>
                      <Users className="h-5 w-5 text-green-600" />
                    </div>
                    <p className="text-muted-foreground mb-3">
                      Register as a seller and complete your business profile.
                      Provide your business details, shipping capabilities, and
                      payment information.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Verify your business information
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Add payment method for payouts
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Set up shipping preferences
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 font-bold text-lg">
                    2
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">
                        List Your Products
                      </h3>
                      <Package className="h-5 w-5 text-green-600" />
                    </div>
                    <p className="text-muted-foreground mb-3">
                      Create product listings with detailed descriptions,
                      prices, and high-quality images. Specify shipping
                      destinations and delivery times.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Upload multiple product images
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Set competitive pricing
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Define shipping zones and costs
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 font-bold text-lg">
                    3
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">
                        Respond to Inquiries
                      </h3>
                      <MessageSquare className="h-5 w-5 text-green-600" />
                    </div>
                    <p className="text-muted-foreground mb-3">
                      Buyers will message you with questions, custom requests,
                      and negotiations. Respond quickly to build your reputation
                      and close more sales.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Real-time chat notifications
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Negotiate on pricing and terms
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Create custom quotes
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 4 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 font-bold text-lg">
                    4
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">
                        Process Orders
                      </h3>
                      <CreditCard className="h-5 w-5 text-green-600" />
                    </div>
                    <p className="text-muted-foreground mb-3">
                      When a buyer places an order, you receive payment through
                      escrow. Money is held securely until the buyer confirms
                      receipt.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Instant order notifications
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Secure payment in escrow
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Clear order details and requirements
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 5 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 font-bold text-lg">
                    5
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">
                        Ship & Track
                      </h3>
                      <Truck className="h-5 w-5 text-green-600" />
                    </div>
                    <p className="text-muted-foreground mb-3">
                      Pack and ship the order using your preferred carrier. Add
                      tracking information so buyers can monitor their shipment
                      in real-time.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Integrate with major carriers
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Auto-update buyer on shipment status
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Print shipping labels directly
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 6 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 font-bold text-lg">
                    6
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">
                        Receive Payment & Build Reputation
                      </h3>
                      <Star className="h-5 w-5 text-green-600" />
                    </div>
                    <p className="text-muted-foreground mb-3">
                      Once buyer confirms receipt, payment is released to your
                      account. Build your reputation through positive ratings
                      and reviews to attract more customers.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Instant payout upon confirmation
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Build seller rating and reviews
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Access seller analytics dashboard
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 bg-muted/50">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have questions? Find answers to the most common questions about
              using Pluribus
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {/* FAQ 1 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <HelpCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      Is it safe to buy on Pluribus?
                    </h3>
                    <p className="text-muted-foreground">
                      Yes! Pluribus uses escrow protection for all transactions.
                      Your payment is held securely until you confirm receipt of
                      the product. We also verify seller identities and maintain
                      a transparent review system.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ 2 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <HelpCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      What are the payment methods?
                    </h3>
                    <p className="text-muted-foreground">
                      We accept all major credit and debit cards through Stripe
                      integration. Additional payment methods may be available
                      depending on your location. All payments are encrypted and
                      secure.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ 3 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <HelpCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      How long does shipping take?
                    </h3>
                    <p className="text-muted-foreground">
                      Shipping times vary depending on the seller's location and
                      your destination. Each product listing shows estimated
                      delivery times. International shipments typically take 7-30
                      days depending on the route.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ 4 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <HelpCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      What if I don't receive my order?
                    </h3>
                    <p className="text-muted-foreground">
                      We have a comprehensive buyer protection policy. If you
                      don't receive your order, contact us immediately with
                      tracking information. We'll work with the seller and
                      carrier to resolve the issue or provide a refund.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ 5 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <HelpCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      Are there any hidden fees?
                    </h3>
                    <p className="text-muted-foreground">
                      No hidden fees! For buyers, you see the full price upfront
                      including shipping. For sellers, we charge a small
                      transaction fee (clearly disclosed) to cover payment
                      processing and platform maintenance.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ 6 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <HelpCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      How do I become a seller?
                    </h3>
                    <p className="text-muted-foreground">
                      Sign up for a seller account, complete your business
                      profile, and add your products. Our team will verify your
                      information, and once approved, you can start accepting
                      orders within 24-48 hours.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ 7 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <HelpCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      Can I request custom items?
                    </h3>
                    <p className="text-muted-foreground">
                      Absolutely! Message sellers directly to discuss custom
                      orders or special requests. Many sellers are happy to
                      accommodate specific requirements. You can negotiate terms
                      and pricing through our chat feature.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ 8 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <HelpCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      What about customs and taxes?
                    </h3>
                    <p className="text-muted-foreground">
                      Buyers are responsible for any customs duties or import
                      taxes based on their country's regulations. Sellers will
                      declare the item value accurately on customs forms. Check
                      your local customs regulations before ordering.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Security Features Section */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Your Safety is Our Priority</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We've implemented multiple layers of protection to ensure safe and
              secure transactions for all users
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <Lock className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="font-semibold mb-2">Secure Payments</h3>
                <p className="text-sm text-muted-foreground">
                  All transactions processed through Stripe with industry-leading
                  encryption and fraud detection
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Shield className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="font-semibold mb-2">Escrow Protection</h3>
                <p className="text-sm text-muted-foreground">
                  Funds held securely until buyer confirms receipt and seller
                  protection against chargebacks
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Users className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="font-semibold mb-2">Verified Users</h3>
                <p className="text-sm text-muted-foreground">
                  Email verification and seller account validation ensure you're
                  communicating with legitimate users
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Star className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="font-semibold mb-2">Transparent Reviews</h3>
                <p className="text-sm text-muted-foreground">
                  Verified purchase reviews with seller response ratings help
                  identify trustworthy partners
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <MessageSquare className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="font-semibold mb-2">Direct Communication</h3>
                <p className="text-sm text-muted-foreground">
                  All messages routed through our platform for transparency and
                  dispute resolution support
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <CreditCard className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="font-semibold mb-2">Buyer Protection</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive claims process protects against fraud and
                  non-delivery issues
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-muted/50">
        <div className="container px-4">
          <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0 max-w-3xl mx-auto">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-blue-100 mb-8">
                Join thousands of buyers and sellers using Pluribus to connect
                globally. It's free to join!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/register">
                    Create Your Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/products">Browse Products</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
