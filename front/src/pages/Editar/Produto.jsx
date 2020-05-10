import React, { useState } from 'react';
import api from 'services/api';
import { formatErrorsSingleObject } from 'utils/formatFieldErrors';

import Header from 'components/Header';
import TextBox from 'components/TextBox';
import Button from 'components/Button';
import SelectWithLabel from 'components/SelectWithLabel';
import ProviderSelector from 'pages/Cadastro/Produto/ProviderSelector';

export default function EditarProduto(props) {
  const { id } = props.match.params;
  const [canEdit, setCanEdit] = useState(false);

  return (
    <div className="tela tela-cadastro">
      <Header>Editar Produto {id}</Header>
      <Button color="#dc2438" onClick={() => setCanEdit(true)}>
        Editar
      </Button>
      <form action="#">
        {/* product stuff */}
        <TextBox
          required
          disabled={!canEdit}
          name="name"
          label="Nome do Produto"
          // onChange={handleInputChange}
          // error={errors.description}
        />
        <SelectWithLabel
          required
          isDisabled={!canEdit}
          name="category"
          label="Categoria"
          // error={errors.category_id}
          // options={categories.map(item => formatSelectItem(item.id, item.name))}
          // onChange={sel => handleChange(setProductForm, { name: 'category_id', value: sel.value })}
        />

        {/* brand */}
        <SelectWithLabel
          required
          isDisabled={!canEdit}
          name="brand"
          label="Marca"
          // error={errors.category_id}
          // options={categories.map(item => formatSelectItem(item.id, item.name))}
          // onChange={sel => handleChange(setProductForm, { name: 'category_id', value: sel.value })}
        />

        {/* brandproduct */}
        <TextBox
          required
          disabled={!canEdit}
          name="code"
          label="Código de Barras"
          // onChange={handleInputChange}
          // error={errors.description}
        />

        <TextBox
          required
          disabled={!canEdit}
          name="cost_price"
          label="Preço de Custo"
          // onChange={handleInputChange}
          // error={errors.description}
        />

        {/* stock */}
        <TextBox
          required
          disabled={!canEdit}
          name="current_qty"
          label="Quantidade atual de estoque"
          // onChange={handleInputChange}
          // error={errors.description}
        />
        {/* provider */}
        <ProviderSelector brandproduct_id={1} onChange={console.log} />
      </form>
      canedit: {JSON.stringify(canEdit)}
    </div>
  );
}
