# Google OAuth Authentication - Setup Complete ✅

Google OAuth авторизация успешно интегрирована в проект Pluribus!

---

## 🎯 Что было реализовано:

### **Backend:**
1. ✅ Установлены зависимости: `passport`, `passport-google-oauth20`
2. ✅ Обновлена Prisma schema:
   - Добавлены поля `googleId`, `provider`
   - `password` стал опциональным для OAuth users
   - `country`, `city` опциональны (заполняются через onboarding)
3. ✅ Создана конфигурация Passport (`src/config/passport.ts`)
4. ✅ Добавлены Google OAuth endpoints:
   - `GET /api/v1/auth/google` - Инициализация авторизации
   - `GET /api/v1/auth/google/callback` - Callback handler
5. ✅ Реализована логика:
   - Создание нового user при первом входе
   - Связывание Google account с существующим email
   - Автоматическая верификация email
   - Генерация JWT tokens

### **Frontend:**
1. ✅ Установлена зависимость: `@react-oauth/google`
2. ✅ Добавлен `GoogleOAuthProvider` в root layout
3. ✅ Обновлена Login страница:
   - Кнопка "Continue with Google"
   - Красивый Google логотип
4. ✅ Создана callback страница (`/auth/callback`)
   - Обработка redirect с токенами
   - Сохранение в localStorage
   - Redirect в dashboard
5. ✅ Создана onboarding страница (`/onboarding`)
   - Выбор роли (Buyer/Seller)
   - Выбор страны и города
   - Красивый UI с иконками

---

## 🔐 Google OAuth Credentials:

```
Client ID: 419794918634-lhuas1huq4tvu5498f377hjs5a3ujlvh.apps.googleusercontent.com
Client Secret: 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
```

**Redirect URI настроен на:**
- `http://localhost:5001/api/v1/auth/google/callback`

**JavaScript origins:**
- `http://localhost:3000`

---

## 🚀 Как использовать:

### **1. Вход через Google:**

1. Откройте http://localhost:3000/login
2. Нажмите кнопку **"Continue with Google"**
3. Выберите Google аккаунт
4. Разрешите доступ
5. Если первый вход:
   - Заполните профиль (роль, страна, город)
   - Нажмите "Complete Profile"
6. Будете перенаправлены в dashboard

### **2. Связывание существующего аккаунта:**

Если у вас уже есть аккаунт с email, который вы используете в Google:
1. Войдите через Google
2. Система автоматически свяжет аккаунты
3. В следующий раз можете входить как через Google, так и через email/password

---

## 🔄 OAuth Flow:

```
User -> Click "Continue with Google"
     -> Redirect to GET /api/v1/auth/google
     -> Google authorization page
     -> User approves
     -> Redirect to GET /api/v1/auth/google/callback
     -> Backend: Find/Create user
     -> Generate JWT tokens
     -> Redirect to frontend:
        - /onboarding?token=xxx (if needs onboarding)
        - /auth/callback?token=xxx (if profile complete)
     -> Frontend: Save tokens
     -> Redirect to /dashboard
```

---

## 📊 Database Changes:

### User Model Updates:
```prisma
model User {
  // ... existing fields

  password  String?  // Now optional for OAuth users

  // OAuth fields
  googleId     String? @unique
  provider     String? // "local", "google"

  // Profile (optional for OAuth)
  country      String? // Fill during onboarding
  city         String? // Fill during onboarding

  // ... rest

  @@index([googleId])
  @@index([provider])
}
```

---

## 🎨 Frontend Pages:

### **Login Page** (`/login`)
- Email/Password форма
- Google Sign In button
- Test accounts (для разработки)

### **Auth Callback** (`/auth/callback`)
- Обрабатывает redirect после Google OAuth
- Сохраняет токены в localStorage
- Показывает loader
- Redirect в dashboard

### **Onboarding** (`/onboarding`)
- Выбор роли (Buyer/Seller)
- Выбор страны (dropdown)
- Ввод города
- Обновляет профиль через API
- Redirect в dashboard

---

## 🔧 Environment Variables:

### Backend (`.env`):
```env
GOOGLE_CLIENT_ID=419794918634-lhuas1huq4tvu5498f377hjs5a3ujlvh.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
GOOGLE_CALLBACK_URL=http://localhost:5001/api/v1/auth/google/callback
```

### Frontend (`.env.local`):
```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=419794918634-lhuas1huq4tvu5498f377hjs5a3ujlvh.apps.googleusercontent.com
```

---

## ✅ Features:

1. **Автоматическая регистрация** - первый вход через Google создает аккаунт
2. **Связывание аккаунтов** - если email существует, привязывает Google ID
3. **Email verification** - автоматически verified при Google OAuth
4. **Avatar** - берется из Google профиля
5. **Onboarding** - для новых пользователей
6. **JWT Tokens** - такие же как и для email/password
7. **Безопасность** - Client Secret не хранится на frontend

---

## 🧪 Testing:

### **Тестирование нового пользователя:**
1. Используйте Google аккаунт, которого нет в базе
2. Войдите через Google
3. Заполните onboarding
4. Проверьте что профиль сохранен

### **Тестирование связывания:**
1. Создайте аккаунт через email/password
2. Выйдите
3. Войдите через Google с тем же email
4. Проверьте что теперь можно входить обоими способами

### **Проверка в базе данных:**
```sql
SELECT id, email, googleId, provider, country, city
FROM users
WHERE provider = 'google';
```

---

## 🐛 Troubleshooting:

### "Google Sign In failed"
- Проверьте что backend запущен на порту 5001
- Проверьте GOOGLE_CLIENT_ID в frontend .env.local
- Проверьте redirect URI в Google Console

### "Missing authentication tokens"
- Проверьте backend логи: `tail -f /tmp/pluribus-backend.log`
- Проверьте что callback URL правильный

### "Profile update failed"
- Проверьте что токены сохранены в localStorage
- Проверьте network tab в DevTools

---

## 📝 Файлы:

### Backend:
- `src/config/passport.ts` - Passport configuration
- `src/controllers/authController.ts` - Google OAuth methods
- `src/routes/authRoutes.ts` - Google routes
- `src/server.ts` - Passport initialization
- `prisma/schema.prisma` - Updated schema
- `.env` - Google credentials

### Frontend:
- `src/app/layout.tsx` - GoogleOAuthProvider
- `src/app/login/page.tsx` - Google button
- `src/app/auth/callback/page.tsx` - Callback handler (NEW)
- `src/app/onboarding/page.tsx` - Onboarding form (NEW)
- `.env.local` - Google Client ID

---

## 🚀 Next Steps (Optional):

1. **Register Page** - Добавить Google Sign Up
2. **Admin Panel** - Решить: разрешать ли Google OAuth для admin
3. **Social Auth** - Facebook, Apple, GitHub
4. **Profile Linking** - UI для управления привязанными аккаунтами
5. **Production** - Обновить redirect URIs для production domain

---

**Дата реализации**: 20 февраля 2026
**Статус**: ✅ **COMPLETE & READY TO TEST**
**Автор**: Claude Code
