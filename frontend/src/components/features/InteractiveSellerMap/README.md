# InteractiveSellerMap Component

An interactive map component that displays seller locations with clustering, custom markers, and detailed popups.

## Features

- **Interactive Map**: Built with Leaflet and OpenStreetMap
- **Marker Clustering**: Automatically groups nearby sellers for better performance and UX
- **Custom Markers**: Beautiful custom pin markers with emoji icons
- **Detailed Popups**: Shows seller info including avatar, rating, verification badges, and product count
- **Auto-fit Bounds**: Automatically adjusts view to show all sellers
- **Responsive**: Works on all screen sizes
- **Legend**: Visual guide for map elements
- **Seller Count Badge**: Shows total number of sellers displayed

## Usage

```tsx
import { InteractiveSellerMap } from '@/components/features/InteractiveSellerMap';
import { SellerLocation } from '@/types';

// Prepare seller locations with coordinates
const sellerLocations: SellerLocation[] = [
  {
    sellerId: 'seller-1',
    seller: {
      id: 'seller-1',
      name: 'John Smith',
      city: 'New York',
      country: 'United States',
      rating: 4.8,
      reviewCount: 125,
      emailVerified: true,
      phoneVerified: true,
      idVerified: true,
      // ... other User fields
    },
    productCount: 24,
    lat: 40.7128,
    lng: -74.0060,
  },
  // ... more sellers
];

// Render the map
<InteractiveSellerMap
  sellers={sellerLocations}
  height="600px"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sellers` | `SellerLocation[]` | **required** | Array of seller locations with coordinates |
| `center` | `[number, number]` | `[20, 0]` | Initial map center [lat, lng] |
| `zoom` | `number` | `2` | Initial zoom level |
| `height` | `string` | `'600px'` | Map container height |
| `className` | `string` | `''` | Additional CSS classes |

## Technologies

- **Leaflet**: Open-source JavaScript library for interactive maps
- **react-leaflet**: React components for Leaflet maps
- **react-leaflet-cluster**: Marker clustering for better performance
- **OpenStreetMap**: Free, editable map data

## Styling

The component includes custom CSS for:
- Cluster markers (small/medium/large sizes)
- Custom pin markers
- Popup styling
- Map controls
- Legend and badges

Styles are defined in `/src/styles/map.css` and automatically imported via the root layout.

## Map Features

### Marker Clustering
When multiple sellers are close together, they're automatically grouped into clusters. The cluster icon shows the number of sellers. Click to zoom in and expand the cluster.

### Seller Popup
Click any marker to open a popup with seller information:
- Seller avatar and name
- Location (city, country)
- Rating and review count
- Product count
- Verification badges (email, phone, ID)
- "View Profile" button (click to navigate to seller's page)

### Legend
Bottom-left legend explains:
- Single seller markers
- Clustered seller markers

### Auto-fit Bounds
The map automatically adjusts its view to show all sellers when the component loads or when the seller list changes.

## Performance

- **Clustering**: Handles hundreds of markers efficiently
- **Lazy Loading**: Tiles load on-demand
- **Optimized Icons**: SVG-based custom markers

## Accessibility

- Keyboard navigation supported
- ARIA labels for map controls
- Screen reader friendly popups

## Browser Support

Works in all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Notes

- Requires `leaflet` CSS to be imported (automatically done in this component)
- Map container must have a defined height
- Coordinates must be valid latitude/longitude values
- For production, consider adding loading states and error handling

## Example: City Coordinates

```typescript
const cityCoordinates = {
  'New York': { lat: 40.7128, lng: -74.0060 },
  'London': { lat: 51.5074, lng: -0.1278 },
  'Tokyo': { lat: 35.6762, lng: 139.6503 },
  'Paris': { lat: 48.8566, lng: 2.3522 },
  'Sydney': { lat: -33.8688, lng: 151.2093 },
};
```

## Future Enhancements

- [ ] Add search/filter functionality on map
- [ ] Custom cluster icons with seller avatars
- [ ] Heatmap view option
- [ ] Drawing tools for area selection
- [ ] Geolocation "Find Near Me" feature
- [ ] Save favorite locations
- [ ] Export map as image
