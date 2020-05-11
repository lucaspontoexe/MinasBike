import React, { useState, useReducer, useEffect } from 'react';
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
  providerproducts: [],
  errors: {},
};

const initialAPIState = {
  brands: [],
  brandproducts: [],
  categories: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'text-change':
      return { ...state, [action.property.name]: action.property.value };
    case 'select-change':
      return { ...state, [action.name]: action.property };
    case 'provider-change':
      return { ...state, providerproducts: action.items };
    case 'post-error':
      break;

    default:
      console.log(state, action);
      return state;
  }
}

export default function EditarProduto(props) {
  const { id } = props.match.params;
  const [state, dispatch] = useReducer(reducer, initialState);
  const [apiData, setApiData] = useState(initialAPIState);
  const [canEdit, setCanEdit] = useState(false);

  async function fetchData() {
    const { data: brandproducts } = await api.get('/brandproducts/1?brand&product&stock');
    const { data: categories } = await api.get('/categories');
    const { data: brands } = await api.get('/brands');
    setApiData({ brandproducts, categories, brands });
  }

  useEffect(() => {
    fetchData();
  }, []);

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
          options={apiData.categories.map(item => formatSelectItem(item.id, item.name))}
          onChange={option =>
            dispatch({ type: 'select-change', name: 'category_id', property: option.value })
          }
        />

        {/* brand */}
        <SelectWithLabel
          required
          isDisabled={!canEdit}
          name="brand_id"
          label="Marca"
          error={state.errors.brand_id}
          options={apiData.brands.map(item => formatSelectItem(item.id, item.name))}
          onChange={option =>
            dispatch({ type: 'select-change', name: 'brand_id', property: option.value })
          }
        />

        {/* brandproduct */}
        <TextBox
          required
          disabled={!canEdit}
          name="code"
          label="Código de Barras"
          error={state.errors.code}
          value={state.code}
          onChange={event => dispatch({ type: 'text-change', property: event.target })}
        />

        <TextBox
          required
          disabled={!canEdit}
          name="cost_price"
          label="Preço de Custo"
          error={state.errors.description}
          value={state.description}
          onChange={event => dispatch({ type: 'text-change', property: event.target })}
        />

        {/* stock */}
        <TextBox
          required
          disabled={!canEdit}
          name="current_qty"
          label="Quantidade atual de estoque"
          error={state.errors.current_qty}
          value={state.current_qty}
          onChange={event => dispatch({ type: 'text-change', property: event.target })}
        />
        {/* provider */}
        <ProviderSelector
          brandproduct_id={1}
          onChange={({ items }) => dispatch({ type: 'provider-change', items })}
        />
      </form>
      canedit: {JSON.stringify(canEdit)}
    </div>
  );
}
