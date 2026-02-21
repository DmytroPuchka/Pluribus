import countriesData from '@/data/countries.json';

export type Country = {
  code: string;
  en: string;
  uk: string;
};

export const countries = countriesData.countries as Country[];

/**
 * Get localized country name
 * @param countryCodeOrName - Country code (e.g., "US") or English name (e.g., "United States")
 * @param language - Language code ("en" or "uk")
 * @returns Localized country name
 */
export function getCountryName(
  countryCodeOrName: string,
  language: 'en' | 'uk' = 'en'
): string {
  const country = countries.find(
    (c) => c.code === countryCodeOrName || c.en === countryCodeOrName
  );

  if (!country) {
    return countryCodeOrName;
  }

  return language === 'uk' ? country.uk : country.en;
}

/**
 * Get country by code or English name
 * @param countryCodeOrName - Country code or English name
 * @returns Country object or undefined
 */
export function getCountry(countryCodeOrName: string): Country | undefined {
  return countries.find(
    (c) => c.code === countryCodeOrName || c.en === countryCodeOrName
  );
}

/**
 * Get all countries sorted by localized name
 * @param language - Language code ("en" or "uk")
 * @returns Sorted array of countries
 */
export function getSortedCountries(language: 'en' | 'uk' = 'en'): Country[] {
  return [...countries].sort((a, b) => {
    const nameA = language === 'uk' ? a.uk : a.en;
    const nameB = language === 'uk' ? b.uk : b.en;
    return nameA.localeCompare(nameB, language);
  });
}
