import React from 'react';
import Modal from 'react-modal';

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
  aria?: {
    labelledby?: string;
    describedby?: string;
    modal?: boolean;
    [key: string]: any;
  };
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: '1px solid var(--border-subtle)',
    background: 'var(--bg-card)',
    color: 'var(--text-primary)',
    borderRadius: '12px',
    padding: '24px',
    maxWidth: '400px',
    width: '90%',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    backdropFilter: 'blur(4px)',
    zIndex: 50,
  },
};

const buttonBaseStyle: React.CSSProperties = {
  padding: '10px 18px',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.2s',
  border: '1px solid transparent',
};

const cancelButtonStyle: React.CSSProperties = {
  ...buttonBaseStyle,
  background: 'transparent',
  border: '1px solid var(--border-subtle)',
  color: 'var(--text-primary)',
  marginRight: '12px',
};

const confirmButtonStyle: React.CSSProperties = {
  ...buttonBaseStyle,
  background: 'var(--accent-danger)',
  color: 'white',
};

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onClose, onConfirm, children, aria }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Confirmation Modal"
      aria={aria}
    >
      <div style={{ marginBottom: '24px' }}>{children}</div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button 
          onClick={onClose} 
          style={cancelButtonStyle}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-element)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          Cancel
        </button>
        <button 
          onClick={onConfirm} 
          style={confirmButtonStyle}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          Confirm
        </button>
      </div>
    </Modal>
  );
};

export default CustomModal;
