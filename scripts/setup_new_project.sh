#!/bin/bash
# 새 프로젝트 설정 스크립트
# 사용법: ./setup_new_project.sh /path/to/new/project

set -e

# 색상 정의
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 사용법 확인
if [ $# -eq 0 ]; then
    echo "사용법: $0 <새프로젝트경로>"
    echo "예시: $0 ~/Documents/MyNewProject"
    exit 1
fi

NEW_PROJECT=$1
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SOURCE_DIR="$(dirname "$SCRIPT_DIR")"

echo -e "${BLUE}=== Figma 프로토타입 워크플로우 설정 ===${NC}\n"

# 새 프로젝트 폴더 생성
echo -e "${GREEN}[1/6]${NC} 새 프로젝트 폴더 생성: $NEW_PROJECT"
mkdir -p "$NEW_PROJECT"

# 필수 파일 복사
echo -e "${GREEN}[2/6]${NC} 필수 파일 복사 중..."

echo "  - CLAUDE.md"
cp "$SOURCE_DIR/CLAUDE.md" "$NEW_PROJECT/"

echo "  - md/ (절차 가이드)"
cp -r "$SOURCE_DIR/md" "$NEW_PROJECT/"

echo "  - scripts/ (자동화 스크립트)"
cp -r "$SOURCE_DIR/scripts" "$NEW_PROJECT/"

echo "  - templates/ (프로토타입 템플릿)"
cp -r "$SOURCE_DIR/templates" "$NEW_PROJECT/"

# 권장 파일 복사
echo -e "${GREEN}[3/6]${NC} 권장 파일 복사 중..."

if [ -f "$SOURCE_DIR/.gitignore" ]; then
    echo "  - .gitignore"
    cp "$SOURCE_DIR/.gitignore" "$NEW_PROJECT/"
fi

if [ -f "$SOURCE_DIR/README.md" ]; then
    echo "  - README.md"
    cp "$SOURCE_DIR/README.md" "$NEW_PROJECT/"
fi

if [ -f "$SOURCE_DIR/QUICKSTART.md" ]; then
    echo "  - QUICKSTART.md"
    cp "$SOURCE_DIR/QUICKSTART.md" "$NEW_PROJECT/"
fi

# 필수 폴더 생성
echo -e "${GREEN}[4/6]${NC} 출력 폴더 생성 중..."
mkdir -p "$NEW_PROJECT/xlt"
mkdir -p "$NEW_PROJECT/assets/screens"
mkdir -p "$NEW_PROJECT/assets/variants"
echo "  - xlt/"
echo "  - assets/screens/"
echo "  - assets/variants/"

# 스크립트 실행 권한 설정
echo -e "${GREEN}[5/6]${NC} 스크립트 실행 권한 설정 중..."
chmod +x "$NEW_PROJECT/scripts/"*.py
chmod +x "$NEW_PROJECT/scripts/"*.sh

# 검증
echo -e "${GREEN}[6/6]${NC} 설정 검증 중..."

ERRORS=0

if [ ! -f "$NEW_PROJECT/CLAUDE.md" ]; then
    echo -e "${YELLOW}⚠️  CLAUDE.md 복사 실패${NC}"
    ERRORS=$((ERRORS+1))
fi

if [ ! -d "$NEW_PROJECT/md" ]; then
    echo -e "${YELLOW}⚠️  md/ 폴더 복사 실패${NC}"
    ERRORS=$((ERRORS+1))
fi

if [ ! -d "$NEW_PROJECT/scripts" ]; then
    echo -e "${YELLOW}⚠️  scripts/ 폴더 복사 실패${NC}"
    ERRORS=$((ERRORS+1))
fi

if [ ! -d "$NEW_PROJECT/templates" ]; then
    echo -e "${YELLOW}⚠️  templates/ 폴더 복사 실패${NC}"
    ERRORS=$((ERRORS+1))
fi

if [ $ERRORS -eq 0 ]; then
    echo -e "\n${GREEN}✅ 설정 완료!${NC}\n"

    echo "다음 단계:"
    echo "1. cd $NEW_PROJECT"
    echo "2. pip install -r scripts/requirements.txt"
    echo "3. Claude Code에서 프로젝트 열기"
    echo "4. 'Figma URL로 프로토타입 생성해줘' 요청"

    echo -e "\n자세한 내용은 README.md 또는 QUICKSTART.md를 참조하세요."
else
    echo -e "\n${YELLOW}⚠️  $ERRORS개 항목에서 문제 발생. 수동으로 확인하세요.${NC}"
    exit 1
fi
