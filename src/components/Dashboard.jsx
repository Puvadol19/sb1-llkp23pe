import React from 'react';
import ForexPairCard from './ForexPairCard';
import { useWebSocket } from '../hooks/useWebSocket';

function Dashboard() {
  const { data: prices } = useWebSocket(import.meta.env.VITE_WS_URL || 'ws://localhost:8000/ws');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Forex Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {prices && Object.entries(prices).map(([symbol, data]) => (
          <ForexPairCard
            key={symbol}
            symbol={symbol}
            data={data}
          />
        ))}
      </div>
    </div>
  );
}