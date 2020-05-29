import React, { useState, useEffect } from 'react';
import api from 'services/api';
import formatPrice from 'utils/formatPrice';
import { queryObject } from 'utils/getProperty';
import Header from 'components/Header';
import Button from 'components/Button';
import Table from 'components/Table';

import './styles.css';

export default function ListaProdutos({ history }) {
  const [providerProducts, setProviderProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [brandProducts, setBrandProducts] = useState([]);
  useEffect(() => {
    function fetchData() {
      api
        .get('/providerproducts?brandproduct&provider')
        .then(res => setProviderProducts(res.data));
      api.get('/products?category&brand&unity').then(res => setProducts(res.data));
      api
        .get('/brandproducts?brand&product&stock')
        .then(res => setBrandProducts(res.data));
    }
    fetchData();
  }, []);

  const headers = [
    { Header: 'Código', accessor: 'code' },
    { Header: 'Nome', accessor: 'name' },
    { Header: 'Marca', accessor: 'brand' },
    { Header: 'Preço', accessor: 'price' },
    { Header: 'Categoria', accessor: 'category' },
    { Header: 'Fornecedor', accessor: 'provider' },
    { Header: 'Quantidade', accessor: 'quantity' },
  ];

  const data = providerProducts.map(item => {
    const bp = item.brandproduct;
    return {
      code: bp.code,
      name: queryObject(products, bp.product_id, 'name'), // dá pra puxar do bp também
      brand: queryObject(brandProducts, bp.id, 'brand.name'),
      price: formatPrice(bp.price),
      category: queryObject(products, bp.product_id, 'category.name'),
      provider: item.provider.name,
      quantity: `${queryObject(brandProducts, bp.id, 'stock.current_qty')} ${queryObject(
        products,
        bp.product_id,
        'unity.acronym'
      )}`,
    };
  });

  function TopHeader() {
    return (
      <Button color="#DC2438" onClick={() => {}}>
        Upload de Arquivos
      </Button>
    );
  }

  return (
    <div className="tela tela--lista">
      <Header>Produtos</Header>

      <div className="buttons">
        <Button color="#30CC57" onClick={() => history.push('/produtos/novo')}>
          Cadastrar produto
        </Button>
        <Button color="#DC2438" onClick={() => {}}>
          Gerar Relatório
        </Button>
      </div>
      <div className="table-wrapper">
        {providerProducts.length > 0 && (
          <Table
            columns={headers}
            data={data}
            withFilter
            linkTo="produtos"
            searchText="Buscar produtos..."
            TopHeaderComponent={<TopHeader />}
          />
        )}
      </div>
    </div>
  );
}
