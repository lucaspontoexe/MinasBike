import React, { useState, useEffect } from 'react';
import api from 'services/api';
import useAuth from 'utils/useAuth';
import formatPrice from 'utils/formatPrice';
import { ObjectSelect, getNestedProperty } from 'utils/getProperty';
import Header from 'components/Header';
import Button from 'components/Button';
import Table from 'components/Table';

import './styles.css';

export default function ListaFornecedores({ history }) {
    const [providers, setProviders] = useState([]);
    const [prpr, setPrpr] = useState([]);

    useEffect(() => {
        function fetchData() {
            api.get('/providerproducts', useAuth).then(res => setPrpr(res.data));
            api.get('/providers', useAuth).then(res => setProviders(res.data));
            //prettier-disable-next-line max-len
            // api.get('/stocks', useAuth).then(res => setStockDetails(res.data));
        }
        fetchData();
    }, []);

    const headers = [
        { Header: 'Código', accessor: 'code' },
        { Header: 'Nome', accessor: 'name' },
        { Header: 'Contato', accessor: 'contact' },
        { Header: 'Produto', accessor: 'product' },
        { Header: 'Preço de Custo', accessor: 'cost_price' },
        { Header: 'Cidade', accessor: 'location' },
        { Header: 'Representante', accessor: 'contact_two' },
    ];

    const data = providers.map(item => {
        if (item.id === 3) debugger
        return {
            code: item.id,
            name: item.name,
            contact: item.contact,
            product: getNestedProperty(prpr, item.provider_id, 'brandproduct', 'code'),
            cost_price: formatPrice(ObjectSelect('cost_price', prpr, obj => obj.provider_id === item.id)),
            location: `${item.location.city}, ${item.location.state}`,
            contact_two: '#descubra'
        };
    });

    return (
        <div className="tela tela--lista">
            <Header>Fornecedores</Header>
            <div className="buttons">
                <Button
                    color="#30CC57"
                    onClick={() => history.push('/fornecedores/novo')}
                >
                    Cadastrar fornecedor
                </Button>
                <Button color="#DC2438" onClick={() => {}}>
                    Gerar Relatório
                </Button>
            </div>
            <div className="table-wrapper">
                {providers.length > 0 && (
                    <Table columns={headers} data={data} linkTo="fornecedores" />
                )}
            </div>
        </div>
    );
}
