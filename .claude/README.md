# Pluribus - Claude Skills & Agents

Эта папка содержит конфигурацию Skills и Agents для автоматизации разработки проекта Pluribus.

## Структура

```
.claude/
├── config.json           # Главная конфигурация
├── README.md            # Эта документация
├── skills/              # Исполняемые skills
│   ├── create-component.md
│   ├── create-page.md
│   └── create-api-route.md
├── agents/              # Описание агентов
│   ├── ui-component-agent.md
│   ├── page-agent.md
│   └── api-agent.md
└── templates/           # Шаблоны кода
    ├── component.template.tsx
    ├── page.template.tsx
    ├── api-route.template.ts
    └── server-action.template.ts
```

## Доступные Skills

### UI Skills

#### `create-component`
Создает новый React компонент с TypeScript, стилями и тестами.

**Использование:**
```
Создай компонент Button с props: label, onClick, variant
```

**Что создается:**
- `src/components/{type}/{ComponentName}/index.tsx` - компонент
- `src/components/{type}/{ComponentName}/{ComponentName}.test.tsx` - тесты
- `src/components/{type}/{ComponentName}/{ComponentName}.stories.tsx` - Storybook (опционально)

**Параметры:**
- `name` (обязательный) - название компонента
- `type` (опциональный) - тип компонента: `common`, `features`, `layout` (по умолчанию: `common`)
- `props` (опциональный) - список props через запятую
- `clientComponent` (опциональный) - использовать 'use client' директиву

#### `create-page`
Создает новую страницу Next.js с App Router.

**Использование:**
```
Создай страницу Products по пути /products
```

**Что создается:**
- `src/app/{route}/page.tsx` - страница
- `src/app/{route}/loading.tsx` - loading state
- `src/app/{route}/error.tsx` - error boundary
- `src/app/{route}/layout.tsx` - layout (опционально)

**Параметры:**
- `name` (обязательный) - название страницы
- `route` (обязательный) - путь маршрута
- `dynamic` (опциональный) - динамический маршрут с параметрами

#### `add-layout`
Создает новый layout для группы страниц.

**Использование:**
```
Создай layout для раздела dashboard
```

### API Skills

#### `create-api-route`
Создает новый API route handler.

**Использование:**
```
Создай API endpoint GET /api/products
```

**Что создается:**
- `src/app/api/{route}/route.ts` - API handler
- `src/app/api/{route}/route.test.ts` - тесты

**Параметры:**
- `method` (обязательный) - HTTP метод: GET, POST, PUT, PATCH, DELETE
- `route` (обязательный) - путь endpoint
- `auth` (опциональный) - требуется ли аутентификация

#### `create-server-action`
Создает новый Server Action для мутаций.

**Использование:**
```
Создай server action для создания продукта
```

**Что создается:**
- `src/actions/{actionName}.ts` - server action
- `src/actions/{actionName}.test.ts` - тесты

## Доступные Agents

### UI Component Agent

**Назначение**: Автоматическое создание UI компонентов

**Триггеры**:
- "создай компонент"
- "нужен новый компонент"
- "добавь компонент"

**Возможности**:
- Генерация Server или Client компонентов
- Создание TypeScript интерфейсов
- Добавление Tailwind CSS стилей
- Генерация unit тестов
- Создание Storybook stories

**Пример использования**:
```
Создай компонент ProductCard для отображения товара на карте.
Он должен показывать фото, название, цену и кнопку "Заказать".
```

### Page Agent

**Назначение**: Создание страниц Next.js с правильной структурой

**Триггеры**:
- "создай страницу"
- "нужна новая страница"
- "добавь роут"

**Возможности**:
- Генерация App Router страниц
- Настройка metadata для SEO
- Конфигурация layouts
- Добавление loading и error states
- Генерация тестов

**Пример использования**:
```
Создай страницу профиля продавца по адресу /sellers/[id]
с отображением информации о продавце и его товаров
```

### API Agent

**Назначение**: Создание API routes и server actions

**Триггеры**:
- "создай api"
- "новый endpoint"
- "server action"

**Возможности**:
- Генерация API route handlers
- Создание Server Actions
- Добавление validation schemas (Zod)
- Генерация TypeScript типов
- Создание integration тестов

**Пример использования**:
```
Создай API endpoint для получения списка товаров продавца
GET /api/sellers/[id]/products с pagination и фильтрами
```

## Конвенции кода

### Компоненты
- **Стиль**: Functional components с TypeScript
- **Naming**: PascalCase (например: `ProductCard`, `UserProfile`)
- **Props**: Определяются через interface с суффиксом `Props`
- **Export**: Named export + default export
- **Стили**: Tailwind CSS utility classes

### Страницы
- **Location**: `src/app/{route}/page.tsx`
- **Type**: Async Server Components по умолчанию
- **Metadata**: Обязательный export metadata
- **Naming**: `{PageName}Page` (например: `ProductsPage`)

### API Routes
- **Location**: `src/app/api/{route}/route.ts`
- **Methods**: Отдельная функция для каждого HTTP метода
- **Response**: NextResponse.json с типизацией
- **Error handling**: Try-catch с proper status codes

### Server Actions
- **Location**: `src/actions/{actionName}.ts`
- **Directive**: `'use server'` в начале файла
- **Return**: Объект с `{ success, data?, error? }`
- **Validation**: Zod schemas для входных данных

## Примеры использования

### 1. Создание простого компонента

```
Запрос: Создай компонент Button

Результат:
- src/components/common/Button/index.tsx
- src/components/common/Button/Button.test.tsx
```

### 2. Создание компонента с props

```
Запрос: Создай компонент ProductCard с props: product, onBuy

Результат:
- Компонент с типизированными props
- Proper TypeScript interfaces
- Tailwind styling
- Unit тесты
```

### 3. Создание страницы

```
Запрос: Создай страницу Products по адресу /products

Результат:
- src/app/products/page.tsx
- src/app/products/loading.tsx
- src/app/products/error.tsx
- Правильная metadata
```

### 4. Создание API endpoint

```
Запрос: Создай POST /api/products для создания товара

Результат:
- src/app/api/products/route.ts с POST handler
- Validation schema
- Type-safe response
- Error handling
```

## Best Practices

### Компоненты
1. Используй Server Components по умолчанию
2. Добавляй 'use client' только когда нужно (hooks, events, browser APIs)
3. Выноси сложную логику в custom hooks
4. Используй composition для переиспользования
5. Добавляй JSDoc комментарии для документации

### Страницы
1. Используй async/await для data fetching
2. Реализуй loading states
3. Добавляй error boundaries
4. Оптимизируй metadata для SEO
5. Используй Suspense для streaming

### API Routes
1. Всегда валидируй входные данные
2. Используй proper HTTP status codes
3. Добавляй rate limiting для production
4. Логируй ошибки properly
5. Возвращай consistent response format

### Server Actions
1. Используй для form submissions и mutations
2. Добавляй revalidation после изменений
3. Возвращай consistent result format
4. Проверяй аутентификацию
5. Валидируй данные с Zod

## Обновление Skills

Чтобы добавить новый skill:

1. Создайте файл `.claude/skills/{skill-name}.md`
2. Добавьте описание в `config.json`
3. Создайте шаблон в `.claude/templates/` (если нужно)
4. Обновите эту документацию

## Поддержка

Для вопросов и предложений:
- Обновите документацию в этой папке
- Создайте issue в проекте
- Свяжитесь с командой разработки

---

**Версия**: 0.1.0
**Последнее обновление**: 08.02.2026
