# Admin Panel - Setup & Access

## 🔐 Доступ к Admin Panel

Admin Panel доступен **ТОЛЬКО для пользователей с ролью ADMIN**.

**URL**: http://localhost:3001

---

## 👤 Тестовый Admin аккаунт

По умолчанию создается тестовый администратор:

```
Email:    admin@pluribus.com
Password: password123
Role:     ADMIN
```

Этот аккаунт создается автоматически при запуске seed скрипта.

---

## 🛠️ Создание нового Admin пользователя

### Метод 1: Через seed скрипт (рекомендуется)

1. Откройте файл `backend/prisma/seed.ts`
2. Добавьте нового admin пользователя:

```typescript
const newAdmin = await prisma.user.upsert({
  where: { email: 'youradmin@example.com' },
  update: {},
  create: {
    email: 'youradmin@example.com',
    password: hashedPassword,
    name: 'Your Name',
    role: 'ADMIN',
    country: 'USA',
    city: 'New York',
    isActive: true,
    emailVerified: true,
  },
});
```

3. Запустите seed скрипт:
```bash
cd backend
npm run prisma:seed
```

### Метод 2: Через Prisma Studio

1. Запустите Prisma Studio:
```bash
cd backend
npx prisma studio
```

2. Откройте http://localhost:5555

3. Перейдите в таблицу `User`

4. Создайте нового пользователя с полями:
   - `email`: ваш email
   - `password`: хешированный пароль (используйте bcrypt)
   - `name`: ваше имя
   - `role`: **ADMIN** (важно!)
   - `country`, `city`: заполните
   - `isActive`: true

**Примечание**: Для хеширования пароля используйте bcrypt с salt rounds = 10

### Метод 3: Через psql (для опытных)

```sql
-- Подключитесь к базе данных
psql pluribus

-- Создайте admin пользователя
-- Примечание: пароль должен быть захеширован через bcrypt
INSERT INTO "User" (
  id, email, password, name, role, country, city,
  "isActive", "emailVerified", "createdAt", "updatedAt"
) VALUES (
  gen_random_uuid(),
  'admin@example.com',
  '$2a$10$...hashed_password_here...',
  'Admin Name',
  'ADMIN',
  'USA',
  'New York',
  true,
  true,
  NOW(),
  NOW()
);
```

---

## 🔒 Безопасность

### Важные моменты:

1. **Роль ADMIN** - эксклюзивная роль для администраторов платформы
2. Обычные **SELLER** и **BUYER** НЕ имеют доступа к admin панели
3. Backend проверяет роль через middleware `requireAdmin`
4. Frontend проверяет роль через `AuthContext`

### Проверка доступа:

**Backend** (`backend/src/middleware/adminAuth.ts`):
```typescript
if (user.role !== 'ADMIN') {
  throw new UnauthorizedError('Administrator privileges required');
}
```

**Frontend** (`admin-frontend/src/contexts/AuthContext.tsx`):
```typescript
if (response.user.role !== 'ADMIN') {
  await authService.logout();
  throw new Error('Access denied. Administrator role required.');
}
```

---

## 🎯 Возможности Admin Panel

### Dashboard
- Просмотр статистики платформы
- Количество пользователей (buyers/sellers)
- Количество продуктов (active/total)
- Статистика заказов и выручки
- Количество отзывов

### Users Management
- Просмотр всех пользователей
- Фильтрация по роли (BUYER/SELLER)
- Поиск по email/username
- Активация/деактивация аккаунтов
- Удаление пользователей
- Просмотр рейтингов

### Products Management
- Просмотр всех продуктов
- Фильтрация по категориям
- Поиск по названию/описанию
- Активация/деактивация продуктов
- Удаление продуктов
- Просмотр информации о продавце

---

## 🚀 Запуск

### Автоматический запуск (включая admin panel):
```bash
./start.sh
```

### Ручной запуск только admin panel:
```bash
cd admin-frontend
npm run dev
```

Admin Panel будет доступен на http://localhost:3001

---

## 🐛 Troubleshooting

### "Access denied. Administrator role required"
- Проверьте роль пользователя в базе данных
- Убедитесь, что роль = `ADMIN` (не `SELLER` или `BUYER`)
- Используйте тестовый аккаунт: `admin@pluribus.com`

### "Failed to load statistics"
- Убедитесь, что backend API запущен (http://localhost:5001)
- Проверьте `.env.local` файл в admin-frontend
- Проверьте логи backend: `tail -f /tmp/pluribus-backend.log`

### Admin panel не запускается
- Проверьте, что порт 3001 свободен: `lsof -i :3001`
- Убедитесь, что зависимости установлены: `cd admin-frontend && npm install`
- Проверьте логи: `tail -f /tmp/pluribus-admin.log`

---

## 📝 Примечания

- Admin Panel - это отдельный Next.js проект на порту 3001
- Использует те же API endpoints что и main frontend
- Backend использует middleware `requireAdmin` для защиты admin endpoints
- Все admin endpoints начинаются с `/api/admin/`
- Токены хранятся в localStorage с префиксом `admin_`

---

**Дата создания**: 20 февраля 2026
**Проект**: Pluribus - International Shipping Platform
