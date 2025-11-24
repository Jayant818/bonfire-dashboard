import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Node } from '../types';

interface LatencyChartProps {
  nodes: Node[];
}

const LatencyChart: React.FC<LatencyChartProps> = ({ nodes }) => {
  const data = nodes.map((node, index) => ({
    name: `Node ${index + 1}`,
    pubkey: node.pubkey.slice(0, 8),
    latency: node.latency,
  }));

  return (
    <div
      style={{
        background: '#1e293b',
        padding: '24px',
        borderRadius: '12px',
        border: '1px solid #334155',
      }}
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis 
            dataKey="pubkey" 
            stroke="#64748b"
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            stroke="#64748b"
            label={{ value: 'Latency (ms)', angle: -90, position: 'insideLeft', style: { fill: '#64748b' } }}
          />
          <Tooltip
            contentStyle={{
              background: '#0f172a',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#e2e8f0',
            }}
            labelFormatter={(value) => `Pubkey: ${value}`}
            formatter={(value: number) => [`${value}ms`, 'Latency']}
          />
          <Bar dataKey="latency" fill="#10b981" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LatencyChart;
