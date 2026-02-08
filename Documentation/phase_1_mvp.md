# Pluribus - Phase 1: MVP (Минимально жизнеспособный продукт)

## Обзор

**Pluribus** - международная платформа для связи отправителей (sellers) и получателей товаров (buyers).

**Цель Phase 1:** Создать базовую рабочую версию с ключевыми функциями, позволяющую пользователям регистрироваться, управлять товарами, просматривать продавцов на карте и создавать заказы.

**Временные рамки:** 8-12 недель

**Целевая аудитория:** Международные пользователи (EU/USA/Asia)

---

## 1. Authentication System

### Описание
Система аутентификации и авторизации на основе JWT токенов с поддержкой email/password.

### Требования

#### 1.1 Регистрация (Email/Password)
- **Функциональность:**
  - Форма с полями: email, password, confirm_password
  - Валидация email (формат, уникальность)
  - Валидация пароля (минимум 8 символов, наличие заглавных букв и цифр)
  - Хеширование пароля (bcrypt)
  - Отправка подтверждающего письма (optional для MVP)
  - Создание профиля пользователя по умолчанию

- **Ответы API:**
  - 201: Created - успешная регистрация
  - 400: Bad Request - невалидные данные
  - 409: Conflict - email уже зарегистрирован

#### 1.2 Логин
- **Функциональность:**
  - Форма с полями: email, password
  - Проверка учетных данных
  - Генерация JWT токенов
  - Возврат access и refresh токенов
  - Сохранение refresh токена в secure cookie (HttpOnly)

- **JWT Структура:**
  - **Access Token:** TTL = 15 минут
    ```json
    {
      "sub": "user_id",
      "email": "user@example.com",
      "role": "buyer|seller",
      "iat": 1234567890,
      "exp": 1234568790
    }
    ```
  - **Refresh Token:** TTL = 7 дней
    ```json
    {
      "sub": "user_id",
      "type": "refresh",
      "iat": 1234567890,
      "exp": 1234700000
    }
    ```

#### 1.3 Защищенные Routes
- **Middleware:**
  - Проверка access токена в Authorization header
  - Валидация JWT подписи
  - Проверка срока действия токена
  - Автоматическое обновление токена (если refresh валиден)
  - Возврат 401 Unauthorized при отсутствии/невалидном токене

- **Защищённые endpoints:**
  - Все операции с профилем
  - Все операции с товарами (seller)
  - Все операции с заказами
  - Доступ к избранному/корзине

#### 1.4 Базовый Профиль Пользователя
- **Структура данных:**
  ```json
  {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "buyer|seller",
    "avatar": "https://...",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
  ```

### API Endpoints

| Метод | Endpoint | Описание | Auth |
|-------|----------|---------|------|
| POST | `/api/auth/register` | Регистрация нового пользователя | ✗ |
| POST | `/api/auth/login` | Логин пользователя | ✗ |
| POST | `/api/auth/refresh` | Обновление access токена | ✗ |
| POST | `/api/auth/logout` | Выход (инвалидирование refresh токена) | ✓ |
| GET | `/api/auth/me` | Получить текущего пользователя | ✓ |

### Приоритет: **CRITICAL** (1)

### Зависимости: Нет

### Технологический стек
- **Backend:** Node.js + Express.js
- **Database:** PostgreSQL + Sequelize ORM
- **Auth:** JWT (jsonwebtoken), bcryptjs
- **Validation:** joi / express-validator
- **Email:** nodemailer (optional для MVP)

---

## 2. User Profiles (Базовые)

### Описание
Система профилей пользователей с поддержкой редактирования основной информации и выбора роли.

### Требования

#### 2.1 Просмотр Профиля
- **Функциональность:**
  - GET собственного профиля (защищённый)
  - GET чужого профиля (public данные)
  - Кэширование для performance

- **Public данные:**
  - firstName, lastName
  - avatar
  - role
  - location (страна, город)
  - rating (для будущих версий, сейчас null)
  - createdAt

- **Private данные (только для владельца):**
  - email
  - phone (если заполнен)
  - полные настройки

#### 2.2 Редактирование Профиля
- **Изменяемые поля:**
  - firstName, lastName (1-100 символов)
  - country (выбор из списка)
  - city (1-100 символов)
  - phone (опциональный, международный формат)
  - avatar (загрузка одного изображения)
  - bio (опциональный, макс 500 символов)

- **Валидация:**
  - Уникальность email (при изменении)
  - Формат phone
  - Размер avatar (макс 5MB)
  - Форматы изображений (JPG, PNG, WebP)

#### 2.3 Выбор Роли
- **Функциональность:**
  - Выбор role при регистрации (buyer / seller)
  - Изменение role в любое время
  - При смене на seller - требуется одобрение (опциональное для MVP)
  - Возможность быть одновременно buyer и seller (флаг)

- **Роли:**
  - **buyer:** может просматривать товары, создавать заказы
  - **seller:** может создавать товары, управлять заказами

### API Endpoints

| Метод | Endpoint | Описание | Auth |
|-------|----------|---------|------|
| GET | `/api/users/me` | Получить свой профиль | ✓ |
| GET | `/api/users/:id` | Получить публичный профиль | ✗ |
| PUT | `/api/users/me` | Обновить свой профиль | ✓ |
| PUT | `/api/users/me/avatar` | Загрузить аватар | ✓ |
| PUT | `/api/users/me/role` | Изменить роль | ✓ |

### Структура Данных

```json
{
  "id": "uuid",
  "email": "john@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": ["buyer", "seller"],
  "avatar": "https://cdn.pluribus.io/avatars/uuid.jpg",
  "country": "United States",
  "city": "New York",
  "phone": "+1234567890",
  "bio": "Professional seller with 2+ years experience",
  "rating": null,
  "reviewsCount": 0,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

### Приоритет: **CRITICAL** (2)

### Зависимости
- Authentication System ✓

### Технологический стек
- **File Storage:** AWS S3 / Cloudinary
- **Image Processing:** Sharp
- **Validation:** joi

---

## 3. Product Management (для Seller)

### Описание
Система управления товарами для продавцов (CRUD операции).

### Требования

#### 3.1 Создание Товара (CREATE)
- **Необходимые поля:**
  - title (1-200 символов)
  - description (1-2000 символов)
  - price (decimal, > 0)
  - category (выбор из списка: electronics, clothing, furniture, etc.)
  - quantity (integer, >= 0)
  - photo (одно изображение)

- **Опциональные поля:**
  - sku (артикул)
  - weight (в кг)
  - dimensions (длина, ширина, высота)
  - condition (new / used / refurbished)

- **Валидация:**
  - Все обязательные поля заполнены
  - Типы данных корректны
  - Photo размер макс 5MB
  - Price > 0
  - Quantity >= 0

#### 3.2 Просмотр Товара (READ)
- **Функциональность:**
  - GET все товары продавца (защищённый)
  - GET один товар (публичный)
  - Пагинация (20 товаров на странице)
  - Фильтрация по статусу (active / archived / deleted)
  - Поиск по названию/описанию

- **Данные:**
  - title, description, price, category
  - photo URL
  - quantity (только для владельца)
  - seller info (firstName, lastName, avatar)
  - createdAt, updatedAt

#### 3.3 Редактирование Товара (UPDATE)
- **Изменяемые поля:**
  - title, description, price, category
  - quantity
  - photo (замена)
  - condition
  - weight, dimensions

- **Ограничения:**
  - Может редактировать только владелец
  - Нельзя изменить sellerId
  - Нельзя изменить createdAt

#### 3.4 Удаление Товара (DELETE)
- **Функциональность:**
  - Soft delete (isDeleted флаг)
  - Сохранение истории
  - Проверка активных заказов перед удалением
  - Только владелец может удалить

#### 3.5 Список Товаров Продавца
- **Функциональность:**
  - Только для владельца (защищённый)
  - Отображение активных товаров
  - Счетчик просмотров и заказов
  - Быстрое редактирование (inline)

### API Endpoints

| Метод | Endpoint | Описание | Auth |
|-------|----------|---------|------|
| POST | `/api/products` | Создать товар | ✓ Seller |
| GET | `/api/products` | Получить все товары (публичный поиск) | ✗ |
| GET | `/api/products/my` | Получить свои товары | ✓ Seller |
| GET | `/api/products/:id` | Получить один товар | ✗ |
| PUT | `/api/products/:id` | Обновить товар | ✓ Seller |
| DELETE | `/api/products/:id` | Удалить товар | ✓ Seller |
| POST | `/api/products/:id/photo` | Загрузить фото товара | ✓ Seller |

### Структура Данных

```json
{
  "id": "uuid",
  "sellerId": "uuid",
  "title": "iPhone 14 Pro",
  "description": "Perfect condition, original box included",
  "price": 899.99,
  "currency": "USD",
  "category": "electronics",
  "quantity": 5,
  "photo": "https://cdn.pluribus.io/products/uuid.jpg",
  "sku": "IPHONE14PRO-001",
  "weight": 0.203,
  "dimensions": {
    "length": 15.0,
    "width": 7.5,
    "height": 0.8
  },
  "condition": "new",
  "isActive": true,
  "isDeleted": false,
  "viewsCount": 42,
  "ordersCount": 3,
  "seller": {
    "id": "uuid",
    "firstName": "John",
    "lastName": "Doe",
    "avatar": "https://..."
  },
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

### Приоритет: **CRITICAL** (3)

### Зависимости
- Authentication System ✓
- User Profiles ✓

### Технологический стек
- **File Storage:** AWS S3 / Cloudinary
- **Image Processing:** Sharp
- **Database:** PostgreSQL с полнотекстовым поиском
- **Validation:** joi

---

## 4. Map View (для Buyer)

### Описание
Интерактивная карта для отображения активных продавцов с их товарами.

### Требования

#### 4.1 Интеграция Google Maps API
- **Функциональность:**
  - Встраивание Google Maps в UI
  - Zoom с 1 (весь мир) до 20 (улица)
  - Начальный зум: 4 (континент)
  - Начальный центр: координаты Европы (48.8, 2.3)

#### 4.2 Показ Продавцов на Карте
- **Функциональность:**
  - Маркеры для каждого продавца
  - Маркер содержит: аватар, имя, количество товаров
  - Цветовая разметка (gold - топ продавцы, серый - обычные)
  - Фильтр по категориям товаров
  - Поиск по названию города/страны

- **Данные для отправки:**
  - Только активные продавцы (>=1 активного товара)
  - Продавцы из видимой области карты
  - Максимум 50 маркеров одновременно

#### 4.3 Кластеризация Маркеров
- **Функциональность:**
  - Google Maps Clustering Library
  - Группировка при зуме < 12
  - Показ количества продавцов в кластере
  - Клик на кластер - увеличение зума на кластер

#### 4.4 Клик на Продавца
- **Функциональность:**
  - Открытие карточки продавца в боковой панели
  - Отображение информации:
    - Аватар, имя
    - Рейтинг (для будущего)
    - Количество товаров
    - Страна/город
    - Кнопка "Просмотр товаров"
  - Кнопка "Просмотр товаров" переводит на страницу товаров продавца

#### 4.5 Фильтры на Карте
- **Функциональность:**
  - Фильтр по категориям (multi-select)
  - Фильтр по стране
  - Фильтр по ценовому диапазону (для товаров)
  - Фильтр по рейтингу (для будущего)
  - Сохранение фильтров в URL (deep linking)

### API Endpoints

| Метод | Endpoint | Описание | Auth |
|-------|----------|---------|------|
| GET | `/api/map/sellers` | Получить продавцов в bounds | ✗ |
| GET | `/api/map/sellers/:id` | Получить инфо продавца | ✗ |
| GET | `/api/map/filters` | Получить доступные фильтры | ✗ |

### Query Parameters для `/api/map/sellers`
```
?bounds=north,south,east,west
&categories=electronics,clothing
&country=United%20States
&priceMin=0
&priceMax=1000
&limit=50
```

### Структура Данных (Ответ)

```json
{
  "sellers": [
    {
      "id": "uuid",
      "firstName": "John",
      "lastName": "Doe",
      "avatar": "https://...",
      "country": "United States",
      "city": "New York",
      "latitude": 40.7128,
      "longitude": -74.0060,
      "rating": null,
      "productCount": 12,
      "categories": ["electronics", "clothing"]
    }
  ],
  "bounds": {
    "north": 50.0,
    "south": 40.0,
    "east": -70.0,
    "west": -80.0
  }
}
```

### Приоритет: **HIGH** (4)

### Зависимости
- Authentication System ✓
- User Profiles ✓
- Product Management ✓
- Примечание: для MVP можно использовать фиксированные координаты от адреса пользователя

### Технологический стек
- **Карты:** Google Maps API v3
- **Clustering:** MarkerClusterer Plus
- **Geocoding:** Google Geocoding API (для преобразования адреса в координаты)
- **Frontend:** React + react-google-maps

---

## 5. Orders (Базовый флоу)

### Описание
Система управления заказами с базовыми статусами и функционалом.

### Требования

#### 5.1 Создание Заказа
- **Функциональность:**
  - Buyer выбирает товар
  - Указывает количество
  - Вводит адрес доставки (опциональный для MVP)
  - Создание заказа со статусом "pending"
  - Уведомление продавцу

- **Обязательные поля:**
  - productId
  - quantity
  - buyerId (автоматически из JWT)
  - sellerId (из товара)

- **Опциональные поля:**
  - shippingAddress
  - specialInstructions
  - notes

- **Валидация:**
  - Product существует
  - quantity > 0
  - quantity <= product.quantity (в наличии)
  - Buyer не может заказать у себя (если buyer == seller)

#### 5.2 Просмотр Заказов
- **Функциональность:**
  - Buyer видит свои заказы (как покупатель)
  - Seller видит заказы на его товары (как продавец)
  - Пагинация (20 заказов на странице)
  - Фильтрация по статусу
  - Сортировка (новые сначала)

- **Данные в списке:**
  - Order ID
  - Product info (название, фото, цена)
  - Quantity
  - Total price
  - Status
  - Buyer/Seller info
  - Created date
  - Updated date

#### 5.3 Базовые Статусы

| Статус | Кто устанавливает | Описание |
|--------|------------------|---------|
| pending | Система | Заказ создан, ожидает ответа продавца |
| accepted | Seller | Продавец согласился, готовит товар |
| rejected | Seller | Продавец отказал |
| completed | Seller | Товар отправлен/готов к получению |
| cancelled | Buyer | Buyer отменил заказ (только в статусе pending) |

#### 5.4 Детальная Информация о Заказе
- **Информация по заказу:**
  - Order ID
  - Product детали
  - Quantity и Total price
  - Buyer информация
  - Seller информация
  - Shipping address
  - Timeline событий (created, accepted, completed)
  - Special instructions

#### 5.5 Действия с Заказом
- **Для Seller:**
  - Accept заказ (pending → accepted)
  - Reject заказ (pending → rejected)
  - Mark as completed (accepted → completed)
  - View buyer контакты

- **Для Buyer:**
  - Cancel заказ (только если pending)
  - Leave review (после completed, для будущего)
  - Contact seller (для будущего)

### API Endpoints

| Метод | Endpoint | Описание | Auth |
|-------|----------|---------|------|
| POST | `/api/orders` | Создать заказ | ✓ Buyer |
| GET | `/api/orders` | Получить мои заказы | ✓ |
| GET | `/api/orders/:id` | Получить детали заказа | ✓ |
| PUT | `/api/orders/:id/status` | Изменить статус | ✓ Seller |
| PUT | `/api/orders/:id` | Обновить заказ | ✓ Owner |
| DELETE | `/api/orders/:id` | Отменить заказ | ✓ Buyer |

### Query Parameters для `GET /api/orders`
```
?status=pending,accepted,completed
&role=buyer|seller
&page=1
&limit=20
&sort=-createdAt
```

### Структура Данных

```json
{
  "id": "uuid",
  "buyerId": "uuid",
  "sellerId": "uuid",
  "productId": "uuid",
  "quantity": 2,
  "totalPrice": 1799.98,
  "currency": "USD",
  "status": "pending",
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "country": "United States",
    "zipCode": "10001"
  },
  "specialInstructions": "Please handle with care",
  "product": {
    "id": "uuid",
    "title": "iPhone 14 Pro",
    "price": 899.99,
    "photo": "https://..."
  },
  "buyer": {
    "id": "uuid",
    "firstName": "Jane",
    "lastName": "Smith",
    "avatar": "https://..."
  },
  "seller": {
    "id": "uuid",
    "firstName": "John",
    "lastName": "Doe",
    "avatar": "https://..."
  },
  "timeline": [
    {
      "status": "pending",
      "timestamp": "2024-01-01T00:00:00Z",
      "message": "Order created"
    },
    {
      "status": "accepted",
      "timestamp": "2024-01-01T02:00:00Z",
      "message": "Seller accepted order"
    }
  ],
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T02:00:00Z"
}
```

### Приоритет: **HIGH** (5)

### Зависимости
- Authentication System ✓
- User Profiles ✓
- Product Management ✓

### Технологический стек
- **Notifications:** WebSocket / Email
- **Database:** PostgreSQL с транзакциями

---

## 6. UI/UX (MVP дизайн)

### Описание
Минимальный веб-интерфейс для всех основных функций.

### Требования

#### 6.1 Landing Page
- **Компоненты:**
  - Header с логотипом и навигацией (Login / Register)
  - Hero section (заголовок, подзаголовок, CTA кнопки)
  - Features section (3-4 основных преимущества)
  - Call to action (Sign up)
  - Footer (links, social, copyright)

- **Информация:**
  - Краткое описание платформы
  - Как это работает (3 шага)
  - Преимущества (быстро, безопасно, интернационально)

- **Mobile responsive:** Да

#### 6.2 Authentication Pages
- **Register Page:**
  - Form: email, password, confirm password
  - Role selection (buyer / seller)
  - Terms & Conditions checkbox
  - Register button
  - Link "Already have an account? Login"

- **Login Page:**
  - Form: email, password
  - Remember me checkbox
  - Login button
  - Link "Don't have an account? Register"
  - Forgot password link (optional для MVP)

#### 6.3 Buyer Dashboard
- **Layout:**
  - Sidebar с навигацией (Home, Map, Orders, Profile)
  - Main content area

- **Страницы:**
  1. **Home (после логина)**
     - Welcome message
     - Quick stats (active orders, reviews)
     - Recent orders list
     - Recent sellers viewed

  2. **Map View (главная фича для buyer)**
     - Google Map во весь экран (с сайдбаром)
     - Маркеры продавцов
     - Фильтры слева
     - Инфо карточка при клике на маркер

  3. **Orders**
     - Таблица/карточки заказов
     - Фильтр по статусу
     - Клик на заказ - детали
     - Кнопки действий (cancel, review)

  4. **Profile**
     - Редактирование: имя, страна, город, аватар
     - Текущая роль
     - Опция переключиться на seller

#### 6.4 Seller Dashboard
- **Layout:**
  - Sidebar с навигацией (Home, Products, Orders, Profile)
  - Main content area

- **Страницы:**
  1. **Home**
     - Statistics (active products, total orders, revenue)
     - Recent orders
     - Quick actions (Add product)

  2. **Products**
     - Таблица товаров с actions (edit, delete, view)
     - Кнопка "Add new product"
     - Фильтр по статусу
     - Поиск по названию

  3. **Add/Edit Product**
     - Form с полями (title, description, price, category, photo)
     - Preview фото
     - Save и Cancel кнопки
     - Валидация в реальном времени

  4. **Orders**
     - Таблица заказов
     - Фильтр по статусу (pending, accepted, completed)
     - Action buttons (accept, reject, mark as completed)
     - Детали заказа в модальном окне

  5. **Profile**
     - Редактирование: имя, страна, город, аватар
     - Текущая роль
     - Опция переключиться на buyer

#### 6.5 Базовая Навигация
- **Header:**
  - Логотип (clickable -> home)
  - Navigation menu (для логиненых пользователей)
  - User avatar с dropdown (Profile, Settings, Logout)
  - Mobile menu (hamburger)

- **Sidebar (для dashboard):**
  - Navigation items с иконками
  - Active state indication
  - Collapsible на мобильных

- **Breadcrumbs:** На внутренних страницах

### Структура Страниц (Sitemap)

```
/
├── /login
├── /register
├── /dashboard
│   ├── /dashboard/home
│   ├── /dashboard/map
│   ├── /dashboard/orders
│   ├── /dashboard/orders/:id
│   └── /dashboard/profile
├── /seller
│   ├── /seller/dashboard
│   ├── /seller/products
│   ├── /seller/products/add
│   ├── /seller/products/:id/edit
│   ├── /seller/orders
│   ├── /seller/orders/:id
│   └── /seller/profile
└── /public
    ├── /public/sellers/:id
    └── /public/products/:id
```

### Design System

#### Цвета (MVP)
- **Primary:** #007AFF (Blue)
- **Secondary:** #34C759 (Green)
- **Danger:** #FF3B30 (Red)
- **Warning:** #FF9500 (Orange)
- **Background:** #F5F5F5
- **Text:** #333333
- **Border:** #CCCCCC

#### Типография
- **Headings:** Sans-serif (14-32px)
- **Body:** Sans-serif (14-16px)
- **Mono:** Monospace (12-14px)

#### Spacing
- Base unit: 8px
- Padding: 8px, 16px, 24px, 32px
- Margin: 8px, 16px, 24px, 32px

#### Components
- Button (primary, secondary, danger sizes: sm, md, lg)
- Input (text, email, password, number, select)
- Dropdown / Select
- Modal
- Toast notification
- Loading spinner
- Empty state
- Error message

### Приоритет: **HIGH** (6)

### Зависимости
- Authentication System ✓
- User Profiles ✓
- Product Management ✓
- Map View ✓
- Orders ✓

### Технологический стек
- **Frontend:** React 18+
- **Styling:** Tailwind CSS / CSS Modules
- **State Management:** Redux Toolkit / Zustand
- **HTTP Client:** Axios
- **Routing:** React Router v6
- **Icons:** React Icons / Feather Icons
- **UI Components:** shadcn/ui или MaterialUI (optional)

---

## Приоритизация Фич

### Critical Path (Обязательно для MVP)
1. **Authentication System** - базовая функциональность
2. **User Profiles** - основной функционал пользователя
3. **Product Management** - core feature для seller
4. **Orders** - core feature для buyer
5. **UI/UX** - интерфейс для всего выше

### High Priority (Важно, но может быть упрощено)
6. **Map View** - основной компонент для buyer, может начинаться с простого списка

---

## Зависимости Между Фичами

```
Landing Page (UI/UX)
    ↓
Authentication System
    ├── → User Profiles
    │       ├── → Product Management
    │       │       ├── → Orders
    │       │       └── → Map View
    │       └── → Orders
    └── → Dashboard UI (UI/UX)
```

**Граф зависимостей:**
- Authentication → User Profiles
- Authentication → Dashboard
- User Profiles → Product Management
- User Profiles → Orders
- Product Management → Orders
- Product Management → Map View
- User Profiles → Map View

---

## Технологический Стек (MVP)

### Backend
- **Runtime:** Node.js 20+
- **Framework:** Express.js 4.18+
- **Database:** PostgreSQL 14+
- **ORM:** Sequelize 6+ или TypeORM
- **Authentication:** jsonwebtoken, bcryptjs
- **Validation:** joi или express-validator
- **File Storage:** AWS S3 или Cloudinary
- **Email:** nodemailer (optional)

### Frontend
- **Framework:** React 18+
- **State Management:** Redux Toolkit или Zustand
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Routing:** React Router v6
- **Maps:** react-google-maps, @googlemaps/js-api-loader
- **Icons:** React Icons
- **Build Tool:** Vite

### DevOps
- **Version Control:** Git + GitHub
- **CI/CD:** GitHub Actions
- **Hosting:** Vercel (frontend) + Heroku/Railway (backend)
- **Database Hosting:** AWS RDS / Supabase / Render
- **Environment:** .env для конфигурации

---

## Тестирование (MVP)

### Backend Tests
- **Unit Tests:** Jest (70% coverage)
  - Auth service (регистрация, логин, валидация токена)
  - User service (CRUD профиля)
  - Product service (CRUD товара)
  - Order service (создание, обновление статуса)

- **Integration Tests:** Supertest
  - API endpoints
  - Database transactions
  - File uploads

### Frontend Tests
- **Unit Tests:** Vitest
  - Components (form, buttons, cards)
  - Utilities (validation, formatting)

- **E2E Tests:** Cypress / Playwright
  - Register → Login flow
  - Create product flow
  - Create order flow

### Coverage Target: 60% для MVP

---

## Развертывание (MVP)

### Процесс
1. **Development** → Feature branches
2. **Testing** → CI/CD pipeline
3. **Staging** → Pre-production environment
4. **Production** → Automated deployment

### Инструменты
- GitHub Actions для CI/CD
- Docker для контейнеризации (optional для MVP)
- Environment variables в .env

---

## Безопасность (MVP)

### Основные Меры
- ✓ HTTPS везде
- ✓ JWT токены (short-lived access, refresh via cookie)
- ✓ CORS configured
- ✓ Input validation & sanitization
- ✓ SQL injection prevention (ORM)
- ✓ Rate limiting на auth endpoints
- ✓ Пароли хешированы (bcryptjs)
- ✓ Secure cookies (HttpOnly, SameSite)
- ⚠ CSRF protection (future)
- ⚠ 2FA (future)

---

## Метрики Успеха (MVP)

### Функциональные
- [ ] 100% критических фич реализовано
- [ ] Все API endpoints работают
- [ ] Регистрация/Login работают
- [ ] Продавцы могут создавать товары
- [ ] Buyers видят товары на карте
- [ ] Заказы создаются и обновляются

### Производительности
- [ ] API response time < 500ms
- [ ] Frontend load time < 3s
- [ ] Map loads маркеры < 1s
- [ ] Database queries < 100ms

### Качество
- [ ] 60%+ test coverage
- [ ] No critical bugs
- [ ] All endpoints have error handling
- [ ] Graceful error messages

---

## Timeline MVP (Примерный)

| Неделя | Фичи | Статус |
|--------|------|--------|
| 1-2 | Auth System + Base Infrastructure | ⚠️ |
| 3 | User Profiles | ⚠️ |
| 4-5 | Product Management | ⚠️ |
| 6-7 | Orders System | ⚠️ |
| 8 | Map View + UI/UX | ⚠️ |
| 9-10 | Testing + Bug Fixes | ⚠️ |
| 11-12 | Deployment + Documentation | ⚠️ |

**Итого:** 8-12 недель

---

## Документация & Resources

### Backend API Documentation
- OpenAPI/Swagger для всех endpoints
- Примеры запросов/ответов
- Error codes & messages

### Frontend Documentation
- Component library (Storybook optional)
- Setup & development guide
- Deployment instructions

### Database Schema
- ER diagram
- Table descriptions
- Migrations

---

## Post-MVP Features (для Phase 2)

- [ ] Messaging система (chat между buyer и seller)
- [ ] Reviews & Ratings
- [ ] Payment integration (Stripe/PayPal)
- [ ] Advanced search & filters
- [ ] Wishlist & favorites
- [ ] Notifications (push, email)
- [ ] Mobile app (React Native)
- [ ] Admin panel
- [ ] Analytics dashboard
- [ ] Seller verification system
- [ ] Return/Refund system
- [ ] Multi-language support (i18n)

---

## Контактная Информация & Поддержка

**Leads:**
- Backend Lead: [TBD]
- Frontend Lead: [TBD]
- DevOps Lead: [TBD]
- Product Manager: [TBD]

**Документация:**
- GitHub Wiki: [TBD]
- Design System: [TBD]
- API Docs: [TBD]

---

**Версия документа:** 1.0
**Дата создания:** 2024-01-01
**Последнее обновление:** 2024-01-01
**Статус:** DRAFT
