# Skill: Create Component

## Описание

Автоматически создает React компонент для Next.js с TypeScript, Tailwind CSS и shadcn/ui patterns.

**⚠️ ВАЖНО**: Этот skill служит как reference guide. В реальной разработке используйте Task tool с subagents для более гибкого создания компонентов.

---

## Использование

### Базовый синтаксис

```
Создай компонент {ComponentName}
```

### С параметрами

```
Создай компонент {ComponentName} с props: {prop1}, {prop2}, {prop3}
```

### Указание типа компонента

```
Создай {type} компонент {ComponentName}
```

Где `type` может быть:
- `common` - общие переиспользуемые компоненты (Rating, PriceDisplay, Pagination, SearchBar)
- `features` - feature-specific компоненты (ProductCard, ProductGrid, SellerCard, InteractiveSellerMap)
- `layout` - layout компоненты (Header, Footer, Logo, DashboardSidebar)

### Client Component

```
Создай client компонент {ComponentName}
```

Добавит директиву `'use client'` для использования hooks, state, и browser APIs.

---

## Структура компонента (на основе реального опыта)

### Файловая структура

```
src/components/{type}/{ComponentName}/
├── index.tsx          # Основной компонент
└── README.md          # Документация (опционально для сложных компонентов)
```

### Шаблон компонента

```typescript
/**
 * {ComponentName} Component
 * {Brief description}
 *
 * @component
 */

'use client'; // Только если нужны hooks/state

import { FC } from 'react';
import { cn } from '@/lib/utils';
// Import shadcn/ui components
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
// Import icons
import { IconName } from 'lucide-react';

interface {ComponentName}Props {
  // Props with JSDoc comments
  /** Description of prop1 */
  prop1: string;
  /** Description of prop2 */
  prop2?: number;
  /** Optional className for styling */
  className?: string;
}

export const {ComponentName}: FC<{ComponentName}Props> = ({
  prop1,
  prop2 = defaultValue,
  className = '',
}) => {
  return (
    <div className={cn('base-classes', className)}>
      {/* Component content */}
    </div>
  );
};

{ComponentName}.displayName = '{ComponentName}';

export default {ComponentName};
```

---

## Реальные примеры из проекта

### Пример 1: Rating Component (Common)

**Запрос:**
```
Создай common компонент Rating для отображения звездного рейтинга
с props: value, max, readonly
```

**Создан файл:** `src/components/common/Rating/index.tsx`

**Особенности:**
- Client component ('use client' для интерактивности)
- Использует lucide-react для иконок (Star)
- Поддержка половинных звезд
- Responsive размеры (sm, md, lg)
- TypeScript строгая типизация

### Пример 2: ProductFilters Component (Features)

**Запрос:**
```
Создай features компонент ProductFilters с props: products, onFiltersChange
```

**Создан файл:** `src/components/features/ProductFilters/index.tsx` (527 строк)

**Особенности:**
- Client component с useState
- Интеграция shadcn/ui (Button, Badge, Select)
- Сложная бизнес-логика фильтрации
- Active filter badges
- Collapsible interface

### Пример 3: InteractiveSellerMap Component (Features)

**Запрос:**
```
Создай features компонент InteractiveSellerMap с интеграцией Leaflet
```

**Создан файл:** `src/components/features/InteractiveSellerMap/index.tsx` (250+ строк)

**Особенности:**
- Client component с внешними библиотеками (leaflet)
- Custom hooks (useMemo, useMap)
- Сложная интеграция (marker clustering, popups)
- Отдельный CSS файл для стилизации карты
- README.md с документацией

### Пример 4: Pagination Component (Common)

**Запрос:**
```
Создай common компонент Pagination с умной логикой ellipsis
```

**Создан файл:** `src/components/common/Pagination/index.tsx` (259 строк)

**Особенности:**
- Сложная логика отображения страниц
- Items per page selector
- First/Last/Prev/Next navigation
- Accessibility support
- Fully typed props

---

## Best Practices (из реального опыта)

### 1. TypeScript типизация
```typescript
// ✅ ХОРОШО - строгие типы
interface ButtonProps {
  variant: 'default' | 'outline' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  onClick: () => void;
}

// ❌ ПЛОХО - слабая типизация
interface ButtonProps {
  variant?: string;
  size?: string;
  onClick?: any;
}
```

### 2. Props destructuring
```typescript
// ✅ ХОРОШО
export const Component: FC<Props> = ({ prop1, prop2, className = '' }) => {
  return <div className={cn('base', className)}>{prop1}</div>;
};

// ❌ ПЛОХО
export const Component: FC<Props> = (props) => {
  return <div className={props.className}>{props.prop1}</div>;
};
```

### 3. Использование cn() для классов
```typescript
// ✅ ХОРОШО - динамические классы
<div className={cn(
  'base-classes',
  variant === 'primary' && 'bg-blue-500',
  isActive && 'ring-2',
  className
)}>

// ❌ ПЛОХО - конкатенация строк
<div className={'base-classes ' + className}>
```

### 4. Client vs Server Components
```typescript
// ✅ Используй 'use client' когда:
'use client'; // useState, useEffect, browser APIs, event handlers

// ✅ Не используй 'use client' когда:
// - Только отображение данных
// - Нет state или effects
// - Можно рендерить на сервере
```

### 5. DisplayName для debugging
```typescript
// ✅ ХОРОШО - легко дебажить
ProductCard.displayName = 'ProductCard';

// ❌ ПЛОХО - анонимный компонент
export default () => { ... }
```

### 6. JSDoc комментарии
```typescript
/**
 * Product Card Component
 * Displays product information with image, price, and seller details
 *
 * @component
 * @example
 * <ProductCard product={productData} onBuy={handleBuy} />
 */
```

---

## Компоненты созданные в проекте

### Common Components (4)
1. **Rating** - звездный рейтинг с половинными звездами
2. **PriceDisplay** - форматирование цен с валютой
3. **Pagination** - умная пагинация с ellipsis (259 строк)
4. **SearchBar** - поиск с debounce и suggestions (285 строк)

### Feature Components (8)
1. **ProductCard** - карточка товара с деталями
2. **ProductGrid** - responsive grid с loading states
3. **ProductFilters** - фильтрация товаров (527 строк)
4. **SellerCard** - карточка продавца
5. **OrderCard** - карточка заказа
6. **OrderStatus** - статус заказа с badge
7. **ContactForm** - форма связи с валидацией
8. **InteractiveSellerMap** - карта с Leaflet (250+ строк)

### Layout Components (4)
1. **Header** - навигация с language selector
2. **Footer** - подвал с ссылками
3. **Logo** - логотип Pluribus
4. **DashboardSidebar** - боковое меню Dashboard

**Итого: 16 custom компонентов + 18 shadcn/ui = 34+ компонентов**

---

## shadcn/ui компоненты (используемые в проекте)

```bash
# Установка компонентов через CLI
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add form
npx shadcn@latest add select
npx shadcn@latest add textarea
npx shadcn@latest add avatar
npx shadcn@latest add badge
npx shadcn@latest add tabs
npx shadcn@latest add dropdown-menu
npx shadcn@latest add accordion
npx shadcn@latest add toast
```

---

## Когда НЕ создавать новый компонент

1. **Компонент существует в shadcn/ui** - используй готовый
2. **Используется 1 раз** - inline в странице
3. **Слишком простой** - не нужна абстракция
4. **Можно скомбинировать существующие** - лучше композиция

---

## Альтернативный подход (используется в проекте)

Вместо прямого использования этого skill, используйте:

### Task Tool с Subagents
```
Запустить subagent для создания компонента ProductCard:
- Создать файл src/components/features/ProductCard/index.tsx
- Добавить TypeScript интерфейсы
- Использовать shadcn/ui Card, Badge, Button
- Добавить responsive layout
- Экспортировать компонент
```

Это более гибкий подход, который использовался для создания всех 36+ компонентов в проекте.

---

## Выводы

**Skills полезны как:**
- ✅ Reference documentation
- ✅ Структурные гайдлайны
- ✅ Best practices

**Но в реальности эффективнее:**
- ⭐ Task tool + subagents
- ⭐ Write/Edit tools напрямую
- ⭐ Parallel development (10+ компонентов одновременно)

---

**Создано компонентов**: 36+
**Использован этот skill напрямую**: 0 раз
**Метод создания**: Task tool + Write/Edit tools
