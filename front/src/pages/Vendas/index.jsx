import React, { useState, useMemo } from 'react';
import Header from 'components/Header';
import Table from 'components/Table';
import SelectWithLabel from 'components/SelectWithLabel';

export default function Vendas(props) {
  const updateData = (rowIndex, columnId, value) => {
    setData(old =>
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

  const algoData = [
    { code: 1212, name: 'eh mole', quantity: 1, price: 2600, total: 2600 },
    { code: 3434, name: 'acontece', quantity: 2, price: 2997, total: 2600 },
  ];

  const algoColumns = useMemo(
    () => [
      { Header: 'Código', accessor: 'code' },
      { Header: 'Produto', accessor: 'name' },
      { Header: 'Quantidade', accessor: 'quantity', Cell: EditableCell },
      { Header: 'Preço', accessor: 'price' },
      { Header: 'Total', accessor: 'total' },
    ],
    []
  );

  function handleChange({value}) {
    console.log(value)
    setData(old => ([ ...old, value ]))
  }

  function ProductSearch(props) {
    return (
      <SelectWithLabel
        placeholder="Buscar Produtos"
        options={data.map(item => ({ value: item, label: item.name }))}
        onChange={handleChange}
      />
    );
  }

  const [data, setData] = useState(algoData);

  const sumReducer = (accumulator, currentValue) => accumulator + currentValue;
  const total = data.map(item => item.total).reduce(sumReducer, 0);

  return (
    <div className="tela tela-vendas">
      <Header>Vendas</Header>
      BORA VENDER??? ENTÃO INVENTA!!!11
      <Table
        data={data}
        columns={algoColumns}
        updateData={updateData}
        TopHeaderComponent={<ProductSearch />}
      />
      <div>total: {total}</div>
      <div>data da venda: {`${new Date().toLocaleDateString()}`}</div>
      <div>vendedor: [Código]</div>

      <input type="text" placeholder="cliente" />
      <input type="text" placeholder="prazo" />
      <input type="text" placeholder="Alguma observação?"/>
      {/* <textarea name="test" id="ohman" cols="30" rows="10" defaultValue="habemus observação?" /> */}
    </div>
  );
}
