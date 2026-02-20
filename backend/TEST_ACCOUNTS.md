# Test Accounts - Pluribus Backend

**Дата создания**: 20 февраля 2026

## 🔐 Тестовые аккаунты

### 1. Anna Buyer (Покупатель)
- **Email**: `buyer@test.com`
- **Password**: `password123`
- **Role**: BUYER
- **Name**: Anna Buyer
- **Country**: Ukraine
- **City**: Kyiv
- **ID**: `14113cb0-6445-42b5-bc30-dc0c18518799`

### 2. John Seller (Продавец)
- **Email**: `seller@test.com`
- **Password**: `password123`
- **Role**: SELLER
- **Name**: John Seller
- **Country**: USA
- **City**: New York
- **Delivery Countries**: USA, Canada, Mexico, UK, Germany, France, Ukraine
- **ID**: `4b07c292-d105-400c-a7ea-78216c8afbeb`
- **Products**: 1 (iPhone 15 Pro Max)

### 3. Maria Martinez (Продавец)
- **Email**: `both@test.com`
- **Password**: `password123`
- **Role**: SELLER
- **Name**: Maria Martinez
- **Country**: Spain
- **City**: Barcelona
- **Delivery Countries**: Spain, Portugal, France, Italy, Germany, Netherlands, Belgium, UK, Ukraine
- **ID**: `4692e956-aeb3-41fd-b92d-615d02d034ca`
- **Products**: 3 (Olive Oil, Leather Handbag, Ceramic Vase)

---

## 📦 Созданные продукты (4 total)

### От John Seller (seller@test.com):

#### 1. iPhone 15 Pro Max
- **ID**: `2859ea26-e506-43eb-9206-bf345a360d37`
- **Price**: $1,199.99
- **Category**: ELECTRONICS
- **Stock**: 5

### От Maria Martinez (both@test.com):

#### 2. Premium Spanish Olive Oil
- **ID**: `1cec1463-5190-424e-9fed-b703ff1efb3e`
- **Price**: $24.99
- **Category**: FOOD
- **Stock**: 50

#### 3. Handmade Leather Handbag
- **ID**: `ae44a26d-6cbd-4edf-9481-5f78f903d993`
- **Price**: $149.99
- **Category**: FASHION
- **Stock**: 15

#### 4. Mediterranean Ceramic Vase
- **ID**: `659b3965-aed3-4b8d-96b0-25a62203f989`
- **Price**: $79.99
- **Category**: HOME
- **Stock**: 20

---

## 🧪 Примеры запросов

### Login as Buyer
```bash
curl -X POST http://localhost:5001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"buyer@test.com","password":"password123"}'
```

### Login as Seller (John)
```bash
curl -X POST http://localhost:5001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"seller@test.com","password":"password123"}'
```

### Login as Seller (Maria)
```bash
curl -X POST http://localhost:5001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"both@test.com","password":"password123"}'
```

### Get All Products
```bash
curl http://localhost:5001/api/v1/products
```

### Filter by Category
```bash
# ELECTRONICS
curl "http://localhost:5001/api/v1/products?category=ELECTRONICS"

# FOOD
curl "http://localhost:5001/api/v1/products?category=FOOD"

# FASHION
curl "http://localhost:5001/api/v1/products?category=FASHION"

# HOME
curl "http://localhost:5001/api/v1/products?category=HOME"
```

### Search Products
```bash
curl "http://localhost:5001/api/v1/products?search=leather"
curl "http://localhost:5001/api/v1/products?search=iphone"
curl "http://localhost:5001/api/v1/products?search=olive"
```

### Get Products by Seller
```bash
# John's products
curl "http://localhost:5001/api/v1/products?sellerId=4b07c292-d105-400c-a7ea-78216c8afbeb"

# Maria's products
curl "http://localhost:5001/api/v1/products?sellerId=4692e956-aeb3-41fd-b92d-615d02d034ca"
```

---

## 📊 Статистика базы данных

| Таблица | Записей |
|---------|---------|
| Users | 3 |
| Products | 4 |
| Orders | 0 |
| Reviews | 0 |
| Messages | 0 |
| RefreshTokens | 3 |

---

## 🎯 Для Frontend интеграции

### Замените в Frontend:

**Старый mock код** (Frontend):
```typescript
// frontend/src/data/mockUsers.ts
export const TEST_ACCOUNTS = [
  { email: 'buyer@test.com', password: 'test123', ... },
  { email: 'seller@test.com', password: 'test123', ... },
  { email: 'both@test.com', password: 'test123', ... },
];
```

**На реальный API** (Backend):
```typescript
// Используйте эти учетные данные с реальным Backend:
email: 'buyer@test.com'
password: 'password123'

email: 'seller@test.com'
password: 'password123'

email: 'both@test.com'
password: 'password123'
```

### API Base URL:
```typescript
const API_BASE_URL = 'http://localhost:5001/api/v1';
```

---

## 🗺️ Роли и права доступа

| Роль | Может создавать продукты | Может покупать | Доступ к dashboard |
|------|---------------------------|----------------|---------------------|
| BUYER | ❌ | ✅ | ✅ (Orders only) |
| SELLER | ✅ | ✅ | ✅ (Full access) |
| ADMIN | ✅ | ✅ | ✅ (Admin panel) |

---

## 📝 Примечания

1. Все пароли: `password123` (минимум 8 символов)
2. JWT tokens действуют:
   - Access Token: 15 минут
   - Refresh Token: 7 дней
3. После 15 минут нужно использовать refresh token для получения нового access token
4. Все endpoint'ы защищены rate limiting (100 req/15min)
5. Auth endpoints: строгий rate limit (5 req/15min)

---

## 🔍 Просмотр данных

### Prisma Studio (Visual UI)
```bash
cd backend
npx prisma studio
# Откроется на http://localhost:5555
```

### PostgreSQL CLI
```bash
psql pluribus

# Просмотр пользователей
SELECT id, email, name, role, country, city FROM users;

# Просмотр продуктов
SELECT id, title, price, category, "stockQuantity" FROM products;
```

---

**✅ Все аккаунты созданы и готовы к использованию!**
