import React, { useState } from 'react';
// import api from 'services/api';
import TextBox from 'components/TextBox';
import Button from 'components/Button';
import Header from 'components/Header';
import SelectWithLabel from 'components/SelectWithLabel';
import { BPSelector } from './BPSelector';

// TODO: import from API
import categories from './categories.json';
import units from './units.json';

const str = item => JSON.stringify(item, null, 2);

export default function CadastroProduto() {
  const [bpData, setBpData] = useState({
    product: { id: -2 },
    brand: { id: -2 },
    brandproduct: { id: -1 },
  });

  const [productForm, setProductForm] = useState({});
  const [brandproductForm, setBrandproductForm] = useState({});
  const [stockForm, setStockForm] = useState({});

  const formatSelectItem = (value, label) => ({ value, label });

  function handleChange(setStateHandler, { name, value }) {
    setStateHandler(old => ({ ...old, [name]: value }));
    console.log(name, value);
    console.log(brandproductForm, productForm, stockForm);
  }

  const isProductFormDisabled = bpData.product.id >= 0;
  const isBPFormDisabled = bpData.brandproduct.id >= 0;

  return (
    <div className="tela">
      <Header>Novo Produto</Header>
      <BPSelector onChange={setBpData} />
      <fieldset>
        PRODUCT STUFF
        <TextBox
          required
          label="Descrição"
          name="description"
          disabled={isProductFormDisabled}
          value={bpData.product.description}
          onChange={e => handleChange(setProductForm, e.target)}
        />
        {!isProductFormDisabled ? (
          <>
            <SelectWithLabel
              required
              label="Unidade de Medida"
              isDisabled={isProductFormDisabled}
              options={units.map(item => formatSelectItem(item.id, item.acronym))}
              onChange={sel => handleChange(setProductForm, { name: 'unity_id', value: sel.value })}
            />
            <SelectWithLabel
              required
              label="Categoria"
              isDisabled={isProductFormDisabled}
              options={categories.map(item => formatSelectItem(item.id, item.name))}
              onChange={sel =>
                handleChange(setProductForm, { name: 'category_id', value: sel.value })
              }
            />
          </>
        ) : (
          <>
            <TextBox
              label="Unidade de Medida"
              required
              disabled
              readOnly
              value={bpData.product.unity.acronym}
            />
            <TextBox
              label="Categoria"
              required
              disabled
              readOnly
              value={bpData.product.category.name}
            />
          </>
        )}
      </fieldset>
      <fieldset onChangeCapture={e => handleChange(setBrandproductForm, e.target)}>
        BP STUFF
        <>
          <TextBox
            required
            disabled={isBPFormDisabled}
            value={bpData.brandproduct.code}
            label="Código de Barras"
          />
          <TextBox
            required
            disabled={isBPFormDisabled}
            value={bpData.brandproduct.price}
            label="Preço"
          />
        </>
      </fieldset>
      <fieldset onChangeCapture={e => handleChange(setStockForm, e.target)}>
        STOCK STUFF <i>(requires brandproduct)</i>
        <TextBox required name="current_qty" label="qtd. atual estoque" />
        <TextBox required name="min_qty" label="qtd. mínima estoque" />
        <TextBox required name="initial_qty" label="qtd. inicial em estoque" />
      </fieldset>
      PROVIDER STUFF <i>(requires brandproduct)</i>
      <input placeholder="json data" />
      <Button>POST</Button>
      <pre>
        POST DATA: <br />
        {'product form:' + str(productForm) + '\n'}
        {'bp form:' + str(brandproductForm) + '\n'}
        {'stock form:' + str(stockForm) + '\n'}
      </pre>
    </div>
  );
}
