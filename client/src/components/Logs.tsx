import React, { useState, useMemo } from 'react';
import { FiTrash2 } from 'react-icons/fi';
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

  const baseButtonStyle: React.CSSProperties = {
    padding: '10px 18px',
    border: '1px solid var(--border-subtle)',
    borderRadius: '8px',
    background: 'var(--bg-element)',
    color: 'var(--text-primary)',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'background 0.2s, border-color 0.2s',
  };

  const clearButtonStyle: React.CSSProperties = {
    ...baseButtonStyle,
    color: 'var(--danger-text)',
    borderColor: 'var(--danger-border)',
    background: 'var(--danger-bg)',
  };

  const disabledClearStyle: React.CSSProperties = {
    ...clearButtonStyle,
    opacity: 0.5,
    cursor: 'not-allowed',
  }

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
          style={loading || allLogs.length === 0 ? disabledClearStyle : clearButtonStyle}
          onMouseEnter={(e) => !(loading || allLogs.length === 0) && (e.currentTarget.style.background = 'var(--danger-bg-hover)')}
          onMouseLeave={(e) => !(loading || allLogs.length === 0) && (e.currentTarget.style.background = 'var(--danger-bg)')}
        >
          <FiTrash2 />
          Clear Logs
        </button>
      </div>

      <LogsFilter filters={filters} onFilterChange={handleFilterChange} />

      <LogsTable logs={filteredLogs} />
    </div>
  );
};

export default Logs;
