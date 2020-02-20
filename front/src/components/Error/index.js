import React from 'react';
import './styles.css';

export default function Error(props) {
  const { children, color, textColor } = props;
  return (
    <div className="error" {...props} style={{ backgroundColor: color, color: textColor }}>
      {children}
    </div>
  );
}
