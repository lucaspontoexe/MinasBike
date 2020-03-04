import React from 'react';
// import api from 'services/api';
import TextBox from 'components/TextBox';
// import Button from 'components/Button';
import Header from 'components/Header';
// import Error from 'components/Error';
// import SelectWithLabel from 'components/SelectWithLabel';
// import Modal from 'components/Modal';

import './styles.css';

export default function CadastroProduto() {
  return (
    <div className="tela">
      <Header>Novo Produto</Header>

      <fieldset>
        PRODUCT STUFF
        {/* BP selector */}
        {/* na real, um select */}
        <TextBox required label="Nome do Produto" placeholder="nome do produto" />
        <TextBox required label="Nome da Marca" placeholder="nome da marca" />
        <pre>current BP: Tal Produto; ID: 1</pre>
        {/* end bp selector */}
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
      STOCK STUFF
      <TextBox required label="qtd. atual estoque" />
      <TextBox required label="qtd. mínima estoque" />
      <TextBox required label="qtd. inicial em estoque" />
      </fieldset>

      PROVIDER STUFF
      <input placeholder="json data"/>
    </div>
  );
}
