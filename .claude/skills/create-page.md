# Skill: Create Page

## Описание

Автоматически создает страницу Next.js (App Router) с правильной структурой, metadata, loading и error states.

## Использование

### Базовый синтаксис

```
Создай страницу {PageName} по адресу {/route}
```

### С динамическими параметрами

```
Создай страницу {PageName} по адресу {/route/[param]}
```

### С layout

```
Создай страницу {PageName} с layout
```

## Примеры

### Пример 1: Простая статическая страница

**Запрос:**
```
Создай страницу Products по адресу /products
```

**Создается:**
```
src/app/products/
├── page.tsx           # Главная страница
├── loading.tsx        # Loading state
└── error.tsx          # Error boundary
```

**Содержимое page.tsx:**
```tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products | Pluribus',
  description: 'Browse products available for international delivery',
};

interface ProductsPageProps {
  searchParams: {
    category?: string;
    page?: string;
  };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  // Fetch data server-side
  const products = await fetchProducts({
    category: searchParams.category,
    page: Number(searchParams.page) || 1,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
```

**Содержимое loading.tsx:**
```tsx
export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

**Содержимое error.tsx:**
```tsx
'use client';

import { useEffect } from 'react';
import { Button } from '@/components/common/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Products page error:', error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-gray-600 mb-6">{error.message}</p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
```

### Пример 2: Динамическая страница

**Запрос:**
```
Создай страницу ProductDetails по адресу /products/[id]
```

**Создается:**
```
src/app/products/[id]/
├── page.tsx
├── loading.tsx
└── error.tsx
```

**Содержимое page.tsx:**
```tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface ProductDetailsPageProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: ProductDetailsPageProps): Promise<Metadata> {
  const product = await fetchProduct(params.id);

  if (!product) {
    return {
      title: 'Product Not Found | Pluribus',
    };
  }

  return {
    title: `${product.title} | Pluribus`,
    description: product.description,
    openGraph: {
      images: [product.image],
    },
  };
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const product = await fetchProduct(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-square">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className="text-2xl font-bold text-blue-600 mb-6">
            ${product.price}
          </div>

          <Button size="lg">Order Now</Button>
        </div>
      </div>
    </div>
  );
}
```

### Пример 3: Страница с layout

**Запрос:**
```
Создай страницу Dashboard по адресу /dashboard с layout
```

**Создается:**
```
src/app/dashboard/
├── layout.tsx         # Layout для dashboard секции
├── page.tsx           # Dashboard главная
├── loading.tsx
└── error.tsx
```

**Содержимое layout.tsx:**
```tsx
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
```

## Генерируемые файлы

### 1. page.tsx

**Статическая страница:**
- Async function по умолчанию
- Metadata export
- Props с searchParams
- Server-side data fetching

**Динамическая страница:**
- Async function с params
- generateMetadata function
- notFound() для 404
- Props с params и searchParams

### 2. loading.tsx

- Loading skeleton UI
- Используется автоматически Next.js
- Показывается во время загрузки

### 3. error.tsx

- Error boundary
- Client component ('use client')
- Reset функция для retry
- Логирование ошибки

### 4. layout.tsx (опционально)

- Обертка для группы страниц
- Shared UI elements
- Не перерендеривается при навигации

## Типы страниц

### Static Page
Статическая страница без параметров.
```
/about, /products, /contact
```

### Dynamic Page
Страница с динамическими параметрами.
```
/products/[id], /users/[id]/profile
```

### Catch-all Route
Захватывает все вложенные пути.
```
/blog/[...slug]
```

### Optional Catch-all
Опциональный catch-all.
```
/shop/[[...category]]
```

## Конвенции

### Metadata

Всегда добавляй metadata для SEO:

```tsx
export const metadata: Metadata = {
  title: 'Page Title | Pluribus',
  description: 'Page description for SEO',
  openGraph: {
    title: 'Page Title',
    description: 'OG description',
    images: ['/og-image.jpg'],
  },
};
```

### Data Fetching

Fetch данные напрямую в компоненте:

```tsx
export default async function Page() {
  const data = await fetchData();

  return <div>{data}</div>;
}
```

### Revalidation

Добавь revalidation для ISR:

```tsx
export const revalidate = 3600; // 1 hour
```

### Dynamic Rendering

Форсируй dynamic rendering:

```tsx
export const dynamic = 'force-dynamic';
```

## Best Practices

### 1. SEO Optimization
- Всегда добавляй metadata
- Используй semantic HTML
- Добавляй alt text для изображений
- Правильная heading иерархия (h1 > h2 > h3)

### 2. Performance
- Используй Server Components где возможно
- Lazy load heavy компоненты
- Оптимизируй изображения с next/image
- Добавляй loading states

### 3. Error Handling
- Создавай error boundaries
- Показывай понятные сообщения об ошибках
- Добавляй retry functionality
- Логируй ошибки

### 4. UX
- Добавляй loading skeletons
- Используй progressive enhancement
- Graceful degradation
- Responsive design

### 5. Accessibility
- Semantic HTML
- ARIA labels где нужно
- Keyboard navigation
- Focus management

## Troubleshooting

### Проблема: Page не рендерится

**Причины:**
- Неправильная структура папок
- Отсутствует export default
- Async function без await

**Решение:**
Проверь, что:
- Файл называется page.tsx
- Есть default export
- Async функции используют await

### Проблема: Metadata не работает

**Решение:**
- Metadata должен быть в page.tsx, не в Client Component
- Используй generateMetadata для динамических данных

### Проблема: Loading state не показывается

**Решение:**
- Проверь, что loading.tsx в той же папке что и page.tsx
- Убедись что есть async операции в page.tsx

## См. также

- [create-component](./create-component.md) - Создание компонентов
- [create-api-route](./create-api-route.md) - Создание API routes
- Page Agent - Агент для работы со страницами

---

**Версия**: 1.0.0
**Обновлено**: 08.02.2026
