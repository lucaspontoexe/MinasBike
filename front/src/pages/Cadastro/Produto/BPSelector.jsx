import React, { Fragment, useState, useEffect } from 'react';
import SelectWithLabel from 'components/SelectWithLabel';
import api from 'services/api';

export function BPSelector({ onProductChange, onBrandChange, onBPChange }) {
  // load all products and brands on init
  // more data will be loaded as the form is filled
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);

  const formatSelectItem = item => ({ value: item.id, label: item.name });

  useEffect(() => {
    api.get('/products').then(res => setProducts(res.data.map(formatSelectItem)));
    api.get('/brands').then(res => setBrands(res.data.map(formatSelectItem)));
  }, []);

  function handleChange(value, { name }) {
    console.log(value, name);
  }

  return (
    <Fragment>
      <fieldset>
        BP selector
        <SelectWithLabel
          name="product"
          creatable
          options={brands}
          onCreateOption={console.log}
          onChange={handleChange}
          required
          label="Nome do Produto"
          placeholder="nome do produto"
        />
        <SelectWithLabel
          name="brand"
          creatable
          options={products}
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
