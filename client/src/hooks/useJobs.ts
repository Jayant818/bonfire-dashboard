import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Job } from '../types';

export const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const data = await api.getJobs();
      setJobs(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch jobs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
    const interval = setInterval(fetchJobs, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const clearJobs = () => {
    setJobs([]);
  };

  return { jobs, loading, error, refetch: fetchJobs, clearJobs };
};
