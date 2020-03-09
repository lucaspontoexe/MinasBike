import React, { Fragment, useState, useEffect } from 'react';
import SelectWithLabel from 'components/SelectWithLabel';
import api from 'services/api';
import { EMPTY, TO_BE_CREATED } from './idtypes.json';

export function BPSelector({ onChange }) {
  // single state for each property (2nd attempt)

  const initialItem = { id: EMPTY };

  const [brand, setBrand] = useState(initialItem);
  const [product, setProduct] = useState(initialItem);
  const [brandproduct, setBrandproduct] = useState({ id: TO_BE_CREATED });

  // load all products and brands on init
  // more data will be loaded as the form is filled
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);

  const formatSelectItem = item => ({ value: item, label: item.name });

  // TODO: export whole object, not just its ID.
  // object_id -> currentObject

  // grab from API
  useEffect(() => {
    api.get('/products').then(res => setProducts(res.data.map(formatSelectItem)));
    api.get('/brands').then(res => setBrands(res.data.map(formatSelectItem)));
  }, []);

  // search for a brandproduct
  useEffect(() => {
    if (brand === TO_BE_CREATED || product === TO_BE_CREATED) return;

    function formatBrandproductID(array) {
      // podia usar initialItem, mas vai chover re-renderização e requests
      return array.length === 0 ? { id: EMPTY } : array[0];
    }
    api
      .get('/brandproducts', { params: { brand_id: brand.id, product_id: product.id } })
      .then(res => setBrandproduct(formatBrandproductID(res.data)));
  }, [brand, product]);

  // run onChange
  useEffect(() => {
    onChange({ brand, product, brandproduct });
  }, [brand, product, brandproduct, onChange]);

  function createProduct(name) {
    const newItem = { id: TO_BE_CREATED, name };
    setProducts([...products, formatSelectItem(newItem)]);
    setProduct(newItem);
  }

  function createBrand(name) {
    const newItem = { id: TO_BE_CREATED, name };
    setBrands([...brands, formatSelectItem(newItem)]);
    setBrand(newItem);
  }

  return (
    <Fragment>
      <fieldset>
        BP selector
        <SelectWithLabel
          name="product"
          creatable
          options={products}
          onCreateOption={createProduct}
          value={formatSelectItem(product)}
          onChange={({ value }) => setProduct(value)}
          required
          label="Nome do Produto"
          placeholder="Digite ou escolha um produto"
        />
        <SelectWithLabel
          name="brand"
          creatable
          options={brands}
          onCreateOption={createBrand}
          value={formatSelectItem(brand)}
          onChange={({ value }) => setBrand(value)}
          required
          label="Nome da Marca"
          placeholder="Digite ou escolha uma marca"
        />
      </fieldset>
      <pre>
        current product: {JSON.stringify(product)} <br />
        current brand: {JSON.stringify(brand)} <br />
        current BP:{' '}
        {brandproduct.id === TO_BE_CREATED
          ? '(to be created)'
          : JSON.stringify(brandproduct, null, 4)}
      </pre>
      <br />
    </Fragment>
  );
}
