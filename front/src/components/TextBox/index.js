import React from 'react';
import './style.css';

export default function TextBox(props) {
    const { label, name, options, list } = props;
    return (
        <div className="text-box">
            <div className="nameInput">
                {label && <label htmlFor={name}>{label}</label>}
                <text className="asterisco"> *</text>
            </div>
            
            


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
