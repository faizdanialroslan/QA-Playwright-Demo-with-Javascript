#!/bin/bash
# Professional Development Push Script
# Usage: ./scripts/push-dev.sh "your commit message"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🛠️  DEVELOPMENT PUSH PIPELINE${NC}"
echo "================================"

# Generate development version
VERSION=$(./scripts/generate-version.sh "Dev")

# Get commit message
COMMIT_MSG=${1:-"development changes"}

# Full commit message with version
FULL_MSG="[Dev] $COMMIT_MSG

Version: $VERSION
Environment: Development
Tests: Running locally first..."

echo -e "${YELLOW}📝 Commit Message:${NC}"
echo "$FULL_MSG"
echo ""

# Test locally first (dev-first approach)
echo -e "${BLUE}🧪 Running development tests first...${NC}"
if npm run test:dev > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Development tests PASSED${NC}"
else
    echo -e "${RED}❌ Development tests FAILED - Aborting push${NC}"
    exit 1
fi

# Stage, commit and push
echo -e "${BLUE}📤 Pushing to GitHub...${NC}"
git add .
git commit -m "$FULL_MSG"
git push origin main

echo -e "${GREEN}✅ Development push completed!${NC}"
echo "🔗 Monitor pipeline: https://github.com/faizdanialroslan/QA-Playwright-Demo-with-Javascript/actions"
echo "📊 Version: $VERSION"
