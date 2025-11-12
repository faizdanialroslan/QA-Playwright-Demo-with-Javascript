#!/bin/bash
# Professional Deployment Version Script
# Automatically generates deployment tags with environment tracking

# Configuration
ENV=${1:-"Dev"}  # Default to Dev if no environment specified
DATE=$(date +%Y%m%d)
TIME=$(date +%H%M)

# Get deployment counter for today
DEPLOYMENT_FILE=".deployment_counter_${DATE}"
if [ -f "$DEPLOYMENT_FILE" ]; then
    COUNTER=$(cat "$DEPLOYMENT_FILE")
    COUNTER=$((COUNTER + 1))
else
    COUNTER=1
fi

# Save updated counter
echo $COUNTER > "$DEPLOYMENT_FILE"

# Format counter with leading zero
FORMATTED_COUNTER=$(printf "%02d" $COUNTER)

# Generate version tag
VERSION_TAG="[$ENV]${DATE}_${FORMATTED_COUNTER}_${TIME}"

# Display version info
echo "🚀 DEPLOYMENT VERSION GENERATOR"
echo "================================"
echo "📅 Date: $(date '+%Y-%m-%d %H:%M:%S')"
echo "🌍 Environment: $ENV"
echo "📊 Deployment Count Today: $COUNTER"
echo "🏷️  Version Tag: $VERSION_TAG"
echo ""

# Export for use in scripts
export DEPLOYMENT_VERSION="$VERSION_TAG"
echo "$VERSION_TAG"
