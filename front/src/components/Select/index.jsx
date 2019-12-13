import React from 'react';
import Select from 'react-select';

import './styles.css';

export default function SelectWithLabel(props) {
    const { name, label } = props;

    return (
        <div className="select-wrapper">
            {label && <label htmlFor={name}>{label}</label>}
            <Select {...props} />
        </div>
    );
}
