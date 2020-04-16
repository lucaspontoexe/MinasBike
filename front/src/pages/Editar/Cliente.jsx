import React, { useState, useEffect } from 'react';
import { formatErrorsSingleObject } from 'utils/formatFieldErrors';
import api from 'services/api';

import Header from 'components/Header';
import TextBox from 'components/TextBox';
import Button from 'components/Button';

export default function EditarCliente(props) {
  const { id } = props.match.params;
  const [formData, setFormData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState({});
  const [canEdit, setCanEdit] = useState(false);
  const fieldIsDisabled = !canEdit;

  useEffect(() => {
    api.get(`/clients/${id}`).then(response => {
      setFormData(response.data[0]);
      setIsLoaded(true);
    });
  }, [id]);

  function handleSubmit(event) {
    event.preventDefault();

    console.log(formData);

    api
      .put(`/clients/${id}`, formData)

      .then(props.history.push('/clientes'))

      .catch(err => setErrors(formatErrorsSingleObject(err.response.data)));
  }

  function handleChange({ target }) {
    setFormData({ ...formData, [target.name]: target.value });
  }

  return (
    <div className="tela tela-cadastro">
      <Header>Editar Cliente</Header>

      <Button color="#dc2438" onClick={() => setCanEdit(true)}>
        Editar
      </Button>

      <form action="#" onSubmit={handleSubmit}>
        <TextBox
          name="name"
          label="Nome"
          required
          disabled={fieldIsDisabled}
          error={errors.name}
          value={formData.name}
          onChange={handleChange}
        />

        <TextBox
          name="address"
          label="Endereço"
          required
          disabled={fieldIsDisabled}
          error={errors.address}
          value={formData.address}
          onChange={handleChange}
        />
        <TextBox
          name="phone"
          label="Telefone"
          type="tel"
          required
          disabled={fieldIsDisabled}
          error={errors.phone}
          value={formData.phone}
          onChange={handleChange}
        />
        <TextBox
          name="email"
          label="E-mail"
          type="email"
          required
          disabled={fieldIsDisabled}
          error={errors.email}
          value={formData.email}
          onChange={handleChange}
        />

        <TextBox
          name="cpf"
          label="CPF"
          disabled={fieldIsDisabled}
          error={errors.cpf}
          value={formData.cpf}
          onChange={handleChange}
        />

        {canEdit && (
          <div className="buttons">
            <Button
              type="reset"
              color="#DC2438"
              onClick={() => props.history.replace('/fornecedores')}
            >
              Cancelar
            </Button>
            <Button type="submit" color="#30CC57">
              Cadastrar
            </Button>
          </div>
        )}

        {window.DEV_MODE && <pre>is loaded: {JSON.stringify(isLoaded)}</pre>}
      </form>
    </div>
  );
}
