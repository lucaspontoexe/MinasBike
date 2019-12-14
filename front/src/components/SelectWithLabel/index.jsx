import React from 'react';
import Select from 'react-select';
import customStyles from './customStyles';
import './styles.css';

const themeSettings = theme => ({
    // https://react-select.com/styles#overriding-the-theme
    ...theme,
    colors: {
        ...theme.colors,
        primary: '#DC2438',
        primary25: '#FFADB7',
        primary50: '#FF6173',
        primary75: '#EAB788',
    },
});

export default function SelectWithLabel(props) {
    const { name, label } = props;

    return (
        <div className="select-wrapper">
            {label && <label htmlFor={name}>{label}</label>}
            <Select
                styles={customStyles}
                theme={themeSettings}
                {...props}
            />
        </div>
    );
}
