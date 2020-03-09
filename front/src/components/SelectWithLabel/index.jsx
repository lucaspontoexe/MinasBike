import React from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
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
  const { name, label, required, creatable } = props;

  return (
    <div className="select-wrapper">
      {label && (
        <label htmlFor={name}>
          {label}
          {required && <span className="asterisco"> *</span>}
        </label>
      )}

      {creatable ? (
        // cá estamos, repetindo props. Deve ter algum jeito de 
        // enxugar esse código.
        <CreatableSelect
          formatCreateLabel={val => `Clique ou pressione ENTER para adicionar "${val}"`}
          styles={customStyles}
          theme={themeSettings}
          {...props}
        />
      ) : (
        <Select styles={customStyles} theme={themeSettings} {...props} />
      )}
    </div>
  );
}
