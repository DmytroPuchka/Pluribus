# Pluribus - Шпаргалка команд

Все самые важные команды в одном месте.

---

## ⚡ Быстрый старт

```bash
# Автоматический запуск всего
./start.sh

# Остановка всего
./stop.sh
```

---

## 🚀 Запуск компонентов

```bash
# Backend
cd backend && npm run dev

# Frontend
cd frontend && npm run dev

# Admin Frontend
cd admin-frontend && npm run dev

# Prisma Studio
cd backend && npx prisma studio
```

---

## 🔐 Тестовые аккаунты

**Frontend (все роли):**
```
buyer@test.com       | password123 | BUYER
seller@test.com      | password123 | SELLER
both@test.com        | password123 | SELLER
admin@pluribus.com   | password123 | ADMIN
```

**Admin Panel (только ADMIN):**
```
admin@pluribus.com   | password123 | ADMIN ⭐
```

---

## 🌐 URL сервисов

```
http://localhost:3000        # Frontend (Main Site)
http://localhost:3001        # Admin Panel ⭐ NEW!
http://localhost:5001        # Backend API
http://localhost:5001/health # Health check
http://localhost:5555        # Prisma Studio
```

---

## 🛡️ Admin Panel

**Setup (первый запуск):**
```bash
cd admin-frontend
./setup.sh
```

**Доступ:**
- URL: http://localhost:3001
- Требуется роль: ADMIN (не seller, не buyer)
- Email: admin@pluribus.com
- Password: password123

**Возможности:**
- Dashboard - статистика платформы
- Users Management - управление пользователями
- Products Management - управление продуктами
- User activation/deactivation
- Product activation/deactivation
- Delete users/products

**Логи:**
```bash
tail -f /tmp/pluribus-admin.log
```

---

## 🧪 API тесты

```bash
# Health check
curl http://localhost:5001/health

# Все продукты
curl http://localhost:5001/api/v1/products

# Login
curl -X POST http://localhost:5001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"seller@test.com","password":"password123"}'

# Register
curl -X POST http://localhost:5001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email":"test@example.com",
    "password":"password123",
    "name":"Test User",
    "role":"buyer",
    "country":"USA",
    "city":"New York"
  }'
```

---

## 🗄️ База данных

```bash
# Prisma миграции
cd backend
npx prisma migrate dev --name init
npx prisma generate

# PostgreSQL CLI
psql pluribus

# Команды в psql:
\dt                          # Список таблиц
SELECT * FROM users;         # Все пользователи
SELECT * FROM products;      # Все продукты
\q                          # Выход
```

---

## 🔧 Управление сервисами

```bash
# PostgreSQL
brew services start postgresql@15
brew services stop postgresql@15
brew services restart postgresql@15

# Redis
brew services start redis
brew services stop redis

# Статус всех сервисов
brew services list
```

---

## 🛑 Остановка процессов

```bash
# По порту
lsof -i :5001  # Найти PID
kill -9 <PID>  # Убить процесс

# Все порты проекта
lsof -i :3000  # Frontend
lsof -i :5001  # Backend
lsof -i :5555  # Prisma Studio
```

---

## 📝 Логи

```bash
# Backend логи
tail -f backend/logs/combined.log
tail -f backend/logs/error.log

# Если запущено через start.sh
tail -f /tmp/pluribus-backend.log
tail -f /tmp/pluribus-frontend.log
```

---

## 🔍 Полезные команды

```bash
# Проверить что все работает
curl http://localhost:5001/health
curl http://localhost:3000

# Найти процесс по имени
ps aux | grep node

# Проверить порты
netstat -an | grep LISTEN | grep -E "3000|5001|5555"

# Очистить кеш npm
cd backend && rm -rf node_modules package-lock.json && npm install
cd frontend && rm -rf node_modules package-lock.json && npm install
```

---

## 📦 NPM скрипты

### Backend:
```bash
npm run dev          # Development mode
npm run build        # Build для production
npm start            # Production mode
npm run lint         # ESLint check
npm run format       # Prettier format
npm run prisma:studio # Prisma Studio
```

### Frontend:
```bash
npm run dev          # Development mode
npm run build        # Build для production
npm start            # Production mode
npm run lint         # ESLint check
```

---

## 🐛 Частые проблемы

```bash
# Port already in use
lsof -i :5001 && kill -9 $(lsof -t -i:5001)

# Database connection failed
brew services restart postgresql@15

# Prisma Client not found
cd backend && npx prisma generate

# Permission denied для скриптов
chmod +x start.sh stop.sh
```

---

## 📚 Документация

```
START.md                    # Полная инструкция
backend/TEST_API.md         # API endpoints
backend/TEST_ACCOUNTS.md    # Тестовые аккаунты
Documentation/PROGRESS.md   # Прогресс Frontend
Documentation/BACKEND_PROGRESS.md # Прогресс Backend
```

---

## 🎯 Сценарии

### 1. Первый запуск
```bash
./start.sh
open http://localhost:3000
```

### 2. Просмотр данных
```bash
cd backend && npx prisma studio
# Откроется на http://localhost:5555
```

### 3. Создание продукта (через API)
```bash
# 1. Login
TOKEN=$(curl -s -X POST http://localhost:5001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"seller@test.com","password":"password123"}' \
  | jq -r '.data.accessToken')

# 2. Create product
curl -X POST http://localhost:5001/api/v1/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title":"Test Product",
    "description":"Test description",
    "photos":["https://example.com/photo.jpg"],
    "price":99.99,
    "category":"ELECTRONICS",
    "stockQuantity":10
  }'
```

---

**💡 Совет:** Добавьте этот файл в закладки для быстрого доступа!
