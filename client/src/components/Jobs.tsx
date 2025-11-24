import React, { useState, useMemo } from 'react';
import JobsFilter from './JobsFilter';
import JobsTable from './JobsTable';
import JobsStats from './JobsStats';
import { useJobs } from '../hooks/useJobs';

const Jobs: React.FC = () => {
  const [filters, setFilters] = useState({
    status: '',
    executionId: '',
    node: '',
  });

  const { jobs: allJobs, loading, clearJobs } = useJobs();

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
    if (window.confirm('Are you sure you want to clear all jobs?')) {
      clearJobs();
    }
  };

  return (
    <div style={{ padding: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>
            Jobs
          </h1>
          <p style={{ color: '#64748b', marginBottom: '32px' }}>
            Real-time job execution stream • {filteredJobs.length} jobs {loading && '• Connecting...'}
          </p>
        </div>
        <button
          onClick={handleClearJobs}
          disabled={loading || allJobs.length === 0}
          style={{
            padding: '12px 24px',
            background: loading || allJobs.length === 0 ? '#334155' : '#ef4444',
            border: 'none',
            borderRadius: '8px',
            color: '#fff',
            fontSize: '14px',
            fontWeight: '600',
            cursor: loading || allJobs.length === 0 ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          🗑️ Clear Jobs
        </button>
      </div>

      <JobsStats jobs={allJobs} />

      <JobsFilter filters={filters} onFilterChange={handleFilterChange} />

      <JobsTable jobs={filteredJobs} key={JSON.stringify(filters)} />
    </div>
  );
};

export default Jobs;
