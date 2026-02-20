# Pluribus - International Shipping Platform

Платформа для международной доставки товаров, связывающая отправителей и получателей.

---

## 🚀 Быстрый старт

### Автоматический запуск всех компонентов:

```bash
./start.sh
```

### Остановка всех компонентов:

```bash
./stop.sh
```

### Ручной запуск:

```bash
# 1. Backend (в терминале 1)
cd backend && npm run dev

# 2. Frontend (в терминале 2)
cd frontend && npm run dev

# 3. Prisma Studio - опционально (в терминале 3)
cd backend && npx prisma studio
```

---

## 📊 Доступные URL

| Сервис | URL | Описание |
|--------|-----|----------|
| **Frontend** | http://localhost:3000 | Next.js приложение |
| **Backend API** | http://localhost:5001 | REST API |
| **API Docs** | http://localhost:5001/api/v1 | Список endpoints |
| **Prisma Studio** | http://localhost:5555 | UI для базы данных |

---

## 🔐 Тестовые аккаунты

| Email | Password | Role | Описание |
|-------|----------|------|----------|
| `buyer@test.com` | `password123` | BUYER | Покупатель (Ukraine) |
| `seller@test.com` | `password123` | SELLER | Продавец (USA) |
| `both@test.com` | `password123` | SELLER | Продавец (Spain) |

---

## 📁 Структура проекта

```
Pluribus/
├── frontend/              # Next.js 15 Frontend
│   ├── src/
│   │   ├── app/          # App Router pages
│   │   ├── components/   # React компоненты
│   │   ├── store/        # Zustand state management
│   │   └── data/         # Mock данные
│   └── package.json
│
├── backend/              # Node.js + Express Backend
│   ├── src/
│   │   ├── controllers/  # Route handlers
│   │   ├── services/     # Business logic
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Auth, errors
│   │   └── config/       # Configurations
│   ├── prisma/
│   │   └── schema.prisma # Database schema
│   └── package.json
│
├── Documentation/        # Документация проекта
├── start.sh             # Скрипт запуска
├── stop.sh              # Скрипт остановки
└── START.md             # Подробная инструкция
```

---

## 🛠️ Технологии

### Frontend
- **Next.js 15** - React framework с App Router
- **TypeScript** - Типизация
- **Tailwind CSS** - Стилизация
- **shadcn/ui** - UI компоненты
- **Zustand** - State management
- **React Hook Form** - Формы
- **Zod** - Валидация
- **Leaflet** - Интерактивные карты

### Backend
- **Node.js 20** - Runtime
- **Express** - Web framework
- **TypeScript** - Типизация
- **Prisma ORM** - Database ORM
- **PostgreSQL 15** - База данных
- **Redis** - Кеширование
- **JWT** - Аутентификация
- **Joi** - Валидация
- **Winston** - Логирование

---

## 📚 Документация

- **[START.md](./START.md)** - Подробная инструкция по запуску
- **[backend/TEST_API.md](./backend/TEST_API.md)** - Тестирование API endpoints
- **[backend/TEST_ACCOUNTS.md](./backend/TEST_ACCOUNTS.md)** - Тестовые аккаунты
- **[backend/QUICK_START.md](./backend/QUICK_START.md)** - Backend setup
- **[Documentation/PROGRESS.md](./Documentation/PROGRESS.md)** - Прогресс Frontend
- **[Documentation/BACKEND_PROGRESS.md](./Documentation/BACKEND_PROGRESS.md)** - Прогресс Backend

---

## ✅ Статус проекта

| Компонент | Статус | Прогресс |
|-----------|--------|----------|
| Frontend MVP | ✅ Завершено | 100% |
| Backend Setup | ✅ Завершено | 100% |
| Database Schema | ✅ Готово | 10 моделей |
| Authentication | ✅ Работает | JWT + Refresh |
| User Management | ✅ Работает | CRUD endpoints |
| Product Management | ✅ Работает | CRUD endpoints |
| Frontend Integration | ⏳ В процессе | 0% |

**Текущий этап:** Phase 3 - Frontend Integration

---

## 🧪 Тестирование

### Проверка Backend:
```bash
# Health check
curl http://localhost:5001/health

# Получить продукты
curl http://localhost:5001/api/v1/products

# Login
curl -X POST http://localhost:5001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"seller@test.com","password":"password123"}'
```

### Проверка Frontend:
1. Откройте http://localhost:3000
2. Перейдите на /products
3. Попробуйте фильтры и поиск
4. Войдите через /login

---

## 📦 Установка зависимостей

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

---

## 🗄️ База данных

### Создание миграций:
```bash
cd backend
npx prisma migrate dev --name migration_name
```

### Prisma Studio:
```bash
cd backend
npx prisma studio
# Откроется на http://localhost:5555
```

### PostgreSQL CLI:
```bash
psql pluribus

# Просмотр таблиц
\dt

# Просмотр данных
SELECT * FROM users;
SELECT * FROM products;
```

---

## 🔧 Управление сервисами

### PostgreSQL:
```bash
# Запустить
brew services start postgresql@15

# Остановить
brew services stop postgresql@15

# Статус
brew services list | grep postgres
```

### Redis:
```bash
# Запустить
brew services start redis

# Остановить
brew services stop redis

# Статус
brew services list | grep redis
```

---

## 🎯 Следующие шаги

1. ✅ Frontend MVP - Завершено
2. ✅ Backend Setup - Завершено
3. ⏳ Frontend Integration - В процессе
   - [ ] Подключить Frontend к Backend API
   - [ ] Заменить mock данные
   - [ ] Настроить NextAuth.js
   - [ ] Image upload (Cloudinary)
4. ⏳ Real-time Features
   - [ ] Chat system (Socket.io)
   - [ ] Notifications
5. ⏳ Testing
   - [ ] Unit tests
   - [ ] Integration tests
   - [ ] E2E tests

---

## 🐛 Troubleshooting

### "Port already in use"
```bash
lsof -i :5001  # Backend
lsof -i :3000  # Frontend
kill -9 <PID>
```

### "Database connection failed"
```bash
brew services restart postgresql@15
```

### "Prisma Client not found"
```bash
cd backend
npx prisma generate
```

---

## 📄 Лицензия

MIT

---

## 👥 Команда

- Frontend Developer: ✅ MVP Complete
- Backend Developer: ✅ Setup Complete
- Full-stack Integration: ⏳ In Progress

---

**🚀 Pluribus - делаем международную доставку простой и доступной!**
