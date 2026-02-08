# Архитектура проекта Pluribus

## Общая архитектура системы

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                         │
│  ┌────────────┐  ┌────────────┐  ┌────────────────────────┐ │
│  │   Web App  │  │   Mobile   │  │   Progressive Web App  │ │
│  │   (React)  │  │    (PWA)   │  │       (Future)         │ │
│  └────────────┘  └────────────┘  └────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            ↓ HTTPS
┌─────────────────────────────────────────────────────────────┐
│                      CDN / LOAD BALANCER                     │
│                     (CloudFlare / AWS)                       │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                      API GATEWAY                             │
│              (Rate Limiting, Auth, Routing)                  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                      BACKEND SERVICES                        │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Main API Server (Node.js/Express)        │   │
│  │  ┌─────────────┐  ┌──────────┐  ┌────────────────┐  │   │
│  │  │   Auth      │  │  Orders  │  │   Products     │  │   │
│  │  │  Service    │  │  Service │  │   Service      │  │   │
│  │  └─────────────┘  └──────────┘  └────────────────┘  │   │
│  │  ┌─────────────┐  ┌──────────┐  ┌────────────────┐  │   │
│  │  │  Payment    │  │  Chat    │  │   Notification │  │   │
│  │  │  Service    │  │  Service │  │   Service      │  │   │
│  │  └─────────────┘  └──────────┘  └────────────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                      DATA LAYER                              │
│  ┌──────────────┐  ┌─────────────┐  ┌──────────────────┐   │
│  │  PostgreSQL  │  │    Redis    │  │   Elasticsearch  │   │
│  │  (Main DB)   │  │   (Cache)   │  │     (Search)     │   │
│  └──────────────┘  └─────────────┘  └──────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                         │
│  ┌──────────────┐  ┌─────────────┐  ┌──────────────────┐   │
│  │   Stripe     │  │  Google     │  │   AWS S3 /       │   │
│  │  (Payments)  │  │   APIs      │  │  Cloudinary      │   │
│  └──────────────┘  └─────────────┘  └──────────────────┘   │
│  ┌──────────────┐  ┌─────────────┐  ┌──────────────────┐   │
│  │  SendGrid    │  │  Socket.io  │  │    Firebase      │   │
│  │   (Email)    │  │  (WebSocket)│  │  (Push Notify)   │   │
│  └──────────────┘  └─────────────┘  └──────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Frontend архитектура (React + TypeScript)

### Структура папок Frontend

```
frontend/
├── public/
│   ├── favicon.ico
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── api/                    # API клиенты и запросы
│   │   ├── client.ts          # Axios instance с interceptors
│   │   ├── auth.api.ts        # Authentication endpoints
│   │   ├── users.api.ts       # Users endpoints
│   │   ├── products.api.ts    # Products endpoints
│   │   ├── orders.api.ts      # Orders endpoints
│   │   └── chat.api.ts        # Chat endpoints
│   ├── assets/                # Статические файлы
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   ├── components/            # React компоненты
│   │   ├── common/           # Общие компоненты
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.test.tsx
│   │   │   │   └── Button.module.css
│   │   │   ├── Input/
│   │   │   ├── Modal/
│   │   │   ├── Avatar/
│   │   │   ├── Rating/
│   │   │   ├── Badge/
│   │   │   └── Loader/
│   │   ├── layout/           # Layout компоненты
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   ├── Sidebar/
│   │   │   └── Navigation/
│   │   ├── features/         # Feature-specific компоненты
│   │   │   ├── auth/
│   │   │   │   ├── LoginForm/
│   │   │   │   ├── RegisterForm/
│   │   │   │   └── GoogleAuthButton/
│   │   │   ├── map/
│   │   │   │   ├── MapView/
│   │   │   │   ├── SellerMarker/
│   │   │   │   └── SellerCard/
│   │   │   ├── products/
│   │   │   │   ├── ProductCard/
│   │   │   │   ├── ProductList/
│   │   │   │   ├── ProductForm/
│   │   │   │   └── ProductGallery/
│   │   │   ├── orders/
│   │   │   │   ├── OrderCard/
│   │   │   │   ├── OrderList/
│   │   │   │   ├── OrderDetails/
│   │   │   │   └── CustomOrderForm/
│   │   │   ├── chat/
│   │   │   │   ├── ChatWindow/
│   │   │   │   ├── MessageList/
│   │   │   │   ├── MessageInput/
│   │   │   │   └── ConversationList/
│   │   │   └── profile/
│   │   │       ├── ProfileCard/
│   │   │       ├── ProfileEdit/
│   │   │       └── AvatarUpload/
│   │   └── widgets/          # Сложные виджеты
│   │       ├── NotificationCenter/
│   │       └── RoleSwitcher/
│   ├── hooks/                # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useWebSocket.ts
│   │   ├── useDebounce.ts
│   │   ├── useIntersectionObserver.ts
│   │   ├── useLocalStorage.ts
│   │   └── useGoogleMaps.ts
│   ├── pages/                # Страницы приложения
│   │   ├── public/
│   │   │   ├── LandingPage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   └── RegisterPage.tsx
│   │   ├── buyer/
│   │   │   ├── MapPage.tsx
│   │   │   ├── OrdersPage.tsx
│   │   │   ├── OrderDetailsPage.tsx
│   │   │   └── ProfilePage.tsx
│   │   ├── seller/
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── ProductsPage.tsx
│   │   │   ├── CustomOrdersPage.tsx
│   │   │   └── StatisticsPage.tsx
│   │   └── shared/
│   │       ├── ChatPage.tsx
│   │       ├── NotFoundPage.tsx
│   │       └── ErrorPage.tsx
│   ├── store/                # State management (Redux/Zustand)
│   │   ├── slices/
│   │   │   ├── authSlice.ts
│   │   │   ├── userSlice.ts
│   │   │   ├── productsSlice.ts
│   │   │   ├── ordersSlice.ts
│   │   │   └── chatSlice.ts
│   │   ├── middleware/
│   │   │   └── socketMiddleware.ts
│   │   └── store.ts
│   ├── types/                # TypeScript типы
│   │   ├── user.types.ts
│   │   ├── product.types.ts
│   │   ├── order.types.ts
│   │   ├── chat.types.ts
│   │   └── api.types.ts
│   ├── utils/                # Утилиты
│   │   ├── validators.ts
│   │   ├── formatters.ts
│   │   ├── constants.ts
│   │   ├── helpers.ts
│   │   └── dateUtils.ts
│   ├── styles/               # Глобальные стили
│   │   ├── globals.css
│   │   ├── variables.css
│   │   └── themes/
│   │       ├── light.css
│   │       └── dark.css
│   ├── locales/              # Переводы (i18n)
│   │   ├── en/
│   │   │   └── translation.json
│   │   ├── ru/
│   │   │   └── translation.json
│   │   └── i18n.ts
│   ├── routes/               # Конфигурация роутинга
│   │   ├── AppRouter.tsx
│   │   ├── PrivateRoute.tsx
│   │   └── routes.config.ts
│   ├── contexts/             # React Contexts
│   │   ├── AuthContext.tsx
│   │   ├── ThemeContext.tsx
│   │   └── RoleContext.tsx
│   ├── services/             # Бизнес-логика
│   │   ├── AuthService.ts
│   │   ├── WebSocketService.ts
│   │   ├── NotificationService.ts
│   │   └── GeolocationService.ts
│   ├── config/               # Конфигурации
│   │   ├── env.ts
│   │   └── maps.config.ts
│   ├── App.tsx              # Главный компонент
│   ├── main.tsx             # Entry point
│   └── vite-env.d.ts
├── .env.example
├── .env.local
├── .eslintrc.json
├── .prettierrc
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── package.json
└── README.md
```

## Backend архитектура (Node.js + Express + TypeScript)

### Структура папок Backend

```
backend/
├── src/
│   ├── config/               # Конфигурации
│   │   ├── database.ts      # DB connection config
│   │   ├── redis.ts         # Redis config
│   │   ├── passport.ts      # Passport strategies
│   │   ├── stripe.ts        # Stripe config
│   │   └── env.ts           # Environment variables
│   ├── controllers/          # Route controllers
│   │   ├── auth.controller.ts
│   │   ├── users.controller.ts
│   │   ├── products.controller.ts
│   │   ├── orders.controller.ts
│   │   ├── customOrders.controller.ts
│   │   ├── reviews.controller.ts
│   │   ├── chat.controller.ts
│   │   └── notifications.controller.ts
│   ├── services/             # Business logic
│   │   ├── auth.service.ts
│   │   ├── users.service.ts
│   │   ├── products.service.ts
│   │   ├── orders.service.ts
│   │   ├── customOrders.service.ts
│   │   ├── payment.service.ts
│   │   ├── email.service.ts
│   │   ├── notification.service.ts
│   │   ├── storage.service.ts  # S3/Cloudinary
│   │   └── search.service.ts   # Elasticsearch
│   ├── repositories/         # Data access layer
│   │   ├── user.repository.ts
│   │   ├── product.repository.ts
│   │   ├── order.repository.ts
│   │   └── review.repository.ts
│   ├── models/               # Prisma models (generated)
│   │   └── index.ts
│   ├── middleware/           # Express middleware
│   │   ├── auth.middleware.ts      # JWT verification
│   │   ├── validate.middleware.ts  # Request validation
│   │   ├── error.middleware.ts     # Error handling
│   │   ├── rateLimit.middleware.ts # Rate limiting
│   │   ├── upload.middleware.ts    # File uploads
│   │   └── logger.middleware.ts    # Request logging
│   ├── routes/               # API routes
│   │   ├── index.ts
│   │   ├── auth.routes.ts
│   │   ├── users.routes.ts
│   │   ├── products.routes.ts
│   │   ├── orders.routes.ts
│   │   ├── customOrders.routes.ts
│   │   ├── reviews.routes.ts
│   │   ├── chat.routes.ts
│   │   └── notifications.routes.ts
│   ├── validators/           # Request validation schemas
│   │   ├── auth.validator.ts
│   │   ├── user.validator.ts
│   │   ├── product.validator.ts
│   │   └── order.validator.ts
│   ├── types/                # TypeScript types
│   │   ├── express.d.ts     # Express type extensions
│   │   ├── auth.types.ts
│   │   ├── user.types.ts
│   │   └── api.types.ts
│   ├── utils/                # Utilities
│   │   ├── jwt.util.ts
│   │   ├── password.util.ts
│   │   ├── email.util.ts
│   │   ├── logger.util.ts
│   │   └── helpers.util.ts
│   ├── sockets/              # WebSocket handlers
│   │   ├── socket.ts        # Socket.io setup
│   │   ├── chat.socket.ts
│   │   └── notification.socket.ts
│   ├── jobs/                 # Background jobs
│   │   ├── queue.ts         # Bull queue setup
│   │   ├── email.job.ts
│   │   └── cleanup.job.ts
│   ├── constants/            # Constants
│   │   ├── orderStatus.ts
│   │   ├── userRoles.ts
│   │   └── errorCodes.ts
│   ├── errors/               # Custom errors
│   │   ├── AppError.ts
│   │   ├── NotFoundError.ts
│   │   ├── UnauthorizedError.ts
│   │   └── ValidationError.ts
│   ├── tests/                # Tests
│   │   ├── unit/
│   │   ├── integration/
│   │   └── e2e/
│   ├── app.ts               # Express app setup
│   └── server.ts            # Server entry point
├── prisma/
│   ├── schema.prisma        # Database schema
│   ├── migrations/          # DB migrations
│   └── seed.ts              # Seed data
├── .env.example
├── .env
├── .eslintrc.json
├── .prettierrc
├── tsconfig.json
├── package.json
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## Архитектурные паттерны

### 1. MVC Pattern (Model-View-Controller)

```
Request → Route → Controller → Service → Repository → Database
                      ↓
                   Response
```

- **Routes**: определяют endpoints и связывают их с контроллерами
- **Controllers**: обрабатывают HTTP запросы/ответы, вызывают сервисы
- **Services**: содержат бизнес-логику
- **Repositories**: абстракция над БД, CRUD операции
- **Models**: Prisma модели (схема данных)

### 2. Service Layer Pattern

Сервисы инкапсулируют бизнес-логику:

```typescript
// auth.service.ts
class AuthService {
  async register(data: RegisterDto) {
    // 1. Validate user data
    // 2. Hash password
    // 3. Create user in DB
    // 4. Send verification email
    // 5. Return tokens
  }

  async login(credentials: LoginDto) {
    // 1. Find user
    // 2. Verify password
    // 3. Generate tokens
    // 4. Update last login
    // 5. Return tokens
  }
}
```

### 3. Repository Pattern

Репозитории абстрагируют доступ к данным:

```typescript
// user.repository.ts
class UserRepository {
  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  async create(data: CreateUserDto): Promise<User> {
    return prisma.user.create({ data });
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    return prisma.user.update({ where: { id }, data });
  }
}
```

### 4. Dependency Injection

```typescript
// Передача зависимостей через конструктор
class OrderService {
  constructor(
    private orderRepository: OrderRepository,
    private paymentService: PaymentService,
    private emailService: EmailService
  ) {}

  async createOrder(data: CreateOrderDto) {
    const order = await this.orderRepository.create(data);
    await this.paymentService.processPayment(order);
    await this.emailService.sendOrderConfirmation(order);
    return order;
  }
}
```

## Поток данных (Data Flow)

### Регистрация пользователя

```
User Input → React Form → Validation (Zod) → API Call (Axios)
                                                    ↓
                                            Backend Route
                                                    ↓
                                            Auth Middleware
                                                    ↓
                                            Validation Middleware
                                                    ↓
                                            Auth Controller
                                                    ↓
                                            Auth Service
                                           ↙        ↓        ↘
                        Hash Password   Create User   Send Email
                                                    ↓
                                            Generate JWT
                                                    ↓
                                          Return Response
                                                    ↓
                                        Frontend receives tokens
                                                    ↓
                                          Store in localStorage
                                                    ↓
                                        Update Redux/Context
                                                    ↓
                                          Redirect to Dashboard
```

### Создание заказа

```
User selects product → Add to cart → Checkout → Payment
                                                    ↓
                                        Stripe API (Payment Intent)
                                                    ↓
                                        Payment confirmed
                                                    ↓
                                        Backend creates order
                                                    ↓
                                        Update DB (Order, OrderItem)
                                                    ↓
                            Send notifications (WebSocket + Email)
                                                    ↓
                            Update UI (Real-time via Socket.io)
```

## Система безопасности

### Аутентификация

1. **JWT (JSON Web Tokens)**
   ```
   Access Token: Short-lived (15 min), stored in memory
   Refresh Token: Long-lived (7 days), httpOnly cookie
   ```

2. **Google OAuth 2.0**
   ```
   User → Google Login → Authorization Code → Backend exchanges for tokens
   → Backend creates/finds user → Returns JWT
   ```

3. **Token Refresh Flow**
   ```
   Access Token expired → Interceptor catches 401
   → Sends refresh token → Backend validates refresh token
   → Returns new access token → Retry original request
   ```

### Авторизация

```typescript
// Role-based access control
enum UserRole {
  BUYER = 'BUYER',
  SELLER = 'SELLER',
  ADMIN = 'ADMIN'
}

// Middleware для проверки роли
const requireRole = (roles: UserRole[]) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ForbiddenError();
    }
    next();
  };
};

// Использование
router.post('/products',
  authenticate,
  requireRole([UserRole.SELLER]),
  createProduct
);
```

### Защита данных

- **Encryption at rest**: Sensitive data encrypted in DB
- **Encryption in transit**: TLS/SSL for all connections
- **Password hashing**: bcrypt with salt rounds
- **Input sanitization**: Prevent SQL injection, XSS
- **Rate limiting**: Prevent brute force attacks
- **CORS**: Whitelist allowed origins
- **CSP**: Content Security Policy headers

## Real-time коммуникация

### WebSocket (Socket.io) Architecture

```
Client connects → Authenticate via JWT → Join rooms by userId
                                                    ↓
                                        Subscribe to events:
                                        - new_message
                                        - order_update
                                        - notification
                                                    ↓
                            Server emits events to specific rooms
                                                    ↓
                            Client receives and updates UI
```

### Chat Implementation

```typescript
// Client-side
socket.on('new_message', (message) => {
  dispatch(addMessage(message));
  showNotification(message);
});

// Server-side
io.to(`user_${recipientId}`).emit('new_message', message);
```

### Notification System

```
Order status changes → Service emits event → Notification service
                                                    ↓
                                        Store in DB (Notifications table)
                                                    ↓
                                        Send via WebSocket (real-time)
                                                    ↓
                                        Queue email job (Bull)
                                                    ↓
                                        Send push notification (Firebase)
```

## Кеширование и оптимизация

### Redis Caching Strategy

```typescript
// Cache-aside pattern
async getActiveСеллеrs() {
  const cached = await redis.get('sellers:active');
  if (cached) return JSON.parse(cached);

  const sellers = await db.getActiveSellers();
  await redis.setex('sellers:active', 300, JSON.stringify(sellers)); // 5 min TTL
  return sellers;
}
```

### Cache Invalidation

```
User updates product → Service updates DB
                              ↓
                    Invalidate related caches:
                    - product:{id}
                    - seller:{sellerId}:products
                    - products:active
```

### Database Optimization

1. **Indexes**: На часто запрашиваемые поля
   ```sql
   CREATE INDEX idx_orders_buyer_id ON orders(buyer_id);
   CREATE INDEX idx_products_seller_id ON products(seller_id);
   CREATE INDEX idx_users_email ON users(email);
   ```

2. **Database Queries**: Используем select только нужные поля
   ```typescript
   prisma.user.findMany({
     select: { id: true, name: true, avatar: true }
   });
   ```

3. **Pagination**: Cursor-based для больших списков
   ```typescript
   prisma.product.findMany({
     take: 20,
     skip: 1,
     cursor: { id: lastProductId }
   });
   ```

## Масштабирование

### Horizontal Scaling

```
Load Balancer (Nginx/AWS ALB)
        ↓
┌───────┼───────┐
│       │       │
API-1  API-2  API-3  (Multiple instances)
│       │       │
└───────┼───────┘
        ↓
Shared Redis (Session store)
Shared PostgreSQL (Data)
```

### Microservices (Future)

```
API Gateway
    ↓
┌───┴───┬───────┬─────────┬──────────┐
│       │       │         │          │
Auth  Orders Products  Payments  Notifications
Service Service Service  Service   Service
```

Каждый сервис:
- Независимая БД (или схема)
- Независимый деплой
- Коммуникация через Message Queue (RabbitMQ/Kafka)
