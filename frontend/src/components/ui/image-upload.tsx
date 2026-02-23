'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { Upload, X, Loader2, ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  value?: string[];
  onChange: (urls: string[]) => void;
  onUpload?: (files: File[]) => Promise<string[]>;
  maxFiles?: number;
  maxSize?: number; // in MB
  accept?: string;
  disabled?: boolean;
  className?: string;
  uploadText?: string;
  uploadingText?: string;
  aspectRatio?: 'square' | 'video' | 'auto';
}

export function ImageUpload({
  value = [],
  onChange,
  onUpload,
  maxFiles = 5,
  maxSize = 5,
  accept = 'image/jpeg,image/jpg,image/png,image/webp',
  disabled = false,
  className,
  uploadText = 'Upload Images',
  uploadingText = 'Uploading...',
  aspectRatio = 'auto',
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) return;

    // Validate file count
    if (value.length + files.length > maxFiles) {
      setError(`Maximum ${maxFiles} images allowed`);
      return;
    }

    // Validate file sizes
    const invalidFiles = files.filter(file => file.size > maxSize * 1024 * 1024);
    if (invalidFiles.length > 0) {
      setError(`File size must be less than ${maxSize}MB`);
      return;
    }

    // Validate file types
    const allowedTypes = accept.split(',');
    const invalidTypes = files.filter(file => !allowedTypes.includes(file.type));
    if (invalidTypes.length > 0) {
      setError('Invalid file type. Only JPEG, JPG, PNG, and WebP are allowed');
      return;
    }

    setError(null);
    setUploading(true);

    try {
      if (onUpload) {
        // Use custom upload handler
        const urls = await onUpload(files);
        onChange([...value, ...urls]);
      } else {
        // Create local previews
        const previews = await Promise.all(
          files.map(file => {
            return new Promise<string>((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result as string);
              reader.readAsDataURL(file);
            });
          })
        );
        onChange([...value, ...previews]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload images');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = (index: number) => {
    const newValue = value.filter((_, i) => i !== index);
    onChange(newValue);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case 'square':
        return 'aspect-square';
      case 'video':
        return 'aspect-video';
      default:
        return 'aspect-auto';
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={maxFiles > 1}
        onChange={handleFileChange}
        disabled={disabled || uploading}
        className="hidden"
      />

      {/* Preview Grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {value.map((url, index) => (
            <div
              key={index}
              className={cn(
                'relative rounded-lg overflow-hidden border-2 border-border bg-muted',
                getAspectRatioClass()
              )}
            >
              <Image
                src={url}
                alt={`Upload ${index + 1}`}
                fill
                className="object-cover"
              />
              {!disabled && (
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6"
                  onClick={() => handleRemove(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload Button */}
      {value.length < maxFiles && (
        <Button
          type="button"
          variant="outline"
          onClick={handleClick}
          disabled={disabled || uploading}
          className="w-full"
        >
          {uploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {uploadingText}
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              {uploadText}
            </>
          )}
        </Button>
      )}

      {/* Empty State */}
      {value.length === 0 && !uploading && (
        <div
          onClick={handleClick}
          className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-12 cursor-pointer hover:border-primary transition-colors"
        >
          <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-sm text-muted-foreground text-center">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-muted-foreground text-center mt-1">
            Max {maxFiles} images, up to {maxSize}MB each
          </p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      {/* Info */}
      {!error && (
        <p className="text-xs text-muted-foreground">
          {value.length} / {maxFiles} images uploaded
        </p>
      )}
    </div>
  );
}
