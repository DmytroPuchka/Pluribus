# Pluribus - ЭТАП 0: ПОДГОТОВКА (Setup Phase)

**Платформа:** Международная платформа для связи отправителей и получателей товаров

---

## Таблица содержания

1. [Инициализация репозитория](#1-инициализация-репозитория)
2. [Настройка Frontend окружения](#2-настройка-frontend-окружения)
3. [Настройка Backend окружения](#3-настройка-backend-окружения)
4. [Database setup](#4-database-setup)
5. [CI/CD Pipeline](#5-cicd-pipeline)
6. [Development tools](#6-development-tools)
7. [Project documentation](#7-project-documentation)

---

## 1. Инициализация репозитория

### 1.1 Git setup

```bash
# Создание репозитория
cd /path/to/Pluribus
git init

# Конфигурация
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Создание основных веток
git checkout -b main
git checkout -b develop
git checkout main
```

### 1.2 Branching strategy

**Git Flow Workflow:**

- **main** - Production releases (защищена, требует PR и review)
- **develop** - Development branch (основная ветка разработки)
- **feature/xxx** - Новые функции (из develop)
- **bugfix/xxx** - Исправления ошибок (из develop)
- **hotfix/xxx** - Критичные исправления (из main)
- **release/x.x.x** - Подготовка к релизу

**Конвенции именования веток:**
```
feature/auth-setup
feature/shipping-calculator
bugfix/login-validation
hotfix/payment-gateway-error
release/1.0.0
```

### 1.3 .gitignore настройки

Файл: `/.gitignore`

```
# Dependencies
node_modules/
*.pnp
.pnp.js
venv/
__pycache__/
*.py[cod]

# Environment variables
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~
.DS_Store

# Build artifacts
dist/
build/
*.log
npm-debug.log*

# OS
Thumbs.db
.DS_Store
.AppleDouble
.LSOverride

# Testing
coverage/
.nyc_output/

# Docker
.dockerignore

# Misc
tmp/
temp/
*.bak
```

---

## 2. Настройка Frontend окружения

### 2.1 Инициализация React + TypeScript + Vite проекта

```bash
# Создание frontend директории
mkdir frontend
cd frontend

# Инициализация Vite проекта с React + TypeScript
npm create vite@latest . -- --template react-ts

# Или через yarn
yarn create vite . --template react-ts
```

**Структура после инициализации:**
```
frontend/
├── public/
├── src/
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   ├── vite-env.d.ts
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── .eslintrc.cjs
```

### 2.2 Установка основных зависимостей

```bash
cd frontend

# React Router для навигации
npm install react-router-dom

# State management (Zustand для легкого setup)
npm install zustand

# HTTP клиент
npm install axios

# UI компоненты (Headless UI)
npm install @headlessui/react

# Утилиты
npm install classnames clsx

# Forms handling
npm install react-hook-form

# Валидация
npm install zod @hookform/resolvers

# Date handling
npm install date-fns

# Иконки
npm install react-icons

# Notifications/Toast
npm install react-hot-toast

# Development зависимости
npm install -D @types/node @types/react @types/react-dom
npm install -D typescript
npm install -D @vitejs/plugin-react
```

**Финальный package.json скрипты:**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "preview": "vite preview",
    "type-check": "tsc --noEmit",
    "format": "prettier --write ."
  }
}
```

### 2.3 ESLint, Prettier, Husky настройка

**Установка:**
```bash
npm install -D eslint eslint-plugin-react eslint-plugin-react-hooks
npm install -D prettier
npm install -D husky lint-staged
```

**ESLint конфиг - `.eslintrc.cjs`:**

```javascript
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_' },
    ],
  },
}
```

**Prettier конфиг - `.prettierrc.json`:**

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "always"
}
```

**Prettier ignore - `.prettierignore`:**

```
dist/
build/
node_modules/
.vite/
coverage/
```

**Husky setup:**

```bash
npx husky install

# Добавить pre-commit hook
npx husky add .husky/pre-commit "npx lint-staged"

# Добавить commit-msg hook (optional)
npx husky add .husky/commit-msg 'echo "Commit message format: [type]: description"'
```

**lint-staged конфиг - `.lintstagedrc.json`:**

```json
{
  "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{json,md}": ["prettier --write"]
}
```

### 2.4 Конфигурация Tailwind CSS

```bash
# Установка Tailwind CSS
npm install -D tailwindcss postcss autoprefixer

# Генерация конфигов
npx tailwindcss init -p
```

**tailwind.config.js:**

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        },
        secondary: {
          50: '#fef3c7',
          500: '#f59e0b',
          600: '#d97706',
        },
      },
    },
  },
  plugins: [],
}
```

**postcss.config.js:**

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

**src/index.css:**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors;
  }

  .btn-secondary {
    @apply px-4 py-2 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-colors;
  }

  .card {
    @apply bg-white rounded-lg shadow-md p-6;
  }
}
```

---

## 3. Настройка Backend окружения

### 3.1 Инициализация Node.js + Express + TypeScript

```bash
# Создание backend директории
mkdir backend
cd backend

# Инициализация npm проекта
npm init -y

# Установка TypeScript
npm install -D typescript @types/node ts-node

# Инициализация TypeScript конфига
npx tsc --init
```

**tsconfig.json:**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@routes/*": ["src/routes/*"],
      "@controllers/*": ["src/controllers/*"],
      "@services/*": ["src/services/*"],
      "@models/*": ["src/models/*"],
      "@middleware/*": ["src/middleware/*"],
      "@utils/*": ["src/utils/*"],
      "@types/*": ["src/types/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### 3.2 Установка зависимостей

```bash
# Core dependencies
npm install express cors dotenv helmet compression uuid

# Database
npm install @prisma/client

# Validation
npm install zod

# Authentication
npm install jsonwebtoken bcryptjs
npm install -D @types/jsonwebtoken @types/bcryptjs

# Logging
npm install winston

# File upload
npm install multer
npm install -D @types/multer

# Development dependencies
npm install -D nodemon tsx
npm install -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
npm install -D prettier
npm install -D jest @types/jest ts-jest
npm install -D supertest @types/supertest
```

### 3.3 Настройка линтеров

**.eslintrc.json:**

```json
{
  "env": {
    "node": true,
    "es2021": true,
    "jest": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint"],
  "rules": {
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { "argsIgnorePattern": "^_" }
    ],
    "no-console": [
      "warn",
      { "allow": ["warn", "error"] }
    ]
  }
}
```

**.prettierrc.json:**

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "always"
}
```

**package.json scripts:**

```json
{
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "lint": "eslint src --ext ts",
    "lint:fix": "eslint src --ext ts --fix",
    "format": "prettier --write \"src/**/*.ts\"",
    "test": "jest",
    "test:watch": "jest --watch",
    "db:push": "prisma db push",
    "db:seed": "tsx src/seed.ts"
  }
}
```

### 3.4 Prisma setup

```bash
# Установка Prisma CLI
npm install -D prisma

# Инициализация Prisma
npx prisma init
```

**Базовая структура - prisma/schema.prisma:**

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Models будут добавлены позже в ЭТАПЕ 1

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String
  phone     String?
  role      UserRole @default(USER)
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
}

enum UserRole {
  USER
  ADMIN
  MODERATOR
}
```

**Backend структура каталогов:**

```
backend/
├── src/
│   ├── controllers/
│   │   └── health.controller.ts
│   ├── routes/
│   │   ├── index.ts
│   │   └── health.routes.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── errorHandler.ts
│   │   └── requestLogger.ts
│   ├── services/
│   ├── utils/
│   ├── types/
│   ├── config/
│   │   └── database.ts
│   ├── seed.ts
│   └── index.ts
├── prisma/
│   └── schema.prisma
├── tests/
├── .env.example
├── .eslintrc.json
├── .prettierrc.json
├── tsconfig.json
├── package.json
└── vite.config.ts
```

**src/index.ts (Basic setup):**

```typescript
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

---

## 4. Database setup

### 4.1 PostgreSQL установка

**Для macOS (Homebrew):**

```bash
# Установка PostgreSQL
brew install postgresql@15

# Запуск PostgreSQL
brew services start postgresql@15

# Создание базы данных
createdb pluribus_dev
createdb pluribus_test

# Проверка подключения
psql pluribus_dev -c "SELECT version();"
```

**Альтернатива через Docker:**

Файл: `docker-compose.yml`

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: pluribus-postgres
    environment:
      POSTGRES_USER: pluribus_user
      POSTGRES_PASSWORD: pluribus_password
      POSTGRES_DB: pluribus_dev
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - pluribus-network

  redis:
    image: redis:7-alpine
    container_name: pluribus-redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - pluribus-network

volumes:
  postgres_data:
  redis_data:

networks:
  pluribus-network:
    driver: bridge
```

### 4.2 Redis setup

**Через Homebrew (macOS):**

```bash
# Установка Redis
brew install redis

# Запуск Redis
brew services start redis

# Проверка
redis-cli ping
# Ожидаемый ответ: PONG
```

**Или через Docker (см. docker-compose.yml выше)**

### 4.3 Environment variables

**backend/.env:**

```
# Database
DATABASE_URL="postgresql://pluribus_user:pluribus_password@localhost:5432/pluribus_dev"

# Server
PORT=3000
NODE_ENV=development

# Redis
REDIS_URL="redis://localhost:6379"

# JWT
JWT_SECRET="your_super_secret_jwt_key_change_in_production"
JWT_EXPIRES_IN=24h

# CORS
CORS_ORIGIN="http://localhost:5173"

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_DIR=./uploads
```

**backend/.env.example:**

```
DATABASE_URL="postgresql://user:password@localhost:5432/pluribus_dev"
PORT=3000
NODE_ENV=development
REDIS_URL="redis://localhost:6379"
JWT_SECRET="your_secret_key"
JWT_EXPIRES_IN=24h
CORS_ORIGIN="http://localhost:5173"
MAX_FILE_SIZE=5242880
UPLOAD_DIR=./uploads
```

**frontend/.env:**

```
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=Pluribus
VITE_APP_VERSION=0.1.0
```

**frontend/.env.example:**

```
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=Pluribus
VITE_APP_VERSION=0.1.0
```

### 4.4 Начальная Prisma миграция

```bash
cd backend

# Создание первой миграции
npx prisma migrate dev --name init

# Генерация Prisma клиента
npx prisma generate

# Открытие Prisma Studio (для визуализации)
npx prisma studio
```

---

## 5. CI/CD Pipeline

### 5.1 GitHub Actions настройка

Файл: `.github/workflows/test-and-lint.yml`

```yaml
name: Test and Lint

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  backend:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:15-alpine
        env:
          POSTGRES_USER: pluribus_user
          POSTGRES_PASSWORD: pluribus_password
          POSTGRES_DB: pluribus_test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: backend/package-lock.json

      - name: Install dependencies (Backend)
        working-directory: backend
        run: npm ci

      - name: Lint (Backend)
        working-directory: backend
        run: npm run lint

      - name: Type check (Backend)
        working-directory: backend
        run: npm run type-check

      - name: Run tests (Backend)
        working-directory: backend
        env:
          DATABASE_URL: "postgresql://pluribus_user:pluribus_password@localhost:5432/pluribus_test"
        run: npm test

  frontend:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json

      - name: Install dependencies (Frontend)
        working-directory: frontend
        run: npm ci

      - name: Lint (Frontend)
        working-directory: frontend
        run: npm run lint

      - name: Type check (Frontend)
        working-directory: frontend
        run: npm run type-check

      - name: Build (Frontend)
        working-directory: frontend
        run: npm run build
```

**Файл: `.github/workflows/build-docker.yml`**

```yaml
name: Build Docker Images

on:
  push:
    branches: [main, develop]
    tags: ['v*']

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2

      - name: Login to Docker Hub
        if: github.event_name != 'pull_request'
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Build and push Backend
        uses: docker/build-push-action@v4
        with:
          context: ./backend
          push: ${{ github.event_name != 'pull_request' }}
          tags: ${{ secrets.DOCKER_USERNAME }}/pluribus-backend:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max

      - name: Build and push Frontend
        uses: docker/build-push-action@v4
        with:
          context: ./frontend
          push: ${{ github.event_name != 'pull_request' }}
          tags: ${{ secrets.DOCKER_USERNAME }}/pluribus-frontend:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max
```

---

## 6. Development tools

### 6.1 Docker compose для локальной разработки

Файл: `docker-compose.yml` (обновленный)

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: pluribus-postgres
    environment:
      POSTGRES_USER: ${DB_USER:-pluribus_user}
      POSTGRES_PASSWORD: ${DB_PASSWORD:-pluribus_password}
      POSTGRES_DB: ${DB_NAME:-pluribus_dev}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - pluribus-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U pluribus_user"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: pluribus-redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - pluribus-network
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  adminer:
    image: adminer
    container_name: pluribus-adminer
    ports:
      - "8080:8080"
    networks:
      - pluribus-network
    depends_on:
      - postgres

volumes:
  postgres_data:
  redis_data:

networks:
  pluribus-network:
    driver: bridge
```

**Команды для работы:**

```bash
# Запуск всех сервисов
docker-compose up -d

# Остановка сервисов
docker-compose down

# Просмотр логов
docker-compose logs -f

# Просмотр логов конкретного сервиса
docker-compose logs -f postgres

# Перестройка контейнеров
docker-compose up -d --build

# Доступ к postgres через psql
docker exec -it pluribus-postgres psql -U pluribus_user -d pluribus_dev

# Доступ к Redis CLI
docker exec -it pluribus-redis redis-cli
```

### 6.2 Makefile для упрощения команд

Файл: `Makefile` (в корне проекта)

```makefile
.PHONY: help install dev build test lint format clean docker-up docker-down

help:
	@echo "Available commands:"
	@echo "  make install       - Install dependencies for both frontend and backend"
	@echo "  make dev           - Start development servers"
	@echo "  make build         - Build both frontend and backend"
	@echo "  make test          - Run tests"
	@echo "  make lint          - Run linting"
	@echo "  make format        - Format code"
	@echo "  make docker-up     - Start Docker containers"
	@echo "  make docker-down   - Stop Docker containers"
	@echo "  make clean         - Clean build artifacts"

install:
	cd frontend && npm install
	cd backend && npm install

dev:
	@echo "Starting development servers..."
	cd frontend && npm run dev &
	cd backend && npm run dev &

build:
	cd frontend && npm run build
	cd backend && npm run build

test:
	cd backend && npm test

lint:
	cd frontend && npm run lint
	cd backend && npm run lint

format:
	cd frontend && npm run format
	cd backend && npm run format

clean:
	rm -rf frontend/dist backend/dist
	rm -rf frontend/node_modules backend/node_modules

docker-up:
	docker-compose up -d

docker-down:
	docker-compose down

db-migrate:
	cd backend && npx prisma migrate dev

db-seed:
	cd backend && npx prisma db seed
```

### 6.3 API документация setup (Swagger)

**Установка:**

```bash
cd backend
npm install express-openapi-validator swagger-jsdoc swagger-ui-express
npm install -D @types/swagger-jsdoc
```

**Файл: backend/swagger.config.ts**

```typescript
import swaggerJsdoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Pluribus API',
    version: '1.0.0',
    description: 'International platform for connecting senders and receivers of goods',
    contact: {
      name: 'Pluribus Team',
      email: 'support@pluribus.io',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Development server',
    },
    {
      url: 'https://api.pluribus.io',
      description: 'Production server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};

export const swaggerOptions = {
  definition: swaggerDefinition,
  apis: ['./src/routes/**/*.ts', './src/controllers/**/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
```

**Добавить в backend/src/index.ts:**

```typescript
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger.config';

// ... existing middleware

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
```

---

## 7. Project documentation

### 7.1 README.md (основной)

Файл: `README.md`

```markdown
# Pluribus - International Logistics Platform

[![Test and Lint](https://github.com/yourorg/Pluribus/workflows/Test%20and%20Lint/badge.svg)](https://github.com/yourorg/Pluribus/actions)
[![Docker Image](https://github.com/yourorg/Pluribus/workflows/Build%20Docker%20Images/badge.svg)](https://github.com/yourorg/Pluribus/actions)

International platform for connecting senders and receivers of goods.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)

## ✨ Features

- User authentication and authorization
- Real-time shipping tracking
- Multi-currency support
- Notification system
- Rating and review system

## 🛠 Tech Stack

### Frontend
- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router
- Zustand
- Axios

### Backend
- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL
- Redis
- JWT Authentication

### DevOps
- Docker & Docker Compose
- GitHub Actions
- ESLint & Prettier

## 📦 Prerequisites

- Node.js 18+
- npm 9+
- PostgreSQL 15+
- Redis 7+
- Docker & Docker Compose (optional)

## 🚀 Installation

### 1. Clone the repository

\`\`\`bash
git clone https://github.com/yourorg/Pluribus.git
cd Pluribus
\`\`\`

### 2. Install dependencies

\`\`\`bash
make install
# или вручную:
cd frontend && npm install
cd ../backend && npm install
\`\`\`

### 3. Setup environment variables

\`\`\`bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
\`\`\`

### 4. Start development services

\`\`\`bash
# With Docker
make docker-up

# Or manually start PostgreSQL and Redis
\`\`\`

### 5. Run database migrations

\`\`\`bash
cd backend
npx prisma migrate dev
\`\`\`

## 👨‍💻 Development

### Start development servers

\`\`\`bash
make dev

# Or separately:
# Terminal 1
cd frontend && npm run dev

# Terminal 2
cd backend && npm run dev
\`\`\`

- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- API Docs: http://localhost:3000/api-docs
- Adminer: http://localhost:8080

## 🧪 Testing

\`\`\`bash
# Run all tests
make test

# Backend tests only
cd backend && npm test

# Watch mode
cd backend && npm run test:watch
\`\`\`

## 📝 Linting & Formatting

\`\`\`bash
# Lint all code
make lint

# Format all code
make format

# Fix linting issues
cd frontend && npm run lint:fix
cd backend && npm run lint:fix
\`\`\`

## 📚 API Documentation

API documentation is available at `http://localhost:3000/api-docs` when running the development server.

## 🐳 Docker Deployment

\`\`\`bash
# Build images
docker-compose build

# Run containers
docker-compose up -d

# View logs
docker-compose logs -f
\`\`\`

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 📄 License

MIT

## 👥 Team

- [Your Name](https://github.com/yourname)

---

For detailed setup instructions, see [phase_0_setup.md](./phase_0_setup.md)
\`\`\`

### 7.2 CONTRIBUTING.md

Файл: `CONTRIBUTING.md`

```markdown
# Contributing to Pluribus

We appreciate your interest in contributing to Pluribus! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Follow project standards and conventions

## Getting Started

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Run tests and linting
5. Commit with clear messages
6. Push to your fork
7. Create a Pull Request

## Branching Strategy

We use Git Flow:
- `main` - Production releases
- `develop` - Development branch
- `feature/xxx` - New features
- `bugfix/xxx` - Bug fixes
- `hotfix/xxx` - Critical fixes

## Commit Messages

Follow conventional commits format:

```
[type]: [description]

[optional body]
[optional footer]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Example:
```
feat: add shipping calculator

- Implement distance-based pricing
- Add international rate support
```

## Code Style

- Use TypeScript with strict mode
- Run `npm run lint:fix` before committing
- Follow Tailwind CSS conventions for styling
- Write meaningful variable and function names

## Testing Requirements

- Backend: Minimum 80% code coverage
- Write tests for new features
- Run `npm test` before submitting PR

## Pull Request Process

1. Update README.md with any new features
2. Ensure all tests pass
3. Update documentation if needed
4. Request review from maintainers
5. Address review feedback

## Reporting Bugs

Create an issue with:
- Description of the bug
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)

## Feature Requests

Create an issue with:
- Clear description of the feature
- Use cases
- Proposed implementation (optional)

## Questions?

Open an issue or contact the maintainers.
```

### 7.3 Стандарты кода

Файл: `CODING_STANDARDS.md`

```markdown
# Coding Standards

## Frontend Standards

### Component Structure

```typescript
// src/components/Card.tsx
import React from 'react';
import { FC, ReactNode } from 'react';

interface CardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

/**
 * Card component for displaying grouped content
 * @param title - Card title
 * @param children - Card content
 * @param className - Additional CSS classes
 */
export const Card: FC<CardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`card ${className}`}>
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
};
```

### Hooks Usage

```typescript
// Use custom hooks for reusable logic
import { useState, useEffect } from 'react';

export const useFetch = (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch logic
  }, [url]);

  return { data, loading, error };
};
```

### File Organization

```
src/
├── components/
│   ├── common/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Dashboard.tsx
│   │   └── Profile.tsx
│   └── forms/
│       ├── LoginForm.tsx
│       └── RegisterForm.tsx
├── hooks/
│   ├── useAuth.ts
│   ├── useFetch.ts
│   └── useLocalStorage.ts
├── services/
│   ├── api.ts
│   ├── auth.service.ts
│   └── shipping.service.ts
├── store/
│   ├── authStore.ts
│   └── appStore.ts
├── types/
│   ├── User.ts
│   ├── Shipment.ts
│   └── API.ts
└── utils/
    ├── validators.ts
    ├── formatters.ts
    └── constants.ts
```

## Backend Standards

### Controller Structure

```typescript
// src/controllers/userController.ts
import { Request, Response } from 'express';
import { UserService } from '@services/userService';

export class UserController {
  constructor(private userService: UserService) {}

  async createUser(req: Request, res: Response) {
    try {
      const user = await this.userService.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
```

### Service Pattern

```typescript
// src/services/userService.ts
import { PrismaClient } from '@prisma/client';

export class UserService {
  private prisma: PrismaClient;

  async create(data: CreateUserInput): Promise<User> {
    // Implementation
  }

  async findById(id: string): Promise<User | null> {
    // Implementation
  }

  async update(id: string, data: UpdateUserInput): Promise<User> {
    // Implementation
  }
}
```

### Error Handling

```typescript
export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

// Usage
throw new AppError(404, 'User not found');
```

### File Organization

```
backend/
├── src/
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── middleware/
│   ├── routes/
│   ├── types/
│   ├── utils/
│   ├── validators/
│   ├── config/
│   └── index.ts
└── prisma/
    └── schema.prisma
```

## General Standards

### TypeScript

- Always use explicit types
- Avoid `any` type
- Use `readonly` for immutable data
- Use enums for fixed values

### Naming Conventions

- **Files**: `camelCase.ts` or `kebab-case.ts`
- **Classes**: `PascalCase`
- **Functions/Variables**: `camelCase`
- **Constants**: `UPPER_SNAKE_CASE`
- **Interfaces**: `IPascalCase` (optional I prefix)

### Comments

```typescript
/**
 * Calculate shipping cost based on distance and weight
 * @param distance - Distance in kilometers
 * @param weight - Weight in kilograms
 * @returns Shipping cost in cents
 */
function calculateShippingCost(distance: number, weight: number): number {
  // Implementation
}
```

### Testing

- Write tests for critical features
- Aim for 80%+ code coverage
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)

```typescript
describe('UserService', () => {
  it('should create user with valid data', () => {
    // Arrange
    const userData = { email: 'test@example.com' };

    // Act
    const result = userService.create(userData);

    // Assert
    expect(result).toBeDefined();
    expect(result.email).toBe(userData.email);
  });
});
```
```

---

## 📋 Контрольный лист для ЭТАПА 0

- [ ] Git репозиторий инициализирован
- [ ] .gitignore настроен
- [ ] Frontend проект создан (React + TypeScript + Vite)
- [ ] ESLint, Prettier, Husky установлены (Frontend)
- [ ] Tailwind CSS настроен
- [ ] Backend проект создан (Express + TypeScript)
- [ ] ESLint, Prettier настроены (Backend)
- [ ] Prisma инициализирован
- [ ] PostgreSQL установлен и настроен
- [ ] Redis установлен и настроен
- [ ] Docker Compose файл создан
- [ ] Environment variables заполнены
- [ ] GitHub Actions workflows созданы
- [ ] Swagger/OpenAPI настроен
- [ ] Основная документация написана (README, CONTRIBUTING, CODING_STANDARDS)
- [ ] Первая миграция Prisma выполнена
- [ ] Локальная разработка работает (frontend + backend + DB)

---

## 🔗 Полезные ссылки

- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Express.js Documentation](https://expressjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Docker Documentation](https://docs.docker.com)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

**Версия документа:** 1.0.0
**Последнее обновление:** 2026-02-01
**Статус:** ГОТОВО К РЕАЛИЗАЦИИ
