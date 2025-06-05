#!/bin/bash

# 색상 정의
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting build and test process...${NC}"

# 1. 의존성 설치 확인
echo -e "\n${GREEN}Checking dependencies...${NC}"
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
else
    echo "Dependencies already installed"
fi

# 2. 프로덕션 빌드
echo -e "\n${GREEN}Building for production...${NC}"
npm run build

# 빌드 실패 체크
if [ $? -ne 0 ]; then
    echo -e "${RED}Build failed!${NC}"
    exit 1
fi

# 3. 빌드된 결과물 미리보기
echo -e "\n${GREEN}Starting preview server...${NC}"
echo -e "Preview server will be available at: ${GREEN}http://localhost:4173/natural-wine-pages/${NC}"
echo -e "Press ${GREEN}Ctrl+C${NC} to stop the server"
npm run preview