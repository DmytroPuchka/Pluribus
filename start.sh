#!/bin/bash

# Pluribus - Автоматический запуск всех компонентов
# Использование: ./start.sh

set -e

# Цвета для вывода
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

PROJECT_DIR="/Users/dmitrijpucka/Documents/ClaudeCode projects/Pluribus"

echo -e "${BLUE}╔═══════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   🚀 Pluribus - Quick Start Script   ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════╝${NC}"
echo ""

# Проверка что PostgreSQL запущен
echo -e "${YELLOW}[1/5]${NC} Проверка PostgreSQL..."
if brew services list | grep postgresql@15 | grep started > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} PostgreSQL запущен"
else
    echo -e "${YELLOW}⚠${NC}  PostgreSQL не запущен, запускаю..."
    brew services start postgresql@15
    sleep 2
    echo -e "${GREEN}✓${NC} PostgreSQL запущен"
fi

# Проверка что Redis запущен
echo -e "${YELLOW}[2/5]${NC} Проверка Redis..."
if brew services list | grep redis | grep started > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Redis запущен"
else
    echo -e "${YELLOW}⚠${NC}  Redis не запущен, запускаю..."
    brew services start redis
    sleep 1
    echo -e "${GREEN}✓${NC} Redis запущен"
fi

# Запуск Backend
echo -e "${YELLOW}[3/5]${NC} Запуск Backend API..."
cd "$PROJECT_DIR/backend"

# Проверка что порт 5001 свободен
if lsof -Pi :5001 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "${RED}✗${NC} Порт 5001 занят. Останавливаю процесс..."
    kill $(lsof -t -i:5001) 2>/dev/null || true
    sleep 1
fi

# Запуск Backend в фоне
export PATH="/usr/local/opt/postgresql@15/bin:$PATH"
npm run dev > /tmp/pluribus-backend.log 2>&1 &
BACKEND_PID=$!
echo -e "${GREEN}✓${NC} Backend запущен (PID: $BACKEND_PID)"
echo "   Логи: /tmp/pluribus-backend.log"

# Ждем запуска Backend
echo "   Ожидание запуска Backend..."
for i in {1..10}; do
    if curl -s http://localhost:5001/health > /dev/null 2>&1; then
        echo -e "${GREEN}✓${NC} Backend готов: http://localhost:5001"
        break
    fi
    sleep 1
    echo -n "."
done
echo ""

# Запуск Frontend
echo -e "${YELLOW}[4/5]${NC} Запуск Frontend..."
cd "$PROJECT_DIR/frontend"

# Проверка что порт 3000 свободен
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "${RED}✗${NC} Порт 3000 занят. Останавливаю процесс..."
    kill $(lsof -t -i:3000) 2>/dev/null || true
    sleep 1
fi

# Запуск Frontend в фоне
npm run dev > /tmp/pluribus-frontend.log 2>&1 &
FRONTEND_PID=$!
echo -e "${GREEN}✓${NC} Frontend запущен (PID: $FRONTEND_PID)"
echo "   Логи: /tmp/pluribus-frontend.log"

# Ждем запуска Frontend
echo "   Ожидание запуска Frontend..."
for i in {1..15}; do
    if curl -s http://localhost:3000 > /dev/null 2>&1; then
        echo -e "${GREEN}✓${NC} Frontend готов: http://localhost:3000"
        break
    fi
    sleep 1
    echo -n "."
done
echo ""

# Запуск Admin Frontend
echo -e "${YELLOW}[5/5]${NC} Запуск Admin Frontend..."
cd "$PROJECT_DIR/admin-frontend"

# Автоматический setup если нужно
if [ ! -f ".env.local" ] || [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚠${NC}  Первый запуск Admin Frontend, выполняю setup..."
    ./setup.sh
fi

# Проверка что порт 3001 свободен
if lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "${RED}✗${NC} Порт 3001 занят. Останавливаю процесс..."
    kill $(lsof -t -i:3001) 2>/dev/null || true
    sleep 1
fi

# Запуск Admin Frontend в фоне
npm run dev > /tmp/pluribus-admin.log 2>&1 &
ADMIN_PID=$!
echo -e "${GREEN}✓${NC} Admin Frontend запущен (PID: $ADMIN_PID)"
echo "   Логи: /tmp/pluribus-admin.log"

# Ждем запуска Admin Frontend
echo "   Ожидание запуска Admin Frontend..."
for i in {1..15}; do
    if curl -s http://localhost:3001 > /dev/null 2>&1; then
        echo -e "${GREEN}✓${NC} Admin Frontend готов: http://localhost:3001"
        break
    fi
    sleep 1
    echo -n "."
done
echo ""

# Итоговая информация
echo ""
echo -e "${GREEN}╔═══════════════════════════════════════╗${NC}"
echo -e "${GREEN}║      ✅ Все компоненты запущены!      ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}📊 Доступные сервисы:${NC}"
echo -e "   ${GREEN}Frontend:${NC}       http://localhost:3000"
echo -e "   ${GREEN}Admin Panel:${NC}    http://localhost:3001  ⭐"
echo -e "   ${GREEN}Backend API:${NC}    http://localhost:5001"
echo -e "   ${GREEN}API Docs:${NC}       http://localhost:5001/api/v1"
echo -e "   ${GREEN}Health Check:${NC}   http://localhost:5001/health"
echo ""
echo -e "${BLUE}🔐 Тестовые аккаунты:${NC}"
echo -e "   ${BLUE}Frontend:${NC}"
echo -e "   Email: buyer@test.com       | Password: password123  (BUYER)"
echo -e "   Email: seller@test.com      | Password: password123  (SELLER)"
echo -e "   Email: both@test.com        | Password: password123  (SELLER)"
echo ""
echo -e "   ${BLUE}Admin Panel (только ADMIN):${NC}"
echo -e "   Email: admin@pluribus.com   | Password: password123  (ADMIN) ⭐"
echo ""
echo -e "${BLUE}📝 Process IDs:${NC}"
echo -e "   Backend:       ${BACKEND_PID}"
echo -e "   Frontend:      ${FRONTEND_PID}"
echo -e "   Admin Panel:   ${ADMIN_PID}"
echo ""
echo -e "${YELLOW}📋 Полезные команды:${NC}"
echo -e "   Просмотр логов Backend:      tail -f /tmp/pluribus-backend.log"
echo -e "   Просмотр логов Frontend:     tail -f /tmp/pluribus-frontend.log"
echo -e "   Просмотр логов Admin Panel:  tail -f /tmp/pluribus-admin.log"
echo -e "   Открыть Prisma Studio:       cd backend && npx prisma studio"
echo -e "   Остановить все:              ./stop.sh"
echo ""
echo -e "${GREEN}🎉 Готово к тестированию!${NC}"
echo ""

# Сохранить PIDs в файл для stop скрипта
echo "BACKEND_PID=${BACKEND_PID}" > /tmp/pluribus.pids
echo "FRONTEND_PID=${FRONTEND_PID}" >> /tmp/pluribus.pids
echo "ADMIN_PID=${ADMIN_PID}" >> /tmp/pluribus.pids

# Опция: открыть браузер автоматически
read -p "Открыть Frontend в браузере? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    open http://localhost:3000
fi
