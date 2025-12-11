import React from 'react';
import { Job } from '../types';
import { FiLayers, FiSend, FiActivity, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

interface JobsStatsProps {
  jobs: Job[];
}

const JobsStats: React.FC<JobsStatsProps> = ({ jobs }) => {
  const stats = {
    total: jobs.length,
    submitted: jobs.filter(j => j.status === 'Submitted').length,
    running: jobs.filter(j => j.status === 'Running').length,
    completed: jobs.filter(j => j.status === 'Completed').length,
    failed: jobs.filter(j => j.status === 'Failed').length,
  };

  const allCards = [
    { label: 'Total Jobs', value: stats.total, icon: <FiLayers />, color: 'var(--text-primary)' },
    { label: 'Submitted', value: stats.submitted, icon: <FiSend />, color: 'var(--text-primary)' },
    { label: 'Running', value: stats.running, icon: <FiActivity />, color: 'var(--text-primary)' },
    { label: 'Completed', value: stats.completed, icon: <FiCheckCircle />, color: 'var(--text-primary)' },
    { label: 'Failed', value: stats.failed, icon: <FiAlertCircle />, color: 'var(--text-primary)' },
  ];

  const getGridStyle = (index: number) => {
    switch (index) {
      case 0: // Total Jobs
        return { gridRow: '1 / span 2', gridColumn: '1' };
      case 1: // Submitted
        return { gridRow: '1', gridColumn: '2' };
      case 2: // Running
        return { gridRow: '1', gridColumn: '3' };
      case 3: // Completed
        return { gridRow: '2', gridColumn: '2' };
      case 4: // Failed
        return { gridRow: '2', gridColumn: '3' };
      default:
        return {};
    }
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
        gap: '12px',
        marginBottom: '24px',
      }}
    >
      {allCards.map((card, index) => (
        <div
          key={card.label}
          style={{
            background: 'var(--bg-card)',
            padding: index === 0 ? '32px' : '16px', // Even Bigger padding for Total Jobs
            borderRadius: '12px',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: index === 0 ? '200px' : '120px', // Bigger minHeight for Total Jobs
            height: '100%',
            ...getGridStyle(index),
          }}
        >
          <span style={{ fontSize: index === 0 ? '16px' : '12px', color: 'var(--text-secondary)', marginBottom: '4px', fontWeight: '500' }}>
            {card.label}
          </span>
          <span
            style={{
              fontSize: index === 0 ? '64px' : '32px', // Bigger font size for Total Jobs value
              fontWeight: 'bold',
              color: 'var(--text-primary)',
              fontFamily: 'Geist Mono, monospace',
              lineHeight: '1',
              marginBottom: '12px',
            }}
          >
            {card.value}
          </span>
          <span style={{ fontSize: index === 0 ? '24px' : '16px', color: 'var(--text-tertiary)', opacity: 0.8 }}>
            {card.icon}
          </span>
        </div>
      ))}
    </div>
  );
};

export default JobsStats;
