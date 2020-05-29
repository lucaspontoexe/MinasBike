import React from 'react';
import CurrencyInput from '../CurrencyInput';
import Reais from 'assets/icons/R$.svg';
import './styles.css';

export default function TextBox(props) {
  const { label, required, name, type, options, list, icon, error } = props;

  function withIcon(icon) {
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

      {type === 'currency' ? (
        <>
          <CurrencyInput {...props} style={withIcon(Reais)} className={error && 'with-error'} />
        </>
      ) : (
        <>
          {/* copia todas as props pro input */}
          <input {...props} style={withIcon(icon)} className={error && 'with-error'} />

          {/* cria uma lista de opções caso necessário */}
          {list && (
            <datalist id={list}>
              {options.map((option, index) => (
                <option key={index} value={option} />
              ))}
            </datalist>
          )}
        </>
      )}

      {error && <div className="input-error">{error}</div>}
      {error && <div className="input-warning">{error}</div>}
    </div>
  );
}
