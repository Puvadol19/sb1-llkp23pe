import React from 'react';
import { formatDistance } from 'date-fns';

export default function ForexPairCard({ symbol, data }) {
  const getChangeColor = (bid, ask) => {
    const spread = ask - bid;
    return spread > 0 ? 'text-green-500' : 'text-red-500';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{symbol}</h2>
        <span className={getChangeColor(data.bid, data.ask)}>
          {data.bid.toFixed(5)}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Ask</p>
          <p className="font-semibold">{data.ask.toFixed(5)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Bid</p>
          <p className="font-semibold">{data.bid.toFixed(5)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Volume</p>
          <p className="font-semibold">{data.volume}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Last Update</p>
          <p className="font-semibold">
            {formatDistance(new Date(data.time * 1000), new Date(), { addSuffix: true })}
          </p>
        </div>
      </div>
    </div>
  );
}