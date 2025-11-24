import React, { useState, useMemo } from 'react';
import LogsFilter from './LogsFilter';
import LogsTable from './LogsTable';
import { useLogs } from '../hooks/useLogs';
import { Log } from '../types';

const Logs: React.FC = () => {
  const [filters, setFilters] = useState({
    source: '',
    imageId: '',
    jobId: '',
  });

  const { logs: allLogs, loading, refetch } = useLogs();

  const filteredLogs = useMemo(() => {
    let result = allLogs;

    if (filters.source) {
      result = result.filter((log) => log.source === filters.source);
    }
    if (filters.imageId) {
      result = result.filter((log) => 
        log.image_id.toLowerCase().includes(filters.imageId.toLowerCase())
      );
    }
    if (filters.jobId) {
      result = result.filter((log) => 
        log.job_id.toLowerCase().includes(filters.jobId.toLowerCase())
      );
    }

    return result;
  }, [allLogs, filters]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleRefresh = () => {
    refetch();
  };

  return (
    <div style={{ padding: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>
            Logs
          </h1>
          <p style={{ color: '#64748b', marginBottom: '32px' }}>
            Live tail of prover execution logs • {filteredLogs.length} logs
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={loading}
          style={{
            padding: '12px 24px',
            background: loading ? '#334155' : '#10b981',
            border: 'none',
            borderRadius: '8px',
            color: '#fff',
            fontSize: '14px',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {loading ? 'Refreshing...' : 'Refresh Logs'}
        </button>
      </div>

      <LogsFilter filters={filters} onFilterChange={handleFilterChange} />

      <LogsTable logs={filteredLogs} />
    </div>
  );
};

export default Logs;
