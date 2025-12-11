import React, { useState, useMemo } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import LogsFilter from './LogsFilter';
import LogsTable from './LogsTable';
import CustomModal from './Modal';
import { useLogs } from '../hooks/useLogs';
import Button from './common/Button';

const Logs: React.FC = () => {
  const [filters, setFilters] = useState({
    source: '',
    imageId: '',
    jobId: '',
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
    setModalIsOpen(true);
  };

  const confirmClearLogs = () => {
    clearLogs();
    setModalIsOpen(false);
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
        <Button
          onClick={handleClearLogs}
          disabled={loading || allLogs.length === 0}
          variant="danger"
        >
          <FiTrash2 />
          Clear Logs
        </Button>
      </div>

      <LogsFilter filters={filters} onFilterChange={handleFilterChange} />

      <LogsTable logs={filteredLogs} />
      <CustomModal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        onConfirm={confirmClearLogs}
      >
        <h2>Confirm Clear</h2>
        <p>Are you sure you want to clear all logs?</p>
      </CustomModal>
    </div>
  );
};

export default Logs;
