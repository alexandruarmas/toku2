#!/bin/bash

# Install dependencies
echo "Installing dependencies..."
npm install

# Build Next.js app
echo "Building Next.js application..."
npm run build

# Success message
echo "Build completed successfully!" 