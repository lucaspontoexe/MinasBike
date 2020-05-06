import React, { useState, useMemo, useEffect } from 'react';
import Header from 'components/Header';
import Table from 'components/Table';
import TextBox from 'components/TextBox';
import Button from 'components/Button';
import SelectWithLabel from 'components/SelectWithLabel';
import EditableCell from 'components/Table/EditableCell';
import PriceCell from 'components/Table/PriceCell';

import formatSelectItem from 'utils/formatSelectItem';
import formatPrice from 'utils/formatPrice';
import { formatErrorsSingleObject } from 'utils/formatFieldErrors';
import api from 'services/api';

export default function Recebimentos(props) {
  const updateData = (rowIndex, columnId, value) => {
    setTableData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          console.log(old, rowIndex, columnId, value);
          let temp = {
            ...old[rowIndex],
            [columnId]: value,
          };

          return { ...temp, total: Number(temp.quantity) * Number(temp.price) };
        }
        return row;
      })
    );
  };

  function addProduct({ value: prpr }) {
    setTableData(old => [
      ...old,
      {
        ...prpr,
        // name: `${product.product.name} ${product.brand.name}`,
        name: prpr.id,
        price: prpr.cost_price,
        total: prpr.cost_price,
        quantity: 1,
      },
    ]);
  }

  function ProductSearch() {
    return (
      <SelectWithLabel
        placeholder="Adicionar Produtos"
        options={products.map(item => ({
          value: item,
          // label: `${item.product.name} ${item.brand.name}`,
          label: item.brandproduct_id
        }))}
        onChange={addProduct}
      />
    );
  }

  const [products, setProducts] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [clients, setClients] = useState([]);
  const [providers, setProviders] = useState([]);

  const sumReducer = (accumulator, currentValue) => accumulator + currentValue;
  const total = tableData.map(item => item.total).reduce(sumReducer, 0);

  const [formData, setFormData] = useState({
    description: '',
    delivery_time: '',
    total_value: 0,
    client_id: 0,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { data: products } = await api.get('/brandproducts?brand&product');
      const { data: providers } = await api.get('/providers?providerproducts');
      const { data: clients } = await api.get('/clients');
      setClients(clients);
      setProducts(products);
      setProviders(providers);
    };
    fetchData();
  }, []);

  const TableColumns = useMemo(
    () => [
      { Header: 'Código', accessor: 'id' },
      { Header: 'Produto', accessor: 'name' },
      { Header: 'Quantidade', accessor: 'quantity', Cell: EditableCell },
      { Header: 'Preço', accessor: 'price', Cell: EditableCell },
      { Header: 'Total', accessor: 'total', Cell: PriceCell },
    ],
    []
  );

  function handleChange(newData) {
    setFormData(old => ({ ...old, ...newData }));
  }

  const handleInputChange = e => handleChange({ [e.target.name]: e.target.value });

  function handleSubmit(e) {
    e.preventDefault();

    const products = tableData.map(item => ({
      brandproduct_qty: item.quantity,
      brandproduct_id: item.id,
    }));

    const obj = { ...formData, total_value: total, receivedproviderproducts: products };
    api
      .post('/receivements', obj)
      .then(response => {
        console.log('deu bom', response);
        props.history.push('/produtos');
      })
      .catch(err => setErrors(formatErrorsSingleObject(err.response.data)));
  }

  return (
    <div className="tela tela-vendas">
      <Header>Recebimentos</Header>

      <SelectWithLabel
        placeholder="Buscar Fornecedor"
        options={providers.map(item => ({
          value: item,
          label: item.name,
        }))}
        onChange={({value: provider}) => setProducts(provider.providerproducts)}
      />

      <Table
        data={tableData}
        columns={TableColumns}
        updateData={updateData}
        TopHeaderComponent={<ProductSearch />}
      />

      {errors.receivedproviderproducts && (
        <div class="error">{errors.receivedproviderproducts}</div>
      )}

      <div>total: {formatPrice(total)}</div>
      <div>data da compra: {`${new Date().toLocaleDateString()}`}</div>
      <div>vendedor: provavelmente não tem, vai o fornecedor</div>

      <form onSubmit={handleSubmit}>
        <SelectWithLabel
          required
          label="Cliente"
          error={errors.client_id}
          options={clients.map(item => formatSelectItem(item.id, item.name))}
          onChange={data => handleChange({ client_id: data.value })}
        />
        <TextBox
          name="delivery_time"
          required
          type="date"
          label="Prazo de entrega"
          error={errors.delivery_time}
          onChange={handleInputChange}
        />
        <TextBox
          name="description"
          label="Alguma observação?"
          onChange={handleInputChange}
          error={errors.description}
        />

        <div className="buttons">
          <Button type="reset" color="#DC2438" onClick={() => props.history.replace('/produtos')}>
            Voltar
          </Button>
          <Button type="submit" color="#30CC57">
            Cadastrar
          </Button>
        </div>
      </form>
    </div>
  );
}
