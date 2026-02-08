# ЭТАП 2: CORE FEATURES (Основной функционал)

**Цель**: Расширить MVP до полнофункциональной платформы с ключевыми возможностями для комфортной работы пользователей.

**Предусловия**: Завершен Этап 1 (MVP)

---

## 1. Google OAuth Integration

**Приоритет**: HIGH
**Сложность**: Medium
**Зависимости**: Authentication System (Phase 1)

### Задачи:
- [ ] Настроить Google Cloud Console (OAuth 2.0)
- [ ] Backend интеграция Passport Google Strategy
- [ ] Frontend Google Sign-In кнопка
- [ ] Связывание Google аккаунтов с существующими
- [ ] Миграция существующих пользователей

### Технические детали:
```typescript
// Backend endpoints
POST /api/auth/google
POST /api/auth/google/link

// Required scopes
- email
- profile

// User linking flow
if (googleEmail exists in DB) {
  if (hasPassword) { prompt for password to link }
  else { auto-link }
}
```

### Критерии завершения:
- ✓ Пользователь может зарегистрироваться через Google
- ✓ Пользователь может привязать Google к существующему аккаунту
- ✓ Корректная обработка конфликтов email
- ✓ Тесты покрывают все сценарии

---

## 2. Custom Orders System

**Приоритет**: CRITICAL
**Сложность**: High
**Зависимости**: Orders System (Phase 1)

### Задачи:
- [ ] Database schema для custom orders
- [ ] API для создания индивидуального заказа (buyer)
- [ ] API для управления custom orders (seller)
- [ ] UI форма создания custom order
- [ ] Seller inbox для custom orders
- [ ] Действия: Accept, Decline, Request Clarification
- [ ] Notifications для обеих сторон
- [ ] Conversion: Custom Order → Standard Order

### Статусы Custom Order:
```typescript
enum CustomOrderStatus {
  PENDING_SELLER_RESPONSE = "pending_seller_response",
  CLARIFICATION_NEEDED = "clarification_needed",
  ACCEPTED = "accepted",
  DECLINED = "declined",
  CONVERTED_TO_ORDER = "converted_to_order",
  CANCELLED = "cancelled"
}
```

### Database Schema:
```sql
custom_orders (
  id UUID PRIMARY KEY,
  buyer_id UUID REFERENCES users(id),
  seller_id UUID REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  photos JSONB[], -- array of image URLs
  max_price DECIMAL(10,2),
  currency VARCHAR(3),
  delivery_deadline DATE, -- or NULL for ASAP
  is_asap BOOLEAN DEFAULT false,
  delivery_address JSONB,
  status custom_order_status,
  rejection_reason TEXT,
  notes TEXT, -- seller's notes
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  expires_at TIMESTAMP -- auto-decline after X days
)

custom_order_messages (
  id UUID PRIMARY KEY,
  custom_order_id UUID REFERENCES custom_orders(id),
  user_id UUID REFERENCES users(id),
  message TEXT NOT NULL,
  created_at TIMESTAMP
)
```

### API Endpoints:
```
POST   /api/custom-orders            # Buyer creates
GET    /api/custom-orders            # List user's custom orders
GET    /api/custom-orders/:id        # Get details
PUT    /api/custom-orders/:id/accept # Seller accepts
PUT    /api/custom-orders/:id/decline # Seller declines
POST   /api/custom-orders/:id/clarify # Request clarification
POST   /api/custom-orders/:id/convert # Convert to order
DELETE /api/custom-orders/:id        # Cancel
```

### UI Components:
- `CustomOrderForm` - форма создания
- `CustomOrderCard` - карточка в списке
- `CustomOrderDetails` - детальный вид
- `CustomOrderActions` - кнопки действий (seller)
- `CustomOrderTimeline` - история изменений

### Критерии завершения:
- ✓ Buyer может создать индивидуальный заказ
- ✓ Seller видит входящие custom orders
- ✓ Seller может принять/отклонить/уточнить
- ✓ Работает обмен сообщениями
- ✓ Custom order конвертируется в обычный заказ
- ✓ Email уведомления на каждое действие

---

## 3. Enhanced Product Management

**Приоритет**: HIGH
**Сложность**: Medium
**Зависимости**: Product Management (Phase 1)

### Задачи:
- [ ] Множественная загрузка фото (до 10)
- [ ] Image reordering (drag & drop)
- [ ] Категории товаров (предопределенные + custom)
- [ ] Теги товаров
- [ ] Детальное описание (rich text editor)
- [ ] Внешние ссылки на товар
- [ ] Shipping information fields
- [ ] Weight & dimensions
- [ ] Stock management
- [ ] Product variants (optional: размеры, цвета)

### Categories:
```typescript
const PRODUCT_CATEGORIES = [
  'Electronics',
  'Fashion & Accessories',
  'Beauty & Cosmetics',
  'Food & Beverages',
  'Books & Media',
  'Home & Garden',
  'Sports & Outdoors',
  'Toys & Games',
  'Health & Wellness',
  'Art & Collectibles',
  'Other'
];
```

### Enhanced Product Schema:
```typescript
interface Product {
  id: string;
  seller_id: string;
  title: string;
  description: string; // plain text
  description_html: string; // rich text
  photos: string[]; // array of URLs, max 10
  primary_photo_index: number;
  category: string;
  tags: string[];
  price: number;
  currency: string;
  external_link?: string;

  // Shipping info
  shipping_methods: string[];
  estimated_delivery_days: number;
  shipping_from_country: string;
  shipping_from_city: string;

  // Physical properties
  weight?: number; // grams
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: 'cm' | 'inch';
  };

  // Inventory
  stock_quantity: number;
  low_stock_threshold: number;

  // Status
  is_active: boolean;
  is_featured: boolean;

  // Stats
  views_count: number;
  orders_count: number;

  created_at: Date;
  updated_at: Date;
}
```

### UI Improvements:
- Rich text editor (TipTap or Quill)
- Image gallery component
- Drag & drop для reordering
- Category selector с иконками
- Tag input с autocomplete
- Shipping calculator preview

---

## 4. Order Management Enhancement

**Приоритет**: HIGH
**Сложность**: Medium
**Зависимости**: Orders System (Phase 1)

### Расширенные статусы:
```typescript
enum OrderStatus {
  PENDING_SELLER_RESPONSE = "pending_seller_response",
  ACCEPTED = "accepted",
  DECLINED = "declined",
  PAYMENT_PENDING = "payment_pending",
  PAYMENT_CONFIRMED = "payment_confirmed",
  IN_PROGRESS = "in_progress",      // Seller preparing
  SHIPPED = "shipped",              // In transit
  DELIVERED = "delivered",          // Arrived
  COMPLETED = "completed",          // Both rated
  DISPUTED = "disputed",
  CANCELLED = "cancelled",
  REFUNDED = "refunded"
}
```

### Задачи:
- [ ] Расширить статусы заказов
- [ ] Tracking информация (номер, URL)
- [ ] Timeline с историей изменений
- [ ] Автоматические transitions (delivered → completed after 7 days)
- [ ] Email notifications на каждый статус
- [ ] Фильтры заказов (по статусу, дате, цене)
- [ ] Поиск по номеру заказа
- [ ] Export orders to CSV (seller)
- [ ] Cancellation reasons
- [ ] Refund requests

### Order Timeline:
```typescript
interface OrderEvent {
  id: string;
  order_id: string;
  event_type: 'status_change' | 'message' | 'payment' | 'shipment' | 'note';
  old_value?: string;
  new_value?: string;
  description: string;
  created_by: string; // user_id
  created_at: Date;
}
```

### API Endpoints:
```
GET    /api/orders?status=shipped&from=2024-01-01
GET    /api/orders/:id/timeline
PUT    /api/orders/:id/ship
PUT    /api/orders/:id/deliver
POST   /api/orders/:id/tracking
POST   /api/orders/:id/cancel
POST   /api/orders/:id/dispute
GET    /api/orders/export?format=csv
```

---

## 5. Real-time Chat System

**Приоритет**: CRITICAL
**Сложность**: High
**Зависимости**: Orders/Custom Orders (Phase 1 & 2)

### Задачи:
- [ ] Socket.io server setup
- [ ] Chat database schema
- [ ] WebSocket authentication
- [ ] Frontend Socket.io client
- [ ] Chat UI components
- [ ] Message persistence
- [ ] Typing indicators
- [ ] Read receipts
- [ ] File attachments (images)
- [ ] Emoji support
- [ ] Unread count badges
- [ ] Desktop notifications

### Database Schema:
```sql
conversations (
  id UUID PRIMARY KEY,
  buyer_id UUID REFERENCES users(id),
  seller_id UUID REFERENCES users(id),
  order_id UUID REFERENCES orders(id), -- optional
  custom_order_id UUID REFERENCES custom_orders(id), -- optional
  last_message_at TIMESTAMP,
  created_at TIMESTAMP
)

messages (
  id UUID PRIMARY KEY,
  conversation_id UUID REFERENCES conversations(id),
  sender_id UUID REFERENCES users(id),
  message_type ENUM('text', 'image', 'system'),
  content TEXT,
  attachments JSONB[],
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMP,
  created_at TIMESTAMP
)
```

### WebSocket Events:
```typescript
// Client → Server
socket.emit('join_conversation', { conversationId });
socket.emit('send_message', { conversationId, content, type });
socket.emit('typing', { conversationId });
socket.emit('mark_read', { messageIds });

// Server → Client
socket.on('new_message', (message) => {});
socket.on('user_typing', ({ userId }) => {});
socket.on('message_read', ({ messageId }) => {});
socket.on('conversation_updated', (conversation) => {});
```

### UI Components:
- `ChatWindow` - основное окно чата
- `ConversationList` - список диалогов
- `MessageBubble` - сообщение
- `MessageInput` - поле ввода
- `TypingIndicator` - индикатор печати
- `UnreadBadge` - счетчик непрочитанных

### Security:
- Пользователь может видеть только свои conversations
- Validation: sender должен быть участником conversation
- Rate limiting для сообщений (max 10 msgs/min)

---

## 6. Rating & Review System

**Приоритет**: CRITICAL
**Сложность**: Medium
**Зависимости**: Orders (Phase 1 & 2)

### Задачи:
- [ ] Review database schema
- [ ] Обязательная взаимная оценка
- [ ] Блокировка дальнейших действий до оценки
- [ ] Детальная система критериев
- [ ] Публичные и приватные отзывы
- [ ] Расчет общего рейтинга
- [ ] Отображение рейтинга на профиле
- [ ] Фильтрация отзывов

### Review Structure:
```typescript
interface Review {
  id: string;
  order_id: string;
  reviewer_id: string; // кто оценивает
  reviewee_id: string; // кого оценивают
  role: 'buyer' | 'seller'; // роль reviewee

  // Ratings (1-5)
  overall_rating: number;
  communication_rating: number;
  timeliness_rating: number;
  quality_rating: number; // product/service quality

  // Text review
  comment: string; // public
  private_feedback?: string; // only for admins

  // Flags
  is_public: boolean;
  is_verified: boolean; // verified purchase
  is_flagged: boolean;

  created_at: Date;
  updated_at: Date;
}
```

### Rating Calculation:
```typescript
interface UserRating {
  user_id: string;

  as_seller: {
    overall_rating: number; // average
    total_reviews: number;
    communication_rating: number;
    timeliness_rating: number;
    quality_rating: number;
    completed_orders: number;
  };

  as_buyer: {
    overall_rating: number;
    total_reviews: number;
    communication_rating: number;
    timeliness_rating: number;
    completed_orders: number;
  };

  updated_at: Date;
}
```

### Post-Order Flow:
```
Order status = DELIVERED
    ↓
After 7 days auto → COMPLETED
    ↓
Trigger review request (both sides)
    ↓
Block further orders until both review
    ↓
Calculate new ratings
    ↓
Send notifications
```

### API Endpoints:
```
POST   /api/reviews                 # Create review
GET    /api/reviews/pending         # Reviews I need to write
GET    /api/users/:id/reviews       # User's reviews
GET    /api/users/:id/ratings       # User's rating summary
PUT    /api/reviews/:id             # Edit (within 48h)
POST   /api/reviews/:id/flag        # Report review
```

---

## 7. Payment Integration (Stripe)

**Приоритет**: CRITICAL
**Сложность**: High
**Зависимости**: Orders (Phase 1 & 2)

### Задачи:
- [ ] Stripe account setup
- [ ] Stripe Connect для sellers
- [ ] Payment Intent creation
- [ ] Checkout session
- [ ] Webhook handling
- [ ] Escrow mechanism
- [ ] Payout scheduling
- [ ] Refund handling
- [ ] Payment history
- [ ] Multiple currencies support

### Stripe Connect Flow:
```
Seller onboarding:
1. Create Connect account (Express)
2. Complete onboarding (KYC)
3. Link bank account
4. Verify account

Payment flow:
1. Buyer creates order
2. Backend creates Payment Intent
3. Frontend shows Stripe Elements
4. Buyer pays (card)
5. Money held in escrow
6. Order delivered
7. Review completed
8. Money released to seller (minus platform fee)
```

### Database Schema:
```sql
payment_transactions (
  id UUID PRIMARY KEY,
  order_id UUID REFERENCES orders(id),
  stripe_payment_intent_id VARCHAR(255),
  stripe_charge_id VARCHAR(255),
  amount DECIMAL(10,2),
  currency VARCHAR(3),
  platform_fee DECIMAL(10,2),
  seller_amount DECIMAL(10,2),
  status payment_status,
  paid_at TIMESTAMP,
  released_at TIMESTAMP,
  refunded_at TIMESTAMP,
  created_at TIMESTAMP
)

seller_payouts (
  id UUID PRIMARY KEY,
  seller_id UUID REFERENCES users(id),
  stripe_payout_id VARCHAR(255),
  amount DECIMAL(10,2),
  currency VARCHAR(3),
  status VARCHAR(50),
  arrival_date DATE,
  created_at TIMESTAMP
)
```

### Webhooks to Handle:
```
payment_intent.succeeded
payment_intent.payment_failed
charge.refunded
payout.paid
payout.failed
account.updated
```

### Security:
- PCI compliance (Stripe handles)
- Verify webhook signatures
- Never store card details
- Use Stripe's fraud detection

---

## 8. Advanced Map Features

**Приоритет**: HIGH
**Сложность**: Medium
**Зависимости**: Map View (Phase 1)

### Задачи:
- [ ] Фильтры продавцов (страна, рейтинг, категория)
- [ ] Поиск по локации
- [ ] Detailed seller card modal
- [ ] Показ товаров продавца на карте
- [ ] Favorites markers
- [ ] Heatmap популярных регионов
- [ ] Геокодинг адресов
- [ ] Расчет расстояния до продавца

### Filter Panel:
```typescript
interface MapFilters {
  countries: string[];
  min_rating: number;
  categories: string[];
  price_range: { min: number; max: number };
  delivery_time: number; // max days
  verified_only: boolean;
  languages: string[];
}
```

### Seller Card Enhancement:
```
SellerCardModal:
  - Avatar & name
  - Overall rating (stars + number)
  - Location (country, city)
  - Member since date
  - Total completed orders
  - Response time average
  - Languages spoken
  - Products carousel (top 6)
  - "View All Products" button
  - "Start Custom Order" button
  - Reviews preview (top 3)
  - "Message" button
```

### API Endpoints:
```
GET /api/sellers/active?country=US&min_rating=4.0&category=Electronics
GET /api/sellers/:id/full-profile
GET /api/sellers/nearby?lat=40.7128&lng=-74.0060&radius=100
GET /api/sellers/heatmap
```

---

## Итоговая проверка Этапа 2

### Критерии готовности:
- [ ] Google OAuth работает
- [ ] Custom orders полностью функциональны
- [ ] Товары с множественными фото и категориями
- [ ] Расширенное управление заказами
- [ ] Real-time чат работает стабильно
- [ ] Система рейтингов и отзывов работает
- [ ] Stripe платежи интегрированы и протестированы
- [ ] Продвинутые функции карты реализованы
- [ ] Все API endpoints документированы
- [ ] Unit & Integration тесты написаны
- [ ] Performance приемлемый (< 3s load time)

### Риски и митигация:
| Риск | Вероятность | Влияние | Митигация |
|------|-------------|---------|-----------|
| Сложность Stripe Connect | Medium | High | Начать раньше, использовать Stripe Express |
| WebSocket масштабирование | Medium | Medium | Redis adapter для Socket.io |
| Review spam | High | Medium | Rate limiting, verification required |
| Payment fraud | Low | High | Stripe Radar, manual review for large amounts |

### Технические долги:
- Оптимизация запросов к БД (N+1 queries)
- Кеширование часто запрашиваемых данных
- Обработка офлайн-режима в чате
- Автоматическое масштабирование Socket.io

---

**Следующий этап**: Phase 3 - Advanced Features
