'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Upload, Loader2 } from 'lucide-react';
import { useTranslations } from '@/contexts/TranslationsContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageUpload } from '@/components/ui/image-upload';
import { Product, ProductCategory } from '@/types';
import { cn } from '@/lib/utils';
import { apiClient } from '@/lib/api';
import { toast } from 'sonner';

const CATEGORIES: ProductCategory[] = [
  'ELECTRONICS',
  'CLOTHING',
  'FOOD',
  'BEAUTY',
  'BOOKS',
  'TOYS',
  'SPORTS',
  'HOME',
  'OTHER',
];

const CURRENCIES = [
  { value: 'USD', label: 'USD ($)' },
  { value: 'EUR', label: 'EUR (€)' },
  { value: 'GBP', label: 'GBP (£)' },
  { value: 'UAH', label: 'UAH (₴)' },
];

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: ProductFormData) => void | Promise<void>;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export interface ProductFormData {
  title: string;
  description: string;
  price: number;
  currency: string;
  category: ProductCategory;
  photos: string[];
  isAvailable?: boolean;
}

export function ProductForm({ product, onSubmit, onCancel, isSubmitting }: ProductFormProps) {
  const { t } = useTranslations();
  const [photoUrls, setPhotoUrls] = useState<string[]>(product?.photos || []);

  const productFormSchema = z.object({
    title: z
      .string()
      .min(5, { message: t('pages.productForm.validation.titleMinLength') })
      .max(100, { message: t('pages.productForm.validation.titleMaxLength') }),
    description: z
      .string()
      .min(20, { message: t('pages.productForm.validation.descriptionMinLength') })
      .max(2000, { message: t('pages.productForm.validation.descriptionMaxLength') }),
    price: z
      .number({ message: t('pages.productForm.validation.priceRequired') })
      .positive({ message: t('pages.productForm.validation.pricePositive') })
      .max(1000000, { message: t('pages.productForm.validation.priceMaxExceeded') }),
    currency: z.string().min(1, { message: t('pages.productForm.validation.currencyRequired') }),
    category: z.string().min(1, { message: t('pages.productForm.validation.categoryRequired') }).refine(
      (val) => val !== '',
      { message: t('pages.productForm.validation.categoryRequired') }
    ),
    photos: z
      .array(z.string().url())
      .min(1, { message: t('pages.productForm.validation.photosRequired') })
      .max(5, { message: t('pages.productForm.validation.photosMaxCount') }),
    isAvailable: z.boolean().optional(),
  });

  type ProductFormValues = z.infer<typeof productFormSchema>;

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      title: product?.title || '',
      description: product?.description || '',
      price: product?.price ? Number(product.price) : 0,
      currency: product?.currency || 'UAH',
      category: product?.category || '',
      photos: product?.photos || [],
      isAvailable: product?.isAvailable ?? true,
    },
  });

  // Update photoUrls when product prop changes
  useEffect(() => {
    if (product?.photos) {
      setPhotoUrls(product.photos);
    }
  }, [product?.photos]);

  // Update form when product prop changes
  useEffect(() => {
    if (product) {
      form.reset({
        title: product.title,
        description: product.description,
        price: Number(product.price),
        currency: product.currency,
        category: product.category,
        photos: product.photos,
        isAvailable: product.isAvailable ?? true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const handlePhotoUpload = async (files: File[]): Promise<string[]> => {
    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append('photos', file);
        formData.append('productId', product?.id || 'temp');

        const response = await apiClient.post('/upload/product-photos', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        return response.data.data.urls[0];
      });

      const urls = await Promise.all(uploadPromises);
      return urls;
    } catch (error) {
      console.error('Photo upload error:', error);
      toast.error(t('components.imageUpload.uploadError'));
      throw error;
    }
  };

  const handlePhotosChange = (urls: string[]) => {
    setPhotoUrls(urls);
    form.setValue('photos', urls);
    form.clearErrors('photos');
  };

  const handleSubmit = async (values: ProductFormValues) => {
    const formData: ProductFormData = {
      title: values.title,
      description: values.description,
      price: values.price,
      currency: values.currency,
      category: values.category as ProductCategory,
      photos: values.photos,
      isAvailable: values.isAvailable,
    };

    await onSubmit(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{product ? t('pages.productForm.editTitle') : t('pages.productForm.createTitle')}</CardTitle>
            <CardDescription>
              {product ? t('pages.productForm.editDescription') : t('pages.productForm.createDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('pages.productForm.form.title')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('pages.productForm.form.titlePlaceholder')} {...field} />
                  </FormControl>
                  <FormDescription>{t('pages.productForm.form.titleDescription')}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('pages.productForm.form.description')}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t('pages.productForm.form.descriptionPlaceholder')}
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>{t('pages.productForm.form.descriptionDescription')}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Photos */}
            <FormField
              control={form.control}
              name="photos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('pages.productForm.form.photos')}</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={photoUrls}
                      onChange={handlePhotosChange}
                      onUpload={handlePhotoUpload}
                      maxFiles={5}
                      maxSize={5}
                      uploadText={t('components.imageUpload.upload')}
                      uploadingText={t('components.imageUpload.uploading')}
                      aspectRatio="square"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>{t('pages.productForm.form.photosDescription')}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('pages.productForm.form.price')}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="99.99"
                        value={field.value || ''}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value === '' ? 0 : parseFloat(value) || 0);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Currency */}
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('pages.productForm.form.currency')}</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('pages.productForm.form.currencyPlaceholder')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CURRENCIES.map((currency) => (
                          <SelectItem key={currency.value} value={currency.value}>
                            {currency.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('pages.productForm.form.category')}</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value || undefined}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('pages.productForm.form.categoryPlaceholder')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {t(`pages.products.categories.${category.toLowerCase()}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Product Status - Only show when editing */}
            {product && (
              <FormField
                control={form.control}
                name="isAvailable"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        {t('pages.productForm.form.productStatus')}
                      </FormLabel>
                      <FormDescription>
                        {field.value
                          ? t('pages.productForm.form.productStatusActive')
                          : t('pages.productForm.form.productStatusInactive')}
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}

          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
              {t('common.buttons.cancel')}
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {product ? t('common.buttons.save') : t('pages.productForm.form.submit')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
