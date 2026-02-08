/**
 * SearchBar Usage Examples
 * Demonstrates various ways to use the SearchBar component
 */

'use client';

import { useState } from 'react';
import SearchBar from './index';

// Example 1: Basic Search Bar
export function BasicSearchBarExample() {
  const handleSearch = (query: string) => {
    console.log('Search:', query);
    // Implement your search logic here
  };

  return (
    <SearchBar
      placeholder="Search products..."
      onSearch={handleSearch}
    />
  );
}

// Example 2: Search Bar with Suggestions
export function SearchBarWithSuggestionsExample() {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([
    'iPhone 15 Pro',
    'iPhone 15',
    'iPhone 14 Pro',
    'Samsung Galaxy S24',
    'Google Pixel 8',
  ]);

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log('Search query:', query);
      // Implement your search API call here
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionSelect = (suggestion: string) => {
    console.log('Selected suggestion:', suggestion);
  };

  return (
    <SearchBar
      placeholder="Search products..."
      onSearch={handleSearch}
      loading={loading}
      suggestions={suggestions}
      onSuggestionSelect={handleSuggestionSelect}
      maxSuggestions={5}
    />
  );
}

// Example 3: Search Bar in Header
export function HeaderSearchBarExample() {
  const handleSearch = (query: string) => {
    console.log('Global search:', query);
    // Navigate to search results page
  };

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <h1>Pluribus</h1>
      <SearchBar
        placeholder="Search sellers, products..."
        onSearch={handleSearch}
        className="max-w-xs"
      />
    </div>
  );
}

// Example 4: Advanced Search Bar with Dynamic Suggestions
export function AdvancedSearchBarExample() {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      // Simulate fetching suggestions from API
      const mockSuggestions = [
        `${query} - Product 1`,
        `${query} - Product 2`,
        `${query} - Seller 1`,
        `${query} - Category`,
        `${query} - Brand`,
      ];
      setSuggestions(mockSuggestions);
      console.log('Searching for:', query);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SearchBar
      placeholder="What are you looking for?"
      onSearch={handleSearch}
      loading={loading}
      suggestions={suggestions}
      debounceDelay={400}
      maxSuggestions={5}
      className="max-w-lg"
    />
  );
}

// Example 5: Search Bar with Custom Handler
export function CustomHandlerSearchBarExample() {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      // Add to search history
      setSearchHistory((prev) => [query, ...prev.slice(0, 4)]);
      console.log('Search history:', [query, ...searchHistory.slice(0, 4)]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <SearchBar
        placeholder="Search..."
        onSearch={handleSearch}
        loading={loading}
        suggestions={searchHistory}
        showSearchButton={true}
      />
      {searchHistory.length > 0 && (
        <div>
          <p className="text-sm font-medium mb-2">Recent Searches</p>
          <div className="flex flex-wrap gap-2">
            {searchHistory.map((item) => (
              <button
                key={item}
                onClick={() => handleSearch(item)}
                className="px-3 py-1 rounded-full bg-accent text-sm hover:bg-accent/80"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
