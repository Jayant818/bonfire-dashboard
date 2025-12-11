import React, { useState, useMemo } from 'react';
import { FiRefreshCw, FiTrash2 } from 'react-icons/fi';
import JobsFilter from './JobsFilter';
import JobsTable from './JobsTable';
import JobsStats from './JobsStats';
import CustomModal from './Modal';
import { useJobs } from '../hooks/useJobs';
import Button from './common/Button';

const Jobs: React.FC = () => {
  const [filters, setFilters] = useState({
    status: '',
    executionId: '',
    node: '',
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { jobs: allJobs, loading, refetch, clearJobs } = useJobs();

  const filteredJobs = useMemo(() => {
    console.log('Filtering jobs, allJobs count:', allJobs.length);
    console.log('Filters:', filters);
    
    let result = allJobs;

    if (filters.status) {
      result = result.filter((job) => job.status === filters.status);
    }
    if (filters.executionId) {
      result = result.filter((job) => 
        job.execution_id.toLowerCase().includes(filters.executionId.toLowerCase())
      );
    }
    if (filters.node) {
      result = result.filter((job) => 
        job.node && job.node.toLowerCase().includes(filters.node.toLowerCase())
      );
    }

    console.log('Filtered result count:', result.length);
    console.log('Filtered jobs:', result.map(j => ({ id: j.execution_id, status: j.status })));
    
    return result;
  }, [allJobs, filters.status, filters.executionId, filters.node]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleClearJobs = () => {
    setModalIsOpen(true);
  };

  const confirmClearJobs = () => {
    clearJobs();
    setModalIsOpen(false);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>
            Jobs
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
            Auto-refreshing every 5 seconds • {filteredJobs.length} jobs found
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button
            onClick={() => refetch()}
            isLoading={loading}
          >
            <FiRefreshCw className={loading ? 'animate-spin' : ''} />
            {loading ? 'Refreshing...' : 'Refresh'}
          </Button>
          <Button
            onClick={handleClearJobs}
            disabled={allJobs.length === 0}
            variant="danger"
          >
            <FiTrash2 />
            Clear
          </Button>
        </div>
      </div>

      <JobsStats jobs={allJobs} />
      <JobsFilter filters={filters} onFilterChange={handleFilterChange} />
      <JobsTable jobs={filteredJobs} />
      <CustomModal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        onConfirm={confirmClearJobs}
        aria={{ labelledby: 'modal-confirm-clear-jobs-title' }}
      >
        <h2
          id="modal-confirm-clear-jobs-title"
          style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}
        >
          Confirm Clear
        </h2>
        <p>Are you sure you want to clear all jobs?</p>
      </CustomModal>
    </div>
  );
};

export default Jobs;
