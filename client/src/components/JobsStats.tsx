import React from 'react';
import { Job } from '../types';

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

  const cards = [
    { label: 'Total Jobs', value: stats.total, icon: '📦', color: '#64748b' },
    { label: 'Submitted', value: stats.submitted, icon: '📝', color: '#3b82f6' },
    { label: 'Running', value: stats.running, icon: '⚡', color: '#f59e0b' },
    { label: 'Completed', value: stats.completed, icon: '✅', color: '#10b981' },
    { label: 'Failed', value: stats.failed, icon: '❌', color: '#ef4444' },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '16px',
        marginBottom: '32px',
      }}
    >
      {cards.map((card) => (
        <div
          key={card.label}
          style={{
            background: '#1e293b',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid #334155',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>
                {card.label}
              </p>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: card.color }}>
                {card.value}
              </p>
            </div>
            <span style={{ fontSize: '28px' }}>{card.icon}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobsStats;
