/**
 * Footer Component
 * Site footer with links and information
 *
 * @component
 */

'use client';

import Link from 'next/link';
import { FC } from 'react';
import { Logo } from '@/components/common/Logo';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations } from '@/contexts/TranslationsContext';

interface FooterProps {
  className?: string;
}

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
];

export const Footer: FC<FooterProps> = ({ className }) => {
  const { t } = useTranslations();

  const footerLinks = {
    product: [
      { name: t('footer.product.howItWorks'), href: '/how-it-works' },
      { name: t('footer.product.products'), href: '/products' },
      { name: t('footer.product.sellers'), href: '/sellers' },
      { name: t('footer.product.pricing'), href: '/pricing' },
    ],
    company: [
      { name: t('footer.company.about'), href: '/about' },
      { name: t('footer.company.blog'), href: '/blog' },
      { name: t('footer.company.careers'), href: '/careers' },
      { name: t('footer.company.contact'), href: '/contact' },
    ],
    support: [
      { name: t('footer.support.helpCenter'), href: '/help' },
      { name: t('footer.support.safety'), href: '/safety' },
      { name: t('footer.support.terms'), href: '/terms' },
      { name: t('footer.support.privacy'), href: '/privacy' },
    ],
  };
  return (
    <footer className={cn('border-t bg-muted/50', className)}>
      <div className="container px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Logo size="md" href="/" />
            <p className="mt-4 text-sm text-muted-foreground">
              {t('footer.description')}
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.product.title')}</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.company.title')}</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.support.title')}</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Pluribus. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = 'Footer';

export default Footer;
