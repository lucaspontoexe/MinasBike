import React, { Fragment, useState, useEffect } from 'react';
import SelectWithLabel from 'components/SelectWithLabel';
import api from 'services/api';

export function BPSelector({ onChange }) {
  // single state for each property (2nd attempt)
  const [brand_id, setBrandID] = useState(-1);
  const [product_id, setProductID] = useState(-1);
  const [brandproduct_id, setBrandproductID] = useState(-1);

  // load all products and brands on init
  // more data will be loaded as the form is filled
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);

  
  // TODO: export whole object, not just its ID.
  // object_id -> currentObject

  // grab from API
  useEffect(() => {
    const formatSelectItem = item => ({ value: item.id, label: item.name });
    api.get('/products').then(res => setProducts(res.data.map(formatSelectItem)));
    api.get('/brands').then(res => setBrands(res.data.map(formatSelectItem)));
  }, []);

  // search for a brandproduct
  useEffect(() => {
    if (brand_id === -1 || product_id === -1) return;

    function formatBrandproductID(array) {
      if (array.length === 0) return -1;
      return array[0].id;
    }
    api
      .get('/brandproducts', { params: { brand_id, product_id } })
      .then(res => setBrandproductID(formatBrandproductID(res.data)));
  }, [brand_id, product_id]);

  // run onChange
  useEffect(() => {
    onChange({ brand_id, product_id, brandproduct_id });
  }, [brand_id, product_id, brandproduct_id, onChange]);

  return (
    <Fragment>
      <fieldset>
        BP selector
        <SelectWithLabel
          name="product"
          creatable
          options={products}
          onCreateOption={console.log}
          onChange={({ value: id }) => setProductID(id)}
          required
          label="Nome do Produto"
          placeholder="nome do produto"
        />
        <SelectWithLabel
          name="brand"
          creatable
          options={brands}
          onCreateOption={console.log}
          onChange={({ value: id }) => setBrandID(id)}
          required
          label="Nome da Marca"
          placeholder="nome da marca"
        />
      </fieldset>
      <pre>
        current product: {product_id} <br />
        current brand: {brand_id} <br />
        current BP: {brandproduct_id === -1 ? '(to be created)' : brandproduct_id}
      </pre>
      <br />
    </Fragment>
  );
}
