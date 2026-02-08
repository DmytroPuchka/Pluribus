/**
 * SearchBar Integration Examples
 * Real-world integration scenarios for the SearchBar component
 */

import { useState, useCallback } from 'react';
import SearchBar from './index';

/**
 * Integration 1: E-commerce Product Search
 * Demonstrates product search with filters, sorting, and recent searches
 */
export function ProductSearchIntegration() {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: [0, 1000],
    inStock: true,
  });

  // Simulated API search
  const handleSearch = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      try {
        setLoading(true);

        // Simulated API call
        const response = await fetch(
          `/api/products/search?q=${encodeURIComponent(query)}&category=${filters.category}`
        );

        if (!response.ok) {
          throw new Error('Search failed');
        }

        const data = await response.json();
        setResults(data.results || []);

        // Store in recent searches
        const updated = [query, ...recentSearches.filter((q) => q !== query)].slice(0, 5);
        setRecentSearches(updated);

        // Save to localStorage
        localStorage.setItem('productSearches', JSON.stringify(updated));
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    },
    [filters.category, recentSearches]
  );

  return null; // Component implementation
}

/**
 * Integration 2: Seller Search
 * Demonstrates searching sellers with ratings and verification badges
 */
export function SellerSearchIntegration() {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [sort, setSort] = useState('rating');

  const handleSearch = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      try {
        setLoading(true);

        const response = await fetch(
          `/api/sellers/search?q=${encodeURIComponent(query)}&sort=${sort}`
        );

        if (!response.ok) {
          throw new Error('Search failed');
        }

        const data = await response.json();
        setResults(data.results || []);

        // Store in recent searches
        const updated = [query, ...recentSearches.filter((q) => q !== query)].slice(0, 5);
        setRecentSearches(updated);

        // Save to localStorage
        localStorage.setItem('sellerSearches', JSON.stringify(updated));
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    },
    [sort, recentSearches]
  );

  return null; // Component implementation
}

/**
 * Integration 3: Advanced Search with Multiple Filters
 * Demonstrates complex search with category, price, and rating filters
 */
export function AdvancedSearchIntegration() {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [activeFilters, setActiveFilters] = useState({
    category: [],
    priceMin: 0,
    priceMax: 1000,
    rating: 3,
    inStock: true,
  });

  const handleSearch = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      try {
        setLoading(true);

        const params = new URLSearchParams({
          q: query,
          ...(activeFilters.category.length && {
            categories: activeFilters.category.join(','),
          }),
          ...(activeFilters.priceMin && { priceMin: activeFilters.priceMin.toString() }),
          ...(activeFilters.priceMax && { priceMax: activeFilters.priceMax.toString() }),
          ...(activeFilters.rating && { minRating: activeFilters.rating.toString() }),
          ...(activeFilters.inStock && { inStock: 'true' }),
        });

        const response = await fetch(`/api/search/advanced?${params}`);

        if (!response.ok) {
          throw new Error('Search failed');
        }

        const data = await response.json();
        setResults(data.results || []);

        // Store in recent searches
        const updated = [query, ...recentSearches.filter((q) => q !== query)].slice(0, 5);
        setRecentSearches(updated);

        // Save to localStorage
        localStorage.setItem('advancedSearches', JSON.stringify(updated));
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    },
    [activeFilters, recentSearches]
  );

  return null; // Component implementation
}
