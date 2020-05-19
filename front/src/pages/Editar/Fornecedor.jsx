import React, { useState, useEffect } from 'react';
import api from 'services/api';
import { formatErrorsSingleObject } from 'utils/formatFieldErrors';

import Header from 'components/Header';
import TextBox from 'components/TextBox';
import Button from 'components/Button';
import LocationSelector from 'components/LocationSelector';

import './styles.scss';

export default function EditarFornecedor(props) {
  const { id } = props.match.params;
  const [formData, setFormData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [initialName, setInitialName] = useState('');
  const [errors, setErrors] = useState({});
  const [canEdit, setCanEdit] = useState(false);
  const fieldIsDisabled = !canEdit;

  useEffect(() => {
    api.get(`/providers/${id}`, { params: { location: true } }).then(response => {
      setFormData(response.data[0]);
      setInitialName(response.data[0].name);
      setIsLoaded(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function handleSubmit(event) {
    event.preventDefault();

    api
      .put(`/providers/${id}`, {
        ...formData,
        location: undefined,
        name: formData.name === initialName && undefined,
      })

      .then(props.history.push('/fornecedores'))

      .catch(err => setErrors(formatErrorsSingleObject(err.response.data)));
  }

  function handleChange({ target }) {
    setFormData({ ...formData, [target.name]: target.value });
  }

  return (
    <div className="tela tela-editar">
      <div className="extra-header">
        <Header>Editar Fornecedor</Header>

        {!canEdit && (
          <Button color="#dc2438" onClick={() => setCanEdit(true)}>
            Editar
          </Button>
        )}
      </div>

      <form action="#" onSubmit={handleSubmit}>
        <TextBox
          name="name"
          label="Nome do Fornecedor"
          required
          disabled={fieldIsDisabled}
          error={errors.name}
          value={formData.name}
          onChange={handleChange}
        />
        <LocationSelector
          required
          disabled={fieldIsDisabled}
          initialValue={formData.location}
          onChange={value => setFormData({ ...formData, location_id: value })}
        />

        {errors.location_id && <div>{errors.location_id}</div>}

        <TextBox
          name="contact"
          label="Nome do Contato Principal"
          required
          disabled={fieldIsDisabled}
          error={errors.contact}
          value={formData.contact}
          onChange={handleChange}
        />
        <TextBox
          name="phone"
          label="Telefone do contato"
          type="tel"
          required
          disabled={fieldIsDisabled}
          error={errors.phone}
          value={formData.phone}
          onChange={handleChange}
        />
        <TextBox
          name="email"
          label="E-mail do contato principal"
          type="email"
          required
          disabled={fieldIsDisabled}
          error={errors.email}
          value={formData.email}
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
