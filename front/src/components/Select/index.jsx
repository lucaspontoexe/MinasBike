import React from 'react';
import './styles.css';

export default function Select({ name, options, label }) {
    return (
        <div className="select-wrapper">
            {/* renderiza label se existir */}
            {label && <label htmlFor={name}>{label}</label>}
            <select name={name}>
                {options.map(item => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                ))}
            </select>
        </div>
    );
}
