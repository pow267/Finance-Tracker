#!/bin/sh

echo "⏳ Waiting for Mongo..."

sleep 5

echo "🌱 Checking & seeding database..."
node seed.js

echo "🚀 Starting server..."
node server.js