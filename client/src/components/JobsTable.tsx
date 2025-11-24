import React, { useState } from 'react';
import { Job } from '../types';

interface JobsTableProps {
  jobs: Job[];
}

const JobsTable: React.FC<JobsTableProps> = ({ jobs }) => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return '#10b981';
      case 'Running':
        return '#f59e0b';
      case 'Failed':
        return '#ef4444';
      case 'Submitted':
        return '#3b82f6';
      default:
        return '#94a3b8';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    try {
      return new Date(timestamp).toLocaleString();
    } catch {
      return timestamp;
    }
  };

  const truncate = (str: string | null, len: number) => {
    if (!str) return '-';
    return str.length > len ? `${str.slice(0, len)}...` : str;
  };

  const toggleRow = (executionId: string) => {
    setExpandedRow(expandedRow === executionId ? null : executionId);
  };

  const calculateDuration = (createdAt: string, updatedAt: string) => {
    try {
      const start = new Date(createdAt).getTime();
      const end = new Date(updatedAt).getTime();
      const diff = end - start;
      
      if (diff < 1000) return `${diff}ms`;
      if (diff < 60000) return `${(diff / 1000).toFixed(1)}s`;
      if (diff < 3600000) return `${(diff / 60000).toFixed(1)}m`;
      return `${(diff / 3600000).toFixed(1)}h`;
    } catch {
      return '-';
    }
  };

  return (
    <div
      style={{
        background: '#1e293b',
        borderRadius: '12px',
        border: '1px solid #334155',
        overflow: 'hidden',
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#0f172a', borderBottom: '1px solid #334155' }}>
            <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#94a3b8', width: '40px' }}>
            </th>
            <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#94a3b8' }}>
              Status
            </th>
            <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#94a3b8' }}>
              Execution ID
            </th>
            <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#94a3b8' }}>
              Node
            </th>
            <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#94a3b8' }}>
              Created At
            </th>
            <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#94a3b8' }}>
              Duration
            </th>
          </tr>
        </thead>
        <tbody>
          {jobs.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                style={{
                  padding: '40px',
                  textAlign: 'center',
                  color: '#64748b',
                }}
              >
                No jobs found
              </td>
            </tr>
          ) : (
            jobs.map((job, index) => (
              <React.Fragment key={job.execution_id}>
                <tr
                  style={{
                    borderBottom: expandedRow === job.execution_id ? 'none' : index < jobs.length - 1 ? '1px solid #334155' : 'none',
                    cursor: 'pointer',
                    background: expandedRow === job.execution_id ? '#0f172a' : 'transparent',
                  }}
                  onClick={() => toggleRow(job.execution_id)}
                >
                  <td style={{ padding: '16px', fontSize: '18px' }}>
                    {expandedRow === job.execution_id ? '▼' : '▶'}
                  </td>
                  <td style={{ padding: '16px' }}>
                    <span
                      style={{
                        padding: '4px 12px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '600',
                        background: `${getStatusColor(job.status)}20`,
                        color: getStatusColor(job.status),
                      }}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px', fontSize: '14px', fontFamily: 'monospace', color: '#10b981' }}>
                    {truncate(job.execution_id, 30)}
                  </td>
                  <td style={{ padding: '16px', fontSize: '14px', fontFamily: 'monospace', color: '#8b5cf6' }}>
                    {truncate(job.node, 12)}
                  </td>
                  <td style={{ padding: '16px', fontSize: '14px', color: '#e2e8f0' }}>
                    {formatTimestamp(job.created_at)}
                  </td>
                  <td style={{ padding: '16px', fontSize: '14px', color: '#e2e8f0' }}>
                    {calculateDuration(job.created_at, job.updated_at)}
                  </td>
                </tr>
                {expandedRow === job.execution_id && (
                  <tr style={{ borderBottom: index < jobs.length - 1 ? '1px solid #334155' : 'none' }}>
                    <td colSpan={6} style={{ padding: '24px', background: '#0f172a' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                        <div>
                          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#10b981', marginBottom: '16px' }}>
                            Job Details
                          </h3>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div>
                              <span style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>
                                Execution ID
                              </span>
                              <span style={{ fontSize: '14px', color: '#e2e8f0', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                                {job.execution_id}
                              </span>
                            </div>
                            <div>
                              <span style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>
                                Status
                              </span>
                              <span
                                style={{
                                  display: 'inline-block',
                                  padding: '4px 12px',
                                  borderRadius: '4px',
                                  fontSize: '12px',
                                  fontWeight: '600',
                                  background: `${getStatusColor(job.status)}20`,
                                  color: getStatusColor(job.status),
                                }}
                              >
                                {job.status}
                              </span>
                            </div>
                            <div>
                              <span style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>
                                Node
                              </span>
                              <span style={{ fontSize: '14px', color: '#8b5cf6', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                                {job.node || 'Not assigned'}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#10b981', marginBottom: '16px' }}>
                            Timing Information
                          </h3>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div>
                              <span style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>
                                Created At
                              </span>
                              <span style={{ fontSize: '14px', color: '#e2e8f0', fontFamily: 'monospace' }}>
                                {formatTimestamp(job.created_at)}
                              </span>
                            </div>
                            <div>
                              <span style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>
                                Updated At
                              </span>
                              <span style={{ fontSize: '14px', color: '#e2e8f0', fontFamily: 'monospace' }}>
                                {formatTimestamp(job.updated_at)}
                              </span>
                            </div>
                            <div>
                              <span style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>
                                Duration
                              </span>
                              <span style={{ fontSize: '14px', color: '#e2e8f0' }}>
                                {calculateDuration(job.created_at, job.updated_at)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default JobsTable;
