import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Header from '../../components/Header';
import Button from '../../components/Button';
import './styles.css';

export default function ListaProdutos({ history }) {
    const [products, setProducts] = useState([]);
    const [providers, setProviders] = useState([]);
    const [categories, setCategories] = useState([]);
    // TODO: USAR UM STATE GLOBAL PRA NÃO TER QUE CARREGAR REQUESTS VÁRIAS VEZES

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        await api
            .get('/providers')
            .then(response => setProviders(response.data));
        await api
            .get('/categories')
            .then(response => setCategories(response.data));
        await api.get('/products').then(response => setProducts(response.data));
    }

    function getName(objects, id) {
        return objects.filter(obj => obj.id === id)[0].name;
    }

    return (
        <div className="tela lista-produtos">
            <Header>Produtos</Header>
            <div className="table-wrapper">
                <div className="buttons">
                    <Button onClick={() => history.push('/novo')}>
                        Cadastrar produto
                    </Button>
                    <Button>Gerar Relatório</Button>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nome</th>
                            <th>Marca</th>
                            <th>Preço</th>
                            <th>Quantidade</th>
                            <th>Fornecedor</th>
                            <th>Categoria</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((row, index) => (
                            <tr key={index}>
                                <td>
                                    <Link to={`/produtos/${row.code}`}>{row.code}</Link>
                                </td>
                                <td>{row.name}</td>
                                <td>{row.brand}</td>
                                <td>R$ {row.price / 100}</td>
                                <td>{`${row.quantity_per_unity} ${row.unity}`}</td>
                                <td>{getName(providers, row.id_provider)}</td>
                                <td>{getName(categories, row.id_category)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
