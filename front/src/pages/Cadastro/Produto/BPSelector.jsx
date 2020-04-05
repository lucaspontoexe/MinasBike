import React, { Fragment, useState, useEffect } from 'react';
import SelectWithLabel from 'components/SelectWithLabel';
import api from 'services/api';

const EMPTY = -2;
const TO_BE_CREATED = -1;
const initialItem = { id: EMPTY };

export function BPSelector({ onChange, shouldReset }) {
  // single state for each property (2nd attempt)

  const [brand, setBrand] = useState(initialItem);
  const [product, setProduct] = useState(initialItem);
  const [brandproduct, setBrandproduct] = useState({ id: TO_BE_CREATED });

  // load all products and brands on init
  // more data will be loaded as the form is filled
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);

  const formatSelectItem = item => ({ value: item, label: item.name });

  // grab from API
  useEffect(() => {
    api.get('/products?unity&category').then(res => setProducts(res.data.map(formatSelectItem)));
    api.get('/brands').then(res => setBrands(res.data.map(formatSelectItem)));
  }, []);

  // search for a brandproduct
  useEffect(() => {
    if (brand === TO_BE_CREATED || product === TO_BE_CREATED) return;
    const formatBrandproductID = array => (array.length === 0 ? initialItem : array[0]);

    api
      .get('/brandproducts', { params: { brand_id: brand.id, product_id: product.id } })
      .then(res => setBrandproduct(formatBrandproductID(res.data)));
  }, [brand, product]);

  // run onChange
  useEffect(() => {
    onChange({ brand, product, brandproduct });
  }, [brand, product, brandproduct, onChange]);

  useEffect(() => {
    if (shouldReset) {
      api.get(`/products?unity&category&name=${product.name}`).then(res => setProduct(res.data[0]));
      api.get(`/brands?name=${brand.name}`).then(res => setBrand(res.data[0]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldReset]);

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
      <div>
        {window.DEV_MODE && 'BP selector'}
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
      </div>
      {window.DEV_MODE && (
        <pre>
          current product: {JSON.stringify(product)} <br />
          current brand: {JSON.stringify(brand)} <br />
          current BP:{' '}
          {brandproduct.id === TO_BE_CREATED
            ? '(to be created)'
            : JSON.stringify(brandproduct, null, 4)}
        </pre>
      )}
      <br />
    </Fragment>
  );
}
