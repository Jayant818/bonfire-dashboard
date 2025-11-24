import React from 'react';

interface JobsFilterProps {
  filters: {
    status: string;
    executionId: string;
    node: string;
  };
  onFilterChange: (filters: any) => void;
}

const JobsFilter: React.FC<JobsFilterProps> = ({ filters, onFilterChange }) => {
  const handleChange = (field: string, value: string) => {
    onFilterChange({ ...filters, [field]: value });
  };

  const clearFilters = () => {
    onFilterChange({
      status: '',
      executionId: '',
      node: '',
    });
  };

  const inputStyle: React.CSSProperties = {
    padding: '10px 12px',
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '8px',
    color: '#e2e8f0',
    fontSize: '14px',
    outline: 'none',
    width: '100%',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '10px 20px',
    background: '#334155',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  };

  const hasActiveFilters = filters.status || filters.executionId || filters.node;

  return (
    <div
      style={{
        background: '#1e293b',
        padding: '24px',
        borderRadius: '12px',
        border: '1px solid #334155',
        marginBottom: '32px',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '16px',
          marginBottom: hasActiveFilters ? '16px' : '0',
        }}
      >
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#94a3b8' }}>
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleChange('status', e.target.value)}
            style={inputStyle}
          >
            <option value="">All Statuses</option>
            <option value="Submitted">Submitted</option>
            <option value="Running">Running</option>
            <option value="Completed">Completed</option>
            <option value="Failed">Failed</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#94a3b8' }}>
            Execution ID
          </label>
          <input
            type="text"
            value={filters.executionId}
            onChange={(e) => handleChange('executionId', e.target.value)}
            placeholder="Filter by execution ID"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#94a3b8' }}>
            Node
          </label>
          <input
            type="text"
            value={filters.node}
            onChange={(e) => handleChange('node', e.target.value)}
            placeholder="Filter by node pubkey"
            style={inputStyle}
          />
        </div>
      </div>

      {hasActiveFilters && (
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={clearFilters} style={buttonStyle}>
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default JobsFilter;
