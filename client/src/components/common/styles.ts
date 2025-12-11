import React from 'react';

export const inputStyle: React.CSSProperties = {
  padding: '10px 12px',
  background: 'var(--bg-element)',
  border: '1px solid var(--border-subtle)',
  borderRadius: '8px',
  color: 'var(--text-primary)',
  fontSize: '14px',
  outline: 'none',
  width: '100%',
  fontFamily: 'Geist Mono, monospace',
};

export const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: 'none',
  cursor: 'pointer',
  paddingRight: '32px',
};

export const buttonStyle: React.CSSProperties = {
  padding: '10px 20px',
  background: 'var(--bg-element)',
  border: '1px solid var(--border-subtle)',
  borderRadius: '8px',
  color: 'var(--text-primary)',
  fontSize: '14px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'background 0.2s',
};

export const filterContainerStyle: React.CSSProperties = {
  background: 'var(--bg-card)',
  padding: '24px',
  borderRadius: '12px',
  border: '1px solid var(--border-subtle)',
  marginBottom: '32px',
};

export const filterGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '16px',
};

export const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '8px',
  fontSize: '14px',
  color: 'var(--text-secondary)',
};
