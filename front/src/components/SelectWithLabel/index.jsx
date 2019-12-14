import React from 'react';
import Select from 'react-select';

import './styles.css';

export default function SelectWithLabel(props) {
    const { name, label } = props;

    const customStyles = {
        container: provided => {
            return { ...provided, height: 48, marginTop: 5 };
        },
        control: provided => {
            return { ...provided, height: '100%' };
        },
    };

    return (
        <div className="select-wrapper">
            {label && <label htmlFor={name}>{label}</label>}
            <Select styles={customStyles} {...props} />
        </div>
    );
}
