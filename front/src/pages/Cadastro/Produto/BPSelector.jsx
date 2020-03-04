import React, { Fragment, useState, useEffect } from 'react';
import SelectWithLabel from 'components/SelectWithLabel';
import api from 'services/api';

export function BPSelector({ onProductChange, onBrandChange, onBPChange }) {
  // load all products and brands on init
  // more data will be loaded as the form is filled
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/products').then(res => setProducts(res.data));
    api.get('/brands').then(res => setBrands(res.data));
  }, [])
  
  const someOptions = [
    { value: 1, label: 'one' },
    { value: 2, label: 'two' },
    { value: 3, label: 'three' },
    { value: 4, label: 'four' },
  ];

  function handleChange(value, {name}) {
      console.log(value, name)
  }


  return (
    <Fragment>
      <fieldset>
        BP selector
        <SelectWithLabel
          name="product"
          creatable
          options={someOptions}
          onCreateOption={console.log}
          onChange={handleChange}
          required
          label="Nome do Produto"
          placeholder="nome do produto"
        />
        <SelectWithLabel
          name="brand"
          creatable
          options={someOptions}
          onCreateOption={console.log}
          onChange={handleChange}
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
