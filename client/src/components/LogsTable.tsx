import React, { useEffect, useRef, useState } from 'react';
import { Log } from '../types';

interface LogsTableProps {
  logs: Log[];
}

const LogsTable: React.FC<LogsTableProps> = ({ logs }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  useEffect(() => {
    if (containerRef.current && expandedRow === null) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'Stderr':
        return 'var(--accent-danger)';
      case 'Stdout':
        return 'var(--accent-success)';
      default:
        return 'var(--text-tertiary)';
    }
  };

  const formatTimestamp = (timestamp?: string) => {
    if (!timestamp) return '-';
    try {
      return new Date(timestamp).toLocaleString();
    } catch {
      return timestamp;
    }
  };

  const truncate = (str: string, len: number) => {
    return str.length > len ? `${str.slice(0, len)}...` : str;
  };

  const toggleRow = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <div
      ref={containerRef}
      style={{
        background: 'var(--bg-card)',
        borderRadius: '12px',
        border: '1px solid var(--border-subtle)',
        maxHeight: '600px',
        overflow: 'auto',
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ position: 'sticky', top: 0, background: 'var(--bg-card)', zIndex: 1 }}>
          <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
            <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', width: '40px' }}>
            </th>
            <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)' }}>
              Timestamp
            </th>
            <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)' }}>
              Source
            </th>
            <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)' }}>
              Message
            </th>
            <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)' }}>
              Job ID
            </th>
            <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)' }}>
              Image ID
            </th>
          </tr>
        </thead>
        <tbody>
          {logs.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                style={{
                  padding: '40px',
                  textAlign: 'center',
                  color: 'var(--text-secondary)',
                }}
              >
                No logs found. Waiting for logs...
              </td>
            </tr>
          ) : (
            logs.map((log, index) => (
              <React.Fragment key={index}>
                <tr
                  style={{
                    borderBottom: expandedRow === index ? 'none' : index < logs.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                    cursor: 'pointer',
                    background: expandedRow === index ? 'var(--bg-element)' : 'transparent',
                    transition: 'background 0.2s',
                  }}
                  onClick={() => toggleRow(index)}
                  onMouseEnter={(e) => {
                    if (expandedRow !== index) e.currentTarget.style.background = 'var(--bg-element)';
                  }}
                  onMouseLeave={(e) => {
                    if (expandedRow !== index) e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <td style={{ padding: '12px 16px', fontSize: '14px', color: 'var(--text-tertiary)' }}>
                    {expandedRow === index ? '▼' : '▶'}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: 'var(--text-secondary)', fontFamily: 'Geist Mono, monospace' }}>
                    {formatTimestamp(log.timestamp)}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span
                      style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '600',
                        background: `${getSourceColor(log.source)}20`,
                        color: getSourceColor(log.source),
                      }}
                    >
                      {log.source}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '14px', color: 'var(--text-primary)', fontFamily: 'Geist Mono, monospace' }}>
                    {truncate(log.log, 50)}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: '#3b82f6', fontFamily: 'Geist Mono, monospace' }}>
                    {truncate(log.job_id, 12)}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: '#8b5cf6', fontFamily: 'Geist Mono, monospace' }}>
                    {truncate(log.image_id, 12)}
                  </td>
                </tr>
                {expandedRow === index && (
                  <tr style={{ borderBottom: index < logs.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                    <td colSpan={6} style={{ padding: '24px', background: 'var(--bg-element)' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
                        <div>
                          <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--accent-success)', marginBottom: '16px' }}>
                            Log Details
                          </h3>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div>
                              <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                                Timestamp
                              </span>
                              <span style={{ fontSize: '14px', color: 'var(--text-primary)', fontFamily: 'Geist Mono, monospace' }}>
                                {formatTimestamp(log.timestamp)}
                              </span>
                            </div>
                            <div>
                              <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                                Source
                              </span>
                              <span
                                style={{
                                  display: 'inline-block',
                                  padding: '4px 8px',
                                  borderRadius: '4px',
                                  fontSize: '12px',
                                  fontWeight: '600',
                                  background: `${getSourceColor(log.source)}20`,
                                  color: getSourceColor(log.source),
                                }}
                              >
                                {log.source}
                              </span>
                            </div>
                            <div>
                              <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                                Job ID
                              </span>
                              <span style={{ fontSize: '14px', color: '#3b82f6', fontFamily: 'Geist Mono, monospace', wordBreak: 'break-all' }}>
                                {log.job_id}
                              </span>
                            </div>
                            <div>
                              <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                                Image ID
                              </span>
                              <span style={{ fontSize: '14px', color: '#8b5cf6', fontFamily: 'Geist Mono, monospace', wordBreak: 'break-all' }}>
                                {log.image_id}
                              </span>
                            </div>
                            <div>
                              <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
                                Full Message
                              </span>
                              <pre
                                style={{
                                  fontSize: '14px',
                                  color: 'var(--text-primary)',
                                  fontFamily: 'Geist Mono, monospace',
                                  background: 'var(--bg-app)', // Darker for code block
                                  padding: '12px',
                                  borderRadius: '8px',
                                  border: '1px solid var(--border-subtle)',
                                  whiteSpace: 'pre-wrap',
                                  wordBreak: 'break-word',
                                  margin: 0,
                                }}
                              >
                                {log.log}
                              </pre>
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

export default LogsTable;
