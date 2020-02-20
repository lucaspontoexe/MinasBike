import React from 'react';
import './styles.css';

export default function Button(props) {
  const { children, color, textColor } = props;
  return (
    <button {...props} style={{ backgroundColor: color, color: textColor }}>
      {children}
    </button>
  );
}
