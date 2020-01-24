import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import useAuth from '../../utils/useAuth';
import getProperty from '../../utils/getProperty';
import Header from '../../components/Header';
import Button from '../../components/Button';

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

    return (
        <div className="tela lista-produtos">
            <Header>Produtos</Header>
            <div className="table-wrapper">
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
            </div>
        </div>
    );
}
