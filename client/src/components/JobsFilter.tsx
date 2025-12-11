import React from 'react';
import Select from './common/Select';
import { 
  inputStyle, 
  buttonStyle, 
  filterContainerStyle, 
  filterGridStyle, 
  labelStyle 
} from './common/styles';

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

  const hasActiveFilters = filters.status || filters.executionId || filters.node;

  return (
    <div style={filterContainerStyle}>
      <div
        style={{
          ...filterGridStyle,
          marginBottom: hasActiveFilters ? '16px' : '0',
        }}
      >
        <div>
          <label style={labelStyle}>
            Status
          </label>
          <Select
            value={filters.status}
            onChange={(e) => handleChange('status', e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="Submitted">Submitted</option>
            <option value="Running">Running</option>
            <option value="Completed">Completed</option>
            <option value="Failed">Failed</option>
          </Select>
        </div>

        <div>
          <label style={labelStyle}>
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
          <label style={labelStyle}>
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
