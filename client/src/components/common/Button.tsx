import React, { useState } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'danger';
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'default', 
  isLoading = false, 
  disabled, 
  style, 
  children, 
  ...props 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyle: React.CSSProperties = {
    padding: '10px 18px',
    border: '1px solid var(--border-subtle)',
    borderRadius: '8px',
    background: 'var(--bg-element)',
    color: 'var(--text-primary)',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.2s ease',
    opacity: disabled || isLoading ? 0.5 : 1,
    ...style,
  };

  const getVariantStyle = () => {
    if (variant === 'danger') {
      return {
        color: 'var(--danger-text)',
        borderColor: 'var(--danger-border)',
        background: isHovered && !disabled && !isLoading ? 'var(--danger-bg-hover)' : 'var(--danger-bg)',
      };
    }
    
    // Default variant
    if (isHovered && !disabled && !isLoading) {
      return {
        background: 'var(--border-subtle)', 
        borderColor: 'var(--border-focus)',
      };
    }

    return {};
  };

  const combinedStyle = {
    ...baseStyle,
    ...getVariantStyle(),
    ...style, 
    cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
  };

  return (
    <button
      disabled={disabled || isLoading}
      style={combinedStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
