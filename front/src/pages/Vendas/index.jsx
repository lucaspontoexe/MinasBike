import React, { useState, useMemo, useEffect } from 'react';
import Header from 'components/Header';
import Table from 'components/Table';
import SelectWithLabel from 'components/SelectWithLabel';
import formatSelectItem from 'utils/formatSelectItem';
import TextBox from 'components/TextBox';
import formatPrice from 'utils/formatPrice';
import api from 'services/api';

export default function Vendas(props) {
  const updateData = (rowIndex, columnId, value) => {
    setTableData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          console.log(old, rowIndex, columnId, value);
          return {
            ...old[rowIndex],
            [columnId]: value,
            // if columnid == quantity
            total: Number(old[rowIndex].price) * Number(value),
          };
        }
        return row;
      })
    );
  };

  function addProductToTable({ value: product }) {
    setTableData(old => [
      ...old,
      {
        ...product,
        name: `${product.product.name} ${product.brand.name}`,
        total: product.price,
        quantity: 1,
      },
    ]);
    setProducts(old => old.filter(item => item.id !== product.id));
  }

  function removeProductFromTable(product) {
    setProducts(old => [...old, product]);
    setTableData(old => old.filter(item => item.id !== product.id));
  }

  function ProductSearch() {
    return (
      <SelectWithLabel
        placeholder="Buscar Produtos"
        options={products.map(item => ({
          value: item,
          label: `${item.product.name} ${item.brand.name}`,
        }))}
        onChange={addProductToTable}
      />
    );
  }

  // Quantidade tá editável, mas ainda tem coisa hardcoded
  const EditableCell = ({
    cell: { value: initialValue },
    row: { index },
    column: { id },
    updateData, // This is a custom function that we supplied to our table instance
  }) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue);

    const onChange = e => {
      setValue(e.target.value);
    };

    // We'll only update the external data when the input is blurred
    const onBlur = () => {
      updateData(index, id, value);
    };

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return <input value={value} onChange={onChange} onBlur={onBlur} />;
  };

  const [products, setProducts] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [clients, setClients] = useState([]);

  const sumReducer = (accumulator, currentValue) => accumulator + currentValue;
  const total = tableData.map(item => item.total).reduce(sumReducer, 0);

  useEffect(() => {
    const fetchData = async () => {
      const { data: products } = await api.get('/brandproducts?brand&product');
      const { data: clients } = await api.get('/clients');
      setClients(clients);
      setProducts(products);
    };
    fetchData();
  }, []);

  const TableColumns = useMemo(
    () => [
      { Header: 'Código', accessor: 'id' },
      { Header: 'Produto', accessor: 'name' },
      { Header: 'Quantidade', accessor: 'quantity', Cell: EditableCell },
      { Header: 'Preço', accessor: 'price', Cell: ({ cell }) => formatPrice(cell.value) },
      { Header: 'Total', accessor: 'total', Cell: ({ cell }) => formatPrice(cell.value) },
    ],
    []
  );
  // SERVICEORDER POST SCHEMA

  // POST '/serviceorder'
  // description, delivery_time, total_value, client_id

  // array of serviceorderproducts

  // brandproduct_qty: integer
  // serviceorder_id: integer
  // brandproduct_id: integer

  return (
    <div className="tela tela-vendas">
      <Header>Vendas</Header>
      <Table
        data={tableData}
        columns={TableColumns}
        updateData={updateData}
        TopHeaderComponent={<ProductSearch />}
      />
      <div>total: {formatPrice(total)}</div>
      <div>data da venda: {`${new Date().toLocaleDateString()}`}</div>
      <div>vendedor: [Código]</div>
      <SelectWithLabel
        required
        label="Cliente"
        // error={errors.client_id}
        options={clients.map(item => formatSelectItem(item.id, item.name))}
      />
      <TextBox name="delivery_time" required type="date" label="Prazo de entrega" />
      <TextBox name="description" label="Alguma observação?" />
      {/* <textarea name="test" id="ohman" cols="30" rows="10" defaultValue="habemus observação?" /> */}
    </div>
  );
}
