import React, { useState, useEffect } from 'react';
import api from 'services/api';
import useAuth from 'utils/useAuth';
import formatPrice from 'utils/formatPrice';
import { getProperty, queryObject } from 'utils/getProperty';
import Header from 'components/Header';
import Button from 'components/Button';
import Table from 'components/Table';

import './styles.css';

export default function ListaProdutos({ history }) {
    const [products, setProducts] = useState([]);
    const [productDetails, setProductDetails] = useState([]);
    const [brandDetails, setBrandDetails] = useState([]);
    const [stockDetails, setStockDetails] = useState([]); //🐎🐎🐎🐎🏇🏇🏇🏇

    useEffect(() => {
        function fetchData() {
            api.get('/providerproducts', useAuth).then(res =>
                setProducts(res.data)
            );
            api.get('/products', useAuth).then(res =>
                setProductDetails(res.data)
            );
            api.get('/brands', useAuth).then(res => setBrandDetails(res.data));
            api.get('/stocks', useAuth).then(res => setStockDetails(res.data));
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

    const data = products.map(item => {
        const bp = item.brandproduct;
        return {
            code: bp.code,
            name: queryObject(
                productDetails,
                obj => obj.id === bp.product_id,
                'name'
            ),
            brand: queryObject(
                brandDetails,
                obj => obj.id === bp.product_id,
                'name'
            ),
            price: formatPrice(bp.price),
            category: queryObject(
                productDetails,
                obj => obj.id === bp.product_id,
                'category.name'
            ),
            provider: item.provider.name,
            quantity: `${getProperty(
                stockDetails,
                bp.id,
                'current_qty'
            )} ${queryObject(
                productDetails,
                obj => obj.id === bp.product_id,
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
                <Button
                    color="#30CC57"
                    onClick={() => history.push('/produtos/novo')}
                >
                    Cadastrar produto
                </Button>
                <Button color="#DC2438" onClick={() => {}}>
                    Gerar Relatório
                </Button>
            </div>
            <div className="table-wrapper">
                {productDetails.length > 0 && (
                    <Table
                        columns={headers}
                        data={data}
                        linkTo="produtos"
                        searchText="Buscar produtos..."
                        TopHeaderComponent={<TopHeader />}
                    />
                )}
            </div>
        </div>
    );
}
