'use client';

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
import { useTranslations } from "@/contexts/TranslationsContext";

export default function HowItWorks() {
  const { t } = useTranslations();
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20 md:py-32">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              {t('pages.howItWorks.hero.title')}
              <span className="text-blue-600">{t('pages.howItWorks.hero.titleHighlight')}</span>
              {t('pages.howItWorks.hero.titleEnd')}
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('pages.howItWorks.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{t('pages.howItWorks.why.title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('pages.howItWorks.why.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <Globe2 className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="font-semibold mb-2">{t('pages.howItWorks.why.features.countries.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('pages.howItWorks.why.features.countries.description')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Shield className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="font-semibold mb-2">{t('pages.howItWorks.why.features.securePayments.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('pages.howItWorks.why.features.securePayments.description')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <MessageSquare className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="font-semibold mb-2">{t('pages.howItWorks.why.features.communication.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('pages.howItWorks.why.features.communication.description')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Star className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="font-semibold mb-2">{t('pages.howItWorks.why.features.reviews.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('pages.howItWorks.why.features.reviews.description')}
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
            <h2 className="text-3xl font-bold mb-4">{t('pages.howItWorks.forBuyers.title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('pages.howItWorks.forBuyers.subtitle')}
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
                        {t('pages.howItWorks.forBuyers.steps.step1.title')}
                      </h3>
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <p className="text-muted-foreground mb-3">
                      {t('pages.howItWorks.forBuyers.steps.step1.description')}
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {t('pages.howItWorks.forBuyers.steps.step1.feature1')}
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {t('pages.howItWorks.forBuyers.steps.step1.feature2')}
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {t('pages.howItWorks.forBuyers.steps.step1.feature3')}
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
                        {t('pages.howItWorks.forBuyers.steps.step2.title')}
                      </h3>
                      <Search className="h-5 w-5 text-blue-600" />
                    </div>
                    <p className="text-muted-foreground mb-3">
                      {t('pages.howItWorks.forBuyers.steps.step2.description')}
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {t('pages.howItWorks.forBuyers.steps.step2.feature1')}
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {t('pages.howItWorks.forBuyers.steps.step2.feature2')}
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {t('pages.howItWorks.forBuyers.steps.step2.feature3')}
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
                        {t('pages.howItWorks.forBuyers.steps.step3.title')}
                      </h3>
                      <MessageSquare className="h-5 w-5 text-blue-600" />
                    </div>
                    <p className="text-muted-foreground mb-3">
                      {t('pages.howItWorks.forBuyers.steps.step3.description')}
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {t('pages.howItWorks.forBuyers.steps.step3.feature1')}
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {t('pages.howItWorks.forBuyers.steps.step3.feature2')}
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {t('pages.howItWorks.forBuyers.steps.step3.feature3')}
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
                        {t('pages.howItWorks.forBuyers.steps.step4.title')}
                      </h3>
                      <Package className="h-5 w-5 text-blue-600" />
                    </div>
                    <p className="text-muted-foreground mb-3">
                      {t('pages.howItWorks.forBuyers.steps.step4.description')}
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {t('pages.howItWorks.forBuyers.steps.step4.feature1')}
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {t('pages.howItWorks.forBuyers.steps.step4.feature2')}
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {t('pages.howItWorks.forBuyers.steps.step4.feature3')}
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
                        {t('pages.howItWorks.forBuyers.steps.step5.title')}
                      </h3>
                      <Truck className="h-5 w-5 text-blue-600" />
                    </div>
                    <p className="text-muted-foreground mb-3">
                      {t('pages.howItWorks.forBuyers.steps.step5.description')}
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {t('pages.howItWorks.forBuyers.steps.step5.feature1')}
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {t('pages.howItWorks.forBuyers.steps.step5.feature2')}
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {t('pages.howItWorks.forBuyers.steps.step5.feature3')}
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
                        {t('pages.howItWorks.forBuyers.steps.step6.title')}
                      </h3>
                      <Star className="h-5 w-5 text-blue-600" />
                    </div>
                    <p className="text-muted-foreground mb-3">
                      {t('pages.howItWorks.forBuyers.steps.step6.description')}
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {t('pages.howItWorks.forBuyers.steps.step6.feature1')}
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {t('pages.howItWorks.forBuyers.steps.step6.feature2')}
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {t('pages.howItWorks.forBuyers.steps.step6.feature3')}
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
            <h2 className="text-3xl font-bold mb-4">{t('pages.howItWorks.forSellers.title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('pages.howItWorks.forSellers.subtitle')}
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
                        {t('pages.howItWorks.forSellers.steps.step1.title')}
                      </h3>
                      <Users className="h-5 w-5 text-green-600" />
                    </div>
                    <p className="text-muted-foreground mb-3">
                      {t('pages.howItWorks.forSellers.steps.step1.description')}
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {t('pages.howItWorks.forSellers.steps.step1.feature1')}
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {t('pages.howItWorks.forSellers.steps.step1.feature2')}
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {t('pages.howItWorks.forSellers.steps.step1.feature3')}
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
                        {t('pages.howItWorks.forSellers.steps.step2.title')}
                      </h3>
                      <Package className="h-5 w-5 text-green-600" />
                    </div>
                    <p className="text-muted-foreground mb-3">
                      {t('pages.howItWorks.forSellers.steps.step2.description')}
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {t('pages.howItWorks.forSellers.steps.step2.feature1')}
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {t('pages.howItWorks.forSellers.steps.step2.feature2')}
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {t('pages.howItWorks.forSellers.steps.step2.feature3')}
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
                        {t('pages.howItWorks.forSellers.steps.step3.title')}
                      </h3>
                      <MessageSquare className="h-5 w-5 text-green-600" />
                    </div>
                    <p className="text-muted-foreground mb-3">
                      {t('pages.howItWorks.forSellers.steps.step3.description')}
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {t('pages.howItWorks.forSellers.steps.step3.feature1')}
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {t('pages.howItWorks.forSellers.steps.step3.feature2')}
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {t('pages.howItWorks.forSellers.steps.step3.feature3')}
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
                        {t('pages.howItWorks.forSellers.steps.step4.title')}
                      </h3>
                      <CreditCard className="h-5 w-5 text-green-600" />
                    </div>
                    <p className="text-muted-foreground mb-3">
                      {t('pages.howItWorks.forSellers.steps.step4.description')}
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {t('pages.howItWorks.forSellers.steps.step4.feature1')}
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {t('pages.howItWorks.forSellers.steps.step4.feature2')}
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {t('pages.howItWorks.forSellers.steps.step4.feature3')}
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
                        {t('pages.howItWorks.forSellers.steps.step5.title')}
                      </h3>
                      <Truck className="h-5 w-5 text-green-600" />
                    </div>
                    <p className="text-muted-foreground mb-3">
                      {t('pages.howItWorks.forSellers.steps.step5.description')}
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {t('pages.howItWorks.forSellers.steps.step5.feature1')}
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {t('pages.howItWorks.forSellers.steps.step5.feature2')}
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {t('pages.howItWorks.forSellers.steps.step5.feature3')}
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
                        {t('pages.howItWorks.forSellers.steps.step6.title')}
                      </h3>
                      <Star className="h-5 w-5 text-green-600" />
                    </div>
                    <p className="text-muted-foreground mb-3">
                      {t('pages.howItWorks.forSellers.steps.step6.description')}
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {t('pages.howItWorks.forSellers.steps.step6.feature1')}
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {t('pages.howItWorks.forSellers.steps.step6.feature2')}
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {t('pages.howItWorks.forSellers.steps.step6.feature3')}
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
            <h2 className="text-3xl font-bold mb-4">{t('pages.howItWorks.faq.title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('pages.howItWorks.faq.subtitle')}
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
                      {t('pages.howItWorks.faq.questions.q1.question')}
                    </h3>
                    <p className="text-muted-foreground">
                      {t('pages.howItWorks.faq.questions.q1.answer')}
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
                      {t('pages.howItWorks.faq.questions.q2.question')}
                    </h3>
                    <p className="text-muted-foreground">
                      {t('pages.howItWorks.faq.questions.q2.answer')}
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
                      {t('pages.howItWorks.faq.questions.q3.question')}
                    </h3>
                    <p className="text-muted-foreground">
                      {t('pages.howItWorks.faq.questions.q3.answer')}
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
                      {t('pages.howItWorks.faq.questions.q4.question')}
                    </h3>
                    <p className="text-muted-foreground">
                      {t('pages.howItWorks.faq.questions.q4.answer')}
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
                      {t('pages.howItWorks.faq.questions.q5.question')}
                    </h3>
                    <p className="text-muted-foreground">
                      {t('pages.howItWorks.faq.questions.q5.answer')}
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
                      {t('pages.howItWorks.faq.questions.q6.question')}
                    </h3>
                    <p className="text-muted-foreground">
                      {t('pages.howItWorks.faq.questions.q6.answer')}
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
                      {t('pages.howItWorks.faq.questions.q7.question')}
                    </h3>
                    <p className="text-muted-foreground">
                      {t('pages.howItWorks.faq.questions.q7.answer')}
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
                      {t('pages.howItWorks.faq.questions.q8.question')}
                    </h3>
                    <p className="text-muted-foreground">
                      {t('pages.howItWorks.faq.questions.q8.answer')}
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
            <h2 className="text-3xl font-bold mb-4">{t('pages.howItWorks.security.title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('pages.howItWorks.security.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <Lock className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="font-semibold mb-2">{t('pages.howItWorks.security.features.securePayments.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('pages.howItWorks.security.features.securePayments.description')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Shield className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="font-semibold mb-2">{t('pages.howItWorks.security.features.escrowProtection.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('pages.howItWorks.security.features.escrowProtection.description')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Users className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="font-semibold mb-2">{t('pages.howItWorks.security.features.verifiedUsers.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('pages.howItWorks.security.features.verifiedUsers.description')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Star className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="font-semibold mb-2">{t('pages.howItWorks.security.features.transparentReviews.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('pages.howItWorks.security.features.transparentReviews.description')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <MessageSquare className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="font-semibold mb-2">{t('pages.howItWorks.security.features.directCommunication.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('pages.howItWorks.security.features.directCommunication.description')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <CreditCard className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="font-semibold mb-2">{t('pages.howItWorks.security.features.buyerProtection.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('pages.howItWorks.security.features.buyerProtection.description')}
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
              <h2 className="text-3xl font-bold mb-4">{t('pages.howItWorks.cta.title')}</h2>
              <p className="text-blue-100 mb-8">
                {t('pages.howItWorks.cta.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/register">
                    {t('pages.howItWorks.cta.createAccount')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/products">{t('pages.howItWorks.cta.browseProducts')}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
