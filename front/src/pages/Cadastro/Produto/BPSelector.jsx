import React, { Fragment } from 'react';
import SelectWithLabel from 'components/SelectWithLabel';
// import Modal from 'components/Modal';
// import './styles.css';
export function BPSelector({ onProductChange, onBrandChange, onBPChange }) {
  // load all products and brands on init
  // more data will be loaded as the form is filled
  const someOptions = [
    { value: 1, label: 'one' },
    { value: 2, label: 'two' },
    { value: 3, label: 'three' },
    { value: 4, label: 'four' },
  ];
  return (
    <Fragment>
      <fieldset>
        BP selector
        <SelectWithLabel
          name="product"
          creatable
          options={someOptions}
          onCreateOption={console.log}
          onChange={console.log}
          required
          label="Nome do Produto"
          placeholder="nome do produto"
        />
        <SelectWithLabel
          name="brand"
          creatable
          options={someOptions}
          onCreateOption={console.log}
          onChange={console.log}
          required
          label="Nome da Marca"
          placeholder="nome da marca"
        />
      </fieldset>
      <pre>current BP: Tal Produto; ID: 1 (ou [to be created])</pre>
      <br />
    </Fragment>
  );
}
