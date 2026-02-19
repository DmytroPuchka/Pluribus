'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductForm, ProductFormData } from '@/components/features/ProductForm';
import { useTranslations } from '@/contexts/TranslationsContext';
import { toast } from 'sonner';
import Link from 'next/link';

export default function NewProductPage() {
  const { t } = useTranslations();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);
    try {
      // TODO: Implement API call to create product
      console.log('Creating product:', data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success(t('pages.productForm.messages.createSuccess'));
      router.push('/dashboard/products');
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error(t('pages.productForm.messages.createError'));
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
