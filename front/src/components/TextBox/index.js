import React from 'react';
import './style.css';

export default function TextBox(props) {
    return (
        <div className="text-box">
            {/* renderiza label se existir */}
            {props.label && <label htmlFor={props.name}>{props.label}</label>}
            {/* copia todas as props pro input */}
            <input {...props}></input>
        </div>
    );
}
