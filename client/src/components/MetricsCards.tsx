import React from 'react';
import { Metrics } from '../types';

interface MetricsCardsProps {
  metrics: Metrics | null;
}

const MetricsCards: React.FC<MetricsCardsProps> = ({ metrics }) => {
  if (!metrics) return null;

  const formatMemory = (bytes: number) => {
    const tb = bytes / (1024 ** 4);
    return `${tb.toFixed(2)} TB`;
  };

  const cards = [
    { label: 'Total Nodes', value: metrics.totalNodes },
    { label: 'Total GPUs', value: metrics.totalGpus },
    { label: 'Total Memory', value: formatMemory(metrics.totalMemory) },
    { label: 'Avg Latency', value: `${metrics.avgLatency.toFixed(0)}ms` },
    { label: 'Total Cores', value: metrics.totalCores },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '24px',
      }}
    >
      {cards.map((card) => (
        <div
          key={card.label}
          style={{
            background: 'var(--bg-card)',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid var(--border-subtle)',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '500' }}>
              {card.label}
            </p>
          </div>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--text-primary)', fontFamily: 'Geist Mono, monospace', letterSpacing: '-1px' }}>
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MetricsCards;
