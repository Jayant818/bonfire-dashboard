import React from 'react';
import MetricsCards from './MetricsCards';
import NodesTable from './NodesTable';
import { useMetrics } from '../hooks/useMetrics';
import { useNodes } from '../hooks/useNodes';

const Dashboard: React.FC = () => {
  const { metrics, loading: metricsLoading } = useMetrics();
  const { nodes, loading: nodesLoading } = useNodes();

  return (
    <div style={{ padding: '40px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px', color: 'var(--text-primary)' }}>
        Dashboard
      </h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
        Overview of Bonfire prover network
      </p>

      {metricsLoading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>Loading metrics...</div>
      ) : (
        <MetricsCards metrics={metrics} />
      )}

      <div style={{ marginTop: '40px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px', color: 'var(--text-primary)' }}>
          Active Nodes
        </h2>
        {nodesLoading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>Loading nodes...</div>
        ) : (
          <NodesTable nodes={nodes} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
