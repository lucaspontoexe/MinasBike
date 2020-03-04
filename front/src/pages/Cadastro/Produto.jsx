import React, { Fragment } from 'react';
// import api from 'services/api';
import TextBox from 'components/TextBox';
// import Button from 'components/Button';
import Header from 'components/Header';
// import Error from 'components/Error';
import SelectWithLabel from 'components/SelectWithLabel';
// import Modal from 'components/Modal';

import './styles.css';

function BPSelector({ onProductChange, onBrandChange, onBPChange }) {
  // load all products and brands on init
  // more data will be loaded as the form is filled

  const someOptions = [
    {value: 1, label: "one"},
    {value: 2, label: "two"},
    {value: 3, label: "three"},
    {value: 4, label: "four"}
  ];

  return (
    <Fragment>
      <fieldset>
        BP selector
        <SelectWithLabel
          name="product"
          creatable
          options={someOptions}
          onCreateOption={console.log}
          onChange={console.log}
          required
          label="Nome do Produto"
          placeholder="nome do produto"
        />
        <SelectWithLabel
          name="brand"
          creatable
          options={someOptions}
          onCreateOption={console.log}
          onChange={console.log}
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

export default function CadastroProduto() {
  return (
    <div className="tela">
      <Header>Novo Produto</Header>
      <BPSelector />
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
    </div>
  );
}
