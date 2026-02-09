/**
 * Header Component
 * Main navigation header with logo, menu, and user actions
 *
 * @component
 */

'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { Menu, X, User } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { SearchBar } from '@/components/common/SearchBar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useTranslations } from '@/contexts/TranslationsContext';

interface HeaderProps {
  className?: string;
}

const languages = [
  { code: 'uk' as const, flag: '🇺🇦', name: 'Українська' },
  { code: 'en' as const, flag: '🇬🇧', name: 'English' },
];

export const Header: FC<HeaderProps> = ({ className }) => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, language, setLanguage } = useTranslations();

  // TODO: Replace with actual auth state
  const isAuthenticated = false;

  const navigation = [
    { name: t('common.navigation.products'), href: '/products' },
    { name: t('common.navigation.sellers'), href: '/sellers' },
    { name: t('common.navigation.about'), href: '/about' },
    { name: t('common.navigation.howItWorks'), href: '/how-it-works' },
  ];

  const handleSearch = (query: string) => {
    router.push(`/products?search=${encodeURIComponent(query)}`);
  };

  return (
    <header className={cn('sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60', className)}>
      <nav className="container flex h-16 items-center justify-between px-4 gap-4">
        {/* Logo */}
        <Logo size="md" />

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-6 items-center">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Search Bar - Desktop Only */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <SearchBar
            placeholder={t('header.search.placeholder')}
            onSearch={handleSearch}
            showSearchButton={false}
            className="w-full"
          />
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hidden md:flex gap-2">
                <span className="text-lg">{languages.find(l => l.code === language)?.flag}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={cn(
                    language === lang.code && 'bg-accent',
                    'flex items-center gap-2'
                  )}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span>{lang.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Auth Actions */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">{t('header.nav.dashboard')}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">{t('header.user.profile')}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/orders">{t('header.user.orders')}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>{t('header.user.logout')}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link href="/login">{t('common.buttons.login')}</Link>
              </Button>
              <Button asChild>
                <Link href="/register">{t('common.buttons.signup')}</Link>
              </Button>
            </div>
          )}

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container px-4 py-4 space-y-4">
            {/* Mobile Search Bar */}
            <div className="pb-2">
              <SearchBar
                placeholder={t('header.search.placeholder')}
                onSearch={(query) => {
                  handleSearch(query);
                  setMobileMenuOpen(false);
                }}
                showSearchButton={false}
                className="w-full"
              />
            </div>

            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-base font-medium text-muted-foreground hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            <div className="pt-4 border-t space-y-2">
              {isAuthenticated ? (
                <>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/dashboard">{t('header.nav.dashboard')}</Link>
                  </Button>
                  <Button variant="ghost" className="w-full">
                    {t('header.user.logout')}
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/login">{t('common.buttons.login')}</Link>
                  </Button>
                  <Button className="w-full" asChild>
                    <Link href="/register">{t('common.buttons.signup')}</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

Header.displayName = 'Header';

export default Header;
