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
import { Menu, X, User, LogOut, LayoutDashboard, ShoppingBag, UserCircle } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { SearchBar } from '@/components/common/SearchBar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useTranslations } from '@/contexts/TranslationsContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

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
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    router.push('/');
  };

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
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        {user.role}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    {t('header.nav.dashboard')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile" className="flex items-center gap-2">
                    <UserCircle className="h-4 w-4" />
                    {t('header.user.profile')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/orders" className="flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4" />
                    {t('header.user.orders')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-red-600 focus:text-red-600">
                  <LogOut className="h-4 w-4" />
                  {t('header.user.logout')}
                </DropdownMenuItem>
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
              {isAuthenticated && user ? (
                <>
                  <div className="px-2 py-3 text-sm">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                    <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                      {user.role}
                    </span>
                  </div>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/dashboard">{t('header.nav.dashboard')}</Link>
                  </Button>
                  <Button variant="ghost" className="w-full text-red-600" onClick={handleLogout}>
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
