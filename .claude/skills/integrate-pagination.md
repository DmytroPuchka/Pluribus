# Skill: Integrate Pagination

## Описание

Интегрирует готовый Pagination компонент в существующие страницы со списками (Products, Sellers, Orders).

**Востребованность**: ⭐⭐⭐⭐⭐ HIGH - критически важно для UX при больших списках

---

## Использование

### Базовый синтаксис

```
Интегрируй пагинацию в Products page
```

### С настройками

```
Добавь пагинацию в Sellers page с 12 элементами на страницу
```

---

## Компонент Pagination уже создан!

**Файл:** `src/components/common/Pagination/index.tsx` (259 строк)

**Особенности:**
- ✅ Умная логика ellipsis
- ✅ First/Last/Prev/Next navigation
- ✅ Items per page selector (10, 20, 50, 100)
- ✅ Fully typed с TypeScript
- ✅ Accessibility support
- ✅ Responsive design

**Props:**
```typescript
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  showItemsPerPage?: boolean;
  className?: string;
}
```

---

## Как интегрировать

### Шаг 1: Добавить state

```typescript
'use client';

import { useState } from 'react';
import { Pagination } from '@/components/common/Pagination';

export default function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // ... rest of component
}
```

### Шаг 2: Вычислить pagination data

```typescript
// Пагинировать данные
const totalItems = filteredProducts.length;
const totalPages = Math.ceil(totalItems / itemsPerPage);
const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const currentProducts = filteredProducts.slice(startIndex, endIndex);
```

### Шаг 3: Добавить компонент

```typescript
return (
  <div>
    {/* Products Grid */}
    <ProductGrid products={currentProducts} />

    {/* Pagination */}
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      itemsPerPage={itemsPerPage}
      totalItems={totalItems}
      onPageChange={setCurrentPage}
      onItemsPerPageChange={(newItemsPerPage) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1); // Reset to first page
      }}
      showItemsPerPage={true}
    />
  </div>
);
```

---

## Реальные примеры интеграции

### Пример 1: Products Page

**Файл:** `src/app/products/page.tsx`

**Было (БЕЗ пагинации):**
```typescript
export default function ProductsPage() {
  const allProducts = useMemo(() => getMockProducts(), []);
  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  return (
    <div className="container px-4 py-8">
      <ProductGrid products={filteredProducts} />
      {/* TODO: Add pagination */}
    </div>
  );
}
```

**Стало (С пагинацией):**
```typescript
'use client';

import { useState, useMemo } from 'react';
import { Pagination } from '@/components/common/Pagination';
import { ProductGrid } from '@/components/features/ProductGrid';

export default function ProductsPage() {
  const allProducts = useMemo(() => getMockProducts(), []);
  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Calculate pagination
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProducts]);

  return (
    <div className="container px-4 py-8">
      {/* Results Info */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems} products
        </p>
      </div>

      {/* Products Grid */}
      <ProductGrid products={currentProducts} />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={(newItemsPerPage) => {
              setItemsPerPage(newItemsPerPage);
              setCurrentPage(1);
            }}
            showItemsPerPage={true}
          />
        </div>
      )}
    </div>
  );
}
```

### Пример 2: Sellers Page

**Файл:** `src/app/sellers/page.tsx`

```typescript
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Pagination } from '@/components/common/Pagination';
import { SellerCard } from '@/components/features/SellerCard';

export default function SellersPage() {
  const sellers = getMockSellers();
  const [filteredSellers, setFilteredSellers] = useState(sellers);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9); // 3x3 grid

  // Calculate pagination
  const totalItems = filteredSellers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSellers = filteredSellers.slice(startIndex, endIndex);

  // Reset page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredSellers]);

  return (
    <div className="container px-4 py-8">
      {/* Sellers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentSellers.map(seller => (
          <SellerCard key={seller.id} seller={seller} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(newItemsPerPage) => {
            setItemsPerPage(newItemsPerPage);
            setCurrentPage(1);
          }}
        />
      )}
    </div>
  );
}
```

### Пример 3: Dashboard Orders

**Файл:** `src/app/dashboard/orders/page.tsx`

```typescript
'use client';

import { useState, useMemo } from 'react';
import { Pagination } from '@/components/common/Pagination';
import { OrderCard } from '@/components/features/OrderCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function OrdersPage() {
  const allOrders = getMockOrders();
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter by tab
  const filteredOrders = useMemo(() => {
    if (activeTab === 'all') return allOrders;
    return allOrders.filter(order => order.status === activeTab);
  }, [activeTab, allOrders]);

  // Calculate pagination
  const totalItems = filteredOrders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page on tab change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  return (
    <div className="container px-4 py-8">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {/* Orders List */}
          {currentOrders.map(order => (
            <OrderCard key={order.id} order={order} />
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              totalItems={totalItems}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={setItemsPerPage}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

---

## Best Practices

### 1. Reset page при изменении filters

```typescript
// ✅ ХОРОШО - reset page on filter change
useEffect(() => {
  setCurrentPage(1);
}, [filteredItems, searchQuery, activeTab]);

// ❌ ПЛОХО - не reset, пользователь на пустой странице
// Filters изменились, но currentPage = 10 (пустая страница)
```

### 2. Показывай пагинацию только когда нужно

```typescript
// ✅ ХОРОШО - условный рендер
{totalPages > 1 && (
  <Pagination {...props} />
)}

// ❌ ПЛОХО - пагинация для 5 элементов
<Pagination totalPages={1} />
```

### 3. Показывай results counter

```typescript
// ✅ ХОРОШО - показывай диапазон
<p className="text-sm text-muted-foreground">
  Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems} results
</p>

// ❌ ПЛОХО - нет информации
// Пользователь не знает сколько всего элементов
```

### 4. Используй useMemo для дорогих вычислений

```typescript
// ✅ ХОРОШО - memo для filtered data
const filteredProducts = useMemo(() => {
  return products.filter(p => /* expensive filtering */);
}, [products, filters]);

// ❌ ПЛОХО - фильтрация на каждый рендер
const filteredProducts = products.filter(p => /* ... */);
```

### 5. Scroll to top при смене страницы

```typescript
// ✅ ХОРОШО - scroll на новой странице
const handlePageChange = (page: number) => {
  setCurrentPage(page);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// ❌ ПЛОХО - остаемся внизу страницы
// Пользователь не видит новые элементы
```

---

## Где нужно интегрировать

### ✅ Высокий приоритет:
1. **Products Page** (/products) - каталог товаров
2. **Sellers Page** (/sellers) - список продавцов
3. **Dashboard Orders** (/dashboard/orders) - управление заказами

### 🟡 Средний приоритет:
4. **Dashboard Products** (/dashboard/products) - товары продавца
5. **Search Results** (если будет global search)

### 🟢 Низкий приоритет:
6. **Reviews list** (если будет отдельная страница)
7. **Notifications** (если будет история уведомлений)

---

## Статус интеграции

### Компонент создан:
- ✅ `/src/components/common/Pagination/index.tsx` (259 строк)
- ✅ Props interface определен
- ✅ Fully typed с TypeScript
- ✅ Accessibility support
- ✅ Responsive design

### Интеграция:
- ❌ Products Page - **НЕ интегрирован**
- ❌ Sellers Page - **НЕ интегрирован**
- ❌ Dashboard Orders - **НЕ интегрирован**
- ❌ Dashboard Products - **НЕ интегрирован**

---

## Чек-лист интеграции

### Для каждой страницы:

1. [ ] Добавить imports
   ```typescript
   import { useState, useEffect } from 'react';
   import { Pagination } from '@/components/common/Pagination';
   ```

2. [ ] Добавить state
   ```typescript
   const [currentPage, setCurrentPage] = useState(1);
   const [itemsPerPage, setItemsPerPage] = useState(12);
   ```

3. [ ] Вычислить pagination data
   ```typescript
   const totalPages = Math.ceil(totalItems / itemsPerPage);
   const currentItems = allItems.slice(startIndex, endIndex);
   ```

4. [ ] Добавить useEffect для reset
   ```typescript
   useEffect(() => {
     setCurrentPage(1);
   }, [filteredItems]);
   ```

5. [ ] Добавить компонент
   ```typescript
   {totalPages > 1 && <Pagination {...props} />}
   ```

6. [ ] Добавить results counter
   ```typescript
   <p>Showing {start}-{end} of {total} results</p>
   ```

7. [ ] Тестировать:
   - [ ] Переключение страниц работает
   - [ ] Items per page изменяется
   - [ ] Reset при изменении filters
   - [ ] Responsive на мобильных

---

## Выводы

**Этот skill КРИТИЧЕСКИ востребован:**
- ✅ Компонент готов (259 строк)
- ✅ Fully tested и documented
- ❌ НЕ интегрирован ни в одну страницу
- ⏰ Нужно для завершения MVP до 100%

**Статус:**
- Компонент создан: ✅
- Интегрирован: 0 из 4 страниц
- Приоритет: **CRITICAL** для production

**Время на интеграцию:** ~15-20 минут на страницу
**Всего времени:** ~1 час для всех основных страниц

**Next step:** Интегрировать в Products page первым!
