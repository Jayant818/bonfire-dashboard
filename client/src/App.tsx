import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Nodes from './components/Nodes';
import Logs from './components/Logs';

type View = 'dashboard' | 'nodes' | 'logs';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'nodes':
        return <Nodes />;
      case 'logs':
        return <Logs />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <div style={{ flex: 1, overflow: 'auto' }}>{renderView()}</div>
    </div>
  );
};

export default App;
