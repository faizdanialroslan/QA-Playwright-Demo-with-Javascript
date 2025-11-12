#!/bin/bash

# 🚀 Re-deploy to Netlify with Custom URL
# Get your proper Netlify URL for the QA Portfolio

echo "🎯 QA Playwright Portfolio - Netlify Re-deployment"
echo "================================================="
echo

# Check if build exists
if [ ! -d "dist" ]; then
    echo "🔧 Building project..."
    npm run build
fi

echo "✅ Build ready! Size: $(du -sh dist | cut -f1)"
echo
echo "📁 Your deployment folder: $(pwd)/dist"
echo

echo "🌐 DEPLOYMENT OPTIONS:"
echo "====================="
echo
echo "1. 🎯 NETLIFY DROP (Recommended)"
echo "   • Go to: https://app.netlify.com/drop"
echo "   • Drag your 'dist' folder"
echo "   • Get your unique URL"
echo
echo "2. 📱 NETLIFY CLI (Custom URL)"
echo "   • Install: npm install -g netlify-cli"
echo "   • Deploy: netlify deploy --prod --dir=dist"
echo "   • Choose site name: qa-playwright-portfolio-yourname"
echo
echo "3. 🔗 SURGE.SH (Simple URL)"
echo "   • Install: npm install -g surge"
echo "   • Deploy: surge dist qa-playwright-portfolio-$(whoami).surge.sh"
echo

echo "💡 EXAMPLE URLS YOU MIGHT GET:"
echo "==============================="
echo "• https://amazing-portfolio-abc123.netlify.app"
echo "• https://elegant-testing-xyz789.netlify.app"
echo "• https://wonderful-qa-demo-123def.netlify.app"
echo
echo "🎉 After deployment, you'll get the ACTUAL working URL!"

# Option to open Netlify Drop
read -p "Open Netlify Drop now? (y/n): " choice
if [[ $choice == "y" || $choice == "Y" ]]; then
    echo "🌐 Opening Netlify Drop..."
    open https://app.netlify.com/drop
    echo "📁 Now drag your 'dist' folder from: $(pwd)/dist"
fi
