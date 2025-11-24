import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Log } from '../types';

export const useLogs = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const data = await api.getLogs();
      setLogs(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch logs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 30000);
    return () => clearInterval(interval);
  }, []);

  return { logs, loading, error, refetch: fetchLogs };
};
