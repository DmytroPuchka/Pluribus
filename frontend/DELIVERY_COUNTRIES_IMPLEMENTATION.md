# Delivery Countries Feature - Implementation Documentation

## Overview
This feature allows sellers to specify which countries they can deliver to, and buyers can filter products based on delivery availability to their desired destination.

## Implementation Date
February 15, 2026

## Features Implemented

### 1. Seller Delivery Countries Management
- **Location**: User profile / Seller settings
- **Functionality**: Sellers can specify a list of countries where they offer delivery
- **Data Structure**: Array of country names stored in `User.deliveryCountries`

### 2. Delivery Countries Display
- **Seller Profile Page**: Shows delivery countries in a dedicated section with globe icon
- **Product Details Page**: Displays seller's delivery countries in the seller information card
- **Visual Design**: Countries displayed as badges/chips with primary color styling

### 3. Product Filters Enhancement
- **New Filter**: "Delivery Country" filter added to product search
- **Functionality**: Buyers can filter products by selecting their destination country
- **Logic**: Shows only products from sellers who can deliver to the selected country
- **Distinction**: Separate from "Seller Country" filter (seller's location)

## Technical Implementation

### 1. Type Definitions
**File**: `/src/types/index.ts`

```typescript
export interface User {
  // ... existing fields
  deliveryCountries?: string[]; // List of country codes where seller can deliver
  // ... other fields
}

export interface ProductFiltersState {
  // ... existing filters
  country?: string; // Seller's country
  deliveryCountry?: string; // Country where buyer wants delivery
  // ... other filters
}
```

### 2. Mock Data Updates
**Files Updated**:
- `/src/app/sellers/[id]/page.tsx` - getMockSeller function
- `/src/app/products/[id]/page.tsx` - getMockProducts function

**Example Data**:
```typescript
{
  id: 'seller-1',
  name: 'John Smith',
  country: 'United States',
  city: 'New York',
  deliveryCountries: [
    'United States',
    'Canada',
    'Mexico',
    'United Kingdom',
    'Germany',
    'France'
  ],
  // ... other fields
}
```

### 3. UI Components

#### Seller Profile Page
**File**: `/src/app/sellers/[id]/page.tsx`

**Location**: Between "About" section and "Products" section

**Features**:
- Globe icon header
- Title and subtitle with translation support
- Countries displayed as rounded badges
- Responsive grid layout

**Translation Keys**:
- `pages.sellerProfile.deliveryCountries.title`
- `pages.sellerProfile.deliveryCountries.subtitle`

#### Product Details Page
**File**: `/src/app/products/[id]/page.tsx`

**Location**: In seller information card, after verification badges

**Features**:
- Collapsible section with border-top
- Globe icon + section title
- Countries as compact badges
- Conditional rendering (only if deliveryCountries exist)

**Translation Keys**:
- `pages.productDetail.seller.deliveryCountries`

#### Product Filters Component
**File**: `/src/components/features/ProductFilters/index.tsx`

**New Features**:
1. **Delivery Country Select**:
   - Dropdown with all available delivery countries
   - Positioned after "Seller Country" filter
   - "All Delivery Countries" default option

2. **Filter Logic**:
   ```typescript
   // Filter by delivery country
   if (filters.deliveryCountry) {
     filtered = filtered.filter(p =>
       p.seller?.deliveryCountries?.includes(filters.deliveryCountry!)
     );
   }
   ```

3. **Active Filter Badge**:
   - Shows selected delivery country in active filters
   - Removable with X button
   - Format: "Delivers To: [Country]"

**Translation Keys**:
- `pages.products.filters.deliveryCountry`
- `pages.products.filters.allDeliveryCountries`
- `pages.products.filters.badges.deliveryCountry`

### 4. Translations

#### English (`messages/en.json`)
```json
{
  "pages": {
    "sellerProfile": {
      "deliveryCountries": {
        "title": "Delivery Countries",
        "subtitle": "This seller can deliver to the following countries"
      }
    },
    "productDetail": {
      "seller": {
        "deliveryCountries": "Delivery Countries"
      }
    },
    "products": {
      "filters": {
        "country": "Seller Country",
        "deliveryCountry": "Delivery Country",
        "allDeliveryCountries": "All Delivery Countries",
        "badges": {
          "country": "Seller Country:",
          "deliveryCountry": "Delivers To:"
        }
      }
    }
  }
}
```

#### Ukrainian (`messages/uk.json`)
```json
{
  "pages": {
    "sellerProfile": {
      "deliveryCountries": {
        "title": "Країни доставки",
        "subtitle": "Цей продавець може здійснювати доставку до наступних країн"
      }
    },
    "productDetail": {
      "seller": {
        "deliveryCountries": "Країни доставки"
      }
    },
    "products": {
      "filters": {
        "country": "Країна продавця",
        "deliveryCountry": "Країна доставки",
        "allDeliveryCountries": "Всі країни доставки",
        "badges": {
          "country": "Країна продавця:",
          "deliveryCountry": "Доставка до:"
        }
      }
    }
  }
}
```

## User Flows

### For Sellers
1. Navigate to profile settings
2. Add/edit delivery countries list
3. Save changes
4. Delivery countries appear on:
   - Seller profile page
   - All product detail pages for their products

### For Buyers
1. Navigate to products page
2. Open filters panel
3. Select "Delivery Country" filter
4. Choose desired destination country
5. View filtered results showing only:
   - Products from sellers who deliver to selected country
6. View delivery countries on:
   - Seller profile when clicking on seller
   - Product detail page in seller info section

## Filter Logic Details

### Seller Country vs Delivery Country

**Seller Country**:
- Filter by seller's physical location
- Field: `seller.country`
- Use case: "I want to buy from sellers in Spain"

**Delivery Country**:
- Filter by delivery capability
- Field: `seller.deliveryCountries` (array)
- Use case: "I want products that can be delivered to Ukraine"

### Combined Filtering Example
```typescript
// User selects both filters:
// - Seller Country: "Spain"
// - Delivery Country: "Ukraine"

// Result: Shows products from sellers in Spain who deliver to Ukraine
filtered = products.filter(p =>
  p.seller?.country === "Spain" &&
  p.seller?.deliveryCountries?.includes("Ukraine")
);
```

## Helper Functions

### Get Delivery Countries from Products
```typescript
const getDeliveryCountriesFromProducts = (products: Product[]): string[] => {
  const countries = new Set<string>();
  products.forEach(product => {
    if (product.seller?.deliveryCountries) {
      product.seller.deliveryCountries.forEach(country =>
        countries.add(country)
      );
    }
  });
  return Array.from(countries).sort();
};
```

## Styling Conventions

### Delivery Countries Display
- **Container**: Card with proper spacing
- **Header**: Globe icon + title (primary color)
- **Countries**:
  - `px-3 py-1.5` padding
  - `rounded-full` shape
  - `bg-primary/10 text-primary` colors
  - `text-sm font-medium` typography

### Filter Section
- **Select**: Standard select trigger/content
- **Badge**:
  - `gap-1` for icon spacing
  - `cursor-pointer hover:bg-secondary/80` for interactivity
  - Remove icon with X from lucide-react

## API Integration (Future)

### Endpoints to Implement

```typescript
// Update user delivery countries
PUT /api/users/me/delivery-countries
Body: { deliveryCountries: string[] }
Response: { success: boolean, user: User }

// Get products with delivery filter
GET /api/products?deliveryCountry=Ukraine
Response: { products: Product[], pagination: {...} }
```

### Database Schema Addition

```sql
-- Add delivery_countries column to users table
ALTER TABLE users
ADD COLUMN delivery_countries TEXT[] DEFAULT '{}';

-- Create index for faster filtering
CREATE INDEX idx_users_delivery_countries
ON users USING GIN(delivery_countries);
```

## Testing Checklist

### Visual Testing
- [ ] Delivery countries display correctly on seller profile
- [ ] Delivery countries display correctly on product details
- [ ] Badges are properly styled and readable
- [ ] Globe icon appears correctly
- [ ] Responsive layout works on mobile

### Functionality Testing
- [ ] Delivery country filter appears in filter panel
- [ ] Selecting a delivery country filters products correctly
- [ ] "All Delivery Countries" resets the filter
- [ ] Active filter badge appears and is removable
- [ ] Combined with seller country filter works correctly
- [ ] No delivery countries: section is hidden

### Translation Testing
- [ ] English translations display correctly
- [ ] Ukrainian translations display correctly
- [ ] Language switching works properly

### Data Testing
- [ ] Empty delivery countries array: no display
- [ ] Single country: displays correctly
- [ ] Multiple countries: all display correctly
- [ ] Very long country names: handle gracefully

## Performance Considerations

1. **Filtering Performance**:
   - Array.includes() is O(n) - acceptable for small country lists
   - For large datasets, consider indexed database queries

2. **Rendering Performance**:
   - Country badges render conditionally
   - No unnecessary re-renders with proper React keys

3. **Data Loading**:
   - Delivery countries loaded with user data
   - No additional API calls needed

## Future Enhancements

### Priority 1 (Short-term)
1. **Country Code Support**: Use ISO country codes instead of full names
2. **Seller Settings Page**: Allow sellers to manage delivery countries
3. **Validation**: Ensure country names are valid

### Priority 2 (Medium-term)
1. **Delivery Cost Information**: Show estimated shipping costs per country
2. **Delivery Time Estimates**: Display expected delivery timeframes
3. **Regional Grouping**: Group countries by region (EU, Asia, etc.)

### Priority 3 (Long-term)
1. **Smart Suggestions**: Suggest popular delivery countries
2. **Shipping Partners**: Integration with shipping providers
3. **Delivery Restrictions**: Handle restricted items per country
4. **Multi-language Country Names**: Translate country names

## Related Documentation

- [Product Filters Implementation](./PRODUCT_FILTERS_IMPLEMENTATION.md)
- [Custom Orders Implementation](./CUSTOM_ORDER_FORM_IMPLEMENTATION.md)
- [Project Summary](../Documentation/SUMMARY.md)

## Support

For questions or issues related to delivery countries feature:
1. Check mock data in seller and product pages
2. Verify translation keys in en.json and uk.json
3. Review filter logic in ProductFilters component
4. Check User type definition in types/index.ts

---

**Implementation Status**: ✅ Complete
**Last Updated**: February 15, 2026
**Version**: 1.0.0
