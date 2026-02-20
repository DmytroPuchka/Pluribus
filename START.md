# 🚀 Pluribus - Quick Start Guide

Быстрый запуск всех компонентов проекта для тестирования.

---

## ⚡ Быстрый старт (3 команды)

```bash
# 1. Запустить Backend
cd "/Users/dmitrijpucka/Documents/ClaudeCode projects/Pluribus/backend"
npm run dev

# 2. Запустить Frontend (в новом терминале)
cd "/Users/dmitrijpucka/Documents/ClaudeCode projects/Pluribus/frontend"
npm run dev

# 3. (Опционально) Открыть Prisma Studio (в новом терминале)
cd "/Users/dmitrijpucka/Documents/ClaudeCode projects/Pluribus/backend"
npx prisma studio
```

---

## 📋 Полная инструкция

### 1️⃣ Запуск Backend

```bash
cd "/Users/dmitrijpucka/Documents/ClaudeCode projects/Pluribus/backend"
npm run dev
```

**Ожидаемый результат:**
```
✅ Database connected successfully
🚀 Pluribus Backend API started
🌐 Server running on http://localhost:5001
```

**Проверка:**
```bash
curl http://localhost:5001/health
```

---

### 2️⃣ Запуск Frontend

**В новом терминале:**

```bash
cd "/Users/dmitrijpucka/Documents/ClaudeCode projects/Pluribus/frontend"
npm run dev
```

**Ожидаемый результат:**
```
✓ Ready in Xms
○ Local: http://localhost:3000
```

**Откройте в браузере:**
- Frontend: http://localhost:3000

---

### 3️⃣ (Опционально) Prisma Studio

**В новом терминале:**

```bash
cd "/Users/dmitrijpucka/Documents/ClaudeCode projects/Pluribus/backend"
npx prisma studio
```

**Откройте в браузере:**
- Prisma Studio: http://localhost:5555

---

## ✅ Проверка что все работает

### Backend API:
```bash
# Health check
curl http://localhost:5001/health

# Получить все продукты
curl http://localhost:5001/api/v1/products
```

### Frontend:
- Откройте http://localhost:3000
- Перейдите на страницу Products
- Должны увидеть 4 продукта

### Тестовые аккаунты:
```
Email: buyer@test.com
Password: password123

Email: seller@test.com
Password: password123

Email: both@test.com
Password: password123
```

---

## 🛑 Остановка сервисов

```bash
# В каждом терминале нажмите:
Ctrl + C
```

---

## 🔧 Если что-то не работает

### Проблема: "Port already in use"

**Backend (port 5001):**
```bash
lsof -i :5001
kill -9 <PID>
```

**Frontend (port 3000):**
```bash
lsof -i :3000
kill -9 <PID>
```

### Проблема: "Database connection failed"

```bash
# Проверить что PostgreSQL запущен
brew services list | grep postgres

# Если не запущен
brew services start postgresql@15
```

### Проблема: "Prisma Client not found"

```bash
cd backend
npx prisma generate
```

---

## 📊 Доступные URL

| Сервис | URL | Порт |
|--------|-----|------|
| **Frontend** | http://localhost:3000 | 3000 |
| **Backend API** | http://localhost:5001 | 5001 |
| **API Docs** | http://localhost:5001/api/v1 | 5001 |
| **Prisma Studio** | http://localhost:5555 | 5555 |
| **PostgreSQL** | localhost | 5432 |
| **Redis** | localhost | 6379 |

---

## 🎯 Сценарии тестирования

### Сценарий 1: Регистрация и вход
1. Откройте http://localhost:3000/register
2. Зарегистрируйте нового пользователя
3. Войдите в систему

### Сценарий 2: Просмотр продуктов
1. Откройте http://localhost:3000/products
2. Используйте фильтры (категории, цена)
3. Используйте поиск
4. Откройте детали продукта

### Сценарий 3: Создание продукта (Seller)
1. Войдите как seller@test.com
2. Перейдите в Dashboard → Products
3. Создайте новый продукт
4. Проверьте что он появился в списке

### Сценарий 4: Просмотр данных
1. Откройте Prisma Studio (http://localhost:5555)
2. Выберите таблицу "User" или "Product"
3. Просмотрите и отредактируйте данные

---

## 📝 Полезные команды

```bash
# Просмотр логов Backend
cd backend
tail -f logs/combined.log

# Просмотр логов Frontend
# Логи выводятся в терминал где запущен npm run dev

# Проверить статус всех brew сервисов
brew services list

# Подключиться к PostgreSQL
psql pluribus

# Просмотр таблиц
\dt

# Просмотр пользователей
SELECT * FROM users;

# Выход из psql
\q
```

---

## 🔄 Перезапуск всего проекта

```bash
# Остановить все (Ctrl+C в каждом терминале)

# Запустить Backend
cd "/Users/dmitrijpucka/Documents/ClaudeCode projects/Pluribus/backend" && npm run dev

# Запустить Frontend (новый терминал)
cd "/Users/dmitrijpucka/Documents/ClaudeCode projects/Pluribus/frontend" && npm run dev
```

---

## 📚 Дополнительная документация

- **Backend API**: `backend/TEST_API.md` - все endpoints с примерами
- **Test Accounts**: `backend/TEST_ACCOUNTS.md` - тестовые аккаунты
- **Backend Setup**: `backend/QUICK_START.md` - полная инструкция
- **Progress**: `Documentation/BACKEND_PROGRESS.md` - отчет о прогрессе

---

## 🎉 Готово!

Если все запущено, у вас есть:
- ✅ Frontend на http://localhost:3000
- ✅ Backend API на http://localhost:5001
- ✅ Database (PostgreSQL + Redis)
- ✅ 3 тестовых аккаунта
- ✅ 4 продукта в каталоге

**Happy Testing! 🚀**
