# Skill: Create API Route

## Описание

Автоматически создает API route handler для Next.js App Router с типизацией, валидацией и обработкой ошибок.

## Использование

### Базовый синтаксис

```
Создай API endpoint {METHOD} {/route}
```

### С аутентификацией

```
Создай защищенный API endpoint {METHOD} {/route}
```

### Server Action

```
Создай server action для {action description}
```

## Примеры

### Пример 1: GET endpoint

**Запрос:**
```
Создай API endpoint GET /api/products
```

**Создается:**
```
src/app/api/products/
└── route.ts
```

**Содержимое route.ts:**
```tsx
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 20;

    const products = await prisma.product.findMany({
      where: category ? { category } : undefined,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            avatar: true,
            rating: true,
          },
        },
      },
    });

    const total = await prisma.product.count({
      where: category ? { category } : undefined,
    });

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('GET /api/products error:', error);

    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
```

### Пример 2: POST endpoint с валидацией

**Запрос:**
```
Создай API endpoint POST /api/products для создания товара
```

**Создается:**
```
src/app/api/products/
└── route.ts
```

**Содержимое route.ts:**
```tsx
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

// Validation schema
const createProductSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().min(10).max(2000),
  price: z.number().positive(),
  currency: z.enum(['USD', 'EUR', 'GBP']),
  category: z.string(),
  photos: z.array(z.string().url()).min(1).max(10),
  stockQuantity: z.number().int().nonnegative().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user is a seller
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (user?.role !== 'SELLER' && user?.role !== 'BOTH') {
      return NextResponse.json(
        { error: 'Only sellers can create products' },
        { status: 403 }
      );
    }

    // Parse and validate body
    const body = await request.json();
    const validatedData = createProductSchema.parse(body);

    // Create product
    const product = await prisma.product.create({
      data: {
        ...validatedData,
        sellerId: session.user.id,
      },
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    return NextResponse.json(
      { product },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST /api/products error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
```

### Пример 3: Dynamic route с параметрами

**Запрос:**
```
Создай API endpoint GET /api/products/[id]
```

**Создается:**
```
src/app/api/products/[id]/
└── route.ts
```

**Содержимое route.ts:**
```tsx
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            avatar: true,
            rating: true,
            country: true,
            city: true,
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ product });
  } catch (error) {
    console.error('GET /api/products/[id] error:', error);

    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const product = await prisma.product.findUnique({
      where: { id: params.id },
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    if (product.sellerId !== session.user.id) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    const body = await request.json();

    const updatedProduct = await prisma.product.update({
      where: { id: params.id },
      data: body,
    });

    return NextResponse.json({ product: updatedProduct });
  } catch (error) {
    console.error('PUT /api/products/[id] error:', error);

    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const product = await prisma.product.findUnique({
      where: { id: params.id },
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    if (product.sellerId !== session.user.id) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    await prisma.product.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      { message: 'Product deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE /api/products/[id] error:', error);

    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
```

### Пример 4: Server Action

**Запрос:**
```
Создай server action для создания заказа
```

**Создается:**
```
src/actions/create-order.ts
```

**Содержимое:**
```tsx
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

const createOrderSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().positive(),
  deliveryAddress: z.string().min(10),
  notes: z.string().optional(),
});

interface CreateOrderResult {
  success: boolean;
  data?: {
    orderId: string;
    orderNumber: string;
  };
  error?: string;
}

export async function createOrder(
  input: z.infer<typeof createOrderSchema>
): Promise<CreateOrderResult> {
  try {
    // Validate input
    const validatedData = createOrderSchema.parse(input);

    // Check authentication
    const session = await auth();

    if (!session?.user) {
      return {
        success: false,
        error: 'You must be logged in to create an order',
      };
    }

    // Get product
    const product = await prisma.product.findUnique({
      where: { id: validatedData.productId },
    });

    if (!product) {
      return {
        success: false,
        error: 'Product not found',
      };
    }

    if (!product.isActive) {
      return {
        success: false,
        error: 'Product is no longer available',
      };
    }

    // Check stock
    if (product.stockQuantity !== null &&
        product.stockQuantity < validatedData.quantity) {
      return {
        success: false,
        error: 'Insufficient stock',
      };
    }

    // Create order
    const order = await prisma.order.create({
      data: {
        buyerId: session.user.id,
        sellerId: product.sellerId,
        productId: product.id,
        quantity: validatedData.quantity,
        price: product.price,
        currency: product.currency,
        deliveryAddress: validatedData.deliveryAddress,
        notes: validatedData.notes,
        status: 'PENDING',
        orderNumber: `ORD-${Date.now()}`,
      },
    });

    // Update stock
    if (product.stockQuantity !== null) {
      await prisma.product.update({
        where: { id: product.id },
        data: {
          stockQuantity: product.stockQuantity - validatedData.quantity,
        },
      });
    }

    // Revalidate pages
    revalidatePath('/orders');
    revalidatePath(`/products/${product.id}`);

    return {
      success: true,
      data: {
        orderId: order.id,
        orderNumber: order.orderNumber,
      },
    };
  } catch (error) {
    console.error('createOrder error:', error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'Invalid order data',
      };
    }

    return {
      success: false,
      error: 'Failed to create order',
    };
  }
}
```

## HTTP Methods

### GET
Получение данных. Не должен изменять состояние.

### POST
Создание новых ресурсов.

### PUT
Полное обновление ресурса.

### PATCH
Частичное обновление ресурса.

### DELETE
Удаление ресурса.

## Status Codes

| Code | Название | Использование |
|------|----------|---------------|
| 200 | OK | Успешный запрос |
| 201 | Created | Ресурс создан (POST) |
| 204 | No Content | Успех без контента (DELETE) |
| 400 | Bad Request | Невалидные данные |
| 401 | Unauthorized | Не авторизован |
| 403 | Forbidden | Нет прав доступа |
| 404 | Not Found | Ресурс не найден |
| 500 | Internal Server Error | Ошибка сервера |

## Best Practices

### 1. Validation
- Всегда валидируй входные данные с Zod
- Проверяй типы параметров
- Sanitize user input

### 2. Authentication
- Проверяй auth для защищенных endpoints
- Используй session/JWT
- Проверяй права доступа (authorization)

### 3. Error Handling
- Try-catch для всех async операций
- Логируй ошибки
- Возвращай понятные сообщения
- Используй правильные status codes

### 4. Performance
- Используй database indexes
- Implement pagination
- Cache где возможно
- Optimize queries

### 5. Security
- Validate все inputs
- Rate limiting
- CORS configuration
- Sanitize outputs

## Troubleshooting

### Проблема: 405 Method Not Allowed

**Причина:**
Метод не экспортирован или название функции неправильное.

**Решение:**
```tsx
// Правильно
export async function GET(request: NextRequest) { }

// Неправильно
export async function get(request: NextRequest) { }
```

### Проблема: Params не работают

**Решение:**
```tsx
// Правильно
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) { }

// Неправильно
export async function GET(request: NextRequest, params: { id: string }) { }
```

### Проблема: CORS ошибки

**Решение:**
Добавь headers в response:
```tsx
return NextResponse.json(data, {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
  },
});
```

## См. также

- [create-component](./create-component.md) - Создание компонентов
- [create-page](./create-page.md) - Создание страниц
- API Agent - Агент для работы с API

---

**Версия**: 1.0.0
**Обновлено**: 08.02.2026
