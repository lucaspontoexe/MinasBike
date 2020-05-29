import React, { useState, useEffect } from 'react';
import api from 'services/api';

import Header from 'components/Header';
import Button from 'components/Button';
import Table from 'components/Table';
import DateCell from 'components/Table/DateCell';

import './styles.css';

export default function ListaClientes({ history }) {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    function fetchData() {
      api.get('/clients').then(res => setClients(res.data));
    }
    fetchData();
  }, []);

  const headers = [
    { Header: 'Código', accessor: 'code' },
    { Header: 'Nome', accessor: 'name' },
    { Header: 'Endereço', accessor: 'address' },
    { Header: 'Telefone', accessor: 'phone' },
    { Header: 'E-mail', accessor: 'email' },
    {
      Header: 'Data de Nascimento',
      accessor: 'birthday',
      Cell: DateCell,
    },
  ];

  const TopHeader = () => (
    <Button color="#DC2438" onClick={() => {}}>
      Enviar Arquivo
    </Button>
  );

  return (
    <div className="tela tela--lista">
      <Header>Clientes</Header>
      <div className="buttons">
        <Button color="#30CC57" onClick={() => history.push('/clientes/novo')}>
          Cadastrar cliente
        </Button>
        <Button color="#DC2438" onClick={() => {}}>
          Gerar Relatório
        </Button>
      </div>
      <div className="table-wrapper">
        {clients.length > 0 && (
          <Table
            columns={headers}
            data={clients.map(item => ({...item, code: item.id}))}
            withFilter
            linkTo="clientes"
            searchText="Buscar clientes..."
            TopHeaderComponent={<TopHeader />}
          />
        )}
      </div>
    </div>
  );
}
