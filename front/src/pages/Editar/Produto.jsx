import React, { useState, useReducer, useEffect } from 'react';
import api from 'services/api';
import formatSelectItem from 'utils/formatSelectItem';
import formatAPIDateTime from 'utils/formatAPIDateTime';
// import { formatErrorsSingleObject } from 'utils/formatFieldErrors';
import { queryObject } from 'utils/getProperty';

import Header from 'components/Header';
import TextBox from 'components/TextBox';
import Button from 'components/Button';
import SelectWithLabel from 'components/SelectWithLabel';
import ProviderSelector from 'pages/Cadastro/Produto/ProviderSelector';

const initialState = {
  name: '',
  category_id: 0,
  brand_id: 0,
  code: '',
  price: 0,
  current_qty: 0,
  providerproducts: [],
  errors: {},
};

const initialAPIState = {
  brands: [],
  brandproduct: {},
  categories: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'text-change':
      return { ...state, [action.property.name]: action.property.value };
    case 'number-change':
      return { ...state, [action.property.name]: Number(action.property.value) };
    case 'select-change':
      return { ...state, [action.name]: action.property };
    case 'provider-change':
      return { ...state, providerproducts: action.items };
    case 'fetch-initial-data':
      return {
        ...state,
        ...action.data,
        name: action.data.product.name,
        category_id: action.data.product.category_id,
        current_qty: action.data.stock.current_qty,
      };
    case 'post-error':
      break;

    default:
      console.log(state, action);
      return state;
  }
}

export default function EditarProduto(props) {
  const { code } = props.match.params;
  const [state, dispatch] = useReducer(reducer, initialState);
  const [apiData, setApiData] = useState(initialAPIState);
  const [canEdit, setCanEdit] = useState(false);

  async function fetchData() {
    const { data: brandproducts } = await api.get(
      `/brandproducts/?code=${code}&brand&product&stock`
    );
    const { data: categories } = await api.get('/categories');
    const { data: brands } = await api.get('/brands');
    setApiData({ categories, brands, brandproduct: brandproducts[0] });
    dispatch({ type: 'fetch-initial-data', data: brandproducts[0] });
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="tela tela-cadastro">
      <Header>Detalhes do Produto {code}</Header>
      {!canEdit && (
        <Button color="#dc2438" onClick={() => setCanEdit(true)}>
          Editar
        </Button>
      )}
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
          value={formatSelectItem(
            state.category_id,
            queryObject(apiData.categories, state.category_id, 'name')
          )}
          options={apiData.categories.map(item => formatSelectItem(item.id, item.name))}
          onChange={option =>
            dispatch({ type: 'select-change', name: 'category_id', property: option.value })
          }
        />

        {/* brand */}
        <SelectWithLabel
          required
          creatable
          formatCreateLabel={() => 'Clique ou pressione ENTER para renomear esta marca'}
          isDisabled={!canEdit}
          name="brand_id"
          label="Marca"
          error={state.errors.brand_id}
          value={formatSelectItem(
            state.brand_id,
            queryObject(apiData.brands, state.brand_id, 'name')
          )}
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
          name="price"
          label="Preço"
          error={state.errors.description}
          value={state.price}
          onChange={event => dispatch({ type: 'number-change', property: event.target })}
        />

        {/* stock */}
        <TextBox
          required
          disabled={!canEdit}
          name="current_qty"
          label="Quantidade atual de estoque"
          error={state.errors.current_qty}
          value={state.current_qty}
          onChange={event => dispatch({ type: 'number-change', property: event.target })}
        />
        {/* provider */}
        <div className="pseudo-label">Fornecedores</div>
        {apiData.brandproduct.id && (
          <ProviderSelector
            brandproduct_id={apiData.brandproduct.id}
            onChange={({ items }) => dispatch({ type: 'provider-change', items })}
            useRuleTwo={false}
          />
        )}
      </form>

      <p>data de cadastro: {formatAPIDateTime(apiData.brandproduct.created_at)}</p>
      <p>última alteração: {formatAPIDateTime(apiData.brandproduct.updated_at)}</p>
      <p>código do usuário que realizou o cadastro/alteração: {state.stock?.modified_by}</p>
      
      {/* where? */}
      <ul>
        descubra:
        <li>quantidade vendida</li>
        <li>custo total do estoque atual</li>
      </ul>
    </div>
  );
}
