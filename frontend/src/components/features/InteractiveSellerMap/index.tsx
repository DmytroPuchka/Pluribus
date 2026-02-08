/**
 * Interactive Seller Map Component
 * Displays sellers on an interactive world map with clustering
 *
 * @component
 */

'use client';

import { FC, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import { SellerLocation } from '@/types';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Package } from 'lucide-react';
import { getInitials } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Fix Leaflet default marker icons in Next.js
import 'leaflet/dist/leaflet.css';

interface InteractiveSellerMapProps {
  sellers: SellerLocation[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  className?: string;
}

// Custom marker icon
const createCustomIcon = (color: string = '#3b82f6') => {
  return L.divIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 32px;
        height: 32px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          transform: rotate(45deg);
          color: white;
          font-size: 16px;
          font-weight: bold;
          margin-top: -4px;
        ">📍</div>
      </div>
    `,
    className: 'custom-marker-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

// Cluster icon
const createClusterCustomIcon = (cluster: any) => {
  const count = cluster.getChildCount();
  let size = 40;
  let className = 'marker-cluster-small';

  if (count > 10) {
    size = 50;
    className = 'marker-cluster-medium';
  }
  if (count > 20) {
    size = 60;
    className = 'marker-cluster-large';
  }

  return L.divIcon({
    html: `<div><span>${count}</span></div>`,
    className: `marker-cluster ${className}`,
    iconSize: L.point(size, size, true),
  });
};

// Auto-fit bounds component
const AutoFitBounds: FC<{ sellers: SellerLocation[] }> = ({ sellers }) => {
  const map = useMap();

  useMemo(() => {
    if (sellers.length > 0) {
      const bounds = L.latLngBounds(sellers.map(s => [s.lat, s.lng]));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
    }
  }, [sellers, map]);

  return null;
};

export const InteractiveSellerMap: FC<InteractiveSellerMapProps> = ({
  sellers,
  center = [20, 0], // World center
  zoom = 2,
  height = '600px',
  className = '',
}) => {
  // Custom icon instance
  const customIcon = useMemo(() => createCustomIcon(), []);

  return (
    <Card className={`overflow-hidden ${className}`}>
      <div style={{ height, width: '100%' }} className="relative">
        <MapContainer
          center={center}
          zoom={zoom}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
          className="z-0"
        >
          {/* Tile Layer - OpenStreetMap */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Auto-fit bounds to show all sellers */}
          {sellers.length > 0 && <AutoFitBounds sellers={sellers} />}

          {/* Marker Clustering */}
          <MarkerClusterGroup
            chunkedLoading
            iconCreateFunction={createClusterCustomIcon}
            maxClusterRadius={50}
            spiderfyOnMaxZoom={true}
            showCoverageOnHover={false}
            zoomToBoundsOnClick={true}
          >
            {sellers.map((seller) => (
              <Marker
                key={seller.sellerId}
                position={[seller.lat, seller.lng]}
                icon={customIcon}
              >
                <Popup minWidth={250} maxWidth={300} className="seller-popup">
                  <div className="p-2">
                    {/* Seller Header */}
                    <div className="flex items-start gap-3 mb-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={seller.seller.avatar} />
                        <AvatarFallback>
                          {getInitials(seller.seller.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm truncate">
                          {seller.seller.name}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span className="truncate">
                            {seller.seller.city}, {seller.seller.country}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Rating */}
                    {seller.seller.rating && (
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium text-sm">
                          {seller.seller.rating.toFixed(1)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ({seller.seller.reviewCount} reviews)
                        </span>
                      </div>
                    )}

                    {/* Products Count */}
                    <div className="flex items-center gap-1 mb-3">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {seller.productCount} {seller.productCount === 1 ? 'product' : 'products'}
                      </span>
                    </div>

                    {/* Verification Badges */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {seller.seller.emailVerified && (
                        <Badge variant="secondary" className="text-xs">
                          Email ✓
                        </Badge>
                      )}
                      {seller.seller.phoneVerified && (
                        <Badge variant="secondary" className="text-xs">
                          Phone ✓
                        </Badge>
                      )}
                      {seller.seller.idVerified && (
                        <Badge variant="secondary" className="text-xs">
                          ID ✓
                        </Badge>
                      )}
                    </div>

                    {/* View Profile Button */}
                    <Button asChild size="sm" className="w-full">
                      <Link href={`/sellers/${seller.sellerId}`}>
                        View Profile
                      </Link>
                    </Button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 z-[1000] bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-lg border">
          <h4 className="text-xs font-semibold mb-2">Legend</h4>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <span>Seller Location</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-white text-[8px] font-bold">
              #
            </div>
            <span>Multiple Sellers</span>
          </div>
        </div>

        {/* Seller Count Badge */}
        <div className="absolute top-4 right-4 z-[1000] bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg border">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-semibold">
              {sellers.length} {sellers.length === 1 ? 'Seller' : 'Sellers'}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

InteractiveSellerMap.displayName = 'InteractiveSellerMap';

export default InteractiveSellerMap;
