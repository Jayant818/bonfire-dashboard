import React from 'react';

interface LogsFilterProps {
  filters: {
    source: string;
    imageId: string;
    jobId: string;
  };
  onFilterChange: (filters: any) => void;
}

const LogsFilter: React.FC<LogsFilterProps> = ({ filters, onFilterChange }) => {
  const handleChange = (field: string, value: string) => {
    onFilterChange({ ...filters, [field]: value });
  };

  const clearFilters = () => {
    onFilterChange({
      source: '',
      imageId: '',
      jobId: '',
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

  const hasActiveFilters = filters.source || filters.imageId || filters.jobId;

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
            Source
          </label>
          <select
            value={filters.source}
            onChange={(e) => handleChange('source', e.target.value)}
            style={inputStyle}
          >
            <option value="">All Sources</option>
            <option value="Stdout">Stdout</option>
            <option value="Stderr">Stderr</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#94a3b8' }}>
            Image ID
          </label>
          <input
            type="text"
            value={filters.imageId}
            onChange={(e) => handleChange('imageId', e.target.value)}
            placeholder="Filter by image ID"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#94a3b8' }}>
            Job ID
          </label>
          <input
            type="text"
            value={filters.jobId}
            onChange={(e) => handleChange('jobId', e.target.value)}
            placeholder="Filter by job ID"
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

export default LogsFilter;
