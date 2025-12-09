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
    background: 'var(--bg-element)',
    border: '1px solid var(--border-subtle)',
    borderRadius: '8px',
    color: 'var(--text-primary)',
    fontSize: '14px',
    outline: 'none',
    width: '100%',
    fontFamily: 'Geist Mono, monospace',
  };

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23a1a1aa%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    backgroundSize: '12px',
    cursor: 'pointer',
    paddingRight: '32px',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '10px 20px',
    background: 'var(--bg-element)',
    border: '1px solid var(--border-subtle)',
    borderRadius: '8px',
    color: 'var(--text-primary)',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.2s',
  };

  const hasActiveFilters = filters.status || filters.executionId || filters.node;

  return (
    <div
      style={{
        background: 'var(--bg-card)',
        padding: '24px',
        borderRadius: '12px',
        border: '1px solid var(--border-subtle)',
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
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleChange('status', e.target.value)}
            style={selectStyle}
          >
            <option value="">All Statuses</option>
            <option value="Submitted">Submitted</option>
            <option value="Running">Running</option>
            <option value="Completed">Completed</option>
            <option value="Failed">Failed</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>
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
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>
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
          <button 
            onClick={clearFilters} 
            style={buttonStyle}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--border-subtle)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg-element)'}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default JobsFilter;
