import React from 'react';
import './style.css';

export default function Error(props) {
    const { children, color, textColor } = props;
    return (
        <error {...props} style={{ backgroundColor: color, color: textColor }}>
            {children}
        </error>
    );
}
