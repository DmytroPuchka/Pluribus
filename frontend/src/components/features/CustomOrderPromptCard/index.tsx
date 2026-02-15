/**
 * CustomOrderPromptCard Component
 * A card that prompts users to create a custom order
 * Designed to match ProductCard styling and dimensions
 *
 * @component
 * @example
 * ```tsx
 * <CustomOrderPromptCard sellerId="123" onClick={() => handleClick()} />
 * ```
 */

'use client';

import { FC } from 'react';
import { ClipboardList, Plus, Sparkles } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useTranslations } from '@/contexts/TranslationsContext';

interface CustomOrderPromptCardProps {
  sellerId: string;
  sellerName?: string;
  onClick: () => void;
  className?: string;
}

export const CustomOrderPromptCard: FC<CustomOrderPromptCardProps> = ({
  sellerId,
  sellerName,
  onClick,
  className,
}) => {
  const { t } = useTranslations();

  return (
    <Card
      className={cn(
        'overflow-hidden hover:shadow-lg transition-all cursor-pointer border-2 border-dashed border-primary/50 hover:border-primary bg-gradient-to-br from-primary/5 to-transparent',
        className
      )}
      onClick={onClick}
    >
      {/* Icon Area - matches ProductCard image height */}
      <div className="relative w-full h-48 bg-gradient-to-br from-primary/10 to-primary/5 flex flex-col items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-3">
          <ClipboardList className="w-10 h-10 text-primary" />
        </div>

        {/* Badge */}
        <div className="absolute top-2 right-2">
          <Badge variant="default" className="bg-primary backdrop-blur-sm">
            <Sparkles className="w-3 h-3 mr-1" />
            {t('pages.customOrders.badge.custom')}
          </Badge>
        </div>

        {/* Plus Icon Indicator */}
        <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
          <Plus className="w-5 h-5" />
        </div>
      </div>

      <CardContent className="p-4">
        {/* Title */}
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-primary">
          {t('pages.customOrders.promptCard.title')}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {sellerName
            ? t('pages.customOrders.promptCard.descriptionWithSeller', { sellerName })
            : t('pages.customOrders.promptCard.description')}
        </p>

        {/* Features List */}
        <div className="space-y-1 mb-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-1 h-1 rounded-full bg-primary"></div>
            <span>{t('pages.customOrders.promptCard.feature1')}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-1 h-1 rounded-full bg-primary"></div>
            <span>{t('pages.customOrders.promptCard.feature2')}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-1 h-1 rounded-full bg-primary"></div>
            <span>{t('pages.customOrders.promptCard.feature3')}</span>
          </div>
        </div>

        {/* Price Indicator */}
        <div className="mb-3 text-sm font-medium text-primary">
          {t('pages.customOrders.promptCard.priceText')}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full" size="default" onClick={onClick}>
          <ClipboardList className="w-4 h-4 mr-2" />
          {t('pages.customOrders.promptCard.button')}
        </Button>
      </CardFooter>
    </Card>
  );
};

CustomOrderPromptCard.displayName = 'CustomOrderPromptCard';

export default CustomOrderPromptCard;
