import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from 'services/api';
import useAuth from 'utils/useAuth';
import formatPrice from 'utils/formatPrice';
import getProperty from 'utils/getProperty';
import Header from 'components/Header';
import Button from 'components/Button';
import Table from 'components/Table';

import './styles.css';

export default function ListaProdutos({ history }) {
    const [products, setProducts] = useState([]);
    const [productDetails, setProductDetails] = useState([]);

    useEffect(() => {
        function fetchData() {
            api.get('/providerproducts', useAuth).then(res =>
                setProducts(res.data)
            );
            api.get('/products', useAuth).then(res =>
                setProductDetails(res.data)
            );
        }
        fetchData();
    }, []);

    const headers = [
        { Header: 'Código', accessor: 'code' },
        { Header: 'Nome', accessor: 'name' },
        { Header: 'Preço', accessor: 'price' },
        { Header: 'Quantidade', accessor: 'quantity' },
        { Header: 'Fornecedor', accessor: 'provider' },
        { Header: 'Categoria', accessor: 'category' },
    ];

    const data = products.map(item => {
        const bp = item.brandproduct;
        return {
            code: bp.code,
            name: getProperty(productDetails, bp.product_id, 'name'),
            price: formatPrice(bp.price),
            quantity: 0,
            provider: item.provider.name,
            category: getCategory(productDetails, bp.product_id) || 'wip',
        };
    });

    function getCategory(objects, id) {
        const matches = objects.filter(obj => obj.id === id);
        if (matches.length === 0) return undefined;
        return matches[0].category.name;
    }

    return (
        <div className="tela lista-produtos">
            <Header>Produtos</Header>{' '}
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
                <span>tabela antiga:</span>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nome</th>
                            <th>Preço</th>
                            <th>Quantidade</th>
                            <th>Fornecedor</th>
                            <th>Categoria</th>
                        </tr>
                    </thead>

                    {productDetails.length > 0 && (
                        <tbody>
                            {products.map((row, index) => (
                                <tr key={index}>
                                    <td>
                                        <Link
                                            to={`/produtos/${row.brandproduct.code}`}
                                        >
                                            {row.brandproduct.code}
                                        </Link>
                                    </td>
                                    <td>
                                        {getProperty(
                                            productDetails,
                                            row.brandproduct.product_id,
                                            'name'
                                        )}
                                    </td>

                                    <td>R$ {row.brandproduct.price / 100}</td>
                                    <td>{`${row.brandproduct.quantity_per_unity} ${row.brandproduct.unity}`}</td>
                                    <td>{row.provider.name}</td>
                                    <td>
                                        {
                                            getProperty(
                                                productDetails,
                                                row.brandproduct.product_id,
                                                'category'
                                            ).name
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>

                <span>tabela nova (do react-table)</span>
                {productDetails.length > 0 && (
                    <Table columns={headers} data={data} linkTo='produtos'/>
                )}
            </div>
        </div>
    );
}
