const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div
        style={{
          background: 'rgba(9, 9, 11, 0.95)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '12px',
          padding: '16px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(8px)',
          minWidth: '240px',
        }}
      >
        <div style={{ marginBottom: '12px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', display: 'block' }}>
            Node Pubkey
          </span>
          <span style={{ fontFamily: 'monospace', color: 'var(--accent-success)', fontSize: '14px' }}>
            {data.pubkey}
          </span>
        </div>
        
        <div style={{ display: 'grid', gap: '8px' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Latency</span>
            <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff' }}>
              {data.latency} ms
            </span>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>CPU</span>
            <span style={{ fontSize: '12px', color: '#fff', maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'right' }}>
              {data.hw.cpu_type}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Cores</span>
            <span style={{ fontSize: '12px', color: '#fff' }}>
              {data.hw.cpu_cores}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Memory</span>
            <span style={{ fontSize: '12px', color: '#fff' }}>
              {(data.hw.memory_bytes / (1024 ** 3)).toFixed(1)} GB
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
