import React from 'react';
import Select from './common/Select';
import { 
  inputStyle, 
  buttonStyle, 
  filterContainerStyle, 
  filterGridStyle, 
  labelStyle 
} from './common/styles';

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

  const hasActiveFilters = filters.source || filters.imageId || filters.jobId;

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
            Source
          </label>
          <Select
            value={filters.source}
            onChange={(e) => handleChange('source', e.target.value)}
          >
            <option value="">All Sources</option>
            <option value="Stdout">Stdout</option>
            <option value="Stderr">Stderr</option>
          </Select>
        </div>

        <div>
          <label style={labelStyle}>
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
          <label style={labelStyle}>
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

export default LogsFilter;
