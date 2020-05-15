import React, { useState, useEffect } from 'react';
import api from 'services/api';

import Header from 'components/Header';
import Table from 'components/Table';

import './styles.css';

export default function ListaUsuários() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    function fetchData() {
      api.get('/users?usertype').then(res => setUsers(res.data));
    }
    fetchData();
  }, []);

  const headers = [
    { Header: 'Nome', accessor: 'name' },
    { Header: 'E-mail', accessor: 'email' },
    { Header: 'Cargo', accessor: 'usertype_name' },
    {
      Header: 'Situação',
      accessor: 'active',
      Cell: ({ cell }) => (cell.value ? 'Ativo' : 'Inativo'),
    },
  ];

  const data = users.map(user => ({ ...user, usertype_name: user.usertype.name }));

  return (
    <div className="tela tela--lista">
      <Header>Usuários</Header>
      <div className="table-wrapper">
        <Table columns={headers} data={data} searchText="Buscar usuários..." />
      </div>
    </div>
  );
}
