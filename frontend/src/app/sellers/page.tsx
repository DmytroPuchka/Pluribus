/**
 * Sellers Page
 * Browse and filter sellers from around the world
 *
 * Route: /sellers
 */

'use client';

import { useState, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Search, MapPin, Star, Filter, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { SellerCard } from '@/components/features/SellerCard';
import { Pagination } from '@/components/common/Pagination';
import { User, SellerLocation } from '@/types';
import { cn } from '@/lib/utils';
import { useTranslations } from '@/contexts/TranslationsContext';

// Dynamic import for InteractiveSellerMap to avoid SSR issues with Leaflet
const InteractiveSellerMap = dynamic(
  () => import('@/components/features/InteractiveSellerMap').then(mod => mod.InteractiveSellerMap),
  {
    ssr: false,
    loading: () => (
      <Card className="overflow-hidden">
        <div className="h-[500px] w-full flex items-center justify-center bg-muted">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-3 animate-pulse" />
            <p className="text-muted-foreground">Loading map...</p>
          </div>
        </div>
      </Card>
    ),
  }
);

// Mock data for development
// TODO: Replace with actual API call
const getMockSellers = (): (User & { productCount: number })[] => {
  return [
    {
      id: 'seller-1',
      name: 'John Smith',
      email: 'john@example.com',
      role: 'SELLER',
      country: 'United States',
      city: 'New York',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      rating: 4.8,
      reviewCount: 125,
      emailVerified: true,
      phoneVerified: true,
      idVerified: true,
      isActive: true,
      createdAt: new Date('2022-01-15'),
      updatedAt: new Date(),
      productCount: 24,
    },
    {
      id: 'seller-2',
      name: 'Maria Garcia',
      email: 'maria@example.com',
      role: 'SELLER',
      country: 'Spain',
      city: 'Barcelona',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      rating: 4.9,
      reviewCount: 89,
      emailVerified: true,
      phoneVerified: true,
      idVerified: true,
      isActive: true,
      createdAt: new Date('2021-06-20'),
      updatedAt: new Date(),
      productCount: 18,
    },
    {
      id: 'seller-3',
      name: 'Yuki Tanaka',
      email: 'yuki@example.com',
      role: 'SELLER',
      country: 'Japan',
      city: 'Tokyo',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      rating: 5.0,
      reviewCount: 234,
      emailVerified: true,
      phoneVerified: true,
      idVerified: true,
      isActive: true,
      createdAt: new Date('2020-03-10'),
      updatedAt: new Date(),
      productCount: 42,
    },
    {
      id: 'seller-4',
      name: 'Anna Müller',
      email: 'anna@example.com',
      role: 'SELLER',
      country: 'Germany',
      city: 'Berlin',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      rating: 4.7,
      reviewCount: 156,
      emailVerified: true,
      phoneVerified: false,
      idVerified: true,
      isActive: true,
      createdAt: new Date('2021-11-05'),
      updatedAt: new Date(),
      productCount: 31,
    },
    {
      id: 'seller-5',
      name: 'Carlos Rodriguez',
      email: 'carlos@example.com',
      role: 'SELLER',
      country: 'Mexico',
      city: 'Mexico City',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      rating: 4.6,
      reviewCount: 92,
      emailVerified: true,
      phoneVerified: true,
      idVerified: false,
      isActive: true,
      createdAt: new Date('2022-05-12'),
      updatedAt: new Date(),
      productCount: 15,
    },
    {
      id: 'seller-6',
      name: 'Sophie Laurent',
      email: 'sophie@example.com',
      role: 'SELLER',
      country: 'France',
      city: 'Paris',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      rating: 4.9,
      reviewCount: 178,
      emailVerified: true,
      phoneVerified: true,
      idVerified: true,
      isActive: true,
      createdAt: new Date('2021-02-28'),
      updatedAt: new Date(),
      productCount: 28,
    },
  ];
};

// Get unique countries from sellers
const getCountries = (sellers: User[]): string[] => {
  const countries = sellers.map(s => s.country);
  return Array.from(new Set(countries)).sort();
};

// City coordinates map
const cityCoordinates: Record<string, { lat: number; lng: number }> = {
  'New York': { lat: 40.7128, lng: -74.0060 },
  'Barcelona': { lat: 41.3874, lng: 2.1686 },
  'Tokyo': { lat: 35.6762, lng: 139.6503 },
  'Berlin': { lat: 52.5200, lng: 13.4050 },
  'Mexico City': { lat: 19.4326, lng: -99.1332 },
  'Paris': { lat: 48.8566, lng: 2.3522 },
};

// Convert sellers to SellerLocation format
const getSellerLocations = (sellers: (User & { productCount: number })[]): SellerLocation[] => {
  return sellers.map(seller => {
    const coords = cityCoordinates[seller.city] || { lat: 0, lng: 0 };
    return {
      sellerId: seller.id,
      seller: seller,
      productCount: seller.productCount,
      lat: coords.lat,
      lng: coords.lng,
    };
  });
};

export default function SellersPage() {
  const { t } = useTranslations();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [minRating, setMinRating] = useState<number>(0);
  const [showFilters, setShowFilters] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9); // 3x3 grid

  const sellers = getMockSellers();
  const countries = getCountries(sellers);

  // Filter sellers based on search and filters
  const filteredSellers = useMemo(() => {
    return sellers.filter(seller => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          seller.name.toLowerCase().includes(query) ||
          seller.city.toLowerCase().includes(query) ||
          seller.country.toLowerCase().includes(query);

        if (!matchesSearch) return false;
      }

      // Country filter
      if (selectedCountry && seller.country !== selectedCountry) {
        return false;
      }

      // Rating filter
      if (minRating > 0 && (seller.rating || 0) < minRating) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCountry, minRating]);

  // Convert filtered sellers to map locations
  const sellerLocations = useMemo(() => {
    return getSellerLocations(filteredSellers);
  }, [filteredSellers]);

  // Calculate pagination
  const totalItems = filteredSellers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSellers = filteredSellers.slice(startIndex, endIndex);

  // Reset page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredSellers]);

  const hasActiveFilters = searchQuery || selectedCountry || minRating > 0;

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCountry('');
    setMinRating(0);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-12 md:py-16">
        <div className="container px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {t('pages.sellers.title')}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              {t('pages.sellers.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Seller Map */}
      <section className="py-8 md:py-12 border-b bg-muted/30">
        <div className="container px-4">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">{t('pages.sellers.map.title')}</h2>
            <p className="text-muted-foreground">
              {t('pages.sellers.map.description')}
            </p>
          </div>
          <InteractiveSellerMap
            sellers={sellerLocations}
            height="500px"
          />
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 border-b">
        <div className="container px-4">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t('pages.sellers.search.placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11"
              />
            </div>
          </div>

          {/* Filter Toggle Button */}
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <Filter className="h-4 w-4" />
              {t('pages.sellers.filters.button')}
              {hasActiveFilters && (
                <Badge variant="secondary" className="ml-2">
                  {[searchQuery, selectedCountry, minRating > 0].filter(Boolean).length}
                </Badge>
              )}
            </Button>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="gap-2 text-muted-foreground"
              >
                <X className="h-4 w-4" />
                {t('pages.sellers.filters.clear')}
              </Button>
            )}
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <Card className="bg-muted/50 border-none">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Country Filter */}
                  <div>
                    <label className="text-sm font-semibold mb-3 block">{t('pages.sellers.filters.country')}</label>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      <Button
                        variant={selectedCountry === '' ? 'default' : 'outline'}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => setSelectedCountry('')}
                      >
                        {t('pages.sellers.filters.allCountries')}
                      </Button>
                      {countries.map(country => (
                        <Button
                          key={country}
                          variant={selectedCountry === country ? 'default' : 'outline'}
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => setSelectedCountry(country)}
                        >
                          {country}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Rating Filter */}
                  <div>
                    <label className="text-sm font-semibold mb-3 block">{t('pages.sellers.filters.minRating')}</label>
                    <div className="space-y-2">
                      {[0, 4, 4.5, 4.8, 5].map(rating => (
                        <Button
                          key={rating}
                          variant={minRating === rating ? 'default' : 'outline'}
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => setMinRating(rating)}
                        >
                          <Star className="h-4 w-4 mr-2 fill-current" />
                          {rating === 0 ? t('pages.sellers.filters.anyRating') : `${rating}+ ${t('pages.sellers.filters.stars')}`}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Active Filters Summary */}
                  <div>
                    <label className="text-sm font-semibold mb-3 block">{t('pages.sellers.filters.active')}</label>
                    <div className="space-y-2">
                      {searchQuery && (
                        <Badge variant="secondary" className="w-full justify-start">
                          {t('pages.sellers.filters.searchLabel')}: {searchQuery}
                        </Badge>
                      )}
                      {selectedCountry && (
                        <Badge variant="secondary" className="w-full justify-start">
                          {t('pages.sellers.filters.country')}: {selectedCountry}
                        </Badge>
                      )}
                      {minRating > 0 && (
                        <Badge variant="secondary" className="w-full justify-start">
                          {t('pages.sellers.filters.ratingLabel')}: {minRating}+
                        </Badge>
                      )}
                      {!hasActiveFilters && (
                        <p className="text-sm text-muted-foreground">{t('pages.sellers.filters.noFilters')}</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12 md:py-16">
        <div className="container px-4">
          {/* Results Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">
              {filteredSellers.length} {filteredSellers.length === 1 ? t('pages.sellers.results.seller') : t('pages.sellers.results.sellers')} {t('pages.sellers.results.found')}
            </h2>
            {hasActiveFilters && (
              <p className="text-muted-foreground">
                {t('pages.sellers.results.filtered')}
              </p>
            )}
            {filteredSellers.length > 0 && (
              <p className="text-sm text-muted-foreground mt-2">
                {t('pages.sellers.results.showing')} {startIndex + 1}-{Math.min(endIndex, totalItems)} {t('pages.sellers.results.of')} {totalItems} {t('pages.sellers.results.sellers')}
              </p>
            )}
          </div>

          {/* Empty State */}
          {filteredSellers.length === 0 ? (
            <Card className="py-12">
              <CardContent className="text-center">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">{t('pages.sellers.empty.title')}</h3>
                <p className="text-muted-foreground mb-6">
                  {t('pages.sellers.empty.description')}
                </p>
                {hasActiveFilters && (
                  <Button onClick={handleClearFilters} variant="outline">
                    {t('pages.sellers.filters.clear')}
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Sellers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentSellers.map(seller => (
                  <SellerCard key={seller.id} seller={seller} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    itemsPerPage={itemsPerPage}
                    totalItems={totalItems}
                    onPageChange={handlePageChange}
                    onItemsPerPageChange={handleItemsPerPageChange}
                    showItemsPerPageSelector={true}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-muted/50">
        <div className="container px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {sellers.length}+
              </div>
              <p className="text-muted-foreground">{t('pages.sellers.stats.verifiedSellers')}</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {countries.length}
              </div>
              <p className="text-muted-foreground">{t('pages.sellers.stats.countries')}</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {sellers.reduce((sum, s) => sum + (s.rating || 0), 0).toFixed(1)}
              </div>
              <p className="text-muted-foreground">{t('pages.sellers.stats.avgRating')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
