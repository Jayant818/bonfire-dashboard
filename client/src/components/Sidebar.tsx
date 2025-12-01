import React from 'react';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: 'dashboard' | 'nodes' | 'jobs' | 'logs') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '' },
    { id: 'nodes', label: 'Nodes', icon: '' },
    { id: 'jobs', label: 'Jobs', icon: '' },
    { id: 'logs', label: 'Logs', icon: '' },
  ];

  return (
    <div
      style={{
        width: '250px',
        background: '#1e293b',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid #334155',
      }}
    >
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>
          BONFIRE
        </h1>
        <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
          Prover Network
        </p>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id as any)}
            style={{
              padding: '12px 16px',
              background: currentView === item.id ? '#334155' : 'transparent',
              border: 'none',
              borderRadius: '8px',
              color: currentView === item.id ? '#10b981' : '#94a3b8',
              cursor: 'pointer',
              textAlign: 'left',
              fontSize: '14px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              if (currentView !== item.id) {
                e.currentTarget.style.background = '#2d3748';
              }
            }}
            onMouseLeave={(e) => {
              if (currentView !== item.id) {
                e.currentTarget.style.background = 'transparent';
              }
            }}
          >
            <span style={{ fontSize: '18px' }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
