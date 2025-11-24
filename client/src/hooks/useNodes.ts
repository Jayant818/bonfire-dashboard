import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Node } from '../types';

export const useNodes = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNodes = async () => {
      try {
        setLoading(true);
        const data = await api.getNodes();
        setNodes(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch nodes');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNodes();
    const interval = setInterval(fetchNodes, 30000);
    return () => clearInterval(interval);
  }, []);

  return { nodes, loading, error };
};
