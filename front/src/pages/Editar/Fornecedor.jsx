import React, { useState, useEffect } from 'react';
import api from 'services/api';

import Header from 'components/Header';
import TextBox from 'components/TextBox';
import Button from 'components/Button';
import LocationSelector from 'components/LocationSelector';

export default function EditarFornecedor(props, { history }) {
  const { id } = props.match.params;
  const [formData, setFormData] = useState({});

  const [isLoaded, setIsLoaded] = useState(false);
  const [providerData, setProviderData] = useState({});
  useEffect(() => {
    api.get(`/providers/${id}`, { params: { location: true } }).then(response => {
      setProviderData(response.data[0]);
      setIsLoaded(true);
    });
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();
    await api.put(`/providers/${id}`, formData);
    history.push('/fornecedores');
  }

  function handleChange({ target }) {
    setFormData({ ...formData, [target.name]: target.value });
  }

  return (
    <div className="tela tela-cadastro">
      <Header>Editar Fornecedor</Header>

      <form action="#" onSubmit={handleSubmit}>
        <TextBox
          name="name"
          label="Nome do Fornecedor"
          required
          value={providerData.name}
          onChange={handleChange}
        />
        <LocationSelector
          required
          onChange={value => setFormData({ ...formData, location_id: value })}
        />
        <TextBox
          name="contact"
          label="Nome do Contato Principal"
          required
          value={providerData.contact}
          onChange={handleChange}
        />
        <TextBox
          name="phone"
          label="Telefone do contato"
          type="tel"
          required
          value={providerData.phone}
          onChange={handleChange}
        />
        <TextBox
          name="email"
          label="E-mail do contato principal"
          type="email"
          required
          value={providerData.email}
          onChange={handleChange}
        />
        <div className="buttons">
          <Button type="reset" color="#DC2438" onClick={() => history.replace('/fornecedores')}>
            Cancelar
          </Button>
          <Button type="submit" color="#30CC57">
            Cadastrar
          </Button>
        </div>
        <pre>is loaded: {JSON.stringify(isLoaded)}</pre>
      </form>
    </div>
  );
}
