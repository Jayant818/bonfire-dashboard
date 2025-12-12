import { useState, useEffect, useCallback } from 'react';
import { Log } from '../types';
import { api } from '../services/api';

export const useLogs = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [hasMoreHistory, setHasMoreHistory] = useState(true);

  const transformLog = (entry: any): Log => ({
    source: entry.kind === 'stderr' ? 'Stderr' : 'Stdout',
    image_id: entry.image_id || '',
    job_id: entry.job_id || '',
    log: entry.message || '',
    timestamp: entry.timestamp,
  });

  const loadMoreHistory = useCallback(async () => {
    if (loadingHistory || !hasMoreHistory) return;
    setLoadingHistory(true);
    try {
      const nextPage = page + 1;
      const response = await api.getHistoryLogs(nextPage, 50, 'desc');
      if (response.data && response.data.length > 0) {
        const olderLogs = response.data.map(transformLog).reverse();
        setLogs((prev) => [...olderLogs, ...prev]);
        setPage(nextPage);
      } else {
        setHasMoreHistory(false);
      }
    } catch (err) {
      console.error('Failed to load history:', err);
    } finally {
      setLoadingHistory(false);
    }
  }, [page, loadingHistory, hasMoreHistory, transformLog]);

  useEffect(() => {
    let eventSource: EventSource | null = null;
    let isMounted = true;

    const init = async () => {
      try {
        const response = await api.getHistoryLogs(1, 50, 'desc');
        if (isMounted && response.data) {
          const initialLogs = response.data.map(transformLog).reverse();
          setLogs(initialLogs);
          if (response.data.length < 50) setHasMoreHistory(false);
        }
      } catch (err) {
        console.error('Failed to fetch initial history:', err);
      }

      if (!isMounted) return;

    const connectToStream = () => {
      try {
        eventSource = api.getLogsStream();

        eventSource.onopen = () => {
          console.log('Logs SSE connection opened');
          if (isMounted) {
            setLoading(false);
            setError(null);
          }
        };

        eventSource.onmessage = (event) => {
          if (!isMounted) return;
          try {
            const newLog = JSON.parse(event.data);
            const MAX_LOGS = 5000;
            setLogs((prevLogs) => {
              const updatedLogs = [...prevLogs, newLog];
              if (updatedLogs.length > MAX_LOGS) {
                return updatedLogs.slice(updatedLogs.length - MAX_LOGS);
              }
              return updatedLogs;
            });
          } catch (err) {
            console.error('Failed to parse log:', err);
          }
        };

        eventSource.onerror = (err) => {
          console.error('Logs SSE error:', err);
          if (isMounted) setError('Connection lost. Reconnecting...');
          eventSource?.close();

          // Reconnect after 5 seconds
          setTimeout(connectToStream, 5000);
        };
      } catch (err) {
        console.error('Failed to connect to logs stream:', err);
        if (isMounted) {
          setError('Failed to connect to logs stream');
          setLoading(false);
        }
      }
    };

    connectToStream();
  };

  init();

    return () => {
      isMounted = false;
      if (eventSource) {
        eventSource.close();
      }
    };
  }, []);

  const clearLogs = () => {
    setLogs([]);
    setPage(1);
    setHasMoreHistory(true);
  };

  return { logs, loading, error, clearLogs, loadMoreHistory, hasMoreHistory, loadingHistory };
};
