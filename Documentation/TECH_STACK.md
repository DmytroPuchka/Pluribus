# Технологический стек Pluribus

## Frontend

### Core Framework
- **React 18+** с TypeScript
  - React Hooks для управления состоянием
  - React Context API / Redux Toolkit для глобального состояния
  - React Router v6 для навигации

### UI Framework & Styling
- **Tailwind CSS** - утилитарный CSS фреймворк
- **shadcn/ui** или **Material-UI (MUI)** - готовые компоненты
- **Framer Motion** - анимации
- **Headless UI** - доступные компоненты без стилей

### Maps Integration
- **@react-google-maps/api** - Google Maps интеграция
- **Mapbox GL JS** (альтернатива) - более гибкая картография
- Кластеризация: supercluster или markerclusterer

### Forms & Validation
- **React Hook Form** - управление формами
- **Zod** или **Yup** - валидация схем
- **React Dropzone** - загрузка файлов

### State Management
- **Redux Toolkit** + **RTK Query** - для сложного состояния и API запросов
- **Zustand** (легковесная альтернатива)
- **React Query (TanStack Query)** - кеширование и синхронизация данных

### Authentication
- **Firebase Authentication** или **Auth0** - готовые решения
- **NextAuth.js** (если используется Next.js)
- Google OAuth 2.0 integration

### Real-time Communication
- **Socket.io-client** - WebSocket для чата
- **Firebase Realtime Database** или **Firestore** - для сообщений

### Internationalization
- **react-i18next** - локализация
- **date-fns** с локалями - форматирование дат

### Image Handling
- **React Image Gallery** - галереи изображений
- **react-image-crop** - обрезка изображений
- Оптимизация: next/image или cloudinary

### Build Tools
- **Vite** - быстрый сборщик (рекомендуется)
- **Webpack** (если нужна сложная конфигурация)
- **ESLint** + **Prettier** - линтинг и форматирование
- **Husky** + **lint-staged** - pre-commit хуки

### Testing
- **Vitest** - unit тесты (совместим с Vite)
- **React Testing Library** - тестирование компонентов
- **Playwright** или **Cypress** - E2E тесты
- **MSW (Mock Service Worker)** - моки API

## Backend

### Framework
- **Node.js 20 LTS** + **Express.js**
- **TypeScript** для типобезопасности
- Альтернатива: **Fastify** (быстрее) или **NestJS** (enterprise-grade)

### API Architecture
- **RESTful API** + **GraphQL** (опционально)
- **tRPC** (type-safe API если fullstack TypeScript)
- API Versioning (/api/v1)

### Database

#### Primary Database
- **PostgreSQL 15+** - основная БД
  - Поддержка JSON
  - Расширение PostGIS для геоданных
  - Надежность и ACID транзакции

#### ORM/Query Builder
- **Prisma** - современный ORM с TypeScript
  - Автогенерация типов
  - Миграции
  - Prisma Studio для администрирования
- Альтернатива: **TypeORM** или **Drizzle ORM**

#### Cache Layer
- **Redis** - кеширование, сессии, rate limiting
  - Кеш запросов
  - Pub/Sub для real-time
  - Очереди задач

#### File Storage
- **AWS S3** или **Google Cloud Storage** - хранение изображений
- **Cloudinary** - обработка и оптимизация изображений
- CDN для быстрой доставки

#### Search Engine
- **Elasticsearch** или **Typesense** - полнотекстовый поиск
  - Поиск товаров
  - Поиск продавцов
  - Фильтрация

### Authentication & Authorization
- **JWT (JSON Web Tokens)** - stateless аутентификация
- **Passport.js** - стратегии аутентификации
- **bcrypt** - хеширование паролей
- **OAuth 2.0** - Google интеграция
- **express-rate-limit** - защита от брутфорса

### Real-time
- **Socket.io** - WebSocket сервер для чата
- **Server-Sent Events (SSE)** - уведомления

### Payment Integration
- **Stripe API** - основной процессор платежей
  - Stripe Connect - для маркетплейсов
  - Escrow механизм
- Альтернатива: **PayPal**, **Braintree**

### Email Service
- **SendGrid** или **AWS SES** - транзакционные email
- **Nodemailer** - отправка писем
- Шаблоны: **Handlebars** или **MJML**

### Background Jobs
- **Bull** (на основе Redis) - очереди задач
- **Agenda** (MongoDB-based) - альтернатива
- Задачи:
  - Отправка email
  - Обработка изображений
  - Генерация отчетов

### API Documentation
- **Swagger/OpenAPI** - автоматическая документация API
- **Postman** - коллекции для тестирования

### Logging & Monitoring
- **Winston** или **Pino** - логирование
- **Morgan** - HTTP request логи
- **Sentry** - отслеживание ошибок
- **Datadog** или **New Relic** - мониторинг производительности

### Validation
- **Joi** или **Zod** - валидация входящих данных
- **express-validator** - middleware для валидации

### Security
- **Helmet** - безопасность HTTP заголовков
- **CORS** - настройка Cross-Origin
- **express-mongo-sanitize** - защита от NoSQL injection
- **xss-clean** - защита от XSS
- **hpp** - защита от HTTP Parameter Pollution
- **rate-limiter-flexible** - продвинутый rate limiting

## DevOps & Infrastructure

### Containerization
- **Docker** - контейнеризация приложения
- **Docker Compose** - локальная разработка

### Cloud Platform
- **AWS (Amazon Web Services)** - рекомендуемый
  - EC2 или ECS/Fargate - хостинг приложения
  - RDS - управляемая PostgreSQL
  - ElastiCache - управляемый Redis
  - S3 - файловое хранилище
  - CloudFront - CDN
  - Route 53 - DNS
  - SES - email
- **Google Cloud Platform** - альтернатива
- **DigitalOcean** - бюджетный вариант

### CI/CD
- **GitHub Actions** - автоматизация
- **GitLab CI** - альтернатива
- **Jenkins** - для сложных пайплайнов

### Orchestration
- **Kubernetes** - для масштабирования
- **Docker Swarm** - легковесная альтернатива

### Infrastructure as Code
- **Terraform** - управление инфраструктурой
- **Ansible** - конфигурация серверов

### Monitoring & Analytics
- **Grafana** + **Prometheus** - метрики и дашборды
- **ELK Stack** (Elasticsearch, Logstash, Kibana) - логи
- **Google Analytics** - веб-аналитика
- **Mixpanel** или **Amplitude** - продуктовая аналитика

### SSL/TLS
- **Let's Encrypt** - бесплатные SSL сертификаты
- **Certbot** - автоматическое обновление

## Development Tools

### Version Control
- **Git** + **GitHub** / **GitLab**
- **Git Flow** или **Trunk Based Development**

### API Testing
- **Postman** - тестирование API
- **Insomnia** - альтернатива

### Database Tools
- **pgAdmin** - администрирование PostgreSQL
- **DBeaver** - универсальный клиент
- **Prisma Studio** - GUI для Prisma

### Code Quality
- **ESLint** - линтинг JavaScript/TypeScript
- **Prettier** - форматирование кода
- **SonarQube** - анализ качества кода
- **Husky** - git hooks

### Documentation
- **Storybook** - документация UI компонентов
- **JSDoc** - документация кода
- **Docusaurus** - документация проекта

## Recommended Architecture

### Microservices (для масштабирования)
1. **User Service** - аутентификация, профили
2. **Product Service** - управление товарами
3. **Order Service** - обработка заказов
4. **Payment Service** - платежи
5. **Notification Service** - уведомления
6. **Chat Service** - мессенджер
7. **Rating Service** - отзывы и рейтинги

### API Gateway
- **Kong** или **AWS API Gateway**
- Centralized routing, authentication, rate limiting

### Message Queue (для микросервисов)
- **RabbitMQ** - традиционная очередь
- **Apache Kafka** - для больших объемов данных
- **AWS SQS** - управляемая очередь

## Alternative Stack (Fullstack Next.js)

Если предпочесть fullstack подход:

- **Next.js 14+** (App Router)
- **tRPC** - type-safe API
- **Prisma** - ORM
- **NextAuth.js** - аутентификация
- **Vercel** - хостинг

Преимущества:
- Server-side rendering (SEO)
- Лучшая производительность
- Единая кодовая база
- Type-safety от фронта до БД

## Рекомендуемый для старта (MVP)

### Frontend
- React + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- React Query + Axios
- React Hook Form + Zod
- Google Maps API

### Backend
- Node.js + Express + TypeScript
- PostgreSQL + Prisma
- Redis для кеша
- JWT аутентификация
- Socket.io для чата

### Storage
- AWS S3 или Cloudinary

### Hosting
- Frontend: Vercel / Netlify
- Backend: Railway / Render / DigitalOcean
- DB: Supabase / Neon (управляемый PostgreSQL)

Этот стек позволит быстро начать разработку MVP с возможностью масштабирования.
