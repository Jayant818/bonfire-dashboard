import React from 'react';
import NodesTable from './NodesTable';
import LatencyChart from './LatencyChart';
import { useNodes } from '../hooks/useNodes';

const Nodes: React.FC = () => {
  const { nodes, loading } = useNodes();

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        Loading nodes...
      </div>
    );
  }

  return (
    <div style={{ padding: '40px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>
        Nodes
      </h1>
      <p style={{ color: '#64748b', marginBottom: '32px' }}>
        {nodes.length} active prover nodes
      </p>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>
          Latency Distribution
        </h2>
        <LatencyChart nodes={nodes} />
      </div>

      <div>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>
          Node Details
        </h2>
        <NodesTable nodes={nodes} />
      </div>
    </div>
  );
};

export default Nodes;
