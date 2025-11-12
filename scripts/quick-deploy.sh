#!/bin/bash

# 🚀 Quick Deployment Script for QA Playwright Portfolio
# Choose your preferred deployment platform

echo "🎯 QA Playwright Portfolio - Quick Deploy"
echo "========================================="
echo

# Check if build works
echo "🔧 Testing build process..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo
else
    echo "❌ Build failed! Please fix errors before deploying."
    exit 1
fi

echo "🌐 Available Deployment Options:"
echo "1. Vercel (Recommended)"
echo "2. Netlify" 
echo "3. GitHub Pages"
echo "4. Preview locally first"
echo

read -p "Choose option (1-4): " choice

case $choice in
    1)
        echo "🚀 Deploying to Vercel..."
        echo "Installing Vercel CLI..."
        npm i -g vercel
        echo "Login and deploy:"
        vercel
        ;;
    2)
        echo "🌐 Preparing for Netlify..."
        echo "✅ Build folder ready: ./dist"
        echo "👉 Go to netlify.com and drag the 'dist' folder"
        echo "📁 Build output location: $(pwd)/dist"
        open https://app.netlify.com/drop
        ;;
    3)
        echo "📚 GitHub Pages setup..."
        echo "📝 Add this to package.json scripts:"
        echo '  "deploy": "npm run build && gh-pages -d dist"'
        echo "📦 Install: npm install --save-dev gh-pages"
        echo "🚀 Deploy: npm run deploy"
        ;;
    4)
        echo "👀 Starting local preview..."
        npm run preview
        ;;
    *)
        echo "❌ Invalid option"
        ;;
esac

echo
echo "🎉 Your portfolio will be accessible at a professional URL like:"
echo "   • https://qa-playwright-demo.vercel.app"
echo "   • https://qa-playwright-portfolio.netlify.app" 
echo "   • https://yourusername.github.io/QA-Playwright-Demo-with-Javascript"
echo
echo "💼 Perfect for sharing on LinkedIn, resumes, and job applications!"
