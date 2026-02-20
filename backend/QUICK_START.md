# 🚀 Quick Start Guide - Pluribus Backend

## ✅ Что уже сделано:

- ✅ Зависимости установлены (623 packages)
- ✅ Backend проект готов к запуску

---

## 📋 Варианты запуска:

### Вариант 1: С Docker (Рекомендуется)

#### Шаг 1: Установить Docker Desktop

Если Docker не установлен:

**macOS:**
```bash
# Скачайте и установите Docker Desktop:
# https://www.docker.com/products/docker-desktop
```

После установки проверьте:
```bash
docker --version
```

#### Шаг 2: Запустить контейнеры

```bash
cd "/Users/dmitrijpucka/Documents/ClaudeCode projects/Pluribus"

# Запустить PostgreSQL и Redis
docker compose -f docker-compose.dev.yml up -d

# Проверить что запустились
docker ps
```

#### Шаг 3: Создать миграции

```bash
cd backend
npx prisma migrate dev --name init
```

#### Шаг 4: Запустить Backend

```bash
npm run dev
```

Backend будет доступен на: **http://localhost:5000**

---

### Вариант 2: Без Docker (Локально)

Нужно установить PostgreSQL и Redis локально.

#### Установка PostgreSQL:

**macOS (через Homebrew):**
```bash
brew install postgresql@15
brew services start postgresql@15

# Создать базу данных
createdb pluribus
```

#### Установка Redis:

**macOS (через Homebrew):**
```bash
brew install redis
brew services start redis
```

#### Обновить .env файл:

```bash
cd backend
# Открыть .env и изменить DATABASE_URL
DATABASE_URL="postgresql://YOUR_USERNAME@localhost:5432/pluribus?schema=public"
```

#### Запустить Backend:

```bash
npx prisma migrate dev --name init
npm run dev
```

---

### Вариант 3: Использовать готовую облачную БД

Можно использовать бесплатные сервисы:

1. **PostgreSQL**: [Neon](https://neon.tech) или [Supabase](https://supabase.com) (бесплатно)
2. **Redis**: [Upstash](https://upstash.com) (бесплатно)

#### Настройка:

1. Зарегистрироваться и создать базы данных
2. Получить connection strings
3. Обновить `.env`:

```env
DATABASE_URL="postgresql://user:password@hostname/database"
REDIS_HOST=your-redis-host
REDIS_PORT=6379
REDIS_PASSWORD=your-password
```

4. Запустить:
```bash
cd backend
npx prisma migrate dev --name init
npm run dev
```

---

## 🧪 Тестирование API

### 1. Проверить что сервер запущен:

```bash
curl http://localhost:5000/health
```

Должен вернуть:
```json
{
  "status": "ok",
  "timestamp": "...",
  "uptime": 12.345,
  "environment": "development"
}
```

---

### 2. Зарегистрировать пользователя:

**Через curl:**
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User",
    "role": "seller",
    "country": "USA",
    "city": "New York"
  }'
```

**Или через браузер:**
Откройте: http://localhost:5000/api/v1

---

### 3. Использовать Prisma Studio (UI для БД):

```bash
cd backend
npx prisma studio
```

Откроется **http://localhost:5555** с графическим интерфейсом для просмотра данных в базе.

---

## 📁 Структура проекта:

```
backend/
├── src/
│   ├── config/          # Конфигурации (CORS, Logger, Database)
│   ├── controllers/     # Controllers (Auth, User, Product)
│   ├── services/        # Business Logic
│   ├── routes/          # API Routes
│   ├── middleware/      # Middleware (Auth, ErrorHandler)
│   ├── validators/      # Joi Validation Schemas
│   ├── utils/           # Utilities (JWT, Password, Response)
│   ├── types/           # TypeScript Types
│   └── server.ts        # Main Server File
├── prisma/
│   └── schema.prisma    # Database Schema
├── .env                 # Environment Variables
├── package.json
└── README.md
```

---

## 🛠️ Полезные команды:

```bash
# Запустить dev сервер
npm run dev

# Собрать production build
npm run build

# Запустить production
npm start

# Lint код
npm run lint

# Format код
npm run format

# Prisma Studio (UI для БД)
npx prisma studio

# Создать новую миграцию
npx prisma migrate dev --name migration_name

# Просмотр логов
# Логи находятся в backend/logs/
tail -f logs/combined.log
```

---

## 📚 Документация:

- **Полный API Testing Guide**: `TEST_API.md`
- **Backend README**: `README.md`
- **Progress Report**: `../Documentation/BACKEND_PROGRESS.md`

---

## ❓ Частые проблемы:

### "Port 5000 already in use"

```bash
# Найти процесс
lsof -i :5000

# Убить процесс
kill -9 PID

# Или изменить PORT в .env
PORT=5001
```

---

### "Cannot connect to database"

Проверьте что:
1. PostgreSQL запущен (Docker или локально)
2. DATABASE_URL в .env корректный
3. База данных `pluribus` создана

---

### "Prisma Client not generated"

```bash
npx prisma generate
```

---

## 🎯 Следующие шаги:

1. ✅ Backend запущен на http://localhost:5000
2. ⏳ Протестировать API endpoints (см. TEST_API.md)
3. ⏳ Подключить Frontend к Backend
4. ⏳ Реализовать остальные features (Orders, Chat, etc.)

---

## 💡 Рекомендация:

**Самый простой способ начать:**

1. Установить Docker Desktop
2. Запустить `docker compose -f docker-compose.dev.yml up -d`
3. Запустить `cd backend && npx prisma migrate dev --name init`
4. Запустить `npm run dev`
5. Открыть http://localhost:5000/health

---

**🚀 Backend готов к работе!**

Если возникнут вопросы - я помогу!
