import React from 'react';
import { FiHome, FiCpu, FiTool, FiFileText } from 'react-icons/fi'; // Importing Feather icons

interface SidebarProps {
  currentView: string;
  onViewChange: (view: 'dashboard' | 'nodes' | 'jobs' | 'logs') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FiHome /> },
    { id: 'nodes', label: 'Nodes', icon: <FiCpu /> },
    { id: 'jobs', label: 'Jobs', icon: <FiTool /> },
    { id: 'logs', label: 'Logs', icon: <FiFileText /> },
  ];

  return (
    <div
      style={{
        width: '250px',
        background: 'var(--bg-app)',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid var(--border-subtle)',
      }}
    >
      <div style={{ marginBottom: '40px', paddingLeft: '12px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bolder', color: '#001300', letterSpacing: '-0.5px', }}>
          BONFIRE
        </h1>
        <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '4px' }}>
          Prover Network
        </p>
      </div>

      <div style={{ paddingLeft: '12px', marginBottom: '12px', fontSize: '12px', fontWeight: '600', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        Menu
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id as any)}
            style={{
              padding: '10px 12px',
              background: currentView === item.id ? 'var(--bg-element)' : 'transparent',
              border: 'none',
              borderRadius: '6px',
              color: currentView === item.id ? 'var(--text-primary)' : 'var(--text-secondary)',
              cursor: 'pointer',
              textAlign: 'left',
              fontSize: '14px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (currentView !== item.id) {
                e.currentTarget.style.color = 'var(--text-primary)';
                e.currentTarget.style.background = 'var(--bg-element)';
              }
            }}
            onMouseLeave={(e) => {
              if (currentView !== item.id) {
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.background = 'transparent';
              }
            }}
          >
            <span style={{ fontSize: '16px', opacity: 0.8 }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
