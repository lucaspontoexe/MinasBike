import React, { useState, useMemo } from 'react';
import Header from 'components/Header';
import Table from 'components/Table';
import SelectWithLabel from 'components/SelectWithLabel';
import formatSelectItem from 'utils/formatSelectItem';
import TextBox from 'components/TextBox';

export default function Vendas(props) {
  const updateData = (rowIndex, columnId, value) => {
    setProducts(old =>
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

  // mock data

  const initialProducts = [
    { id: 1212, name: 'eh mole', quantity: 1, price: 2600, total: 2600 },
    { id: 3434, name: 'acontece', quantity: 2, price: 2997, total: 2600 },
  ];

  const TableColumns = useMemo(
    () => [
      { Header: 'Código', accessor: 'id' },
      { Header: 'Produto', accessor: 'name' },
      { Header: 'Quantidade', accessor: 'quantity', Cell: EditableCell },
      { Header: 'Preço', accessor: 'price' },
      { Header: 'Total', accessor: 'total' },
    ],
    []
  );

  const initialClients = [
    {
      id: 2,
      name: 'só pra garantir que foi',
      address: '12121',
      phone: '40028922',
      email: 'tiolee@som.com',
      birthday: '2020-04-05T00:00:00.000Z',
      created_at: '2020-04-05 21:36:02',
      updated_at: '2020-04-05 21:36:02',
    },
    {
      id: 1,
      name: 'AGORA NÃO TEM COMO NÃO IR',
      address: 'Casa do Caramba, Algum Lugar, SP',
      phone: '08007778000',
      email: 'caramba@a.b',
      birthday: '1998-10-16T00:00:00.000Z',
      created_at: '2020-04-05 21:10:24',
      updated_at: '2020-04-16 01:11:18',
    },
  ];

  // fim do mock

  function addProduct({ value }) {
    console.log(value);
    setProducts(old => [...old, value]);
  }

  function ProductSearch(props) {
    return (
      <SelectWithLabel
        placeholder="Buscar Produtos"
        options={products.map(item => ({ value: item, label: item.name }))}
        onChange={addProduct}
      />
    );  
  }

  const [products, setProducts] = useState(initialProducts);
  const [clients, setClients] = useState(initialClients);

  const sumReducer = (accumulator, currentValue) => accumulator + currentValue;
  const total = products.map(item => item.total).reduce(sumReducer, 0);

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
        data={products}
        columns={TableColumns}
        updateData={updateData}
        TopHeaderComponent={<ProductSearch />}
      />
      <div>total: {total}</div>
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
