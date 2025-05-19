#!/bin/bash

# Install dependencies with legacy peer deps flag
echo "Installing dependencies with legacy peer deps flag..."
npm install --legacy-peer-deps

# Force resolution of problematic dependencies
echo "Running npm dedupe to resolve nested dependencies..."
npm dedupe

# Build Next.js app
echo "Building Next.js application..."
npm run build

# Success message
echo "Build completed successfully!" 