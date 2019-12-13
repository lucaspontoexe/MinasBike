import React from 'react';
import './style.css';

export default function TextBox(props) {
    const { label, name, options, list } = props;
    return (
        <div className="text-box">
            {/* renderiza label se existir */}
            {label && <label htmlFor={name}>{label}</label>}

            {/* copia todas as props pro input */}
            <input {...props}></input>

            {/* cria uma lista de opções caso necessário */}
            {list && (
                <datalist id={list}>
                    {options.map((option, index) => (
                        <option key={index} value={option} />
                    ))}
                </datalist>
            )}
        </div>
    );
}
