# Skill: Create Component

## Описание

Автоматически создает React компонент для Next.js с TypeScript, стилями Tailwind CSS и тестами.

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
- `common` - общие переиспользуемые компоненты (Button, Input, Card)
- `features` - feature-specific компоненты (ProductCard, OrderList)
- `layout` - layout компоненты (Header, Footer, Sidebar)

### Client Component

```
Создай client компонент {ComponentName}
```

Добавит директиву `'use client'` для использования hooks и browser APIs.

## Примеры

### Пример 1: Простая кнопка

**Запрос:**
```
Создай компонент Button
```

**Создается:**
```
src/components/common/Button/
├── index.tsx              # Компонент
└── Button.test.tsx        # Тесты
```

**Содержимое index.tsx:**
```tsx
'use client';

import { FC } from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
}) => {
  const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-colors';
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {children}
    </button>
  );
};

Button.displayName = 'Button';

export default Button;
```

### Пример 2: Карточка продукта

**Запрос:**
```
Создай features компонент ProductCard с props: product, onBuy
```

**Создается:**
```
src/components/features/ProductCard/
├── index.tsx
└── ProductCard.test.tsx
```

**Содержимое index.tsx:**
```tsx
import { FC } from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { Button } from '@/components/common/Button';

interface ProductCardProps {
  product: Product;
  onBuy: (productId: string) => void;
}

export const ProductCard: FC<ProductCardProps> = ({ product, onBuy }) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="relative w-full h-48 mb-4">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover rounded-md"
        />
      </div>

      <h3 className="text-lg font-semibold mb-2">{product.title}</h3>

      <p className="text-gray-600 mb-4 line-clamp-2">
        {product.description}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-xl font-bold text-blue-600">
          ${product.price}
        </span>

        <Button onClick={() => onBuy(product.id)} variant="primary">
          Заказать
        </Button>
      </div>
    </div>
  );
};

ProductCard.displayName = 'ProductCard';

export default ProductCard;
```

### Пример 3: Layout компонент

**Запрос:**
```
Создай layout компонент Header
```

**Создается:**
```
src/components/layout/Header/
├── index.tsx
└── Header.test.tsx
```

## Генерируемые файлы

### 1. Компонент (index.tsx)

Включает:
- TypeScript interface для props
- Functional component с proper typing
- JSDoc комментарии
- Tailwind CSS стили
- Export (named + default)

### 2. Тесты (ComponentName.test.tsx)

Включает:
- Test setup с React Testing Library
- Базовые тесты рендеринга
- Тесты props
- Тесты взаимодействий (если есть onClick и т.д.)

## Конфигурация

### Component Types

| Type | Path | Назначение |
|------|------|------------|
| `common` | `src/components/common/` | Базовые переиспользуемые UI компоненты |
| `features` | `src/components/features/` | Feature-specific компоненты |
| `layout` | `src/components/layout/` | Layout и структурные компоненты |

### Client vs Server Components

**Server Component (по умолчанию):**
- Не нужна директива `'use client'`
- Может использовать async/await
- Не может использовать hooks (useState, useEffect и т.д.)
- Не может слушать browser events

**Client Component:**
- Требует директиву `'use client'`
- Может использовать React hooks
- Может обрабатывать события
- Доступ к browser APIs

## Best Practices

### 1. Naming
- PascalCase для имен компонентов
- Описательные имена (ProductCard, UserProfile, не Card1, Component2)
- Суффикс Props для интерфейса props

### 2. Props
- Всегда типизируй props через interface
- Используй optional props там, где нужно
- Добавляй default values для optional props
- Деструктурируй props в параметрах функции

### 3. Styling
- Используй Tailwind utility classes
- Группируй связанные классы
- Используй переменные для повторяющихся значений
- Добавляй responsive breakpoints где нужно

### 4. Composition
- Разбивай большие компоненты на маленькие
- Используй compound components pattern где уместно
- Реюзь существующие компоненты

### 5. Performance
- Мемоизируй дорогие вычисления (useMemo)
- Мемоизируй callback функции (useCallback)
- Используй React.memo для pure компонентов
- Lazy load тяжелые компоненты

## Troubleshooting

### Проблема: "use client" отсутствует, но нужен

**Решение:**
```
Создай client компонент {Name}
```

### Проблема: Компонент создается не в той папке

**Решение:**
Явно укажи тип:
```
Создай features компонент {Name}
```

### Проблема: Нужны дополнительные props

**Решение:**
```
Создай компонент {Name} с props: prop1, prop2, prop3
```

Или обнови существующий компонент:
```
Добавь props {propName} в компонент {ComponentName}
```

## См. также

- [create-page](./create-page.md) - Создание страниц
- [add-layout](./add-layout.md) - Создание layouts
- UI Component Agent - Агент для работы с компонентами

---

**Версия**: 1.0.0
**Обновлено**: 08.02.2026
