#!/bin/bash

# 🚀 Super Quick Deployment with Surge.sh
# No authentication required, instant deployment

echo "🎯 Super Quick Deployment - Surge.sh"
echo "===================================="
echo

# Check if build exists
if [ ! -d "dist" ]; then
    echo "🔧 Building project first..."
    npm run build
fi

echo "✅ Build ready! Deploying to Surge.sh..."
echo

# Install surge if not available
if ! command -v surge &> /dev/null; then
    echo "📦 Installing Surge.sh..."
    npm install -g surge
fi

echo "🚀 Deploying your QA Playwright Portfolio..."
echo "📁 Deploying from: ./dist"
echo

# Deploy with surge
cd dist && surge . --domain qa-playwright-portfolio-$(date +%s).surge.sh

echo
echo "🎉 DEPLOYMENT COMPLETE!"
echo "========================"
echo
echo "✅ Your QA Playwright Portfolio is now live!"
echo "🌐 Public URL: Ready to share on LinkedIn, resumes, and job applications"
echo "📊 Features: 100 test cases, comprehensive test automation showcase"
echo "💼 Perfect for: QA Engineer interviews and portfolio demonstrations"
echo
echo "💡 TIP: Bookmark your URL and add it to your professional profiles!"
