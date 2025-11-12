#!/bin/bash

# Generate build version based on current date and time
# Format: YYYYMMDD.HHMM (e.g., 20251211.1954)

TIMESTAMP=$(date +"%Y%m%d.%H%M")

echo "Generating build version: $TIMESTAMP"

# Update package.json version
sed -i '' "s/\"version\": \"[^\"]*\"/\"version\": \"$TIMESTAMP\"/" package.json

echo "Build version updated to: $TIMESTAMP"
