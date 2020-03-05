import React from 'react';
// import api from 'services/api';
import TextBox from 'components/TextBox';
import Button from 'components/Button';
import Header from 'components/Header';
import { BPSelector } from './BPSelector';

export default function CadastroProduto() {
  return (
    <div className="tela">
      <Header>Novo Produto</Header>
      <BPSelector onChange={console.log}/>
      <fieldset>
        PRODUCT STUFF
        <TextBox required label="Descrição" />
        <TextBox required label="Unidade de Medida" />
        <TextBox required label="Categoria" />
      </fieldset>
      <fieldset>
        BP STUFF
        <TextBox required label="Código de Barras" />
        <TextBox required label="Preço" />
      </fieldset>
      <fieldset>
        STOCK STUFF <i>(requires brandproduct)</i>
        <TextBox required label="qtd. atual estoque" />
        <TextBox required label="qtd. mínima estoque" />
        <TextBox required label="qtd. inicial em estoque" />
      </fieldset>
      PROVIDER STUFF
      <input placeholder="json data" />

      <Button>POST</Button>
    </div>
  );
}
