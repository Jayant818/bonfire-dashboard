import React, { useState } from 'react';
import { Node } from '../types';

interface NodesTableProps {
  nodes: Node[];
}

const NodesTable: React.FC<NodesTableProps> = ({ nodes }) => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const formatMemory = (bytes: number) => {
    const gb = bytes / (1024 ** 3);
    return `${gb.toFixed(0)} GB`;
  };

  const truncate = (str: string, len: number) => {
    return str.length > len ? `${str.slice(0, len)}...` : str;
  };

  const toggleRow = (pubkey: string) => {
    setExpandedRow(expandedRow === pubkey ? null : pubkey);
  };

  return (
    <div
      style={{
        background: 'var(--bg-card)',
        borderRadius: '12px',
        border: '1px solid var(--border-subtle)',
        overflow: 'hidden',
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border-subtle)' }}>
            <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', width: '40px' }}>
            </th>
            <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)' }}>
              Pubkey
            </th>
            <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#94a3b8' }}>
              Version
            </th>
            <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)' }}>
              CPU
            </th>
            <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)' }}>
              Cores
            </th>
            <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)' }}>
              Memory
            </th>
            <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)' }}>
              GPUs
            </th>
            <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)' }}>
              Latency
            </th>
          </tr>
        </thead>
        <tbody>
          {nodes.map((node, index) => (
            <React.Fragment key={node.pubkey}>
              <tr
                style={{
                  borderBottom: expandedRow === node.pubkey ? 'none' : index < nodes.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                  cursor: 'pointer',
                  background: expandedRow === node.pubkey ? 'var(--bg-element)' : 'transparent',
                  transition: 'background 0.2s',
                }}
                onClick={() => toggleRow(node.pubkey)}
                onMouseEnter={(e) => {
                  if (expandedRow !== node.pubkey) e.currentTarget.style.background = 'var(--bg-element)';
                }}
                onMouseLeave={(e) => {
                  if (expandedRow !== node.pubkey) e.currentTarget.style.background = 'transparent';
                }}
              >
                <td style={{ padding: '16px', fontSize: '18px', color: 'var(--text-tertiary)' }}>
                  {expandedRow === node.pubkey ? '▼' : '▶'}
                </td>
                <td style={{ padding: '16px', fontSize: '14px', fontFamily: 'Geist Mono, monospace', color: 'var(--accent-success)' }}>
                  {truncate(node.pubkey, 12)}
                </td>
                <td style={{ padding: '16px', fontSize: '14px', color: '#e2e8f0' }}>
                  {node.hw.version}
                </td>
                <td style={{ padding: '16px', fontSize: '14px', color: 'var(--text-primary)' }}>
                  {truncate(node.hw.cpu_type, 20)}
                </td>
                <td style={{ padding: '16px', fontSize: '14px', color: 'var(--text-primary)', fontFamily: 'Geist Mono, monospace' }}>
                  {node.hw.cpu_cores}
                </td>
                <td style={{ padding: '16px', fontSize: '14px', color: 'var(--text-primary)', fontFamily: 'Geist Mono, monospace' }}>
                  {formatMemory(node.hw.memory_bytes)}
                </td>
                <td style={{ padding: '16px', fontSize: '14px', color: 'var(--text-primary)', fontFamily: 'Geist Mono, monospace' }}>
                  {node.hw.gpus?.length || 0} × {node.hw.gpus?.[0]?.gpu_model || 'N/A'}
                </td>
                <td style={{ padding: '16px', fontSize: '14px', color: 'var(--text-primary)', fontFamily: 'Geist Mono, monospace' }}>
                  {node.latency}ms
                </td>
              </tr>
              {expandedRow === node.pubkey && (
                <tr style={{ borderBottom: index < nodes.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                  <td colSpan={8} style={{ padding: '24px', background: 'var(--bg-element)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                      <div>
                        <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--accent-success)', marginBottom: '16px' }}>
                          Node Details
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          <div>
                            <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                              Public Key
                            </span>
                            <span style={{ fontSize: '14px', color: 'var(--text-primary)', fontFamily: 'Geist Mono, monospace', wordBreak: 'break-all' }}>
                              {node.pubkey}
                            </span>
                          </div>
                          <div>
                            <span style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>
                              Version
                            </span>
                            <span style={{ fontSize: '14px', color: '#e2e8f0' }}>
                              {node.hw.version}
                            </span>
                          </div>
                          <div>
                            <span style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>
                              Version
                            </span>
                            <span style={{ fontSize: '14px', color: '#e2e8f0' }}>
                              {node.hw.version}
                            </span>
                          </div>
                          <div>
                            <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                              CPU Type
                            </span>
                            <span style={{ fontSize: '14px', color: 'var(--text-primary)' }}>
                              {node.hw.cpu_type}
                            </span>
                          </div>
                          <div>
                            <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                              CPU Speed
                            </span>
                            <span style={{ fontSize: '14px', color: 'var(--text-primary)', fontFamily: 'Geist Mono, monospace' }}>
                              {node.hw.cpu_mhz} MHz
                            </span>
                          </div>
                          <div>
                            <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                              CPU Cores
                            </span>
                            <span style={{ fontSize: '14px', color: 'var(--text-primary)', fontFamily: 'Geist Mono, monospace' }}>
                              {node.hw.cpu_cores}
                            </span>
                          </div>
                          <div>
                            <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                              Total Memory
                            </span>
                            <span style={{ fontSize: '14px', color: 'var(--text-primary)', fontFamily: 'Geist Mono, monospace' }}>
                              {formatMemory(node.hw.memory_bytes)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--accent-success)', marginBottom: '16px' }}>
                          GPU Information
                        </h3>
                        {node.hw.gpus && node.hw.gpus.length > 0 ? (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {node.hw.gpus.map((gpu, idx) => (
                              <div
                                key={idx}
                                style={{
                                  padding: '12px',
                                  background: 'var(--bg-app)',
                                  borderRadius: '8px',
                                  border: '1px solid var(--border-subtle)',
                                }}
                              >
                                <div style={{ marginBottom: '8px' }}>
                                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                                    GPU {idx + 1} Model
                                  </span>
                                  <span style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: '500' }}>
                                    {gpu.gpu_model}
                                  </span>
                                </div>
                                <div>
                                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                                    GPU Memory
                                  </span>
                                  <span style={{ fontSize: '14px', color: 'var(--text-primary)', fontFamily: 'Geist Mono, monospace' }}>
                                    {formatMemory(gpu.gpu_memory_bytes)}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>No GPUs available</p>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NodesTable;
