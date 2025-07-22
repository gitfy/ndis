#!/bin/bash

# SEMS NDIS Website - Local Development Startup Script

echo "🚀 Starting SEMS NDIS Website locally..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Stop any existing container
echo "🛑 Stopping any existing containers..."
docker compose down

# Build and start the website
echo "🔨 Building and starting the website..."
docker compose up --build -d

# Wait a moment for the container to start
sleep 3

# Check if container is running
if docker ps | grep -q "sems-ndis-website"; then
    echo "✅ SEMS NDIS Website is now running!"
    echo ""
    echo "🌐 Open your browser and visit:"
    echo "   http://localhost:8080"
    echo ""
    echo "📝 To view logs: docker compose logs -f"
    echo "🛑 To stop: docker compose down"
    echo ""
    
    # Try to open browser automatically (works on most systems)
    if command -v xdg-open > /dev/null; then
        echo "🔗 Opening browser..."
        xdg-open http://localhost:8080 2>/dev/null &
    elif command -v open > /dev/null; then
        echo "🔗 Opening browser..."
        open http://localhost:8080 2>/dev/null &
    fi
else
    echo "❌ Failed to start the website. Check the logs:"
    docker compose logs
fi
