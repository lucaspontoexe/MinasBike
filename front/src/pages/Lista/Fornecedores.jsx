import React, { useState, useEffect } from 'react';
import api from 'services/api';
import useAuth from 'utils/useAuth';
// import formatPrice from 'utils/formatPrice';
import Header from 'components/Header';
import Button from 'components/Button';
import Table from 'components/Table';

import './styles.css';

export default function ListaFornecedores({ history }) {
    const [providers, setProviders] = useState([]);
    // const [prpr, setPrpr] = useState([]);

    useEffect(() => {
        function fetchData() {
            // api.get('/providerproducts?provider', useAuth).then(res =>
            //     setPrpr(res.data)
            // );
            api.get('/providers?location', useAuth).then(res =>
                setProviders(res.data)
            );
        }
        fetchData();
    }, []);

    const headers = [
        { Header: 'Código', accessor: 'code' },
        { Header: 'Nome', accessor: 'name' },
        { Header: 'Contato', accessor: 'contact' },
        // { Header: 'Preço de Custo', accessor: 'cost_price' },
        { Header: 'Cidade', accessor: 'location' },
    ];

    const data = providers.map(item => {
        return {
            code: item.id,
            name: item.name,
            contact: item.contact,
            // cost_price: formatPrice(item.cost_price),
            location: `${item.location.city}, ${item.location.state}`,
        };
    });

    const TopHeader = () => (
        <Button color="#DC2438" onClick={() => {}}>
            Enviar Arquivo
        </Button>
    );

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
                    <Table
                        columns={headers}
                        data={data}
                        linkTo="fornecedores"
                        searchText="Buscar fornecedores..."
                        TopHeaderComponent={<TopHeader />}
                    />
                )}
            </div>
        </div>
    );
}
