import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from 'recharts';
import { Node } from '../types';
import CustomTooltip from './common/Tooltip/CustomTooltip';

interface LatencyChartProps {
  nodes: Node[];
}

const LatencyChart: React.FC<LatencyChartProps> = ({ nodes }) => {
  const data = useMemo(() => {
    return nodes
      .map((node) => ({
        pubkey: node.pubkey,
        shortPubkey: `${node.pubkey.slice(0, 4)}...${node.pubkey.slice(-4)}`,
        latency: node.latency,
        hw: node.hw,
      }))
      .sort((a, b) => a.latency - b.latency);
  }, [nodes]);

  const averageLatency = useMemo(() => {
    if (nodes.length === 0) return 0;
    return nodes.reduce((acc, node) => acc + node.latency, 0) / nodes.length;
  }, [nodes]);

  return (
    <div
      style={{
        background: 'var(--bg-card)',
        padding: '24px',
        borderRadius: '16px',
        border: '1px solid var(--border-subtle)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }}
    >
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px' }}>
            Network Latency Distribution
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
            Real-time latency metrics across {nodes.length} active prover nodes
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginRight: '8px' }}>
            Average
          </span>
          <span style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--accent-success)', fontFamily: 'Geist Mono, monospace' }}>
            {averageLatency.toFixed(0)}
            <span style={{ fontSize: '14px', marginLeft: '2px', opacity: 0.7 }}>ms</span>
          </span>
        </div>
      </div>

      <div style={{ height: 350, width: '100%' }}>
        <ResponsiveContainer>
          <BarChart 
            data={data} 
            barGap={0} 
            barCategoryGap="20%"
            margin={{ top: 20, right: 30, left: 50, bottom: 5 }}
          >
            <defs>
              <linearGradient id="latencyBarGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#22c55e" stopOpacity={0.3} />
              </linearGradient>
              <linearGradient id="latencyDangerGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#ef4444" stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              vertical={false} 
              stroke="var(--border-subtle)" 
              strokeDasharray="3 3" 
              opacity={0.4}
            />
            <XAxis
              dataKey="shortPubkey"
              stroke="var(--text-tertiary)"
              tick={{ fill: 'var(--text-tertiary)', fontSize: 10, fontFamily: 'monospace' }}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis
              stroke="var(--text-tertiary)"
              tick={{ fill: 'var(--text-tertiary)', fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              dx={-10}
              label={{ 
                value: 'Latency (ms)', 
                angle: -90, 
                position: 'insideLeft',
                dx: -20,
                style: { fill: 'var(--text-tertiary)', fontSize: '12px' } 
              }}
            />
            <Tooltip 
              cursor={{ fill: 'var(--bg-element)', opacity: 0.4 }}
              content={<CustomTooltip />} 
            />
            <ReferenceLine 
              y={averageLatency} 
              stroke="var(--accent-success)" 
              strokeDasharray="3 3" 
              opacity={0.5}
            />
            <Bar 
              dataKey="latency" 
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
              fill="url(#latencyBarGradient)"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.latency > averageLatency * 1.5 ? 'url(#latencyDangerGradient)' : 'url(#latencyBarGradient)'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LatencyChart;
