#!/bin/bash

# 🎯 FINAL SOLUTION: Get Your Real Portfolio URL
# This will give you an actual working URL

echo "🚀 QA Playwright Portfolio - REAL URL Deployment"
echo "================================================="
echo
echo "❌ IMPORTANT: All previous URLs were EXAMPLES!"
echo "✅ Let's get you a REAL working URL now!"
echo
echo "📁 Your portfolio is ready in: ./dist ($(du -sh dist | cut -f1))"
echo

echo "🎯 CHOOSE YOUR DEPLOYMENT METHOD:"
echo "=================================="
echo "1. 🌐 Netlify Drop (Free, Instant)"
echo "2. 📱 GitHub Pages (Free, Permanent)" 
echo "3. 🔗 Local Testing First"
echo

read -p "Choose option (1-3): " choice

case $choice in
    1)
        echo "🌐 Opening Netlify Drop..."
        echo "📋 STEPS:"
        echo "   1. Drag your 'dist' folder to the page"
        echo "   2. Wait for upload (30 seconds)"
        echo "   3. GET YOUR REAL URL (like: https://amazing-demo-abc123.netlify.app)"
        echo
        open https://app.netlify.com/drop
        echo "📁 Folder to drag: $(pwd)/dist"
        ;;
    2)
        echo "📱 GitHub Pages Instructions:"
        echo "   1. Push this project to GitHub"
        echo "   2. Go to repo Settings > Pages"
        echo "   3. Select 'dist' folder as source"
        echo "   4. Your URL: https://yourusername.github.io/QA-Playwright-Demo-with-Javascript"
        ;;
    3)
        echo "🔍 Testing locally first..."
        echo "Your local URLs:"
        echo "• Development: http://localhost:3000 (if npm run dev is running)"
        echo "• Production test: Opening now on available port..."
        
        # Find available port
        for port in 8080 8081 8082 8083; do
            if ! lsof -i :$port > /dev/null 2>&1; then
                echo "✅ Starting server on port $port..."
                http-server dist -p $port -o &
                echo "🌐 Local URL: http://localhost:$port"
                break
            fi
        done
        ;;
    *)
        echo "❌ Invalid option. Run script again."
        ;;
esac

echo
echo "🎉 RESULT: You will get a REAL URL that works!"
echo "📋 Examples of what your REAL URL might look like:"
echo "   • https://wonderful-portfolio-abc123.netlify.app"
echo "   • https://brilliant-demo-xyz789.netlify.app"
echo "   • https://yourusername.github.io/QA-Playwright-Demo-with-Javascript"
echo
echo "💼 This REAL URL is what you share on LinkedIn and resumes!"
