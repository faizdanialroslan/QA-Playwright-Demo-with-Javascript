#!/bin/bash
# Professional Production Push Script
# Usage: ./scripts/push-prod.sh "production release message"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 PRODUCTION PUSH PIPELINE${NC}"
echo "==============================="

# Generate production version
VERSION=$(./scripts/generate-version.sh "Prod")

# Get commit message
COMMIT_MSG=${1:-"production release"}

# Full commit message with version
FULL_MSG="[Prod] $COMMIT_MSG

Version: $VERSION
Environment: Production
Quality Gate: ✅ Development tests passed
Deploy Target: GitHub Pages"

echo -e "${YELLOW}📝 Production Commit Message:${NC}"
echo "$FULL_MSG"
echo ""

# Mandatory dev tests first
echo -e "${BLUE}🧪 Running mandatory development tests...${NC}"
if npm run test:dev > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Development tests PASSED - Ready for production${NC}"
else
    echo -e "${RED}❌ Development tests FAILED - BLOCKING production push${NC}"
    echo "❌ Production deployment requires passing development tests first!"
    exit 1
fi

# Confirmation prompt
echo -e "${YELLOW}⚠️  PRODUCTION DEPLOYMENT CONFIRMATION${NC}"
echo "📊 Version: $VERSION"
echo "🌍 Target: GitHub Pages"
echo "🧪 Tests: Will run full pipeline with quality gates"
echo ""
read -p "Are you sure you want to deploy to PRODUCTION? (y/N): " confirm

if [[ $confirm != [yY] ]]; then
    echo "❌ Production deployment cancelled"
    exit 0
fi

# Stage, commit and push to production
echo -e "${BLUE}🚀 Deploying to production...${NC}"
git add .
git commit -m "$FULL_MSG"
git push origin main

echo -e "${GREEN}✅ Production deployment initiated!${NC}"
echo "🔗 Monitor pipeline: https://github.com/faizdanialroslan/QA-Playwright-Demo-with-Javascript/actions"
echo "🌐 Live URL: https://faizdanialroslan.github.io/QA-Playwright-Demo-with-Javascript"
echo "📊 Version: $VERSION"
echo ""
echo "⏳ Pipeline will:"
echo "   1. Run dev environment tests"
echo "   2. Deploy to GitHub Pages (if dev tests pass)"
echo "   3. Run production environment tests"
echo "   4. Generate comprehensive reports"
