# Skill: Add Store (Zustand)

## Описание

Создает Zustand store для state management (auth, UI, cart и т.д.).

**Востребованность**: ⭐⭐⭐⭐ MEDIUM-HIGH - нужен для global state (auth, theme, sidebar)

---

## Использование

### Базовый синтаксис

```
Создай auth store с Zustand
```

### С конкретными полями

```
Создай UI store для sidebar state и theme
```

---

## Структура store

### Файловая структура

```
src/stores/
├── auth.ts          # Authentication store
├── ui.ts            # UI state (sidebar, theme)
└── cart.ts          # Shopping cart (если нужен)
```

### Шаблон store

```typescript
// src/stores/{storeName}.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface {StoreName}State {
  // State fields
  field1: Type1;
  field2: Type2;

  // Actions
  action1: (param: Type) => void;
  action2: () => void;
  reset: () => void;
}

const initialState = {
  field1: defaultValue1,
  field2: defaultValue2,
};

export const use{StoreName}Store = create<{StoreName}State>()(
  persist(
    (set) => ({
      ...initialState,

      action1: (param) => set({ field1: param }),
      action2: () => set({ field2: newValue }),
      reset: () => set(initialState),
    }),
    {
      name: '{storeName}-storage', // localStorage key
    }
  )
);
```

---

## Реальные примеры для Pluribus

### Пример 1: Auth Store

**Файл:** `src/stores/auth.ts`

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  login: (user: User) => void;
  logout: () => void;
  setUser: (user: User | null) => void;
  setLoading: (isLoading: boolean) => void;
}

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...initialState,

      login: (user) =>
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        }),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        }),

      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),

      setLoading: (isLoading) =>
        set({ isLoading }),
    }),
    {
      name: 'auth-storage',
      // Don't persist isLoading
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Selectors (optional)
export const selectUser = (state: AuthState) => state.user;
export const selectIsAuthenticated = (state: AuthState) => state.isAuthenticated;
```

**Использование:**
```typescript
'use client';

import { useAuthStore } from '@/stores/auth';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuthStore();

  return (
    <header>
      {isAuthenticated ? (
        <>
          <span>Welcome, {user?.name}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </header>
  );
}
```

### Пример 2: UI Store

**Файл:** `src/stores/ui.ts`

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';
type Language = 'en' | 'ru' | 'es' | 'zh';

interface UIState {
  // Sidebar
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  openSidebar: () => void;

  // Theme
  theme: Theme;
  setTheme: (theme: Theme) => void;

  // Language
  language: Language;
  setLanguage: (language: Language) => void;

  // Mobile menu
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
}

const initialState = {
  isSidebarOpen: true,
  theme: 'light' as Theme,
  language: 'en' as Language,
  isMobileMenuOpen: false,
};

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      ...initialState,

      // Sidebar actions
      toggleSidebar: () =>
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      closeSidebar: () => set({ isSidebarOpen: false }),
      openSidebar: () => set({ isSidebarOpen: true }),

      // Theme actions
      setTheme: (theme) => {
        set({ theme });
        // Apply theme to document
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },

      // Language actions
      setLanguage: (language) => set({ language }),

      // Mobile menu actions
      toggleMobileMenu: () =>
        set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
      closeMobileMenu: () => set({ isMobileMenuOpen: false }),
    }),
    {
      name: 'ui-storage',
    }
  )
);
```

**Использование:**
```typescript
'use client';

import { useUIStore } from '@/stores/ui';

export function DashboardSidebar() {
  const { isSidebarOpen, closeSidebar } = useUIStore();

  return (
    <aside className={isSidebarOpen ? 'block' : 'hidden'}>
      <button onClick={closeSidebar}>Close</button>
      {/* Sidebar content */}
    </aside>
  );
}

export function ThemeToggle() {
  const { theme, setTheme } = useUIStore();

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle Theme
    </button>
  );
}
```

### Пример 3: Cart Store (если нужен)

**Файл:** `src/stores/cart.ts`

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/types';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;

  // Actions
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  calculateTotal: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,

      addItem: (product, quantity = 1) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          return {
            items: [...state.items, { product, quantity }],
          };
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        })),

      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        })),

      clearCart: () => set({ items: [], total: 0 }),

      calculateTotal: () => {
        const total = get().items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );
        set({ total });
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
```

---

## Best Practices

### 1. Используй TypeScript для типизации

```typescript
// ✅ ХОРОШО - строгие типы
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
}

// ❌ ПЛОХО - слабая типизация
interface AuthState {
  user: any;
  isAuthenticated: boolean;
  login: (user: any) => void;
}
```

### 2. Используй persist middleware для localStorage

```typescript
// ✅ ХОРОШО - persist в localStorage
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({ /* ... */ }),
    { name: 'auth-storage' }
  )
);

// ❌ ПЛОХО - state теряется при перезагрузке
export const useAuthStore = create<AuthState>((set) => ({ /* ... */ }));
```

### 3. Используй partialize для selective persistence

```typescript
// ✅ ХОРОШО - не persist временные поля
persist(
  (set) => ({ /* ... */ }),
  {
    name: 'auth-storage',
    partialize: (state) => ({
      user: state.user,
      isAuthenticated: state.isAuthenticated,
      // isLoading не persist
    }),
  }
)

// ❌ ПЛОХО - persist все, включая isLoading
// isLoading будет true при перезагрузке
```

### 4. Создавай selectors для оптимизации

```typescript
// ✅ ХОРОШО - selectors предотвращают re-renders
export const selectUser = (state: AuthState) => state.user;
export const selectIsAuthenticated = (state: AuthState) => state.isAuthenticated;

// Использование
const user = useAuthStore(selectUser);

// ❌ ПЛОХО - re-render на любое изменение store
const { user, isAuthenticated, /* ... все остальное */ } = useAuthStore();
```

### 5. Группируй связанные actions

```typescript
// ✅ ХОРОШО - логично сгруппированные actions
interface UIState {
  // Sidebar group
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;

  // Theme group
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// ❌ ПЛОХО - все в одной куче
interface UIState {
  prop1: boolean;
  action1: () => void;
  prop2: string;
  action2: () => void;
}
```

---

## Что нужно для Pluribus

### Must Have stores:
1. **Auth Store** - user, isAuthenticated, login/logout
2. **UI Store** - sidebar, theme, language, mobile menu

### Should Have stores:
3. **Cart Store** (если добавим shopping cart)
4. **Notifications Store** (для toast queue)

### Nice to Have:
5. **Search Store** (search history, filters)
6. **Favorites Store** (saved products/sellers)

---

## Статус

### Созданные stores:
- ❌ Auth Store - **НЕ создан**
- ❌ UI Store - **НЕ создан**
- ❌ Cart Store - **НЕ создан**

### Зависимости:
- ❌ Zustand - **НЕ установлен**

```bash
npm install zustand
```

---

## Установка

```bash
cd "/Users/dmitrijpucka/Documents/ClaudeCode projects/Pluribus/frontend"
npm install zustand
```

---

## Чек-лист создания

### Для каждого store:

1. [ ] Установить Zustand
   ```bash
   npm install zustand
   ```

2. [ ] Создать файл store
   ```
   src/stores/{storeName}.ts
   ```

3. [ ] Определить interface
   ```typescript
   interface {StoreName}State { /* ... */ }
   ```

4. [ ] Создать store с persist
   ```typescript
   export const use{StoreName}Store = create<{StoreName}State>()(
     persist(/* ... */)
   );
   ```

5. [ ] Создать selectors (опционально)
   ```typescript
   export const selectField = (state) => state.field;
   ```

6. [ ] Использовать в компонентах
   ```typescript
   const { field, action } = use{StoreName}Store();
   ```

7. [ ] Тестировать:
   - [ ] State updates работают
   - [ ] Persistence работает (localStorage)
   - [ ] No unnecessary re-renders

---

## Выводы

**Этот skill НУЖЕН для:**
- ✅ Global auth state
- ✅ UI preferences (theme, language)
- ✅ Sidebar state (dashboard)
- ✅ Mobile menu state

**Статус:**
- Zustand не установлен: ❌
- Stores не созданы: 0 из 2 critical
- Приоритет: **MEDIUM-HIGH**

**Время на создание:** ~30 минут на store
**Всего времени:** ~1 час для Auth + UI stores

**Next step:** Установить Zustand и создать Auth Store
