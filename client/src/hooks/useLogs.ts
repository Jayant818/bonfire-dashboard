import { useState, useEffect } from 'react';
import { Log } from '../types';
import { api } from '../services/api';

export const useLogs = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let eventSource: EventSource | null = null;

    const connectToStream = () => {
      try {
        eventSource = api.getLogsStream();

        eventSource.onopen = () => {
          console.log('Logs SSE connection opened');
          setLoading(false);
          setError(null);
        };

        eventSource.onmessage = (event) => {
          try {
            const newLog = JSON.parse(event.data);
            setLogs((prevLogs) => {
              const updatedLogs = [...prevLogs, newLog];
              // Keep only last 1000 logs
              return updatedLogs.slice(-1000);
            });
          } catch (err) {
            console.error('Failed to parse log:', err);
          }
        };

        eventSource.onerror = (err) => {
          console.error('Logs SSE error:', err);
          setError('Connection lost. Reconnecting...');
          eventSource?.close();

          // Reconnect after 5 seconds
          setTimeout(connectToStream, 5000);
        };
      } catch (err) {
        console.error('Failed to connect to logs stream:', err);
        setError('Failed to connect to logs stream');
        setLoading(false);
      }
    };

    connectToStream();

    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, []);

  const clearLogs = () => {
    setLogs([]);
  };

  return { logs, loading, error, clearLogs };
};
