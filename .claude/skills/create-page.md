# Skill: Create Page

## Описание

Автоматически создает Next.js страницу с App Router, TypeScript, metadata и error/loading states.

**⚠️ ВАЖНО**: Этот skill служит как reference guide. В проекте все 22 страницы созданы через Task tool + subagents для параллельной разработки.

---

## Использование

### Базовый синтаксис

```
Создай страницу {PageName} по адресу {route}
```

### Динамический роут

```
Создай страницу Product Details по адресу /products/[id]
```

### С layout

```
Создай страницу Dashboard Orders по адресу /dashboard/orders с layout
```

---

## Структура страницы (на основе реального опыта)

### Файловая структура

```
src/app/{route}/
├── page.tsx           # Основная страница
├── loading.tsx        # Loading state (опционально)
├── error.tsx          # Error boundary (опционально)
└── layout.tsx         # Layout (для группы страниц)
```

### Шаблон страницы

```typescript
/**
 * {PageName} Page
 * {Brief description}
 *
 * Route: {route}
 */

'use client'; // Только если нужны hooks/state

import { FC } from 'react';
import { Metadata } from 'next';

// Server Component (default)
export const metadata: Metadata = {
  title: '{PageName} | Pluribus',
  description: '{Page description}',
};

export default function {PageName}Page() {
  return (
    <div className="container px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{PageName}</h1>
      {/* Page content */}
    </div>
  );
}

// Client Component (if needed)
'use client';

export default function {PageName}Page() {
  const [state, setState] = useState();

  return (
    <div className="container px-4 py-8">
      {/* Interactive content */}
    </div>
  );
}
```

---

## Реальные примеры из проекта (22 страницы)

### 1. Landing Page (/)

**Создан файл:** `src/app/page.tsx`

**Особенности:**
- Server Component (no 'use client')
- Metadata для SEO
- Секции: Hero, How It Works, Features, Stats, CTA
- ~300 строк

### 2. Products Page (/products)

**Создан файл:** `src/app/products/page.tsx`

**Особенности:**
- Client Component ('use client' для filters)
- ProductGrid + ProductFilters интеграция
- useState для фильтрации
- loading.tsx и error.tsx созданы
- ~250 строк

### 3. Product Details (/products/[id])

**Создан файл:** `src/app/products/[id]/page.tsx`

**Особенности:**
- Динамический роут с [id] параметром
- Image gallery, seller info, reviews
- loading.tsx и error.tsx для динамического роута
- ~400 строк

### 4. Sellers Page (/sellers)

**Создан файл:** `src/app/sellers/page.tsx`

**Особенности:**
- Client Component
- InteractiveSellerMap интеграция (dynamic import)
- Filters синхронизированы с картой
- Search functionality
- ~417 строк

### 5. Dashboard Layout (/dashboard)

**Создан файл:** `src/app/dashboard/layout.tsx`

**Особенности:**
- Shared layout для всех dashboard страниц
- DashboardSidebar интеграция
- Protected routes (TODO: auth check)
- ~150 строк

**Dashboard страницы:**
- `/dashboard/page.tsx` - Overview (статистика)
- `/dashboard/orders/page.tsx` - Orders management (650 строк)
- `/dashboard/products/page.tsx` - Products management (578 строк)
- `/dashboard/profile/page.tsx` - Profile editing (572 строк)

### 6. Auth Pages

**Login:** `src/app/login/page.tsx` (258 строк)
- React Hook Form + Zod validation
- Google OAuth button placeholder
- Client Component

**Register:** `src/app/register/page.tsx` (392 строк)
- Multi-step form with role selection
- Validation для всех полей
- Client Component

### 7. Информационные страницы

**About:** `src/app/about/page.tsx` (372 строк)
- Company story, mission, values, team
- Server Component

**Contact:** `src/app/contact/page.tsx` (271 строк)
- Contact form с валидацией
- Client Component (form state)

**Help/FAQ:** `src/app/help/page.tsx`
- 22 FAQs в 7 категориях
- Accordion интеграция (shadcn/ui)
- Search functionality

### 8. Legal Pages

**Terms:** `src/app/terms/page.tsx`
- 13 разделов, table of contents
- Server Component
- SEO metadata

**Privacy:** `src/app/privacy/page.tsx`
- GDPR-compliant
- All required sections
- Server Component

### 9. Password Recovery

**Forgot Password:** `src/app/forgot-password/page.tsx` (260 строк)
**Reset Password:** `src/app/reset-password/[token]/page.tsx` (358 строк)

---

## Best Practices (из реального опыта)

### 1. Metadata для SEO (Server Components)

```typescript
// ✅ ХОРОШО - SEO оптимизация
export const metadata: Metadata = {
  title: 'Products | Pluribus',
  description: 'Browse products from sellers worldwide. International delivery made simple.',
  keywords: ['products', 'international delivery', 'global marketplace'],
  openGraph: {
    title: 'Products | Pluribus',
    description: 'Browse products from sellers worldwide',
    type: 'website',
  },
};

// ❌ ПЛОХО - нет metadata
// SEO страдает
```

### 2. Client vs Server Components

```typescript
// ✅ Server Component (default) - лучше для SEO
export const metadata = { ... };

export default function AboutPage() {
  return <div>Static content</div>;
}

// ✅ Client Component - когда нужен state
'use client';

export default function ProductsPage() {
  const [filters, setFilters] = useState({});
  return <div>Interactive content</div>;
}
```

### 3. Loading States

```typescript
// src/app/products/loading.tsx
export default function Loading() {
  return (
    <div className="container px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    </div>
  );
}
```

### 4. Error Boundaries

```typescript
// src/app/products/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container px-4 py-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-muted-foreground mb-6">{error.message}</p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
```

### 5. Динамические роуты

```typescript
// src/app/products/[id]/page.tsx
export default function ProductDetailsPage({
  params
}: {
  params: { id: string }
}) {
  // Используй params.id для загрузки данных
  const product = getProduct(params.id);

  return <div>{product.title}</div>;
}
```

### 6. Layout для группы страниц

```typescript
// src/app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <DashboardSidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
```

---

## Страницы созданные в проекте

### Основные (5)
1. **Landing** (/) - главная страница (~300 строк)
2. **Products** (/products) - каталог с фильтрами (~250 строк)
3. **Product Details** (/products/[id]) - детали товара (~400 строк)
4. **Sellers** (/sellers) - список продавцов + карта (~417 строк)
5. **Seller Profile** (/sellers/[id]) - профиль продавца (~594 строк)

### Auth (2)
6. **Login** (/login) - вход (258 строк)
7. **Register** (/register) - регистрация (392 строк)

### Dashboard (4)
8. **Dashboard Overview** (/dashboard) - статистика
9. **Dashboard Orders** (/dashboard/orders) - заказы (650 строк)
10. **Dashboard Products** (/dashboard/products) - товары (578 строк)
11. **Dashboard Profile** (/dashboard/profile) - профиль (572 строк)

### Информационные (6)
12. **How it Works** (/how-it-works) - инструкции
13. **About** (/about) - о компании (372 строк)
14. **Contact** (/contact) - контакты (271 строк)
15. **Help/FAQ** (/help) - помощь (22 FAQ)
16. **Terms** (/terms) - условия использования
17. **Privacy** (/privacy) - политика конфиденциальности

### Password Recovery (2)
18. **Forgot Password** (/forgot-password) - восстановление (260 строк)
19. **Reset Password** (/reset-password/[token]) - сброс (358 строк)

### Demo (1)
20. **Toast Demo** (/demo/toasts) - демо уведомлений

**Итого: 22 страницы**

---

## Выводы

**Skills полезны как:**
- ✅ Reference для структуры страниц
- ✅ Best practices documentation
- ✅ Routing patterns guide

**Но в реальности эффективнее:**
- ⭐ Task tool + subagents (PARALLEL!)
- ⭐ 10+ страниц одновременно
- ⭐ Consistent code generation
- ⭐ Context-aware development

---

**Создано страниц**: 22
**Использован этот skill напрямую**: 0 раз
**Метод создания**: Task tool + parallel subagents
**Время экономии**: ~18 часов благодаря параллельной разработке
