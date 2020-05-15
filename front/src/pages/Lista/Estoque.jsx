import React, { useState, useEffect } from 'react';
import api from 'services/api';

import formatPrice from 'utils/formatPrice';
import { queryObject } from 'utils/getProperty';
import Header from 'components/Header';
import Button from 'components/Button';
import Table from 'components/Table';
import './styles.css';

export default function ListaProdutos({ history }) {
  const [products, setProducts] = useState([]);
  const [stocks, setStocks] = useState([]);
  // const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    await api.get('/brandproducts?product&brand').then(response => setProducts(response.data));
    await api.get('/stocks?brandproduct').then(response => setStocks(response.data));
    // setIsLoaded(true);
  }

  const headers = [
    { Header: 'Código', accessor: 'code' },
    { Header: 'Produto', accessor: 'product' },
    { Header: 'Marca', accessor: 'brand' },
    { Header: 'Qtd. Atual', accessor: 'current_qty' },
    { Header: 'Qtd. Inicial', accessor: 'initial_qty' },
    { Header: 'Preço', accessor: 'price' },
  ];

  const data = stocks.map(item => {
    const bp = item.brandproduct;
    const { current_qty, initial_qty } = item;
    return {
      code: bp.code,
      product: queryObject(products, bp.id, 'product.name'),
      brand: queryObject(products, bp.id, 'brand.name'),
      current_qty,
      initial_qty,
      price: formatPrice(bp.price),
    };
  });

  return (
    <div className="tela tela--lista">
      <Header>Estoque</Header>
      <div className="table-wrapper">
        <div className="buttons">
          <Button color="#DC2438" onClick={() => {}}>
            Gerar Relatório
          </Button>
        </div>

        <Table columns={headers} data={data} withFilter linkTo="produtos" />
      </div>
    </div>
  );
}
