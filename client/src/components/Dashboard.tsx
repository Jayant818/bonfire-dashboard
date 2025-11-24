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
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>
        Dashboard
      </h1>
      <p style={{ color: '#64748b', marginBottom: '32px' }}>
        Overview of Bonsai prover network
      </p>

      {metricsLoading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>Loading metrics...</div>
      ) : (
        <MetricsCards metrics={metrics} />
      )}

      <div style={{ marginTop: '40px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>
          Active Nodes
        </h2>
        {nodesLoading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>Loading nodes...</div>
        ) : (
          <NodesTable nodes={nodes} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
