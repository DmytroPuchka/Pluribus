'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Globe2,
  Package,
  MessageSquare,
  Star,
  CreditCard,
  Shield,
  ArrowRight,
  MapPin,
  Users
} from "lucide-react";
import { useTranslations } from "@/contexts/TranslationsContext";

export default function Home() {
  const { t } = useTranslations();
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20 md:py-32">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              {t('landing.hero.title')}
              <span className="text-blue-600">{t('landing.hero.titleHighlight')}</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('landing.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/products">
                  {t('landing.hero.browseProducts')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/sellers">{t('landing.hero.viewSellers')}</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div>
                <div className="text-3xl font-bold text-blue-600">50+</div>
                <div className="text-sm text-muted-foreground">{t('landing.hero.stats.countries')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">1000+</div>
                <div className="text-sm text-muted-foreground">{t('landing.hero.stats.products')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">500+</div>
                <div className="text-sm text-muted-foreground">{t('landing.hero.stats.sellers')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{t('landing.howItWorks.title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('landing.howItWorks.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{t('landing.howItWorks.step1.title')}</h3>
                <p className="text-muted-foreground">
                  {t('landing.howItWorks.step1.description')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                  <Package className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{t('landing.howItWorks.step2.title')}</h3>
                <p className="text-muted-foreground">
                  {t('landing.howItWorks.step2.description')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                  <Globe2 className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{t('landing.howItWorks.step3.title')}</h3>
                <p className="text-muted-foreground">
                  {t('landing.howItWorks.step3.description')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-32 bg-muted/50">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{t('landing.features.title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('landing.features.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                <Globe2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t('landing.features.globalNetwork.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('landing.features.globalNetwork.description')}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                <CreditCard className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t('landing.features.securePayments.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('landing.features.securePayments.description')}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t('landing.features.realTimeChat.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('landing.features.realTimeChat.description')}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                <Star className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t('landing.features.verifiedRatings.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('landing.features.verifiedRatings.description')}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t('landing.features.safeSecure.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('landing.features.safeSecure.description')}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t('landing.features.communityDriven.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('landing.features.communityDriven.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">
                {t('landing.cta.title')}
              </h2>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                {t('landing.cta.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/register">{t('landing.cta.getStarted')}</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/how-it-works">{t('landing.cta.learnMore')}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
