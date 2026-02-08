/**
 * ImageGallery Component
 * Interactive image gallery with thumbnail selection
 *
 * @component
 */

'use client';

import { FC, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ImageGalleryProps {
  photos: string[];
  title: string;
}

export const ImageGallery: FC<ImageGalleryProps> = ({ photos, title }) => {
  const [selectedImage, setSelectedImage] = useState(photos[0]);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative w-full bg-muted rounded-lg overflow-hidden">
        <div className="relative w-full h-96">
          <Image
            src={selectedImage}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </div>

      {/* Thumbnail Gallery */}
      {photos.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {photos.map((photo, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(photo)}
              className={cn(
                'relative w-full h-20 rounded-lg overflow-hidden border-2 transition-colors',
                selectedImage === photo
                  ? 'border-primary'
                  : 'border-transparent hover:border-muted-foreground/20'
              )}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={photo}
                alt={`${title} - Image ${index + 1}`}
                fill
                className="object-cover"
                sizes="100px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

ImageGallery.displayName = 'ImageGallery';

export default ImageGallery;
