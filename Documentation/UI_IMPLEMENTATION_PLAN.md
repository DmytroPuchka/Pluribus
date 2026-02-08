# План реализации UI для Pluribus

**Дата создания**: 08.02.2026
**Статус**: Готов к началу реализации

---

## Обзор

Этот документ описывает пошаговый план реализации пользовательского интерфейса (UI) для платформы Pluribus с использованием Next.js 15, Tailwind CSS и shadcn/ui.

---

## Подготовка выполнена ✅

### 1. Документация
- ✅ Полная документация проекта создана
- ✅ Технологический стек определен (Next.js 15+)
- ✅ Архитектура спроектирована
- ✅ План разработки составлен

### 2. Skills и Agents
- ✅ Система автоматизации настроена (.claude/)
- ✅ Skills для создания компонентов готовы
- ✅ Skills для создания страниц готовы
- ✅ Skills для создания API готовы
- ✅ Шаблоны кода созданы

---

## Этап 1: Инициализация проекта Next.js

### Шаги

#### 1.1. Создание Next.js проекта

```bash
cd "/Users/dmitrijpucka/Documents/ClaudeCode projects/Pluribus"
npx create-next-app@latest frontend --typescript --tailwind --app --src-dir --import-alias "@/*"
```

**Опции:**
- TypeScript: Да
- ESLint: Да
- Tailwind CSS: Да
- App Router: Да
- src/ directory: Да
- Import alias: @/*

#### 1.2. Установка зависимостей

```bash
cd frontend

# UI Components
npm install @radix-ui/react-slot class-variance-authority clsx tailwind-merge lucide-react

# Forms
npm install react-hook-form zod @hookform/resolvers

# State Management
npm install zustand

# Authentication
npm install next-auth@beta

# Icons
npm install lucide-react

# Utils
npm install date-fns

# Dev Dependencies
npm install -D @types/node @types/react @types/react-dom
```

#### 1.3. Настройка shadcn/ui

```bash
npx shadcn-ui@latest init
```

Выбрать:
- Style: Default
- Base color: Slate
- CSS variables: Yes

---

## Этап 2: Базовая структура проекта

### 2.1. Создание структуры папок

```
frontend/src/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Auth group routes
│   │   ├── login/
│   │   └── register/
│   ├── (main)/              # Main app routes
│   │   ├── products/
│   │   ├── sellers/
│   │   ├── orders/
│   │   └── profile/
│   ├── api/                 # API routes
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/              # React components
│   ├── common/             # Общие компоненты
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Card/
│   │   └── ...
│   ├── features/           # Feature-specific
│   │   ├── ProductCard/
│   │   ├── OrderList/
│   │   └── ...
│   └── layout/             # Layout компоненты
│       ├── Header/
│       ├── Footer/
│       └── Sidebar/
├── lib/                    # Utility functions
│   ├── utils.ts
│   ├── auth.ts
│   └── api.ts
├── hooks/                  # Custom hooks
├── types/                  # TypeScript types
├── actions/                # Server actions
└── styles/                 # Additional styles
```

---

## Этап 3: Базовые UI компоненты (Common)

Используем созданные Skills для быстрого создания компонентов.

### 3.1. Базовые компоненты из shadcn/ui

```bash
# Установка базовых компонентов
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add card
npx shadcn-ui@latest add form
npx shadcn-ui@latest add label
npx shadcn-ui@latest add select
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add toast
```

### 3.2. Кастомные компоненты

#### Компонент: Logo
```
Создай common компонент Logo для отображения логотипа Pluribus
```

#### Компонент: SearchBar
```
Создай common компонент SearchBar с props: onSearch, placeholder
```

#### Компонент: Rating
```
Создай common компонент Rating для отображения звездного рейтинга
с props: value, max, readonly
```

#### Компонент: PriceDisplay
```
Создай common компонент PriceDisplay для форматированного отображения цены
с props: amount, currency
```

---

## Этап 4: Layout компоненты

### 4.1. Header (Шапка сайта)

```
Создай layout компонент Header с навигацией, логотипом и меню пользователя
```

**Включает:**
- Logo
- Навигационное меню (Products, Sellers, How it works)
- Search bar
- Language selector
- User menu (Login/Profile)

### 4.2. Footer (Подвал сайта)

```
Создай layout компонент Footer с ссылками и информацией о компании
```

**Включает:**
- Ссылки на разделы
- Social media links
- Copyright
- Language selector

### 4.3. Sidebar (для Dashboard)

```
Создай layout компонент Sidebar для панели пользователя
```

**Включает:**
- Навигация по разделам Dashboard
- User info
- Role switcher (Buyer/Seller)

---

## Этап 5: Feature компоненты

### 5.1. Product компоненты

#### ProductCard
```
Создай features компонент ProductCard для отображения товара
с props: product, onViewDetails, onBuy
```

**Показывает:**
- Фото товара
- Название
- Цена
- Рейтинг продавца
- Кнопка "Order"

#### ProductGrid
```
Создай features компонент ProductGrid для отображения сетки товаров
с props: products, loading
```

#### ProductFilters
```
Создай client компонент ProductFilters для фильтрации товаров
с props: onFilterChange, categories
```

### 5.2. Seller компоненты

#### SellerCard
```
Создай features компонент SellerCard для отображения продавца на карте
с props: seller, onViewProfile
```

**Показывает:**
- Avatar
- Имя
- Страна/Город
- Рейтинг
- Количество товаров

#### SellerProfile
```
Создай features компонент SellerProfile для детального профиля продавца
```

### 5.3. Order компоненты

#### OrderCard
```
Создай features компонент OrderCard для отображения заказа
с props: order, onViewDetails
```

#### OrderStatus
```
Создай common компонент OrderStatus для отображения статуса заказа
с props: status
```

### 5.4. Map компоненты

#### MapView
```
Создай client компонент MapView для отображения Google Maps с продавцами
с props: sellers, onSellerSelect
```

#### MapMarker
```
Создай компонент MapMarker для кастомного маркера на карте
```

---

## Этап 6: Страницы (Pages)

### 6.1. Landing Page

```
Создай страницу Home по адресу /
```

**Секции:**
- Hero section с поиском
- How it works
- Featured sellers
- Popular products
- CTA section

### 6.2. Products Page

```
Создай страницу Products по адресу /products
```

**Включает:**
- ProductGrid
- ProductFilters
- Pagination
- Search

### 6.3. Product Details Page

```
Создай страницу ProductDetails по адресу /products/[id]
```

**Включает:**
- Галерея фото
- Детали товара
- Информация о продавце
- Форма заказа
- Reviews

### 6.4. Map/Sellers Page

```
Создай страницу Sellers по адресу /sellers
```

**Включает:**
- MapView с продавцами
- Фильтры
- SellerCard список

### 6.5. Auth Pages

```
Создай страницу Login по адресу /login
Создай страницу Register по адресу /register
```

### 6.6. Dashboard Pages

```
Создай страницу Dashboard по адресу /dashboard с layout
```

**Подстраницы:**
- /dashboard - Overview
- /dashboard/orders - Orders list
- /dashboard/products - Manage products (Seller)
- /dashboard/profile - Edit profile

---

## Этап 7: Формы

### 7.1. Auth Forms

#### LoginForm
```
Создай client компонент LoginForm с react-hook-form и zod валидацией
```

#### RegisterForm
```
Создай client компонент RegisterForm с multi-step формой
```

### 7.2. Product Forms

#### CreateProductForm
```
Создай client компонент CreateProductForm для создания товара
```

**Поля:**
- Title
- Description
- Price + Currency
- Category
- Photos (multiple upload)
- Stock quantity

### 7.3. Order Forms

#### CreateOrderForm
```
Создай client компонент CreateOrderForm для создания заказа
```

---

## Этап 8: Интеграции

### 8.1. Google Maps

```bash
npm install @vis.gl/react-google-maps
```

Создать MapView компонент с интеграцией Google Maps API.

### 8.2. Image Upload

```bash
npm install react-dropzone
```

Создать ImageUpload компонент для загрузки фото.

---

## Этап 9: State Management

### 9.1. Global Store (Zustand)

Создать stores:

```typescript
// stores/auth.ts
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

// stores/ui.ts
interface UIState {
  isSidebarOpen: boolean;
  theme: 'light' | 'dark';
  toggleSidebar: () => void;
}
```

---

## Этап 10: Styling и Theming

### 10.1. Tailwind Configuration

Настроить `tailwind.config.ts`:

```typescript
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          // Pluribus brand colors
        },
      },
    },
  },
};
```

### 10.2. CSS Variables

Настроить в `globals.css`:

```css
:root {
  --radius: 0.5rem;
  /* Custom variables */
}
```

---

## Приоритизация

### Высокий приоритет (Неделя 1)
1. ✅ Инициализация Next.js проекта
2. ✅ Установка зависимостей
3. ✅ Базовая структура папок
4. Common компоненты (Button, Input, Card - из shadcn)
5. Layout компоненты (Header, Footer)
6. Landing page

### Средний приоритет (Неделя 2)
7. ProductCard и ProductGrid
8. Products page
9. Product Details page
10. Auth pages (Login, Register)

### Низкий приоритет (Неделя 3+)
11. Map интеграция
12. Dashboard pages
13. Order management
14. Reviews и ratings

---

## Команды для начала работы

```bash
# 1. Перейти в папку проекта
cd "/Users/dmitrijpucka/Documents/ClaudeCode projects/Pluribus"

# 2. Создать Next.js проект
npx create-next-app@latest frontend --typescript --tailwind --app --src-dir --import-alias "@/*"

# 3. Перейти в frontend
cd frontend

# 4. Установить зависимости
npm install @radix-ui/react-slot class-variance-authority clsx tailwind-merge lucide-react react-hook-form zod @hookform/resolvers zustand next-auth@beta date-fns

# 5. Инициализировать shadcn/ui
npx shadcn-ui@latest init

# 6. Установить базовые компоненты
npx shadcn-ui@latest add button input card form label select textarea dialog dropdown-menu avatar badge toast

# 7. Запустить dev сервер
npm run dev
```

---

## Использование Skills

После создания базовой структуры, используй созданные Skills для быстрого создания компонентов:

```
# Примеры команд:
Создай common компонент Logo
Создай features компонент ProductCard с props: product, onBuy
Создай страницу Products по адресу /products
```

---

## Метрики успеха

### Этап 1-2 (Setup)
- ✅ Next.js проект запущен
- ✅ Все зависимости установлены
- ✅ shadcn/ui настроен
- ✅ Dev server работает

### Этап 3-5 (Components)
- 10+ common компонентов готовы
- 5+ feature компонентов готовы
- Header и Footer реализованы
- Компоненты покрыты тестами

### Этап 6 (Pages)
- Landing page готова
- Products page работает
- Auth flow функционален
- Routing настроен

---

## Следующие шаги

1. **Сейчас**: Инициализировать Next.js проект
2. **Далее**: Создать базовые компоненты
3. **Затем**: Реализовать Landing page
4. **Потом**: Добавить Products flow

---

## Ресурсы

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Hook Form](https://react-hook-form.com)
- [Zod Validation](https://zod.dev)

---

**Готовы начать? Запускаем реализацию! 🚀**
