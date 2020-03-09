import React, { useState } from 'react';
// import api from 'services/api';
import TextBox from 'components/TextBox';
import Button from 'components/Button';
import Header from 'components/Header';
import { BPSelector } from './BPSelector';

export default function CadastroProduto() {
  const [bpData, setBpData] = useState({
    product: { id: -2 },
    brand: { id: -2 },
    brandproduct: { id: -1 },
  });

  const [productForm, setProductForm] = useState({});
  const [stockForm, setStockForm] = useState({});
  const [brandproductForm, setBrandproductForm] = useState({});

  function handleChange(setStateHandler, { name, value }) {
    // esse vai servir mais pro BP, já que o form de produto usa os selects
    // ou adaptar os parâmetros: também serve
    // name = param, value = autoexplicativo
    setStateHandler(old => ({ ...old, [name]: value }));
    console.log(name, value);
    console.log(brandproductForm, productForm, stockForm);
  }

  return (
    <div className="tela">
      <Header>Novo Produto</Header>
      <BPSelector onChange={setBpData} />
      <fieldset onChangeCapture={e => handleChange(setProductForm, e.target)}>
        PRODUCT STUFF
        {bpData.product.id < 0 ? ( //empty?
          <>
            <TextBox required name="description" label="Descrição" />
            <TextBox required name="unity" label="Unidade de Medida" />
            <TextBox required name="category" label="Categoria" />
          </>
        ) : (
          <>
            <TextBox disabled value={bpData.product.description} label="Descrição" />
            <TextBox disabled value={bpData.product.unity_id} label="Unidade de Medida" />
            <TextBox disabled value={bpData.product.category_id} label="Categoria" />
          </>
        )}
      </fieldset>
      <fieldset onChangeCapture={e => handleChange(setBrandproductForm, e.target)}>
        BP STUFF
        {bpData.brandproduct.id < 0 ? (
          <>
            <TextBox required name="code" label="Código de Barras" />
            <TextBox required name="price" label="Preço" />
          </>
        ) : (
          <>
            <TextBox disabled value={bpData.brandproduct.code} label="Código de Barras" />
            <TextBox disabled value={bpData.brandproduct.price} label="Preço" />
          </>
        )}
      </fieldset>
      <fieldset onChangeCapture={e => handleChange(setStockForm, e.target)}>
        STOCK STUFF <i>(requires brandproduct)</i>
        <TextBox required name="current_qty" label="qtd. atual estoque" />
        <TextBox required name="min_qty" label="qtd. mínima estoque" />
        <TextBox required name="max_qty_remember_change" label="qtd. inicial em estoque" />
      </fieldset>
      PROVIDER STUFF <i>(requires brandproduct)</i>
      <input placeholder="json data" />
      <Button>POST</Button>
    </div>
  );
}
