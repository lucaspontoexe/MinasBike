import React, { Fragment, useState, useEffect } from 'react';
import SelectWithLabel from 'components/SelectWithLabel';
import api from 'services/api';

export function BPSelector({ onChange }) {
  // single state for each property (2nd attempt)

  const initialItem = { id: -2 };

  const [brand, setBrand] = useState(initialItem);
  const [product, setProduct] = useState(initialItem);
  const [brandproduct, setBrandproduct] = useState(initialItem);

  // load all products and brands on init
  // more data will be loaded as the form is filled
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);

  // TODO: export whole object, not just its ID.
  // object_id -> currentObject

  // grab from API
  useEffect(() => {
    const formatSelectItem = item => ({ value: item, label: item.name });
    api.get('/products').then(res => setProducts(res.data.map(formatSelectItem)));
    api.get('/brands').then(res => setBrands(res.data.map(formatSelectItem)));
  }, []);

  // search for a brandproduct
  useEffect(() => {
    if (brand === -1 || product === -1) return;

    function formatBrandproductID(array) {
      return array.length === 0 ? initialItem : array[0];
    }
    api
      .get('/brandproducts', { params: { brand_id: brand.id, product_id: product.id } })
      .then(res => setBrandproduct(formatBrandproductID(res.data)));
  }, [brand, product, initialItem]);

  // run onChange
  useEffect(() => {
    onChange({ brand, product, brandproduct });
  }, [brand, product, brandproduct, onChange]);

  return (
    <Fragment>
      <fieldset>
        BP selector
        <SelectWithLabel
          name="product"
          creatable
          options={products}
          onCreateOption={console.log}
          onChange={({ value }) => setProduct(value)}
          required
          label="Nome do Produto"
          placeholder="nome do produto"
        />
        <SelectWithLabel
          name="brand"
          creatable
          options={brands}
          onCreateOption={console.log}
          onChange={({ value }) => setBrand(value)}
          required
          label="Nome da Marca"
          placeholder="nome da marca"
        />
      </fieldset>
      <pre>
        current product: {JSON.stringify(product)} <br />
        current brand: {JSON.stringify(brand)} <br />
        current BP:{' '}
        {brandproduct.id === -1 ? '(to be created)' : JSON.stringify(brandproduct, null, 4)}
      </pre>
      <br />
    </Fragment>
  );
}
