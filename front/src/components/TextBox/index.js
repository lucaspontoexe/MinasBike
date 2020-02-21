import React from 'react';
import './styles.css';

export default function TextBox(props) {
  const { label, required, name, options, list, icon, error } = props;

  function useIcon(icon) {
    if (icon)
      return {
        paddingLeft: 40,
        backgroundImage: `url(${icon})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 10,
      };
  }

  return (
    <div className="text-box">
      {label && (
        <label htmlFor={name}>
          {label}
          {required && <span className="asterisco"> *</span>}
        </label>
      )}

      {/* copia todas as props pro input */}
      <input {...props} style={useIcon(icon)} className={error && 'with-error'}/>

      {/* cria uma lista de opções caso necessário */}
      {list && (
        <datalist id={list}>
          {options.map((option, index) => (
            <option key={index} value={option} />
          ))}
        </datalist>
      )}

      {error && <div className="input-error">{error}</div>}
    </div>
  );
}
