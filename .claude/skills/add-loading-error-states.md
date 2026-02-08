# Skill: Add Loading & Error States

## Описание

Добавляет `loading.tsx` и `error.tsx` файлы для Next.js App Router страниц для профессионального UX.

**Востребованность**: ⭐⭐⭐⭐⭐ HIGH - критически важно для production-ready приложения

---

## Использование

### Базовый синтаксис

```
Добавь loading и error states для страницы /products
```

### Для динамических роутов

```
Добавь loading и error states для /products/[id]
```

### Только loading

```
Добавь loading state для /sellers
```

### Только error

```
Добавь error boundary для /dashboard/orders
```

---

## Структура файлов

### Loading State

```typescript
// src/app/{route}/loading.tsx
export default function Loading() {
  return (
    <div className="container px-4 py-8">
      {/* Loading skeleton */}
    </div>
  );
}
```

### Error Boundary

```typescript
// src/app/{route}/error.tsx
'use client'; // Обязательно для error boundaries

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container px-4 py-8">
      {/* Error message */}
    </div>
  );
}
```

---

## Реальные примеры из проекта

### Пример 1: Products Loading State

**Файл:** `src/app/products/loading.tsx`

```typescript
export default function Loading() {
  return (
    <div className="container px-4 py-8">
      <div className="mb-8 space-y-2">
        <div className="h-8 w-48 bg-muted animate-pulse rounded" />
        <div className="h-4 w-64 bg-muted animate-pulse rounded" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <div className="aspect-video bg-muted animate-pulse rounded-lg" />
            <div className="h-6 bg-muted animate-pulse rounded" />
            <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
}
```

**Особенности:**
- Skeleton loader с точным layout
- Animate-pulse для визуального feedback
- Responsive grid matching ProductGrid

### Пример 2: Products Error Boundary

**Файл:** `src/app/products/error.tsx`

```typescript
'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Products page error:', error);
  }, [error]);

  return (
    <div className="container px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <AlertCircle className="w-16 h-16 text-destructive mb-4" />
        <h2 className="text-2xl font-bold mb-2">
          Oops! Something went wrong
        </h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          We couldn't load the products. Please try again.
        </p>
        <Button onClick={reset}>
          Try again
        </Button>
      </div>
    </div>
  );
}
```

**Особенности:**
- useEffect для error logging
- Friendly error message
- Reset button для retry
- Icon для визуального feedback

### Пример 3: Dynamic Route Loading

**Файл:** `src/app/products/[id]/loading.tsx`

```typescript
export default function Loading() {
  return (
    <div className="container px-4 py-8">
      {/* Breadcrumbs skeleton */}
      <div className="flex gap-2 mb-6">
        <div className="h-4 w-20 bg-muted animate-pulse rounded" />
        <span>/</span>
        <div className="h-4 w-24 bg-muted animate-pulse rounded" />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Image gallery skeleton */}
        <div className="aspect-square bg-muted animate-pulse rounded-lg" />

        {/* Product details skeleton */}
        <div className="space-y-4">
          <div className="h-8 w-3/4 bg-muted animate-pulse rounded" />
          <div className="h-6 w-32 bg-muted animate-pulse rounded" />
          <div className="space-y-2">
            <div className="h-4 bg-muted animate-pulse rounded" />
            <div className="h-4 bg-muted animate-pulse rounded" />
            <div className="h-4 w-5/6 bg-muted animate-pulse rounded" />
          </div>
          <div className="h-12 w-full bg-muted animate-pulse rounded" />
        </div>
      </div>
    </div>
  );
}
```

---

## Best Practices

### 1. Loading должен совпадать с layout страницы

```typescript
// ✅ ХОРОШО - точная копия layout
<div className="grid grid-cols-3 gap-6">
  {Array.from({ length: 6 }).map((_, i) => (
    <LoadingSkeleton key={i} />
  ))}
</div>

// ❌ ПЛОХО - generic spinner
<div className="flex justify-center">
  <Spinner />
</div>
```

### 2. Используй animate-pulse

```typescript
// ✅ ХОРОШО - плавная анимация
<div className="h-8 bg-muted animate-pulse rounded" />

// ❌ ПЛОХО - статичный блок
<div className="h-8 bg-gray-200 rounded" />
```

### 3. Error boundary должен быть 'use client'

```typescript
// ✅ ХОРОШО
'use client';

export default function Error({ error, reset }) {
  return <ErrorUI error={error} reset={reset} />;
}

// ❌ ПЛОХО - забыли 'use client'
// Error boundaries требуют client component
```

### 4. Предоставь способ recovery

```typescript
// ✅ ХОРОШО - reset button
<Button onClick={reset}>Try again</Button>

// ✅ ХОРОШО - navigation options
<Link href="/">Go home</Link>
<Button onClick={reset}>Retry</Button>

// ❌ ПЛОХО - нет способа восстановления
<p>Error occurred</p>
```

### 5. Log errors для debugging

```typescript
// ✅ ХОРОШО - log error
useEffect(() => {
  console.error('Error:', error);
  // Send to Sentry/LogRocket/etc
}, [error]);

// ❌ ПЛОХО - игнорируем error
// Нет способа узнать о проблеме
```

---

## Что созданов проекте

### ✅ Созданы loading/error для:
- `/products/loading.tsx` ✅
- `/products/error.tsx` ✅
- `/products/[id]/loading.tsx` ✅
- `/products/[id]/error.tsx` ✅
- `/sellers/[id]/loading.tsx` ✅
- `/sellers/[id]/error.tsx` ✅

### ❌ НЕ созданы (TODO для 100% MVP):
- `/app/not-found.tsx` - Global 404 page
- `/app/error.tsx` - Global error boundary
- `/app/loading.tsx` - Root loading state
- `/sellers/loading.tsx`
- `/dashboard/loading.tsx`
- `/dashboard/orders/loading.tsx`
- `/dashboard/products/loading.tsx`
- `/dashboard/profile/loading.tsx`
- `/login/loading.tsx`
- `/register/loading.tsx`
- `/about/loading.tsx`
- `/contact/loading.tsx`
- ... и другие

---

## Шаблоны для быстрого создания

### Loading Template (Generic)

```typescript
export default function Loading() {
  return (
    <div className="container px-4 py-8">
      <div className="animate-pulse space-y-4">
        {/* Header */}
        <div className="h-8 w-48 bg-muted rounded" />

        {/* Content */}
        <div className="grid gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-24 bg-muted rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}
```

### Error Template (Generic)

```typescript
'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="container px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <AlertCircle className="w-12 h-12 text-destructive mb-4" />
        <h2 className="text-2xl font-bold mb-2">Something went wrong!</h2>
        <p className="text-muted-foreground mb-6">
          {error.message || 'An unexpected error occurred'}
        </p>
        <div className="flex gap-4">
          <Button onClick={reset}>Try again</Button>
          <Button variant="outline" onClick={() => window.location.href = '/'}>
            Go home
          </Button>
        </div>
      </div>
    </div>
  );
}
```

### Not Found Template (404)

```typescript
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-[600px] text-center">
        <FileQuestion className="w-20 h-20 text-muted-foreground mb-6" />
        <h1 className="text-6xl font-bold mb-2">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}
```

---

## Приоритет создания

### Must Have (для 100% MVP):
1. **Global not-found.tsx** - 404 страница
2. **Global error.tsx** - глобальный error boundary
3. **Global loading.tsx** - root loading

### Should Have:
4. Loading states для всех основных страниц
5. Error boundaries для критических страниц

### Nice to Have:
6. Custom 500 error page
7. Offline error page
8. Rate limit error page

---

## Выводы

**Этот skill ДЕЙСТВИТЕЛЬНО востребован:**
- ✅ Нужен для production-ready app
- ✅ Улучшает UX
- ✅ Professional error handling
- ✅ Легко создать по шаблону

**Статус:**
- Создано: 6 loading/error пар
- Осталось: ~15-20 файлов для полного покрытия
- Приоритет: HIGH для завершения MVP

**Время на создание:** ~5-10 минут на пару loading/error файлов
