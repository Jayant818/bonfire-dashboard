import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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
        background: 'var(--bg-card)',
        padding: '24px',
        borderRadius: '12px',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--border-subtle)" vertical={false} strokeDasharray="3 3" />
          <XAxis 
            dataKey="pubkey" 
            stroke="var(--text-tertiary)"
            tick={{ fill: 'var(--text-tertiary)', fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="var(--text-tertiary)"
            tick={{ fill: 'var(--text-tertiary)', fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            label={{ value: 'Latency (ms)', angle: -90, position: 'insideLeft', style: { fill: 'var(--text-tertiary)' } }}
          />
          <Tooltip
            contentStyle={{
              background: '#000',
              border: '1px solid #333',
              borderRadius: '8px',
              color: 'var(--text-primary)',
            }}
            labelFormatter={(value) => `Pubkey: ${value}`}
            formatter={(value: number) => [`${value}ms`, 'Latency']}
          />
          <Area 
            type="monotone" 
            dataKey="latency" 
            stroke="#22c55e" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorLatency)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LatencyChart;
