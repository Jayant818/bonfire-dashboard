import React, { useState, useMemo } from 'react';
import LogsFilter from './LogsFilter';
import LogsTable from './LogsTable';
import { useLogs } from '../hooks/useLogs';

const Logs: React.FC = () => {
  const [filters, setFilters] = useState({
    source: '',
    imageId: '',
    jobId: '',
  });

  const { logs: allLogs, loading, clearLogs } = useLogs();

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

  const handleClearLogs = () => {
    if (window.confirm('Are you sure you want to clear all logs?')) {
      clearLogs();
    }
  };

  return (
    <div style={{ padding: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>
            Logs
          </h1>
          <p style={{ color: '#64748b', marginBottom: '32px' }}>
            Live stream of prover execution logs • {filteredLogs.length} logs {loading && '• Connecting...'}
          </p>
        </div>
        <button
          onClick={handleClearLogs}
          disabled={loading || allLogs.length === 0}
          style={{
            padding: '12px 24px',
            background: loading || allLogs.length === 0 ? '#334155' : '#ef4444',
            border: 'none',
            borderRadius: '8px',
            color: '#fff',
            fontSize: '14px',
            fontWeight: '600',
            cursor: loading || allLogs.length === 0 ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          🗑️ Clear Logs
        </button>
      </div>

      <LogsFilter filters={filters} onFilterChange={handleFilterChange} />

      <LogsTable logs={filteredLogs} />
    </div>
  );
};

export default Logs;
