# Skills и Agents для разработки Pluribus

## Обзор

Для эффективной разработки платформы Pluribus рекомендуется создать специализированные skills (навыки) и agents (агенты), которые будут помогать в автоматизации и документировании процесса разработки.

---

## 1. Frontend Skills

### 1.1. `create-component`
**Назначение**: Создание React компонента по шаблону

**Использование**:
```bash
/create-component Button --type=common --props="label,onClick,variant"
```

**Что делает**:
- Создает структуру компонента (Component.tsx, Component.test.tsx)
- Генерирует TypeScript интерфейсы для props
- Создает базовые тесты
- Добавляет в index.ts для экспорта

### 1.2. `create-page`
**Назначение**: Создание новой страницы с роутингом

**Использование**:
```bash
/create-page ProductDetails --route="/products/:id" --layout=MainLayout
```

**Что делает**:
- Создает компонент страницы
- Добавляет route в router config
- Генерирует базовую структуру
- Создает тесты

### 1.3. `add-api-hook`
**Назначение**: Создание custom hook для API вызова

**Использование**:
```bash
/add-api-hook useProducts --endpoint="/api/products" --method=GET
```

**Что делает**:
- Создает React Query hook
- Генерирует TypeScript типы
- Добавляет error handling
- Создает тесты

### 1.4. `add-form`
**Назначение**: Создание формы с React Hook Form + Zod validation

**Использование**:
```bash
/add-form ProductForm --fields="title,description,price,category"
```

**Что делает**:
- Создает компонент формы
- Генерирует Zod schema
- Adds validation rules
- Создает submit handler

---

## 2. Backend Skills

### 2.1. `create-endpoint`
**Назначение**: Создание нового API endpoint

**Использование**:
```bash
/create-endpoint POST /api/products --auth=required --role=seller
```

**Что делает**:
- Создает route файл
- Генерирует controller
- Создает service методы
- Adds validation schema
- Generates OpenAPI docs
- Создает integration tests

### 2.2. `add-model`
**Назначение**: Добавление новой Prisma модели

**Использование**:
```bash
/add-model Product --fields="title:String,price:Float,sellerId:User"
```

**Что делает**:
- Добавляет model в schema.prisma
- Генерирует migration
- Создает repository
- Генерирует TypeScript types
- Создает seed data пример

### 2.3. `create-service`
**Назначение**: Создание service layer

**Использование**:
```bash
/create-service ProductService --methods="create,update,delete,findAll"
```

**Что делает**:
- Создает service class
- Генерирует CRUD методы
- Adds error handling
- Создает unit tests

### 2.4. `add-middleware`
**Назначение**: Создание Express middleware

**Использование**:
```bash
/add-middleware rateLimit --type=route --limit=100/hour
```

**Что делает**:
- Создает middleware function
- Adds configuration
- Документирует usage
- Создает tests

---

## 3. Database Skills

### 3.1. `generate-migration`
**Назначение**: Создание Prisma migration

**Использование**:
```bash
/generate-migration add-user-verification
```

**Что делает**:
- Анализирует изменения в schema
- Создает migration файлы
- Adds rollback script
- Updates documentation

### 3.2. `create-seed`
**Назначение**: Создание seed data

**Использование**:
```bash
/create-seed users --count=50 --role=mixed
```

**Что делает**:
- Генерирует реалистичные данные
- Создает связи между таблицами
- Adds faker.js генерацию
- Creates seed script

### 3.3. `optimize-query`
**Назначение**: Оптимизация Prisma запросов

**Использование**:
```bash
/optimize-query getOrdersWithDetails
```

**Что делает**:
- Анализирует запрос
- Suggests include/select оптимизации
- Recommends indexes
- Shows performance metrics

---

## 4. Testing Skills

### 4.1. `generate-tests`
**Назначение**: Генерация тестов для компонента/функции

**Использование**:
```bash
/generate-tests src/components/Button/Button.tsx
```

**Что делает**:
- Анализирует код
- Генерирует unit tests
- Создает test cases для всех props
- Adds edge case tests

### 4.2. `run-tests`
**Назначение**: Запуск тестов с фильтрацией

**Использование**:
```bash
/run-tests --pattern="Product" --coverage
```

**Что делает**:
- Runs filtered tests
- Shows coverage report
- Highlights missing coverage
- Suggests improvements

### 4.3. `create-e2e-test`
**Назначение**: Создание E2E теста

**Использование**:
```bash
/create-e2e-test order-flow --steps="login,select-product,checkout,pay"
```

**Что делает**:
- Создает Playwright/Cypress test
- Генерирует user flow
- Adds assertions
- Creates test data setup

---

## 5. DevOps Skills

### 5.1. `deploy`
**Назначение**: Деплой на staging/production

**Использование**:
```bash
/deploy staging --branch=develop --migrations=auto
```

**Что делает**:
- Runs pre-deploy checks
- Executes migrations
- Deploys application
- Runs smoke tests
- Sends notifications

### 5.2. `check-health`
**Назначение**: Проверка состояния системы

**Использование**:
```bash
/check-health production
```

**Что делает**:
- Checks API health
- Verifies database connection
- Tests Redis connection
- Shows metrics
- Reports issues

### 5.3. `rollback`
**Назначение**: Откат к предыдущей версии

**Использование**:
```bash
/rollback production --to-version=v1.2.3
```

**Что делает**:
- Reverts code to version
- Rolls back migrations
- Updates load balancer
- Sends notifications

---

## 6. Documentation Skills

### 6.1. `doc-api`
**Назначение**: Генерация API документации

**Использование**:
```bash
/doc-api --format=openapi --output=docs/api.json
```

**Что делает**:
- Scans all endpoints
- Generates OpenAPI spec
- Creates Swagger UI
- Updates README

### 6.2. `doc-component`
**Назначение**: Документирование React компонента

**Использование**:
```bash
/doc-component src/components/Button
```

**Что делает**:
- Generates Storybook story
- Creates props documentation
- Adds usage examples
- Generates screenshots

### 6.3. `update-changelog`
**Назначение**: Обновление CHANGELOG

**Использование**:
```bash
/update-changelog --version=1.2.0 --type=minor
```

**Что делает**:
- Analyzes git commits
- Groups changes by type
- Generates CHANGELOG entry
- Updates version numbers

---

## 7. Специализированные агенты

### 7.1. **Database Agent**

**Назначение**: Управление схемой базы данных и миграциями

**Возможности**:
- Анализ и оптимизация схемы БД
- Создание миграций
- Генерация seed data
- Оптимизация запросов
- Создание indexes

**Пример использования**:
```
User: "Add email verification to users table"
Database Agent:
  1. Анализирует текущую схему users
  2. Создает migration для добавления полей:
     - email_verified (boolean)
     - email_verification_token (string)
     - email_verified_at (datetime)
  3. Обновляет Prisma schema
  4. Генерирует migration файлы
  5. Создает rollback script
  6. Обновляет documentation
```

### 7.2. **API Agent**

**Назначение**: Создание и документирование API endpoints

**Возможности**:
- Создание RESTful endpoints
- Генерация OpenAPI спецификации
- Создание request/response типов
- Добавление validation
- Создание тестов

**Пример использования**:
```
User: "Create endpoint to get seller's statistics"
API Agent:
  1. Создает GET /api/sellers/:id/statistics
  2. Генерирует controller method
  3. Создает service logic
  4. Adds authentication middleware
  5. Generates response types
  6. Creates integration tests
  7. Updates OpenAPI docs
```

### 7.3. **UI Component Agent**

**Назначение**: Создание React компонентов

**Возможности**:
- Создание компонента по спецификации
- Генерация TypeScript типов
- Добавление тестов
- Создание Storybook stories
- Accessibility compliance

**Пример использования**:
```
User: "Create ProductCard component to display product on map"
UI Component Agent:
  1. Создает component structure:
     - ProductCard.tsx
     - ProductCard.test.tsx
     - ProductCard.stories.tsx
  2. Генерирует props interface
  3. Implements component logic
  4. Adds Tailwind styling
  5. Creates unit tests
  6. Adds Storybook story
  7. Ensures accessibility (a11y)
```

### 7.4. **Testing Agent**

**Назначение**: Создание и запуск тестов

**Возможности**:
- Генерация unit tests
- Создание integration tests
- E2E test scenarios
- Coverage analysis
- Test optimization

**Пример использования**:
```
User: "Create tests for order creation flow"
Testing Agent:
  1. Анализирует order creation code
  2. Создает unit tests для:
     - Order validation
     - Price calculation
     - Status transitions
  3. Создает integration tests для:
     - API endpoint
     - Database operations
  4. Создает E2E test для:
     - Complete order flow
  5. Runs all tests
  6. Generates coverage report
```

### 7.5. **Documentation Agent**

**Назначение**: Автоматическое ведение документации

**Возможности**:
- Документирование изменений
- Генерация API docs
- Обновление README
- Создание guides
- Changelog management

**Пример использования**:
```
User: "Document the new chat feature"
Documentation Agent:
  1. Анализирует chat-related code
  2. Генерирует:
     - API documentation (endpoints)
     - User guide (how to use chat)
     - Technical docs (architecture)
     - CHANGELOG entry
  3. Creates diagrams (sequence, flow)
  4. Updates main README
  5. Creates demo screenshots
```

### 7.6. **Deploy Agent**

**Назначение**: Управление развертыванием

**Возможности**:
- Pre-deploy checks
- Database migrations
- Application deployment
- Post-deploy verification
- Rollback if needed

**Пример использования**:
```
User: "Deploy to production"
Deploy Agent:
  1. Runs pre-deploy checks:
     - All tests passing
     - No eslint errors
     - Build successful
  2. Backs up database
  3. Runs migrations (if any)
  4. Deploys frontend to CDN
  5. Deploys backend to servers
  6. Runs smoke tests
  7. Monitors for errors (5 min)
  8. Sends deployment notification
```

### 7.7. **Performance Agent**

**Назначение**: Оптимизация производительности

**Возможности**:
- Performance audits
- Bottleneck identification
- Optimization suggestions
- Load testing
- Monitoring setup

**Пример использования**:
```
User: "Optimize product search performance"
Performance Agent:
  1. Анализирует search endpoint
  2. Identifies bottlenecks:
     - Slow database query
     - No caching
     - Large payload size
  3. Предлагает оптимизации:
     - Add database index on title
     - Implement Redis caching
     - Use pagination
     - Select only needed fields
  4. Implements changes
  5. Runs performance tests
  6. Shows improvement metrics
```

---

## 8. Workflow Examples

### Пример 1: Создание новой фичи (Custom Orders)

```bash
# 1. Database changes
/add-model CustomOrder --fields="..."

# 2. Create API endpoints
/create-endpoint POST /api/custom-orders
/create-endpoint GET /api/custom-orders
/create-endpoint PUT /api/custom-orders/:id/accept

# 3. Create frontend components
/create-page CustomOrdersPage
/create-component CustomOrderForm
/create-component CustomOrderCard

# 4. Add API hooks
/add-api-hook useCustomOrders
/add-api-hook useCreateCustomOrder

# 5. Generate tests
/generate-tests --all
/create-e2e-test custom-order-flow

# 6. Documentation
/doc-api
/update-changelog --type=feature
```

### Пример 2: Фикс бага

```bash
# 1. Identify issue
/check-health production

# 2. Fix code
# (manual code change)

# 3. Create tests
/generate-tests src/services/order.service.ts

# 4. Run tests
/run-tests --pattern="order"

# 5. Deploy fix
/deploy production --hotfix

# 6. Verify
/check-health production

# 7. Document
/update-changelog --type=fix
```

### Пример 3: Performance optimization

```bash
# 1. Audit performance
Performance Agent: "Audit product search"

# 2. Implement optimizations
Database Agent: "Add index on products.title"
/add-middleware caching --route=/api/products

# 3. Load test
/run-tests --type=load --endpoint=/api/products

# 4. Deploy
/deploy staging
/check-health staging
/deploy production
```

---

## 9. Настройка Skills в Claude Code

### Создание custom skill

```typescript
// skills/create-component.ts
export default {
  name: 'create-component',
  description: 'Create a new React component',
  parameters: [
    {
      name: 'name',
      type: 'string',
      required: true,
      description: 'Component name'
    },
    {
      name: 'type',
      type: 'string',
      options: ['common', 'feature', 'layout'],
      description: 'Component type'
    }
  ],
  async execute({ name, type }: Params) {
    // Implementation
    const componentPath = `src/components/${type}/${name}`;
    // Create files...
  }
};
```

### Конфигурация в `.claude/config.json`

```json
{
  "skills": {
    "frontend": [
      "create-component",
      "create-page",
      "add-api-hook",
      "add-form"
    ],
    "backend": [
      "create-endpoint",
      "add-model",
      "create-service",
      "add-middleware"
    ],
    "database": [
      "generate-migration",
      "create-seed",
      "optimize-query"
    ]
  },
  "agents": {
    "database": {
      "triggers": ["database", "schema", "migration", "prisma"],
      "permissions": ["read", "write"]
    },
    "api": {
      "triggers": ["endpoint", "api", "route"],
      "permissions": ["read", "write"]
    }
  }
}
```

---

## 10. Преимущества использования Skills и Agents

### Consistency
- Единый стиль кода
- Стандартная структура файлов
- Consistent naming conventions

### Speed
- Автоматизация повторяющихся задач
- Быстрое создание boilerplate кода
- Reduced manual work

### Quality
- Автоматическая генерация тестов
- Built-in best practices
- Error prevention

### Documentation
- Автоматическое документирование
- Always up-to-date docs
- Comprehensive coverage

### Team Efficiency
- Onboarding новых разработчиков
- Knowledge sharing
- Reduced context switching

---

## Заключение

Использование специализированных skills и agents значительно ускоряет разработку Pluribus, обеспечивает consistency и quality, а также автоматически ведет документацию проекта.

**Рекомендация**: Начать с базовых skills (create-component, create-endpoint, add-model) и постепенно добавлять более специализированные по мере необходимости.
