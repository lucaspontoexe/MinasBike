import React, { useState, useReducer, useEffect } from 'react';
import api from 'services/api';
import formatSelectItem from 'utils/formatSelectItem';
import formatAPIDateTime from 'utils/formatAPIDateTime';
import { formatErrorsSingleObject } from 'utils/formatFieldErrors';
import { queryObject } from 'utils/getProperty';
import devlog from 'utils/devlog';

import Header from 'components/Header';
import TextBox from 'components/TextBox';
import Button from 'components/Button';
import SelectWithLabel from 'components/SelectWithLabel';
import ProviderSelector from 'pages/Cadastro/Produto/ProviderSelector';

import './styles.scss';

const initialState = {
  name: '',
  category_id: 0,
  brand_id: 0,
  brand_new_name: '',
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
    case 'price-change':
      return { ...state, price: Number(action.value) };
    case 'select-change':
      return { ...state, [action.name]: action.property };
    case 'provider-change':
      return { ...state, providerproducts: action.items };
    case 'brand-change':
      return { ...state, brand_id: action.id, brand_new_name: '' };
    case 'brand-rename':
      return { ...state, brand_new_name: action.name };
    case 'fetch-initial-data':
      return {
        ...state,
        ...action.data,
        name: action.data.product.name,
        category_id: action.data.product.category_id,
        current_qty: action.data.stock.current_qty,
      };
    case 'submit-error':
      return { ...state, errors: formatErrorsSingleObject(action.error.response.data) };

    default:
      devlog(state, action);
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
    // longe do ideal
    const { data: prpr } = await api.get('/providerproducts');
    setApiData({ categories, brands, brandproduct: brandproducts[0], providerproducts: prpr });
    dispatch({ type: 'fetch-initial-data', data: brandproducts[0] });
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    /*
    enviar:
    
    /products/id
    name (diffing aqui)
    category_id
    (tem description, mas não aparece no card)
    
    /brands/id [condicional, caso tenham renomeado a marca]
    name
    
    /brandproducts/id
    agora que eu percebi algo: a lógica do nome do produto 
    vai acabar tendo que ser a mesma da marca. mas por enquanto,
    code
    price
    brand_id [caso a marca não tenha sido renomeada]
    
    acabei de ver:
    current_qty não é editável. depois tem que desfazer isso.
    
    for entry of providerproducts:
    put /providerproducts/entry.id
    cost_price 
    provider_id
    
    */
    const brandproduct_id = apiData.brandproduct.id;
    const productNameChanged = state.name !== apiData.brandproduct?.product.name;

    devlog('bp id: ', brandproduct_id);
    devlog('product name changed: ', productNameChanged);
    devlog('brand new name: ', state.brand_new_name);

    const prprRequests = state.providerproducts.map(item =>
      isNaN(item.id)
        ? api.post(`/providerproducts/`, {
            brandproduct_id: apiData.brandproduct.id,
            cost_price: item.cost_price,
            provider_id: item.provider_id,
          })
        : api.put(`/providerproducts/${item.id}`, {
            provider_id:
              // diff de provider_id
              apiData.providerproducts.filter(
                apiItem => apiItem.provider_id === item.provider_id && apiItem.id === item.id
              ).length > 0
                ? undefined
                : item.provider_id,
            cost_price: item.cost_price,
          })
    );
    const requests = [
      productNameChanged &&
        api.put(`/products/${apiData.brandproduct.product_id}`, { name: state.name }),

      state.brand_new_name &&
        api.put(`/brands/${apiData.brandproduct.brand_id}`, { name: state.brand_new_name }),

      api.put(`/brandproducts/${brandproduct_id}`, {
        code: state.code,
        price: state.price,
      }),
    ];

    Promise.all([...requests, ...prprRequests])
      .then(props.history.push('/produtos'))
      .catch(error => dispatch({ type: 'submit-error', error }));
  }

  return (
    <div className="tela tela-editar">
      <div className="extra-header">
        <Header>Detalhes do Produto {code}</Header>
        {!canEdit && (
          <Button color="#dc2438" onClick={() => setCanEdit(true)}>
            Editar
          </Button>
        )}
      </div>

      <form onSubmit={handleSubmit}>
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
            state.brand_new_name === ''
              ? queryObject(apiData.brands, state.brand_id, 'name')
              : state.brand_new_name
          )}
          options={apiData.brands.map(item => formatSelectItem(item.id, item.name))}
          onChange={option => dispatch({ type: 'brand-change', id: option.value })}
          onCreateOption={name => dispatch({ type: 'brand-rename', name })}
        />

        {state.brand_new_name && (
          <div className="warning">A marca será renomeada para todos os outros produtos</div>
        )}

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
          type="currency"
          label="Preço"
          error={state.errors.description}
          value={state.price}
          onChange={price => dispatch({ type: 'price-change', value: price })}
        />

        {/* stock */}
        <TextBox
          disabled
          readOnly
          name="current_qty"
          label="Quantidade atual de estoque"
          value={state.current_qty}
        />
        {/* provider */}
        {apiData.brandproduct.id && (
          <ProviderSelector
            brandproduct_id={apiData.brandproduct.id}
            onChange={({ items }) => dispatch({ type: 'provider-change', items })}
            useRuleTwo={false}
          />
        )}
        {canEdit && (
          <div className="buttons">
            <Button type="reset" color="#DC2438" onClick={() => props.history.replace('/produtos')}>
              Cancelar
            </Button>
            <Button type="submit" color="#30CC57">
              Salvar
            </Button>
          </div>
        )}
      </form>

      <p>data de cadastro: {formatAPIDateTime(apiData.brandproduct.created_at)}</p>
      <p>última alteração: {formatAPIDateTime(apiData.brandproduct.updated_at)}</p>
      <p>código do usuário que realizou o cadastro/alteração: {state.stock?.modified_by}</p>

      {
        /* where? */
        window.DEV_MODE && (
          <ul>
            descubra:
            <li>quantidade vendida</li>
            <li>custo total do estoque atual</li>
          </ul>
        )
      }
    </div>
  );
}
