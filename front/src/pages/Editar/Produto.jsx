import React, { useState, useReducer } from 'react';
import api from 'services/api';
import formatSelectItem from 'utils/formatSelectItem';
import { formatErrorsSingleObject } from 'utils/formatFieldErrors';

import Header from 'components/Header';
import TextBox from 'components/TextBox';
import Button from 'components/Button';
import SelectWithLabel from 'components/SelectWithLabel';
import ProviderSelector from 'pages/Cadastro/Produto/ProviderSelector';

const initialState = {
  name: '',
  category_id: '',
  brand_id: '',
  code: '',
  cost_price: 0,
  current_qty: 0,
  errors: {},
  brandproducts: [],
  categories: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'text-change':
      return { ...state, [action.property.name]: action.property.value };
    case 'select-change':
      return { ...state, [action.property]: action.value };
    case 'api-fetch':
      return { ...state, [action.property]: action.value };
    default:
      console.log(state, action);
      break;
  }
}

export default function EditarProduto(props) {
  const { id } = props.match.params;
  const [canEdit, setCanEdit] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  async function fetchFromAPI() {
    try {
      const { data: brandproducts } = api.get('/brandproducts/1?brand&product&stock');
      const { data: categories } = api.get('/categories');
      dispatch({ type: 'api-fetch', property: 'brandproducts', value: brandproducts });
      dispatch({ type: 'api-fetch', property: 'categories', value: categories });
    } catch (error) {
      console.log(error);
    }
  }

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
          error={state.errors.description}
          value={state.name}
          onChange={event => dispatch({ type: 'text-change', property: event.target })}
        />
        <SelectWithLabel
          required
          isDisabled={!canEdit}
          name="category_id"
          label="Categoria"
          error={state.errors.category_id}
          options={state.categories.map(item => formatSelectItem(item.id, item.name))}
          // onChange={sel => handleChange(setProductForm, { name: 'category_id', value: sel.value })}
        />

        {/* brand */}
        <SelectWithLabel
          required
          isDisabled={!canEdit}
          name="brand_id"
          label="Marca"
          error={state.errors.brand_id}
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
