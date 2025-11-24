import { useState, useEffect } from 'react';
import { Job } from '../types';

export const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let eventSource: EventSource | null = null;

    const connectToStream = () => {
      try {
        eventSource = new EventSource('/api/jobs/stream');

        eventSource.onopen = () => {
          console.log('Jobs SSE connection opened');
          setLoading(false);
          setError(null);
        };

        eventSource.onmessage = (event) => {
          try {
            const jobUpdate = JSON.parse(event.data);
            
            setJobs((prevJobs) => {
              // Check if job already exists
              const existingIndex = prevJobs.findIndex(
                (j) => j.execution_id === jobUpdate.execution_id
              );

              if (existingIndex >= 0) {
                // Update existing job
                const updated = [...prevJobs];
                updated[existingIndex] = jobUpdate;
                return updated;
              } else {
                // Add new job
                return [...prevJobs, jobUpdate];
              }
            });
          } catch (err) {
            console.error('Failed to parse job:', err);
          }
        };

        eventSource.onerror = (err) => {
          console.error('Jobs SSE error:', err);
          setError('Connection lost. Reconnecting...');
          eventSource?.close();
          
          // Reconnect after 5 seconds
          setTimeout(connectToStream, 5000);
        };
      } catch (err) {
        console.error('Failed to connect to jobs stream:', err);
        setError('Failed to connect to jobs stream');
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

  const clearJobs = () => {
    setJobs([]);
  };

  return { jobs, loading, error, clearJobs };
};
