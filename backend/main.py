from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import MetaTrader5 as mt5
import pandas as pd
from datetime import datetime
import asyncio
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SYMBOLS = ['EURUSD', 'GBPUSD', 'USDJPY', 'EURJPY', 'AUDUSD', 'NZDUSD', 'USDCAD', 'USDCHF']

@app.on_event("startup")
async def startup_event():
    if not mt5.initialize():
        print("MT5 initialization failed")
        mt5.shutdown()

@app.get("/forex/prices")
async def get_prices():
    prices = {}
    for symbol in SYMBOLS:
        tick = mt5.symbol_info_tick(symbol)
        if tick:
            prices[symbol] = {
                'bid': tick.bid,
                'ask': tick.ask,
                'last': tick.last,
                'volume': tick.volume,
                'time': tick.time
            }
    return prices

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            prices = await get_prices()
            await websocket.send_json(prices)
            await asyncio.sleep(1)
    except Exception as e:
        print(f"WebSocket error: {e}")
    finally:
        await websocket.close()

@app.on_event("shutdown")
async def shutdown_event():
    mt5.shutdown()