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
    { label: 'Total Nodes', value: metrics.totalNodes, icon: '', color: '#10b981' },
    { label: 'Total GPUs', value: metrics.totalGpus, icon: '', color: '#3b82f6' },
    { label: 'Total Memory', value: formatMemory(metrics.totalMemory), icon: '', color: '#8b5cf6' },
    { label: 'Avg Latency', value: `${metrics.avgLatency.toFixed(0)}ms`, icon: '', color: '#f59e0b' },
    { label: 'Total Cores', value: metrics.totalCores, icon: '', color: '#ec4899' },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
      }}
    >
      {cards.map((card) => (
        <div
          key={card.label}
          style={{
            background: '#1e293b',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid #334155',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>
                {card.label}
              </p>
              <p style={{ fontSize: '28px', fontWeight: 'bold', color: card.color }}>
                {card.value}
              </p>
            </div>
            <span style={{ fontSize: '32px' }}>{card.icon}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsCards;
