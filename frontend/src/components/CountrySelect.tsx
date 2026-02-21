'use client';

import * as React from 'react';
import { Check, ChevronsUpDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { getSortedCountries, type Country } from '@/utils/countries';

interface CountrySelectProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  language?: 'en' | 'uk';
  disabled?: boolean;
  className?: string;
}

export function CountrySelect({
  value,
  onValueChange,
  placeholder = 'Select country...',
  searchPlaceholder = 'Search country...',
  emptyMessage = 'No country found.',
  language = 'en',
  disabled = false,
  className,
}: CountrySelectProps) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const countries = React.useMemo(() => getSortedCountries(language), [language]);

  const getCountryName = (country: Country) => {
    return language === 'uk' ? country.uk : country.en;
  };

  const selectedCountry = React.useMemo(() => {
    return countries.find((country) => country.en === value);
  }, [countries, value]);

  const filteredCountries = React.useMemo(() => {
    if (!searchQuery) return countries;

    const query = searchQuery.toLowerCase();
    return countries.filter((country) => {
      const name = getCountryName(country).toLowerCase();
      const englishName = country.en.toLowerCase();
      return name.includes(query) || englishName.includes(query);
    });
  }, [countries, searchQuery, language]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            'w-full justify-between font-normal',
            !value && 'text-muted-foreground',
            className
          )}
        >
          {selectedCountry ? getCountryName(selectedCountry) : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command shouldFilter={false}>
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <input
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup className="max-h-[300px] overflow-auto">
              {filteredCountries.map((country) => (
                <CommandItem
                  key={country.code}
                  value={country.en}
                  onSelect={() => {
                    onValueChange(country.en);
                    setOpen(false);
                    setSearchQuery('');
                  }}
                  className="cursor-pointer"
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === country.en ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {getCountryName(country)}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
