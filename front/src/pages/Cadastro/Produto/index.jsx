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

  return (
    <div className="tela">
      <Header>Novo Produto</Header>
      <BPSelector onChange={setBpData} />
      <fieldset>
        PRODUCT STUFF
        {bpData.product.id < 0 ? ( //empty?
          <>
            <TextBox required label="Descrição" />
            <TextBox required label="Unidade de Medida" />
            <TextBox required label="Categoria" />
          </>
        ) : (
          <>
            <TextBox disabled value={bpData.product.description} label="Descrição" />
            <TextBox disabled value={bpData.product.unity_id} label="Unidade de Medida" />
            <TextBox disabled value={bpData.product.category_id} label="Categoria" />
          </>
        )}
      </fieldset>
      <fieldset>
        BP STUFF
        {bpData.brandproduct.id < 0 ? (
          <>
            <TextBox required label="Código de Barras" />
            <TextBox required label="Preço" />
          </>
        ) : (
          <>
            <TextBox disabled value={bpData.brandproduct.code} label="Código de Barras" />
            <TextBox disabled value={bpData.brandproduct.price} label="Preço" />
          </>
        )}
      </fieldset>
      <fieldset>
        STOCK STUFF <i>(requires brandproduct)</i>
        <TextBox required label="qtd. atual estoque" />
        <TextBox required label="qtd. mínima estoque" />
        <TextBox required label="qtd. inicial em estoque" />
      </fieldset>
      PROVIDER STUFF <i>(requires brandproduct)</i>
      <input placeholder="json data" />
      <Button>POST</Button>
    </div>
  );
}
