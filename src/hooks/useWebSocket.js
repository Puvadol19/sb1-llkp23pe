import { useState, useEffect } from 'react';

export function useWebSocket(url) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setData(data);
    };

    return () => {
      ws.close();
    };
  }, [url]);

  return { data };
}