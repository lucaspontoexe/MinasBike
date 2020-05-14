import React, { useState, useEffect } from 'react';
import api from 'services/api';

import Header from 'components/Header';
import Table from 'components/Table';

import './styles.css';

export default function ListaClientes({ history }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    function fetchData() {
      api.get('/users').then(res => setUsers(res.data));
    }
    fetchData();
  }, []);

  const headers = [
    { Header: 'Nome', accessor: 'name' },
    { Header: 'E-mail', accessor: 'email' },
    { Header: 'Cargo', accessor: 'usertype_id' },
    { Header: 'Situação', accessor: 'active' },
  ];

  return (
    <div className="tela tela--lista">
      <Header>Usuários</Header>
      <div className="table-wrapper">
        <Table columns={headers} data={users} searchText="Buscar usuários..." />
      </div>
    </div>
  );
}
