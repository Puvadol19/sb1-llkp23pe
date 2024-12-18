# Forex Dashboard with MT5 Integration

This project creates a real-time forex dashboard that connects to MetaTrader 5 and displays current forex pair prices and charts.

## Setup

1. Install MetaTrader 5 and configure your account
2. Install Python dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```
3. Install Node.js dependencies:
   ```bash
   npm install
   ```

## Running the Application

1. Start the backend:
   ```bash
   cd backend
   uvicorn main:app --reload
   ```

2. Start the frontend:
   ```bash
   npm run dev
   ```

## Features

- Real-time forex pair prices
- WebSocket connection for live updates
- Responsive grid layout
- Price change indicators
- Volume and time information