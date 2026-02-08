import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Globe2,
  Heart,
  Zap,
  Shield,
  Users,
  TrendingUp,
  ArrowRight,
  Lightbulb,
  Target,
  Award,
  Package,
  MessageSquare,
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Pluribus - Our Story & Mission",
  description: "Learn about Pluribus: connecting buyers and sellers worldwide. Discover our mission, values, and commitment to making international delivery simple and secure.",
  keywords: ["about pluribus", "international delivery", "global marketplace", "our story", "our mission"],
  openGraph: {
    title: "About Pluribus - Our Story & Mission",
    description: "Learn about Pluribus: connecting buyers and sellers worldwide. Discover our mission, values, and commitment to making international delivery simple and secure.",
    type: "website",
  },
};

const values = [
  {
    icon: Globe2,
    title: "Global Accessibility",
    description: "We believe everyone deserves access to products from anywhere in the world, regardless of their location.",
  },
  {
    icon: Heart,
    title: "Trust & Transparency",
    description: "Building genuine relationships through honest communication, verified ratings, and secure transactions.",
  },
  {
    icon: Zap,
    title: "Innovation & Speed",
    description: "Constantly improving our platform to make international shopping faster, easier, and more efficient.",
  },
  {
    icon: Shield,
    title: "Safety & Security",
    description: "Protecting our community with robust security measures, escrow systems, and dedicated support.",
  },
  {
    icon: Users,
    title: "Community First",
    description: "Empowering buyers and sellers to succeed together, creating opportunities for economic growth worldwide.",
  },
  {
    icon: Target,
    title: "Excellence & Impact",
    description: "Striving for the highest standards in every aspect of our service to create meaningful change globally.",
  },
];

const stats = [
  {
    number: "50+",
    label: "Countries Connected",
    description: "Global reach across multiple continents",
  },
  {
    number: "1000+",
    label: "Products Available",
    description: "Diverse marketplace of goods",
  },
  {
    number: "500+",
    label: "Sellers Worldwide",
    description: "Trusted sellers from around the globe",
  },
  {
    number: "10K+",
    label: "Happy Users",
    description: "Growing community of satisfied customers",
  },
];

export default function About() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20 md:py-32">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              Connecting the
              <span className="text-blue-600"> World</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Pluribus is building the future of international commerce by making it simple,
              secure, and accessible for buyers and sellers everywhere.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-lg text-muted-foreground">
                From a simple idea to a global platform
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardContent className="p-8">
                  <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                      <Lightbulb className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">The Beginning</h3>
                      <p className="text-muted-foreground">
                        Pluribus was founded on a simple observation: billions of people worldwide want access to products
                        they can't find locally, but the process is complicated, expensive, and often unreliable. We saw an opportunity
                        to create a better way.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                      <Target className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                      <p className="text-muted-foreground">
                        We set out to eliminate the barriers of international commerce. By connecting buyers with trustworthy sellers
                        across the globe, we're creating a marketplace where anyone can shop globally as easily as shopping locally.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                      <Award className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Today & Beyond</h3>
                      <p className="text-muted-foreground">
                        Today, Pluribus connects thousands of buyers and sellers across 50+ countries. We're continuously innovating,
                        adding new features, and expanding our reach to make international shopping truly accessible to everyone.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 md:py-32 bg-muted/50">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What We Do</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Pluribus is more than just a marketplace—it's a complete platform designed to make
              international commerce simple and secure
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                  <Globe2 className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Global Marketplace</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with sellers from 50+ countries and access products you won't find locally
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Direct Communication</h3>
                <p className="text-sm text-muted-foreground">
                  Real-time chat with sellers to negotiate, customize orders, and build relationships
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Secure Transactions</h3>
                <p className="text-sm text-muted-foreground">
                  Escrow-protected payments and verified ratings keep both buyers and sellers safe
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                  <Package className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Easy Fulfillment</h3>
                <p className="text-sm text-muted-foreground">
                  Streamlined ordering process with integrated shipping and tracking
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Growth Opportunities</h3>
                <p className="text-sm text-muted-foreground">
                  For sellers: reach new markets. For buyers: access global opportunities
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Community Support</h3>
                <p className="text-sm text-muted-foreground">
                  Dedicated support team and thriving community to help you succeed
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide every decision we make and shape our culture
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats/Achievements Section */}
      <section className="py-20 md:py-32 bg-blue-600 text-white">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <p className="text-blue-100">
              Join thousands of satisfied buyers and sellers transforming international commerce
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg font-semibold text-blue-100 mb-1">{stat.label}</div>
                <p className="text-sm text-blue-200">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section (Placeholder) */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Passionate people from around the world working together to transform global commerce
            </p>
          </div>

          <Card className="max-w-2xl mx-auto bg-muted/50">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Meet the Team Coming Soon</h3>
              <p className="text-muted-foreground">
                We're building an amazing team of engineers, designers, and operators dedicated to
                making international commerce accessible to everyone. Check back soon to meet the people behind Pluribus!
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container px-4">
          <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Be Part of Our Story?
              </h2>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                Join Pluribus today and become part of a global community transforming how people
                shop internationally. Whether you're a buyer seeking global products or a seller
                looking to reach new markets, we're here to help you succeed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/register">
                    Get Started Free
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
