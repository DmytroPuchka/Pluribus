'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductForm, ProductFormData } from '@/components/features/ProductForm';
import { useTranslations } from '@/contexts/TranslationsContext';
import { useAuth } from '@/contexts/AuthContext';
import { productsService } from '@/lib/api';
import { toast } from 'sonner';
import Link from 'next/link';

export default function NewProductPage() {
  const { t } = useTranslations();
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if not authenticated or not a seller
  useEffect(() => {
    if (!authLoading && (!user || (user.role !== 'SELLER' && user.role !== 'BOTH'))) {
      toast.error('Only sellers can create products');
      router.push('/dashboard');
    }
  }, [user, authLoading, router]);

  const handleSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);
    try {
      // Parse tags from comma-separated string to array
      const tagsArray = data.tags
        ? data.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
        : [];

      // TODO: Upload photos to Cloudinary and get URLs
      // For now, use placeholder URLs for uploaded photos
      const photoUrls = data.existingPhotos || [];
      if (data.photos && data.photos.length > 0) {
        // Placeholder: In production, upload to Cloudinary here
        data.photos.forEach((file, index) => {
          photoUrls.push(`https://via.placeholder.com/500?text=Product+Photo+${index + 1}`);
        });
      }

      // Create product via API
      await productsService.createProduct({
        title: data.title,
        description: data.description,
        photos: photoUrls,
        price: data.price,
        category: data.category,
        tags: tagsArray,
        stockQuantity: 1, // Default stock quantity
      });

      toast.success(t('pages.productForm.messages.createSuccess'));
      router.push('/dashboard/products');
    } catch (error: any) {
      console.error('Error creating product:', error);
      const errorMessage = error?.response?.data?.error || t('pages.productForm.messages.createError');
      toast.error('Failed to create product', {
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/dashboard/products');
  };

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="mb-6">
        <Link href="/dashboard/products">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.buttons.back')}
          </Button>
        </Link>
      </div>

      <ProductForm onSubmit={handleSubmit} onCancel={handleCancel} isSubmitting={isSubmitting} />
    </div>
  );
}
