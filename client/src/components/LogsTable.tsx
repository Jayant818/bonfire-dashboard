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
        return '#ef4444';
      case 'Stdout':
        return '#10b981';
      default:
        return '#94a3b8';
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
        background: '#1e293b',
        borderRadius: '12px',
        border: '1px solid #334155',
        maxHeight: '600px',
        overflow: 'auto',
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ position: 'sticky', top: 0, background: '#0f172a', zIndex: 1 }}>
          <tr style={{ borderBottom: '1px solid #334155' }}>
            <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#94a3b8', width: '40px' }}>
            </th>
            <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#94a3b8' }}>
              Timestamp
            </th>
            <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#94a3b8' }}>
              Source
            </th>
            <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#94a3b8' }}>
              Message
            </th>
            <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#94a3b8' }}>
              Job ID
            </th>
            <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#94a3b8' }}>
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
                  color: '#64748b',
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
                    borderBottom: expandedRow === index ? 'none' : index < logs.length - 1 ? '1px solid #334155' : 'none',
                    cursor: 'pointer',
                    background: expandedRow === index ? '#0f172a' : 'transparent',
                  }}
                  onClick={() => toggleRow(index)}
                >
                  <td style={{ padding: '12px 16px', fontSize: '14px' }}>
                    {expandedRow === index ? '▼' : '▶'}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: '#94a3b8', fontFamily: 'monospace' }}>
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
                  <td style={{ padding: '12px 16px', fontSize: '14px', color: '#e2e8f0', fontFamily: 'monospace' }}>
                    {truncate(log.log, 50)}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: '#3b82f6', fontFamily: 'monospace' }}>
                    {truncate(log.job_id, 12)}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: '#8b5cf6', fontFamily: 'monospace' }}>
                    {truncate(log.image_id, 12)}
                  </td>
                </tr>
                {expandedRow === index && (
                  <tr style={{ borderBottom: index < logs.length - 1 ? '1px solid #334155' : 'none' }}>
                    <td colSpan={6} style={{ padding: '24px', background: '#0f172a' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
                        <div>
                          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#10b981', marginBottom: '16px' }}>
                            Log Details
                          </h3>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div>
                              <span style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>
                                Timestamp
                              </span>
                              <span style={{ fontSize: '14px', color: '#e2e8f0', fontFamily: 'monospace' }}>
                                {formatTimestamp(log.timestamp)}
                              </span>
                            </div>
                            <div>
                              <span style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>
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
                              <span style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>
                                Job ID
                              </span>
                              <span style={{ fontSize: '14px', color: '#3b82f6', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                                {log.job_id}
                              </span>
                            </div>
                            <div>
                              <span style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>
                                Image ID
                              </span>
                              <span style={{ fontSize: '14px', color: '#8b5cf6', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                                {log.image_id}
                              </span>
                            </div>
                            <div>
                              <span style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '8px' }}>
                                Full Message
                              </span>
                              <pre
                                style={{
                                  fontSize: '14px',
                                  color: '#e2e8f0',
                                  fontFamily: 'monospace',
                                  background: '#1e293b',
                                  padding: '12px',
                                  borderRadius: '8px',
                                  border: '1px solid #334155',
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
