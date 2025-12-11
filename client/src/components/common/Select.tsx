import React from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { selectStyle } from './styles';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  containerStyle?: React.CSSProperties;
}

const Select: React.FC<SelectProps> = ({ containerStyle, style, children, ...props }) => {
  return (
    <div style={{ position: 'relative', width: '100%', ...containerStyle }}>
      <select style={{ ...selectStyle, ...style }} {...props}>
        {children}
      </select>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: '12px',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
          color: 'var(--text-secondary)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <FiChevronDown />
      </div>
    </div>
  );
};

export default Select;
