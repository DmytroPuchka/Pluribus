# Backend API Testing Guide

## 🚀 Пошаговая инструкция для запуска и тестирования

### Шаг 1: Установка зависимостей

```bash
cd "/Users/dmitrijpucka/Documents/ClaudeCode projects/Pluribus/backend"
npm install
```

### Шаг 2: Запуск Docker контейнеров

```bash
# Вернуться в корень проекта
cd ..

# Запустить PostgreSQL и Redis
docker-compose -f docker-compose.dev.yml up -d

# Проверить что контейнеры запущены
docker ps
```

Должны увидеть:
- `pluribus-postgres-dev` на порту 5432
- `pluribus-redis-dev` на порту 6379

### Шаг 3: Создание миграции базы данных

```bash
cd backend
npx prisma migrate dev --name init
```

Это создаст все таблицы в PostgreSQL.

### Шаг 4: Запуск Backend сервера

```bash
npm run dev
```

Должны увидеть:
```
🚀 Pluribus Backend API started
📍 Environment: development
🌐 Server running on http://localhost:5000
📚 API docs: http://localhost:5000/api/v1
❤️  Health check: http://localhost:5000/health
🔐 Auth endpoints: http://localhost:5000/api/v1/auth
```

---

## ✅ Тестирование Endpoints

### 1. Health Check

```bash
curl http://localhost:5000/health
```

**Ожидаемый ответ:**
```json
{
  "status": "ok",
  "timestamp": "2026-02-20T...",
  "uptime": 12.345,
  "environment": "development"
}
```

---

### 2. API Info

```bash
curl http://localhost:5000/api/v1
```

**Ожидаемый ответ:**
```json
{
  "message": "Pluribus API",
  "version": "v1",
  "endpoints": {
    "health": "/health",
    "auth": "/api/v1/auth",
    "users": "/api/v1/users",
    "products": "/api/v1/products",
    "orders": "/api/v1/orders"
  }
}
```

---

## 🔐 Authentication Endpoints

### 3. Register New User (Seller)

```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "seller@test.com",
    "password": "password123",
    "name": "John Seller",
    "role": "seller",
    "country": "USA",
    "city": "New York",
    "phone": "+1234567890",
    "bio": "Professional seller",
    "deliveryCountries": ["USA", "Canada"]
  }'
```

**Ожидаемый ответ:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid-here",
      "email": "seller@test.com",
      "name": "John Seller",
      "role": "SELLER",
      "country": "USA",
      "city": "New York",
      ...
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  },
  "meta": {
    "timestamp": "2026-02-20T..."
  }
}
```

**Сохраните accessToken для следующих запросов!**

---

### 4. Register New User (Buyer)

```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "buyer@test.com",
    "password": "password123",
    "name": "Jane Buyer",
    "role": "buyer",
    "country": "USA",
    "city": "Los Angeles"
  }'
```

---

### 5. Login

```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "seller@test.com",
    "password": "password123"
  }'
```

---

### 6. Refresh Token

```bash
curl -X POST http://localhost:5000/api/v1/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "YOUR_REFRESH_TOKEN_HERE"
  }'
```

---

### 7. Logout

```bash
curl -X POST http://localhost:5000/api/v1/auth/logout \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "YOUR_REFRESH_TOKEN_HERE"
  }'
```

---

## 👤 User Endpoints

### 8. Get Current User Profile (Protected)

```bash
curl http://localhost:5000/api/v1/users/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
```

---

### 9. Update Current User Profile (Protected)

```bash
curl -X PUT http://localhost:5000/api/v1/users/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "bio": "Updated bio text",
    "phone": "+1987654321",
    "avatar": "https://example.com/avatar.jpg"
  }'
```

---

### 10. Get User by ID (Public)

```bash
curl http://localhost:5000/api/v1/users/USER_ID_HERE
```

---

### 11. Get User Statistics (Public)

```bash
curl http://localhost:5000/api/v1/users/USER_ID_HERE/stats
```

**Ожидаемый ответ:**
```json
{
  "success": true,
  "data": {
    "userId": "uuid",
    "role": "SELLER",
    "productsCount": 0,
    "ordersAsBuyer": 0,
    "ordersAsSeller": 0,
    "reviewsGiven": 0,
    "reviewsReceived": 0,
    "averageRating": 0
  }
}
```

---

## 📦 Product Endpoints

### 12. Create Product (Seller Only)

```bash
curl -X POST http://localhost:5000/api/v1/products \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "iPhone 15 Pro Max",
    "description": "Brand new iPhone 15 Pro Max, 256GB, Titanium Blue",
    "photos": [
      "https://example.com/iphone1.jpg",
      "https://example.com/iphone2.jpg"
    ],
    "price": 1199.99,
    "currency": "USD",
    "category": "ELECTRONICS",
    "tags": ["smartphone", "apple", "iphone"],
    "stockQuantity": 5
  }'
```

**Ожидаемый ответ:**
```json
{
  "success": true,
  "data": {
    "id": "product-uuid",
    "sellerId": "seller-uuid",
    "title": "iPhone 15 Pro Max",
    "price": "1199.99",
    "category": "ELECTRONICS",
    "isAvailable": true,
    "seller": {
      "id": "seller-uuid",
      "name": "John Seller",
      "country": "USA",
      "city": "New York"
    },
    "createdAt": "2026-02-20T..."
  }
}
```

---

### 13. Get All Products (Public)

```bash
# Без фильтров
curl http://localhost:5000/api/v1/products

# С фильтрами
curl "http://localhost:5000/api/v1/products?category=ELECTRONICS&minPrice=500&maxPrice=2000&page=1&limit=10"

# С поиском
curl "http://localhost:5000/api/v1/products?search=iphone"
```

**Ожидаемый ответ:**
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "iPhone 15 Pro Max",
      "price": "1199.99",
      "category": "ELECTRONICS",
      "seller": {
        "id": "uuid",
        "name": "John Seller"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1,
    "hasNext": false,
    "hasPrev": false
  }
}
```

---

### 14. Get Product by ID (Public)

```bash
curl http://localhost:5000/api/v1/products/PRODUCT_ID_HERE
```

---

### 15. Update Product (Seller Only - Own Products)

```bash
curl -X PUT http://localhost:5000/api/v1/products/PRODUCT_ID_HERE \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "price": 1099.99,
    "stockQuantity": 3,
    "isAvailable": true
  }'
```

---

### 16. Delete Product (Seller Only - Own Products)

```bash
curl -X DELETE http://localhost:5000/api/v1/products/PRODUCT_ID_HERE \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
```

---

## 🛠️ Альтернативные способы тестирования

### Вариант 1: VS Code REST Client Extension

Установите расширение "REST Client" и создайте файл `test.http`:

```http
### Health Check
GET http://localhost:5000/health

### Register Seller
POST http://localhost:5000/api/v1/auth/register
Content-Type: application/json

{
  "email": "seller@test.com",
  "password": "password123",
  "name": "John Seller",
  "role": "seller",
  "country": "USA",
  "city": "New York"
}

### Login
POST http://localhost:5000/api/v1/auth/login
Content-Type: application/json

{
  "email": "seller@test.com",
  "password": "password123"
}

### Get Current User
GET http://localhost:5000/api/v1/users/me
Authorization: Bearer YOUR_TOKEN_HERE
```

---

### Вариант 2: Postman

1. Откройте Postman
2. Import коллекцию (можно создать из примеров выше)
3. Создайте переменную `accessToken` для хранения токена
4. Тестируйте endpoints

---

### Вариант 3: Prisma Studio (UI для базы данных)

```bash
cd backend
npx prisma studio
```

Откроется http://localhost:5555 с UI для просмотра и редактирования данных в БД.

---

## 🐛 Troubleshooting

### Проблема: "Cannot connect to database"

```bash
# Проверить что PostgreSQL запущен
docker ps | grep postgres

# Если не запущен
docker-compose -f docker-compose.dev.yml up -d postgres

# Проверить логи
docker logs pluribus-postgres-dev
```

---

### Проблема: "Port 5000 already in use"

```bash
# Найти процесс использующий порт 5000
lsof -i :5000

# Убить процесс
kill -9 PID

# Или изменить порт в .env
PORT=5001
```

---

### Проблема: "Prisma schema not found"

```bash
# Убедитесь что находитесь в папке backend
cd backend

# Запустите prisma generate
npx prisma generate
```

---

## ✅ Checklist для проверки

- [ ] Health check работает
- [ ] Register создает пользователя
- [ ] Login возвращает токены
- [ ] Protected endpoints требуют Authorization
- [ ] Seller может создавать products
- [ ] Buyer НЕ может создавать products (403 Forbidden)
- [ ] Pagination работает
- [ ] Фильтры работают (category, price range)
- [ ] Search работает
- [ ] User statistics отображаются
- [ ] Refresh token работает

---

## 📝 Полезные команды

```bash
# Проверить статус Docker контейнеров
docker ps

# Остановить все контейнеры
docker-compose -f docker-compose.dev.yml down

# Удалить volumes (очистить БД)
docker-compose -f docker-compose.dev.yml down -v

# Просмотр логов backend
npm run dev

# Просмотр логов PostgreSQL
docker logs pluribus-postgres-dev

# Подключиться к PostgreSQL через CLI
docker exec -it pluribus-postgres-dev psql -U postgres -d pluribus

# Просмотр таблиц в БД
\dt
```

---

## 🎉 Готово!

Если все работает - Backend успешно запущен и готов к интеграции с Frontend!
