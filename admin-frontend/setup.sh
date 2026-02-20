#!/bin/bash

# Admin Frontend - Setup Script
# Создает .env.local и устанавливает зависимости

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}╔═══════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Admin Frontend - Setup               ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════╝${NC}"
echo ""

# Проверка node_modules
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}[1/2]${NC} Установка зависимостей..."
    npm install
    echo -e "${GREEN}✓${NC} Зависимости установлены"
else
    echo -e "${GREEN}✓${NC} Зависимости уже установлены"
fi

# Создание .env.local если его нет
if [ ! -f ".env.local" ]; then
    echo -e "${YELLOW}[2/2]${NC} Создание .env.local..."
    cat > .env.local << 'EOF'
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5001/api

# Frontend URL (for external links)
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
EOF
    echo -e "${GREEN}✓${NC} .env.local создан"
else
    echo -e "${GREEN}✓${NC} .env.local уже существует"
fi

echo ""
echo -e "${GREEN}╔═══════════════════════════════════════╗${NC}"
echo -e "${GREEN}║     ✅ Setup завершен!                ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}📝 Следующие шаги:${NC}"
echo -e "   1. Запустите админ-панель:    npm run dev"
echo -e "   2. Откройте в браузере:       http://localhost:3001"
echo -e "   3. Войдите с учетными данными ADMIN:"
echo -e "      Email:    admin@pluribus.com"
echo -e "      Password: password123"
echo ""
