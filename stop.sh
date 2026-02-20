#!/bin/bash

# Pluribus - Остановка всех компонентов
# Использование: ./stop.sh

set -e

# Цвета для вывода
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔═══════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   🛑 Pluribus - Stop Script           ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════╝${NC}"
echo ""

# Остановка по PID из файла
if [ -f /tmp/pluribus.pids ]; then
    echo -e "${YELLOW}Остановка по сохраненным PID...${NC}"
    source /tmp/pluribus.pids

    if [ ! -z "$BACKEND_PID" ]; then
        echo -e "Останавливаю Backend (PID: $BACKEND_PID)..."
        kill $BACKEND_PID 2>/dev/null && echo -e "${GREEN}✓${NC} Backend остановлен" || echo -e "${YELLOW}⚠${NC}  Backend уже остановлен"
    fi

    if [ ! -z "$FRONTEND_PID" ]; then
        echo -e "Останавливаю Frontend (PID: $FRONTEND_PID)..."
        kill $FRONTEND_PID 2>/dev/null && echo -e "${GREEN}✓${NC} Frontend остановлен" || echo -e "${YELLOW}⚠${NC}  Frontend уже остановлен"
    fi

    rm /tmp/pluribus.pids
    echo ""
fi

# Остановка по портам (на всякий случай)
echo -e "${YELLOW}Проверка занятых портов...${NC}"

# Backend (5001)
if lsof -Pi :5001 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "Останавливаю процесс на порту 5001..."
    kill $(lsof -t -i:5001) 2>/dev/null
    echo -e "${GREEN}✓${NC} Порт 5001 освобожден"
else
    echo -e "${GREEN}✓${NC} Порт 5001 свободен"
fi

# Frontend (3000)
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "Останавливаю процесс на порту 3000..."
    kill $(lsof -t -i:3000) 2>/dev/null
    echo -e "${GREEN}✓${NC} Порт 3000 освобожден"
else
    echo -e "${GREEN}✓${NC} Порт 3000 свободен"
fi

# Prisma Studio (5555)
if lsof -Pi :5555 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "Останавливаю Prisma Studio (порт 5555)..."
    kill $(lsof -t -i:5555) 2>/dev/null
    echo -e "${GREEN}✓${NC} Prisma Studio остановлен"
fi

echo ""

# Опция: остановить PostgreSQL и Redis
read -p "Остановить PostgreSQL и Redis? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Останавливаю PostgreSQL...${NC}"
    brew services stop postgresql@15
    echo -e "${GREEN}✓${NC} PostgreSQL остановлен"

    echo -e "${YELLOW}Останавливаю Redis...${NC}"
    brew services stop redis
    echo -e "${GREEN}✓${NC} Redis остановлен"
fi

echo ""
echo -e "${GREEN}╔═══════════════════════════════════════╗${NC}"
echo -e "${GREEN}║     ✅ Все компоненты остановлены!    ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════╝${NC}"
echo ""
